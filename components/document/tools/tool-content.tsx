'use client';

import React, { useState } from 'react';
import { useLocale } from 'next-intl';
import DocsFooterNav from "@/components/document/docs-footer-nav";
import {
  AlertTriangle,
  ClipboardList,
  FileJson,
  FileText,
  Globe,
  Lock,
  Settings,
  Wrench,
  Shield,
  CheckCircle,
  Siren,
} from 'lucide-react';

interface ToolParam {
  flag: string;
  type: string;
  req: boolean;
  desc: string;
}

interface ToolDefinition {
  badge: string;
  desc: string;
  params: ToolParam[];
  examples: string[];
}

export const ToolContent: React.FC = () => {
  const locale = useLocale();
  const isKhmer = locale === 'kh';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const sansFontStyle = {
    fontFamily: 'var(--docs-sans-font), sans-serif',
  } as const;
  const monoFontStyle = {
    fontFamily: 'var(--docs-mono-font), monospace',
  } as const;
  const pageFontVars = {
    '--docs-sans-font': isKhmer
      ? 'var(--font-noto-khmer), var(--font-google-sans)'
      : 'var(--font-google-sans), var(--font-noto-khmer)',
    '--docs-mono-font': isKhmer
      ? 'var(--font-jetbrains-mono), var(--font-noto-khmer), var(--font-google-sans)'
      : 'var(--font-jetbrains-mono), var(--font-google-sans), var(--font-noto-khmer)',
  } as React.CSSProperties;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1600);
  };
  const copy = isKhmer
    ? {
      docs: 'ឯកសារ',
      resources: 'ធនធាន',
      toolReference: 'ឯកសារ Tool',
      toolOverview: 'ទិដ្ឋភាពទូទៅនៃ Tool',
      versionBadge: 'Tool Reference · v2.0',
      intro:
        'ឯកសារយោងពេញលេញសម្រាប់ tools ស្កេនទាំងអស់នៅលើ platform រួមមាន parameters, output formats, usage examples និង behavioural notes។ Tools ទាំងអស់ដំណើរការពីចម្ងាយ ដោយមិនចាំបាច់ដំឡើងនៅ local ទេ។',
      pills: ['មាន 7 tools', 'គ្រប់គ្រង និង sandboxed', 'JSON · TXT · JSONL · XML output'],
      overviewBody:
        'Platform ផ្តល់ជូន tools សុវត្ថិភាព open-source កម្រិតស្តង់ដារដែលបានជ្រើសរើស និងដំណើរការនៅក្នុង controlled execution environment។ Tool នីមួយៗត្រូវបានធ្វើបច្ចុប្បន្នភាពជានិច្ច, sandboxed ហើយអាចប្រើបានតាម Web UI, CLI ឬ API។',
      remoteTitle: 'Tools ទាំងអស់ដំណើរការពីចម្ងាយ',
      remoteBody:
        'អ្នកមិនចាំបាច់ដំឡើង ឬ update tools ទាំងនេះនៅ local ទេ។ Platform ជាអ្នកគ្រប់គ្រង tool versions, dependency environments និង execution sandboxes ទាំងអស់។',
      versions: 'Versions & Status',
      versionsBody:
        'Platform គ្រប់គ្រង versions របស់ tools ទាំងអស់កណ្ដាល។ អ្នកតែងតែប្រើ stable release ចុងក្រោយដោយមិនចាំបាច់ upgrade ដោយដៃ។',
      limits: 'Rate Limits & Quotas',
      limitsBody:
        'ការប្រើ tools ទាំងអស់ស្ថិតក្រោម per-account rate limits និង daily quotas ដែល backend ជាអ្នកអនុវត្ត។ Limits ខុសគ្នាតាម plan tier។ បើលើស limit នឹងត្រឡប់ 429 Too Many Requests ហើយ job មិនត្រូវបាន queue ទេ។',
      output: 'Output Formats',
      outputBody:
        'Tools ទាំងអស់គាំទ្រ output formats ច្រើនប្រភេទ។ Default គឺ plain text ដែល stream ទៅ terminal របស់អ្នក។ ប្រើ format flags ដើម្បីកំណត់រចនាសម្ព័ន្ធលទ្ធផល។',
      previous: 'មុន',
      next: 'បន្ទាប់',
      reportGeneration: 'Report Generation',
    }
    : {
      docs: 'Docs',
      resources: 'Resources',
      toolReference: 'Tool Reference',
      toolOverview: 'Tool Overview',
      versionBadge: 'Tool Reference · v2.0',
      intro:
        'A complete reference for all scanning tools available on the platform — parameters, output formats, usage examples, and behavioural notes. All tools run remotely; no local installation required.',
      pills: ['7 tools available', 'Managed & sandboxed', 'JSON · TXT · JSONL · XML output'],
      overviewBody:
        'The platform exposes a curated set of industry-standard open-source security tools, each wrapped in a controlled execution environment. Every tool is kept up-to-date, sandboxed, and accessible through a unified interface — either via the Web UI, CLI, or API.',
      remoteTitle: 'All tools run remotely',
      remoteBody:
        'You never install or update any of these tools locally. The platform manages all tool versions, dependency environments, and execution sandboxes. Your only interface is the CLI command or API call.',
      versions: 'Versions & Status',
      versionsBody:
        'The platform manages all tool versions centrally. You always execute the current stable release — no manual upgrades required. Status changes are announced in the changelog.',
      limits: 'Rate Limits & Quotas',
      limitsBody:
        'All tool executions are subject to per-account rate limits and daily quotas, enforced by the backend. Limits vary by plan tier. Exceeding a limit results in a 429 Too Many Requests error and the job will not be queued.',
      output: 'Output Formats',
      outputBody:
        'All tools support multiple output formats. The default is plain text streamed to your terminal. Use format flags to control the structure of stored results and downloaded files.',
      previous: 'Previous',
      next: 'Next',
      reportGeneration: 'Report Generation',
    };

  return (
    <main
      className="bg-[#F7F5F0] dark:bg-[#09090B] flex-1 min-w-0 px-8 md:px-10 xl:px-12 pt-12 pb-32"
      lang={isKhmer ? 'km' : 'en'}
      style={{ ...sansFontStyle, ...pageFontVars }}
    >
      {/* Page Header */}
      <div className="mb-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 bg-[rgba(0,188,161,0.07)] dark:bg-[rgba(0,188,161,0.12)] text-[#00BCA1] border border-[rgba(0,188,161,0.2)] dark:border-transparent"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#00BCA1] animate-pulse" />
          {copy.versionBadge}
        </div>

        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-[#1A1714] dark:text-white leading-tight`}>
          {copy.toolReference}
        </h1>
        <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] max-w-2xl leading-relaxed mb-8`}>
          {copy.intro}
        </p>

        <div className="flex flex-wrap gap-4 pb-8 border-b border-[#E2DDD5] dark:border-white/10">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium bg-white dark:bg-[#121214] border border-[#E2DDD5] dark:border-white/10 text-[#4A4540] dark:text-[#C9CDD4]`}
          >
            <Wrench size={14} />
            {copy.pills[0]}
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium bg-white dark:bg-[#121214] border border-[#E2DDD5] dark:border-white/10 text-[#4A4540] dark:text-[#C9CDD4]`}
          >
            <Shield size={14} />
            {copy.pills[1]}
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full ${bodyTextClass} font-medium bg-white dark:bg-[#121214] border border-[#E2DDD5] dark:border-white/10 text-[#4A4540] dark:text-[#C9CDD4]`}
          >
            <CheckCircle size={14} />
            {copy.pills[2]}
          </div>
        </div>
      </div>

      {/* ─── Tool Overview Section ─── */}
      <section id="overview" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#1A1714] dark:text-white">
          {copy.toolOverview} <span className={`${monoTextClass} px-2 py-1 rounded bg-[#F0EDE6] dark:bg-[#16181F] text-[#88837B] dark:text-[#A1A1AA]`} style={monoFontStyle}>7 tools</span>
        </h2>
        <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] max-w-2xl mb-8 leading-relaxed`}>
          {copy.overviewBody}
        </p>

        {/* Tool Cards List */}
        <div className="flex flex-col gap-4 mb-8">
          {[
            {
              name: 'subfinder',
              fullname: isKhmer ? 'ការស្វែងរក Subdomain' : 'Subdomain Enumeration',
              desc: isKhmer ? 'ស្វែងរក subdomains ដោយប្រើ passive DNS sources, certificate transparency logs និង brute-force dictionary methods។' : 'Discovers subdomains using passive DNS sources, certificate transparency logs, and brute-force dictionary methods.',
              tags: ['Recon', 'Passive', 'DNS'],
              version: 'v2.6.3',
              status: 'Live',
            },
            {
              name: 'httpx',
              fullname: isKhmer ? 'HTTP Probing & Fingerprinting' : 'HTTP Probing & Fingerprinting',
              desc: isKhmer ? 'Probe HTTP/HTTPS endpoints ដើម្បីប្រមូល status codes, titles, server headers, TLS details និង technology fingerprints។' : 'Probes HTTP/HTTPS endpoints to gather status codes, titles, server headers, TLS details, and technology fingerprints.',
              tags: ['Web', 'Probing', 'TLS'],
              version: 'v1.6.5',
              status: 'Live',
            },
            {
              name: 'naabu',
              fullname: isKhmer ? 'Port Scanner' : 'Port Scanner',
              desc: isKhmer ? 'TCP/UDP port scanner លឿនដែលគាំទ្រ SYN, CONNECT និង UDP scan modes ហើយអាចស្កេន CIDR ranges និង service banner grabbing។' : 'Fast TCP/UDP port scanner with SYN, CONNECT, and UDP scan modes. Supports CIDR ranges and service banner grabbing.',
              tags: ['Network', 'TCP', 'UDP'],
              version: 'v2.3.1',
              status: 'Live',
            },
            {
              name: 'nuclei',
              fullname: isKhmer ? 'Vulnerability Scanner' : 'Vulnerability Scanner',
              desc: isKhmer ? 'Template-driven scanner សម្រាប់រក CVEs, misconfigurations, exposed panels និង custom security checks លើ web targets។' : 'Template-driven scanner for detecting CVEs, misconfigurations, exposed panels, and custom security checks across web targets.',
              tags: ['Web', 'Templates', 'CVE'],
              version: 'v3.2.7',
              status: 'Live',
            },
            {
              name: 'nmap',
              fullname: isKhmer ? 'Network Discovery & Service Detection' : 'Network Discovery & Service Detection',
              desc: isKhmer ? 'Network scanner ដែលមានមុខងារពេញលេញសម្រាប់ service detection, OS fingerprinting និង script-based vulnerability checks។' : 'Full-featured network scanner for service detection, OS fingerprinting, and script-based vulnerability checks.',
              tags: ['Network', 'Services', 'OS Detection'],
              version: 'v7.94',
              status: 'Live',
            },
            {
              name: 'gobuster',
              fullname: isKhmer ? 'Directory & File Enumeration' : 'Directory & File Enumeration',
              desc: isKhmer ? 'Brute-force tool សម្រាប់រក directories, files និង subdomains ដែលលាក់នៅលើ web servers។' : 'Brute-force tool for discovering hidden directories, files, and subdomains on web servers.',
              tags: ['Web', 'Brute-force', 'Directories'],
              version: 'v3.6.0',
              status: 'Live',
            },
            {
              name: 'gitleaks',
              fullname: isKhmer ? 'Secret Detection' : 'Secret Detection',
              desc: isKhmer ? 'ស្កេន source code repositories សម្រាប់រក secrets ដែលបានបញ្ចូលដោយចៃដន្យ ដូចជា API keys, tokens និង passwords។' : 'Scans source code repositories for accidentally committed secrets such as API keys, tokens, and passwords.',
              tags: ['Secrets', 'Git', 'SAST'],
              version: 'v8.18.0',
              status: 'Live',
            },
          ].map((tool, idx) => (
            <div
              key={idx}
              className="border border-[#E2DDD5] dark:border-white/10 rounded-xl p-5 transition-all bg-white dark:bg-[#121214] hover:bg-[#EAE6DE] dark:hover:bg-white/5 hover:border-[#00BCA1] dark:hover:border-[#00BCA1]"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 rounded-full border border-[#CEC9BF] dark:border-white/10 bg-[#F7F5F0] dark:bg-[#18181B] flex items-center justify-center font-mono text-[11px] font-semibold text-[#88837B] dark:text-[#9CA3AF]">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`${monoTextClass} font-bold text-[#1A1714] dark:text-white mb-1`} style={monoFontStyle}>{tool.name}</div>
                  <div className={`${bodyTextClass} text-[#88837B] dark:text-[#A1A1AA] mb-3`}>{tool.fullname}</div>
                  <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-4 leading-relaxed`}>{tool.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs px-2 py-1 rounded font-medium bg-[#F0EDE6] dark:bg-white/5 text-[#88837B] dark:text-[#A1A1AA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#E2DDD5] dark:border-white/10">
                    <span className={`${monoTextClass} text-[#88837B] dark:text-[#A1A1AA]`} style={monoFontStyle}>{tool.version}</span>
                    <span className="text-xs font-medium text-[#00BCA1] bg-[rgba(0,188,161,0.1)] px-2 py-1 rounded">
                      {isKhmer ? 'ដំណើរការ' : tool.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="flex gap-4 p-4 rounded-lg border-l-4 border-[#00BCA1] bg-[rgba(0,188,161,0.07)] dark:bg-white/5">
          <Lock size={20} className="shrink-0" />
          <div>
            <div className={`font-semibold text-xs uppercase tracking-wide text-[#00BCA1] mb-2`}>
              {copy.remoteTitle}
            </div>
            <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4]`}>
              {copy.remoteBody}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Tool Sections ─── */}
      {['subfinder', 'httpx', 'naabu', 'nuclei', 'nmap', 'gobuster', 'gitleaks'].map((toolName, toolIdx) => (
        <ToolSection key={toolIdx} toolName={toolName} onCopy={copyToClipboard} copiedCode={copiedCode} />
      ))}

      {/* ─── Versions ─── */}
      <section id="versions" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1A1714] dark:text-white">{copy.versions}</h2>
        <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-8`}>
          {copy.versionsBody}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { name: 'subfinder', version: 'v2.6.3' },
            { name: 'httpx', version: 'v1.6.5' },
            { name: 'naabu', version: 'v2.3.1' },
            { name: 'nuclei', version: 'v3.2.7' },
            { name: 'nmap', version: 'v7.94' },
            { name: 'gobuster', version: 'v3.6.0' },
            { name: 'gitleaks', version: 'v8.18.0' },
          ].map((v, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#121214]"
            >
              <div className="w-2 h-2 rounded-full bg-[#00BCA1] animate-pulse" />
              <div>
                <div className={`${monoTextClass} font-bold text-[#1A1714] dark:text-white`} style={monoFontStyle}>{v.name}</div>
                <div className={`${bodyTextClass} text-[#88837B] dark:text-[#A1A1AA]`}>{v.version} · stable</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Rate Limits ─── */}
      <section id="limits" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1A1714] dark:text-white">{copy.limits}</h2>
        <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-8`}>
          {copy.limitsBody.split('429 Too Many Requests')[0]}<code className={`bg-[#F0EDE6] dark:bg-[#16181F] px-2 py-1 rounded ${monoTextClass}`} style={monoFontStyle}>429 Too Many Requests</code>{copy.limitsBody.split('429 Too Many Requests')[1]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: isKhmer ? 'Daily scans' : 'Daily scans', value: '100', sub: isKhmer ? 'Free plan' : 'Free plan' },
            { label: isKhmer ? 'Concurrent jobs' : 'Concurrent jobs', value: '3', sub: isKhmer ? 'Free plan' : 'Free plan' },
            { label: isKhmer ? 'Max targets / job' : 'Max targets / job', value: '500', sub: isKhmer ? 'All plans' : 'All plans' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-[#E2DDD5] dark:border-white/10 rounded-lg p-4 bg-white dark:bg-[#121214]"
            >
              <div className="text-xs uppercase tracking-wide font-semibold text-[#88837B] dark:text-[#A1A1AA] mb-2">
                {item.label}
              </div>
              <div className="text-3xl font-bold text-[#1A1714] dark:text-white mb-1">{item.value}</div>
              <div className={`${bodyTextClass} text-[#88837B] dark:text-[#A1A1AA] mb-3`}>{item.sub}</div>
              <div className={`h-1 rounded bg-[#00BCA1] w-1/2`} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Output Formats ─── */}
      <section id="output" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1A1714] dark:text-white">{copy.output}</h2>
        <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-8`}>
          {copy.outputBody}
        </p>

        <div className="border border-[#E2DDD5] dark:border-white/10 rounded-lg overflow-hidden">
          {[
            { icon: <FileText size={22} />, title: 'Plain text (default)', desc: isKhmer ? 'លទ្ធផលមួយបន្ទាត់មួយ ត្រូវបាន stream ទៅ stdout និងរក្សាទុកជា .txt។ អាចអានបានងាយ ហើយបញ្ជូនបន្តទៅ tools ផ្សេង ឬ grep។' : 'One result per line, streamed to stdout and saved as .txt. Human-readable, easy to pipe into other tools or grep.' },
            { icon: <FileJson size={22} />, title: 'JSON / JSONL', desc: isKhmer ? 'Structured output ដែលមាន JSON object មួយក្នុងមួយបន្ទាត់ (JSONL)។ រួមមាន metadata fields ទាំងអស់ក្នុងមួយ result។' : 'Structured output with one JSON object per line (JSONL). Includes all metadata fields per result — use -json or -oJ flags depending on the tool.' },
            { icon: <Globe size={22} />, title: 'Web UI structured view', desc: isKhmer ? 'លទ្ធផលទាំងអស់ត្រូវបាន parse និងរក្សាទុកដោយស្វ័យប្រវត្តិទៅ structured data model របស់ platform។ អាច view, filter និង sort ពី dashboard។' : 'All results are automatically parsed and stored in the platform\'s structured data model, regardless of raw output format. View, filter, and sort results from the dashboard.' },
            { icon: <ClipboardList size={22} />, title: 'Report export', desc: isKhmer ? 'លទ្ធផលពី tool ណាមួយអាចបញ្ចូលក្នុង generated reports បាន ដូចជា PDF, DOCX, Excel និង JSON តាម Reporting module។' : 'Results from any tool can be included in generated reports — PDF, DOCX, Excel, and JSON formats available via the Reporting module.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 border-b border-[#E2DDD5] dark:border-white/10 last:border-b-0 hover:bg-[#EAE6DE] dark:hover:bg-white/5 transition-colors"
            >
              <div className="text-2xl shrink-0 text-[#88837B] dark:text-[#A1A1AA]">{item.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-[#1A1714] dark:text-white mb-1">{item.title}</div>
                <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4]`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Error Reference ─── */}
      <ErrorReference />

      <DocsFooterNav
        previous={{ href: "/ci-cd", label: isKhmer ? "ការរួមបញ្ចូល CI/CD" : "CI/CD Integration" }}
        next={{ href: "/api/recipes", label: isKhmer ? "ឯកសារយោង API" : "API Recipes" }}
        previousText={copy.previous}
        nextText={copy.next}
      />
    </main>
  );
};

