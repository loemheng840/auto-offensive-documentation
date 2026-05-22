"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { Radar, Zap, SlidersHorizontal, Workflow, Info, AlertTriangle, Lightbulb } from "lucide-react";
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
        <p className="text-[16px] md:text-[17px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.78] mb-3" style={sansFontStyle}>
            {children}
        </p>
    );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2 id={id} className="doc-section text-[1.7rem] md:text-[1.9rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-4 pt-12 scroll-mt-6" style={sansFontStyle}>
            {children}
        </h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-[#1A1714] dark:text-white mt-7 mb-2" style={sansFontStyle}>
            {children}
        </h3>
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
                <button onClick={handleCopy} className="font-mono text-[10px] text-white/30 hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded">
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="bg-[#16181F] px-5 py-4 overflow-x-auto">
                <code ref={codeRef} className="text-[14px] md:text-[15px] leading-[1.85] text-white/65 whitespace-pre" style={monoFontStyle}>
                    {children}
                </code>
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
    const titleColors: Record<string, string> = {
        info: "text-[#1D57C8]",
        tip: "text-[#1A7A4A]",
        warn: "text-[#B86800]",
    };
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

function ModeCard({ icon, name, badge, summary, useCase }: { icon: React.ReactNode; name: string; badge: string; summary: string; useCase: string }) {
    return (
        <div className="rounded-2xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5">
            <div className="flex items-start gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                    {icon}
                </div>
                <div className="min-w-0">
                    <div className="text-[10.5px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0F766E] dark:text-[#7DE7D8]">{badge}</div>
                    <h3 className="text-[1.2rem] font-semibold text-[#1A1714] dark:text-white" style={sansFontStyle}>{name}</h3>
                </div>
            </div>
            <p className="text-[14.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.6] mb-2">{summary}</p>
            <p className="text-[13px] text-[#88837B] dark:text-[#9CA3AF] leading-[1.55]">
                <strong className="text-[#1A1714] dark:text-white">Best for: </strong>{useCase}
            </p>
        </div>
    );
}

export default function ScanningContent() {
    const locale = useLocale();
    const isKhmer = locale === "kh";
    const pageFontVars = {
        "--docs-sans-font": isKhmer ? "var(--font-noto-khmer), var(--font-google-sans)" : "var(--font-google-sans), var(--font-noto-khmer)",
        "--docs-mono-font": isKhmer ? "var(--font-jetbrains-mono), var(--font-noto-khmer), var(--font-google-sans)" : "var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer)",
    } as CSSProperties;

    return (
        <main className="flex-1 min-w-0 px-8 md:px-12 xl:px-14 pt-12 pb-24 max-[640px]:px-5" lang={isKhmer ? "km" : "en"} style={{ fontFamily: "var(--docs-sans-font), sans-serif", ...pageFontVars }}>
            {/* Header */}
            <div className="mb-10 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-1 rounded-full mb-4">
                    <Radar className="size-3" />
                    {isKhmer ? "ស្នូលនៃផ្លេតហ្វម" : "Platform core"}
                </div>
                <h1 className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4" style={sansFontStyle}>
                    {isKhmer ? "ការស្កេន" : "Scanning"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "Auto-Offensive ផ្តល់ scan modes ៣ ប្រភេទដែលត្រូវនឹង workflows ផ្សេងៗ — ចាប់ពី ad-hoc tool runs ដល់ multi-step pipelines។ ទំព័រនេះពន្យល់នៅពេលដែលត្រូវប្រើ mode នីមួយៗ និងរបៀបដាក់បញ្ជូន scans។"
                        : "Auto-Offensive provides three scan modes that match different workflows — from ad-hoc single-tool runs to multi-step pipelines. This page explains when to use each mode and how to submit scans."}
                </p>
            </div>

            {/* Overview */}
            <section id="overview" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="overview">{isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}</SectionHeading>
                <Para>
                    {isKhmer ? "Scan មួយគឺជាការដំណើរការមួយដងនៃ tool ឬ pipeline។ Auto-Offensive ផ្តល់ modes ៣ ប្រភេទ៖" : "A scan is one execution of a tool or pipeline. Auto-Offensive offers three modes:"}
                </Para>

                <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <ModeCard
                        icon={<Zap />}
                        badge="Mode 1"
                        name={isKhmer ? "Basic" : "Basic"}
                        summary={isKhmer ? "Tool តែមួយជាមួយ default options។ លឿន និងសាមញ្ញ។" : "Single tool with Light and Deep options. Fast and simple."}
                        useCase={isKhmer ? "ការត្រួតពិនិត្យលឿន, កិច្ចការ ad-hoc, ការសាកល្បង" : "Quick checks, ad-hoc tasks, exploration"}
                    />
                    <ModeCard
                        icon={<SlidersHorizontal />}
                        badge="Mode 2"
                        name={isKhmer ? "Medium" : "Medium"}
                        summary={isKhmer ? "Tool តែមួយជាមួយ admin-validated options ។" : " Multi-tools with admin-validated options."}
                        useCase={isKhmer ? "Custom configurations ដែលត្រូវការ tuning" : "Custom configurations that need tuning"}
                    />
                    <ModeCard
                        icon={<Workflow />}
                        badge="Mode 3"
                        name={isKhmer ? "Advanced" : "Advanced"}
                        summary={isKhmer ? "Multi-tool pipelines តាម Unix pipes។" : "Multi-tool Unix-style pipelines."}
                        useCase={isKhmer ? "Reconnaissance ពេញលេញ, complex workflows" : "Full reconnaissance, complex workflows"}
                    />
                </div>

                <SubHeading>{isKhmer ? "ប្រៀបធៀបយ៉ាងលឿន" : "Quick comparison"}</SubHeading>
                <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-[#F0EDE6] dark:bg-white/5">
                            <tr>
                                {[isKhmer ? "Mode" : "Mode", isKhmer ? "Endpoint" : "Endpoint", isKhmer ? "Tools" : "Tools", isKhmer ? "Options" : "Options"].map(h => (
                                    <th key={h} className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 font-semibold">Basic</td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10"><InlineCode>POST /scans/basic/submit</InlineCode></td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">1</td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">{isKhmer ? "Defaults" : "Light and Deep"}</td>
                            </tr>
                            <tr className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 font-semibold">Medium</td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10"><InlineCode>POST /scans/medium/submit</InlineCode></td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">Multiple</td>
                                <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">{isKhmer ? "Schema-validated" : "Schema-validated"}</td>
                            </tr>
                            <tr className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                <td className="px-4 py-2.5 font-semibold">Advanced</td>
                                <td className="px-4 py-2.5"><InlineCode>POST /scans/advanced/submit</InlineCode></td>
                                <td className="px-4 py-2.5">{isKhmer ? "ច្រើន (pipeline)" : "Multiple (pipeline)"}</td>
                                <td className="px-4 py-2.5">{isKhmer ? "Full Unix syntax" : "Full Unix syntax"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Basic */}
            <section id="basic-scan" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="basic-scan">{isKhmer ? "Basic scan" : "Basic scan"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Basic scan ដំណើរការ tool តែមួយជាមួយ default options។ វាគឺជាមធ្យោបាយលឿនបំផុតដើម្បីសាកល្បង target។"
                        : "A basic scan runs a single tool with default options. It's the fastest way to test a target."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រ Scans ពី sidebar។" : "Navigate to the Scans page from the sidebar."}</li>
                    <li>{isKhmer ? "ចុចលើប៊ូតុង New Scan។" : "Click the New Scan button."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស Basic សម្រាប់ scan mode។" : "Select Basic as the scan mode."}</li>
                    <li>{isKhmer ? "បញ្ចូល target របស់អ្នក (ឧទាហរណ៍ example.com)។" : "Enter your target (e.g., example.com)."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស tool មួយពី dropdown (ឧទាហរណ៍ subfinder)។" : "Choose a tool from the dropdown (e.g., subfinder)."}</li>
                    <li>{isKhmer ? "ចុច Submit Scan។" : "Click Submit Scan."}</li>
                </ol>
            </section>

            {/* Medium */}
            <section id="medium-scan" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="medium-scan">{isKhmer ? "Medium scan" : "Medium scan"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Medium scan ដំណើរការ tool តែមួយ ប៉ុន្តែផ្តល់ឱ្យអ្នកនូវ control លើ options។ Backend validates options តាម tool's scan_config.medium schema និងផ្តល់ defaults សុវត្ថិភាព។"
                        : "A medium scan runs a single tool but gives you control over options. The backend validates options against the tool's scan_config.medium schema and applies safe defaults."}
                </Para>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "ហេតុអ្វីត្រូវប្រើ Medium ?" : "Why use Medium?"}>
                    {isKhmer
                        ? "Medium ល្អណាស់នៅពេលអ្នកចង់បានតុល្យភាពរវាង simplicity និង control។ អ្នកមិនចាំបាច់សរសេរ pipeline ទាំងមូល ប៉ុន្តែអ្នកនៅតែអាច tune scan ធ្វើឲ្យ targets របស់អ្នក។"
                        : "Medium is great when you want a balance between simplicity and control. You don't have to write a full pipeline, but you can still tune the scan for your targets."}
                </Callout>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ជ្រើសរើស Medium សម្រាប់ scan mode។" : "Select Medium as the scan mode."}</li>
                    <li>{isKhmer ? "បញ្ចូល target របស់អ្នក។" : "Enter your target."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស tool មួយ (ឧទាហរណ៍ nuclei)។" : "Choose a tool (e.g., nuclei)."}</li>
                    <li>{isKhmer ? "Form សម្រាប់កំណត់រចនាសម្ព័ន្ធនឹងលេចឡើង។ កែប្រែ options តាម tool (ដូចជា Severity, Rate Limit ជាដើម)។" : "A configuration form will appear. Adjust the tool-specific options (like Severity, Rate Limit, etc.)."}</li>
                    <li>{isKhmer ? "ចុច Submit Scan។" : "Click Submit Scan."}</li>
                </ol>
            </section>

            {/* Advanced */}
            <section id="advanced-scan" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="advanced-scan">{isKhmer ? "Advanced pipeline scan" : "Advanced pipeline scan"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Advanced scan ចេញឱ្យអ្នកសរសេរ Unix-style pipelines ដែល output ពី tool មួយហូរទៅជា input របស់ tool បន្ទាប់។ វាជាមធ្យោបាយដ៏មានឥទ្ធិពលបំផុតក្នុងការអនុវត្ត reconnaissance workflows ពេញលេញ។"
                        : "An advanced scan lets you write Unix-style pipelines where the output of one tool flows into the next. It's the most powerful way to perform full reconnaissance workflows."}
                </Para>

                <SubHeading>{isKhmer ? "Pipeline syntax" : "Pipeline syntax"}</SubHeading>
                <Para>
                    {isKhmer ? (
                        <>
                            ប្រើ Unix pipes (<InlineCode>|</InlineCode>) ដើម្បីភ្ជាប់ tools។ នៅក្នុង CLI សូម escape pipe ដោយ backslash (<InlineCode>\|</InlineCode>) ដើម្បីរារាំង local shell មិនឱ្យបកស្រាយវា។
                        </>
                    ) : (
                        <>
                            Use Unix pipes (<InlineCode>|</InlineCode>) to chain tools. In the CLI, escape the pipe with a backslash (<InlineCode>\|</InlineCode>) to prevent your local shell from interpreting it.
                        </>
                    )}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ជ្រើសរើស Advanced សម្រាប់ scan mode។" : "Select Advanced as the scan mode."}</li>
                    <li>{isKhmer ? "បញ្ចូល target របស់អ្នក។" : "Enter your target."}</li>
                    <li>{isKhmer ? "នៅក្នុង Pipeline editor បញ្ចូលពាក្យបញ្ជា Unix-style របស់អ្នក (ឧទាហរណ៍ subfinder -d example.com | httpx -sc)។" : "In the Pipeline editor, type your Unix-style command (e.g., subfinder -d example.com | httpx -sc)."}</li>
                    <li>{isKhmer ? "ចុច Submit Scan។" : "Click Submit Scan."}</li>
                </ol>

                <Callout type="warn" icon={<AlertTriangle className="text-[#B86800]" />} title={isKhmer ? "ការបញ្ជូន tool-to-tool" : "Tool-to-tool data flow"}>
                    {isKhmer
                        ? "មិនមែន tool ទាំងអស់ផ្សំជាមួយគ្នាបានទេ។ subfinder បញ្ជូន subdomains, httpx ទទួល subdomains/URLs, naabu បញ្ជូន host:port pairs, nuclei ទទួល URLs។ Backend នឹងបដិសេធ pipelines មិនត្រឹមត្រូវ។"
                        : "Not all tools compose with each other. subfinder outputs subdomains, httpx accepts subdomains/URLs, naabu outputs host:port pairs, nuclei accepts URLs. The backend rejects invalid pipelines."}
                </Callout>
            </section>

            {/* Tools */}
            <section id="tools" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="tools">{isKhmer ? "Tools ដែលគាំទ្រ" : "Supported tools"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Auto-Offensive ដំណើរការ 7 industry-standard security tools ដែលគ្រប់គ្រងពេញលេញនៅក្នុង sandboxed containers។"
                        : "Auto-Offensive runs 7 industry-standard security tools, all fully managed in sandboxed containers."}
                </Para>

                <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
                    <table className="w-full border-collapse text-left text-[14.5px]">
                        <thead className="bg-[#F0EDE6] dark:bg-white/5">
                            <tr>
                                {["Tool", isKhmer ? "ប្រភេទ" : "Category", isKhmer ? "គោលបំណង" : "Purpose", "Output"].map(h => (
                                    <th key={h} className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["subfinder", "Recon", isKhmer ? "Passive subdomain enumeration" : "Passive subdomain enumeration", "JSONL"],
                                ["httpx", "Recon", isKhmer ? "HTTP probing និង fingerprinting" : "HTTP probing & fingerprinting", "JSONL"],
                                ["naabu", "Network", isKhmer ? "Fast TCP/UDP port scanning" : "Fast TCP/UDP port scanning", "JSONL"],
                                ["nmap", "Network", isKhmer ? "Service detection, OS fingerprinting" : "Service detection, OS fingerprinting", "XML"],
                                ["nuclei", "Vuln Scan", isKhmer ? "Template-based vulnerability detection" : "Template-based vulnerability detection", "JSONL"],
                                ["gobuster", "Web", isKhmer ? "Directory និង file enumeration" : "Directory & file enumeration", "Text"],
                                ["gitleaks", "SAST", isKhmer ? "Secret detection ក្នុង source code" : "Secret detection in source code", "JSON"],
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 last:border-b-0 font-semibold text-[#00BCA1]" style={monoFontStyle}>{row[0]}</td>
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[13.5px]">{row[1]}</td>
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">{row[2]}</td>
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[13.5px] font-mono text-[#88837B] dark:text-[#9CA3AF]" style={monoFontStyle}>{row[3]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Callout type="tip" icon={<Lightbulb className="text-[#1A7A4A]" />} title={isKhmer ? "Tool registry ដែលអាច extend បាន" : "Extensible tool registry"}>
                    {isKhmer
                        ? "Tools ត្រូវបានកំណត់ដោយ JSON metadata នៅក្នុង backend tool registry។ Admins អាចបន្ថែម, update ឬ deactivate tools តាម /tools API ដោយមិនចាំបាច់ deploy ជាថ្មី។"
                        : "Tools are defined by JSON metadata in the backend tool registry. Admins can add, update, or deactivate tools through the /tools API without redeploying."}
                </Callout>
            </section>

            {/* Queue */}
            <section id="queue" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="queue">{isKhmer ? "Queue និង lifecycle" : "Queue & lifecycle"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Scans ត្រូវបានដាក់ក្នុងជួរ និងត្រូវបានដំណើរការដោយ workers ដែលអាច scale បាន។ Job នីមួយៗឆ្លងកាត់ states ខាងក្រោម៖"
                        : "Scans are queued and processed by scalable workers. Each job moves through these states:"}
                </Para>

                <div className="overflow-x-auto rounded-xl border border-[#E2DDD5] dark:border-white/10 my-4 bg-white dark:bg-[#121214]">
                    <table className="w-full border-collapse text-left text-[14.5px]">
                        <thead className="bg-[#F0EDE6] dark:bg-white/5">
                            <tr>
                                {["Status", isKhmer ? "អត្ថន័យ" : "Meaning", isKhmer ? "ប្រភេទ" : "Type"].map(h => (
                                    <th key={h} className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#88837B] dark:text-[#9CA3AF] border-b border-[#E2DDD5] dark:border-white/10">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["JOB_STATUS_PENDING", isKhmer ? "ត្រូវបានទទួលយក កំពុងរង់ចាំ queue" : "Accepted, awaiting queue", "Transient"],
                                ["JOB_STATUS_QUEUED", isKhmer ? "នៅក្នុង queue" : "In the queue", "Transient"],
                                ["JOB_STATUS_RUNNING", isKhmer ? "កំពុងដំណើរការ" : "Currently executing", "Transient"],
                                ["JOB_STATUS_COMPLETED", isKhmer ? "បានបញ្ចប់ដោយជោគជ័យ" : "Finished successfully", "Terminal"],
                                ["JOB_STATUS_PARTIAL", isKhmer ? "Steps មួយចំនួនបរាជ័យ" : "Some steps failed", "Terminal"],
                                ["JOB_STATUS_FAILED", isKhmer ? "Execution error" : "Execution error", "Terminal"],
                                ["JOB_STATUS_CANCELLED", isKhmer ? "ត្រូវបានបោះបង់" : "Cancelled by user/system", "Terminal"],
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-[#FAF8F2] dark:hover:bg-white/5">
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 last:border-b-0 font-mono text-[13px] text-[#00BCA1]" style={monoFontStyle}>{row[0]}</td>
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10">{row[1]}</td>
                                    <td className="px-4 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[13px] font-medium" style={{ color: row[2] === "Terminal" ? "#1A7A4A" : "#1D57C8" }}>{row[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <SubHeading>{isKhmer ? "Queue management" : "Queue management"}</SubHeading>
                <CodeBlock title="bash · queue ops">
                    {`# Check queue status
GET /scans/advanced/queue/status

# Get position of a queued job
GET /scans/advanced/queue/jobs/{job_id}/position

# Cancel a queued or running job
POST /scans/advanced/queue/jobs/{job_id}/cancel`}
                </CodeBlock>
            </section>

            {/* Streaming */}
            <section id="streaming" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="streaming">{isKhmer ? "Real-time streaming" : "Real-time streaming"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "នៅពេល scan កំពុងដំណើរការ logs ត្រូវបាន stream ត្រឡប់មកវិញតាម Server-Sent Events (SSE)។ ការនេះអនុញ្ញាតឱ្យអ្នកមើលលទ្ធផលផ្ទាល់ដូចជាដំណើរការ tool នៅ local។"
                        : "While a scan is running, logs are streamed back via Server-Sent Events (SSE). This lets you watch results live, just like running the tool locally."}
                </Para>

                <CodeBlock title="bash · stream step logs">
                    {`# Subscribe to step log stream
curl -N https://api.auto-offensive.com/scans/steps/{step_id}/logs/stream \\
  -H "Authorization: Bearer $AOF_API_KEY" \\
  -H "Cache-Control: no-cache"

# Event format
event: log
data: {"event_type":"log","data":"api.example.com"}

event: log
data: {"event_type":"log","data":"www.example.com"}

event: done
data: {"status":"stream_ended"}`}
                </CodeBlock>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "Event types" : "Event types"}>
                    {isKhmer ? (
                        <ul className="list-disc pl-5 space-y-1">
                            <li><InlineCode>log</InlineCode> — បន្ទាត់ log ធម្មតាពី tool</li>
                            <li><InlineCode>stream-error</InlineCode> — error ក្នុងពេល stream</li>
                            <li><InlineCode>done</InlineCode> — សញ្ញាបញ្ចប់ stream</li>
                        </ul>
                    ) : (
                        <ul className="list-disc pl-5 space-y-1">
                            <li><InlineCode>log</InlineCode> — Normal log line from the tool</li>
                            <li><InlineCode>stream-error</InlineCode> — Error during streaming</li>
                            <li><InlineCode>done</InlineCode> — Stream termination signal</li>
                        </ul>
                    )}
                </Callout>
            </section>

            <DocsFooterNav
                previous={{ href: "/getting-started", label: isKhmer ? "ការចាប់ផ្តើម" : "Getting Started" }}
                next={{ href: "/ai-analysis", label: isKhmer ? "ការវិភាគ AI" : "AI Analysis" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
