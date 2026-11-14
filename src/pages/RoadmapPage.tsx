import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Lock,
  Flag,
  FlaskConical,
  Presentation,
  ArrowRight,
  Map,
} from 'lucide-react';
import {
  COURSE,
  CLUSTERS,
  APP_JOURNEY_STEPS,
  type ClusterId,
} from '../data/course';
import type { StudyProgressState } from '../state/useStudyStore';

interface RoadmapPageProps {
  state: StudyProgressState;
  onToggleDone: (weekId: number) => void;
  onNavigate: (to: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  state,
  onToggleDone,
  onNavigate,
}) => {
  const [clusterFilter, setClusterFilter] = useState<ClusterId | 'all'>('all');
  const [coFilter, setCoFilter] = useState<string>('all');
  const [onlyNotDone, setOnlyNotDone] = useState(false);
  const [onlyHasSims, setOnlyHasSims] = useState(false);
  const [onlyPublished, setOnlyPublished] = useState(false);

  const filteredWeeks = useMemo(() => {
    return COURSE.weeks.filter((w) => {
      if (clusterFilter !== 'all' && w.cluster !== clusterFilter) return false;
      if (coFilter !== 'all' && !w.co.includes(coFilter)) return false;
      if (onlyNotDone && state.doneWeeks.includes(w.id)) return false;
      if (onlyHasSims && w.labs.length === 0) return false;
      if (onlyPublished && w.status !== 'published') return false;
      return true;
    });
  }, [clusterFilter, coFilter, onlyNotDone, onlyHasSims, onlyPublished, state.doneWeeks]);

  const publishedDoneCount = COURSE.weeks.filter(
    (w) => w.status === 'published' && state.doneWeeks.includes(w.id)
  ).length;
  const publishedTotal = COURSE.weeks.filter((w) => w.status === 'published').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--tile-indigo)] uppercase tracking-wide">
            <Map className="w-4 h-4" />
            14-WEEK PROJECT & TOOLCHAIN ROADMAP
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
            Weekly Roadmap
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
            Weeks 1–6 cover the Flutter, REST, maps and Git toolchain from the lab decks. Weeks 7–14 track your team's project sprints and official milestones.
          </p>
        </div>

        <div className="portal-card rounded-2xl px-4 py-3 flex items-center gap-4 shrink-0">
          <div>
            <div className="text-[11px] font-mono text-[var(--text-muted)]">PUBLISHED PROGRESS</div>
            <div className="font-mono text-lg font-bold tabular-nums text-[var(--text)]">
              {publishedDoneCount} / {publishedTotal} Weeks Done
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="portal-card rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setClusterFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              clusterFilter === 'all'
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            All Clusters
          </button>
          {Object.values(CLUSTERS).map((c) => {
            const active = clusterFilter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setClusterFilter(c.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                style={{
                  borderColor: active ? `var(${c.colorVar})` : 'var(--border)',
                  backgroundColor: active
                    ? `color-mix(in srgb, var(${c.colorVar}) 14%, transparent)`
                    : 'var(--surface)',
                  color: active ? `var(${c.colorVar})` : 'var(--text-muted)',
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs pt-1 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[var(--text-muted)]">CO:</span>
            {['all', 'CO1', 'CO2', 'CO3', 'CO4'].map((co) => (
              <button
                key={co}
                type="button"
                onClick={() => setCoFilter(co)}
                className={`px-2 py-1 rounded-md font-mono font-semibold ${
                  coFilter === co
                    ? 'bg-[var(--primary-soft)] text-[var(--primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {co === 'all' ? 'All' : co}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer font-medium">
            <input type="checkbox" checked={onlyNotDone} onChange={(e) => setOnlyNotDone(e.target.checked)} className="accent-[var(--primary)]" />
            Not done yet
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer font-medium">
            <input type="checkbox" checked={onlyHasSims} onChange={(e) => setOnlyHasSims(e.target.checked)} className="accent-[var(--primary)]" />
            Has simulations
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer font-medium">
            <input type="checkbox" checked={onlyPublished} onChange={(e) => setOnlyPublished(e.target.checked)} className="accent-[var(--primary)]" />
            Published only
          </label>
        </div>
      </div>

      {/* 14-Stop Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWeeks.map((week) => {
          const cluster = CLUSTERS[week.cluster];
          const isDone = state.doneWeeks.includes(week.id);
          const isPublished = week.status === 'published';

          return (
            <article
              key={week.id}
              className={`portal-card rounded-2xl p-5 flex flex-col justify-between transition-all ${
                isPublished ? 'portal-card-hover' : 'opacity-85'
              }`}
            >
              <div>
                {/* Cluster strip & Meta row */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span
                      className="font-mono font-bold"
                      style={{ color: `var(${cluster.colorVar})` }}
                    >
                      {week.label} · {cluster.label}
                    </span>
                    <span className="text-[var(--text-muted)]">·</span>
                    <span className="font-mono text-[var(--text-muted)]">
                      {week.co.join(', ')}
                    </span>
                  </div>

                  {isPublished ? (
                    <button
                      type="button"
                      onClick={() => onToggleDone(week.id)}
                      aria-label={`Mark ${week.label} as ${isDone ? 'not done' : 'done'}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        isDone
                          ? 'bg-[var(--state-ok)] text-[var(--success)]'
                          : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                      {isDone ? 'Done' : 'Mark done'}
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-muted)]">
                      <Lock className="w-3.5 h-3.5" />
                      Coming soon
                    </span>
                  )}
                </div>

                {/* Milestone Flag if present */}
                {week.milestone && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--state-warn)] text-[var(--warning)] font-mono text-[11px] font-bold">
                    <Flag className="w-3 h-3" />
                    Milestone: {week.milestone}
                  </div>
                )}

                <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] mt-3">
                  {week.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1.5">
                  {week.summary}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-[var(--surface-2)]/60 text-xs">
                  <span className="font-bold text-[var(--primary)]">For your project: </span>
                  <span className="text-[var(--text)]">{week.forProject}</span>
                </div>

                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3 text-xs text-[var(--text-muted)]">
                  {week.topics.slice(0, 5).map((t, i) => (
                    <span key={t}>
                      {i > 0 && <span className="mr-2">·</span>}
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer stats & Open button */}
              <div className="mt-5 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-muted)] tabular-nums">
                  {week.deck && (
                    <span className="inline-flex items-center gap-1">
                      <Presentation className="w-3.5 h-3.5" />
                      {week.deck.slides} slides
                    </span>
                  )}
                  {week.labs.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {week.labs.length} sims
                    </span>
                  )}
                </div>

                {isPublished ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(`/week/${week.id}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
                  >
                    Open {week.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('/project')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)]"
                  >
                    View Project Hub
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Your app's journey ribbon */}
      <section className="portal-card rounded-2xl p-5 space-y-3">
        <div className="font-mono text-xs font-bold uppercase text-[var(--primary)]">
          Your App's Journey
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {APP_JOURNEY_STEPS.map((step, i) => {
            const w = COURSE.weeks.find((wk) => wk.id === step.week);
            const published = w?.status === 'published';
            return (
              <React.Fragment key={step.label}>
                {i > 0 && <span className="text-[var(--text-muted)] font-mono text-xs">→</span>}
                <button
                  type="button"
                  disabled={!published}
                  onClick={() => published && onNavigate(`/week/${step.week}`)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    published
                      ? 'border-[var(--primary)]/40 bg-[var(--primary-soft)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white'
                      : 'border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-muted)] cursor-default'
                  }`}
                >
                  {step.label} <span className="font-mono text-[10px]">(W{step.week})</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </div>
  );
};
