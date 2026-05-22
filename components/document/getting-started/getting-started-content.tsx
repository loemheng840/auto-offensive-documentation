"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
    Rocket,
    Compass,
    Download,
    PlayCircle,
    Eye,
    ArrowRight,
    Clock,
    Info,
    Lightbulb,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import DocsFooterNav from "@/components/document/docs-footer-nav";

const monoFontStyle = { fontFamily: "var(--docs-mono-font), monospace" } as const;
const sansFontStyle = { fontFamily: "var(--docs-sans-font), sans-serif" } as const;

/* ─── Primitives ─── */
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

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <h2
            id={id}
            className="doc-section text-[1.7rem] md:text-[1.9rem] font-bold tracking-[-0.03em] text-[#1A1714] dark:text-white mb-4 pt-12 scroll-mt-6"
            style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
        >
            {children}
        </h2>
    );
}

function SubHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3
            className="text-[1.2rem] md:text-[1.3rem] font-semibold tracking-[-0.02em] text-[#1A1714] dark:text-white mt-8 mb-3"
            style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
        >
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
                <button
                    onClick={handleCopy}
                    className="font-mono text-[10px] text-white/30 hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded transition-all"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="bg-[#16181F] px-5 py-4 overflow-x-auto">
                <code
                    ref={codeRef}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-white/65 whitespace-pre"
                    style={monoFontStyle}
                >
                    {children}
                </code>
            </div>
        </div>
    );
}

function Callout({
    type = "info",
    icon,
    title,
    children,
}: {
    type?: "info" | "tip" | "warn";
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
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
                <div className="text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function StepCard({ num, icon, title, children }: { num: number; icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                    {icon}
                </div>
                <div>
                    <div className="text-[10.5px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0F766E] dark:text-[#7DE7D8]">
                        Step {num}
                    </div>
                    <h3 className="text-[1.35rem] md:text-[1.45rem] font-bold tracking-[-0.025em] text-[#1A1714] dark:text-white" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        {title}
                    </h3>
                </div>
            </div>
            <div className="ml-12">{children}</div>
        </div>
    );
}

function ConceptPill({ name, desc, icon }: { name: string; desc: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] px-4 py-3 hover:border-[#0F766E]/40 dark:hover:border-[#7DE7D8]/30 transition-colors">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-[14.5px] font-semibold text-[#1A1714] dark:text-white" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                    {name}
                </div>
                <div className="text-[13.5px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55] mt-0.5">
                    {desc}
                </div>
            </div>
        </div>
    );
}

