"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
    FolderKanban,
    Activity,
    AlertTriangle,
    Download,
    Radio,
    Ban,
    ChevronRight,
    KeyRound,
} from "lucide-react";
import DocsFooterNav from "@/components/document/docs-footer-nav";

const monoFontStyle = {
    fontFamily: "var(--docs-mono-font), monospace",
} as const;

function InlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code
            className="text-[14px] md:text-[15px] bg-[#F0EDE6] dark:bg-white/5 text-[#00BCA1] px-1.5 py-px rounded border border-[#E2DDD5] dark:border-white/10"
            style={monoFontStyle}
        >
            {children}
        </code>
    );
}

function Para({ children }: { children: React.ReactNode }) {
    return (
        <p
            className="text-[16px] md:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.78] mb-3"
            style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
        >
            {children}
        </p>
    );
}

const METHOD_STYLES: Record<string, string> = {
    GET: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-800/40",
    POST: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/20 dark:border-blue-800/40",
    PUT: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-900/20 dark:border-amber-800/40",
    DELETE:
        "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/20 dark:border-red-800/40",
};

function MethodBadge({ method }: { method: keyof typeof METHOD_STYLES }) {
    return (
        <span
            className={`font-mono text-[11px] font-bold tracking-[0.04em] px-2 py-0.5 rounded border ${METHOD_STYLES[method]}`}
        >
            {method}
        </span>
    );
}

function HighlightedCode({
    text,
    language,
}: {
    text: string;
    language: "bash" | "json" | "text";
}) {
    const lines = text.replace(/\t/g, "  ").split("\n");

    const renderBash = (line: string) => {
        if (line.trimStart().startsWith("#")) {
            return <span className="text-white/35 italic">{line}</span>;
        }
        if (line.startsWith("$ ")) {
            return (
                <>
                    <span className="text-white/30">$ </span>
                    <span className="text-white/75">{line.slice(2)}</span>
                </>
            );
        }
        return <span className="text-white/70">{line}</span>;
    };

    const renderJson = (line: string) => {
        // very lightweight: highlight quoted keys/strings and numbers
        const parts: React.ReactNode[] = [];
        const re = /("[^"]*")(\s*:)?|\b(\d+(?:\.\d+)?)\b|\b(true|false|null)\b/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        let i = 0;
        while ((match = re.exec(line)) !== null) {
            if (match.index > lastIndex) {
                parts.push(
                    <span key={`p-${i}`} className="text-white/55">
                        {line.slice(lastIndex, match.index)}
                    </span>
                );
            }
            if (match[1] && match[2]) {
                parts.push(
                    <span key={`k-${i}`} className="text-[#7DD3C8]">
                        {match[1]}
                    </span>
                );
                parts.push(
                    <span key={`c-${i}`} className="text-white/45">
                        {match[2]}
                    </span>
                );
            } else if (match[1]) {
                parts.push(
                    <span key={`s-${i}`} className="text-[#A8D8A8]">
                        {match[1]}
                    </span>
                );
            } else if (match[3]) {
                parts.push(
                    <span key={`n-${i}`} className="text-[#F9C860]">
                        {match[3]}
                    </span>
                );
            } else if (match[4]) {
                parts.push(
                    <span key={`b-${i}`} className="text-[#C0A8FF]">
                        {match[4]}
                    </span>
                );
            }
            lastIndex = re.lastIndex;
            i++;
        }
        if (lastIndex < line.length) {
            parts.push(
                <span key="tail" className="text-white/55">
                    {line.slice(lastIndex)}
                </span>
            );
        }
        return parts.length > 0 ? <>{parts}</> : <span className="text-white/55">{line}</span>;
    };

    return (
        <code
            className="block text-[13.5px] md:text-[14.5px] leading-[1.72] whitespace-pre"
            style={monoFontStyle}
        >
            {lines.map((line, idx) => (
                <div key={idx}>
                    {language === "bash"
                        ? renderBash(line)
                        : language === "json"
                            ? renderJson(line)
                            : <span className="text-white/65">{line}</span>}
                </div>
            ))}
        </code>
    );
}

function CodeBlock({
    title,
    language,
    text,
}: {
    title: string;
    language: "bash" | "json" | "text";
    text: string;
}) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        });
    };

    return (
        <div className="rounded-xl overflow-hidden my-3 border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-[#16181F]">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                    <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
                </div>
                <span className="font-mono text-[11px] text-white/30 tracking-wider">
                    {title} · {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="font-mono text-[10px] text-white/30 bg-transparent border-none cursor-pointer hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded transition-all duration-150"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="bg-[#16181F] px-5 py-4 overflow-x-auto">
                <HighlightedCode text={text} language={language} />
            </div>
        </div>
    );
}

