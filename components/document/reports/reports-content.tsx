"use client";

import { useLocale } from "next-intl";
import { FileText, FileType, Palette, Filter, Folder, Info, Lightbulb } from "lucide-react";
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

export default function ReportsContent() {
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
                    <FileText className="size-3" />
                    {isKhmer ? "PDF · DOCX · XLSX · JSON" : "PDF · DOCX · XLSX · JSON"}
                </div>
                <h1 className="text-[2.4rem] md:text-[3rem] font-bold tracking-[-0.035em] leading-[1.1] text-[#1A1714] dark:text-white mb-4" style={sansFontStyle}>
                    {isKhmer ? "របាយការណ៍" : "Reports"}
                </h1>
                <p className="text-[17px] md:text-[19px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7] max-w-[44rem]">
                    {isKhmer
                        ? "បំលែង scan results របស់អ្នកទៅជា professional reports ដែលអាចបង្ហាញដល់ stakeholders, clients ឬ executives។ Auto-Offensive ផ្តល់ formats ៤ ប្រភេទ, branded templates, និង fine-grained scope filtering។"
                        : "Turn your scan results into professional reports that you can share with stakeholders, clients, or executives. Auto-Offensive provides 4 export formats, branded templates, and fine-grained scope filtering."}
                </p>
            </div>

            {/* Overview */}
            <section id="overview" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="overview">{isKhmer ? "ទិដ្ឋភាពទូទៅ" : "Overview"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "របាយការណ៍ត្រូវបានបង្កើតពី scan job មួយ ហើយរក្សាទុកក្នុង platform សម្រាប់ការទាញយកនាពេលក្រោយ។ អ្នកអាចបង្កើត ច្រើន reports ពី scan ដូចគ្នា (ឧ. PDF សម្រាប់អតិថិជន, XLSX សម្រាប់ team) ឬផ្លាស់ប្តូរ scope (steps ទាំងអស់ ឬ steps ដែលជ្រើស)។"
                        : "Reports are generated from a single scan job and stored on the platform for later download. You can produce multiple reports from the same scan (e.g., PDF for clients, XLSX for the team) or change the scope (all steps or selected steps)."}
                </Para>

                <SubHeading>{isKhmer ? "តើ report មាននៅខាងក្នុងអ្វីខ្លះ?" : "What's in a report?"}</SubHeading>
                <ul className="list-disc pl-5 space-y-1 text-[15.5px] text-[#4A4540] dark:text-[#C9CDD4] leading-[1.7]" style={sansFontStyle}>
                    <li>{isKhmer ? "Cover page ជាមួយ branding និង project metadata" : "Cover page with branding and project metadata"}</li>
                    <li>{isKhmer ? "Executive summary និង severity distribution" : "Executive summary with severity distribution"}</li>
                    <li>{isKhmer ? "ផ្នែកនីមួយៗតាម scan step (subfinder, httpx, ល។) ជាមួយលទ្ធផល" : "Per-step sections (subfinder, httpx, etc.) with results"}</li>
                    <li>{isKhmer ? "OWASP / CWE compliance mapping" : "OWASP / CWE compliance mapping"}</li>
                    <li>{isKhmer ? "Asset risk scoring" : "Asset risk scoring"}</li>
                    <li>{isKhmer ? "Job timestamps និង tools ដែលប្រើ" : "Job timestamps and tools used"}</li>
                </ul>
            </section>

            {/* Generate */}
            <section id="generate" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="generate">{isKhmer ? "បង្កើត report" : "Generate a report"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "បង្កើត report ពី scan job មួយដោយប្រើ POST /reports/generate។ Report ត្រូវបានរក្សាទុកនៅក្នុងផ្លេតហ្វម ហើយអាចទាញយកនាពេលក្រោយ។"
                        : "Generate a report from a scan job with POST /reports/generate. The report is stored on the platform and can be downloaded later."}
                </Para>

                <SubHeading>{isKhmer ? "របៀបប្រើប្រាស់តាម UI" : "How to use via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រលម្អិតនៃ Scan របស់អ្នក។" : "Navigate to your Scan details page."}</li>
                    <li>{isKhmer ? "ចុចលើប៊ូតុង 'Export Report' នៅផ្នែកខាងលើ។" : "Click the 'Export Report' button at the top."}</li>
                    <li>{isKhmer ? "ជ្រើសរើស Format ដែលអ្នកចង់បាន (ឧទាហរណ៍ PDF ឬ DOCX)។" : "Select your desired Format (e.g., PDF or DOCX)."}</li>
                    <li>{isKhmer ? "ចុចប៊ូតុង 'Generate' ហើយរង់ចាំរហូតដល់វាទាញយកដោយស្វ័យប្រវត្តិ។" : "Click 'Generate' and wait for it to download automatically."}</li>
                </ol>

                <Callout type="info" icon={<Info className="text-[#1D57C8]" />} title={isKhmer ? "Async generation" : "Async generation"}>
                    {isKhmer
                        ? "ការបង្កើត reports ធំ (1000+ findings) អាចចំណាយពេលច្រើនវិនាទី។ Endpoint ត្រឡប់ភ្លាមៗ ប៉ុន្តែសូម poll metadata ប្រសិនបើអ្នកត្រូវការ ensure ថា report ពេញលេញមុនពេលទាញយក។"
                        : "Generating large reports (1000+ findings) can take several seconds. The endpoint returns synchronously, but if you need to ensure the report is fully built before downloading, poll the metadata."}
                </Callout>
            </section>

            {/* Formats */}
            <section id="formats" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="formats">{isKhmer ? "Export formats" : "Export formats"}</SectionHeading>
                <Para>{isKhmer ? "ជ្រើសរើស format ដែលត្រូវនឹងករណីប្រើប្រាស់របស់អ្នក៖" : "Pick the format that fits your use case:"}</Para>

                <Table
                    headers={["Format", isKhmer ? "ល្អបំផុតសម្រាប់" : "Best for", "MIME type"]}
                    rows={[
                        [<InlineCode key="1">pdf</InlineCode>, isKhmer ? "Executive briefings, client deliverables" : "Executive briefings, client deliverables", <code key="m1" className="font-mono text-[12.5px]">application/pdf</code>],
                        [<InlineCode key="2">docx</InlineCode>, isKhmer ? "Reports ដែលអាចកែប្រែបាន, redlines" : "Editable reports, redlines", <code key="m2" className="font-mono text-[12.5px]">application/vnd.openxmlformats-officedocument.wordprocessingml.document</code>],
                        [<InlineCode key="3">xlsx</InlineCode>, isKhmer ? "Data analysis, raw findings export" : "Data analysis, raw findings export", <code key="m3" className="font-mono text-[12.5px]">application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</code>],
                        [<InlineCode key="4">json</InlineCode>, isKhmer ? "Programmatic processing, dashboards" : "Programmatic processing, dashboards", <code key="m4" className="font-mono text-[12.5px]">application/json</code>],
                    ]}
                />

                <SubHeading>{isKhmer ? "Layout selection" : "Layout selection"}</SubHeading>
                <Para>
                    {isKhmer ? (
                        <>
                            Report engine ជ្រើសរើស <strong>table</strong> ឬ <strong>list</strong> layout ដោយស្វ័យប្រវត្តិ
                            ដោយផ្អែកលើចំនួន columns និង format។ ឧទាហរណ៍ — ច្រើនជាង 5 columns ក្នុង PDF ប្តូរទៅ list layout
                            ដើម្បីបង្ការ overflow។
                        </>
                    ) : (
                        <>
                            The report engine automatically picks <strong>table</strong> or <strong>list</strong> layout
                            based on column count and format. Example — more than 5 columns in PDF switches to list
                            layout to prevent overflow.
                        </>
                    )}
                </Para>
            </section>

            {/* Templates */}
            <section id="templates" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="templates">{isKhmer ? "Templates និង branding" : "Templates & branding"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Reports រួមបញ្ចូល branding របស់ Auto-Offensive តាមលំនាំដើម។ សម្រាប់ self-hosted deployments អ្នកអាច override branding តាម environment variables៖"
                        : "Reports include Auto-Offensive branding by default. For self-hosted deployments, you can override branding via environment variables:"}
                </Para>

                <Table
                    headers={[isKhmer ? "Variable" : "Variable", isKhmer ? "ការពិពណ៌នា" : "Description"]}
                    rows={[
                        [<InlineCode key="1">REPORT_LOGO_PATH</InlineCode>, isKhmer ? "Path ទៅ logo image (PNG/JPG)" : "Path to a logo image (PNG/JPG)"],
                        [<InlineCode key="2">REPORT_BRANDING_NAME</InlineCode>, isKhmer ? "ឈ្មោះ brand ដែលបង្ហាញនៅលើ cover" : "Brand name shown on the cover"],
                        [<InlineCode key="3">REPORT_PRIMARY_COLOR</InlineCode>, isKhmer ? "Hex color សម្រាប់ headings និង accents" : "Hex color for headings and accents"],
                    ]}
                />

                <Callout type="tip" icon={<Lightbulb className="text-[#1A7A4A]" />} title={isKhmer ? "Custom layouts" : "Custom layouts"}>
                    {isKhmer
                        ? "Self-hosted teams អាច override report templates ដោយ mount custom HTML/CSS templates ទៅ report service container។"
                        : "Self-hosted teams can override report templates by mounting custom HTML/CSS templates into the report service container."}
                </Callout>
            </section>

            {/* Scope & Filtering */}
            <section id="scope" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="scope">{isKhmer ? "Scope និង filtering" : "Scope & filtering"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "មិនមែន scan ទាំងអស់ត្រូវការ report ពេញលេញទេ។ កំណត់ scope ដើម្បីបង្ហាញឯកសារដែលសំខាន់៖"
                        : "Not every scan needs a full report. Configure the scope to highlight what matters:"}
                </Para>

                <Table
                    headers={[isKhmer ? "Field" : "Field", "Type", isKhmer ? "ការពិពណ៌នា" : "Description"]}
                    rows={[
                        [<InlineCode key="1">step_scope</InlineCode>, "enum", isKhmer ? '"all" (ទាំងអស់), "last" (ចុងក្រោយ), "specific"' : '"all", "last", or "specific"'],
                        [<InlineCode key="2">step_ids</InlineCode>, "string[]", isKhmer ? "List នៃ step IDs (when scope=specific)" : "List of step IDs (when scope=specific)"],
                        [<InlineCode key="3">columns</InlineCode>, "object", isKhmer ? "Map នៃ tool name → columns ដែលបង្ហាញ" : "Map of tool name → columns to include"],
                    ]}
                />

                <SubHeading>{isKhmer ? "ការកំណត់ Scope តាម UI" : "Setting Scope via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "មុនពេលចុច Generate សូមចុចលើ 'Advanced Options'។" : "Before clicking Generate, click on 'Advanced Options'."}</li>
                    <li>{isKhmer ? "អ្នកអាចដោះធីក (uncheck) ជំហាន ឬ columns ដែលអ្នកមិនចង់បង្ហាញ។" : "You can uncheck steps or columns that you do not want to include."}</li>
                    <li>{isKhmer ? "របាយការណ៍នឹងត្រូវបានបង្កើតតាមអ្វីដែលអ្នកបានជ្រើសរើសប៉ុណ្ណោះ។" : "The report will be generated only with your selections."}</li>
                </ol>

                <Callout type="info" icon={<Filter className="text-[#1D57C8]" />} title={isKhmer ? "Row capping" : "Row capping"}>
                    {isKhmer
                        ? "Reports មាន row cap 1000 ក្នុងមួយ step ដើម្បីការពារ file size ដ៏ធំ។ Field is_truncated នៅក្នុង response នឹងបង្ហាញនៅពេល cap ត្រូវបាន hit ហើយ total_row_count បង្ហាញចំនួនពិតប្រាកដ។"
                        : 'Reports cap rows at 1000 per step to keep file sizes reasonable. The is_truncated field in the response indicates when the cap is hit, and total_row_count reports the actual count.'}
                </Callout>
            </section>

            {/* Manage */}
            <section id="manage" className="doc-section scroll-mt-24 mb-12">
                <SectionHeading id="manage">{isKhmer ? "គ្រប់គ្រង reports" : "Manage reports"}</SectionHeading>
                <Para>
                    {isKhmer
                        ? "Reports ត្រូវបានរក្សាទុកក្នុងគណនីរបស់អ្នក។ បញ្ជី, ទាញយក, ឬលុបពួកវាដោយប្រើ REST API៖"
                        : "Reports are stored against your account. List, download, or delete them via REST API:"}
                </Para>

                <SubHeading>{isKhmer ? "គ្រប់គ្រងតាម UI" : "Managing via UI"}</SubHeading>
                <ol className="list-decimal pl-5 space-y-2 text-[15px] md:text-[16px] text-[#4A4540] dark:text-[#C9CDD4] mb-6" style={sansFontStyle}>
                    <li>{isKhmer ? "ចូលទៅកាន់ទំព័រ 'Reports' ពីបញ្ជីខាងឆ្វេង (sidebar)។" : "Go to the 'Reports' page from the left sidebar."}</li>
                    <li>{isKhmer ? "អ្នកនឹងឃើញតារាងរបាយការណ៍ទាំងអស់ដែលធ្លាប់បានបង្កើត។" : "You will see a table of all previously generated reports."}</li>
                    <li>{isKhmer ? "អ្នកអាចទាញយកពួកវាម្តងទៀត ឬចុចប៊ូតុង 'Delete' ដើម្បីលុបវាចោល។" : "You can download them again or click the 'Delete' button to remove them."}</li>
                </ol>

                <SubHeading>{isKhmer ? "Filtering" : "Filtering"}</SubHeading>
                <Para>
                    {isKhmer ? (
                        <>
                            ប្រើ query parameters <InlineCode>job_id</InlineCode> និង <InlineCode>format</InlineCode>{" "}
                            ដើម្បីបង្រួម list។ ឧទាហរណ៍៖ <InlineCode>?job_id=job_xyz789</InlineCode> ត្រឡប់
                            reports ទាំងអស់ដែលបង្កើតពី scan ដូចគ្នា។
                        </>
                    ) : (
                        <>
                            Use the <InlineCode>job_id</InlineCode> and <InlineCode>format</InlineCode> query
                            parameters to narrow the list. For example,{" "}
                            <InlineCode>?job_id=job_xyz789</InlineCode> returns all reports generated from the same
                            scan.
                        </>
                    )}
                </Para>
            </section>

            <DocsFooterNav
                previous={{ href: "/code-scanning", label: isKhmer ? "Code Scanning (SAST)" : "Code Scanning (SAST)" }}
                next={{ href: "/dashboard", label: isKhmer ? "Dashboard និង Analytics" : "Dashboard & Analytics" }}
                previousText={isKhmer ? "មុន" : "Previous"}
                nextText={isKhmer ? "បន្ទាប់" : "Next"}
            />
        </main>
    );
}
