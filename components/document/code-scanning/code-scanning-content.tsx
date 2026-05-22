"use client";

import { useLocale } from "next-intl";
import { Code2, GitBranch, AlertTriangle, ShieldAlert, Package, GitMerge, Info } from "lucide-react";
import DocsFooterNav from "@/components/document/docs-footer-nav";
import {
    InlineCode,
    Para,
    SectionHeading,
    SubHeading,
    CodeBlock,
    Callout,
    Table,
    getPageFontVars,
    sansFontStyle,
} from "@/components/document/shared/doc-primitives";

export default function CodeScanningContent() {
    const locale = useLocale();
    const isKhmer = locale === "kh";

    return (
        <main
            className="flex-1 min-w-0 px-8 md:px-12 xl:px-14 pt-12 pb-24 max-[640px]:px-5"
            lang={isKhmer ? "km" : "en"}
            style={{ fontFamily: "var(--docs-sans-font), sans-serif", ...getPageFontVars(isKhmer) }}
        >
            <div className="mb-10 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-[#00BCA1] bg-[rgba(0,188,161,0.07)] border border-[rgba(0,188,161,0.2)] px-2.5 py-1 rounded-full mb-4">
                    <Code2 className="size-3" />
                    {isKhmer ? "ដំណើរការដោយ SonarQube" : "Powered by SonarQube"}
                </div>
                <h1 className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4" style={sansFontStyle}>
                    {isKhmer ? "Code Scanning (SAST)" : "Code Scanning (SAST)"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "ធ្វើ Static Application Security Testing (SAST) លើ source code repositories របស់អ្នកដោយផ្ទាល់។ រកឃើញ vulnerabilities, code smells, security hotspots, និង dependency vulnerabilities មុនពេលពួកវាទៅដល់ production។"
                        : "Run Static Application Security Testing (SAST) directly against your source code repositories. Find vulnerabilities, code smells, security hotspots, and dependency vulnerabilities before they reach production."}
                </p>
            </div>

            {/* Overview */}
            <section id="overview" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="overview">{isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Code Scanning ធ្វើការលើ source code ផ្ទាល់ — មិនមែន runtime targets ដូចជា scan modes ផ្សេងទៀតទេ។ វាភ្ជាប់ទៅ Git repository របស់អ្នក, clone code, ហើយវិភាគវាជាមួយ SonarQube engines។"
                        : "Code Scanning runs directly against your source code — not against runtime targets like the other scan modes. It connects to your Git repository, clones the code, and analyzes it with SonarQube engines."}
                </Para>

                <SubHeading>{isKhmer ? "អ្វីដែលវារកឃើញ" : "What it finds"}</SubHeading>
                <ul className="list-disc pl-5 space-y-1 text-[15.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7]" style={sansFontStyle}>
                    <li><strong>{isKhmer ? "Bugs" : "Bugs"}</strong> — {isKhmer ? "កំហុសក្នុង logic" : "logic errors that could crash or misbehave"}</li>
                    <li><strong>{isKhmer ? "Vulnerabilities" : "Vulnerabilities"}</strong> — {isKhmer ? "ចំណុចខ្សោយផ្នែកសុវត្ថិភាពដែលអាចត្រូវបាន exploit" : "exploitable security weaknesses (SQLi, XSS, etc.)"}</li>
                    <li><strong>{isKhmer ? "Code smells" : "Code smells"}</strong> — {isKhmer ? "ការអនុវត្តដែលមិនល្អ" : "maintainability issues"}</li>
                    <li><strong>{isKhmer ? "Security hotspots" : "Security hotspots"}</strong> — {isKhmer ? "Code ដែលត្រូវការការត្រួតពិនិត្យដោយដៃ" : "code requiring manual review"}</li>
                    <li><strong>{isKhmer ? "Dependency vulns" : "Dependency vulns"}</strong> — {isKhmer ? "CVEs នៅក្នុង packages ដែលអ្នកប្រើ" : "CVEs in third-party packages you depend on"}</li>
                </ul>
            </section>

            {/* Git integration */}
            <section id="git-integration" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="git-integration">{isKhmer ? "Git integration" : "Git integration"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "មុនពេលដំណើរការ code scan អ្នកត្រូវភ្ជាប់ Git account របស់អ្នកជាមួយ Auto-Offensive។ ផ្លេតហ្វមគាំទ្រ GitHub និង GitLab។"
                        : "Before running a code scan, connect your Git account to Auto-Offensive. The platform supports GitHub and GitLab."}
                </Para>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "OAuth ឬ Personal Access Token" : "OAuth or Personal Access Token"}>
                    {isKhmer
                        ? "ភ្ជាប់តាម OAuth សម្រាប់ការបង្ហាញ repository ធម្មតា ឬប្រើ Personal Access Token (PAT) សម្រាប់ private repositories ដែលត្រូវការ explicit scopes (repo, read:org)។"
                        : "Connect via OAuth for typical repository access, or use a Personal Access Token (PAT) for private repositories requiring explicit scopes (repo, read:org)."}
                </Callout>
            </section>

            {/* Trigger */}
            <section id="trigger-scan" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="trigger-scan">{isKhmer ? "បើក code scan" : "Trigger a code scan"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "ដាក់បញ្ជូន code scan តាម REST API ឬ Web UI។ Scan កើតឡើងលើ branch, commit ឬ pull request ជាក់លាក់។"
                        : "Submit a code scan via REST API or Web UI. The scan targets a specific branch, commit, or pull request."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រ 'Code Scanning' ពី sidebar។" : "Navigate to the 'Code Scanning' page from the sidebar."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស Repository របស់អ្នកពីបញ្ជី។" : "Select your Repository from the list."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស Branch ដែលអ្នកចង់ស្កេន (ឧ. main)។" : "Select the Branch you want to scan (e.g., main)."}</li>
                    <li>{isKhmer ? "ចុចប៊ូតុង 'Start Scan'។" : "Click the 'Start Scan' button."}</li>
                </ol>

                <SubHeading>{isKhmer ? "ការតាមដាន progress" : "Track progress"}</SubHeading>
                <SubHeading>{isKhmer ? "ការតាមដានតាម UI" : "Tracking via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "អ្នកនឹងឃើញ Status របស់ការស្កេនផ្លាស់ប្តូរ (Pending -> Running -> Completed)។" : "You will see the scan Status change (Pending -> Running -> Completed)."}</li>
                    <li>{isKhmer ? "អ្នកអាចចុច 'View Logs' ដើម្បីមើលដំណើរការស្កេនផ្ទាល់។" : "You can click 'View Logs' to watch the live scanning process."}</li>
                </ol>
            </section>

            {/* Issues */}
            <section id="issues" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="issues">{isKhmer ? "Issues និង severity" : "Issues & severity"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "នៅពេល scan បញ្ចប់ វាបង្កើត issues ដែលត្រូវបានចាត់ប្រភេទតាមប្រភេទនិង severity។"
                        : "When a scan completes, it produces issues classified by type and severity."}
                </Para>

                <Table
                    headers={["Severity", isKhmer ? "អត្ថន័យ" : "Meaning", isKhmer ? "សកម្មភាព" : "Action"]}
                    rows={[
                        [<span key="1" className="font-mono text-[#C42828]">BLOCKER</span>, isKhmer ? "Bug ធ្ងន់ធ្ងរបំផុត" : "Most severe bug", isKhmer ? "ជួសជុលភ្លាមៗ" : "Fix immediately"],
                        [<span key="2" className="font-mono text-[#B86800]">CRITICAL</span>, isKhmer ? "Bug ឬ vuln ដ៏អាក្រក់" : "Bug or vuln very harmful", isKhmer ? "ជួសជុលមុន release" : "Fix before release"],
                        [<span key="3" className="font-mono text-[#1D57C8]">MAJOR</span>, isKhmer ? "Quality issue សំខាន់" : "Important quality issue", isKhmer ? "Plan ដើម្បីជួសជុល" : "Plan to fix"],
                        [<span key="4" className="font-mono text-[#1A7A4A]">MINOR</span>, isKhmer ? "Quality issue មិនសំខាន់" : "Less important quality issue", isKhmer ? "ត្រួតពិនិត្យដោយ team" : "Team review"],
                        [<span key="5" className="font-mono text-[#88837B]">INFO</span>, isKhmer ? "សម្រាប់ព័ត៌មាន" : "For information only", isKhmer ? "មិនចាំបាច់" : "No action required"],
                    ]}
                />

                <SubHeading>{isKhmer ? "ការទាញយក issues" : "Fetching issues"}</SubHeading>
                <SubHeading>{isKhmer ? "ការមើលបញ្ហាតាម UI" : "Viewing issues via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "នៅពេលការស្កេនបញ្ចប់ សូមចូលទៅផ្ទាំង 'Issues'។" : "When the scan completes, go to the 'Issues' tab."}</li>
                    <li>{isKhmer ? "អ្នកអាចប្រើតម្រង (Filter) ដើម្បីរើសមើលតាម Severity (CRITICAL, MAJOR...)។" : "You can use filters to view by Severity (CRITICAL, MAJOR...)."}</li>
                    <li>{isKhmer ? "ចុចលើបញ្ហានីមួយៗដើម្បីមើលបន្ទាត់កូដនិងវិធីជួសជុល។" : "Click on any issue to see the code line and fix instructions."}</li>
                </ol>
            </section>

            {/* Hotspots */}
            <section id="hotspots" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="hotspots">{isKhmer ? "Security hotspots" : "Security hotspots"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Security hotspots គឺជាបន្ទាត់ code ដែលគួរត្រូវត្រួតពិនិត្យដោយដៃ — មិនមែនជា vulnerabilities ច្បាស់លាស់ទេ ប៉ុន្តែ patterns ដែលអាចមានបញ្ហាប្រសិនបើប្រើមិនត្រឹមត្រូវ។"
                        : "Security hotspots are code lines that warrant manual review — not confirmed vulnerabilities, but patterns that could be problematic if used incorrectly."}
                </Para>

                <Callout type="warn" icon={<ShieldAlert className="text-[#B86800]" />} title={isKhmer ? "Hotspot ≠ Vulnerability" : "Hotspot ≠ Vulnerability"}>
                    {isKhmer
                        ? "Hotspot គឺ \"សូមបង្ហាញខ្ញុំនូវចំណុចនេះ\" មិនមែន \"ខ្ញុំបានរកឃើញវា\" ទេ។ ឧទាហរណ៍៖ ការប្រើ SecureRandom() — វាមិនមែនជា bug ទេ ប៉ុន្តែវាគួរត្រូវត្រួតពិនិត្យដើម្បីប្រាកដថាវាប្រើត្រឹមត្រូវ។"
                        : 'Hotspots say "show me this," not "I found it." Example: usage of SecureRandom() — not a bug, but worth reviewing to make sure it\'s used correctly.'}
                </Callout>

                <SubHeading>{isKhmer ? "ការពិនិត្យតាម UI" : "Reviewing via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅផ្ទាំង 'Security Hotspots'។" : "Go to the 'Security Hotspots' tab."}</li>
                    <li>{isKhmer ? "ពិនិត្យមើលចំណុចនីមួយៗ ហើយសម្គាល់ថាវា 'Safe' ឬ 'Vulnerable'។" : "Review each hotspot and mark it as 'Safe' or 'Vulnerable'."}</li>
                </ol>
            </section>

            {/* Dependencies */}
            <section id="dependencies" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="dependencies">{isKhmer ? "Dependency vulnerabilities" : "Dependency vulnerabilities"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Auto-Offensive រួមបញ្ចូល dependency scanners ដែលពិនិត្យ packages ភាគីទីបីសម្រាប់ CVEs ដែលបានដឹងហើយ។ វាដំណើរការ scanners ផ្សេងៗគ្នាដោយផ្អែកលើភាសា៖"
                        : "Auto-Offensive includes dependency scanners that check third-party packages for known CVEs. It runs different scanners depending on the language:"}
                </Para>

                <Table
                    headers={[isKhmer ? "ភាសា" : "Language", "Scanner", isKhmer ? "Manifest" : "Manifest"]}
                    rows={[
                        ["Go", "govulncheck", "go.mod / go.sum"],
                        ["Python", "pip-audit", "requirements.txt / pyproject.toml"],
                        ["JavaScript / Node", "npm audit", "package.json / package-lock.json"],
                        ["Java / Maven", "dependency-check", "pom.xml"],
                    ]}
                />

                <SubHeading>{isKhmer ? "លទ្ធផលតាម UI" : "Results via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅផ្ទាំង 'Dependencies'។" : "Go to the 'Dependencies' tab."}</li>
                    <li>{isKhmer ? "អ្នកនឹងឃើញបញ្ជីកញ្ចប់ (packages) ដែលហួសសម័យឬមានចន្លោះប្រហោង។" : "You will see a list of outdated or vulnerable packages."}</li>
                    <li>{isKhmer ? "ប្រព័ន្ធនឹងណែនាំ Version ដែលអ្នកគួរអាប់ដេតទៅ។" : "The system will recommend the Version you should update to."}</li>
                </ol>
            </section>

            {/* Quality gates */}
            <section id="quality-gates" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="quality-gates">{isKhmer ? "Quality gates" : "Quality gates"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Quality gates ជា rules ដែលកំណត់ថាតើ scan បានឆ្លងឬបរាជ័យ។ ឧទាហរណ៍៖ \"មិនមាន CRITICAL vulnerabilities\" ឬ \"ចំនួន code coverage > 80%\"។ Auto-Offensive រាយការណ៍លទ្ធផល quality gate ដោយផ្ទាល់នៅក្នុង scan summary។"
                        : 'Quality gates are rules that determine if a scan passes or fails. For example: "no CRITICAL vulnerabilities" or "code coverage > 80%". Auto-Offensive reports the quality gate result directly in the scan summary.'}
                </Para>

                <SubHeading>{isKhmer ? "ការពិនិត្យតាម UI" : "Checking via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "នៅក្នុងទំព័រសង្ខេប (Summary) អ្នកនឹងឃើញសញ្ញាធំមួយបញ្ជាក់ពី 'Passed' ឬ 'Failed'។" : "In the Summary page, you will see a large badge showing 'Passed' or 'Failed'."}</li>
                    <li>{isKhmer ? "ប្រសិនបើបរាជ័យ វានឹងរាយបញ្ជីលក្ខខណ្ឌដែលមិនបានបំពេញ (ឧទាហរណ៍: Coverage ទាបពេក)។" : "If it fails, it will list the conditions that were not met (e.g., Coverage too low)."}</li>
                </ol>

                <Callout type="info" icon={<GitMerge className="text-[#1D57C8]" />} title={isKhmer ? "ការប្រើក្នុង CI/CD" : "Use in CI/CD"}>
                    {isKhmer
                        ? "Pipelines របស់អ្នកអាច poll quality gate ហើយបរាជ័យ build ប្រសិនបើ gate បរាជ័យ។ សូមមើលឯកសារ CI/CD Integration សម្រាប់ឧទាហរណ៍ពេញលេញ។"
                        : "Your pipelines can poll the quality gate and fail the build if the gate fails. See the CI/CD Integration docs for a full example."}
                </Callout>
            </section>

            <DocsFooterNav
                previous={{ href: "/ai-analysis", label: isKhmer ? "ការវិភាគ AI" : "AI Analysis" }}
                next={{ href: "/reports", label: isKhmer ? "របាយការណ៍" : "Reports" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