function Recipe({
    id,
    method,
    path,
    title,
    description,
    request,
    response,
}: {
    id: string;
    method: keyof typeof METHOD_STYLES;
    path: string;
    title: string;
    description?: React.ReactNode;
    request: string;
    response?: string;
}) {
    return (
        <section
            id={id}
            className="doc-section scroll-mt-24 mb-8 rounded-2xl border border-[#E2DDD5] dark:border-white/10 bg-white/95 dark:bg-[#101114] p-5 md:p-6 shadow-[0_8px_22px_rgba(26,23,20,0.04)] dark:shadow-[0_8px_22px_rgba(0,0,0,0.22)]"
        >
            <div className="flex flex-wrap items-center gap-2 mb-3">
                <MethodBadge method={method} />
                <code
                    className="text-[14px] md:text-[15px] font-semibold text-[#1A1714] dark:text-white"
                    style={monoFontStyle}
                >
                    {path}
                </code>
            </div>
            <h3
                className="text-[1.25rem] md:text-[1.35rem] font-semibold tracking-[-0.02em] text-[#1A1714] dark:text-white mb-2"
                style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
            >
                {title}
            </h3>
            {description ? (
                <div className="text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] mb-2">
                    {description}
                </div>
            ) : null}

            <CodeBlock title="request" language="bash" text={request} />
            {response ? (
                <CodeBlock title="response" language="json" text={response} />
            ) : null}
        </section>
    );
}

function GroupHeading({
    id,
    icon,
    eyebrow,
    children,
}: {
    id: string;
    icon: React.ReactNode;
    eyebrow: string;
    children: React.ReactNode;
}) {
    return (
        <div
            id={id}
            className="doc-section scroll-mt-24 mb-4 pt-12 flex items-start gap-3"
        >
            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                {icon}
            </div>
            <div>
                <div className="text-[10.5px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0F766E] dark:text-[#7DE7D8]">
                    {eyebrow}
                </div>
                <h2
                    className="text-[1.55rem] md:text-[1.75rem] font-bold tracking-[-0.025em] text-[#1A1714] dark:text-white leading-tight"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {children}
                </h2>
            </div>
        </div>
    );
}

/* ───────────────────────── snippets ───────────────────────── */

const PROJ_CREATE_REQ = `curl -X POST https://api.auto-offensive.com/projects \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Web App",
    "description": "Production web servers"
  }'`;

const PROJ_CREATE_RES = `{
  "id": "proj_abc123",
  "name": "My Web App",
  "description": "Production web servers",
  "owner_id": "user_xyz789",
  "created_at": "2024-01-15T10:30:00Z"
}`;

const PROJ_LIST_REQ = `curl https://api.auto-offensive.com/projects \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const PROJ_LIST_RES = `{
  "projects": [
    {
      "id": "proj_abc123",
      "name": "My Web App",
      "description": "Production web servers",
      "target_count": 3,
      "scan_count": 12,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}`;

const PROJ_GET_REQ = `PROJECT_ID="proj_abc123"
curl https://api.auto-offensive.com/projects/$PROJECT_ID \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const PROJ_GET_RES = `{
  "id": "proj_abc123",
  "name": "My Web App",
  "description": "Production web servers",
  "owner_id": "user_xyz789",
  "target_count": 3,
  "scan_count": 12,
  "latest_finding": {
    "id": "finding_def456",
    "severity": "medium",
    "host": "api.example.com",
    "port": 443
  },
  "created_at": "2024-01-15T10:30:00Z"
}`;

const PROJ_UPDATE_REQ = `PROJECT_ID="proj_abc123"
curl -X PUT https://api.auto-offensive.com/projects/$PROJECT_ID \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Web App (Updated)",
    "description": "Production and staging servers"
  }'`;

const PROJ_DELETE_REQ = `PROJECT_ID="proj_abc123"
curl -X DELETE https://api.auto-offensive.com/projects/$PROJECT_ID \\
  -H "Authorization: Bearer $AOF_API_KEY"
# 204 No Content on success`;

