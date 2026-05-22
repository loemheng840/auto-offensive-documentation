"use client";

import { useLocale } from "next-intl";
import { BarChart3, TrendingUp, Network, Gauge, Server, Info } from "lucide-react";
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

export default function DashboardContent() {
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
                    <BarChart3 className="size-3" />
                    {isKhmer ? "Aggregate analytics" : "Aggregate analytics"}
                </div>
                <h1 className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4" style={sansFontStyle}>
                    {isKhmer ? "Dashboard និង Analytics" : "Dashboard & Analytics"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "ឃើញរូបភាពធំ។ Dashboard បង្ហាញ vulnerabilities, assets, risk scores, និង trends ឆ្លងពេលវេលា — ដោយប្រមូលផ្តុំទិន្នន័យពី scans ទាំងអស់នៅក្នុងគណនីរបស់អ្នក។"
                        : "See the big picture. The dashboard surfaces vulnerabilities, assets, risk scores, and trends over time — aggregating data from every scan in your account."}
                </p>
            </div>

            {/* Overview */}
            <section id="overview" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="overview">{isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Dashboard analytics endpoints ទាំងអស់ត្រូវបានបង្ហាញនៅក្រោម /api/v1/dashboard។ ពួកវាគឺជា read-only ហើយ scoped ទៅគណនីដែលបាន authenticate។ ប្រើពួកវាដើម្បីបង្កើត internal dashboards, executive views ឬ aggregate widgets ។"
                        : "All dashboard analytics endpoints are exposed under /api/v1/dashboard. They're read-only and scoped to the authenticated account. Use them to build internal dashboards, executive views, or aggregate widgets."}
                </Para>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "Web UI parity" : "Web UI parity"}>
                    {isKhmer
                        ? "Web dashboard បង្ហាញ visualizations ដូចគ្នានឹងការទទួលបានពី API endpoints ទាំងនេះ។ បើអ្នកសាងសង់ custom dashboards អ្នកនឹងទទួលបានទិន្នន័យដូចគ្នាទាំងអស់ដែល Web UI ប្រើ។"
                        : "The web dashboard renders the same visualizations you get from these API endpoints. If you build a custom dashboard, you have access to the exact same data the web UI uses."}
                </Callout>
            </section>

            {/* Key metrics */}
            <section id="metrics" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="metrics">{isKhmer ? "Key metrics" : "Key metrics"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Endpoint ទិដ្ឋភាពទូទៅ /api/v1/dashboard/overview ត្រឡប់នូវ aggregate counts ដ៏សំខាន់ៗបំផុត។"
                        : "The overview endpoint /api/v1/dashboard/overview returns the most important aggregate counts."}
                </Para>

                <SubHeading>{isKhmer ? "ការមើលតាម UI" : "Viewing via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រ 'Dashboard' ពី sidebar។" : "Navigate to the 'Dashboard' page from the sidebar."}</li>
                    <li>{isKhmer ? "នៅផ្នែកខាងលើ អ្នកនឹងឃើញកាតសង្ខេបដែលបង្ហាញពីចំនួនសរុប (Hosts, Vulnerabilities, Services...)។" : "At the top, you will see summary cards showing totals (Hosts, Vulnerabilities, Services...)."}</li>
                </ol>

                <SubHeading>{isKhmer ? "Severity distribution" : "Severity distribution"}</SubHeading>
                <SubHeading>{isKhmer ? "តារាងតាម UI" : "Charts via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "រំកិលចុះក្រោមដើម្បីមើលតារាង 'Vulnerabilities by Severity'។" : "Scroll down to see the 'Vulnerabilities by Severity' chart."}</li>
                    <li>{isKhmer ? "វាបង្ហាញជាទម្រង់ Donut Chart ងាយស្រួលមើល។" : "It is displayed as an easy-to-read Donut Chart."}</li>
                </ol>
            </section>

            {/* Vulnerability trends */}
            <section id="vulnerability-trends" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="vulnerability-trends">{isKhmer ? "Vulnerability trends" : "Vulnerability trends"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "តាមដាន vulnerabilities ឆ្លងពេលវេលាដើម្បីមើល progress និងភ្ជាប់ regressions ទៅ deployments ឬ release windows។"
                        : "Track vulnerabilities over time to see progress and tie regressions to deployments or release windows."}
                </Para>

                <SubHeading>{isKhmer ? "តាមដានតាម UI" : "Tracking via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "មើលតារាងខ្សែ (Line Chart) នៃ 'Vulnerability Trends'។" : "View the Line Chart for 'Vulnerability Trends'."}</li>
                    <li>{isKhmer ? "អ្នកអាចប្រើ Dropdown ដើម្បីប្តូរចន្លោះពេល (ឧទាហរណ៍ 7 ថ្ងៃ, 30 ថ្ងៃ, 1 ឆ្នាំ)។" : "You can use the Dropdown to change the time range (e.g., 7 days, 30 days, 1 year)."}</li>
                </ol>

                <Table
                    headers={[isKhmer ? "Range" : "Range", isKhmer ? "ចំនួនថ្ងៃ" : "Days"]}
                    rows={[
                        [<InlineCode key="1">7d</InlineCode>, "7"],
                        [<InlineCode key="2">30d</InlineCode>, "30 (default)"],
                        [<InlineCode key="3">90d</InlineCode>, "90"],
                        [<InlineCode key="4">1y</InlineCode>, "365"],
                    ]}
                />
            </section>

            {/* Asset discovery */}
            <section id="asset-discovery" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="asset-discovery">{isKhmer ? "Asset discovery" : "Asset discovery"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "មើលថា attack surface របស់អ្នកធំធាត់ឬតូចថយឆ្លងពេលវេលា — រួមបញ្ចូល subdomains ថ្មី, hosts ដែលបង្ហាញ, និងសេវាកម្មដែលបានរកឃើញ។"
                        : "See whether your attack surface is growing or shrinking over time — including new subdomains, exposed hosts, and discovered services."}
                </Para>

                <SubHeading>{isKhmer ? "ទិន្នន័យតាម UI" : "Data via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "អ្នកនឹងឃើញតារាង 'Asset Discovery Trend' បង្ហាញពីចំនួន Assets ថ្មីៗ។" : "You will see an 'Asset Discovery Trend' chart showing new Assets."}</li>
                    <li>{isKhmer ? "នៅខាងក្រោម មានតារាងបញ្ជី 'Most Vulnerable Assets' ដែលបង្ហាញ Host ណាមានហានិភ័យជាងគេ។" : "Below that, there is a 'Most Vulnerable Assets' table showing which Hosts are at the highest risk."}</li>
                </ol>
            </section>

            {/* Risk scoring */}
            <section id="risk-scoring" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="risk-scoring">{isKhmer ? "Risk scoring" : "Risk scoring"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Asset នីមួយៗទទួលបាន risk score 0-100 ដែលគណនាពី severity, exploitability, និងភាពថ្មីៗនៃការរកឃើញ។ Endpoint distribution បំបែក assets ទៅជា risk buckets៖"
                        : "Each asset gets a 0-100 risk score computed from severity, exploitability, and recency of findings. The distribution endpoint buckets assets into risk tiers:"}
                </Para>

                <SubHeading>{isKhmer ? "Risk Distribution UI" : "Risk Distribution UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "តារាង Bar Chart មួយនឹងបង្ហាញពីការបែងចែក Risk Score ពី Low ទៅ Severe។" : "A Bar Chart will show the distribution of Risk Scores from Low to Severe."}</li>
                    <li>{isKhmer ? "អ្នកអាចយក mouse ទៅដាក់លើ Bar នីមួយៗដើម្បីមើលចំនួន Assets ជាក់លាក់។" : "You can hover over each Bar to see the specific number of Assets."}</li>
                </ol>

                <Callout type="info" icon={<Gauge className="text-[#1D57C8]" />} title={isKhmer ? "ការគណនា Risk score" : "How risk score is calculated"}>
                    {isKhmer
                        ? "Risk score = (severity_weight × cvss_avg) + exploit_availability + recency_factor។ Critical CVE ដែលថ្មីៗបង្កើនពិន្ទុកាន់តែខ្ពស់ជាង Low CVE ចាស់ៗ។"
                        : "Risk score = (severity_weight × cvss_avg) + exploit_availability + recency_factor. A recent critical CVE pushes the score higher than an old low-severity CVE."}
                </Callout>
            </section>

            {/* Top charts */}
            <section id="top-charts" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="top-charts">{isKhmer ? "Top ports និង services" : "Top ports & services"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "មើលលំនាំនៅទូទាំង scans ទាំងអស់របស់អ្នក — ports បើកចំហរច្រើនបំផុត, services ដែលប្រើច្រើនបំផុត, និង technologies ដែលបង្ហាញខ្លួនច្រើន។"
                        : "See patterns across all your scans — most-open ports, most-deployed services, and frequently exposed technologies."}
                </Para>

                <SubHeading>{isKhmer ? "Top Charts UI" : "Top Charts UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "មាន Widgets សម្រាប់ Top 10 Open Ports, Top 10 Services និង Technologies។" : "There are Widgets for Top 10 Open Ports, Top 10 Services, and Technologies."}</li>
                    <li>{isKhmer ? "ទិន្នន័យនេះជួយអ្នកដឹងថាតើ Service ណាដែលអ្នកបើកច្រើនជាងគេ។" : "This data helps you understand which Services you have exposed the most."}</li>
                </ol>

                <Callout type="info" icon={<Server className="text-[#1D57C8]" />} title={isKhmer ? "Aggregate count caveat" : "Aggregate count caveat"}>
                    {isKhmer
                        ? "Counts គឺឆ្លងពី scans ទាំងអស់របស់អ្នក។ បើ host មួយលេចមួយឡើងនៅក្នុង scans បួនថ្មីៗ វានឹងរាប់ម្តង (deduplicated by hostname/IP) មិនមែនបួនទេ។"
                        : "Counts are aggregated across all your scans. If a host appears in four recent scans, it counts once (deduplicated by hostname/IP), not four times."}
                </Callout>
            </section>

            <DocsFooterNav
                previous={{ href: "/reports", label: isKhmer ? "របាយការណ៍" : "Reports" }}
                next={{ href: "/cli", label: isKhmer ? "ឯកសារ CLI" : "CLI Reference" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