interface ToolSectionProps {
  toolName: string;
  onCopy: (text: string, id: string) => void;
  copiedCode: string | null;
}

const ToolSection: React.FC<ToolSectionProps> = ({ toolName, onCopy, copiedCode }) => {
  const locale = useLocale();
  const isKhmer = locale === 'kh';
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoFontStyle = {
    fontFamily: 'var(--docs-mono-font), monospace',
  } as const;
  const labels = isKhmer
    ? {
      supportedParameters: 'Parameters ដែលគាំទ្រ',
      flag: 'Flag',
      type: 'Type',
      required: 'Required',
      description: 'ការពិពណ៌នា',
      usageExamples: 'Usage examples',
      copy: 'ចម្លង',
      copied: '✓ បានចម្លង!',
      passiveOnly: 'Passive sources only',
      passiveDesc: 'subfinder ប្រើ passive sources only ជា default។ វាមិនផ្ញើ DNS queries ទៅ authoritative nameservers របស់ target ដោយផ្ទាល់ទេ។',
      cidrTitle: 'CIDR range limits',
      cidrDesc: 'CIDR ranges ធំជាង /16 (65,536 hosts) មិនត្រូវបានអនុញ្ញាតទេ។',
      requiredValue: 'ត្រូវការ',
      optionalValue: 'ស្រេចចិត្ត',
    }
    : {
      supportedParameters: 'Supported Parameters',
      flag: 'Flag',
      type: 'Type',
      required: 'Required',
      description: 'Description',
      usageExamples: 'Usage examples',
      copy: 'Copy',
      copied: '✓ Copied!',
      passiveOnly: 'Passive sources only',
      passiveDesc: 'subfinder uses passive sources only by default. It does not send DNS queries directly to the target\'s authoritative nameservers.',
      cidrTitle: 'CIDR range limits',
      cidrDesc: 'CIDR ranges larger than /16 (65,536 hosts) are not permitted.',
      requiredValue: 'required',
      optionalValue: 'optional',
    };

  const toolData: Record<string, ToolDefinition> = {
    subfinder: {
      badge: 'recon',
      desc: isKhmer ? 'Passive subdomain enumeration tool ដែលស្វែងរកតាម public sources ដូចជា DNS resolvers, certificate transparency logs និង third-party APIs ដើម្បីរក subdomains ដោយមិនធ្វើអន្តរកម្មដោយផ្ទាល់ជាមួយ target។' : 'Passive subdomain enumeration tool that queries public sources including DNS resolvers, certificate transparency logs, and third-party APIs to discover subdomains without directly interacting with the target.',
      params: [
        { flag: '-d', type: 'string', req: true, desc: isKhmer ? 'Target domain សម្រាប់ enumerate subdomains' : 'Target domain to enumerate subdomains for' },
        { flag: '-dL', type: 'file', req: true, desc: isKhmer ? 'File ដែលមានបញ្ជី domains' : 'File containing a list of domains' },
        { flag: '-o', type: 'string', req: false, desc: isKhmer ? 'ឈ្មោះ output file' : 'Output filename' },
        { flag: '-oJ', type: 'bool', req: false, desc: isKhmer ? 'បង្ហាញលទ្ធផលជា JSON format' : 'Output results in JSON format' },
        { flag: '-silent', type: 'bool', req: false, desc: isKhmer ? 'លាក់ banner និង info messages' : 'Suppress banner and info messages' },
        { flag: '-t', type: 'int', req: false, desc: isKhmer ? 'ចំនួន concurrent goroutines' : 'Number of concurrent goroutines' },
        { flag: '-timeout', type: 'int', req: false, desc: isKhmer ? 'ចំនួនវិនាទីមុន timeout' : 'Seconds before timing out' },
        { flag: '-all', type: 'bool', req: false, desc: isKhmer ? 'ប្រើ passive sources ទាំងអស់ដែលមាន' : 'Use all available passive sources' },
      ],
      examples: [
        '# Basic single-domain enumeration\naof scan --project "Web App" subfinder -d example.com',
        '# Enumerate from a domain list, output as JSON\naof scan --project "Web App" subfinder -dL domains.txt -oJ',
        '# Use all sources, silent mode\naof scan --project "Web App" subfinder -d example.com -all -silent',
        '# Custom concurrency and timeout\naof scan --project "Web App" subfinder -d example.com -t 20 -timeout 60',
      ],
    },
    httpx: {
      badge: 'web',
      desc: isKhmer ? 'HTTP toolkit លឿនសម្រាប់ probing បញ្ជី URLs ឬ hosts។ វាត្រឡប់ status codes, response titles, server headers, TLS certificate metadata, redirect chains, content length និង web technology fingerprints។' : 'Fast HTTP toolkit for probing a list of URLs or hosts. Returns status codes, response titles, server headers, TLS certificate metadata, redirect chains, content length, and web technology fingerprints.',
      params: [
        { flag: '-u', type: 'string', req: true, desc: isKhmer ? 'Single target URL ឬ host សម្រាប់ probe' : 'Single target URL or host to probe' },
        { flag: '-l', type: 'file', req: true, desc: isKhmer ? 'File ដែលមានបញ្ជី URLs' : 'File containing list of URLs' },
        { flag: '-sc', type: 'bool', req: false, desc: isKhmer ? 'បង្ហាញ HTTP status codes' : 'Display HTTP status codes' },
        { flag: '-title', type: 'bool', req: false, desc: isKhmer ? 'ទាញយក និងបង្ហាញ HTML page title' : 'Extract and display HTML page title' },
        { flag: '-tech-detect', type: 'bool', req: false, desc: isKhmer ? 'រកឃើញ web technologies' : 'Detect web technologies' },
        { flag: '-tls-probe', type: 'bool', req: false, desc: isKhmer ? 'Probe TLS configuration' : 'Probe TLS configuration' },
        { flag: '-follow-redirects', type: 'bool', req: false, desc: isKhmer ? 'Follow HTTP redirects' : 'Follow HTTP redirects' },
        { flag: '-mc', type: 'int[]', req: false, desc: isKhmer ? 'ផ្គូផ្គងតែ status codes ដែលបានកំណត់' : 'Match only specific status codes' },
        { flag: '-threads', type: 'int', req: false, desc: isKhmer ? 'ចំនួន concurrent threads' : 'Number of concurrent threads' },
        { flag: '-json', type: 'bool', req: false, desc: isKhmer ? 'Output structured JSON' : 'Output structured JSON' },
      ],
      examples: [
        '# Probe a domain list\naof scan --project "Web App" httpx -l domains.txt -sc -title',
        '# Single target with tech detection\naof scan --project "Web App" httpx -u https://example.com -tech-detect -tls-probe',
        '# Filter to 200 and 403 responses\naof scan --project "Web App" httpx -l subdomains.txt -mc 200,403 -json',
        '# Follow redirects with higher threads\naof scan --project "Web App" httpx -l domains.txt -follow-redirects -threads 100',
      ],
    },
    naabu: {
      badge: 'network',
      desc: isKhmer ? 'High-speed port scanner ដែលបង្កើតសម្រាប់ reconnaissance workflows។ គាំទ្រ SYN, CONNECT និង UDP scan types លើ single hosts, IP ranges និង CIDR blocks។' : 'High-speed port scanner designed for reconnaissance workflows. Supports SYN, CONNECT, and UDP scan types across single hosts, IP ranges, and CIDR blocks.',
      params: [
        { flag: '-host', type: 'string', req: true, desc: isKhmer ? 'Target host, IP address ឬ CIDR range' : 'Target host, IP address, or CIDR range' },
        { flag: '-list', type: 'file', req: true, desc: isKhmer ? 'File ដែលមាន hosts ឬ IPs' : 'File containing hosts or IPs' },
        { flag: '-p', type: 'string', req: false, desc: isKhmer ? 'Ports ដែលត្រូវ scan' : 'Ports to scan' },
        { flag: '-top-ports', type: 'int', req: false, desc: isKhmer ? 'Scan top N common ports' : 'Scan top N common ports' },
        { flag: '-scan-type', type: 'enum', req: false, desc: isKhmer ? 'Scan method (s, c, u)' : 'Scan method (s, c, u)' },
        { flag: '-rate', type: 'int', req: false, desc: isKhmer ? 'Packets per second rate limit' : 'Packets per second rate limit' },
        { flag: '-timeout', type: 'int', req: false, desc: isKhmer ? 'Milliseconds ដែលរង់ចាំក្នុងមួយ port' : 'Milliseconds to wait per port' },
        { flag: '-exclude-ports', type: 'string', req: false, desc: isKhmer ? 'Ports ដែលត្រូវដកចេញ' : 'Ports to exclude' },
        { flag: '-json', type: 'bool', req: false, desc: isKhmer ? 'Output results ជា JSON format' : 'Output results in JSON format' },
      ],
      examples: [
        '# Scan specific ports\naof scan --project "Web App" naabu -host example.com -p 80,443,8080,8443',
        '# Scan top 1000 ports\naof scan --project "Web App" naabu -host 10.0.0.0/24 -top-ports 1000',
        '# Full port range with JSON\naof scan --project "Web App" naabu -list hosts.txt -p 1-65535 -json',
        '# Custom rate and excluded ports\naof scan --project "Web App" naabu -host example.com -rate 2000 -exclude-ports 22,23',
      ],
    },
    nuclei: {
      badge: 'web · vulns',
      desc: isKhmer ? 'Template-based vulnerability scanner សម្រាប់រក known CVEs, security misconfigurations, exposed admin panels, default credentials និង custom-defined security checks។' : 'Template-based vulnerability scanner used to detect known CVEs, security misconfigurations, exposed admin panels, default credentials, and custom-defined security checks.',
      params: [
        { flag: '-u', type: 'string', req: true, desc: isKhmer ? 'Single target URL សម្រាប់ scan' : 'Single target URL to scan' },
        { flag: '-l', type: 'file', req: true, desc: isKhmer ? 'File ដែលមាន URL មួយក្នុងមួយបន្ទាត់' : 'File with one URL per line' },
        { flag: '-t', type: 'string', req: false, desc: isKhmer ? 'Template category ឬ path' : 'Template category or path' },
        { flag: '-tags', type: 'string', req: false, desc: isKhmer ? 'Filter templates តាម tag' : 'Filter templates by tag' },
        { flag: '-severity', type: 'enum', req: false, desc: isKhmer ? 'Run តែ templates តាម severity ដែលបានកំណត់' : 'Run only specified severity templates' },
        { flag: '-exclude-tags', type: 'string', req: false, desc: isKhmer ? 'ដក tags ដែលបានកំណត់ចេញ' : 'Exclude specified tags' },
        { flag: '-rate-limit', type: 'int', req: false, desc: isKhmer ? 'Maximum requests per second' : 'Maximum requests per second' },
        { flag: '-timeout', type: 'int', req: false, desc: isKhmer ? 'ចំនួនវិនាទីមុន timeout' : 'Seconds before timeout' },
        { flag: '-json', type: 'bool', req: false, desc: isKhmer ? 'Emit JSONL output' : 'Emit JSONL output' },
      ],
      examples: [
        '# Scan with CVE templates only\naof scan --project "Web App" nuclei -u https://example.com -t cves',
        '# Run critical and high severity\naof scan --project "Web App" nuclei -l targets.txt -severity critical,high -json',
        '# Filter by technology tag\naof scan --project "Web App" nuclei -u https://example.com -tags wordpress,apache',
        '# Check for exposures and defaults\naof scan --project "Web App" nuclei -l targets.txt -t exposures,default-logins -rate-limit 100',
      ],
    },
    nmap: {
      badge: 'network · services',
      desc: isKhmer ? 'Network scanner ដែលមានមុខងារពេញលេញសម្រាប់ service detection, OS fingerprinting, version detection និង script-based vulnerability checks។ Output ជា XML format។' : 'Full-featured network scanner for service detection, OS fingerprinting, version detection, and script-based vulnerability checks. Outputs in XML format.',
      params: [
        { flag: '-host', type: 'string', req: true, desc: isKhmer ? 'Target host, IP ឬ CIDR range' : 'Target host, IP, or CIDR range' },
        { flag: '-p', type: 'string', req: false, desc: isKhmer ? 'Ports ដែលត្រូវ scan' : 'Ports to scan' },
        { flag: '-sV', type: 'bool', req: false, desc: isKhmer ? 'Service version detection' : 'Service version detection' },
        { flag: '-sC', type: 'bool', req: false, desc: isKhmer ? 'Run default NSE scripts' : 'Run default NSE scripts' },
        { flag: '-O', type: 'bool', req: false, desc: isKhmer ? 'OS detection' : 'OS detection' },
        { flag: '-T', type: 'int', req: false, desc: isKhmer ? 'Timing template (0-5)' : 'Timing template (0-5)' },
        { flag: '--top-ports', type: 'int', req: false, desc: isKhmer ? 'Scan top N ports' : 'Scan top N ports' },
      ],
      examples: [
        '# Service detection on common ports\naof scan --project "Web App" nmap -host example.com -sV -p 80,443,8080',
        '# Full scan with OS detection\naof scan --project "Web App" nmap -host 192.168.1.0/24 -sV -O -T4',
      ],
    },
    gobuster: {
      badge: 'web · enumeration',
      desc: isKhmer ? 'Directory និង file brute-forcing tool សម្រាប់រក hidden paths នៅលើ web servers។ ប្រើ wordlists ដើម្បីស្វែងរក directories, files និង subdomains។ Output ជា line-based stdout។' : 'Directory and file brute-forcing tool for discovering hidden paths on web servers. Uses wordlists to enumerate directories, files, and subdomains. Outputs line-based results to stdout.',
      params: [
        { flag: '-u', type: 'string', req: true, desc: isKhmer ? 'Target URL' : 'Target URL' },
        { flag: '-w', type: 'string', req: true, desc: isKhmer ? 'Wordlist path' : 'Wordlist path' },
        { flag: '-t', type: 'int', req: false, desc: isKhmer ? 'ចំនួន concurrent threads' : 'Number of concurrent threads' },
        { flag: '-x', type: 'string', req: false, desc: isKhmer ? 'File extensions ដែលត្រូវស្វែងរក' : 'File extensions to search for' },
        { flag: '-s', type: 'string', req: false, desc: isKhmer ? 'Status codes ដែលត្រូវបង្ហាញ' : 'Status codes to show' },
        { flag: '-b', type: 'string', req: false, desc: isKhmer ? 'Status codes ដែលត្រូវលាក់' : 'Status codes to hide' },
      ],
      examples: [
        '# Directory enumeration\naof scan --project "Web App" gobuster -u https://example.com -w common.txt',
        '# Search for specific file types\naof scan --project "Web App" gobuster -u https://example.com -w common.txt -x php,html,js -t 50',
      ],
    },
    gitleaks: {
      badge: 'secrets · SAST',
      desc: isKhmer ? 'Secret detection tool ដែលស្កេន source code repositories សម្រាប់រក secrets ដែលបានបញ្ចូលដោយចៃដន្យ ដូចជា API keys, tokens, passwords និង private keys។ Output ជា JSON array។' : 'Secret detection tool that scans source code repositories for accidentally committed secrets such as API keys, tokens, passwords, and private keys. Outputs a JSON array of findings.',
      params: [
        { flag: '--repo-url', type: 'string', req: true, desc: isKhmer ? 'Repository URL ដែលត្រូវ scan' : 'Repository URL to scan' },
        { flag: '--branch', type: 'string', req: false, desc: isKhmer ? 'Branch ជាក់លាក់ដែលត្រូវ scan' : 'Specific branch to scan' },
        { flag: '--depth', type: 'int', req: false, desc: isKhmer ? 'ចំនួន commits ដែលត្រូវ scan' : 'Number of commits to scan' },
        { flag: '--report-format', type: 'string', req: false, desc: isKhmer ? 'Output format (json, csv, sarif)' : 'Output format (json, csv, sarif)' },
      ],
      examples: [
        '# Scan a public repository\naof scan --project "Web App" gitleaks --repo-url https://github.com/org/repo',
        '# Scan specific branch with limited depth\naof scan --project "Web App" gitleaks --repo-url https://github.com/org/repo --branch main --depth 100',
      ],
    },
  };

  const data = toolData[toolName];

  return (
    <section id={toolName} className="mb-16 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#1A1714] dark:text-white">
        {toolName} <span className={`${monoTextClass} px-2 py-1 rounded bg-[#F0EDE6] dark:bg-white/5 text-[#88837B] dark:text-[#A1A1AA]`} style={monoFontStyle}>{data.badge}</span>
      </h2>
      <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-8 leading-relaxed`}>{data.desc}</p>

      {/* Parameters Table */}
      <div className="border border-[#E2DDD5] dark:border-white/10 rounded-lg overflow-hidden mb-8">
        <div className="bg-[#F0EDE6] dark:bg-white/5 px-6 py-3 border-b border-[#E2DDD5] dark:border-white/10">
          <div className="font-bold text-sm tracking-widest uppercase text-[#00BCA1]">
            <Settings size={14} className="inline-block align-[-2px]" /> {labels.supportedParameters}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className={`w-max min-w-full ${bodyTextClass}`}>
            <thead className="bg-[#F0EDE6] dark:bg-white/5">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{labels.flag}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{labels.type}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{labels.required}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{labels.description}</th>
              </tr>
            </thead>
            <tbody>
              {data.params.map((param: ToolParam, idx: number) => (
                <tr key={idx} className="border-t border-[#E2DDD5] dark:border-white/10 hover:bg-[#EAE6DE] dark:hover:bg-white/5 transition-colors">
                  <td className={`px-4 py-3 ${monoTextClass} text-[#1A1714] dark:text-white whitespace-nowrap`} style={monoFontStyle}>{param.flag}</td>
                  <td className={`px-4 py-3 ${monoTextClass} text-[#88837B] dark:text-[#A1A1AA] whitespace-nowrap`} style={monoFontStyle}>{param.type}</td>
                  <td className={`px-4 py-3 ${monoTextClass} ${param.req ? 'text-red-500' : 'text-[#88837B] dark:text-[#A1A1AA]'} whitespace-nowrap`} style={monoFontStyle}>
                    {param.req ? labels.requiredValue : labels.optionalValue}
                  </td>
                  <td className={`px-4 py-3 ${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] whitespace-nowrap`}>{param.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Examples */}
      <h3 className="text-[1.4rem] md:text-[1.6rem] font-bold mb-4 text-[#1A1714] dark:text-white">{labels.usageExamples}</h3>
      <div className="border border-white/5 rounded-lg overflow-hidden mb-8 bg-[#16181F]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#16181F]">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`${monoTextClass} text-white/25 ml-2`} style={monoFontStyle}>{toolName} - examples</span>
          </div>
          <button
            onClick={() => onCopy(data.examples.join('\n\n'), toolName)}
            className={`${monoTextClass} text-white/30 hover:text-white/75 transition-colors flex items-center gap-2`}
            style={monoFontStyle}
          >
            {copiedCode === toolName ? labels.copied : labels.copy}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className={`${monoTextClass} text-white/55 leading-relaxed`} style={monoFontStyle}>
            {data.examples.map((ex: string, idx: number) => (
              <div key={idx} className="mb-4">{ex}</div>
            ))}
          </code>
        </pre>
      </div>

      {/* Callouts */}
      {toolName === 'subfinder' && (
        <div className="flex gap-4 p-4 rounded-lg border-l-4 border-yellow-500 mb-8 bg-[rgba(184,104,0,0.03)] dark:bg-white/5">
          <AlertTriangle size={20} className="shrink-0" />
          <div>
            <div className="font-semibold text-xs uppercase tracking-wide text-yellow-600 mb-2">{labels.passiveOnly}</div>
            <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4]`}>{labels.passiveDesc}</p>
          </div>
        </div>
      )}
      {toolName === 'naabu' && (
        <div className="flex gap-4 p-4 rounded-lg border-l-4 border-red-500 mb-8 bg-[rgba(196,40,40,0.03)] dark:bg-white/5">
          <Siren size={20} className="shrink-0" />
          <div>
            <div className="font-semibold text-xs uppercase tracking-wide text-red-600 mb-2">{labels.cidrTitle}</div>
            <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4]`}>{labels.cidrDesc}</p>
          </div>
        </div>
      )}
    </section>
  );
};

