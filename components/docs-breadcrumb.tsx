import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface DocsBreadcrumbProps {
  categoryTitle: string;
  categorySlug: string;
  docTitle: string;
}

export function DocsBreadcrumb({
  categoryTitle,
  categorySlug,
  docTitle,
}: DocsBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <Link
        href="/docs"
        className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-background/70 px-3 py-1.5 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground dark:border-white/10 dark:bg-white/[0.03]"
      >
        <Home className="h-3.5 w-3.5" />
        Docs
      </Link>

      <ChevronRight className="h-4 w-4 text-muted-foreground/70" />

      <Link
        href={`/docs?category=${categorySlug}`}
        className="rounded-full border border-transparent px-2 py-1 text-muted-foreground transition-colors hover:border-border hover:bg-background/70 hover:text-foreground dark:hover:bg-white/[0.03]"
      >
        {categoryTitle}
      </Link>

      <ChevronRight className="h-4 w-4 text-muted-foreground/70" />

      <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary dark:bg-primary/15">
        {docTitle}
      </span>
    </div>
  );
}