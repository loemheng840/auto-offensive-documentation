"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import {
    ChevronRight,
    Search,
    Rocket,
    Radar,
    Brain,
    Code2,
    FileText,
    BarChart3,
    TerminalSquare,
    BookOpen,
    GitBranch,
    Blocks,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface TocItem {
    id: string;
    labelEn: string;
    labelKh?: string;
}

interface DocsLayoutProps {
    children: React.ReactNode;
}

/* ─────────────────────────────────────────────
   Per-route TOC + section registry
   Keyed by pathname (without basePath)
───────────────────────────────────────────── */
interface RouteData {
    sectionIds: string[];
    tocEn: TocItem[];
    tocKh: TocItem[];
}

const ROUTE_DATA: Record<string, RouteData> = {
    "/getting-started": {
        sectionIds: ["what-is-aof", "core-concepts", "install", "first-scan", "view-results", "next-steps"],
        tocEn: [
            { id: "what-is-aof", labelEn: "What is Auto-Offensive?" },
            { id: "core-concepts", labelEn: "Core Concepts" },
            { id: "install", labelEn: "Install the CLI" },
            { id: "first-scan", labelEn: "Run your first scan" },
            { id: "view-results", labelEn: "View results" },
            { id: "next-steps", labelEn: "Next steps" },
        ],
        tocKh: [
            { id: "what-is-aof", labelEn: "What is Auto-Offensive?", labelKh: "Auto-Offensive ជាអ្វី?" },
            { id: "core-concepts", labelEn: "Core Concepts", labelKh: "គោលគំនិតស្នូល" },
            { id: "install", labelEn: "Install the CLI", labelKh: "ដំឡើង CLI" },
            { id: "first-scan", labelEn: "Run your first scan", labelKh: "ដំណើរការ scan ដំបូង" },
            { id: "view-results", labelEn: "View results", labelKh: "មើលលទ្ធផល" },
            { id: "next-steps", labelEn: "Next steps", labelKh: "ជំហានបន្ទាប់" },
        ],
    },
    "/scanning": {
        sectionIds: ["overview", "basic-scan", "medium-scan", "advanced-scan", "tools", "queue", "streaming"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "basic-scan", labelEn: "Basic scan" },
            { id: "medium-scan", labelEn: "Medium scan" },
            { id: "advanced-scan", labelEn: "Advanced pipeline scan" },
            { id: "tools", labelEn: "Supported tools" },
            { id: "queue", labelEn: "Queue & lifecycle" },
            { id: "streaming", labelEn: "Real-time streaming" },
        ],
        tocKh: [
            { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "basic-scan", labelEn: "Basic scan", labelKh: "Basic scan" },
            { id: "medium-scan", labelEn: "Medium scan", labelKh: "Medium scan" },
            { id: "advanced-scan", labelEn: "Advanced pipeline scan", labelKh: "Advanced pipeline scan" },
            { id: "tools", labelEn: "Supported tools", labelKh: "Tools ដែលគាំទ្រ" },
            { id: "queue", labelEn: "Queue & lifecycle", labelKh: "Queue និង lifecycle" },
            { id: "streaming", labelEn: "Real-time streaming", labelKh: "Real-time streaming" },
        ],
    },
    "/ai-analysis": {
        sectionIds: ["overview", "modes", "next-steps", "deep-analysis", "mcp-tools", "models-cost", "feedback"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "modes", labelEn: "Suggestion modes" },
            { id: "next-steps", labelEn: "Next steps mode" },
            { id: "deep-analysis", labelEn: "Deep analysis mode" },
            { id: "mcp-tools", labelEn: "MCP tools" },
            { id: "models-cost", labelEn: "Models & cost" },
            { id: "feedback", labelEn: "Feedback loop" },
        ],
        tocKh: [
            { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "modes", labelEn: "Suggestion modes", labelKh: "Modes" },
            { id: "next-steps", labelEn: "Next steps mode", labelKh: "Next steps mode" },
            { id: "deep-analysis", labelEn: "Deep analysis mode", labelKh: "Deep analysis mode" },
            { id: "mcp-tools", labelEn: "MCP tools", labelKh: "MCP tools" },
            { id: "models-cost", labelEn: "Models & cost", labelKh: "Models និងតម្លៃ" },
            { id: "feedback", labelEn: "Feedback loop", labelKh: "Feedback loop" },
        ],
    },
    "/code-scanning": {
        sectionIds: ["overview", "git-integration", "trigger-scan", "issues", "hotspots", "dependencies", "quality-gates"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "git-integration", labelEn: "Git integration" },
            { id: "trigger-scan", labelEn: "Trigger a code scan" },
            { id: "issues", labelEn: "Issues & severity" },
            { id: "hotspots", labelEn: "Security hotspots" },
            { id: "dependencies", labelEn: "Dependency vulns" },
            { id: "quality-gates", labelEn: "Quality gates" },
        ],
        tocKh: [
            { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "git-integration", labelEn: "Git integration", labelKh: "Git integration" },
            { id: "trigger-scan", labelEn: "Trigger a code scan", labelKh: "បើក code scan" },
            { id: "issues", labelEn: "Issues & severity", labelKh: "Issues និង severity" },
            { id: "hotspots", labelEn: "Security hotspots", labelKh: "Security hotspots" },
            { id: "dependencies", labelEn: "Dependency vulns", labelKh: "Dependency vulnerabilities" },
            { id: "quality-gates", labelEn: "Quality gates", labelKh: "Quality gates" },
        ],
    },
    "/reports": {
        sectionIds: ["overview", "generate", "formats", "templates", "scope", "manage"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "generate", labelEn: "Generate a report" },
            { id: "formats", labelEn: "Export formats" },
            { id: "templates", labelEn: "Templates & branding" },
            { id: "scope", labelEn: "Scope & filtering" },
            { id: "manage", labelEn: "Manage reports" },
        ],
        tocKh: [
            { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "generate", labelEn: "Generate a report", labelKh: "បង្កើត report" },
            { id: "formats", labelEn: "Export formats", labelKh: "Export formats" },
            { id: "templates", labelEn: "Templates & branding", labelKh: "Templates និង branding" },
            { id: "scope", labelEn: "Scope & filtering", labelKh: "Scope និង filtering" },
            { id: "manage", labelEn: "Manage reports", labelKh: "គ្រប់គ្រង reports" },
        ],
    },
    "/dashboard": {
        sectionIds: ["overview", "metrics", "vulnerability-trends", "asset-discovery", "risk-scoring", "top-charts"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "metrics", labelEn: "Key metrics" },
            { id: "vulnerability-trends", labelEn: "Vulnerability trends" },
            { id: "asset-discovery", labelEn: "Asset discovery" },
            { id: "risk-scoring", labelEn: "Risk scoring" },
            { id: "top-charts", labelEn: "Top ports & services" },
        ],
        tocKh: [
            { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "metrics", labelEn: "Key metrics", labelKh: "Key metrics" },
            { id: "vulnerability-trends", labelEn: "Vulnerability trends", labelKh: "Vulnerability trends" },
            { id: "asset-discovery", labelEn: "Asset discovery", labelKh: "Asset discovery" },
            { id: "risk-scoring", labelEn: "Risk scoring", labelKh: "Risk scoring" },
            { id: "top-charts", labelEn: "Top ports & services", labelKh: "Top ports និង services" },
        ],
    },
    "/cli": {
        sectionIds: ["installation", "auth", "commands", "tools", "execution", "streaming", "results", "jobs", "security", "concept"],
        tocEn: [
            { id: "installation", labelEn: "Installation & Setup" },
            { id: "auth", labelEn: "Authentication" },
            { id: "commands", labelEn: "Command Execution" },
            { id: "tools", labelEn: "Supported Tools" },
            { id: "execution", labelEn: "Remote Execution Model" },
            { id: "streaming", labelEn: "Output Streaming" },
            { id: "results", labelEn: "Result Handling" },
            { id: "jobs", labelEn: "Job Lifecycle" },
            { id: "security", labelEn: "Security & Access Control" },
            { id: "concept", labelEn: "How It Works" },
        ],
        tocKh: [
            { id: "installation", labelEn: "ការដំឡើង និង Setup" },
            { id: "auth", labelEn: "Authentication" },
            { id: "commands", labelEn: "ការប្រើ Commands" },
            { id: "tools", labelEn: "Tools ដែលគាំទ្រ" },
            { id: "execution", labelEn: "Remote Execution Model" },
            { id: "streaming", labelEn: "Output Streaming" },
            { id: "results", labelEn: "ការគ្រប់គ្រង Results" },
            { id: "jobs", labelEn: "Job Lifecycle" },
            { id: "security", labelEn: "Security និង Access Control" },
            { id: "concept", labelEn: "របៀបដំណើរការ" },
        ],
    },

    "/ci-cd": {
        sectionIds: ["overview", "workflow", "auth", "endpoints", "trigger", "status", "results", "report", "pipeline", "thresholds", "access"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "workflow", labelEn: "CI/CD Workflow" },
            { id: "auth", labelEn: "Authentication" },
            { id: "endpoints", labelEn: "API Endpoints" },
            { id: "trigger", labelEn: "Triggering a Scan" },
            { id: "status", labelEn: "Job Status" },
            { id: "results", labelEn: "Result Retrieval" },
            { id: "report", labelEn: "Report Download" },
            { id: "pipeline", labelEn: "Pipeline Example" },
            { id: "thresholds", labelEn: "Severity Thresholds" },
            { id: "access", labelEn: "Access Scoping" },
        ],
        tocKh: [
            { id: "overview", labelEn: "ទិដ្ឋភាពទូទៅ" },
            { id: "workflow", labelEn: "លំហូរ CI/CD" },
            { id: "auth", labelEn: "Authentication" },
            { id: "endpoints", labelEn: "API Endpoints" },
            { id: "trigger", labelEn: "ការបើកការស្កេន" },
            { id: "status", labelEn: "ស្ថានភាព Job" },
            { id: "results", labelEn: "ទាញយកលទ្ធផល" },
            { id: "report", labelEn: "ទាញយក Report" },
            { id: "pipeline", labelEn: "ឧទាហរណ៍ Pipeline" },
            { id: "thresholds", labelEn: "Severity Thresholds" },
            { id: "access", labelEn: "Access Scoping" },
        ],
    },
    "/tools": {
        sectionIds: ["overview", "versions", "limits", "output", "subfinder", "httpx", "naabu", "nuclei", "errors"],
        tocEn: [
            { id: "overview", labelEn: "Overview" },
            { id: "versions", labelEn: "Versions & Status" },
            { id: "limits", labelEn: "Rate Limits" },
            { id: "output", labelEn: "Output Formats" },
            { id: "subfinder", labelEn: "subfinder" },
            { id: "httpx", labelEn: "httpx" },
            { id: "naabu", labelEn: "naabu" },
            { id: "nuclei", labelEn: "nuclei" },
            { id: "errors", labelEn: "Error Reference" },
        ],
        tocKh: [
            { id: "overview", labelEn: "ទិដ្ឋភាពទូទៅ" },
            { id: "versions", labelEn: "Versions & Status" },
            { id: "limits", labelEn: "Rate Limits" },
            { id: "output", labelEn: "Output Formats" },
            { id: "subfinder", labelEn: "subfinder" },
            { id: "httpx", labelEn: "httpx" },
            { id: "naabu", labelEn: "naabu" },
            { id: "nuclei", labelEn: "nuclei" },
            { id: "errors", labelEn: "Error Reference" },
        ],
    },
    "/quickstart": {
        sectionIds: ["install", "login", "project", "scan", "findings", "troubleshooting", "next-steps"],
        tocEn: [
            { id: "install", labelEn: "Step 1: Install" },
            { id: "login", labelEn: "Step 2: Log in" },
            { id: "project", labelEn: "Step 3: Create a project" },
            { id: "scan", labelEn: "Step 4: Run your first scan" },
            { id: "findings", labelEn: "Step 5: View findings" },
            { id: "troubleshooting", labelEn: "Common issue: Login fails" },
            { id: "next-steps", labelEn: "Next steps" },
        ],
        tocKh: [
            { id: "install", labelEn: "ជំហាន ១៖ ដំឡើង" },
            { id: "login", labelEn: "ជំហាន ២៖ ចូល" },
            { id: "project", labelEn: "ជំហាន ៣៖ បង្កើត project" },
            { id: "scan", labelEn: "ជំហាន ៤៖ ដំណើរការ scan" },
            { id: "findings", labelEn: "ជំហាន ៥៖ មើល findings" },
            { id: "troubleshooting", labelEn: "ការដោះស្រាយបញ្ហា" },
            { id: "next-steps", labelEn: "ជំហានបន្ទាប់" },
        ],
    },

    "/concepts": {
        sectionIds: ["project", "target", "scan", "step", "finding", "pipeline", "api-key", "mental-model"],
        tocEn: [
            { id: "project", labelEn: "Project" },
            { id: "target", labelEn: "Target" },
            { id: "scan", labelEn: "Scan / Job" },
            { id: "step", labelEn: "Step" },
            { id: "finding", labelEn: "Finding" },
            { id: "pipeline", labelEn: "Pipeline" },
            { id: "api-key", labelEn: "API Key" },
            { id: "mental-model", labelEn: "Quick mental model" },
        ],
        tocKh: [
            { id: "project", labelEn: "Project" },
            { id: "target", labelEn: "Target" },
            { id: "scan", labelEn: "Scan / Job" },
            { id: "step", labelEn: "Step" },
            { id: "finding", labelEn: "Finding" },
            { id: "pipeline", labelEn: "Pipeline" },
            { id: "api-key", labelEn: "API Key" },
            { id: "mental-model", labelEn: "ទិដ្ឋភាពសរុបក្នុងគំនិត" },
        ],
    },
    "/api": {
        sectionIds: ["overview-detail", "auth", "ratelimit", "errors", "projects", "scans", "results", "reports", "issues", "ai-analysis", "webhooks"],
        tocEn: [
            { id: "overview-detail", labelEn: "Overview" },
            { id: "auth", labelEn: "Authentication" },
            { id: "ratelimit", labelEn: "Rate Limits" },
            { id: "errors", labelEn: "Error Codes" },
            { id: "projects", labelEn: "Projects" },
            { id: "scans", labelEn: "Scan Jobs" },
            { id: "results", labelEn: "Results" },
            { id: "reports", labelEn: "Reports" },
            { id: "issues", labelEn: "Issues" },
            { id: "ai-analysis", labelEn: "AI Analysis" },
            { id: "webhooks", labelEn: "Webhooks" },
        ],
        tocKh: [
            { id: "overview-detail", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
            { id: "auth", labelEn: "Authentication", labelKh: "Authentication" },
            { id: "ratelimit", labelEn: "Rate Limits", labelKh: "Rate Limits" },
            { id: "errors", labelEn: "Error Codes", labelKh: "Error Codes" },
            { id: "projects", labelEn: "Projects", labelKh: "Projects" },
            { id: "scans", labelEn: "Scan Jobs", labelKh: "Scan Jobs" },
            { id: "results", labelEn: "Results", labelKh: "Results" },
            { id: "reports", labelEn: "Reports", labelKh: "Reports" },
            { id: "issues", labelEn: "Issues", labelKh: "Issues" },
            { id: "ai-analysis", labelEn: "AI Analysis", labelKh: "AI Analysis" },
            { id: "webhooks", labelEn: "Webhooks", labelKh: "Webhooks" },
        ],
    },
};

