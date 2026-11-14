import React, { useState, useMemo, useEffect } from 'react';
import { FlaskConical, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { CLUSTERS, type ClusterId } from '../data/course';
import { LABS } from '../data/labs';
import { SimRenderer } from '../components/sims/SimRenderer';
import type { BookmarkItem, StudyProgressState } from '../state/useStudyStore';

interface LabsPageProps {
  labId?: string;
  state: StudyProgressState;
  onNavigate: (to: string) => void;
  onMarkLabCompleted: (id: string) => void;
  onRecordVisitedLab: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const LabsPage: React.FC<LabsPageProps> = ({
  labId,
  state,
  onNavigate,
  onMarkLabCompleted,
  onRecordVisitedLab,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [weekFilter, setWeekFilter] = useState<number | 'all'>('all');
  const [clusterFilter, setClusterFilter] = useState<ClusterId | 'all'>('all');

  useEffect(() => {
    if (labId) onRecordVisitedLab(labId);
  }, [labId, onRecordVisitedLab]);

  const filtered = useMemo(() => {
    return LABS.filter((l) => {
      if (weekFilter !== 'all' && l.week !== weekFilter) return false;
      if (clusterFilter !== 'all' && l.cluster !== clusterFilter) return false;
      return true;
    });
  }, [weekFilter, clusterFilter]);

  if (labId) {
    const meta = LABS.find((l) => l.id === labId);
    if (!meta) {
      return (
        <div className="portal-card rounded-2xl p-8 text-center">
          <h1 className="text-xl font-bold">Simulation not found</h1>
          <button
            type="button"
            onClick={() => onNavigate('/labs')}
            className="mt-4 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold"
          >
            Back to Visualizations
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/labs')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)]"
          >
            <ChevronLeft className="w-4 h-4" />
            All {LABS.length} Simulations
          </button>
          <button
            type="button"
            onClick={() => onNavigate(`/week/${meta.week}?page=${meta.slide}`)}
            className="text-xs font-semibold text-[var(--primary)] hover:underline"
          >
            Open Week {meta.week} · Slide {meta.slide}
          </button>
        </div>

        <SimRenderer
          labId={labId}
          isCompleted={state.completedLabs.includes(labId)}
          onComplete={() => onMarkLabCompleted(labId)}
          onNavigate={onNavigate}
          isBookmarked={isBookmarked(`lab-${labId}`)}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--tile-green)] uppercase tracking-wide">
            <FlaskConical className="w-4 h-4" />
            VISUALIZATIONS · INTERACTIVE SANDBOXES
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
            20 Interactive Simulations
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
            Do what the slides describe: fix a doctor report, build a widget tree, watch setState, decode ARGB hex colours, inspect REST endpoints, zoom maps and practise Git workflows.
          </p>
        </div>
        <span
          className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold tabular-nums"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--tile-green) 12%, transparent)',
            color: 'var(--tile-green)',
          }}
        >
          {state.completedLabs.length} / {LABS.length} Completed
        </span>
      </div>

      {/* Filters */}
      <div className="portal-card rounded-2xl p-4 flex flex-wrap items-center gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[var(--text-muted)] mr-1">Week:</span>
          {(['all', 1, 2, 3, 4, 5, 6] as const).map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeekFilter(w)}
              className={`px-2.5 py-1 rounded-lg font-mono font-semibold border ${
                weekFilter === w
                  ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
              }`}
            >
              {w === 'all' ? 'All' : `W${w}`}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[var(--text-muted)] mr-1">Cluster:</span>
          {(['all', 'setup', 'ui', 'network', 'maps', 'tools'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setClusterFilter(c)}
              className={`px-2.5 py-1 rounded-lg font-semibold border ${
                clusterFilter === c
                  ? 'bg-[var(--primary-soft)] text-[var(--primary)] border-[var(--primary)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
              }`}
            >
              {c === 'all' ? 'All' : CLUSTERS[c].label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((lab) => {
          const cluster = CLUSTERS[lab.cluster];
          const done = state.completedLabs.includes(lab.id);
          return (
            <article
              key={lab.id}
              className="portal-card portal-card-hover rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono">
                  <span
                    className="font-bold"
                    style={{ color: `var(${cluster.colorVar})` }}
                  >
                    Week {lab.week} · {cluster.label}
                  </span>
                  {done && (
                    <span className="inline-flex items-center gap-1 text-[var(--success)] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-[var(--text)] mt-2">{lab.title}</h2>
                <div className="font-mono text-[11px] text-[var(--primary)] mt-0.5">
                  {lab.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2">
                  {lab.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate(`/week/${lab.week}?page=${lab.slide}`)}
                  className="font-mono text-xs text-[var(--text-muted)] hover:text-[var(--primary)]"
                >
                  Slide {lab.slide}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(`/lab/${lab.id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
                >
                  Launch
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