const SCAN_BASIC_REQ = `PROJECT_ID="proj_abc123"
curl -X POST https://api.auto-offensive.com/scans/basic \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "'$PROJECT_ID'",
    "target": "example.com",
    "tool": "subfinder",
    "timeout_seconds": 300
  }'`;

const SCAN_BASIC_RES = `{
  "job_id": "job_xyz789",
  "project_id": "proj_abc123",
  "status": "QUEUED",
  "steps": [
    { "step_id": "step_1", "tool": "subfinder", "status": "QUEUED" }
  ],
  "created_at": "2024-01-15T11:00:00Z"
}`;

const SCAN_ADV_REQ = `PROJECT_ID="proj_abc123"
curl -X POST https://api.auto-offensive.com/scans/advanced \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "'$PROJECT_ID'",
    "target": "example.com",
    "command": "subfinder -d example.com | httpx -sc | naabu -top-ports 1000",
    "timeout_seconds": 600
  }'`;

const SCAN_ADV_RES = `{
  "job_id": "job_abc111",
  "project_id": "proj_abc123",
  "status": "QUEUED",
  "steps": [
    { "step_id": "step_1", "tool": "subfinder", "status": "QUEUED" },
    { "step_id": "step_2", "tool": "httpx",     "status": "QUEUED" },
    { "step_id": "step_3", "tool": "naabu",     "status": "QUEUED" }
  ],
  "created_at": "2024-01-15T11:05:00Z"
}`;

const SCAN_STATUS_REQ = `JOB_ID="job_xyz789"
curl https://api.auto-offensive.com/scans/$JOB_ID \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const SCAN_STATUS_RES = `{
  "job_id": "job_xyz789",
  "status": "RUNNING",
  "progress_percent": 45,
  "steps": [
    { "step_id": "step_1", "tool": "subfinder", "status": "COMPLETED", "result_count": 42 },
    { "step_id": "step_2", "tool": "httpx",     "status": "RUNNING",   "result_count": 18 }
  ],
  "started_at": "2024-01-15T11:01:00Z"
}`;

const SCAN_LOGS_REQ = `JOB_ID="job_xyz789"
curl -N https://api.auto-offensive.com/scans/$JOB_ID/logs \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const SCAN_LOGS_OUT = `data: {"timestamp":"2024-01-15T11:01:00Z","step_id":"step_1","source":"SYSTEM","message":"Starting subfinder on example.com"}
data: {"timestamp":"2024-01-15T11:01:05Z","step_id":"step_1","source":"STDOUT","message":"api.example.com"}
data: {"timestamp":"2024-01-15T11:01:06Z","step_id":"step_1","source":"STDOUT","message":"www.example.com"}
data: {"timestamp":"2024-01-15T11:01:30Z","step_id":"step_1","source":"SYSTEM","message":"Step completed","is_final_chunk":true}`;

const QUEUE_POS_REQ = `JOB_ID="job_xyz789"
curl https://api.auto-offensive.com/queue/jobs/$JOB_ID/position \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const QUEUE_POS_RES = `{
  "job_id": "job_xyz789",
  "position": 3,
  "total_in_queue": 12
}`;

const SCAN_CANCEL_REQ = `JOB_ID="job_xyz789"
curl -X POST https://api.auto-offensive.com/scans/$JOB_ID/cancel \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const SCAN_CANCEL_RES = `{
  "job_id": "job_xyz789",
  "status": "CANCELLED",
  "cancelled_at": "2024-01-15T11:02:00Z"
}`;

const FIND_LIST_REQ = `PROJECT_ID="proj_abc123"
curl "https://api.auto-offensive.com/findings?project_id=$PROJECT_ID" \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const FIND_LIST_RES = `{
  "findings": [
    {
      "id": "finding_1",
      "job_id": "job_xyz789",
      "step_id": "step_1",
      "severity": "high",
      "host": "api.example.com",
      "port": 443,
      "service": "nginx/1.18.0",
      "title": "Web server detected",
      "metadata": { "status_code": 200, "response_time": "145ms" },
      "created_at": "2024-01-15T11:10:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "per_page": 20
}`;