/* ─────────────────────────────────────────────
   Global nav definition
   Left sidebar: groups + pages + sub-section anchors
───────────────────────────────────────────── */
interface NavItem {
    id: string;
    labelEn: string;
    labelKh: string;
}

interface NavPage {
    id: string;
    labelEn: string;
    labelKh: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    items?: NavItem[];
}

interface NavGroup {
    id: string;
    labelEn: string;
    labelKh: string;
    pages: NavPage[];
}

const NAV: NavGroup[] = [
    {
        id: "introduction",
        labelEn: "Introduction",
        labelKh: "សេចក្តីផ្តើម",
        pages: [
            {
                id: "getting-started",
                labelEn: "Getting Started",
                labelKh: "ការចាប់ផ្តើម",
                href: "/getting-started",
                icon: Rocket,
                items: [
                    { id: "what-is-aof", labelEn: "What is Auto-Offensive?", labelKh: "Auto-Offensive ជាអ្វី?" },
                    { id: "core-concepts", labelEn: "Core Concepts", labelKh: "គោលគំនិតស្នូល" },
                    { id: "install", labelEn: "Install the CLI", labelKh: "ដំឡើង CLI" },
                    { id: "first-scan", labelEn: "Run your first scan", labelKh: "ដំណើរការ scan ដំបូង" },
                    { id: "view-results", labelEn: "View results", labelKh: "មើលលទ្ធផល" },
                    { id: "next-steps", labelEn: "Next steps", labelKh: "ជំហានបន្ទាប់" },
                ],
            },
        ],
    },
    {
        id: "platform-features",
        labelEn: "Platform Features",
        labelKh: "មុខងារផ្លេតហ្វម",
        pages: [
            {
                id: "scanning",
                labelEn: "Scanning",
                labelKh: "ការស្កេន",
                href: "/scanning",
                icon: Radar,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "basic-scan", labelEn: "Basic scan", labelKh: "Basic scan" },
                    { id: "medium-scan", labelEn: "Medium scan", labelKh: "Medium scan" },
                    { id: "advanced-scan", labelEn: "Advanced pipeline scan", labelKh: "Advanced pipeline scan" },
                    { id: "tools", labelEn: "Supported tools", labelKh: "Tools ដែលគាំទ្រ" },
                    { id: "queue", labelEn: "Queue & lifecycle", labelKh: "Queue និង lifecycle" },
                    { id: "streaming", labelEn: "Real-time streaming", labelKh: "Real-time streaming" },
                ],
            },
            {
                id: "ai-analysis",
                labelEn: "AI Analysis",
                labelKh: "ការវិភាគ AI",
                href: "/ai-analysis",
                icon: Brain,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "modes", labelEn: "Suggestion modes", labelKh: "Modes នៃការវិភាគ" },
                    { id: "next-steps", labelEn: "Next steps mode", labelKh: "Next steps mode" },
                    { id: "deep-analysis", labelEn: "Deep analysis mode", labelKh: "Deep analysis mode" },
                    { id: "mcp-tools", labelEn: "MCP tools", labelKh: "MCP tools" },
                    { id: "models-cost", labelEn: "Models & cost", labelKh: "Models និងតម្លៃ" },
                    { id: "feedback", labelEn: "Feedback loop", labelKh: "Feedback loop" },
                ],
            },
            {
                id: "code-scanning",
                labelEn: "Code Scanning (SAST)",
                labelKh: "Code Scanning (SAST)",
                href: "/code-scanning",
                icon: Code2,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "git-integration", labelEn: "Git integration", labelKh: "Git integration" },
                    { id: "trigger-scan", labelEn: "Trigger a code scan", labelKh: "បើក code scan" },
                    { id: "issues", labelEn: "Issues & severity", labelKh: "Issues និង severity" },
                    { id: "hotspots", labelEn: "Security hotspots", labelKh: "Security hotspots" },
                    { id: "dependencies", labelEn: "Dependency vulns", labelKh: "Dependency vulnerabilities" },
                    { id: "quality-gates", labelEn: "Quality gates", labelKh: "Quality gates" },
                ],
            },
            {
                id: "reports",
                labelEn: "Reports",
                labelKh: "របាយការណ៍",
                href: "/reports",
                icon: FileText,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "generate", labelEn: "Generate a report", labelKh: "បង្កើត report" },
                    { id: "formats", labelEn: "Export formats", labelKh: "Export formats" },
                    { id: "templates", labelEn: "Templates & branding", labelKh: "Templates និង branding" },
                    { id: "scope", labelEn: "Scope & filtering", labelKh: "Scope និង filtering" },
                    { id: "manage", labelEn: "Manage reports", labelKh: "គ្រប់គ្រង reports" },
                ],
            },
            {
                id: "dashboard",
                labelEn: "Dashboard & Analytics",
                labelKh: "Dashboard និង Analytics",
                href: "/dashboard",
                icon: BarChart3,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "metrics", labelEn: "Key metrics", labelKh: "Key metrics" },
                    { id: "vulnerability-trends", labelEn: "Vulnerability trends", labelKh: "Vulnerability trends" },
                    { id: "asset-discovery", labelEn: "Asset discovery", labelKh: "Asset discovery" },
                    { id: "risk-scoring", labelEn: "Risk scoring", labelKh: "Risk scoring" },
                    { id: "top-charts", labelEn: "Top ports & services", labelKh: "Top ports និង services" },
                ],
            },
        ],
    },
    {
        id: "developer-reference",
        labelEn: "Developer Reference",
        labelKh: "Developer Reference",
        pages: [
            {
                id: "api",
                labelEn: "REST API",
                labelKh: "REST API",
                href: "/api",
                icon: Blocks,
                items: [
                    { id: "overview-detail", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "auth", labelEn: "Authentication", labelKh: "Authentication" },
                    { id: "ratelimit", labelEn: "Rate Limits", labelKh: "Rate Limits" },
                    { id: "errors", labelEn: "Error Codes", labelKh: "Error Codes" },
                    { id: "projects", labelEn: "Projects", labelKh: "Projects" },
                    { id: "scans", labelEn: "Scan Jobs", labelKh: "Scan Jobs" },
                    { id: "results", labelEn: "Results", labelKh: "Results" },
                    { id: "reports", labelEn: "Reports", labelKh: "Reports" },
                    { id: "issues", labelEn: "Issues", labelKh: "Issues" },
                    { id: "ai-analysis", labelEn: "AI Analysis", labelKh: "AI Analysis" },
                    { id: "webhooks", labelEn: "Webhooks", labelKh: "Webhooks" },
                ],
            },
            {
                id: "cli",
                labelEn: "CLI Reference",
                labelKh: "ឯកសារ CLI",
                href: "/cli",
                icon: TerminalSquare,
                items: [
                    { id: "installation", labelEn: "Installation", labelKh: "ការដំឡើង" },
                    { id: "auth", labelEn: "Authentication", labelKh: "Authentication" },
                    { id: "commands", labelEn: "Commands", labelKh: "Commands" },
                    { id: "tui", labelEn: "Interactive TUI", labelKh: "Interactive TUI" },
                    { id: "execution", labelEn: "Execution model", labelKh: "Execution model" },
                    { id: "streaming", labelEn: "Output streaming", labelKh: "Output streaming" },
                    { id: "jobs", labelEn: "Job lifecycle", labelKh: "Job lifecycle" },
                    { id: "security", labelEn: "Security", labelKh: "Security" },
                    { id: "env-vars", labelEn: "Environment variables", labelKh: "Environment variables" },
                ],
            },

            {
                id: "ci-cd",
                labelEn: "CI/CD Integration",
                labelKh: "ការរួមបញ្ចូល CI/CD",
                href: "/ci-cd",
                icon: GitBranch,
                items: [
                    { id: "overview", labelEn: "Overview", labelKh: "ទិដ្ឋភាពទូទៅ" },
                    { id: "workflow", labelEn: "Integration workflow", labelKh: "Integration workflow" },
                    { id: "auth", labelEn: "API key auth", labelKh: "API key auth" },
                    { id: "endpoints", labelEn: "API endpoints", labelKh: "API endpoints" },
                    { id: "trigger", labelEn: "Trigger scan", labelKh: "បើក scan" },
                    { id: "status", labelEn: "Job status", labelKh: "Job status" },
                    { id: "results", labelEn: "Result retrieval", labelKh: "Result retrieval" },
                    { id: "pipeline", labelEn: "Pipeline example", labelKh: "Pipeline example" },
                    { id: "thresholds", labelEn: "Severity gates", labelKh: "Severity gates" },
                    { id: "quotas", labelEn: "Quotas & rate limits", labelKh: "Quotas និង rate limits" },
                    { id: "errors", labelEn: "Error handling", labelKh: "Error handling" },
                ],
            },
        ],
    },
];

