"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Brain, Sparkles, Telescope, Wrench, DollarSign, MessageSquare, Info, Lightbulb } from "lucide-react";
import DocsFooterNav from "@/components/document/docs-footer-nav";

const monoFontStyle = { fontFamily: "var(--docs-mono-font), monospace" } as const;
const sansFontStyle = { fontFamily: "var(--docs-sans-font), sans-serif" } as const;

function InlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="text-[14px] md:text-[15px] bg-[#F0EDE6] dark:bg-white/5 text-[#00BCA1] px-1.5 py-px rounded border border-[#E2DDD5] dark:border-white/10" style={monoFontStyle}>
            {children}
        </code>
    );
}

function Para({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[16px] md:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.78] mb-3" style={sansFontStyle}>{children}</p>
    );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2 id={id} className="doc-section text-[1.7rem] md:text-[1.9rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-4 pt-12 scroll-mt-6" style={sansFontStyle}>{children}</h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[1.2rem] font-semibold text-[#1A1714] dark:text-white mt-6 mb-2" style={sansFontStyle}>{children}</h3>
    );
}

function CodeBlock({ title, children }: { title: string; children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLElement>(null);
    const handleCopy = () => {
        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
            });
        }
    };
    return (
        <div className="rounded-xl overflow-hidden my-4 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.14)]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-[#16181F]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <span className="font-mono text-[11px] text-white/30 tracking-wider">{title}</span>
                <button onClick={handleCopy} className="font-mono text-[10px] text-white/30 hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="bg-[#16181F] px-5 py-4 overflow-x-auto">
                <code ref={codeRef} className="text-[14px] md:text-[15px] leading-[1.85] text-white/65 whitespace-pre" style={monoFontStyle}>{children}</code>
            </div>
        </div>
    );
}

function Callout({ type, icon, title, children }: { type: "info" | "tip" | "warn"; icon: React.ReactNode; title: string; children: React.ReactNode }) {
    const styles: Record<string, string> = {
        info: "border-l-[#1D57C8] bg-[rgba(29,87,200,0.04)]",
        tip: "border-l-[#1A7A4A] bg-[rgba(26,122,74,0.04)]",
        warn: "border-l-[#B86800] bg-[rgba(184,104,0,0.04)]",
    };
    const titleColors: Record<string, string> = { info: "text-[#1D57C8]", tip: "text-[#1A7A4A]", warn: "text-[#B86800]" };
    return (
        <div className={`flex gap-3 px-4 py-3.5 rounded-lg border border-[#E2DDD5] dark:border-white/10 border-l-[3px] my-4 dark:bg-white/3 ${styles[type]}`}>
            <span className="shrink-0 mt-0.5 [&_svg]:size-4">{icon}</span>
            <div className="flex-1">
                <div className={`text-[11px] font-bold tracking-[0.07em] uppercase mb-1 ${titleColors[type]}`}>{title}</div>
                <div className="text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]" style={sansFontStyle}>{children}</div>
            </div>
        </div>
    );
}

