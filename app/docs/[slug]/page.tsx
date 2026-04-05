import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { DocsBreadcrumb } from '@/components/docs-breadcrumb';
import { DocsTOC } from '@/components/docs-toc';
import { MarkdownContent } from '@/components/markdown-content';
import {
  getDocBySlug,
  getCategoryBySlug,
  getAllSlugs,
  getOrderedDocs,
} from '@/lib/docs-content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) return { title: 'Not Found' };

  return {
    title: `${doc.title} - Documentation`,
    description: doc.description,
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) notFound();

  const category = getCategoryBySlug(doc.category);
  const orderedDocs = getOrderedDocs();
  const currentDocIndex = orderedDocs.findIndex((item) => item.slug === doc.slug);
  const previousDoc = currentDocIndex > 0 ? orderedDocs[currentDocIndex - 1] : null;
  const nextDoc =
    currentDocIndex >= 0 && currentDocIndex < orderedDocs.length - 1
      ? orderedDocs[currentDocIndex + 1]
      : null;

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="relative mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">

        {category && (
          <DocsBreadcrumb
            categoryTitle={category.title}
            categorySlug={category.slug}
            docTitle={doc.title}
          />
        )}

        <div className="relative mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_250px]">

          {/* Left — main content */}
          <div className="min-w-0">

            <DocsTOC content={doc.content} mode="mobile" />

            <header className="glass-panel glass-panel-dark relative overflow-hidden rounded-4xl p-6 lg:p-8">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(44,163,255,0.12),transparent_32%,rgba(0,208,178,0.12)_100%)]" />
              <div className="relative">
                {category && (
                  <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {category.title}
                  </p>
                )}
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {doc.title}
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground lg:text-lg">
                  {doc.description}
                </p>
              </div>
            </header>

            <div className="glass-panel glass-panel-dark mt-6 rounded-4xl px-6 py-8 lg:px-10">
              <div className="prose-content">
                <MarkdownContent content={doc.content} />
              </div>
            </div>

            <div className="mt-8 grid gap-4 border-t border-border/70 pt-8 md:grid-cols-2">
              {previousDoc ? (
                <Link
                  href={`/docs/${previousDoc.slug}`}
                  className="group glass-panel glass-panel-dark rounded-3xl p-5 transition-all duration-200 hover:border-primary/25 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </div>
                  <div className="mt-3 text-base font-semibold tracking-tight text-foreground">
                    {previousDoc.title}
                  </div>
                </Link>
              ) : (
                <div className="rounded-3xl border border-dashed border-border/70 bg-background/30 p-5 text-sm text-muted-foreground">
                  You're at the beginning of the documentation sequence.
                </div>
              )}

              {nextDoc ? (
                <Link
                  href={`/docs/${nextDoc.slug}`}
                  className="group glass-panel glass-panel-dark rounded-3xl p-5 text-left transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 md:ml-auto"
                >
                  <div className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Next
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                  <div className="mt-3 text-right text-base font-semibold tracking-tight text-foreground">
                    {nextDoc.title}
                  </div>
                </Link>
              ) : (
                <div className="rounded-3xl border border-dashed border-border/70 bg-background/30 p-5 text-sm text-muted-foreground md:text-right">
                  You've reached the end of the documentation sequence.
                </div>
              )}
            </div>
          </div>

          {/* Right — sticky TOC */}
          <aside className="hidden lg:sticky lg:top-8 lg:block">
            <DocsTOC content={doc.content} mode="desktop" />
          </aside>

        </div>
      </div>
    </main>
  );
}