/* Flatten NAV for active page resolution */
const ALL_PAGES: NavPage[] = NAV.flatMap((g) => g.pages);

/* ─────────────────────────────────────────────
   Left Sidebar
───────────────────────────────────────────── */
function LeftSidebar({
    activeSectionId,
    isKhmer,
}: {
    activeSectionId: string;
    isKhmer: boolean;
}) {
    const pathname = usePathname();

    // Find which page is active
    const activePage = ALL_PAGES.find((p) => {
        if (p.href === "/api") return pathname === "/api" || (pathname.startsWith("/api/") && pathname !== "/api/recipes");
        return pathname === p.href || pathname.startsWith(p.href + "/");
    });

    const fontStyle = {
        fontFamily: isKhmer
            ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
            : "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
    } as const;

    return (
        <aside
            className="hidden lg:flex flex-col w-72 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-[#E2DDD5] dark:border-white/10 bg-[#F7F5F0] dark:bg-[#09090B]"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#E2DDD5 transparent" }}
        >
            <nav className="py-6 px-4" style={fontStyle}>
                {NAV.map((group) => (
                    <div key={group.id} className="mb-6">
                        <p className="px-3 mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#88837B] dark:text-[#9CA3AF]">
                            {isKhmer ? group.labelKh : group.labelEn}
                        </p>
                        {group.pages.map((page) => {
                            const isActive = activePage?.id === page.id;
                            const Icon = page.icon;
                            return (
                                <div key={page.id} className="mb-0.5">
                                    <Link
                                        href={page.href}
                                        className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[14.5px] font-medium transition-colors duration-150 ${isActive
                                            ? "bg-[#00BCA1]/10 text-[#00BCA1]"
                                            : "text-[#4A4540] dark:text-[#C9CDD4] hover:bg-[#EEEAE2] dark:hover:bg-white/5 hover:text-[#1A1714] dark:hover:text-white"
                                            }`}
                                    >
                                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                                        <span className="flex-1 truncate">{isKhmer ? page.labelKh : page.labelEn}</span>
                                        {isActive && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />}
                                    </Link>
                                    {/* Show sub-items only for the active page */}
                                    {isActive && page.items && page.items.length > 0 && (
                                        <div className="ml-7 mt-1 mb-2 flex flex-col border-l border-[#E2DDD5] dark:border-white/10">
                                            {page.items.map((item) => {
                                                const isItemActive = item.id === activeSectionId;
                                                return (
                                                    <a
                                                        key={item.id}
                                                        href={`#${item.id}`}
                                                        className={`block py-1 pl-3 -ml-px border-l-2 text-[13px] leading-[1.5] transition-colors duration-150 ${isItemActive
                                                            ? "border-l-[#00BCA1] text-[#00BCA1] font-medium"
                                                            : "border-l-transparent text-[#88837B] dark:text-[#A1A1AA] hover:text-[#1A1714] dark:hover:text-white"
                                                            }`}
                                                    >
                                                        {isKhmer ? item.labelKh : item.labelEn}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

/* ─────────────────────────────────────────────
   Right Sidebar (On this page TOC)
───────────────────────────────────────────── */
function RightSidebar({
    toc,
    activeSectionId,
    isKhmer,
}: {
    toc: TocItem[];
    activeSectionId: string;
    isKhmer: boolean;
}) {
    const [query, setQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    const fontStyle = {
        fontFamily: isKhmer
            ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
            : "var(--font-google-sans), var(--font-noto-khmer), sans-serif",
    } as const;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchRef.current?.focus();
                searchRef.current?.select();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    if (toc.length === 0) return null;

    const filteredToc = query.trim()
        ? toc.filter((item) => {
            const label = (isKhmer && item.labelKh ? item.labelKh : item.labelEn).toLowerCase();
            return label.includes(query.trim().toLowerCase());
        })
        : toc;

    return (
        <aside
            className="hidden xl:block w-56 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto px-5 py-6"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#E2DDD5 transparent" }}
        >
            <div className="mb-4">
                <div className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2DDD5] dark:border-white/10 bg-white dark:bg-[#121214] transition-all duration-200 focus-within:border-[#00BCA1]/50 focus-within:shadow-[0_0_0_2px_rgba(0,188,161,0.08)]">
                    <Search className="w-3.5 h-3.5 text-[#9A9287] dark:text-[#8F96A3] shrink-0 transition-colors duration-200 group-focus-within:text-[#00BCA1]" />
                    <input
                        ref={searchRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={isKhmer ? "ស្វែងរក..." : "Search..."}
                        className="w-full bg-transparent outline-none text-[13px] text-[#4A4540] dark:text-[#E5E7EB] placeholder:text-[#9A9287] dark:placeholder:text-[#8F96A3]"
                        style={fontStyle}
                        aria-label={isKhmer ? "ស្វែងរកខ្លឹមសារ" : "Search content"}
                    />
                    <kbd className="shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#E2DDD5] dark:border-white/10 bg-[#F6F2EA] dark:bg-white/5 text-[#8B8378] dark:text-[#A1A1AA]">
                        ⌘K
                    </kbd>
                </div>
            </div>

            <p
                className="mb-3 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B5B0A8] dark:text-[#9CA3AF]"
                style={fontStyle}
            >
                {isKhmer ? "នៅលើទំព័រនេះ" : "On this page"}
            </p>
            <nav className="flex flex-col gap-px" style={fontStyle}>
                {filteredToc.map((item) => {
                    const active = item.id === activeSectionId;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`block py-1 pl-3 border-l-2 text-[13.5px] leading-[1.5] transition-colors duration-150 ${active
                                ? "border-l-[#00BCA1] text-[#00BCA1] font-medium"
                                : "border-l-transparent text-[#88837B] dark:text-[#A1A1AA] hover:text-[#1A1714] dark:hover:text-white hover:border-l-[#CEC9BF] dark:hover:border-l-white/20"
                                }`}
                        >
                            {isKhmer && item.labelKh ? item.labelKh : item.labelEn}
                        </a>
                    );
                })}
                {filteredToc.length === 0 && (
                    <p className="text-[12px] text-[#88837B] dark:text-[#A1A1AA] pl-3 py-2">
                        {isKhmer ? "រកមិនឃើញ" : "No results"}
                    </p>
                )}
            </nav>
        </aside>
    );
}

/* ─────────────────────────────────────────────
   Main DocsLayout
───────────────────────────────────────────── */
export default function DocsLayout({
    children,
}: DocsLayoutProps) {
    const locale = useLocale();
    const isKhmer = locale === "kh";
    const pathname = usePathname();

    // Derive route key — strip basePath /docs prefix if present
    const routeKey = pathname.replace(/^\/docs/, "") || "/";
    // Match exact or prefix (e.g. /api/authentication → /api)
    const routeData = ROUTE_DATA[routeKey]
        ?? Object.entries(ROUTE_DATA).find(([k]) => routeKey.startsWith(k + "/"))?.[1]
        ?? { sectionIds: [], tocEn: [], tocKh: [] };

    const sectionIds = routeData.sectionIds;
    const toc = isKhmer ? routeData.tocKh : routeData.tocEn;

    const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] ?? "");

    const bodyFontFamily = isKhmer
        ? "var(--font-noto-khmer), var(--font-google-sans), sans-serif"
        : "var(--font-google-sans), var(--font-noto-khmer), sans-serif";

    // Reset active section when route changes
    useEffect(() => {
        setActiveSectionId(sectionIds[0] ?? "");
    }, [routeKey]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (sectionIds.length === 0) return;

        let observer: IntersectionObserver | null = null;

        function setupObserver() {
            // Check all section elements exist in the DOM
            const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
            if (els.length === 0) return false;

            // Set initial active from hash or first section
            const hash = window.location.hash.replace("#", "");
            if (hash && sectionIds.includes(hash)) {
                setActiveSectionId(hash);
            }

            observer = new IntersectionObserver(
                (entries) => {
                    // Pick the topmost section that is intersecting
                    const intersecting = entries
                        .filter((e) => e.isIntersecting)
                        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                    if (intersecting.length > 0) {
                        const id = intersecting[0].target.id;
                        setActiveSectionId(id);
                        history.replaceState(null, "", `#${id}`);
                    }
                },
                {
                    // Top 20% of viewport triggers the highlight
                    threshold: 0,
                    rootMargin: "-56px 0px -70% 0px",
                }
            );

            els.forEach((el) => observer!.observe(el));
            return true;
        }

        // Try immediately — if content is already rendered
        if (!setupObserver()) {
            // Content not in DOM yet (lazy loaded) — poll until it appears
            const interval = setInterval(() => {
                if (setupObserver()) clearInterval(interval);
            }, 100);
            return () => {
                clearInterval(interval);
                observer?.disconnect();
            };
        }

        return () => observer?.disconnect();
    }, [sectionIds, routeKey]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (hash && sectionIds.includes(hash)) {
                setActiveSectionId(hash);
            }
        };
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, [sectionIds]);

    return (
        <div
            className="min-h-screen bg-[#F7F5F0] dark:bg-[#09090B] transition-colors duration-300"
            style={{ fontFamily: bodyFontFamily }}
        >
            <div className="mx-auto flex w-full max-w-[90rem] items-start">
                <LeftSidebar activeSectionId={activeSectionId} isKhmer={isKhmer} />

                <main className="flex-1 min-w-0">
                    {children}
                </main>

                <RightSidebar
                    toc={toc}
                    activeSectionId={activeSectionId}
                    isKhmer={isKhmer}
                />
            </div>
        </div>
    );
}