export default function AIAnalysisContent() {
    const locale = useLocale();
    const isKhmer = locale === "kh";
    const pageFontVars = {
        "--docs-sans-font": isKhmer ? "var(--font-noto-khmer), var(--font-google-sans)" : "var(--font-google-sans), var(--font-noto-khmer)",
        "--docs-mono-font": isKhmer ? "var(--font-jetbrains-mono), var(--font-noto-khmer), var(--font-google-sans)" : "var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer)",
    } as CSSProperties;

    return (
        <main className="flex-1 min-w-0 px-8 md:px-12 xl:px-14 pt-12 pb-24 max-[640px]:px-5" lang={isKhmer ? "km" : "en"} style={{ fontFamily: "var(--docs-sans-font), sans-serif", ...pageFontVars }}>
            <div className="mb-10 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-1 rounded-full mb-4">
                    <Brain className="size-3" />
                    {isKhmer ? "ដំណើរការដោយ Claude AI" : "Powered by Claude AI"}
                </div>
                <h1 className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4" style={sansFontStyle}>
                    {isKhmer ? "ការវិភាគ AI" : "AI Analysis"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "ប្តូរ scan findings ដែលជា raw ទៅជា actionable insights។ AI Analysis ប្រើ Claude models និង MCP tools ដើម្បីផ្តល់ next-step recommendations និង deep analysis ដែលមាន CVE/OWASP context។"
                        : "Turn raw scan findings into actionable insights. AI Analysis uses Claude models and MCP tools to deliver next-step recommendations and deep analysis enriched with CVE and OWASP context."}
                </p>
            </div>

            {/* Overview */}
            <section id="overview" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="overview">{isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "នៅពេល scan បញ្ចប់ អ្នកមានបញ្ជី findings — ប៉ុន្តែតើ findings ណាដែលសំខាន់? តើអ្នកគួរធ្វើអ្វីបន្ទាប់? AI Analysis ឆ្លើយសំណួរទាំងនេះដោយការវិភាគលទ្ធផល scan ជាមួយ Claude និងផ្តល់ output ដែលមានរចនាសម្ព័ន្ធច្បាស់លាស់។"
                        : "When a scan finishes, you have a list of findings — but which findings matter? What should you do next? AI Analysis answers these questions by analyzing your scan results with Claude and returning a structured output."}
                </Para>

                <SubHeading>{isKhmer ? "តើវាដំណើរការយ៉ាងម៉េច?" : "How it works"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7]" style={sansFontStyle}>
                    <li>{isKhmer ? "អ្នកជ្រើសរើស scan job មួយ និងជ្រើសរើស mode (next_steps ឬ analysis)" : "You select a scan job and choose a mode (next_steps or analysis)"}</li>
                    <li>{isKhmer ? "Backend ប្រមូល evidence ពី scan steps ទាំងអស់" : "The backend collects evidence from all scan steps"}</li>
                    <li>{isKhmer ? "Orchestrator រើស strategy (workflow ឬ agent) និង model" : "The orchestrator picks a strategy (workflow or agent) and a model"}</li>
                    <li>{isKhmer ? "ការ enrich ជាមួយ MCP tools (CVE lookup, EPSS scores, ល។)" : "Context is enriched via MCP tools (CVE lookup, EPSS scores, etc.)"}</li>
                    <li>{isKhmer ? "Claude បង្កើត structured response ដែលរក្សាទុកនៅក្នុង database" : "Claude generates a structured response, persisted to the database"}</li>
                    <li>{isKhmer ? "អ្នកមើល និងផ្តល់ feedback ដើម្បីកែលំអ outputs នាពេលខាងមុខ" : "You review and submit feedback to improve future outputs"}</li>
                </ol>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "Caching" : "Caching"}>
                    {isKhmer
                        ? "Suggestions ត្រូវបាន cache ក្នុង Redis ដោយផ្អែកលើ context input។ បើ scan ដូចគ្នាមាន suggestion រួចហើយ វានឹងត្រឡប់ភ្លាមៗ ដោយមិនចំណាយ tokens ថ្មី។"
                        : "Suggestions are cached in Redis based on the context input. If the same scan already has a suggestion, it returns instantly without spending new tokens."}
                </Callout>
            </section>

            {/* Modes */}
            <section id="modes" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="modes">{isKhmer ? "Suggestion modes" : "Suggestion modes"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "មាន AI modes ២ ប្រភេទ ដែលត្រូវនឹងករណីប្រើប្រាស់ផ្សេងៗ៖"
                        : "There are two AI modes that match different use cases:"}
                </Para>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                    <div className="rounded-2xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                                <Sparkles />
                            </div>
                            <div>
                                <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#0F766E] dark:text-[#7DE7D8]">next_steps</div>
                                <h3 className="text-[1.15rem] font-semibold text-[#1A1714] dark:text-white" style={sansFontStyle}>{isKhmer ? "Next steps" : "Next steps"}</h3>
                            </div>
                        </div>
                        <p className="text-[14.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.6] mb-2">
                            {isKhmer ? "ផ្តល់ list នៃ tool runs បន្ទាប់ដែលត្រូវធ្វើ ដោយផ្អែកលើ findings បច្ចុប្បន្ន។" : "Returns a list of recommended next tool runs based on current findings."}
                        </p>
                        <p className="text-[12.5px] text-[#88837B] dark:text-[#9CA3AF]">
                            <strong className="text-[#1A1714] dark:text-white">{isKhmer ? "លំនាំដើម" : "Default"}:</strong> claude-haiku-4-5 · workflow strategy
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                                <Telescope />
                            </div>
                            <div>
                                <div className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#0F766E] dark:text-[#7DE7D8]">analysis</div>
                                <h3 className="text-[1.15rem] font-semibold text-[#1A1714] dark:text-white" style={sansFontStyle}>{isKhmer ? "Deep analysis" : "Deep analysis"}</h3>
                            </div>
                        </div>
                        <p className="text-[14.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.6] mb-2">
                            {isKhmer ? "ការវិភាគពេញលេញនៃ scan results ជាមួយ severity, exploitability, និង remediation guidance។" : "Full analysis of scan results with severity, exploitability, and remediation guidance."}
                        </p>
                        <p className="text-[12.5px] text-[#88837B] dark:text-[#9CA3AF]">
                            <strong className="text-[#1A1714] dark:text-white">{isKhmer ? "លំនាំដើម" : "Default"}:</strong> claude-sonnet-4-6 · workflow strategy
                        </p>
                    </div>
                </div>
            </section>

            {/* Next steps mode */}
            <section id="next-steps" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="next-steps">{isKhmer ? "Next steps mode" : "Next steps mode"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Mode នេះវិភាគ scan results របស់អ្នក ហើយណែនាំ tool runs ៣-៥ បន្ទាប់ ដោយផ្តល់ priority និងហេតុផល។ ល្អណាស់សម្រាប់ការដើរ workflow ដែលអ្នកមិនដឹងថាជំហានបន្ទាប់គឺអ្វី។"
                        : "This mode analyzes your scan results and recommends 3-5 next tool runs with priority and reasoning. Great for guiding workflows when you're unsure of the next step."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រលម្អិតនៃ Scan ណាមួយ។" : "Navigate to any Scan details page."}</li>
                    <li>{isKhmer ? "ចុចលើផ្ទាំង 'AI Suggestions' ឬ 'Next Steps'។" : "Click on the 'AI Suggestions' or 'Next Steps' tab."}</li>
                    <li>{isKhmer ? "ចុចប៊ូតុង 'Generate Suggestions'។" : "Click the 'Generate Suggestions' button."}</li>
                    <li>{isKhmer ? "រង់ចាំបន្តិចដើម្បីឱ្យ Claude វិភាគទិន្នន័យ។" : "Wait a moment for Claude to analyze the data."}</li>
                    <li>{isKhmer ? "បញ្ជីនៃជំហានបន្ទាប់នឹងបង្ហាញឡើងជាមួយនឹងអាទិភាព។" : "A list of next steps will appear with priority levels."}</li>
                </ol>
            </section>

            {/* Deep analysis */}
            <section id="deep-analysis" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="deep-analysis">{isKhmer ? "Deep analysis mode" : "Deep analysis mode"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Deep analysis ផ្តល់ executive-level summary នៃ scan ជាមួយ severity grouping, attack path analysis, និង remediation steps។ ល្អណាស់សម្រាប់ pre-report walkthrough ឬផ្តល់ briefing ដល់ stakeholders ដែលមិនមែនជា technical។"
                        : "Deep analysis produces an executive-level summary of the scan with severity grouping, attack path analysis, and remediation steps. Great for pre-report walkthroughs or briefing non-technical stakeholders."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "នៅក្នុង Dashboard សូមជ្រើសរើសផ្ទាំង 'Deep Analysis'។" : "In the Dashboard, select the 'Deep Analysis' tab."}</li>
                    <li>{isKhmer ? "អ្នកនឹងឃើញ Executive Summary សង្ខេបពីលទ្ធផល។" : "You will see an Executive Summary of the results."}</li>
                    <li>{isKhmer ? "ពិនិត្យមើល Attack Paths ដើម្បីយល់ពីហានិភ័យ។" : "Review Attack Paths to understand the risks."}</li>
                    <li>{isKhmer ? "អនុវត្តតាម Remediation steps ដើម្បីជួសជុលបញ្ហា។" : "Follow the Remediation steps to fix the issues."}</li>
                </ol>
            </section>

            {/* MCP Tools */}
            <section id="mcp-tools" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="mcp-tools">{isKhmer ? "MCP tools" : "MCP tools"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Auto-Offensive ដាក់ MCP server ដែលបង្ហាញ tools ជំនាញ ១៨ ប្រភេទ ដល់ Claude។ Tools ទាំងនេះ enrich AI suggestions ជាមួយ external context ដូចជា CVE data, OWASP categories, និងលទ្ធផលប្រវត្តិ។"
                        : "Auto-Offensive ships an MCP server that exposes 18 specialized tools to Claude. These tools enrich AI suggestions with external context like CVE data, OWASP categories, and historical results."}
                </Para>

                <Callout type="tip" icon={<Lightbulb className="text-[#1A7A4A]" />} title={isKhmer ? "MCP-compatible" : "MCP-compatible"}>
                    {isKhmer
                        ? "MCP server ដំណើរការនៅក្រោម /mcp-server/mcp ហើយផ្គូផ្គងជាមួយ MCP-compliant clients ដូចជា Claude Desktop។"
                        : "The MCP server runs at /mcp-server/mcp and works with any MCP-compliant client, including Claude Desktop."}
                </Callout>

                <SubHeading>{isKhmer ? "Tools ដែលមាន" : "Available tools"}</SubHeading>
                <div className="grid gap-2 md:grid-cols-2 my-4">
                    {[
                        { name: "cve_lookup", desc: isKhmer ? "ស្វែងរក CVE detail" : "Look up CVE details" },
                        { name: "cwe_details", desc: isKhmer ? "CWE weakness info" : "CWE weakness info" },
                        { name: "epss_score", desc: isKhmer ? "Exploit Prediction Scoring" : "Exploit Prediction Scoring" },
                        { name: "exploit_poc", desc: isKhmer ? "PoC lookup" : "Exploit PoC lookup" },
                        { name: "owasp_mapping", desc: isKhmer ? "OWASP category mapping" : "OWASP category mapping" },
                        { name: "severity_calculator", desc: isKhmer ? "CVSS calculator" : "CVSS calculator" },
                        { name: "attack_patterns", desc: isKhmer ? "Attack pattern lookup" : "Attack pattern lookup" },
                        { name: "remediation_guide", desc: isKhmer ? "Remediation steps" : "Remediation guidance" },
                        { name: "http_headers_check", desc: isKhmer ? "Security headers analysis" : "Security headers analysis" },
                        { name: "nuclei_template_search", desc: isKhmer ? "ស្វែងរក templates" : "Nuclei template search" },
                        { name: "payload_encoder", desc: isKhmer ? "Payload encoding utils" : "Payload encoding utilities" },
                        { name: "port_service_map", desc: isKhmer ? "Port-to-service map" : "Port-to-service mapping" },
                        { name: "subdomain_intel", desc: isKhmer ? "Subdomain intel" : "Subdomain intelligence" },
                        { name: "tech_catalog", desc: isKhmer ? "Technology catalog" : "Technology catalog" },
                        { name: "tool_capability", desc: isKhmer ? "Tool capability lookup" : "Tool capability lookup" },
                        { name: "waf_fingerprint", desc: isKhmer ? "WAF detection" : "WAF detection" },
                        { name: "scan_evidence", desc: isKhmer ? "Scan evidence retrieval" : "Scan evidence retrieval" },
                        { name: "feedback_history", desc: isKhmer ? "Operator feedback history" : "Operator feedback history" },
                    ].map((tool) => (
                        <div key={tool.name} className="flex items-start gap-3 rounded-lg border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] px-3 py-2">
                            <code className="text-[12.5px] font-mono text-[#00BCA1] shrink-0 mt-0.5" style={monoFontStyle}>{tool.name}</code>
                            <span className="text-[13px] text-[#4A4540] dark:text-[#C9CDD4]">{tool.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Models & Cost */}
            <section id="models-cost" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="models-cost">{isKhmer ? "Models និងតម្លៃ" : "Models & cost"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Auto-Offensive ប្រើ Claude models ពី Anthropic ។ Mode នីមួយៗមាន default model អមជាមួយ fallback chain ទៅ models ផ្សេងៗ បើសិនជា primary មិនអាចប្រើបាន។"
                        : "Auto-Offensive uses Claude models from Anthropic. Each mode has a default model with a fallback chain to alternative models if the primary is unavailable."}
                </Para>

                <SubHeading>{isKhmer ? "Cost estimation" : "Cost estimation"}</SubHeading>
                <Para>
                    {isKhmer
                        ? "មុនពេលបង្កើត suggestion អ្នកអាច estimate cost ដើម្បីបង្ហាញឱ្យអ្នកប្រើនូវ price hint។"
                        : "Before generating a suggestion, you can estimate the cost to show users a price hint."}
                </Para>
                <SubHeading>{isKhmer ? "មើលការប៉ាន់ស្មានតាម UI" : "Viewing estimate via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "នៅពេលអ្នករៀបចំ Generate ការវិភាគ..." : "When you are about to Generate an analysis..."}</li>
                    <li>{isKhmer ? "ប្រព័ន្ធនឹងបង្ហាញការប៉ាន់ស្មានតម្លៃនៅខាងលើប៊ូតុងដោយស្វ័យប្រវត្តិ។" : "The system will automatically display the estimated cost above the button."}</li>
                </ol>

                <SubHeading>{isKhmer ? "Capabilities & health" : "Capabilities & health"}</SubHeading>
                <SubHeading>{isKhmer ? "ពិនិត្យមើលតាម UI" : "Checking via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ 'Settings' > 'AI Configuration'។" : "Go to 'Settings' > 'AI Configuration'."}</li>
                    <li>{isKhmer ? "អ្នកអាចមើលស្ថានភាព Health របស់ AI និង Models ដែលមាន។" : "You can see the AI Health status and available Models."}</li>
                </ol>
            </section>

            {/* Feedback */}
            <section id="feedback" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="feedback">{isKhmer ? "Feedback loop" : "Feedback loop"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Operators អាចផ្តល់ feedback លើ suggestions ដែលរក្សាទុក។ Feedback ត្រូវបានប្រើដើម្បីកែលំអ outputs នាពេលខាងមុខតាម MCP feedback_history tool។"
                        : "Operators can submit feedback on saved suggestions. Feedback is used to improve future outputs through the MCP feedback_history tool."}
                </Para>

                <SubHeading>{isKhmer ? "ផ្តល់ Feedback តាម UI" : "Providing Feedback via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "នៅខាងក្រោម Suggestion នីមួយៗ មានប៊ូតុង Thumbs Up និង Thumbs Down។" : "Below each Suggestion, there are Thumbs Up and Thumbs Down buttons."}</li>
                    <li>{isKhmer ? "ចុចលើវា ហើយអ្នកអាចសរសេរមតិយោបល់របស់អ្នកបាន។" : "Click on them and you can write your comment."}</li>
                    <li>{isKhmer ? "ចុច Submit ដើម្បីរក្សាទុក។" : "Click Submit to save."}</li>
                </ol>
            </section>

            <DocsFooterNav
                previous={{ href: "/scanning", label: isKhmer ? "ការស្កេន" : "Scanning" }}
                next={{ href: "/code-scanning", label: isKhmer ? "Code Scanning (SAST)" : "Code Scanning (SAST)" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