const ErrorReference: React.FC = () => {
  const locale = useLocale();
  const isKhmer = locale === 'kh';
  const bodyTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoTextClass = 'text-[16px] md:text-[18px] lg:text-[20px]';
  const monoFontStyle = {
    fontFamily: 'var(--docs-mono-font), monospace',
  } as const;
  const copy = isKhmer
    ? {
      title: 'Error Reference',
      intro:
        'CLI បង្ហាញ structured error codes សម្រាប់ failure modes ទាំងអស់។ Backend errors មានទាំង machine-readable code និង human-readable message ដើម្បីឲ្យងាយតាមដាន។',
      code: 'Code',
      http: 'HTTP',
      meaning: 'អត្ថន័យ',
      resolution: 'ដំណោះស្រាយ',
      rows: [
        {
          code: 'ERR_INVALID_PARAM',
          http: '400',
          meaning: 'Flag ដែលត្រូវការ បាត់ ឬ format មិនត្រឹមត្រូវ',
          resolution: 'ពិនិត្យ syntax របស់ flag ឡើងវិញ',
        },
        {
          code: 'ERR_UNSUPPORTED_FLAG',
          http: '400',
          meaning: 'Flag មិនមាននៅក្នុង parameter schema ដែលអនុញ្ញាត',
          resolution: 'ដក flags ដែលមិនគាំទ្រចេញ',
        },
        {
          code: 'ERR_AUTH_FAILED',
          http: '401',
          meaning: 'API token បាត់ ឬមិនត្រឹមត្រូវ',
          resolution: 'រត់ aof login ម្តងទៀត',
        },
        {
          code: 'ERR_QUOTA_EXCEEDED',
          http: '429',
          meaning: 'Daily quota ឬ job limit លើសកំណត់',
          resolution: 'រង់ចាំ reset ឬ upgrade plan',
        },
        {
          code: 'ERR_TARGET_LIMIT',
          http: '422',
          meaning: 'Input លើសចំនួន targets អតិបរមាក្នុងមួយ job',
          resolution: 'បំបែក target list ជាច្រើន job',
        },
      ],
    }
    : {
      title: 'Error Reference',
      intro:
        'The CLI surfaces structured error codes for all failure modes. Backend errors include a machine-readable code and a human-readable message.',
      code: 'Code',
      http: 'HTTP',
      meaning: 'Meaning',
      resolution: 'Resolution',
      rows: [
        {
          code: 'ERR_INVALID_PARAM',
          http: '400',
          meaning: 'A required flag is missing or invalid format',
          resolution: 'Check flag syntax',
        },
        {
          code: 'ERR_UNSUPPORTED_FLAG',
          http: '400',
          meaning: 'Flag not in allowed parameter schema',
          resolution: 'Remove unsupported flags',
        },
        {
          code: 'ERR_AUTH_FAILED',
          http: '401',
          meaning: 'API token is missing or invalid',
          resolution: 'Run aof login',
        },
        {
          code: 'ERR_QUOTA_EXCEEDED',
          http: '429',
          meaning: 'Daily quota or job limit exceeded',
          resolution: 'Wait for reset or upgrade',
        },
        {
          code: 'ERR_TARGET_LIMIT',
          http: '422',
          meaning: 'Input exceeds max targets per job',
          resolution: 'Split target list',
        },
      ],
    };
  return (
    <section id="errors" className="mb-16 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1A1714] dark:text-white">{copy.title}</h2>
      <p className={`${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] mb-8`}>
        {copy.intro}
      </p>

      <div className="border border-[#E2DDD5] dark:border-white/10 rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className={`w-max min-w-full ${bodyTextClass}`}>
            <thead className="bg-[#F0EDE6] dark:bg-white/5">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{copy.code}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{copy.http}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{copy.meaning}</th>
                <th className="px-4 py-2 text-left font-bold text-xs uppercase tracking-wider text-[#88837B] dark:text-[#A1A1AA]">{copy.resolution}</th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((err, idx) => (
                <tr key={idx} className="border-t border-[#E2DDD5] dark:border-white/10 hover:bg-[#EAE6DE] dark:hover:bg-white/5 transition-colors">
                  <td className={`px-4 py-3 ${monoTextClass} text-[#00BCA1] font-semibold whitespace-nowrap`} style={monoFontStyle}>{err.code}</td>
                  <td className={`px-4 py-3 ${monoTextClass} ${
                    err.http.startsWith('401') || err.http.startsWith('403') || err.http.startsWith('404') || err.http.startsWith('422') || err.http.startsWith('5') 
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400'
                  } font-semibold whitespace-nowrap`} style={monoFontStyle}>{err.http}</td>
                  <td className={`px-4 py-3 ${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] whitespace-nowrap`}>{err.meaning}</td>
                  <td className={`px-4 py-3 ${bodyTextClass} text-[#4A4540] dark:text-[#C9CDD4] whitespace-nowrap`}>{err.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
