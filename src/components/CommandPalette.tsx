import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, FileText, FlaskConical, BookOpen, Code2, Layers, Terminal } from 'lucide-react';
import { COURSE } from '../data/course';
import { GLOSSARY } from '../data/glossary';
import { LABS } from '../data/labs';
import { SNIPPETS } from '../data/snippets';

interface SearchEntry {
  id: string;
  group: 'Decks' | 'Slides' | 'Simulations' | 'Glossary' | 'Code & Commands' | 'HTTP Codes';
  title: string;
  subtitle: string;
  route: string;
  keywords: string;
}

const HTTP_QUICK_ENTRIES: SearchEntry[] = [
  { id: 'http-200', group: 'HTTP Codes', title: '200 OK', subtitle: 'Request succeeded (GET, PUT/PATCH)', route: '/lab/http-lab', keywords: '200 ok success http status' },
  { id: 'http-201', group: 'HTTP Codes', title: '201 Created', subtitle: 'Resource created after POST', route: '/lab/http-lab', keywords: '201 created post status' },
  { id: 'http-400', group: 'HTTP Codes', title: '400 Bad Request', subtitle: 'Malformed body or invalid parameters (client error)', route: '/lab/http-lab', keywords: '400 bad request client error' },
  { id: 'http-401', group: 'HTTP Codes', title: '401 Unauthorized', subtitle: 'Missing or invalid API key / authentication', route: '/lab/http-lab', keywords: '401 unauthorized api key auth' },
  { id: 'http-404', group: 'HTTP Codes', title: '404 Not Found', subtitle: 'Endpoint URL or resource does not exist', route: '/lab/http-lab', keywords: '404 not found missing url' },
  { id: 'http-500', group: 'HTTP Codes', title: '500 Server Error', subtitle: 'Server failed while handling the request (5xx)', route: '/lab/http-lab', keywords: '500 internal server error 5xx' },
];

const COMMAND_QUICK_ENTRIES: SearchEntry[] = [
  { id: 'cmd-doctor', group: 'Code & Commands', title: 'flutter doctor', subtitle: 'Check SDK, Android toolchain and device status', route: '/lab/flutter-doctor', keywords: 'flutter doctor --android-licenses cmdline-tools' },
  { id: 'cmd-chrome', group: 'Code & Commands', title: 'flutter run -d chrome', subtitle: 'Run Flutter app in Chrome without an emulator', route: '/lab/shortcuts', keywords: 'flutter run -d chrome web' },
  { id: 'cmd-switch', group: 'Code & Commands', title: 'git switch -c <branch>', subtitle: 'Create and switch to a new Git branch (e.g. lab6/roll)', route: '/lab/git-lab', keywords: 'git switch -c branch add commit push' },
  { id: 'cmd-global-find', group: 'Code & Commands', title: 'Ctrl+Shift+F / Ctrl+Shift+H', subtitle: 'Global search and replace across all project files', route: '/lab/shortcuts', keywords: 'ctrl+shift+f ctrl+shift+h vscode search replace' },
];

export const CommandPalette: React.FC<{
  open: boolean;
  onClose: () => void;
  onNavigate: (to: string) => void;
}> = ({ open, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allEntries = useMemo<SearchEntry[]>(() => {
    const entries: SearchEntry[] = [];

    COURSE.weeks
      .filter((w) => w.status === 'published')
      .forEach((w) => {
        entries.push({
          id: `w-${w.id}`,
          group: 'Decks',
          title: `${w.label}: ${w.title}`,
          subtitle: `${w.deck?.slides ?? 0} slides · ${w.topics.slice(0, 3).join(', ')}`,
          route: `/week/${w.id}`,
          keywords: `${w.label} ${w.title} ${w.summary} ${w.topics.join(' ')}`,
        });
      w.slideMap?.forEach((s) => {
        entries.push({
          id: `s-${w.id}-${s.page}`,
          group: 'Slides',
          title: `W${w.id} Slide ${s.page}: ${s.title}`,
          subtitle: w.title,
          route: `/week/${w.id}?page=${s.page}`,
          keywords: `${w.label} slide ${s.page} ${s.title}`,
        });
      });
    });

    LABS.forEach((l) => {
      entries.push({
        id: `lab-${l.id}`,
        group: 'Simulations',
        title: l.title,
        subtitle: `Week ${l.week} · ${l.subtitle}`,
        route: `/lab/${l.id}`,
        keywords: `${l.id} ${l.title} ${l.subtitle} ${l.description}`,
      });
    });

    GLOSSARY.forEach((g) => {
      entries.push({
        id: `g-${g.id}`,
        group: 'Glossary',
        title: g.term,
        subtitle: g.definition,
        route: `/glossary?term=${g.id}`,
        keywords: `${g.term} ${g.definition} ${g.example || ''}`,
      });
    });

    SNIPPETS.forEach((sn) => {
      entries.push({
        id: `sn-${sn.id}`,
        group: 'Code & Commands',
        title: sn.title,
        subtitle: `Week ${sn.week} · Slide ${sn.slide} · ${sn.lang}`,
        route: `/week/${sn.week}?page=${sn.slide}&tab=code`,
        keywords: `${sn.title} ${sn.explain} ${sn.code}`,
      });
    });

    entries.push(...COMMAND_QUICK_ENTRIES, ...HTTP_QUICK_ENTRIES);
    return entries;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        ...allEntries.filter((e) => e.group === 'Decks').slice(0, 4),
        ...allEntries.filter((e) => e.group === 'Simulations').slice(0, 4),
      ];
    }
    const tokens = q.split(/\s+/);
    return allEntries
      .filter((item) => {
        const hay = `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase();
        return tokens.every((t) => hay.includes(t));
      })
      .slice(0, 24);
  }, [query, allEntries]);

  useEffect(() => {
    if (open) {
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter' && results[selectedIdx]) {
        e.preventDefault();
        onNavigate(results[selectedIdx].route);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, selectedIdx, onNavigate, onClose]);

  if (!open) return null;

  const groupIcon = (group: SearchEntry['group']) => {
    switch (group) {
      case 'Decks':
        return <Layers className="w-4 h-4 text-indigo-500" />;
      case 'Slides':
        return <FileText className="w-4 h-4 text-sky-500" />;
      case 'Simulations':
        return <FlaskConical className="w-4 h-4 text-emerald-500" />;
      case 'Glossary':
        return <BookOpen className="w-4 h-4 text-teal-500" />;
      case 'HTTP Codes':
        return <Terminal className="w-4 h-4 text-amber-500" />;
      default:
        return <Code2 className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
          <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIdx(0);
            }}
            placeholder="Search weeks, setState, FutureBuilder, Uri.https, flutter doctor, 404..."
            className="w-full bg-transparent text-sm sm:text-base text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-sm text-[var(--text-muted)]">
              No matching topics, commands, or terms found for "{query}".
            </div>
          ) : (
            results.map((item, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    active ? 'bg-[var(--primary-soft)]' : 'hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 shrink-0">{groupIcon(item.group)}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--text)] truncate">
                          {item.title}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0">
                          {item.group}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-2)] border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] font-mono">
          <span>↑ ↓ navigate · Enter open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
};
