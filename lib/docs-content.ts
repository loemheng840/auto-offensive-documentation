export interface DocSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: 'getting-started' | 'api' | 'tutorials' | 'faq';
  order: number;
}

export interface DocCategory {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
}

export const docCategories: DocCategory[] = [
  {
    id: 'getting-started',
    title: 'Core Concepts',
    slug: 'getting-started',
    icon: '📘',
    description: 'Documentation hub, concepts, and onboarding structure',
  },
  {
    id: 'api',
    title: 'API Reference',
    slug: 'api',
    icon: '🔌',
    description: 'Endpoints, auth, payloads, and CI/CD automation model',
  },
  {
    id: 'tutorials',
    title: 'Tools Reference',
    slug: 'tutorials',
    icon: '🛠️',
    description: 'Tool usage structure, chaining strategy, and scan workflow templates',
  },
  {
    id: 'faq',
    title: 'Plans and Limits',
    slug: 'faq',
    icon: '📊',
    description: 'Usage tiers, quotas, governance, and operational controls',
  },
];

export const docSections: DocSection[] = [
  {
    id: 'hub-template',
    title: 'Documentation Hub Template',
    slug: 'documentation-hub-template',
    category: 'getting-started',
    description: 'Starter structure similar to a commercial pentest docs portal',
    order: 0,
    content: `# Documentation Hub Template

Use this as a base layout to quickly build a docs portal structure.

## Recommended top-level sections

- Core Concepts
- Tools Reference
- API Reference
- Plans and Limits
- Help and Support

## Suggested homepage blocks

1. Hero banner with clear platform value
2. Quick start cards
3. Category cards with short descriptions
4. Popular docs list
5. Getting support section

## Suggested navigation model

- Left sidebar: category and document tree
- Main content: article body
- Right panel: On This Page anchors

## Content approach

- Keep headings short and action-oriented
- Use practical examples under every section
- Provide copy-ready payload samples
- Keep policy and limits explicit`,
  },

  // Platform Foundation
  {
    id: 'pf-overview',
    title: 'Platform Overview',
    slug: 'platform-overview',
    category: 'getting-started',
    description: 'Understand the 5 main capabilities of the platform',
    order: 1,
    content: `# Platform Overview

This platform automates penetration testing and security analysis through one unified SaaS workflow.

## Main capability domains

1. Web-based penetration testing automation with AI guidance
2. Security report generation with AI and templates
3. Managed CLI for controlled tool execution
4. Repository scanning for code quality and vulnerabilities
5. API integration for CI/CD pipelines

## Why this architecture works

- Centralized scan orchestration and result storage
- Consistent runtime environment for tools
- Role-based access and workspace isolation
- Reusable findings for analysis, reporting, and API export
- AI assistance focused on explanation and prioritization, not arbitrary output

## Core entities

- Workspace
- Project
- Target
- Scan job
- Finding
- Report

## High-level lifecycle

1. User defines target or repository
2. User selects modules or scan type
3. System runs jobs in isolated workers
4. User monitors real-time status and logs
5. AI summarizes findings and suggests next actions
6. Report is generated and exported as needed`,
  },
  {
    id: 'pf-users-access',
    title: 'Users, Roles, and Access Limits',
    slug: 'users-roles-and-access-limits',
    category: 'getting-started',
    description: 'Admin responsibilities and authenticated vs unauthenticated capabilities',
    order: 2,
    content: `# Users, Roles, and Access Limits

## Primary user type

- **Admin**

## Admin responsibilities

1. Add new scanning tools without modifying API contracts
2. Auto-install tool dependencies using Ansible playbooks
3. Manage users and permissions
4. Manage tool catalog and tool visibility
5. Manage platform documents and integration guides

## Access tiers

- **Authenticated user**
- **Unauthenticated user**

## Recommended capability boundaries

### Authenticated user

- Up to **50 scans per day**
- Full project history and saved scan history
- Report generation and template selection
- Report export (JSON, PDF, DOCX, Excel)
- CLI login and remote execution access
- API token usage for CI/CD integrations

### Unauthenticated user

- Up to **3 scans per day**
- Limited history retention
- Basic web scan results view
- No advanced report export
- No API key issuance
- No CLI remote execution

## Access control model

- Resource scoping by workspace
- Token-based authentication for API and CLI
- Server-side validation for every scan request
- Explicit deny for unsupported tools or unsafe parameters`,
  },
  {
    id: 'pf-project-scan',
    title: 'Projects, Targets, and Scan Jobs',
    slug: 'projects-targets-and-scan-jobs',
    category: 'getting-started',
    description: 'How users create and manage scans from the web UI',
    order: 3,
    content: `# Projects, Targets, and Scan Jobs

## Project and workspace model

- Users organize work under workspaces
- Each workspace contains multiple projects
- Scans, findings, and reports are linked to their project

## Supported target types

- Domain, for example: \`example.com\`
- URL, for example: \`https://example.com\`
- IP address

## Supported scan modules

- Subfinder
- Naabu
- Nmap
- Nuclei
- URL Fuzzer
- WPScan
- SQLi automation
- XSS Strike
- Kiterunner
- Httpx
- Katana
- Gobuster
- Amass
- Assetfinder

## Multi-tool execution

Users can select multiple tools in one scan flow from UI cards.

Example chain:

\`\`\`
subfinder -> httpx -> nuclei
\`\`\`

## Scan lifecycle states

- Pending
- Running
- Completed
- Failed
- Cancelled

## Real-time monitoring

Users can watch scan status and live logs (stdout/stderr-like stream) directly in the web interface.

## Result model

Each completed scan stores:

- discovered assets
- ports and detected services
- identified vulnerabilities or misconfigurations
- raw evidence/log references
- AI summary and suggested next steps`,
  },

  // API and CI/CD
  {
    id: 'api-template',
    title: 'API Docs Template',
    slug: 'api-docs-template',
    category: 'api',
    description: 'Reusable API reference structure you can customize',
    order: 0,
    content: `# API Docs Template

Use this template to structure your API documentation pages.

## Recommended API sections

1. Authentication
2. Base URL and versioning
3. Rate limits and quotas
4. Request and response format
5. Error model
6. Endpoint groups

## Endpoint page format

- Purpose
- Required input
- Optional parameters
- Example request
- Example response
- Error cases

## CI/CD notes

- Include trigger endpoint examples
- Include status polling patterns
- Include pass/fail policy guidance by severity
- Include report artifact download flow`,
  },
  {
    id: 'api-overview',
    title: 'API Integration Overview',
    slug: 'api-integration-overview',
    category: 'api',
    description: 'Use authenticated endpoints to trigger and consume scans in automation',
    order: 1,
    content: `# API Integration Overview

The platform exposes authenticated APIs for SaaS-based integration with CI/CD and external systems.

## API core functions

- Trigger scans for target-based testing
- Trigger repository analysis scans
- Retrieve job status by job ID
- Fetch structured findings after completion
- Download generated reports

## API request scope

Requests are scoped to the caller workspace and authorized resources only.

## Job model returned by API

Every scan trigger returns a job record with:

- job ID
- current status
- requested target or repository reference
- selected modules
- timestamps for lifecycle events

## Standard status values

- Pending
- Running
- Completed
- Failed
- Cancelled

## CI/CD usage pattern

1. Trigger scan on build/test/deploy stage
2. Poll job status until terminal state
3. Pull findings summary
4. Apply threshold logic to pass, warn, or fail pipeline
5. Download report artifact for compliance evidence`,
  },
  {
    id: 'api-auth-rate',
    title: 'API Authentication and Usage Policy',
    slug: 'api-authentication-and-usage-policy',
    category: 'api',
    description: 'Authentication, tenant scoping, and practical limit strategy',
    order: 2,
    content: `# API Authentication and Usage Policy

## Authentication model

- API key or token-based authentication
- Each key is bound to a user and workspace scope
- Every endpoint requires a valid authorization header

## Security controls

- Reject unauthenticated requests
- Reject cross-workspace access attempts
- Validate tool names and parameters server-side
- Enforce allowlist execution model

## Suggested headers

\`\`\`
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
\`\`\`

## Suggested usage limits policy

- Authenticated accounts: 50 scans/day
- Unauthenticated usage: 3 scans/day

## Client guidance

- Use idempotency keys for retry-safe operations
- Poll status with a reasonable interval (10 to 30 seconds)
- Add retry and backoff for transient failures
- Log request IDs and job IDs for support diagnostics`,
  },
  {
    id: 'api-cicd-gate',
    title: 'CI/CD Security Gate Design',
    slug: 'cicd-security-gate-design',
    category: 'api',
    description: 'Define fail/warn policy based on severity thresholds',
    order: 3,
    content: `# CI/CD Security Gate Design

## Pipeline decision model

Use structured findings to decide build outcomes.

- Fail if Critical findings > 0
- Fail if High findings exceed configured threshold
- Warn for Medium findings above warning threshold
- Pass if findings are within policy

## Example policy object

\`\`\`json
{
  "fail_on": {
    "critical_gt": 0,
    "high_gt": 2
  },
  "warn_on": {
    "medium_gt": 5
  }
}
\`\`\`

## Pipeline flow

1. Trigger scan via API
2. Wait for job completion
3. Retrieve finding counts by severity
4. Evaluate policy
5. Fail or continue deployment

## Recommendation

Keep policy thresholds configurable per repository or environment so teams can adopt stricter enforcement over time.`,
  },
  {
    id: 'api-document-tools',
    title: 'API Document Tool Schemas',
    slug: 'api-document-tool-schemas',
    category: 'api',
    description: 'Standardized api_document payloads for httpx, naabu, and nuclei',
    order: 4,
    content: `# API Document Tool Schemas

Use the following ` + "`api_document`" + ` payloads to register and expose tools consistently in your backend.

## Notes

- These are full schema objects for direct insertion into your tool catalog
- ` + "`raw_args_allowed`" + ` remains disabled for safer execution
- Docker image references are defined per tool runtime

## api_document payload

\`\`\`json
{
  "Reconnaissance": [
    {
      "category_name": "Reconnaissance",
      "tool_name": "subfinder",
      "tool_description": "Fast passive subdomain enumeration tool",
      "tool_long_description": "Subfinder is a subdomain discovery tool that returns valid subdomains for websites using passive online sources. It is designed for speed and efficiency in reconnaissance workflows.",
      "examples": [{ "domain": "example.com" }],
      "input_schema": {
        "type": "object",
        "fields": [
          { "key": "domain", "type": "string", "required": true, "description": "Target domain to enumerate subdomains for" }
        ]
      },
      "output_schema": {
        "type": "array",
        "items": { "type": "string", "description": "Discovered subdomains" }
      },
      "scan_config": {
        "basic": {
          "presets": [
            { "name": "light", "description": "Quick scan with minimal output", "flags": ["-silent"] },
            { "name": "deep", "description": "More comprehensive scan using all sources", "flags": ["-all"] }
          ]
        },
        "medium": {
          "options": [
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in seconds" },
            { "flag": "-t", "key": "threads", "type": "integer", "required": false, "description": "Number of concurrent threads" }
          ]
        },
        "advanced": {
          "options": [
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in seconds" },
            { "flag": "-t", "key": "threads", "type": "integer", "required": false, "description": "Number of concurrent threads" },
            { "flag": "-s", "key": "sources", "type": "string", "required": false, "description": "Comma-separated list of sources to use" }
          ],
          "raw_args_allowed": false
        }
      },
      "install_method": "docker",
      "version": "latest",
      "image_ref": "projectdiscovery/subfinder:latest",
      "image_source": "dockerhub",
      "is_active": true,
      "denied_options": []
    },
    {
      "category_name": "Reconnaissance",
      "tool_name": "httpx",
      "tool_description": "HTTP probing and web service fingerprinting",
      "tool_long_description": "Httpx probes hosts and URLs to identify reachable web services and collect metadata such as status code, title, redirect behavior, and detected technologies. It is commonly used after subdomain discovery to validate live assets.",
      "examples": [{ "targets": ["example.com", "api.example.com"] }],
      "input_schema": {
        "type": "object",
        "fields": [
          { "key": "targets", "type": "array", "required": true, "description": "List of hosts or URLs to probe" }
        ]
      },
      "output_schema": {
        "type": "array",
        "items": {
          "type": "object",
          "fields": [
            { "key": "url", "type": "string", "description": "Resolved URL" },
            { "key": "status_code", "type": "integer", "description": "HTTP response status code" },
            { "key": "title", "type": "string", "description": "HTML page title if available" },
            { "key": "tech", "type": "array", "description": "Detected technologies" }
          ]
        }
      },
      "scan_config": {
        "basic": {
          "presets": [
            { "name": "light", "description": "Quick host validation with minimal output", "flags": ["-silent", "-status-code"] },
            { "name": "deep", "description": "Richer metadata extraction", "flags": ["-title", "-status-code", "-tech-detect", "-follow-redirects"] }
          ]
        },
        "medium": {
          "options": [
            { "flag": "-threads", "key": "threads", "type": "integer", "required": false, "description": "Number of concurrent workers" },
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in seconds" },
            { "flag": "-ports", "key": "ports", "type": "string", "required": false, "description": "Comma-separated ports, e.g. 80,443,8080" }
          ]
        },
        "advanced": {
          "options": [
            { "flag": "-threads", "key": "threads", "type": "integer", "required": false, "description": "Number of concurrent workers" },
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in seconds" },
            { "flag": "-ports", "key": "ports", "type": "string", "required": false, "description": "Comma-separated ports, e.g. 80,443,8080" },
            { "flag": "-path", "key": "path", "type": "string", "required": false, "description": "Path to probe on each target" },
            { "flag": "-H", "key": "headers", "type": "string", "required": false, "description": "Custom headers (repeatable)" }
          ],
          "raw_args_allowed": false
        }
      },
      "install_method": "docker",
      "version": "latest",
      "image_ref": "projectdiscovery/httpx:latest",
      "image_source": "dockerhub",
      "is_active": true,
      "denied_options": []
    },
    {
      "category_name": "Reconnaissance",
      "tool_name": "naabu",
      "tool_description": "Fast TCP port scanner",
      "tool_long_description": "Naabu performs high-speed port discovery against hosts or domains. It is commonly chained with tools like Nmap for deeper service and OS analysis after open ports are identified.",
      "examples": [{ "host": "example.com" }],
      "input_schema": {
        "type": "object",
        "fields": [
          { "key": "host", "type": "string", "required": true, "description": "Target host, domain, or IP address" }
        ]
      },
      "output_schema": {
        "type": "array",
        "items": {
          "type": "object",
          "fields": [
            { "key": "host", "type": "string", "description": "Resolved host or IP" },
            { "key": "port", "type": "integer", "description": "Discovered open port" }
          ]
        }
      },
      "scan_config": {
        "basic": {
          "presets": [
            { "name": "light", "description": "Scan common top ports only", "flags": ["-top-ports", "100"] },
            { "name": "deep", "description": "Comprehensive scan across all ports", "flags": ["-p", "-", "-rate", "1000"] }
          ]
        },
        "medium": {
          "options": [
            { "flag": "-p", "key": "ports", "type": "string", "required": false, "description": "Port list or range, e.g. 80,443 or 1-1000" },
            { "flag": "-rate", "key": "rate", "type": "integer", "required": false, "description": "Packets per second" },
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in milliseconds" }
          ]
        },
        "advanced": {
          "options": [
            { "flag": "-p", "key": "ports", "type": "string", "required": false, "description": "Port list or range, e.g. 80,443 or 1-1000" },
            { "flag": "-rate", "key": "rate", "type": "integer", "required": false, "description": "Packets per second" },
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "Timeout in milliseconds" },
            { "flag": "-source-ip", "key": "source_ip", "type": "string", "required": false, "description": "Source IP for outbound packets" },
            { "flag": "-exclude-ports", "key": "exclude_ports", "type": "string", "required": false, "description": "Ports to exclude from scan" }
          ],
          "raw_args_allowed": false
        }
      },
      "install_method": "docker",
      "version": "latest",
      "image_ref": "projectdiscovery/naabu:latest",
      "image_source": "dockerhub",
      "is_active": true,
      "denied_options": []
    }
  ],
  "Vulnerability-Scanning": [
    {
      "category_name": "Vulnerability-Scanning",
      "tool_name": "nuclei",
      "tool_description": "Template-based vulnerability scanner",
      "tool_long_description": "Nuclei executes security templates against web targets, services, and APIs to identify known vulnerabilities, misconfigurations, and exposed components at scale.",
      "examples": [{ "target": "https://example.com" }],
      "input_schema": {
        "type": "object",
        "fields": [
          { "key": "target", "type": "string", "required": true, "description": "Target URL, host, or IP to scan" }
        ]
      },
      "output_schema": {
        "type": "array",
        "items": {
          "type": "object",
          "fields": [
            { "key": "template_id", "type": "string", "description": "Matched template identifier" },
            { "key": "severity", "type": "string", "description": "Finding severity" },
            { "key": "matched_at", "type": "string", "description": "Matched URL or endpoint" }
          ]
        }
      },
      "scan_config": {
        "basic": {
          "presets": [
            { "name": "light", "description": "Run only critical and high templates", "flags": ["-severity", "critical,high"] },
            { "name": "deep", "description": "Run broad severity coverage with stats", "flags": ["-severity", "critical,high,medium,low", "-stats"] }
          ]
        },
        "medium": {
          "options": [
            { "flag": "-severity", "key": "severity", "type": "string", "required": false, "description": "Severity filter list" },
            { "flag": "-t", "key": "templates", "type": "string", "required": false, "description": "Template path or directory" },
            { "flag": "-rl", "key": "rate_limit", "type": "integer", "required": false, "description": "Request rate limit per second" }
          ]
        },
        "advanced": {
          "options": [
            { "flag": "-severity", "key": "severity", "type": "string", "required": false, "description": "Severity filter list" },
            { "flag": "-t", "key": "templates", "type": "string", "required": false, "description": "Template path or directory" },
            { "flag": "-rl", "key": "rate_limit", "type": "integer", "required": false, "description": "Request rate limit per second" },
            { "flag": "-tags", "key": "tags", "type": "string", "required": false, "description": "Run templates by tags" },
            { "flag": "-timeout", "key": "timeout", "type": "integer", "required": false, "description": "HTTP timeout in seconds" }
          ],
          "raw_args_allowed": false
        }
      },
      "install_method": "docker",
      "version": "latest",
      "image_ref": "projectdiscovery/nuclei:latest",
      "image_source": "dockerhub",
      "is_active": true,
      "denied_options": []
    }
  ]
}
\`\`\``,
  },

  // Execution Workflows
  {
    id: 'tools-template',
    title: 'Tools Reference Template',
    slug: 'tools-reference-template',
    category: 'tutorials',
    description: 'Tool documentation pattern for recon and vulnerability modules',
    order: 0,
    content: `# Tools Reference Template

Use this layout for each tool page in your catalog.

## Required tool metadata

- Tool name and category
- Description and long description
- Input schema
- Output schema
- Presets (light, deep)
- Medium and advanced options
- Runtime details (image, version, source)

## Recommended tool page sections

1. Overview
2. Inputs
3. Outputs
4. Presets
5. Advanced options
6. Security restrictions
7. Example command mappings

## Tool chaining guidance

- Subfinder -> Httpx -> Nuclei
- Naabu -> Nmap -> Nuclei
- Katana -> Httpx -> Nuclei`,
  },
  {
    id: 'wf-web-pentest',
    title: 'Web Pentest Automation Workflow',
    slug: 'web-pentest-automation-workflow',
    category: 'tutorials',
    description: 'Run web-based scan workflows and follow AI-guided next steps',
    order: 1,
    content: `# Web Pentest Automation Workflow

## Typical workflow

1. Create or select project
2. Define target (domain, URL, or IP)
3. Select one or multiple scan modules
4. Start scan job
5. Monitor live logs and job status
6. Review findings and AI summary
7. Run AI-suggested next module chain

## AI-assisted analysis output

- concise summary of discovered issues
- severity-based prioritization
- plain-language explanations
- suggested validation and follow-up actions

## Example guided sequence

If open ports are discovered:

1. run Httpx for service probing
2. run Nmap service detection for exposed services
3. run Nuclei for vulnerability templates

## Integration guidance content to include in docs

- Which tools can chain together
- Input/output format compatibility between tools
- Recommended module order by target type
- Known false-positive handling strategy`,
  },
  {
    id: 'wf-managed-cli',
    title: 'Managed CLI Workflow',
    slug: 'managed-cli-workflow',
    category: 'tutorials',
    description: 'Execute supported tools remotely without local tool installation',
    order: 2,
    content: `# Managed CLI Workflow

The CLI is a thin client. Execution happens on backend workers, not on the user machine.

## CLI setup and login

\`\`\`bash
pentest login
\`\`\`

## Example commands

\`\`\`bash
pentest subfinder -d example.com
pentest httpx -l domains.txt
pentest naabu -host example.com -p 80,443
\`\`\`

## Execution model

1. CLI validates command arguments
2. CLI sends structured request to backend
3. Backend creates job and executes in isolated runtime
4. Logs are streamed back in real time
5. Final result is saved and accessible via web UI and API

## Security model

- only predefined tools are allowed
- only allowed flags/parameters are accepted
- arbitrary shell commands are blocked
- all requests are authenticated and audited`,
  },
  {
    id: 'wf-repo-scan',
    title: 'Repository Scanning Workflow',
    slug: 'repository-scanning-workflow',
    category: 'tutorials',
    description: 'Scan GitHub/GitLab repositories with SonarQube and AI remediation guidance',
    order: 3,
    content: `# Repository Scanning Workflow

## Supported source platforms

- GitHub
- GitLab

## Scan setup

Users select:

- repository
- branch or commit
- target project/workspace for result storage

## Analysis engine

SonarQube analyzes:

- code quality issues
- maintainability issues
- common security weaknesses

## Finding output structure

Each finding includes:

- issue type
- severity
- file path
- code reference location
- rule/category
- explanation
- remediation guidance

## AI-assisted remediation

AI explains why a pattern is risky and suggests safer implementation approaches.

Example use case:

- detect hard-coded credentials
- identify affected file and code block
- explain risk of credential exposure
- recommend environment variable or secure secrets manager pattern`,
  },

  // Reports and Operations
  {
    id: 'plans-template',
    title: 'Plans and Limits Template',
    slug: 'plans-and-limits-template',
    category: 'faq',
    description: 'Usage tier and governance template for your SaaS model',
    order: 0,
    content: `# Plans and Limits Template

Use this page to document pricing-tier behavior and platform boundaries.

## Suggested sections

1. Authenticated vs unauthenticated limits
2. Daily scan quotas
3. Feature availability by tier
4. Report export capabilities
5. API and CLI access rules
6. Retention and audit policy

## Example tier summary

- Authenticated: 50 scans/day, full history, report export, API and CLI access
- Unauthenticated: 3 scans/day, limited history, basic result views only

## Governance reminders

- Quotas should be enforced per workspace
- Tool execution must follow allowlist policy
- Audit logging should be immutable`,
  },
  {
    id: 'ops-report-generation',
    title: 'Report Generation and Templates',
    slug: 'report-generation-and-templates',
    category: 'faq',
    description: 'Generate reusable reports with AI summaries and export formats',
    order: 1,
    content: `# Report Generation and Templates

## Report sources

Reports can be generated from:

- completed web scan jobs
- completed repository scans

## Report sections

- target or repository information
- scan summary
- findings list
- severity classification
- evidence references
- risk explanation
- remediation recommendations

## AI contribution scope

AI is used for:

- executive summary drafting
- human-readable vulnerability explanation
- remediation guidance based on detected data

AI content is constrained to scan context and template structure.

## Supported templates

- Executive Summary Report
- Technical Vulnerability Report
- Developer Remediation Report
- Compliance-Oriented Report

## Export formats

- JSON
- PDF
- DOCX
- Excel

## Report management

Reports are linked to project and scan context, and can be viewed, downloaded, and regenerated at any time.`,
  },
  {
    id: 'ops-tool-management',
    title: 'Tool Catalog and Ansible Operations',
    slug: 'tool-catalog-and-ansible-operations',
    category: 'faq',
    description: 'Operational model for adding tools without breaking API contracts',
    order: 2,
    content: `# Tool Catalog and Ansible Operations

## Goal

Allow Admin to add and maintain tools without changing public API contracts.

## Recommended operational model

1. Define tool manifest in tool registry
2. Map tool to standardized execution schema
3. Run Ansible playbook for installation and dependencies
4. Execute health check for tool availability
5. Publish tool to UI catalog after validation

## Tool manifest fields to include

- tool ID
- tool name and version
- supported parameters
- input type and output schema
- dependency list
- timeout and resource profile

## Why use Ansible

- consistent installation across workers
- reproducible dependency management
- easier rollback and update strategy
- auditable infrastructure changes

## Integration documentation to maintain

- compatible tool chains
- required input format per tool
- output fields used by downstream tools
- safe defaults and known caveats`,
  },
  {
    id: 'ops-security-governance',
    title: 'Security, Isolation, and Governance',
    slug: 'security-isolation-and-governance',
    category: 'faq',
    description: 'Execution safety, validation controls, and operational guardrails',
    order: 3,
    content: `# Security, Isolation, and Governance

## Execution safety principles

- only predefined tools are executable through API and CLI
- only approved flags and schema-defined parameters are accepted
- raw arguments are disabled by default to prevent command injection paths
- every job runs in an isolated runtime with constrained privileges
- workspace-scoped identity and short-lived credentials are enforced
- egress and network boundaries are controlled per job profile
- execution timeout, memory, and CPU guards are enforced per tool

## Execution guardrail flow

1. Validate request schema and tool identity
2. Enforce allowlist flags and deny restricted options
3. Resolve runtime image and pinned execution policy
4. Launch isolated worker with resource limits
5. Stream logs with sensitive-value masking
6. Persist results and audit records
7. Destroy runtime and revoke ephemeral credentials

## Validation controls

- input sanitization for targets and repository references
- schema validation for API and CLI requests
- permission checks before job creation and result access
- output normalization before AI analysis and report generation
- secure parser rules for JSON, logs, and tool output adapters

## Governance controls

- immutable audit trail for job lifecycle events
- usage monitoring by user, workspace, and tool
- configurable retention for logs, findings, and reports
- alerting for repeated failures or suspicious usage patterns
- policy versioning for tool manifests and runtime profiles
- change-approval workflow for activating new tools

## Recommended additional controls

- per-workspace quota management
- encrypted secret storage and rotation policy
- signed report artifacts for integrity verification
- role-based report template access for compliance workflows
- periodic denylist review for risky flags and deprecated options`,
  },
  {
    id: 'gs-account-and-quick-start',
    title: 'Account Tiers and Quick Start',
    slug: 'account-tiers-and-quick-start',
    category: 'getting-started',
    description: 'Account limits and a step-by-step onboarding path from the shared documentation',
    order: 10,
    content: `# Account Tiers and Quick Start

## Account tiers

| Account | Daily Scans | Scan History | Reports | API Access |
| --- | ---: | --- | --- | --- |
| Guest (not logged in) | 3 | No | No | No |
| Authorized (logged in) | 50 | Yes | Yes | Yes |

Create an account to unlock history retention, report generation, and API access.

## Quick start workflow

1. Create an account or log in
2. Create a workspace
3. Create a project inside that workspace
4. Create a scan job in the project
5. Add a target (domain, URL, or IP) and choose modules
6. Start the scan and monitor logs in real time
7. Review findings and generate reports`,
  },
  {
    id: 'tutorial-cli-command-reference',
    title: 'CLI Setup and Command Reference',
    slug: 'cli-setup-and-command-reference',
    category: 'tutorials',
    description: 'Install, authenticate, run tool commands, and retrieve job results via CLI',
    order: 10,
    content: `# CLI Setup and Command Reference

## Install

- Linux or macOS: ` + "`curl -sSL https://get.pentestplatform.com | sh`" + `
- Windows: download the binary from the platform downloads page

## Authenticate

` + "```bash" + `
pentest login
` + "```" + `

## Common commands

` + "```bash" + `
pentest subfinder -d example.com
pentest httpx -l domains.txt
pentest naabu -host example.com -p 80,443,8080
pentest nuclei -u https://example.com
pentest jobs
pentest jobs status <job_id>
pentest jobs results <job_id>
` + "```" + `

## Execution model

- CLI requests are sent to the backend as structured jobs
- Jobs run in isolated environments
- Output is streamed in real time
- Results are stored and can be reviewed in the web UI

Only predefined tools and allowed parameters are accepted.`,
  },
  {
    id: 'api-endpoint-reference',
    title: 'REST Endpoint Reference',
    slug: 'rest-endpoint-reference',
    category: 'api',
    description: 'Authentication, base URL, scan endpoints, repository scan endpoint, and CI/CD flow',
    order: 10,
    content: `# REST Endpoint Reference

## Authentication

Include your API key on each request:

` + "```http" + `
Authorization: Bearer YOUR_API_KEY
` + "```" + `

## Base URL

` + "`https://api.pentestplatform.com/v1`" + `

## Core endpoints

- ` + "`POST /scans`" + `: trigger a target scan
- ` + "`GET /scans/{job_id}`" + `: get job status
- ` + "`GET /scans/{job_id}/results`" + `: get structured findings
- ` + "`GET /scans/{job_id}/report?format={format}`" + `: download report (` + "`pdf`" + `, ` + "`docx`" + `, ` + "`excel`" + `, ` + "`json`" + `)
- ` + "`POST /repos/scans`" + `: trigger a repository scan

## Standard statuses

- pending
- running
- completed
- failed
- cancelled

## CI/CD pipeline pattern

1. Trigger a scan at pipeline start
2. Poll status until terminal state
3. Fetch findings and apply severity thresholds
4. Fail or warn based on policy
5. Download report artifact`,
  },
  {
    id: 'appendix-severity-and-chaining',
    title: 'Appendix: Severity and Tool Chaining',
    slug: 'appendix-severity-and-tool-chaining',
    category: 'faq',
    description: 'Severity response guidance, common tool chains, and glossary',
    order: 10,
    content: `# Appendix: Severity and Tool Chaining

## Severity levels

| Level | Description | Suggested Action |
| --- | --- | --- |
| Critical | Immediate risk of compromise | Fix immediately |
| High | Significant vulnerability | Fix in 24 to 48 hours |
| Medium | Moderate risk | Fix within sprint |
| Low | Minor or informational issue | Fix when convenient |

## Common tool chains

- Subfinder -> Httpx
- Subfinder -> Naabu
- Naabu -> Nmap
- Katana -> Nuclei
- Subfinder -> Httpx -> Nuclei

## Glossary

- Workspace: top-level container of projects
- Project: container for jobs, results, and reports
- Scan Job: one execution against a target
- Module: a tool exposed by the platform
- Finding: discovered issue, asset, or vulnerability
- Job ID: unique identifier for scan jobs
- API Key: token for API and CLI authentication
- SonarQube: static analysis engine for repository scanning`,
  },
];

export function getDocsByCategory(category: string): DocSection[] {
  return docSections
    .filter((doc) => doc.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getDocBySlug(slug: string): DocSection | undefined {
  return docSections.find((doc) => doc.slug === slug);
}

export function getAllSlugs(): string[] {
  return docSections.map((doc) => doc.slug);
}

export function getCategoryBySlug(slug: string): DocCategory | undefined {
  return docCategories.find((cat) => cat.slug === slug);
}

export function getOrderedDocs(): DocSection[] {
  return docCategories.flatMap((category) => getDocsByCategory(category.id));
}