const FIND_FILTER_REQ = `PROJECT_ID="proj_abc123"
curl "https://api.auto-offensive.com/findings?project_id=$PROJECT_ID&severity=critical,high&host=api.example.com&limit=50&offset=0" \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const FIND_GET_REQ = `FINDING_ID="finding_1"
curl https://api.auto-offensive.com/findings/$FINDING_ID \\
  -H "Authorization: Bearer $AOF_API_KEY"`;

const FIND_GET_RES = `{
  "id": "finding_1",
  "job_id": "job_xyz789",
  "project_id": "proj_abc123",
  "severity": "high",
  "host": "api.example.com",
  "port": 443,
  "service": "nginx/1.18.0",
  "title": "Web server detected",
  "description": "An nginx web server is running and responding to requests",
  "recommendation": "Verify the service version and apply security patches",
  "metadata": {
    "status_code": 200,
    "response_time": "145ms",
    "ssl_version": "TLSv1.2"
  },
  "raw_output": "api.example.com:443 [200] [nginx/1.18.0]",
  "created_at": "2024-01-15T11:10:00Z"
}`;

const FIND_EXPORT_JSON_REQ = `PROJECT_ID="proj_abc123"
curl "https://api.auto-offensive.com/findings/export?project_id=$PROJECT_ID&format=json&severity=high" \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -o findings.json`;

const FIND_EXPORT_CSV_REQ = `PROJECT_ID="proj_abc123"
curl "https://api.auto-offensive.com/findings/export?project_id=$PROJECT_ID&format=csv&severity=critical,high" \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -o findings.csv

