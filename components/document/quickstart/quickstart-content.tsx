"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
    HardDriveDownload,
    LogIn,
    FolderPlus,
    PlayCircle,
    ListChecks,
    Info,
    AlertTriangle,
    CheckCircle2,
    Clock,
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
        if (codeRef.current) {
            navigator.clipboard.writeText(codeRef.current.innerText).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
            });
        }
    };

    return (
        <div className="rounded-xl overflow-hidden my-4 border border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.14),0_1px_4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-[#16181F]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                </div>
                <span className="font-mono text-[11px] text-white/30 tracking-wider">
                    {title}
                </span>
                <button
                    onClick={handleCopy}
                    className="font-mono text-[10px] text-white/30 bg-transparent border-none cursor-pointer hover:text-white/75 hover:bg-white/[0.07] px-2 py-0.5 rounded transition-all duration-150"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <div className="bg-[#16181F] px-5 py-4 overflow-x-auto">
                <code
                    ref={codeRef}
                    className="text-[14px] md:text-[15px] leading-[1.85] text-white/55 whitespace-pre"
                    style={monoFontStyle}
                >
                    {children}
                </code>
            </div>
        </div>
    );
}

const Prompt = () => <span className="text-white/25 select-none">$ </span>;
const Cmd = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#7DD3C8] font-medium">{children}</span>
);
const Flag = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#F9C860]">{children}</span>
);
const Val = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#A8D8A8]">{children}</span>
);
const Cm = ({ children }: { children: React.ReactNode }) => (
    <span className="text-white/22 italic">{children}</span>
);
const Ok = () => <span className="text-[#6EE7B7]">✓</span>;
const Dim = ({ children }: { children: React.ReactNode }) => (
    <span className="text-white/35">{children}</span>
);

