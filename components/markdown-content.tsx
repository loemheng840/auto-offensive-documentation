'use client';

import { useMemo } from 'react';

interface MarkdownContentProps {
  content: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const html = useMemo(() => {
    let text = content;

    // Escape HTML special characters first
    const escapeHtml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    // Process code blocks FIRST (before other replacements)
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const codeBlocks: string[] = [];
    text = text.replace(codeBlockRegex, (match, code) => {
      const escapedCode = escapeHtml(code.trim());
      codeBlocks.push(escapedCode);
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // Headers with IDs - must be at start of line
    text = text.replace(/^### (.+)$/gm, (match, title) => {
      const id = slugify(title);
      return `__H3_START_${id}__${title}__H3_END__`;
    });

    text = text.replace(/^## (.+)$/gm, (match, title) => {
      const id = slugify(title);
      return `__H2_START_${id}__${title}__H2_END__`;
    });

    text = text.replace(/^# (.+)$/gm, '__H1_START__$1__H1_END__');

    // Bold (must be before italic)
    text = text.replace(/\*\*(.+?)\*\*/g, '__BOLD_START__$1__BOLD_END__');

    // Italic
    text = text.replace(/\*(.+?)\*/g, '__ITALIC_START__$1__ITALIC_END__');

    // Inline code
    text = text.replace(/`([^`]+)`/g, '__CODE_START__$1__CODE_END__');

    // Links - handle both markdown [text](url) and doc references
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '__LINK_START__$1__LINK_SEP__$2__LINK_END__');

    // Blockquotes
    text = text.replace(/^> (.+)$/gm, '__QUOTE_START__$1__QUOTE_END__');

    // Lists - unordered
    text = text.replace(/^\s*[-*] (.+)$/gm, '__LI_ITEM__$1__LI_END__');

    // Lists - ordered
    text = text.replace(/^\s*\d+\. (.+)$/gm, '__OLI_ITEM__$1__OLI_END__');

    // Now build the final HTML
    let html = '';
    const lines = text.split('\n');
    let inUL = false;
    let inOL = false;
    let currentParagraph = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        continue;
      }

      // Headers
      if (line.includes('__H1_START__')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        const match = line.match(/__H1_START__(.+?)__H1_END__/);
        if (match) {
          html += `<h1>${match[1]}</h1>`;
        }
        continue;
      }

      if (line.includes('__H2_START_')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        const match = line.match(/__H2_START_(.+?)__(.+?)__H2_END__/);
        if (match) {
          html += `<h2 id="${match[1]}">${match[2]}</h2>`;
        }
        continue;
      }

      if (line.includes('__H3_START_')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        const match = line.match(/__H3_START_(.+?)__(.+?)__H3_END__/);
        if (match) {
          html += `<h3 id="${match[1]}">${match[2]}</h3>`;
        }
        continue;
      }

      // Lists
      if (line.includes('__LI_ITEM__')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        if (inOL) {
          html += '</ol>';
          inOL = false;
        }
        if (!inUL) {
          html += '<ul>';
          inUL = true;
        }
        const match = line.match(/__LI_ITEM__(.+?)__LI_END__/);
        if (match) {
          html += `<li>${formatInline(match[1])}</li>`;
        }
        continue;
      }

      if (line.includes('__OLI_ITEM__')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        if (inUL) {
          html += '</ul>';
          inUL = false;
        }
        if (!inOL) {
          html += '<ol>';
          inOL = true;
        }
        const match = line.match(/__OLI_ITEM__(.+?)__OLI_END__/);
        if (match) {
          html += `<li>${formatInline(match[1])}</li>`;
        }
        continue;
      }

      // Blockquotes
      if (line.includes('__QUOTE_START__')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        if (inUL) {
          html += '</ul>';
          inUL = false;
        }
        if (inOL) {
          html += '</ol>';
          inOL = false;
        }
        const match = line.match(/__QUOTE_START__(.+?)__QUOTE_END__/);
        if (match) {
          html += `<blockquote>${formatInline(match[1])}</blockquote>`;
        }
        continue;
      }

      // Code blocks
      if (line.includes('__CODE_BLOCK_')) {
        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>`;
          currentParagraph = '';
        }
        if (inUL) {
          html += '</ul>';
          inUL = false;
        }
        if (inOL) {
          html += '</ol>';
          inOL = false;
        }
        const match = line.match(/__CODE_BLOCK_(\d+)__/);
        if (match) {
          const blockIndex = parseInt(match[1]);
          html += `<pre><code>${codeBlocks[blockIndex]}</code></pre>`;
        }
        continue;
      }

      // Regular paragraph
      if (currentParagraph) {
        currentParagraph += ' ';
      }
      currentParagraph += formatInline(line);
    }

    if (currentParagraph) {
      html += `<p>${currentParagraph}</p>`;
    }
    if (inUL) {
      html += '</ul>';
    }
    if (inOL) {
      html += '</ol>';
    }

    return html;
  }, [content]);

  function formatInline(text: string): string {
    // Bold
    text = text.replace(/__BOLD_START__(.+?)__BOLD_END__/g, '<strong>$1</strong>');

    // Italic
    text = text.replace(/__ITALIC_START__(.+?)__ITALIC_END__/g, '<em>$1</em>');

    // Inline code
    text = text.replace(/__CODE_START__(.+?)__CODE_END__/g, '<code>$1</code>');

    // Links
    text = text.replace(
      /__LINK_START__(.+?)__LINK_SEP__(.+?)__LINK_END__/g,
      (match, linkText, url) => {
        const href =
          !url.includes('http') && !url.startsWith('/')
            ? `/docs/${url}`
            : url;
        const target =
          url.includes('http') || url.includes('example.com')
            ? ' target="_blank" rel="noopener noreferrer"'
            : '';
        return `<a href="${href}"${target}>${linkText}</a>`;
      }
    );

    return text;
  }

  return (
    <div className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
