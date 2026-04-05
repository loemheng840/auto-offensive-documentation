'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileText, Monitor, Moon, Shield, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { docCategories, getDocsByCategory } from '@/lib/docs-content';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface DocsSidebarProps {
  activeSlug?: string;
}

function DocsThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="flex items-center gap-1 rounded-2xl border border-white/50 bg-background/70 p-1 shadow-[0_12px_32px_rgba(2,8,23,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={`Switch to ${label.toLowerCase()} theme`}
            aria-pressed={active}
            className={cn(
              'inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[11px] font-semibold transition-all',
              active
                ? 'bg-security-gradient text-white shadow-[0_8px_24px_rgba(22,117,177,0.3)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function DocsSidebar({ activeSlug }: DocsSidebarProps) {
  const pathname = usePathname();
  const derivedActiveSlug = activeSlug ?? pathname?.split('/').filter(Boolean)[1];

  const defaultExpanded = useMemo(() => {
    if (!derivedActiveSlug) {
      return 'getting-started';
    }

    const category = docCategories.find((item) =>
      getDocsByCategory(item.id).some((doc) => doc.slug === derivedActiveSlug)
    );

    return category?.id ?? 'getting-started';
  }, [derivedActiveSlug]);

  const [expandedCategory, setExpandedCategory] = useState<string>(defaultExpanded);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory((current) => (current === categoryId ? '' : categoryId));
  };

  return (
    <aside className="glass-panel glass-panel-dark flex h-full w-full flex-col overflow-hidden rounded-[28px] border border-white/50 bg-sidebar/90 shadow-[0_20px_60px_rgba(2,8,23,0.12)] dark:border-white/10 dark:bg-sidebar/95">
      <div className="border-b border-sidebar-border/80 px-5 py-5">
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
          <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary lg:inline-flex">
            Secure
          </span>
        </div>

        <div className="mt-5">
          <DocsThemeToggle />
        </div>
      </div>
      <nav className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {docCategories.map((category) => {
          const docs = getDocsByCategory(category.id);
          const isExpanded = expandedCategory === category.id;

          return (
            <div
              key={category.id}
              className="overflow-hidden rounded-2xl border border-transparent bg-white/0 transition-colors hover:border-sidebar-border/80 hover:bg-white/30 dark:hover:bg-white/[0.03]"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left transition-colors"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl  text-base text-primary shadow-inner shadow-primary/10">
                    {category.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {category.title}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {docs.length} {docs.length === 1 ? 'document' : 'documents'}
                    </span>
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                    isExpanded && 'rotate-180 text-foreground'
                  )}
                />
              </button>

              {isExpanded && (
                <div className="space-y-1 px-2 pb-2">
                  {docs.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/docs/${doc.slug}`}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                        derivedActiveSlug === doc.slug
                          ? 'bg-security-gradient text-white shadow-[0_12px_28px_rgba(22,117,177,0.24)]'
                          : 'text-muted-foreground hover:bg-background/80 hover:text-foreground dark:hover:bg-white/[0.04]'
                      )}
                    >
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full transition-colors',
                          derivedActiveSlug === doc.slug
                            ? 'bg-white'
                            : 'bg-primary/55 group-hover:bg-primary'
                        )}
                      />
                      <span className="truncate">{doc.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}