export default function GettingStartedContent() {
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
            {/* Header */}
            <div className="mb-10 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-1 rounded-full mb-4">
                    <Clock className="size-3" />
                    {isKhmer ? "ប្រហែល ៥ នាទី" : "About 5 minutes"}
                </div>
                <h1
                    className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer ? "ការចាប់ផ្តើម" : "Getting Started"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "សូមស្វាគមន៍មកកាន់ Auto-Offensive — ផ្លេតហ្វមស្កេនសុវត្ថិភាពដោយស្វ័យប្រវត្តិ។ មគ្គុទ្ទេស៍នេះនឹងណែនាំអ្នកអំពីគំនិតស្នូល ដំឡើង CLI និងដំណើរការ scan ដំបូងរបស់អ្នក។"
                        : "Welcome to Auto-Offensive — the automated offensive security platform. This guide walks you through the core concepts, installs the CLI, and runs your first scan."}
                </p>
            </div>

            {/* What is Auto-Offensive? */}
            <section id="what-is-aof" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="what-is-aof">
                    {isKhmer ? "Auto-Offensive ជាអ្វី?" : "What is Auto-Offensive?"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "Auto-Offensive គឺជាផ្លេតហ្វមដែលធ្វើ automation លើ offensive security workflows ទាំងមូល — ចាប់ពី reconnaissance ដល់ vulnerability scanning, secret detection, និង AI-driven analysis។ វាដំណើរការ tools ដ៏ល្បីល្បាញដូចជា subfinder, httpx, naabu, nuclei, gitleaks, និង gobuster នៅក្នុង containers ដែលមានសុវត្ថិភាព ហើយបង្ហាញលទ្ធផលនៅក្នុង UI តែមួយ។"
                        : "Auto-Offensive is a platform that automates the entire offensive security workflow — from reconnaissance to vulnerability scanning, secret detection, and AI-driven analysis. It runs industry-standard tools like subfinder, httpx, naabu, nuclei, gitleaks, and gobuster in sandboxed containers and unifies the results in a single UI."}
                </Para>
                <Para>
                    {isKhmer ? "អ្នកធ្វើអន្តរកម្មជាមួយផ្លេតហ្វមតាមបី interfaces៖" : "You interact with the platform through three interfaces:"}
                </Para>

                <div className="grid gap-3 md:grid-cols-3 mt-4">
                    <ConceptPill
                        icon={<Compass />}
                        name={isKhmer ? "Web Dashboard" : "Web Dashboard"}
                        desc={isKhmer ? "Visual UI សម្រាប់ scans, findings, AI analysis និង reports" : "Visual UI for scans, findings, AI analysis, and reports"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="CLI (aof)"
                        desc={isKhmer ? "Standalone Go binary សម្រាប់ terminal និង CI/CD" : "Standalone Go binary for terminal and CI/CD use"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="REST API"
                        desc={isKhmer ? "Programmatic access សម្រាប់ automation" : "Programmatic access for automation and integrations"}
                    />
                </div>

                <Callout
                    type="info"
                    icon={<Info className="text-[#1D57C8]" />}
                    title={isKhmer ? "Remote execution" : "Remote execution"}
                >
                    {isKhmer
                        ? "Tools មិនដំណើរការនៅលើម៉ាស៊ីនរបស់អ្នកទេ។ អ្វីៗគ្រប់យ៉ាងដំណើរការនៅក្នុង Docker + gVisor sandboxed containers នៅលើ backend។ អ្នកមិនចាំបាច់ដំឡើង subfinder, nuclei ឬ tools ផ្សេងៗនៅ local។"
                        : "Tools don't run on your machine. Everything executes in Docker + gVisor sandboxed containers on the backend. You don't need to install subfinder, nuclei, or any other tool locally."}
                </Callout>
            </section>

            {/* Core Concepts */}
            <section id="core-concepts" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="core-concepts">
                    {isKhmer ? "គោលគំនិតស្នូល" : "Core Concepts"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "មុនពេលចាប់ផ្តើម សូមស្គាល់ពាក្យសំខាន់ៗទាំង ៧៖"
                        : "Before you start, get familiar with these 7 key terms:"}
                </Para>

                <div className="grid gap-3 md:grid-cols-2 mt-4">
                    <ConceptPill
                        icon={<Compass />}
                        name="Project"
                        desc={isKhmer ? "កន្លែងធ្វើការដែលប្រមូលផ្តុំ targets, scans និង findings (ឧ. acme-web-app)" : "A workspace that groups targets, scans, and findings (e.g., acme-web-app)"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Target"
                        desc={isKhmer ? "អ្វីដែលអ្នកស្កេន — domain, IP, URL ឬ CIDR range" : "What you scan — a domain, IP, URL, or CIDR range"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Scan / Job"
                        desc={isKhmer ? "ការដំណើរការមួយដងដែលមាន unique job_id" : "One execution identified by a unique job_id"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Step"
                        desc={isKhmer ? "Tool មួយក្នុងជំហានណាមួយនៃ pipeline" : "One tool running inside a pipeline"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Finding"
                        desc={isKhmer ? "លទ្ធផល deduplicated មួយដែលមាន severity" : "A deduplicated result with severity"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Pipeline"
                        desc={isKhmer ? "ការភ្ជាប់ tools តាម Unix pipes (subfinder | httpx | nuclei)" : "Unix-style tool chaining (subfinder | httpx | nuclei)"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="API Key"
                        desc={isKhmer ? "Project-scoped credential សម្រាប់ automation និង CI/CD" : "A project-scoped credential for automation and CI/CD"}
                    />
                    <ConceptPill
                        icon={<Compass />}
                        name="Scan Mode"
                        desc={isKhmer ? "Basic, Medium, ឬ Advanced — កំណត់របៀបដែល scan ដំណើរការ" : "Basic, Medium, or Advanced — defines how the scan executes"}
                    />
                </div>

                <Para>
                    {isKhmer ? (
                        <>
                            <strong>Workflow ធម្មតា៖</strong> បង្កើត <InlineCode>Project</InlineCode> →
                            បន្ថែម <InlineCode>Targets</InlineCode> → ដាក់បញ្ជូន{" "}
                            <InlineCode>Scan</InlineCode> → Steps ដំណើរការ → ទទួលបាន{" "}
                            <InlineCode>Findings</InlineCode> → ប្រើ AI Analysis ឬ Reports។
                        </>
                    ) : (
                        <>
                            <strong>Typical workflow:</strong> Create a <InlineCode>Project</InlineCode> →
                            add <InlineCode>Targets</InlineCode> → submit a{" "}
                            <InlineCode>Scan</InlineCode> → Steps execute → produce{" "}
                            <InlineCode>Findings</InlineCode> → use AI Analysis or Reports.
                        </>
                    )}
                </Para>
            </section>

            {/* Step 1: Install */}
            <section id="install" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="install">
                    {isKhmer ? "1. បង្កើតគណនី" : "1. Create an Account"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "ចូលទៅកាន់វិបសាយដើម្បីបង្កើតគណនីរបស់អ្នក។"
                        : "Go to the website to create your account."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបចុះឈ្មោះតាម UI" : "Signing up via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រចុះឈ្មោះ (Sign Up)។" : "Navigate to the Sign Up page."}</li>
                    <li>{isKhmer ? "បញ្ចូលអុីម៉ែល និងពាក្យសម្ងាត់របស់អ្នក។" : "Enter your email and password."}</li>
                    <li>{isKhmer ? "ចុចប៊ូតុង 'Create Account'។" : "Click the 'Create Account' button."}</li>
                    <li>{isKhmer ? "ពិនិត្យអុីម៉ែលរបស់អ្នកដើម្បីបញ្ជាក់គណនី។" : "Check your email to verify your account."}</li>
                </ol>
            </section>

            {/* Step 2: First scan */}
            <section id="first-scan" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="first-scan">
                    {isKhmer ? "2. ដំណើរការ scan ដំបូង" : "2. Run your first scan"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "បង្កើត project និងដាក់បញ្ជូន scan តាមរយៈផ្ទាំងគ្រប់គ្រង (Dashboard)៖"
                        : "Create a project and submit a scan through the Web Dashboard:"}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចុចប៊ូតុង 'New Project' នៅជ្រុងខាងស្តាំខាងលើ។" : "Click the 'New Project' button at the top right."}</li>
                    <li>{isKhmer ? "បញ្ចូលឈ្មោះ Project របស់អ្នក រួចចុចរក្សាទុក។" : "Enter your Project name and click save."}</li>
                    <li>{isKhmer ? "ចូលទៅកាន់ Project នោះ ហើយចុច 'New Scan'។" : "Go into the Project and click 'New Scan'."}</li>
                    <li>{isKhmer ? "បញ្ចូល Target (ឧ. example.com)។" : "Enter a Target (e.g., example.com)."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស Basic Mode រួចចុច Start Scan។" : "Select Basic Mode and click Start Scan."}</li>
                </ol>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "ដំណើរការស្វ័យប្រវត្តិ" : "Automated process"}>
                    {isKhmer ? (
                        <>
                            ប្រព័ន្ធនឹងដំណើរការ tools ស្វ័យប្រវត្តិ។ អ្នកគ្រាន់តែរង់ចាំមើលវឌ្ឍនភាពនៅលើអេក្រង់។
                        </>
                    ) : (
                        <>
                            The system will automatically chain the tools. You just need to wait and watch the progress on the screen.
                        </>
                    )}
                </Callout>
            </section>

            {/* Step 3: View results */}
            <section id="view-results" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="view-results">
                    {isKhmer ? "3. មើលលទ្ធផល" : "3. View results"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "បន្ទាប់ពី scan បញ្ចប់ អ្នកអាចមើលបញ្ជី findings ទាំងអស់៖"
                        : "After the scan completes, you can view the list of all findings:"}
                </Para>

                <SubHeading>{isKhmer ? "ការមើលបញ្ហាតាម UI" : "Viewing findings via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅផ្ទាំង 'Findings' ឬ 'Issues' នៅក្នុងទំព័រលទ្ធផល Scan។" : "Go to the 'Findings' or 'Issues' tab on the Scan results page."}</li>
                    <li>{isKhmer ? "អ្នកនឹងឃើញតារាងដែលបង្ហាញពីកម្រិតហានិភ័យ (Severity), Host, និងព័ត៌មានលម្អិត។" : "You will see a table showing the Severity, Host, and details."}</li>
                    <li>{isKhmer ? "អ្នកអាចចុចលើបញ្ហានីមួយៗដើម្បីមើលពីវិធីដោះស្រាយ និង AI Analysis បន្ថែម។" : "You can click on each issue to see the remediation and additional AI Analysis."}</li>
                </ol>
            </section>

            {/* Next steps */}
            <section id="next-steps" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="next-steps">
                    {isKhmer ? "ជំហានបន្ទាប់" : "Next steps"}
                </SectionHeading>
                <Para>
                    {isKhmer
                        ? "ឥឡូវនេះអ្នកដឹងពីមូលដ្ឋានហើយ។ ស្វែងយល់បន្ថែមអំពី៖"
                        : "Now you know the basics. Explore further:"}
                </Para>

                <div className="grid gap-3 md:grid-cols-2 mt-4">
                    <Link href="/scanning" className="group flex items-start justify-between gap-3 rounded-2xl border border-[#E7E3DA] bg-white p-5 transition-all hover:border-[#0F766E]/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#101114] dark:hover:border-[#7DE7D8]/30">
                        <div>
                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0F766E] dark:text-[#7DE7D8] mb-1">{isKhmer ? "ការស្កេន" : "Scanning"}</p>
                            <h3 className="text-[1.1rem] font-semibold text-[#1A1714] dark:text-white mb-1">
                                {isKhmer ? "Scan modes ៣ ប្រភេទ" : "Three scan modes"}
                            </h3>
                            <p className="text-[14px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55]">
                                {isKhmer ? "ស្វែងយល់ Basic, Medium, និង Advanced pipeline scans" : "Learn Basic, Medium, and Advanced pipeline scans"}
                            </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-[#88837B] dark:text-[#A1A1AA] transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link href="/ai-analysis" className="group flex items-start justify-between gap-3 rounded-2xl border border-[#E7E3DA] bg-white p-5 transition-all hover:border-[#0F766E]/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#101114] dark:hover:border-[#7DE7D8]/30">
                        <div>
                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0F766E] dark:text-[#7DE7D8] mb-1">{isKhmer ? "AI" : "AI"}</p>
                            <h3 className="text-[1.1rem] font-semibold text-[#1A1714] dark:text-white mb-1">
                                {isKhmer ? "AI Analysis" : "AI Analysis"}
                            </h3>
                            <p className="text-[14px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55]">
                                {isKhmer ? "ទទួលបានការវិភាគ និង next steps ពី Claude AI" : "Get analysis and next-step suggestions from Claude AI"}
                            </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-[#88837B] dark:text-[#A1A1AA] transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link href="/reports" className="group flex items-start justify-between gap-3 rounded-2xl border border-[#E7E3DA] bg-white p-5 transition-all hover:border-[#0F766E]/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#101114] dark:hover:border-[#7DE7D8]/30">
                        <div>
                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0F766E] dark:text-[#7DE7D8] mb-1">{isKhmer ? "របាយការណ៍" : "Reports"}</p>
                            <h3 className="text-[1.1rem] font-semibold text-[#1A1714] dark:text-white mb-1">
                                {isKhmer ? "Generate Reports" : "Generate Reports"}
                            </h3>
                            <p className="text-[14px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55]">
                                {isKhmer ? "Export findings ជា PDF, DOCX, XLSX, ឬ JSON" : "Export findings as PDF, DOCX, XLSX, or JSON"}
                            </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-[#88837B] dark:text-[#A1A1AA] transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link href="/ci-cd" className="group flex items-start justify-between gap-3 rounded-2xl border border-[#E7E3DA] bg-white p-5 transition-all hover:border-[#0F766E]/40 hover:shadow-[0_8px_24px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#101114] dark:hover:border-[#7DE7D8]/30">
                        <div>
                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0F766E] dark:text-[#7DE7D8] mb-1">CI/CD</p>
                            <h3 className="text-[1.1rem] font-semibold text-[#1A1714] dark:text-white mb-1">
                                {isKhmer ? "ការរួមបញ្ចូល CI/CD" : "CI/CD Integration"}
                            </h3>
                            <p className="text-[14px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55]">
                                {isKhmer ? "ស្កេនដោយស្វ័យប្រវត្តិនៅក្នុង GitHub Actions, GitLab CI, Jenkins" : "Automate scans in GitHub Actions, GitLab CI, Jenkins"}
                            </p>
                        </div>
                        <ArrowRight className="h-5 w-5 shrink-0 text-[#88837B] dark:text-[#A1A1AA] transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <Callout type="warn" icon={<AlertCircle className="text-[#B86800]" />} title={isKhmer ? "បញ្ហាទូទៅ" : "Common gotchas"}>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>
                            {isKhmer ? (
                                <>
                                    បំភ្លេច escape pipe — ប្រើ <InlineCode>\|</InlineCode> មិនមែន <InlineCode>|</InlineCode>
                                </>
                            ) : (
                                <>
                                    Forgetting to escape the pipe — use <InlineCode>\|</InlineCode> not <InlineCode>|</InlineCode>
                                </>
                            )}
                        </li>
                        <li>
                            {isKhmer ? (
                                <>
                                    Login port conflict — port <InlineCode>8085</InlineCode> ប្រើដោយ process ផ្សេង។ កំណត់ <InlineCode>AOF_REDIRECT_URL</InlineCode>
                                </>
                            ) : (
                                <>
                                    Login port conflict — port <InlineCode>8085</InlineCode> in use by another process. Set <InlineCode>AOF_REDIRECT_URL</InlineCode>
                                </>
                            )}
                        </li>
                        <li>
                            {isKhmer
                                ? "Daily scan quota — អ្នកប្រើដោយឥតគិតថ្លៃត្រូវកំណត់ដល់ 100 scans/ថ្ងៃ"
                                : "Daily scan quota — free tier is limited to 100 scans/day"}
                        </li>
                    </ul>
                </Callout>
            </section>

            <DocsFooterNav
                previous={{ href: "/", label: isKhmer ? "ផ្ទាំងឯកសារ" : "Documentation hub" }}
                next={{ href: "/scanning", label: isKhmer ? "ការស្កេន" : "Scanning" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
