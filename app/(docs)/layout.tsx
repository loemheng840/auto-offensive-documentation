import DocsLayout from "@/components/document/shared/docs-layout";

/**
 * Shared layout for all doc pages.
 * DocsLayout (with both sidebars) mounts ONCE here and persists
 * across navigations — only {children} (the content) swaps.
 * This eliminates the full-page reload feel when clicking sidebar links.
 */
export default function DocsGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DocsLayout>{children}</DocsLayout>;
}
