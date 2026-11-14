import React from 'react';
import { Presentation, ArrowRight, Code2, Info } from 'lucide-react';
import { COURSE, CLUSTERS } from '../data/course';

interface SlidesPageProps {
  onNavigate: (to: string) => void;
}

export const SlidesPage: React.FC<SlidesPageProps> = ({ onNavigate }) => {
  const publishedWeeks = COURSE.weeks.filter((w) => w.status === 'published' && w.deck);
  const totalSlides = publishedWeeks.reduce((sum, w) => sum + (w.deck?.slides || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">
          <Presentation className="w-4 h-4" />
          SLIDE DECKS · {publishedWeeks.length} DECKS · {totalSlides} SLIDES
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
          Course Slides & Code Decks
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
          Open any week's interactive slide index, view the extracted Dart/CLI code blocks, or download PPTX and PDF copies once attached.
        </p>
      </div>

      <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--primary-soft)]/60 flex items-start gap-3 text-xs sm:text-sm text-[var(--text)]">
        <Info className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <div>
          <strong>Instructor attachment ready:</strong> Slide outlines, physical page maps, code snippets and linked simulations are active now. When you drop the PDF and PPTX decks into <code className="font-mono">public/assets/slides/pdf/</code> and <code className="font-mono">pptx/</code>, the viewer and download buttons activate automatically.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {publishedWeeks.map((week) => {
          const cluster = CLUSTERS[week.cluster];
          return (
            <article
              key={week.id}
              className="portal-card portal-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Preview Header */}
                <div
                  className="p-5 border-b border-[var(--border)] bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface)]"
                  style={{
                    borderTop: `4px solid var(${cluster.colorVar})`,
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className="font-bold"
                      style={{ color: `var(${cluster.colorVar})` }}
                    >
                      {week.label} · {cluster.label}
                    </span>
                    <span className="text-[var(--text-muted)] tabular-nums">
                      {week.deck?.slides} slides · {week.deck?.size}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[var(--text)] mt-2.5 leading-snug">
                    {week.title}
                  </h2>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-2">
                    {week.summary}
                  </p>

                  {week.slideMap && (
                    <div className="text-xs text-[var(--text-muted)] space-y-1">
                      <div className="font-mono text-[11px] font-semibold text-[var(--text)]">
                        Sample slides:
                      </div>
                      {week.slideMap.slice(0, 3).map((s) => (
                        <div key={s.page} className="truncate font-mono text-[11px]">
                          #{s.page} {s.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-3.5 border-t border-[var(--border)] bg-[var(--surface-2)]/40 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(`/week/${week.id}?tab=code`)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
                >
                  <Code2 className="w-3.5 h-3.5 text-[var(--primary)]" />
                  Code
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(`/week/${week.id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
                >
                  Open viewer
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