function Callout({
    type = "info",
    icon,
    title,
    children,
}: {
    type?: "info" | "warn" | "tip";
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    const styles: Record<string, string> = {
        info: "border-l-[#1D57C8] bg-[rgba(29,87,200,0.04)]",
        warn: "border-l-[#B86800] bg-[rgba(184,104,0,0.04)]",
        tip: "border-l-[#1A7A4A] bg-[rgba(26,122,74,0.04)]",
    };
    const titleColors: Record<string, string> = {
        info: "text-[#1D57C8]",
        warn: "text-[#B86800]",
        tip: "text-[#1A7A4A]",
    };
    return (
        <div
            className={`flex gap-3 px-4 py-3.5 rounded-lg border border-[#E2DDD5] dark:border-white/10 border-l-[3px] my-4 dark:bg-white/3 ${styles[type]}`}
        >
            <span className="shrink-0 mt-0.5 [&_svg]:size-4">{icon}</span>
            <div className="flex-1">
                <div
                    className={`text-[11px] font-bold tracking-[0.07em] uppercase mb-1 ${titleColors[type]}`}
                >
                    {title}
                </div>
                <div
                    className="text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.65]"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function StepHeading({
    num,
    icon,
    title,
}: {
    num: number;
    icon: React.ReactNode;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DDEBE7] bg-[#F4FBF8] text-[#0F766E] dark:border-white/10 dark:bg-white/5 dark:text-[#7DE7D8] [&_svg]:size-4.5">
                {icon}
            </div>
            <div>
                <div className="text-[10.5px] font-mono font-semibold tracking-[0.16em] uppercase text-[#0F766E] dark:text-[#7DE7D8]">
                    Step {num}
                </div>
                <h2
                    className="text-[1.5rem] md:text-[1.65rem] font-bold tracking-[-0.025em] text-[#1A1714] dark:text-white leading-tight"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {title}
                </h2>
            </div>
        </div>
    );
}

export default function QuickstartContent() {
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
                    <Clock className="size-3" />
                    {isKhmer ? "ប្រហែល ៥ នាទី" : "About 5 minutes"}
                </div>
                <h1
                    className="text-[2.4rem] md:text-[2.8rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer ? "ការចាប់ផ្តើមរហ័ស ៥ នាទី" : "5-Minute Quickstart"}
                </h1>
                <p
                    className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer
                        ? "ឆ្លងពីសូន្យទៅ scan សុវត្ថិភាពដំបូងរបស់អ្នកក្នុង session តែមួយ។ អ្នកនឹងដំឡើង CLI, ផ្ទៀងផ្ទាត់ និងដំណើរការ pipeline ពិតប្រាកដដែលរកឃើញ subdomains និង probe ពួកវាសម្រាប់ HTTP services។"
                        : "Get from zero to your first security scan in one session. You'll install the CLI, authenticate, and run a real pipeline that discovers subdomains and probes them for HTTP services."}
                </p>

                {/* What you'll do */}
                <div className="mt-6 rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white/80 dark:bg-[#101114] p-5">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#88837B] dark:text-[#9CA3AF] mb-3">
                        {isKhmer ? "អ្វីដែលអ្នកនឹងធ្វើ" : "What you'll do"}
                    </p>
                    <ol className="space-y-2">
                        {(isKhmer
                            ? [
                                "ចុះឈ្មោះប្រើប្រាស់គណនី Auto-Offensive",
                                "ចូលទៅកាន់ Web Dashboard",
                                "បង្កើត project ដើម្បីរៀបចំការងាររបស់អ្នក",
                                "ដំណើរការ scan",
                                "មើល findings",
                            ]
                            : [
                                "Sign up for an Auto-Offensive account",
                                "Log in to the Web Dashboard",
                                "Create a project to organize your work",
                                "Run a scan",
                                "View the findings",
                            ]
                        ).map((line, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00BCA1]/10 text-[11px] font-mono font-semibold text-[#00BCA1]">
                                    {i + 1}
                                </span>
                                <span className="text-[15px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.6]">
                                    {line}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>

                <Callout
                    type="info"
                    icon={<Info className="text-[#1D57C8]" />}
                    title={isKhmer ? "មុនពេលអ្នកចាប់ផ្តើម" : "Before you start"}
                >
                    {isKhmer ? (
                        <>
                            អ្នកត្រូវការគណនី Auto-Offensive។ ប្រសិនបើអ្នកមិនមានទេ ចុះឈ្មោះនៅ{" "}
                            <InlineCode>app.auto-offensive.com/signup</InlineCode>។ Free tier
                            ផ្តល់ឱ្យអ្នកនូវអ្វីដែលអ្នកត្រូវការដើម្បីធ្វើតាមមគ្គុទ្ទេសក៍នេះ។
                        </>
                    ) : (
                        <>
                            You need an Auto-Offensive account. If you don&apos;t have one,
                            sign up at <InlineCode>app.auto-offensive.com/signup</InlineCode>.
                            The free tier gives you everything you need to follow this guide.
                        </>
                    )}
                </Callout>
            </div>

            {/* STEP 1 */}
            <section id="install" className="doc-section scroll-mt-24 mb-12">
                <StepHeading
                    num={1}
                    icon={<HardDriveDownload />}
                    title={isKhmer ? "ចុះឈ្មោះប្រើប្រាស់" : "Sign Up"}
                />
                <Para>
                    {isKhmer
                        ? "ចូលទៅកាន់វិបសាយដើម្បីបង្កើតគណនីរបស់អ្នក។"
                        : "Go to the website to create your account."}
                </Para>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5 my-4">
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        <li>{isKhmer ? "ចូលទៅកាន់ទំព័រចុះឈ្មោះ (Sign Up)។" : "Navigate to the Sign Up page."}</li>
                        <li>{isKhmer ? "បញ្ចូលអុីម៉ែល និងពាក្យសម្ងាត់របស់អ្នក។" : "Enter your email and password."}</li>
                        <li>{isKhmer ? "ចុចប៊ូតុង 'Create Account'។" : "Click the 'Create Account' button."}</li>
                        <li>{isKhmer ? "ពិនិត្យអុីម៉ែលរបស់អ្នកដើម្បីបញ្ជាក់គណនី។" : "Check your email to verify your account."}</li>
                    </ol>
                </div>
            </section>

            {/* STEP 2 */}
            <section id="login" className="doc-section scroll-mt-24 mb-12">
                <StepHeading
                    num={2}
                    icon={<LogIn />}
                    title={isKhmer ? "ចូលប្រើប្រាស់" : "Log in"}
                />
                <Para>
                    {isKhmer
                        ? "ចូលទៅកាន់ Web Dashboard របស់អ្នក។"
                        : "Log in to your Web Dashboard."}
                </Para>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5 my-4">
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        <li>{isKhmer ? "បញ្ចូលអុីម៉ែល និងពាក្យសម្ងាត់របស់អ្នក។" : "Enter your email and password."}</li>
                        <li>{isKhmer ? "ចុចប៊ូតុង 'Log In'។" : "Click the 'Log In' button."}</li>
                        <li>{isKhmer ? "អ្នកនឹងឃើញទំព័រ Dashboard ផ្ទាល់ខ្លួនរបស់អ្នក។" : "You will see your personal Dashboard."}</li>
                    </ol>
                </div>
            </section>

            {/* STEP 3 */}
            <section id="project" className="doc-section scroll-mt-24 mb-12">
                <StepHeading
                    num={3}
                    icon={<FolderPlus />}
                    title={isKhmer ? "បង្កើត project" : "Create a project"}
                />
                <Para>
                    {isKhmer
                        ? "Projects រៀបចំ scans និង findings របស់អ្នក។ បង្កើតមួយសម្រាប់ demo នេះ៖"
                        : "Projects organize your scans and findings. Create one for this demo:"}
                </Para>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5 my-4">
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        <li>{isKhmer ? "ចុចប៊ូតុង 'New Project' នៅជ្រុងខាងស្តាំខាងលើ។" : "Click the 'New Project' button at the top right."}</li>
                        <li>{isKhmer ? "បញ្ចូលឈ្មោះ Project របស់អ្នក (ឧ. 'Demo')។" : "Enter your Project name (e.g., 'Demo')."}</li>
                        <li>{isKhmer ? "ចុចរក្សាទុក (Save)។" : "Click Save."}</li>
                    </ol>
                </div>
            </section>

            {/* STEP 4 */}
            <section id="scan" className="doc-section scroll-mt-24 mb-12">
                <StepHeading
                    num={4}
                    icon={<PlayCircle />}
                    title={isKhmer ? "ដំណើរការ scan ដំបូងរបស់អ្នក" : "Run your first scan"}
                />
                <Para>
                    {isKhmer ? (
                        <>
                            ឥឡូវនេះដំណើរការ scan តាមរយៈ UI ដែលនឹងរកឃើញ subdomains និង probe ពួកវានីមួយៗសម្រាប់ HTTP services៖
                        </>
                    ) : (
                        <>
                            Now run a scan via the UI that finds subdomains and probes each one for HTTP services:
                        </>
                    )}
                </Para>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5 my-4">
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        <li>{isKhmer ? "ចូលទៅកាន់ Project ដែលអ្នកទើបតែបង្កើត ហើយចុច 'New Scan'។" : "Go into the Project you just created and click 'New Scan'."}</li>
                        <li>{isKhmer ? "បញ្ចូល Target (ឧ. example.com)។" : "Enter a Target (e.g., example.com)."}</li>
                        <li>{isKhmer ? "ជ្រើសរើស Basic Mode រួចចុច Start Scan។" : "Select Basic Mode and click Start Scan."}</li>
                        <li>{isKhmer ? "រង់ចាំមើលដំណើរការស្កេនដែលបង្ហាញនៅលើអេក្រង់។" : "Wait and watch the scan progress displayed on the screen."}</li>
                    </ol>
                </div>
            </section>

            {/* STEP 5 */}
            <section id="findings" className="doc-section scroll-mt-24 mb-12">
                <StepHeading
                    num={5}
                    icon={<ListChecks />}
                    title={isKhmer ? "មើល findings" : "View findings"}
                />
                <Para>
                    {isKhmer
                        ? "អ្នកអាចមើលបញ្ជី findings ពី scan របស់អ្នកនៅក្នុង UI៖"
                        : "You can view the list of findings from your scan in the UI:"}
                </Para>

                <div className="rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114] p-5 my-4">
                    <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4]" style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}>
                        <li>{isKhmer ? "ចូលទៅផ្ទាំង 'Findings' ឬ 'Issues' នៅក្នុងទំព័រលទ្ធផល Scan។" : "Go to the 'Findings' or 'Issues' tab on the Scan results page."}</li>
                        <li>{isKhmer ? "អ្នកនឹងឃើញតារាងដែលបង្ហាញពីកម្រិតហានិភ័យ (Severity), Host, និងព័ត៌មានលម្អិត។" : "You will see a table showing the Severity, Host, and details."}</li>
                        <li>{isKhmer ? "អ្នកអាចប្រើមុខងារតម្រង (Filter) របស់ UI ដើម្បីមើលតែបញ្ហាដែលមានហានិភ័យខ្ពស់បាន។" : "You can use the UI's filter function to view only high-risk issues."}</li>
                    </ol>
                </div>

                {/* Findings table preview */}
                <div className="overflow-x-auto my-4 rounded-xl border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#101114]">
                    <table className="w-full border-collapse text-[14px]">
                        <thead className="bg-[#F0EDE6] dark:bg-white/5">
                            <tr>
                                {(isKhmer
                                    ? ["Severity", "Host", "Port", "Details"]
                                    : ["Severity", "Host", "Port", "Details"]
                                ).map((h) => (
                                    <th
                                        key={h}
                                        className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-[#88837B] dark:text-[#9CA3AF] px-3.5 py-2.5 text-left border-b border-[#E2DDD5] dark:border-white/10"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                {
                                    sev: "INFO",
                                    host: "www.example.com",
                                    port: "443",
                                    details: "HTTP 200, nginx",
                                },
                                {
                                    sev: "INFO",
                                    host: "api.example.com",
                                    port: "443",
                                    details: "HTTP 200, nginx",
                                },
                                {
                                    sev: "INFO",
                                    host: "mail.example.com",
                                    port: "443",
                                    details: "HTTP 301",
                                },
                            ].map((row, i) => (
                                <tr
                                    key={i}
                                    className="hover:bg-[#FAF8F2] dark:hover:bg-white/5"
                                >
                                    <td className="px-3.5 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 last:border-b-0">
                                        <span className="font-mono text-[10.5px] font-bold tracking-[0.08em] px-2 py-0.5 rounded border border-[#88837B33] text-[#88837B] bg-[rgba(136,131,123,0.08)]">
                                            {row.sev}
                                        </span>
                                    </td>
                                    <td
                                        className="px-3.5 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[#1A1714] dark:text-white"
                                        style={monoFontStyle}
                                    >
                                        {row.host}
                                    </td>
                                    <td
                                        className="px-3.5 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[#4A4540] dark:text-[#C9CDD4]"
                                        style={monoFontStyle}
                                    >
                                        {row.port}
                                    </td>
                                    <td className="px-3.5 py-2.5 border-b border-[#E2DDD5] dark:border-white/10 text-[#4A4540] dark:text-[#C9CDD4]">
                                        {row.details}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Para>
                    {isKhmer
                        ? "ជួរនីមួយៗគឺជា finding មួយ — អ្វីមួយដែល scan បានរកឃើញ។ ក្នុងករណីនេះ services HTTPS បីដែលរស់។ Scans ពិតផលិត findings ដែលមាន severity ខ្ពស់ជាង (vulnerabilities, exposed services, misconfigurations)។"
                        : "Each row is a finding — something the scan discovered. In this case, three live HTTPS services. Real scans produce findings with higher severity (vulnerabilities, exposed services, misconfigurations)."}
                </Para>


            </section>

            {/* Next steps */}
            <section id="next-steps" className="doc-section scroll-mt-24 mb-8">
                <h2
                    className="text-[1.55rem] md:text-[1.7rem] font-bold tracking-[-0.025em] text-[#1A1714] dark:text-white mb-3 pt-2"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer ? "ជំហានបន្ទាប់" : "Next steps"}
                </h2>
                <Para>
                    {isKhmer
                        ? "អ្នកទើបតែដំណើរការ scan pipeline ដំបូង និងបានឃើញ findings ។ នេះជាអ្វីដែលត្រូវស្វែងយល់បន្ទាប់៖"
                        : "You just ran your first pipeline scan and saw findings. Here's what to explore next:"}
                </Para>

                <div className="grid gap-3 md:grid-cols-2 mt-4">
                    {[
                        {
                            href: "/cli",
                            title: isKhmer ? "ដំណើរការ pipelines ស្មុគ្រស្មាញ" : "Run more complex pipelines",
                            desc: isKhmer
                                ? "ភ្ជាប់ tools បីឬបួនសម្រាប់ reconnaissance ជ្រៅជាង។"
                                : "Chain three or four tools for deeper reconnaissance.",
                        },
                        {
                            href: "/cli#streaming",
                            title: isKhmer ? "ប្រើ interactive mode" : "Use interactive mode",
                            desc: isKhmer
                                ? "បន្ថែម -i ដើម្បីឃើញ live progress dashboard។"
                                : "Add -i to see a live progress dashboard.",
                        },
                        {
                            href: "/cli#jobs",
                            title: isKhmer ? "មើល scans ទាំងអស់របស់អ្នក" : "Browse all your scans",
                            desc: isKhmer
                                ? "ចុះបញ្ជី បោះបង់ និងភ្ជាប់ឡើងវិញទៅ jobs ដែលកំពុងដំណើរការ។"
                                : "List, cancel, and reconnect to running jobs.",
                        },
                        {
                            href: "/api",
                            title: isKhmer ? "បង្កើត API key" : "Generate an API key",
                            desc: isKhmer
                                ? "Automate scans ពី scripts ឬ CI/CD។"
                                : "Automate scans from scripts or CI/CD.",
                        },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="group block rounded-xl border border-[#E7E3DA] dark:border-white/10 bg-white dark:bg-[#101114] p-4 transition-all duration-200 hover:border-[#0F766E]/40 hover:shadow-[0_6px_20px_rgba(15,118,110,0.07)] dark:hover:border-[#7DE7D8]/30"
                        >
                            <h3
                                className="text-[16px] font-semibold text-[#1A1714] dark:text-white mb-1"
                                style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                            >
                                {item.title}
                            </h3>
                            <p className="text-[14px] text-[#5D554B] dark:text-[#C9CDD4] leading-[1.55]">
                                {item.desc}
                            </p>
                        </a>
                    ))}
                </div>

                <p
                    className="text-[15px] md:text-[16px] text-[#0F766E] dark:text-[#7DE7D8] font-medium mt-6 italic"
                    style={{ fontFamily: "var(--docs-sans-font), sans-serif" }}
                >
                    {isKhmer
                        ? "សូមស្វាគមន៍មកកាន់ Auto-Offensive។ អ្នករួចរាល់ហើយដើម្បី scan។"
                        : "Welcome to Auto-Offensive. You're ready to scan."}
                </p>
            </section>

            <DocsFooterNav
                previous={{ href: "/concepts", label: isKhmer ? "គោលគំនិតស្នូល" : "Core Concepts" }}
                next={{ href: "/cli", label: isKhmer ? "ឯកសារ CLI" : "CLI Reference" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