# CSV preview
head -3 findings.csv`;

const FIND_EXPORT_CSV_OUT = `id,severity,host,port,service,title,created_at
finding_1,high,api.example.com,443,nginx/1.18.0,Web server detected,2024-01-15T11:10:00Z
finding_2,medium,mail.example.com,25,Postfix,Open SMTP port,2024-01-15T11:12:00Z`;

/* ───────────────────────── component ───────────────────────── */

export default function ApiRecipesContent() {
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

    return (
        <main
            className="flex-1 min-w-0 px-8 md:px-12 xl:px-14 pt-12 pb-24 max-[640px]:px-5"
            lang={isKhmer ? "km" : "en"}
            style={{ fontFamily: "var(--docs-sans-font), sans-serif", ...pageFontVars }}
        >
            {/* Page header */}
            <div className="mb-8 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-1 rounded-full mb-4">
                    <KeyRound className="size-3" />
                    {isKhmer ? "Recipes ដែលអាចចម្លងបាន" : "Copy-paste recipes"}
                </div>
                <h1
                    className="text-[2.4rem] md:text-[2.8rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer ? "ឯកសារយោង API" : "API Recipes"}
                </h1>
                <p
                    className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer
                        ? "Recipes ច្បាស់លាស់សម្រាប់ Projects, Scans និង Findings APIs — request, response, និងជម្រើស filter ដែលអ្នកនឹងប្រើជាញឹកញាប់បំផុត។"
                        : "Tight, copy-paste curl recipes for the Projects, Scans, and Findings APIs — request, response, and the filters you reach for most often."}
                </p>

                <div className="mt-6 rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/80 dark:bg-[#101114] p-5">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#88837B] dark:text-[#9CA3AF] mb-3">
                        {isKhmer ? "មុនពេលអ្នកចាប់ផ្តើម" : "Before you start"}
                    </p>
                    <ul className="space-y-2 text-[15px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]">
                        <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 mt-1 text-[#00BCA1] shrink-0" />
                            <span>
                                {isKhmer
                                    ? "អ្នកបានផ្ទៀងផ្ទាត់ជាមួយ project-scoped API key ដែលរក្សាទុកក្នុង"
                                    : "You're authenticated with a project-scoped API key stored in"}{" "}
                                <InlineCode>$AOF_API_KEY</InlineCode>
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 mt-1 text-[#00BCA1] shrink-0" />
                            <span>
                                {isKhmer ? "API URL របស់អ្នកគឺ" : "Your API base URL is"}{" "}
                                <InlineCode>https://api.auto-offensive.com</InlineCode>{" "}
                                {isKhmer ? "(ប្តូរតាម deployment របស់អ្នក)" : "(replace with yours)"}
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <ChevronRight className="size-4 mt-1 text-[#00BCA1] shrink-0" />
                            <span>
                                {isKhmer
                                    ? "អ្នកមាន curl ឬ HTTP client ដែលដំឡើងហើយ"
                                    : "You have curl or another HTTP client installed"}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* PROJECTS */}
            <GroupHeading id="projects" icon={<FolderKanban />} eyebrow="Projects API">
                {isKhmer ? "គ្រប់គ្រង Projects" : "Manage projects"}
            </GroupHeading>

            <Recipe
                id="proj-create"
                method="POST"
                path="/projects"
                title={isKhmer ? "បង្កើត project" : "Create a project"}
                description={
                    isKhmer
                        ? "បង្កើត project ដំបូងរបស់អ្នក។ បន្ទាប់មកអ្នកនឹងបន្ថែម targets និងដាក់បញ្ជូន scans ទៅវា។"
                        : "Submit your first project. Later you'll add targets and submit scans to it."
                }
                request={PROJ_CREATE_REQ}
                response={PROJ_CREATE_RES}
            />

            <Recipe
                id="proj-list"
                method="GET"
                path="/projects"
                title={isKhmer ? "បញ្ជី projects ទាំងអស់" : "List all projects"}
                request={PROJ_LIST_REQ}
                response={PROJ_LIST_RES}
            />

            <Recipe
                id="proj-get"
                method="GET"
                path="/projects/{id}"
                title={isKhmer ? "ទាញ project មួយ" : "Get one project"}
                description={
                    isKhmer ? (
                        <>
                            ប្តូរ <InlineCode>{`{id}`}</InlineCode> ជាមួយ project ID របស់អ្នក
                            (ឧ. <InlineCode>proj_abc123</InlineCode>)។
                        </>
                    ) : (
                        <>
                            Replace <InlineCode>{`{id}`}</InlineCode> with your project ID (e.g.{" "}
                            <InlineCode>proj_abc123</InlineCode>).
                        </>
                    )
                }
                request={PROJ_GET_REQ}
                response={PROJ_GET_RES}
            />

            <Recipe
                id="proj-update"
                method="PUT"
                path="/projects/{id}"
                title={isKhmer ? "កែ project" : "Update a project"}
                request={PROJ_UPDATE_REQ}
            />

            <Recipe
                id="proj-delete"
                method="DELETE"
                path="/projects/{id}"
                title={isKhmer ? "លុប project" : "Delete a project"}
                description={
                    isKhmer
                        ? "លុប project និង scans/findings ទាំងអស់របស់វា។ វាមិនអាចត្រឡប់វិញបានទេ។"
                        : "Remove a project and all its scans and findings. This cannot be undone."
                }
                request={PROJ_DELETE_REQ}
            />

            {/* SCANS */}
            <GroupHeading id="scans" icon={<Activity />} eyebrow="Scans API">
                {isKhmer ? "ដាក់បញ្ជូន និងតាមដាន scans" : "Submit and track scans"}
            </GroupHeading>

            <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/95 dark:bg-[#101114] mb-6">
                <table className="w-full text-[14.5px] border-collapse">
                    <thead className="bg-[#F0EDE6] dark:bg-white/5">
                        <tr>
                            {(isKhmer ? ["Type", "ល្អបំផុតសម្រាប់", "ឧទាហរណ៍"] : ["Type", "Best for", "Example"]).map(
                                (h) => (
                                    <th
                                        key={h}
                                        className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-[#88837B] dark:text-[#9CA3AF] px-4 py-2.5 text-left border-b border-[#E2DDD5] dark:border-white/10"
                                    >
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            {
                                type: "Basic",
                                best: isKhmer ? "Single tool, ការត្រួតពិនិត្យលឿន" : "Single tool, quick check",
                                example: "httpx -u https://example.com",
                            },
                            {
                                type: "Medium",
                                best: isKhmer ? "Tool មួយជាមួយ preset options" : "One tool with preset options",
                                example: "httpx --sc --location --random-agent",
                            },
                            {
                                type: "Advanced",
                                best: isKhmer ? "Unix pipeline, multi-step" : "Unix pipeline, multi-step workflows",
                                example: "subfinder -d example.com | httpx -sc",
                            },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                <td className="px-4 py-3 border-b border-[#E2DDD5] dark:border-white/10 last:border-b-0 align-top font-semibold text-[#1A1714] dark:text-white">
                                    {row.type}
                                </td>
                                <td className="px-4 py-3 border-b border-[#E2DDD5] dark:border-white/10 align-top text-[#4A4540] dark:text-[#C9CDD4] leading-[1.55]">
                                    {row.best}
                                </td>
                                <td
                                    className="px-4 py-3 border-b border-[#E2DDD5] dark:border-white/10 align-top text-[#00BCA1]"
                                    style={monoFontStyle}
                                >
                                    {row.example}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Recipe
                id="scan-basic"
                method="POST"
                path="/scans/basic"
                title={isKhmer ? "ដាក់បញ្ជូន basic scan" : "Submit a basic scan"}
                description={
                    isKhmer
                        ? "ដំណើរការ tool តែមួយជាមួយ presets ស្រាល។ លឿន និងសាមញ្ញ។"
                        : "Run a single tool with light presets. Fast and simple."
                }
                request={SCAN_BASIC_REQ}
                response={SCAN_BASIC_RES}
            />

            <Recipe
                id="scan-advanced"
                method="POST"
                path="/scans/advanced"
                title={isKhmer ? "ដាក់បញ្ជូន advanced scan (pipeline)" : "Submit an advanced scan (pipeline)"}
                description={
                    isKhmer
                        ? "ភ្ជាប់ tools ជាមួយ pipes Unix-style។ ខ្លាំងសម្រាប់ multi-step recon។"
                        : "Chain tools together Unix-style. Powerful for multi-step reconnaissance."
                }
                request={SCAN_ADV_REQ}
                response={SCAN_ADV_RES}
            />

            <Recipe
                id="scan-status"
                method="GET"
                path="/scans/{id}"
                title={isKhmer ? "ពិនិត្យ status នៃ scan" : "Check scan status"}
                description={
                    isKhmer ? (
                        <>
                            Statuses ដែលអាចមាន៖{" "}
                            <InlineCode>QUEUED</InlineCode> · <InlineCode>RUNNING</InlineCode> ·{" "}
                            <InlineCode>COMPLETED</InlineCode> ·{" "}
                            <InlineCode>FAILED</InlineCode> ·{" "}
                            <InlineCode>PARTIAL</InlineCode> ·{" "}
                            <InlineCode>SKIPPED</InlineCode>។
                        </>
                    ) : (
                        <>
                            Possible statuses: <InlineCode>QUEUED</InlineCode>,{" "}
                            <InlineCode>RUNNING</InlineCode>,{" "}
                            <InlineCode>COMPLETED</InlineCode>, <InlineCode>FAILED</InlineCode>,{" "}
                            <InlineCode>PARTIAL</InlineCode>, <InlineCode>SKIPPED</InlineCode>.
                        </>
                    )
                }
                request={SCAN_STATUS_REQ}
                response={SCAN_STATUS_RES}
            />

            <Recipe
                id="scan-logs"
                method="GET"
                path="/scans/{id}/logs"
                title={isKhmer ? "Stream logs ផ្ទាល់" : "Stream scan logs (live)"}
                description={
                    isKhmer
                        ? "ប្រើ Server-Sent Events (SSE) សម្រាប់ការ stream លទ្ធផលនៅពេលជាក់ស្តែង។ Stream បញ្ចប់នៅពេល is_final_chunk = true។"
                        : "Server-Sent Events (SSE) stream logs in real time. The stream ends when is_final_chunk is true."
                }
                request={SCAN_LOGS_REQ}
                response={undefined}
            />
            <CodeBlock title="output stream" language="text" text={SCAN_LOGS_OUT} />

            <Recipe
                id="queue-position"
                method="GET"
                path="/queue/jobs/{id}/position"
                title={isKhmer ? "ទទួលបាន position ក្នុង queue" : "Get queue position"}
                request={QUEUE_POS_REQ}
                response={QUEUE_POS_RES}
            />

            <Recipe
                id="scan-cancel"
                method="POST"
                path="/scans/{id}/cancel"
                title={isKhmer ? "បោះបង់ scan" : "Cancel a scan"}
                description={
                    isKhmer
                        ? "ឈប់ scan ដែលកំពុងដំណើរការឬនៅក្នុងជួររង់ចាំភ្លាមៗ។"
                        : "Stop a running or queued scan immediately."
                }
                request={SCAN_CANCEL_REQ}
                response={SCAN_CANCEL_RES}
            />

            {/* FINDINGS */}
            <GroupHeading id="findings" icon={<AlertTriangle />} eyebrow="Findings API">
                {isKhmer ? "សួរ និង export findings" : "Query and export findings"}
            </GroupHeading>

            <Recipe
                id="find-list"
                method="GET"
                path="/findings"
                title={isKhmer ? "បញ្ជី findings (paginated)" : "List findings (paginated)"}
                description={
                    isKhmer
                        ? "ទាញ findings ទាំងអស់ឆ្លងកាត់រាល់ scans នៅក្នុង project មួយ។"
                        : "Fetch all findings across all scans in a project."
                }
                request={FIND_LIST_REQ}
                response={FIND_LIST_RES}
            />

            <Recipe
                id="find-filter"
                method="GET"
                path="/findings?severity=...&host=...&port=..."
                title={isKhmer ? "ត្រងតាម severity, host, port" : "Filter by severity, host, port"}
                description={
                    isKhmer ? (
                        <>
                            កម្រិត Severity (ពីខ្ពស់ទាបបំផុត)៖ <InlineCode>critical</InlineCode>,{" "}
                            <InlineCode>high</InlineCode>, <InlineCode>medium</InlineCode>,{" "}
                            <InlineCode>low</InlineCode>, <InlineCode>info</InlineCode>។ ផ្សំ
                            filters ជាមួយ <InlineCode>limit</InlineCode> និង{" "}
                            <InlineCode>offset</InlineCode> សម្រាប់ pagination។
                        </>
                    ) : (
                        <>
                            Severity levels (high to low): <InlineCode>critical</InlineCode>,{" "}
                            <InlineCode>high</InlineCode>, <InlineCode>medium</InlineCode>,{" "}
                            <InlineCode>low</InlineCode>, <InlineCode>info</InlineCode>. Combine
                            filters with <InlineCode>limit</InlineCode> and{" "}
                            <InlineCode>offset</InlineCode> for pagination.
                        </>
                    )
                }
                request={FIND_FILTER_REQ}
            />

            <Recipe
                id="find-get"
                method="GET"
                path="/findings/{id}"
                title={isKhmer ? "ទាញ finding មួយ" : "Get one finding"}
                request={FIND_GET_REQ}
                response={FIND_GET_RES}
            />

            <Recipe
                id="find-export-json"
                method="GET"
                path="/findings/export?format=json"
                title={isKhmer ? "Export findings ជា JSON" : "Export findings as JSON"}
                request={FIND_EXPORT_JSON_REQ}
            />

            <Recipe
                id="find-export-csv"
                method="GET"
                path="/findings/export?format=csv"
                title={isKhmer ? "Export findings ជា CSV" : "Export findings as CSV"}
                description={
                    isKhmer
                        ? "ទាញយក findings ជា spreadsheet។ បើកក្នុង Excel, Google Sheets ឬ tools ផ្សេងទៀត។"
                        : "Download findings as a spreadsheet. Open in Excel, Google Sheets, or any spreadsheet tool."
                }
                request={FIND_EXPORT_CSV_REQ}
            />
            <CodeBlock title="findings.csv" language="text" text={FIND_EXPORT_CSV_OUT} />

            {/* Errors */}
            <GroupHeading id="errors" icon={<Ban />} eyebrow="Errors">
                {isKhmer ? "Errors ទូទៅ" : "Common error responses"}
            </GroupHeading>

            <div className="space-y-3">
                {[
                    {
                        code: "401 Unauthorized",
                        en: "Your API key is missing or invalid. Verify $AOF_API_KEY is set and not expired.",
                        kh: "API key បាត់ ឬមិនត្រឹមត្រូវ។ ផ្ទៀងផ្ទាត់ $AOF_API_KEY ថាត្រូវបានកំណត់ និងមិនផុតកំណត់។",
                    },
                    {
                        code: "403 Forbidden",
                        en: "You do not own this project. Only the owner can read or modify it.",
                        kh: "អ្នកមិនមែនជាម្ចាស់ project នេះទេ។ មានតែម្ចាស់ប៉ុណ្ណោះដែលអាចអាន ឬកែប្រែវា។",
                    },
                    {
                        code: "404 Not Found",
                        en: "The resource doesn't exist. Double-check IDs.",
                        kh: "Resource នេះមិនមានទេ។ ពិនិត្យ IDs របស់អ្នកម្តងទៀត។",
                    },
                    {
                        code: "409 Conflict — Scan already running",
                        en: "Two scans against the same target in the same project at once aren't allowed. Wait for the first to finish.",
                        kh: "មិនអាចដាក់បញ្ជូន scans ពីរទៅ target ដូចគ្នាក្នុង project តែមួយក្នុងពេលតែមួយទេ។ រង់ចាំ scan ដំបូងចប់សិន។",
                    },
                    {
                        code: "400 Bad Request — Invalid pipeline command",
                        en: "Pipeline syntax is wrong. Double-check quotes and pipes.",
                        kh: "Syntax pipeline មិនត្រឹមត្រូវ។ ពិនិត្យ quotes និង pipes ឡើងវិញ។",
                    },
                    {
                        code: "503 Service Unavailable — Queue full",
                        en: "Too many scans are queued. Wait a few seconds and retry.",
                        kh: "មាន scans ច្រើនពេកក្នុងជួរ។ រង់ចាំពីរបីវិនាទី រួចព្យាយាមម្តងទៀត។",
                    },
                    {
                        code: "413 Payload Too Large",
                        en: "Your scan command exceeds 5000 characters. Simplify it or split it into smaller scans.",
                        kh: "Scan command លើស ៥០០០ តួអក្សរ។ ធ្វើឱ្យសាមញ្ញ ឬបំបែកជា scans តូចៗ។",
                    },
                ].map((row) => (
                    <div
                        key={row.code}
                        className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/95 dark:bg-[#101114] p-4"
                    >
                        <div className={`font-mono text-[14px] md:text-[15px] font-semibold tracking-[0.02em] mb-1 ${
                            row.code.startsWith('401') || row.code.startsWith('403') || row.code.startsWith('404') || row.code.startsWith('413') || row.code.startsWith('5')
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-amber-600 dark:text-amber-400'
                        }`}>
                            {row.code}
                        </div>
                        <div className="text-[15px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]">
                            {isKhmer ? row.kh : row.en}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick references */}
            <GroupHeading id="quick-ref" icon={<Radio />} eyebrow="At a glance">
                {isKhmer ? "ឯកសារយោងលឿន" : "Quick reference"}
            </GroupHeading>

            <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/95 dark:bg-[#101114] p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <Download className="size-4 text-[#0F766E] dark:text-[#7DE7D8]" />
                        <h4
                            className="text-[15px] font-semibold text-[#1A1714] dark:text-white"
                            style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                        >
                            {isKhmer ? "Status codes នៃ scan" : "Scan status codes"}
                        </h4>
                    </div>
                    <ul className="text-[14.5px] text-[#4A4540] dark:text-[#C9CDD4] space-y-1.5">
                        {[
                            ["QUEUED", "Waiting in the queue"],
                            ["RUNNING", "Worker has started the scan"],
                            ["COMPLETED", "All steps finished successfully"],
                            ["PARTIAL", "Some steps succeeded, some did not"],
                            ["FAILED", "Scan failed before completion"],
                            ["SKIPPED", "Scan was skipped (e.g., duplicate)"],
                        ].map(([code, desc]) => (
                            <li key={code} className="flex gap-3">
                                <span
                                    className="font-mono text-[12.5px] text-[#00BCA1] w-24 shrink-0"
                                    style={monoFontStyle}
                                >
                                    {code}
                                </span>
                                <span className="leading-[1.55]">{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/95 dark:bg-[#101114] p-5">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="size-4 text-[#0F766E] dark:text-[#7DE7D8]" />
                        <h4
                            className="text-[15px] font-semibold text-[#1A1714] dark:text-white"
                            style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                        >
                            {isKhmer ? "Severity (ខ្ពស់ទៅទាប)" : "Severity (high to low)"}
                        </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: "CRITICAL", color: "#C42828", bg: "rgba(196,40,40,0.08)" },
                            { label: "HIGH", color: "#B86800", bg: "rgba(184,104,0,0.08)" },
                            { label: "MEDIUM", color: "#1D57C8", bg: "rgba(29,87,200,0.08)" },
                            { label: "LOW", color: "#1A7A4A", bg: "rgba(26,122,74,0.08)" },
                            { label: "INFO", color: "#88837B", bg: "rgba(136,131,123,0.08)" },
                        ].map((s) => (
                            <span
                                key={s.label}
                                className="font-mono text-[10.5px] font-bold tracking-[0.08em] px-2 py-1 rounded border"
                                style={{
                                    color: s.color,
                                    background: s.bg,
                                    borderColor: `${s.color}33`,
                                }}
                            >
                                {s.label}
                            </span>
                        ))}
                    </div>
                    <Para>
                        {isKhmer
                            ? "ប្រើ severity ច្រើនជាមួយគ្នាដោយដាក់ comma — ឧទាហរណ៍ "
                            : "Combine severities with commas — for example, "}
                        <InlineCode>severity=critical,high</InlineCode>.
                    </Para>
                </div>
            </div>

            <DocsFooterNav
                previous={{ href: "/tools", label: isKhmer ? "ឯកសារ Tools" : "Tool Reference" }}
                next={{
                    href: "/",
                    label: isKhmer ? "ផ្ទាំងឯកសារ" : "Documentation Hub",
                }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
