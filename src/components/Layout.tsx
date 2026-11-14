import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Search,
  Bookmark,
  Moon,
  Sun,
  Home,
  Map,
  FileText,
  CheckSquare,
  MoreHorizontal,
  Sparkles,
  ArrowUp,
  ChevronDown,
  FolderKanban,
  Info,
  RotateCcw,
  X,
  Presentation,
  FlaskConical,
  BookOpen,
} from 'lucide-react';
import { COURSE } from '../data/course';
import type { ParsedRoute } from '../state/useHashRoute';

interface LayoutProps {
  route: ParsedRoute;
  theme: 'light' | 'dark';
  bookmarkCount: number;
  onNavigate: (to: string) => void;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onResetProgress: () => void;
  children: React.ReactNode;
}

const PRIMARY_NAV = [
  { label: 'Home', to: '/', match: (p: string) => p === '/' },
  { label: 'Roadmap', to: '/weeks', match: (p: string) => p === '/weeks' || p.startsWith('/week/') },
  { label: 'Slides', to: '/slides', match: (p: string) => p === '/slides' },
  { label: 'Notes', to: '/notes', match: (p: string) => p === '/notes' || p.startsWith('/note/') },
  { label: 'Visualizations', to: '/labs', match: (p: string) => p === '/labs' || p.startsWith('/lab/') },
  { label: 'Glossary', to: '/glossary', match: (p: string) => p === '/glossary' },
  { label: 'MCQ', to: '/mcq', match: (p: string) => p === '/mcq' },
];

export const Layout: React.FC<LayoutProps> = ({
  route,
  theme,
  bookmarkCount,
  onNavigate,
  onToggleTheme,
  onOpenSearch,
  onOpenBookmarks,
  onResetProgress,
  children,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
    setFabOpen(false);
  }, [route.path]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenSearch]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      {/* Sticky Top Bar */}
      <header className="no-print sticky top-0 z-40 h-[72px] bg-[var(--surface)]/95 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-[1360px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Logo + Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 text-left group"
          >
            <span className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-xs group-hover:scale-[1.03] transition-transform">
              <Smartphone className="w-5 h-5" />
            </span>
            <span className="font-bold text-base sm:text-lg tracking-tight text-[var(--text)]">
              {COURSE.shortMark}
            </span>
          </button>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary navigation">
            {PRIMARY_NAV.map((item) => {
              const active = item.match(route.path);
              return (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => onNavigate(item.to)}
                  className={`relative py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[var(--primary)]"
                    />
                  )}
                </button>
              );
            })}

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className={`inline-flex items-center gap-1 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  route.path === '/project' || route.path === '/about'
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                More
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {moreOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => onNavigate('/project')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-2)] text-left"
                  >
                    <FolderKanban className="w-4 h-4 text-[var(--primary)]" />
                    Project Hub & Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/about')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-[var(--text)] hover:bg-[var(--surface-2)] text-left"
                  >
                    <Info className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    Course Info & Outline
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Search pill + Bookmarks + Theme toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open global search"
              className="inline-flex items-center gap-2.5 h-10 px-3 sm:px-3.5 rounded-full bg-[var(--surface-2)] border border-[var(--border)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/50 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-[10px] text-[var(--text-muted)]">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={onOpenBookmarks}
              aria-label={`Bookmarks (${bookmarkCount})`}
              className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/50 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--primary)] text-white font-mono text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/50 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-8 py-6 sm:py-10 pb-24 lg:pb-14">
        {children}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-[var(--border)] bg-[var(--surface)] py-8 pb-24 lg:pb-10">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div>
            <div className="font-semibold text-[var(--text)]">
              {COURSE.code} · {COURSE.title} ({COURSE.semester})
            </div>
            <div className="mt-1">
              {COURSE.department}, BAUST · <span className="italic">Discipline · Knowledge · Morality</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/project')}
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              Project Hub
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/about')}
              className="font-semibold text-[var(--text)] hover:text-[var(--primary)]"
            >
              Course Info
            </button>
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--danger)]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset my progress
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--state-bad)] text-[var(--danger)] font-medium">
                Clear all local progress?
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                  }}
                  className="underline font-bold"
                >
                  Yes, reset
                </button>
                <button type="button" onClick={() => setConfirmReset(false)} className="underline">
                  Cancel
                </button>
              </span>
            )}
          </div>
        </div>
      </footer>

      {/* Floating Action Button (bottom-right) */}
      <div className="no-print fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        {fabOpen && (
          <div className="mb-3 w-56 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-2 space-y-1">
            <div className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Quick Jump
            </div>
            <div className="grid grid-cols-3 gap-1 px-1.5 pb-1.5">
              {[1, 2, 3, 4, 5, 6].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => onNavigate(`/week/${w}`)}
                  className="py-1.5 rounded-lg bg-[var(--surface-2)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] font-mono text-xs font-semibold"
                >
                  Wk {w}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/project')}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--surface-2)] text-left"
            >
              <FolderKanban className="w-3.5 h-3.5 text-[var(--primary)]" />
              Project Hub
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenBookmarks();
                setFabOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--surface-2)] text-left"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              Bookmarks ({bookmarkCount})
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--surface-2)] text-left"
            >
              {theme === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              {theme === 'light' ? 'Dark theme' : 'Light theme'}
            </button>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setFabOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--surface-2)] text-left"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Back to top
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setFabOpen((v) => !v)}
          aria-label="Quick study tools"
          className="w-13 h-13 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-lg flex items-center justify-center text-[var(--text)] hover:border-[var(--primary)] hover:scale-105 transition-all"
        >
          {fabOpen ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-[var(--primary)]" />}
        </button>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile navigation"
        className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] flex items-center justify-around px-2"
      >
        {[
          { label: 'Home', to: '/', icon: Home, match: (p: string) => p === '/' },
          { label: 'Roadmap', to: '/weeks', icon: Map, match: (p: string) => p === '/weeks' || p.startsWith('/week/') },
          { label: 'Notes', to: '/notes', icon: FileText, match: (p: string) => p === '/notes' || p.startsWith('/note/') },
          { label: 'MCQ', to: '/mcq', icon: CheckSquare, match: (p: string) => p === '/mcq' },
        ].map((item) => {
          const Icon = item.icon;
          const active = item.match(route.path);
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => onNavigate(item.to)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1.5 rounded-xl text-[11px] font-semibold ${
                active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1.5 rounded-xl text-[11px] font-semibold ${
            moreOpen ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <MoreHorizontal className="w-5 h-5" />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile More Sheet */}
      {moreOpen && (
        <div
          className="no-print lg:hidden fixed inset-0 z-50 bg-slate-950/45 flex items-end"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="w-full rounded-t-3xl bg-[var(--surface)] border-t border-[var(--border)] p-5 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="font-bold text-sm text-[var(--text)]">All Study Sections</span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="p-1.5 rounded-lg text-[var(--text-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { label: 'Slides', to: '/slides', icon: Presentation },
                { label: 'Visualizations', to: '/labs', icon: FlaskConical },
                { label: 'Glossary', to: '/glossary', icon: BookOpen },
                { label: 'Project Hub', to: '/project', icon: FolderKanban },
                { label: 'Course Info', to: '/about', icon: Info },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.to}
                    type="button"
                    onClick={() => onNavigate(m.to)}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50 text-xs font-semibold text-[var(--text)]"
                  >
                    <Icon className="w-4 h-4 text-[var(--primary)]" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
