'use client';

import React from 'react';

/**
 * Factory that creates a lazy-loaded document client component.
 * Uses React.lazy + Suspense with no fallback — zero loading UI,
 * navigation between doc pages is instant with no flash.
 */
export function makeDocClient(
    loader: () => Promise<{ default: React.ComponentType }>
) {
    const DocComponent = React.lazy(loader);

    return function DocClient() {
        return (
            <React.Suspense fallback={null}>
                <DocComponent />
            </React.Suspense>
        );
    };
}
