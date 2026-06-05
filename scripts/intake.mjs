// AIRVS intake — parse a verification Issue Form, apply decision-rule v1.0.0,
// INSERT (parameterized, append-only role) into Neon, then comment & close the issue.
// Runs inside GitHub Actions only for owner-authored issues (see workflow `if`).
import { neon } from "@neondatabase/serverless";

const BODY = process.env.ISSUE_BODY || "";
const N = process.env.ISSUE_NUMBER;
const REPO = process.env.REPO;
const TOKEN = process.env.GH_TOKEN;
const DB = process.env.NEON_INSERT_URL;
const SITE = process.env.SITE_BASE || "https://www.ai-rvs.com";

// ---- parse "### <label>\n\n<value>" blocks emitted by GitHub Issue Forms ----
function parseForm(body) {
  const map = {};
  const re = /###\s+([^\n]+)\n+([\s\S]*?)(?=\n###\s|$)/g;
  let m;
  while ((m = re.exec(body))) {
    const label = m[1].trim();
    const code = label.split(" ")[0].replace(/[^A-Za-z0-9]/g, ""); // R1, A1, A1e, C1, O2, E1, S1...
    map[code] = m[2].trim().replace(/^_No response_$/i, "");
  }
  return map;
}

// ---- decision-rule v1.0.0 (frozen; mirrors decision-rule-v1.0.0.json) ----
const ORDER = ["trustworthy", "acceptable", "questionable", "unreliable"];
const down = (x) => (x === "hallucinated" ? x : ORDER[Math.min(ORDER.indexOf(x) + 1, 3)]);
const cap = (x, c) => (ORDER.indexOf(x) >= ORDER.indexOf(c) ? x : c);
function evaluate({ P, H, C, A3, phase, ret90, exc90, stop, CoI }) {
  const t = [];
  if (H) return { verdict: "hallucinated", trace: "Step0 H=true → 🔴 (terminal)" };
  t.push("Step0 H=false");
  let B;
  if (P <= 3) B = "unreliable";
  else if (P === 4) B = "questionable";
  else if (P === 5) B = C === "Missing" ? "questionable" : "acceptable";
  else B = C === "Sufficient" ? "trustworthy" : C === "Partial" ? "acceptable" : "questionable";
  if (C === "Partial" && !A3 && (B === "trustworthy" || B === "acceptable")) B = "questionable";
  t.push(`Step1 B=${B} (P=${P}, C=${C})`);
  let label = B;
  if (phase === "confirmed") {
    if (stop || (exc90 !== null && exc90 < -3)) { label = "unreliable"; t.push("Step2 stop/exc<-3pp → unreliable floor"); }
    else if (ret90 !== null && ret90 < 0) { label = down(B); t.push("Step2 ret<0 → downgrade 1"); }
    else if (ret90 !== null && exc90 !== null && ret90 >= 0 && exc90 < 0) { label = cap(B, "acceptable"); t.push("Step2 ret≥0&exc<0 → cap acceptable"); }
    else t.push("Step2 outcome ok → keep B");
  } else t.push("Step2 skipped (provisional)");
  if (CoI && label !== "hallucinated") { const p = label; label = down(label); t.push(`Step3 CoI ${p}→${label}`); }
  else t.push("Step3 no CoI");
  return { verdict: label, trace: t.join(" → ") };
}

async function gh(path, method, body) {
  const r = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/vnd.github+json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) console.error("github api", path, r.status, await r.text());
  return r;
}

async function main() {
  const f = parseForm(BODY);
  const axisNames = ["Data Source", "Reasoning Logic", "Counter Scenario", "Timing", "Accuracy / Hallucination", "Causal Chain"];
  const process6 = [1, 2, 3, 4, 5, 6].map((i) => ({
    n: i,
    name: axisNames[i - 1],
    pass: (f["A" + i] || "").startsWith("Pass"),
    evidence: f["A" + i + "e"] || "",
  }));
  const P = process6.filter((a) => a.pass).length;
  const H = (f.A5x || "").startsWith("Yes");
  const tiers = { Sufficient: 2, Partial: 1, Missing: 0 };
  const Cv = Math.min(tiers[f.C1] ?? 0, tiers[f.C2] ?? 0);
  const C = ["Missing", "Partial", "Sufficient"][Cv];
  const phase = (f.O1 || "").startsWith("confirmed") ? "confirmed" : "provisional";
  const num = (s) => { const v = parseFloat(String(s).replace(/[^0-9.+-]/g, "")); return Number.isFinite(v) ? v : null; };
  const ret90 = num(f.O2), exc90 = num(f.O3);
  const stop = (f.O4 || "").startsWith("Yes");
  const CoI = (f.E1 || "") === "disclosed";
  const isFund = (f.R4 || "").includes("ai-managed-fund");

  const { verdict, trace } = evaluate({ P, H, C, A3: process6[2].pass, phase, ret90, exc90, stop, CoI });

  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40);
  const id = `${f.R3}-${slug(f.R2)}-issue${N}`;
  const outcome = {
    mode: isFund ? "continuous" : "4-point",
    benchmark: f.O5 || null,
    ...(isFund ? { annualized: f.O2 ? `${f.O2}%` : null } : { d90: f.O2 ? `${f.O2}%` : null }),
    excess: f.O3 ? `${f.O3}pp` : null,
    stop_breached: stop,
    notes: f.O6 || null,
    decision_rule_version: "v1.0.0",
    verdict_trace: trace,
    d30: null, d60: null, d180: null,
  };

  const sql = neon(DB); // parameterized via tagged template — no string concatenation
  await sql`insert into public.verifications
    (id, provider, date, asset, verdict, process, coherence, outcome, status, summary, methodology_version, verdict_status, is_sample)
    values (${id}, ${f.R1}, ${f.R3}, ${f.R2}, ${verdict}, ${JSON.stringify(process6)}::jsonb,
            ${C}, ${JSON.stringify(outcome)}::jsonb,
            ${phase === "confirmed" ? "Confirmed" : "Provisional · D+0"},
            ${f.S1 || ""}, ${"v1.2.0"}, ${phase === "confirmed" ? "confirmed" : "provisional"}, ${false})`;

  const emoji = { trustworthy: "🟢", acceptable: "🔵", questionable: "🟡", unreliable: "🟠", hallucinated: "🔴" }[verdict];
  await gh(`issues/${N}/comments`, "POST", {
    body: `✅ Published.\n\n**Verdict: ${emoji} ${verdict}** (decision-rule v1.0.0, mechanical)\n\`${trace}\`\n\nLive in ~60s: ${SITE}/verifications/${id}\n\n_Append-only: corrections go in a new addendum row — this record will not be edited._`,
  });
  await gh(`issues/${N}/labels`, "POST", { labels: ["published"] });
  await gh(`issues/${N}`, "PATCH", { state: "closed" });
  console.log("published", id, verdict);
}

main().catch(async (e) => {
  console.error(e);
  await gh(`issues/${N}/comments`, "POST", { body: `❌ Intake failed: \`${String(e.message || e).slice(0, 300)}\`\nFix the form values and re-open, or run manually.` });
  process.exit(1);
});
