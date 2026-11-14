import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  Presentation,
  Bookmark,
} from 'lucide-react';
import { CLUSTERS } from '../../data/course';
import { LABS } from '../../data/labs';
import type { BookmarkItem } from '../../state/useStudyStore';

interface SimWrapperProps {
  labId: string;
  caption: string;
  step?: number;
  totalSteps?: number;
  onStepChange?: (next: number) => void;
  onReset?: () => void;
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
  children: React.ReactNode;
}

export const SimWrapper: React.FC<SimWrapperProps> = ({
  labId,
  caption,
  step = 0,
  totalSteps = 0,
  onStepChange,
  onReset,
  onComplete,
  isCompleted,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
  children,
}) => {
  const meta = LABS.find((l) => l.id === labId);
  const cluster = meta ? CLUSTERS[meta.cluster] : CLUSTERS.setup;
  const [playing, setPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(650);

  useEffect(() => {
    if (!playing || !onStepChange || totalSteps <= 1) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      onStepChange(step + 1 >= totalSteps ? 0 : step + 1);
    }, speedMs);
    return () => clearInterval(timer);
  }, [playing, step, totalSteps, speedMs, onStepChange]);

  if (!meta) return null;

  return (
    <section
      aria-label={meta.title}
      className="portal-card rounded-2xl overflow-hidden my-4"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-2)]/50">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className="font-mono font-semibold"
              style={{ color: `var(${cluster.colorVar})` }}
            >
              Week {meta.week} · {cluster.label}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="font-mono text-[var(--text-muted)]">{meta.subtitle}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--text)] mt-0.5">
            {meta.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate(`/week/${meta.week}?page=${meta.slide}`)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
            >
              <Presentation className="w-3.5 h-3.5" />
              Slide {meta.slide}
            </button>
          )}
          {onToggleBookmark && (
            <button
              type="button"
              onClick={() =>
                onToggleBookmark({
                  id: `lab-${meta.id}`,
                  kind: 'lab',
                  title: meta.title,
                  subtitle: `Week ${meta.week}`,
                  route: `/lab/${meta.id}`,
                })
              }
              aria-label={`Bookmark ${meta.title}`}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                isBookmarked
                  ? 'border-amber-400 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          )}
          {onComplete && (
            <button
              type="button"
              onClick={onComplete}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isCompleted
                  ? 'bg-[var(--state-ok)] text-[var(--success)]'
                  : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Mark done'}
            </button>
          )}
        </div>
      </div>

      {/* Interactive Stage */}
      <div className="p-4 sm:p-5">{children}</div>

      {/* Caption & Playback Bar */}
      <div className="px-4 sm:px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-2)]/40 flex flex-wrap items-center justify-between gap-3">
        <p
          aria-live="polite"
          className="text-xs sm:text-sm font-medium text-[var(--text)] flex-1 min-w-[220px]"
        >
          {caption}
        </p>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onStepChange && totalSteps > 1 && (
            <>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  onStepChange(Math.max(0, step - 1));
                }}
                aria-label="Previous step"
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)]"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause simulation' : 'Play simulation'}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {playing ? 'Pause' : 'Play'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlaying(false);
                  onStepChange((step + 1) % totalSteps);
                }}
                aria-label="Next step"
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)]"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs tabular-nums text-[var(--text-muted)] px-1">
                {step + 1}/{totalSteps}
              </span>
              <label className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-mono">
                <span>Speed</span>
                <input
                  type="range"
                  min={300}
                  max={1200}
                  step={100}
                  value={1500 - speedMs}
                  onChange={(e) => setSpeedMs(1500 - Number(e.target.value))}
                  aria-label="Playback speed"
                  className="w-16 accent-[var(--primary)]"
                />
              </label>
            </>
          )}
          {onReset && (
            <button
              type="button"
              onClick={() => {
                setPlaying(false);
                onReset();
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
