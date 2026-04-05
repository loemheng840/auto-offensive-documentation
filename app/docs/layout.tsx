import { DocsSidebar } from '@/components/docs-sidebar';
import { DocsMobileNav } from '@/components/docs-mobile-nav';

export const metadata = {
  title: 'API Documentation',
  description: 'Practical security automation guides and API reference',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(44,163,255,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(0,208,178,0.14),transparent_22%)]">
      <DocsMobileNav />

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="hidden shrink-0 px-4 py-4 md:block md:w-[320px] lg:px-5">
          <div className="sticky top-4 h-[calc(100vh-2rem)]">
            <DocsSidebar />
          </div>
        </div>

        <main className="min-w-0 flex-1 px-4 pb-8 pt-20 md:px-6 md:pb-10 md:pt-4 lg:px-8">
          <div className="glass-panel glass-panel-dark min-h-[calc(100vh-6rem)] overflow-hidden rounded-[28px] border border-white/50 bg-background/70 shadow-[0_24px_80px_rgba(2,8,23,0.10)] dark:border-white/10 dark:bg-background/55">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}