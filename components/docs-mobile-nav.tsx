'use client';

import { useEffect, useState } from 'react';
import { Menu, Monitor, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { DocsSidebar } from '@/components/docs-sidebar';
import { cn } from '@/lib/utils';

function DocsThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/50 bg-background/80 p-1 shadow-[0_10px_30px_rgba(2,8,23,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-card/80">
      {themes.map(({ value, label, icon: Icon }) => {
        const active = mounted ? theme === value : value === 'system';

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex h-9 items-center gap-2 rounded-full px-3 text-xs font-semibold transition-all',
              active
                ? 'bg-security-gradient text-white shadow-[0_8px_24px_rgba(22,117,177,0.28)]'
                : 'text-muted-foreground hover:text-foreground'
            )}
            aria-pressed={active}
            aria-label={`Switch to ${label.toLowerCase()} theme`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden min-[420px]:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function DocsMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
        <div className="glass-panel glass-panel-dark flex items-center justify-between rounded-2xl px-3 py-2.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 rounded-xl px-3 text-foreground hover:bg-white/60 dark:hover:bg-white/10"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="docs-mobile-sidebar"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {open ? 'Close' : 'Browse'}
          </Button>

          <DocsThemeToggle />
        </div>
      </div>

      {open && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px]"
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        id="docs-mobile-sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[88vw] max-w-[360px] px-3 pb-3 pt-[4.5rem] transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full">
          <DocsSidebar />
        </div>
      </div>
    </div>
  );
}