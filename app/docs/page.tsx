import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { docCategories, getDocsByCategory } from '@/lib/docs-content';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'API Documentation',
  description: 'Build scalable offensive security workflows with practical API docs',
};

const quickStarts = [
  {
    title: 'Open Docs Hub',
    href: '/docs/documentation-hub-template',
    description: 'Start from the full documentation portal template.',
  },
  {
    title: 'Setup API Docs',
    href: '/docs/api-docs-template',
    description: 'Use endpoint-page structure and CI/CD flow examples.',
  },
  {
    title: 'Build Tool Catalog',
    href: '/docs/tools-reference-template',
    description: 'Document tools by schema, presets, and runtime config.',
  },
];

const valueCards = [
  {
    icon: ShieldCheck,
    title: 'Security-First Design',
    text: 'Authentication, throttling, and error handling patterns made for production.',
  },
  {
    icon: Zap,
    title: 'Automation Ready',
    text: 'Playbooks for scheduled scans, CI gates, and multi-workspace operations.',
  },
  {
    icon: CheckCircle2,
    title: 'Actionable Output',
    text: 'Operational findings and reporting guidance to speed remediation.',
  },
];

export default function DocsPage() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(44,163,255,0.18),_transparent_58%)] dark:bg-[radial-gradient(circle_at_top,_rgba(40,204,231,0.16),_transparent_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-20 h-80 bg-[radial-gradient(circle_at_right,_rgba(0,208,178,0.14),_transparent_52%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:px-8 lg:py-14">
        <section className="glass-panel glass-panel-dark relative overflow-hidden rounded-4xl p-6 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(44,163,255,0.14),transparent_34%,rgba(0,208,178,0.12)_100%)]" />
          <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              API Reference
            </div>

            <div className="mt-5 max-w-4xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Documentation Portal Template for{' '}
                <span className="text-gradient-security">Security Platforms</span>
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground lg:text-lg">
                This version mirrors a professional docs portal structure so you can quickly
                customize wording, policies, and technical details for your own platform.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-5">
                <Link href="/docs/documentation-hub-template">
                  Start With Docs Hub
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="rounded-full border-border/70 bg-background/50 px-5">
                <Link href="/docs/plans-and-limits-template">View Plans and Limits</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {valueCards.map((card) => (
            <article
              key={card.title}
              className="glass-panel glass-panel-dark rounded-3xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-security-gradient text-primary-foreground shadow-lg shadow-sky-500/10">
                <card.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.text}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {docCategories.map((category) => {
            const docs = getDocsByCategory(category.id);

            return (
              <article
                key={category.id}
                className="glass-panel glass-panel-dark group relative overflow-hidden rounded-4xl p-6 transition-all duration-200 hover:border-primary/30 hover:shadow-[0_16px_50px_rgba(2,8,23,0.12)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-secondary/80 text-2xl shadow-sm">
                    <span aria-hidden="true">{category.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-primary" />
                      Collection
                    </div>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{category.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {docs.map((doc) => (
                    <li key={doc.id}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-background/35 px-3 py-3 text-sm text-foreground/85 transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-foreground"
                      >
                        <span className="truncate">{doc.title}</span>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="glass-panel glass-panel-dark overflow-hidden rounded-4xl p-6 lg:p-8">
          <div className="flex flex-col gap-2">
            <span className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Guided setup
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Quick Start Path</h3>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Move through the most useful starter templates in sequence, then adapt the content
              to your own product surface and internal workflows.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {quickStarts.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-border/70 bg-background/45 p-5 transition-all duration-200 hover:border-primary/25 hover:bg-primary/5"
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Step {index + 1}
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="text-base font-semibold tracking-tight text-foreground">{item.title}</div>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}