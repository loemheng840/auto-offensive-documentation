'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface DocsTOCProps {
  content: string;
  mode?: 'mobile' | 'desktop';
}

export function DocsTOC({ content, mode = 'desktop' }: DocsTOCProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/_/g, '-')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      extractedHeadings.push({ id, text, level });
    }

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -66% 0px' }
    );

    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) {
    return null;
  }

  if (mode === 'mobile') {
    return (
      <div className="glass-panel glass-panel-dark sticky top-3 z-20 mb-5 rounded-3xl px-4 py-3 lg:hidden">
        <button
          onClick={() => setIsMobileOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Compass className="h-4 w-4" />
            </div>
            <div className="text-left">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On This Page
              </span>
              <span className="block text-sm font-medium text-foreground">
                {activeId ? headings.find((heading) => heading.id === activeId)?.text ?? 'Browse sections' : 'Browse sections'}
              </span>
            </div>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200',
              isMobileOpen && 'rotate-180'
            )}
          />
        </button>

        {isMobileOpen && (
          <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {headings.map((heading) => (
              <Link
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition-all duration-200',
                  heading.level === 3 && 'pl-4',
                  activeId === heading.id
                    ? 'border-primary/30 bg-primary text-primary-foreground shadow-sm'
                    : 'border-border/70 bg-background/45 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                )}
              >
                {heading.text}
              </Link>
            ))}
          </nav>
        )}
      </div>
    );
  }

  return (
    <aside className="sticky top-6 hidden max-h-[calc(100vh-2rem)] self-start overflow-auto pl-1 lg:block lg:w-64 lg:flex-shrink-0">
      <div className="glass-panel glass-panel-dark rounded-3xl p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              On This Page
            </div>
            <div className="text-sm font-medium text-foreground">Section navigator</div>
          </div>
        </div>

        <nav className="space-y-1.5">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                'block rounded-2xl px-3 py-2 text-sm transition-all duration-200 hover:text-foreground',
                heading.level === 3 && 'ml-4 text-[13px]',
                activeId === heading.id
                  ? 'border border-primary/20 bg-primary/10 font-medium text-foreground'
                  : 'border border-transparent text-muted-foreground hover:border-border/60 hover:bg-background/40'
              )}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}