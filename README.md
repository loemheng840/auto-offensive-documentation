<div align="center">
  <h1>🛡️ Auto-Offensive Documentation</h1>
  <p><strong>The official portal for guides, API recipes, and CLI tool references for the Auto-Offensive platform.</strong></p>

  <!-- Badges -->
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
  <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
</div>

<br />

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Content Authoring](#-content-authoring)
- [Custom Components](#-custom-components)
- [Configuration](#-configuration)
- [Scripts](#-scripts)
- [Contributing](#-contributing)

---

## 🚀 Overview

This repository contains the front-end documentation site for the **Auto-Offensive platform**. It is designed to provide developers, security engineers, and CI/CD administrators with an intuitive, "Apple-style", premium reading experience. 

The documentation covers the entire ecosystem, from triggering remote scans via the `aof` CLI, to understanding sandboxed security tool architectures (like Nuclei and Subfinder), to integrating the platform into automated Git workflows.

### ✨ Key Features
- **Premium Design System**: Built with modern aesthetics, glassmorphism UI, smooth Framer Motion micro-animations, and dynamic dark/light modes.
- **Bilingual i18n Support**: Full localization for English (EN) and Khmer (KH) using `next-intl` to cater to a global and local developer audience.
- **Developer-Centric Focus**: Emphasizes high-quality code snippets, precise API endpoint documentation, and clear terminal commands over generic marketing copy.

---

## 🛠️ Tech Stack

This project is built using modern web development standards to ensure maximum performance and maintainability:

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & custom [Shadcn/ui](https://ui.shadcn.com/) components
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [`next-intl`](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── app/
│   ├── [locale]/            # Dynamic routing for /en and /kh content
│   ├── (docs)/              # Shared layouts for documentation pages
│   └── layout.tsx           # Global layouts and theme providers
├── components/
│   ├── document/            # 📝 ALL CONTENT LIVES HERE (Categorized by domain)
│   │   ├── ci-cd/           # CI/CD integration guides
│   │   ├── cli/             # CLI usage and commands
│   │   ├── getting-started/ # Quickstart and core concepts
│   │   ├── tools/           # Deep-dive references for security tools
│   │   └── shared/          # Reusable UI primitives (Callouts, CodeBlocks, etc.)
│   ├── layout/              # Structural components (Navbar, Footers)
│   └── ui/                  # Base UI components (Buttons, Dropdowns)
├── public/                  # Static assets (images, fonts, icons)
└── next.config.ts           # Next.js build configuration
```

---

## 💻 Getting Started

To run the documentation locally for development or contribution:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm, yarn, or pnpm

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/auto-offensive-documentation.git
   cd auto-offensive-documentation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
> **Note:** The development server runs on `http://localhost:3001` by default to avoid port collisions with the main Auto-Offensive Web App (which usually runs on `3000`).

---

## ✍️ Content Authoring

Currently, content is written inside large React components (`.tsx` files). If you are adding a new paragraph, sentence, or code block, you **must** provide the translation logic. 

This is handled via ternary operators based on the active locale, ensuring the UI always serves the correct language:

```tsx
// Example of current authoring style
<Para>
  {isKhmer 
    ? "សូមស្វាគមន៍មកកាន់ Auto-Offensive — ផ្លេតហ្វមស្កេនសុវត្ថិភាពដោយស្វ័យប្រវត្តិ។" 
    : "Welcome to Auto-Offensive — the automated offensive security platform."}
</Para>
```

> **Roadmap Warning:** We are actively transitioning this architecture to **MDX (Markdown for JSX)** to streamline the writing process. Please check with the core maintainers before creating massive new `.tsx` content files, as they will need to be converted to `.mdx` shortly.

---

## 🧩 Custom Components

To maintain our premium aesthetic, **never write raw HTML or unstyled elements** for documentation content. Always import and use the shared primitives (typically found in `components/document/shared/`):

- `<Callout type="info|warn|tip">`: Used for alerts, warnings, and important notices.
- `<CodeBlock title="bash">`: Used for terminal commands, JSON responses, and code snippets (includes a built-in copy button).
- `<Para>`: Standard paragraph typography with optimized line height and font weights.
- `<SectionHeading id="...">`: Used for main `H2` headers that map to the Table of Contents.
- `<SubHeading>`: Used for `H3` headers.
- `<InlineCode>`: Used for highlighting inline variables, tool names, or CLI flags.

---

## ⚙️ Configuration

- **Next.js Configuration**: Build settings and rewrites are managed in `next.config.ts`.
- **Tailwind**: Configured in `tailwind.config.ts` (or standard CSS imports) to support our dynamic dark mode and custom CSS variables for our specific color palette.
- **i18n**: Configured via `next-intl` settings in `i18n.ts` and the `middleware.ts` routing layer.

---

## 📜 Scripts

The following standard commands are available via `package.json`:

- `npm run dev`: Starts the local development server (port 3001).
- `npm run build`: Compiles the Next.js application for production deployment.
- `npm run start`: Starts the production server using the built assets.
- `npm run lint`: Runs ESLint to catch code quality and formatting issues.

---

## 🤝 Contributing

We welcome contributions to improve the documentation! 

1. **Fork** the repository.
2. Create your feature branch: `git checkout -b feature/new-guide`
3. Commit your changes: `git commit -m 'Add new CI/CD GitHub Actions guide'`
4. Push to the branch: `git push origin feature/new-guide`
5. Open a **Pull Request** against the main branch.

Ensure your code passes all linting (`npm run lint`) and that you have respected the bilingual (EN/KH) formatting standards.