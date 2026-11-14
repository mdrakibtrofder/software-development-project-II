import React, { useState } from 'react';
import { Check, Copy, ExternalLink, Bookmark } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  lang?: 'dart' | 'bash' | 'yaml' | 'json' | 'xml';
  title?: string;
  explain?: string;
  slide?: number;
  bookmarkId?: string;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onOpenSlide?: () => void;
}

function highlightLine(line: string, lang: string): React.ReactNode {
  // Lightweight, deterministic syntax highlighter (no eval, safe React nodes)
  if (lang === 'bash') {
    const commentIdx = line.indexOf('#');
    const cmdPart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : '';
    return (
      <>
        <span className="text-sky-300">{cmdPart}</span>
        {commentPart && <span className="text-slate-400 italic">{commentPart}</span>}
      </>
    );
  }

  const commentIdx = line.indexOf('//');
  const codePart = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
  const commentPart = commentIdx >= 0 ? line.slice(commentIdx) : '';

  const tokenRegex =
    /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|\b(?:import|void|class|extends|implements|const|final|var|late|return|if|else|for|in|await|async|Future|factory|required|super|this|new|true|false|null|throw|try|catch|override)\b|\b[A-Z][A-Za-z0-9_]*\b|\b0x[0-9A-Fa-f]+\b|\b\d+(?:\.\d+)?\b)/g;

  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenRegex.exec(codePart)) !== null) {
    if (match.index > lastIdx) {
      nodes.push(codePart.slice(lastIdx, match.index));
    }
    const tok = match[0];
    let cls = 'text-slate-100';
    if (tok.startsWith("'") || tok.startsWith('"')) {
      cls = 'text-emerald-300';
    } else if (/^(import|void|class|extends|implements|const|final|var|late|return|if|else|for|in|await|async|factory|required|super|this|new|true|false|null|throw|try|catch|override)$/.test(tok)) {
      cls = 'text-violet-300 font-medium';
    } else if (/^[A-Z]/.test(tok)) {
      cls = 'text-sky-300';
    } else if (/^(0x|\d)/.test(tok)) {
      cls = 'text-amber-300';
    }
    nodes.push(
      <span key={key++} className={cls}>
        {tok}
      </span>
    );
    lastIdx = match.index + tok.length;
  }
  if (lastIdx < codePart.length) {
    nodes.push(codePart.slice(lastIdx));
  }

  return (
    <>
      {nodes}
      {commentPart && <span className="text-slate-400 italic">{commentPart}</span>}
    </>
  );
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  lang = 'dart',
  title,
  explain,
  slide,
  isBookmarked,
  onToggleBookmark,
  onOpenSlide,
}) => {
  const [copied, setCopied] = useState(false);
  const [dartPadMsg, setDartPadMsg] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored
    }
  };

  const handleOpenDartPad = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Ignore clipboard failure
    }
    setDartPadMsg(true);
    setTimeout(() => setDartPadMsg(false), 4500);
    window.open('https://dartpad.dev/', '_blank', 'noopener,noreferrer');
  };

  const lines = code.split('\n');

  return (
    <div className="rounded-2xl overflow-hidden border border-[#273244] bg-[#0F172A] text-slate-100 shadow-sm my-3">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#162033] border-b border-[#273244]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-mono text-xs uppercase tracking-wide text-indigo-300 font-semibold shrink-0">
            {lang}
          </span>
          {title && (
            <span className="text-xs font-medium text-slate-200 truncate">{title}</span>
          )}
          {slide && (
            <button
              type="button"
              onClick={onOpenSlide}
              className="font-mono text-[11px] text-sky-300 hover:text-sky-200 underline underline-offset-2 shrink-0"
            >
              Slide {slide}
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {onToggleBookmark && (
            <button
              type="button"
              onClick={onToggleBookmark}
              aria-label="Bookmark snippet"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                isBookmarked
                  ? 'text-amber-300 bg-amber-500/15'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          )}
          {lang === 'dart' && (
            <button
              type="button"
              onClick={handleOpenDartPad}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-200 hover:bg-indigo-500/30 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open DartPad
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/10 text-slate-200 hover:bg-white/15 transition-colors whitespace-nowrap"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {dartPadMsg && (
        <div className="px-4 py-1.5 bg-indigo-950/90 text-indigo-200 text-xs border-b border-indigo-800/60" role="status">
          Code copied. Paste it into DartPad to run or experiment.
        </div>
      )}

      <div className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <pre className="m-0">
          <code>
            {lines.map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-right select-none text-slate-500 text-xs tabular-nums w-7">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">{highlightLine(line, lang)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {explain && (
        <div className="px-4 py-2 bg-[#131C2E] border-t border-[#273244] text-xs text-slate-300">
          {explain}
        </div>
      )}
    </div>
  );
};
