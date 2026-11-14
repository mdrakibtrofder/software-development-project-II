import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Search, Bookmark } from 'lucide-react';
import { CLUSTERS, type ClusterId } from '../data/course';
import { GLOSSARY } from '../data/glossary';
import type { BookmarkItem } from '../state/useStudyStore';

interface GlossaryPageProps {
  initialTermId?: string;
  onNavigate: (to: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({
  initialTermId,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [query, setQuery] = useState('');
  const [clusterFilter, setClusterFilter] = useState<ClusterId | 'all'>('all');

  useEffect(() => {
    if (initialTermId) {
      const el = document.getElementById(`term-${initialTermId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [initialTermId]);

  const sortedTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...GLOSSARY]
      .filter((t) => {
        if (clusterFilter !== 'all' && t.cluster !== clusterFilter) return false;
        if (!q) return true;
        return `${t.term} ${t.definition} ${t.example || ''}`.toLowerCase().includes(q);
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [query, clusterFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--tile-teal)] uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            A–Z REFERENCE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
            Course Glossary
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
            Every key term across Flutter, Dart, REST APIs, Open-Meteo, maps, VS Code, Git and Agile sprints.
          </p>
        </div>

        <span
          className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold tabular-nums"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--tile-teal) 12%, transparent)',
            color: 'var(--tile-teal)',
          }}
        >
          {GLOSSARY.length} Terms
        </span>
      </div>

      {/* Search & Cluster Filter */}
      <div className="portal-card rounded-2xl p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter terms (e.g. setState, FutureBuilder, 0xAARRGGBB, git, LatLng)..."
            aria-label="Filter glossary terms"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setClusterFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold border ${
              clusterFilter === 'all'
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            All ({GLOSSARY.length})
          </button>
          {Object.values(CLUSTERS)
            .filter((c) => c.id !== 'final')
            .map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setClusterFilter(c.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold border ${
                  clusterFilter === c.id
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {c.label}
              </button>
            ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTerms.map((item) => {
          const cluster = CLUSTERS[item.cluster];
          const bId = `term-${item.id}`;
          const saved = isBookmarked(bId);
          const highlighted = initialTermId === item.id;

          return (
            <article
              key={item.id}
              id={`term-${item.id}`}
              className={`portal-card rounded-2xl p-5 space-y-2.5 transition-all ${
                highlighted ? 'ring-2 ring-[var(--primary)]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span
                    className="font-mono text-[11px] font-bold"
                    style={{ color: `var(${cluster.colorVar})` }}
                  >
                    {cluster.label} · Week{item.weeks.length > 1 ? 's' : ''} {item.weeks.join(', ')}
                  </span>
                  <h2 className="text-lg font-bold text-[var(--text)] mt-0.5">{item.term}</h2>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onToggleBookmark({
                      id: bId,
                      kind: 'term',
                      title: item.term,
                      subtitle: cluster.label,
                      route: `/glossary?term=${item.id}`,
                    })
                  }
                  aria-label={`Bookmark ${item.term}`}
                  className={`p-1.5 rounded-lg border ${
                    saved
                      ? 'border-amber-400 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                      : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <p className="text-sm text-[var(--text)]">{item.definition}</p>

              {item.example && (
                <div className="px-3 py-2 rounded-xl bg-[var(--surface-2)] font-mono text-xs text-[var(--primary)]">
                  Example: {item.example}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--border)] text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {item.weeks.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => onNavigate(`/week/${w}`)}
                      className="font-mono text-[11px] text-[var(--primary)] hover:underline"
                    >
                      Week {w}
                    </button>
                  ))}
                </div>

                {item.related && item.related.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <span>Related:</span>
                    {item.related.map((rId) => {
                      const rel = GLOSSARY.find((g) => g.id === rId);
                      if (!rel) return null;
                      return (
                        <button
                          key={rId}
                          type="button"
                          onClick={() => onNavigate(`/glossary?term=${rId}`)}
                          className="underline hover:text-[var(--primary)]"
                        >
                          {rel.term}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
