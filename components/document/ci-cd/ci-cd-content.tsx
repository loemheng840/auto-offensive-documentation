"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import DocsFooterNav from "@/components/document/docs-footer-nav";

const sansFontStyle = {
  fontFamily: "var(--docs-sans-font), sans-serif",
} as const;

const monoFontStyle = {
  fontFamily: "var(--docs-mono-font), monospace",
} as const;

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="text-[14px] md:text-[15px] lg:text-[16px] bg-[#F0EDE6] dark:bg-white/5 text-[#00BCA1] px-1.5 py-px rounded border border-[#E2DDD5] dark:border-white/10"
      style={monoFontStyle}
    >
      {children}
    </code>
  );
}

function Tag({
  children,
  variant = "brand",
}: {
  children: React.ReactNode;
  variant?: "brand" | "info" | "success" | "warn";
}) {
  const styles: Record<string, string> = {
    brand: "text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border-[rgba(0,188,161,0.2)]",
    info: "text-[#1D57C8] bg-[rgba(29,87,200,0.06)] border-[rgba(29,87,200,0.2)]",
    success: "text-[#1A7A4A] bg-[rgba(26,122,74,0.06)] border-[rgba(26,122,74,0.2)]",
    warn: "text-[#B86800] bg-[rgba(184,104,0,0.06)] border-[rgba(184,104,0,0.2)]",
  };

  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] font-medium px-1.5 py-px rounded border whitespace-nowrap tracking-[0.02em] ${styles[variant]}`}
      style={monoFontStyle}
    >
      {children}
    </span>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[15px] md:text-[16px] lg:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.82] mb-3"
      style={sansFontStyle}
    >
      {children}
    </p>
  );
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    info: "border-l-[#1D57C8] bg-[rgba(29,87,200,0.03)]",
    tip: "border-l-[#1A7A4A] bg-[rgba(26,122,74,0.03)]",
    warn: "border-l-[#B86800] bg-[rgba(184,104,0,0.03)]",
  };

  const titleColors: Record<string, string> = {
    info: "text-[#1D57C8]",
    tip: "text-[#1A7A4A]",
    warn: "text-[#B86800]",
  };

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-lg border border-[#E2DDD5] dark:border-white/10 border-l-[3px] my-4 dark:bg-white/3 ${styles[type]}`}
    >
      <div className="flex-1">
        <div className={`text-[11px] font-bold tracking-[0.07em] uppercase mb-1 ${titleColors[type]}`}>
          {title}
        </div>
        <div
          className="text-[15px] md:text-[16px] lg:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
          style={sansFontStyle}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function CodeBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    if (!codeRef.current) return;

    navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden my-4 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.14),0_1px_4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-[#16181F]">
        <div className="flex gap-1.25">
          <div className="w-2.25 h-2.25 rounded-full bg-[#FF5F57]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.25 h-2.25 rounded-full bg-[#28CA41]" />
        </div>
        <span className="font-mono text-[11px] text-white/25 tracking-wider" style={monoFontStyle}>
          {title}
        </span>
        <button
          onClick={handleCopy}
          className="font-mono text-[10px] text-white/30 bg-transparent border-none cursor-pointer hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded transition-all duration-150"
          style={monoFontStyle}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="bg-[#16181F] px-5 py-4.5 overflow-x-auto">
        <code
          ref={codeRef}
          className="text-[14px] md:text-[15px] lg:text-[16px] leading-[1.92] text-white/55 whitespace-pre"
          style={monoFontStyle}
        >
          {children}
        </code>
      </div>
    </div>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
      <table className="w-max min-w-full border-collapse text-left">
        <thead className="bg-[#F0EDE6] dark:bg-white/5">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10 whitespace-nowrap"
                style={monoFontStyle}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className={rowIndex < rows.length - 1 ? "border-b border-[#E2DDD5] dark:border-white/10" : ""}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="px-4 py-3 text-[15px] md:text-[16px] lg:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72] align-top whitespace-nowrap"
                  style={sansFontStyle}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getCapabilityCards(isKhmer: boolean) {
  return isKhmer
    ? [
      {
        title: "Scan Triggering",
        desc: "បើកការស្កេនសុវត្ថិភាពពី pipeline របស់អ្នក ដោយប្រើ API requests ដែលមាន Authentication និង JSON payloads ដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់។",
        variant: "info" as const,
      },
      {
        title: "Job Tracking",
        desc: "តាមដានស្ថានភាព scan lifecycle ចាប់ពី pending រហូតដល់ completed, failed ឬ cancelled ដោយមិនចាំបាច់ចេញពី pipeline។",
        variant: "warn" as const,
      },
      {
        title: "Results & Reports",
        desc: "ប្រមូល findings, ទាញយក reports ហើយបញ្ជូនលទ្ធផលចុងក្រោយទៅ quality gates ឬ release checks។",
        variant: "success" as const,
      },
    ]
    : [
      {
        title: "Scan Triggering",
        desc: "Start security scans from your pipeline using authenticated API requests and structured JSON payloads.",
        variant: "info" as const,
      },
      {
        title: "Job Tracking",
        desc: "Poll scan lifecycle states from pending through completed, failed, or cancelled without leaving the pipeline.",
        variant: "warn" as const,
      },
      {
        title: "Results & Reports",
        desc: "Collect findings, download reports, and feed the final output into quality gates or release checks.",
        variant: "success" as const,
      },
    ];
}

function getWorkflowSteps(isKhmer: boolean) {
  return isKhmer
    ? [
      { num: "01", title: "Authenticate", desc: "ទាញយក API key ពី secret manager របស់ CI/CD។" },
      { num: "02", title: "Trigger Scan", desc: "បង្កើត scan job ជាមួយ target ឬ repository payload។" },
      { num: "03", title: "Poll Status", desc: "រង់ចាំរហូត backend ត្រឡប់ terminal state មកវិញ។" },
      { num: "04", title: "Fetch Results", desc: "ទាញយក findings ហើយប្រៀបធៀបជាមួយ policy threshold របស់អ្នក។" },
      { num: "05", title: "Pass or Fail", desc: "សម្រេចថា pipeline គួរបន្ត បង្ហាញការព្រមាន ឬទប់ស្កាត់។" },
    ]
    : [
      { num: "01", title: "Authenticate", desc: "Load the API key from your CI/CD secret manager." },
      { num: "02", title: "Trigger Scan", desc: "Create a scan job with the target or repository payload." },
      { num: "03", title: "Poll Status", desc: "Wait until the backend returns a terminal state." },
      { num: "04", title: "Fetch Results", desc: "Retrieve findings and compare them with your policy threshold." },
      { num: "05", title: "Pass or Fail", desc: "Decide whether the pipeline should continue, warn, or block." },
    ];
}

export default function CICDContent() {
  const locale = useLocale();
  const isKhmer = locale === "kh";
  const pageFontVars = {
    "--docs-sans-font": isKhmer
      ? "var(--font-noto-khmer), var(--font-google-sans)"
      : "var(--font-google-sans), var(--font-noto-khmer)",
    "--docs-mono-font": isKhmer
      ? "var(--font-jetbrains-mono), var(--font-noto-khmer), var(--font-google-sans)"
      : "var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer)",
  } as CSSProperties;
  const capabilityCards = getCapabilityCards(isKhmer);
  const workflowSteps = getWorkflowSteps(isKhmer);
  const copy = isKhmer
    ? {
      breadcrumbCurrent: "CI/CD Integration",
      guideVersion: "Integration Guide · v1.0",
      pageTitle: "CI/CD Integration",
      intro:
        "ភ្ជាប់ Auto Offensive ទៅក្នុង deployment pipelines របស់អ្នក ដើម្បីបើកការស្កេន តាមដាន jobs ទាញយក findings និងទាញយក reports ដោយស្វ័យប្រវត្តិ។ ទំព័រនេះរក្សាទម្រង់ដូចគ្នានឹង docs ផ្សេងៗ ដើម្បីឱ្យក្រុមរបស់អ្នកអាចផ្លាស់ទីរវាង CLI, tools, API និង CI/CD references បានដោយងាយ។",
      overview: "ទិដ្ឋភាពទូទៅ",
      overviewBody:
        "ការភ្ជាប់ CI/CD ត្រូវបានរៀបចំជាលំហូរងាយយល់មួយ៖ authenticate, បង្កើត scan job, poll ស្ថានភាពរហូតដល់ចប់, ទាញយកលទ្ធផល ហើយសម្រេចថា pipeline គួរបន្តឬអត់។ វាមានប្រយោជន៍ជាពិសេសសម្រាប់បរិស្ថានដែលការចេញ release អាស្រ័យលើលទ្ធផលសុវត្ថិភាព។",
      workflow: "លំហូរ CI/CD",
      workflowBody:
        "លំហូរធម្មតានៃការភ្ជាប់មាន 5 ជំហាន ដែលអាចប្រើបានជាមួយ GitHub Actions, GitLab CI, Jenkins, Bitbucket Pipelines ឬ custom runner ណាមួយដែលអាចហៅ HTTPS APIs។",
      auth: "Authentication",
      authBody:
        "រាល់ requests ត្រូវផ្ញើ API key ឬ token នៅក្នុង authorization header។ សូមរក្សាទុក credentials នៅក្នុង secret manager របស់ CI/CD ជំនួសការដាក់វាទៅក្នុង repositories ឬ workflow files។",
      securityNote: "ចំណាំសុវត្ថិភាព",
      securityNoteBody:
        "ប្រើ environment secrets, បង្វិល keys នៅពេលសមាជិកក្រុមផ្លាស់ប្តូរ ហើយកំណត់សិទ្ធិ credentials ឱ្យតូចបំផុតតាម workspace ឬ environment ដែល pipeline ត្រូវការ។",
      apiEndpoints: "CLI Commands",
      trigger: "ការបើកការស្កេន",
      triggerBody:
        "បង្កើត scan មួយដោយប្រើ POST /scans/advanced/submit។ ប្រសិនបើ request ជោគជ័យ វានឹងត្រឡប់ job_id មកវិញ ដែល pipeline អាចរក្សាទុក និងប្រើបន្តនៅជំហានក្រោយ។",
      status: "ស្ថានភាព Job",
      statusBody:
        "ធ្វើការ poll GET /scans/jobs/{job_id} រហូតដល់ scan ទៅដល់ terminal state។ Pipeline អាចបន្ត poll នៅពេល status ជា pending ឬ running ហើយឈប់នៅពេល completed, failed ឬ cancelled។",
      results: "ទាញយកលទ្ធផល",
      resultsBody:
        "នៅពេល job ត្រឡប់ completed សូមទាញយក findings ពី GET /scans/advanced/jobs/{job_id}/findings។ Response នេះសមស្របសម្រាប់ quality gates, dashboards និង downstream automation។",
      pagination: "Pagination",
      paginationBody:
        "ប្រើ query parameters ដូចជា ?page=1&limit=50 នៅពេល job ត្រឡប់ finding ច្រើន។",
      report: "ទាញយក Report",
      reportBody:
        "ទាញយក reports ដោយប្រើ GET /scans/jobs/{job_id}/report។ អ្នកអាចស្នើ JSON ដែល machine-readable ឬ PDF ដែលមនុស្សអាចអានបាន អាស្រ័យលើអ្វីដែល pipeline ត្រូវការបន្ទាប់។",
      pipeline: "ឧទាហរណ៍ Pipeline",
      pipelineBody:
        "Pipeline ខាងក្រោមបើក repository scan មួយ, poll រហូតដល់ចប់ ហើយបរាជ័យ build ប្រសិនបើមាន critical findings។",
      thresholds: "Severity Thresholds",
      thresholdsBody:
        "ប្រើ severity_threshold ដើម្បីគ្រប់គ្រងពេលដែល build គួរបរាជ័យ។ វាផ្តល់វិធីអនុវត្តជាក់ស្តែងសម្រាប់ក្រុមក្នុងការកំណត់ security gates តាម environment។",
      recommendation: "អនុសាសន៍",
      recommendationBody:
        "ប្រើ high សម្រាប់ production deployment gates និង medium សម្រាប់ pre-production environments នៅពេលអ្នកចង់បានតុល្យភាពល្អរវាងល្បឿន និងសុវត្ថិភាព។",
      access: "Access Scoping",
      accessBody:
        "Requests ត្រូវបានកំណត់សិទ្ធិទៅ workspace ដែលបាន authenticate ជានិច្ច។ Pipelines មិនអាចអាន scans, jobs ឬ reports ពី workspaces ផ្សេងទេ ហើយ invalid cross-workspace references គួរតែត្រឡប់ 403 Forbidden។",
      fieldHeaders: ["Field", "Type", "Required", "Description"],
      methodHeaders: ["Command", "Description"],
      statusHeaders: ["Status", "Meaning"],
      parameterHeaders: ["Parameter", "Values", "Default"],
      thresholdHeaders: ["Threshold", "Pipeline Behaviour"],
      accessItems: [
        "API key នីមួយៗត្រូវបានភ្ជាប់ជាមួយ workspace តែមួយ។",
        "Workspace មួយអាចមាន keys ច្រើនដែលមាន permission ខុសគ្នា។",
        "ការលុបចោល key មួយ មិនធ្វើឱ្យ keys ផ្សេងទៀតអសកម្មទេ។",
        "Usage logs អាចពិនិត្យបានពី workspace audit trail។",
      ],
    }
    : {
      breadcrumbCurrent: "CI/CD Integration",
      guideVersion: "Integration Guide · v1.0",
      pageTitle: "CI/CD Integration",
      intro:
        "Integrate Auto Offensive into your deployment pipelines to trigger scans, monitor jobs, fetch findings, and download reports programmatically. The page follows the same pattern as the other docs pages so your team can move between CLI, tools, API, and CI/CD references without relearning the layout.",
      overview: "Overview",
      overviewBody:
        "CI/CD integration is built around a simple flow: authenticate, create a scan job, poll for completion, retrieve the results, and decide whether the pipeline should continue. This is especially useful for gated environments where releases depend on security outcomes.",
      workflow: "CI/CD Workflow",
      workflowBody:
        "The normal integration pattern is a five-step cycle that works with GitHub Actions, GitLab CI, Jenkins, Bitbucket Pipelines, or any custom runner that can call HTTPS APIs.",
      auth: "Authentication",
      authBody:
        "Every request should send an API key or token in the authorization header. Keep credentials in your CI/CD platform's secret manager rather than checking them into repositories or workflow files.",
      securityNote: "Security Note",
      securityNoteBody:
        "Use environment secrets, rotate keys when team access changes, and scope credentials to the smallest workspace or environment that still lets the pipeline do its job.",
      apiEndpoints: "CLI Commands",
      trigger: "Triggering a Scan",
      triggerBody:
        "Create a scan with POST /scans/advanced/submit. A successful request returns a job_id that the pipeline can store and reuse in later steps.",
      status: "Job Status",
      statusBody:
        "Poll GET /scans/jobs/{job_id} until the scan reaches a terminal state. A pipeline can keep polling while the status is pending or running, then stop on completed, failed, or cancelled.",
      results: "Result Retrieval",
      resultsBody:
        "Once the job returns completed, retrieve findings from GET /scans/advanced/jobs/{job_id}/findings. This response is ideal for quality gates, dashboards, and downstream automation.",
      pagination: "Pagination",
      paginationBody:
        "Use query parameters like ?page=1&limit=50 when the job returns a large finding set.",
      report: "Report Download",
      reportBody:
        "Download reports with GET /scans/jobs/{job_id}/report. You can request machine-readable JSON or human-readable PDF output depending on what the pipeline needs next.",
      pipeline: "Pipeline Example",
      pipelineBody:
        "The pipeline below triggers a repository scan, polls until completion, and fails the build if critical findings are present.",
      thresholds: "Severity Thresholds",
      thresholdsBody:
        "Use severity_threshold to control when the build should fail. This gives teams a practical way to tune security gates by environment.",
      recommendation: "Recommendation",
      recommendationBody:
        "Use high for production deployment gates and medium for pre-production environments when you want a better balance between velocity and security.",
      access: "Access Scoping",
      accessBody:
        "Requests are always scoped to the authenticated workspace. Pipelines cannot read scans, jobs, or reports from other workspaces, and invalid cross-workspace references should return 403 Forbidden.",
      fieldHeaders: ["Field", "Type", "Required", "Description"],
      methodHeaders: ["Command", "Description"],
      statusHeaders: ["Status", "Meaning"],
      parameterHeaders: ["Parameter", "Values", "Default"],
      thresholdHeaders: ["Threshold", "Pipeline Behaviour"],
      accessItems: [
        "Each API key is tied to a single workspace.",
        "Multiple keys can exist per workspace with different permission levels.",
        "Revoking one key does not invalidate the others.",
        "Usage logs can be reviewed from the workspace audit trail.",
      ],
    };
  return (
    <article
      className="w-full min-w-0 px-12 xl:px-14 pt-12 pb-32 max-[960px]:px-8 max-[640px]:px-5"
      lang={isKhmer ? "km" : "en"}
      style={{ ...sansFontStyle, ...pageFontVars }}
    >
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-0.75 rounded-full mb-3.5">
          <span className="w-1.25 h-1.25 rounded-full bg-[#00BCA1] animate-pulse" />
          {copy.guideVersion}
        </div>

        <h1
          className="text-[clamp(2.25rem,4vw,3.4rem)] font-bold tracking-[-0.04em] text-[#1A1714] dark:text-white mb-4"
          style={sansFontStyle}
        >
          {copy.pageTitle}
        </h1>

        <Para>
          {copy.intro}
        </Para>
      </div>

      <section id="overview" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.overview}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {copy.overviewBody}
        </Para>

        <div className="flex flex-col gap-4 my-4">
          {capabilityCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#121214] p-5 hover:bg-[#F0EDE6] dark:hover:bg-white/5 transition-colors duration-150"
            >
              <div className="mb-3">
                <Tag variant={card.variant}>{card.title}</Tag>
              </div>
              <div
                className="text-[15px] md:text-[16px] lg:text-[17px] font-semibold text-[#1A1714] dark:text-white mb-1"
                style={sansFontStyle}
              >
                {card.title}
              </div>
              <div
                className="text-[15px] md:text-[16px] lg:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
                style={sansFontStyle}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.workflow}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {copy.workflowBody}
        </Para>

        <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#F0EDE6] dark:bg-white/5">
              <tr>
                {(isKhmer ? ["ជំហាន", "ការពិពណ៌នា"] : ["Step", "Description"]).map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10 whitespace-nowrap" style={monoFontStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workflowSteps.map((step, i) => (
                <tr key={step.num} className={i < workflowSteps.length - 1 ? "border-b border-[#E2DDD5] dark:border-white/10" : ""}>
                  <td className="px-4 py-3 align-top whitespace-nowrap">
                    <span className="font-mono text-[12px] font-semibold text-[#00BCA1]" style={monoFontStyle}>{step.num}</span>
                    <span className="ml-2 text-base font-semibold text-[#1A1714] dark:text-white" style={sansFontStyle}>{step.title}</span>
                  </td>
                  <td className="px-4 py-3 text-base text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]" style={sansFontStyle}>{step.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="auth" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.auth}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {copy.authBody}
        </Para>

        <Callout type="info" title={copy.securityNote}>
          {copy.securityNoteBody}
        </Callout>

        <CodeBlock title="HTTP Header">{`Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json`}</CodeBlock>

        <Para>
          {isKhmer
            ? "បង្កើត API key សម្រាប់ CI/CD ដោយប្រើ CLI ឬ REST API៖"
            : "Create an API key for CI/CD using the CLI or REST API:"}
        </Para>

        <CodeBlock title="bash · create API key">{`# Via CLI
aof apikeys create --project "Web App" --name "ci-deploy" --scopes "scan:submit,scan:read"

# Via REST API
curl -X POST "https://api.auto-offensive.com/api/v1/apikeys/create?project_id=proj_abc123" \\
  -H "Authorization: Bearer $JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "ci-deploy", "description": "GitHub Actions", "scopes": ["scan:submit", "scan:read"]}'`}</CodeBlock>

        <Callout type="warn" title={isKhmer ? "សំខាន់" : "Important"}>
          {isKhmer
            ? "API key ពេញលេញត្រូវបានបង្ហាញតែម្តងប៉ុណ្ណោះនៅពេលបង្កើត។ រក្សាទុកវាក្នុង CI/CD secret manager ភ្លាមៗ។ បើអ្នកបាត់វា អ្នកត្រូវ revoke ហើយបង្កើតថ្មី។"
            : "The full API key is shown only once at creation time. Store it in your CI/CD secret manager immediately. If you lose it, you must revoke and create a new one."}
        </Callout>
      </section>

      <section id="endpoints" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.apiEndpoints}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Table
          headers={copy.methodHeaders}
          rows={[
            [<InlineCode key="cmd-1">aof scans submit</InlineCode>, isKhmer ? "បង្កើត scan job ថ្មីពី pipeline។" : "Create a new scan job from the pipeline."],
            [<InlineCode key="cmd-2">aof scans status</InlineCode>, isKhmer ? "ពិនិត្យវឌ្ឍនភាព និងស្ថានភាព scan។" : "Check scan progress and status."],
            [<InlineCode key="cmd-3">aof findings list</InlineCode>, isKhmer ? "ទាញយក findings ដែលបាន normalize។" : "Fetch normalized findings."],
            [<InlineCode key="cmd-4">aof reports download</InlineCode>, isKhmer ? "ទាញយក report ដែលបានបង្កើត។" : "Download the generated report."],
          ]}
        />
      </section>

      <section id="trigger" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.trigger}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              បង្កើត scan មួយដោយប្រើ <InlineCode>aof scans submit</InlineCode>។ CLI នឹងត្រឡប់ <InlineCode>job_id</InlineCode> មកវិញ ដែល pipeline អាចរក្សាទុក និងប្រើបន្ត។
            </>
          ) : (
            <>
              Create a scan with <InlineCode>aof scans submit</InlineCode>. The CLI returns
              a <InlineCode>job_id</InlineCode> that the pipeline can store and reuse in later steps.
            </>
          )}
        </Para>

        <Table
          headers={copy.fieldHeaders}
          rows={[
            [<InlineCode key="field-1">target</InlineCode>, "string", isKhmer ? "អាស្រ័យ" : "Depends", isKhmer ? "Domain, URL ឬ host សម្រាប់ web scanning។" : "Domain, URL, or host for web scanning."],
            [<InlineCode key="field-2">repository</InlineCode>, "string", isKhmer ? "អាស្រ័យ" : "Depends", isKhmer ? "Repository URL សម្រាប់ repository analysis។" : "Repository URL for repository analysis."],
            [<InlineCode key="field-3">scan_type</InlineCode>, "string", isKhmer ? "បាទ/ចាស" : "Yes", isKhmer ? "កំណត់ជា web ឬ repository។" : "Set to web or repository."],
            [<InlineCode key="field-4">modules</InlineCode>, "array", isKhmer ? "ទេ" : "No", isKhmer ? "ជ្រើស modules ដែលត្រូវដំណើរការសម្រាប់ scan។" : "Select the modules to run for the scan."],
            [<InlineCode key="field-5">severity_threshold</InlineCode>, "string", isKhmer ? "ទេ" : "No", isKhmer ? "គ្រប់គ្រងពេលដែល pipeline គួរបរាជ័យ។" : "Control when the pipeline should fail."],
          ]}
        />

        <CodeBlock title="cURL">{`curl -X POST https://api.auto-offensive.com/scans/advanced/submit \\
  -H "Authorization: Bearer $API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj-abc123",
    "command": "subfinder -d example.com | httpx -sc | nuclei",
    "execution_mode": "advanced"
  }'`}</CodeBlock>
      </section>

      <section id="status" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.status}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              ប្រើ <InlineCode>aof scans status --watch</InlineCode> ដើម្បី poll ដោយស្វ័យប្រវត្តិ។
              CLI នឹងរង់ចាំរហូតដល់ job បានបញ្ចប់។
            </>
          ) : (
            <>
              Use <InlineCode>aof scans status --watch</InlineCode> to automatically poll.
              The CLI will block and wait until the job finishes completely.
            </>
          )}
        </Para>

        <Table
          headers={copy.statusHeaders}
          rows={[
            [<Tag key="pending" variant="warn">JOB_STATUS_PENDING</Tag>, isKhmer ? "បានដាក់ជួរ និងកំពុងរង់ចាំដំណើរការ។ (Transient — បន្ត poll)" : "Queued and waiting for execution. (Transient — keep polling)"],
            [<Tag key="queued" variant="warn">JOB_STATUS_QUEUED</Tag>, isKhmer ? "ស្ថិតក្នុងជួរដំណើរការ។ (Transient — បន្ត poll)" : "In the execution queue. (Transient — keep polling)"],
            [<Tag key="running" variant="info">JOB_STATUS_RUNNING</Tag>, isKhmer ? "កំពុងស្កេន។ (Transient — បន្ត poll)" : "Currently scanning. (Transient — keep polling)"],
            [<Tag key="completed" variant="success">JOB_STATUS_COMPLETED</Tag>, isKhmer ? "បញ្ចប់ហើយ និងត្រៀមសម្រាប់ទាញយកលទ្ធផល។ (Terminal — ឈប់ poll)" : "Finished and ready for result retrieval. (Terminal — stop polling)"],
            [<Tag key="partial" variant="info">JOB_STATUS_PARTIAL</Tag>, isKhmer ? "បានបញ្ចប់ដោយផ្នែក — steps មួយចំនួនជោគជ័យ។ (Terminal — ឈប់ poll)" : "Partially completed — some steps succeeded. (Terminal — stop polling)"],
            [<Tag key="failed" variant="warn">JOB_STATUS_FAILED</Tag>, isKhmer ? "បានឈប់ដោយសារកំហុសក្នុងការដំណើរការ។ (Terminal — ឈប់ poll)" : "Stopped because of an execution error. (Terminal — stop polling)"],
            [<Tag key="cancelled" variant="warn">JOB_STATUS_CANCELLED</Tag>, isKhmer ? "ត្រូវបានបោះបង់ដោយដៃ ឬតាមកម្មវិធី។ (Terminal — ឈប់ poll)" : "Manually or programmatically cancelled. (Terminal — stop polling)"],
          ]}
        />

        <CodeBlock title="bash">{`$ aof scans status job_8f3a21cd --watch
[INFO] Job is running... (Elapsed: 45s)
[INFO] Job completed successfully!
Findings: 1 Critical, 3 High, 7 Medium, 12 Low`}</CodeBlock>
      </section>

      <section id="results" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.results}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              ទាញយក findings ដោយប្រើ <InlineCode>aof findings list</InlineCode>។
              អ្នកអាច export លទ្ធផលជា JSON សម្រាប់ប្រើក្នុង downstream automation។
            </>
          ) : (
            <>
              Retrieve findings using <InlineCode>aof findings list</InlineCode>.
              You can export the results as JSON for downstream automation.
            </>
          )}
        </Para>

        <Callout type="tip" title={copy.pagination}>
          {isKhmer ? (
            <>
              ប្រើ query parameters ដូចជា <InlineCode>?page=1&amp;limit=50</InlineCode> នៅពេល job
              ត្រឡប់ finding ច្រើន។
            </>
          ) : (
            <>
              Use query parameters like <InlineCode>?page=1&amp;limit=50</InlineCode> when the job returns a
              large finding set.
            </>
          )}
        </Callout>

        <CodeBlock title="bash">{`$ aof findings list job_8f3a21cd --format json > results.json`}</CodeBlock>
      </section>

      <section id="report" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.report}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              ទាញយក reports ដោយប្រើ <InlineCode>aof reports download</InlineCode>។
              អ្នកអាចស្នើ PDF ដែលមនុស្សអាចអានបានសម្រាប់ផ្ញើទៅ email។
            </>
          ) : (
            <>
              Download reports with <InlineCode>aof reports download</InlineCode>. You can
              request a human-readable PDF output to email to stakeholders.
            </>
          )}
        </Para>

        <Table
          headers={copy.parameterHeaders}
          rows={[
            [<InlineCode key="format">format</InlineCode>, <><InlineCode>pdf</InlineCode> · <InlineCode>json</InlineCode></>, <InlineCode key="default-pdf">pdf</InlineCode>],
            [<InlineCode key="evidence">include_evidence</InlineCode>, <><InlineCode>true</InlineCode> · <InlineCode>false</InlineCode></>, <InlineCode key="default-false">false</InlineCode>],
          ]}
        />

        <CodeBlock title="cURL">{`curl -X GET \\
  "https://api.platform.io/scans/jobs/job_8f3a21cd/report?format=pdf" \\
  -H "Authorization: Bearer $API_KEY" \\
  --output scan-report.pdf`}</CodeBlock>
      </section>

      <section id="pipeline" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.pipeline}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {copy.pipelineBody}
        </Para>

        <Callout type="info" title={isKhmer ? "ចំណាំ" : "Note"}>
          {isKhmer
            ? "សូមប្រើ interval យ៉ាងតិច 10 វិនាទីរវាង poll requests ដើម្បីជៀសវាង rate limiting។"
            : "Use a polling interval of at least 10 seconds between requests to avoid rate limiting."}
        </Callout>

        <CodeBlock title="GitHub Actions">{`name: Security Scan
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Install Auto-Offensive CLI
        run: curl -sL https://cli.auto-offensive.com/install.sh | bash

      - name: Run Security Scan & Quality Gate
        env:
          AOF_API_KEY: \${{ secrets.AOF_API_KEY }}
        run: |
          aof scans submit \\
            --project "\${{ vars.AOF_PROJECT_ID }}" \\
            --target "\${{ vars.TARGET_DOMAIN }}" \\
            --modules "subfinder,httpx,nuclei" \\
            --severity-threshold "critical,high" \\
            --watch \\
            --fail-pipeline`}</CodeBlock>
      </section>

      <section id="thresholds" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.thresholds}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              ប្រើ <InlineCode>severity_threshold</InlineCode> ដើម្បីគ្រប់គ្រងពេលដែល build គួរបរាជ័យ។
              វាផ្តល់វិធីអនុវត្តជាក់ស្តែងសម្រាប់ក្រុមក្នុងការកំណត់ security gates តាម environment។
            </>
          ) : (
            <>
              Use <InlineCode>severity_threshold</InlineCode> to control when the build should fail. This
              gives teams a practical way to tune security gates by environment.
            </>
          )}
        </Para>

        <Table
          headers={copy.thresholdHeaders}
          rows={[
            [<InlineCode key="critical">critical</InlineCode>, isKhmer ? "បរាជ័យតែនៅពេលរកឃើញ critical issues ប៉ុណ្ណោះ។" : "Fail only when critical issues are found."],
            [<InlineCode key="high">high</InlineCode>, isKhmer ? "បរាជ័យនៅពេលមាន high ឬ critical findings។" : "Fail on high or critical findings."],
            [<InlineCode key="medium">medium</InlineCode>, isKhmer ? "បរាជ័យនៅពេលមាន medium, high ឬ critical findings។" : "Fail on medium, high, or critical findings."],
            [<InlineCode key="low">low</InlineCode>, isKhmer ? "បរាជ័យនៅពេលមាន finding ណាមួយ។" : "Fail on any finding."],
            [isKhmer ? "មិនកំណត់" : "none set", isKhmer ? "តែងតែឆ្លង ហើយប្រើលទ្ធផលសម្រាប់ report ប៉ុណ្ណោះ។" : "Always pass and use the results for reporting only."],
          ]}
        />

        <Callout type="warn" title={copy.recommendation}>
          {isKhmer ? (
            <>
              ប្រើ <InlineCode>high</InlineCode> សម្រាប់ production deployment gates និង{" "}
              <InlineCode>medium</InlineCode> សម្រាប់ pre-production environments នៅពេលអ្នកចង់បានតុល្យភាពល្អរវាងល្បឿន និងសុវត្ថិភាព។
            </>
          ) : (
            <>
              Use <InlineCode>high</InlineCode> for production deployment gates and{" "}
              <InlineCode>medium</InlineCode> for pre-production environments when you want a better
              balance between velocity and security.
            </>
          )}
        </Callout>
      </section>

      <section id="access" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {copy.access}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer ? (
            <>
              Requests ត្រូវបានកំណត់សិទ្ធិទៅ workspace ដែលបាន authenticate ជានិច្ច។ Pipelines
              មិនអាចអាន scans, jobs ឬ reports ពី workspaces ផ្សេងទេ ហើយ invalid cross-workspace
              references គួរតែត្រឡប់ <InlineCode>403 Forbidden</InlineCode>។
            </>
          ) : (
            <>
              Requests are always scoped to the authenticated workspace. Pipelines cannot read scans,
              jobs, or reports from other workspaces, and invalid cross-workspace references should return{" "}
              <InlineCode>403 Forbidden</InlineCode>.
            </>
          )}
        </Para>

        <div className="space-y-3">
          {copy.accessItems.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-3 h-2 w-2 rounded-full bg-[#00BCA1] shrink-0" />
              <div
                className="text-base md:text-[18px] lg:text-[20px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.72]"
                style={sansFontStyle}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quota & Rate Limits */}
      <section id="quotas" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {isKhmer ? "Quota និង Rate Limits" : "Quotas & Rate Limits"}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Para>
          {isKhmer
            ? "Scan submissions ត្រូវបានកំណត់ដោយ daily quota និង per-minute rate limit។ Response headers ប្រាប់អ្នកពីស្ថានភាពបច្ចុប្បន្នរបស់អ្នក៖"
            : "Scan submissions are governed by a daily quota and per-minute rate limit. Response headers tell you your current standing:"}
        </Para>

        <Table
          headers={["Header", isKhmer ? "ការពិពណ៌នា" : "Description"]}
          rows={[
            [<InlineCode key="h1">X-RateLimit-Limit</InlineCode>, isKhmer ? "ចំនួន requests អតិបរមាក្នុង window បច្ចុប្បន្ន" : "Maximum requests allowed in the current window"],
            [<InlineCode key="h2">X-RateLimit-Remaining</InlineCode>, isKhmer ? "ចំនួន requests ដែលនៅសល់" : "Requests remaining in the current window"],
            [<InlineCode key="h3">X-RateLimit-Reset</InlineCode>, isKhmer ? "Unix timestamp នៅពេល window reset" : "Unix timestamp when the window resets"],
          ]}
        />

        <Para>
          {isKhmer
            ? "នៅពេលអ្នកលើស quota អ្នកនឹងទទួល 429 Too Many Requests។ Pipeline គួរតែរង់ចាំរហូតដល់ X-RateLimit-Reset timestamp មុនពេល retry។"
            : "When you exceed the quota, you receive a 429 Too Many Requests response. Your pipeline should wait until the X-RateLimit-Reset timestamp before retrying."}
        </Para>

        <CodeBlock title="429 response">{`HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1705363200

{
  "detail": "Daily scan quota exceeded. Resets at 2024-01-16T00:00:00Z"
}`}</CodeBlock>
      </section>

      {/* Error Handling in CI/CD */}
      <section id="errors" className="mb-16 scroll-mt-20">
        <h2
          className="text-[1.8rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-3"
          style={sansFontStyle}
        >
          {isKhmer ? "ការដោះស្រាយ Errors ក្នុង Pipeline" : "Error Handling in Pipelines"}
        </h2>
        <div className="h-px bg-[#E2DDD5] dark:bg-white/10 mb-6" />

        <Table
          headers={["Status", isKhmer ? "អត្ថន័យ" : "Meaning", isKhmer ? "សកម្មភាព Pipeline" : "Pipeline Action"]}
          rows={[
            [<span key="401" className="font-mono font-semibold text-[15px] md:text-[16px] text-red-600 dark:text-red-400">401</span>, isKhmer ? "API key មិនត្រឹមត្រូវ ឬផុតកំណត់" : "Invalid or expired API key", isKhmer ? "បោះបង់ — ពិនិត្យ secret configuration" : "Abort — check secret configuration"],
            [<span key="403" className="font-mono font-semibold text-[15px] md:text-[16px] text-red-600 dark:text-red-400">403</span>, isKhmer ? "Key មិនមានសិទ្ធិលើ project នេះ" : "Key not authorized for this project", isKhmer ? "បោះបង់ — ពិនិត្យ key scope" : "Abort — verify key scope"],
            [<span key="429" className="font-mono font-semibold text-[15px] md:text-[16px] text-amber-600 dark:text-amber-400">429</span>, isKhmer ? "Quota ឬ rate limit លើស" : "Quota or rate limit exceeded", isKhmer ? "រង់ចាំរហូតដល់ reset timestamp ហើយ retry" : "Wait until reset timestamp, then retry"],
            [<span key="5xx" className="font-mono font-semibold text-[15px] md:text-[16px] text-red-600 dark:text-red-400">5xx</span>, isKhmer ? "Server error" : "Server error", isKhmer ? "Retry ជាមួយ exponential backoff (អតិបរមា 3 ដង)" : "Retry with exponential backoff (max 3 attempts)"],
          ]}
        />

        <Callout type="tip" title={isKhmer ? "ការអនុវត្តល្អបំផុត" : "Best practices"}>
          {isKhmer ? (
            <ul className="list-disc pl-4 space-y-1">
              <li>រក្សាទុក API keys ក្នុង CI/CD secret managers (GitHub Secrets, GitLab CI Variables, Jenkins Credentials)</li>
              <li>បង្វិល keys នៅពេលសមាជិកក្រុមផ្លាស់ប្តូរ</li>
              <li>កំណត់ keys ទៅ projects ជាក់លាក់ — មិនប្រើ keys ដែលមានសិទ្ធិទូលំទូលាយ</li>
              <li>ប្រើ scopes តិចបំផុតដែលត្រូវការ (scan:submit, scan:read)</li>
            </ul>
          ) : (
            <ul className="list-disc pl-4 space-y-1">
              <li>Store API keys in CI/CD secret managers (GitHub Secrets, GitLab CI Variables, Jenkins Credentials)</li>
              <li>Rotate keys when team membership changes</li>
              <li>Scope keys to specific projects — avoid broad-access keys</li>
              <li>Use minimum required scopes (scan:submit, scan:read)</li>
            </ul>
          )}
        </Callout>
      </section>

      <DocsFooterNav
        previous={{ href: "/api", label: isKhmer ? "REST API" : "REST API" }}
        next={{ href: "/", label: isKhmer ? "ផ្ទាំងឯកសារ" : "Documentation Hub" }}
        previousText={isKhmer ? "មុន" : "Previous"}
        nextText={isKhmer ? "បន្ទាប់" : "Next"}
      />
    </article>
  );
}
