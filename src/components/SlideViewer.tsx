import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Bookmark,
  Code2,
  Presentation,
  FlaskConical,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  FileWarning,
} from 'lucide-react';
import type { WeekData } from '../data/course';
import { SNIPPETS } from '../data/snippets';
import { LABS } from '../data/labs';
import { CodeBlock } from './CodeBlock';
import type { BookmarkItem } from '../state/useStudyStore';
import { assetUrl } from '../utils/asset';

interface SlideViewerProps {
  week: WeekData;
  initialPage?: number;
  initialTab?: 'slides' | 'code';
  onPageChange: (page: number) => void;
  onNavigate: (to: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  week,
  initialPage = 1,
  initialTab = 'slides',
  onPageChange,
  onNavigate,
  isBookmarked,
  onToggleBookmark,
}) => {
  const slideMap = week.slideMap || [];
  const totalSlides = week.deck?.slides || slideMap.length || 1;
  const [page, setPage] = useState(Math.min(Math.max(1, initialPage), totalSlides));
  const [tab, setTab] = useState<'slides' | 'code'>(initialTab);
  const [slideMode, setSlideMode] = useState<'image' | 'pdf'>('image');
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [pdfAvailable, setPdfAvailable] = useState<boolean | null>(null);
  const [pptxAvailable, setPptxAvailable] = useState<boolean | null>(null);

  const weekSnippets = SNIPPETS.filter((s) => s.week === week.id);

  useEffect(() => {
    setPage(Math.min(Math.max(1, initialPage), totalSlides));
  }, [initialPage, totalSlides, week.id]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, week.id]);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  // Probe whether the instructor has attached the PDF / PPTX files yet
  useEffect(() => {
    let cancelled = false;
    setPdfAvailable(null);
    setPptxAvailable(null);
    if (!week.deck) return;

    fetch(assetUrl(week.deck.pdf), { method: 'HEAD' })
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (!cancelled) setPdfAvailable(res.ok && (ct.includes('pdf') || res.status === 200));
      })
      .catch(() => {
        if (!cancelled) setPdfAvailable(false);
      });

    fetch(assetUrl(week.deck.pptx), { method: 'HEAD' })
      .then((res) => {
        const ct = res.headers.get('content-type') || '';
        if (!cancelled) {
          setPptxAvailable(
            res.ok && !ct.includes('text/html')
          );
        }
      })
      .catch(() => {
        if (!cancelled) setPptxAvailable(false);
      });

    return () => {
      cancelled = true;
    };
  }, [week.deck]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (tab !== 'slides') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        setPage((p) => Math.min(totalSlides, p + 1));
      } else if (e.key === 'ArrowLeft') {
        setPage((p) => Math.max(1, p - 1));
      } else if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tab, totalSlides, fullscreen]);

  const currentSlideInfo = slideMap.find((s) => s.page === page) || {
    page,
    title: `Slide ${page}`,
  };
  const slideSim = currentSlideInfo.simId
    ? LABS.find((l) => l.id === currentSlideInfo.simId)
    : undefined;
  const slideSnippets = weekSnippets.filter((s) => s.slide === page);

  const slideBookmarkId = `slide-w${week.id}-p${page}`;
  const slideBookmarked = isBookmarked(slideBookmarkId);

  return (
    <div
      className={`portal-card rounded-2xl overflow-hidden ${
        fullscreen ? 'fixed inset-4 z-50 flex flex-col shadow-2xl' : ''
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]/60">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setTab('slides')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              tab === 'slides'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            Slide Viewer
          </button>
          <button
            type="button"
            onClick={() => setTab('code')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              tab === 'code'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Code Tab ({weekSnippets.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tab === 'slides' && (
            <>
              {/* Presentation Mode Toggle */}
              <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-0.5">
                <button
                  type="button"
                  onClick={() => setSlideMode('image')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    slideMode === 'image'
                      ? 'bg-[var(--primary)] text-white font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  Presentation
                </button>
                <button
                  type="button"
                  onClick={() => setSlideMode('pdf')}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    slideMode === 'pdf'
                      ? 'bg-[var(--primary)] text-white font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  PDF
                </button>
              </div>

              <div className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(75, z - 15))}
                  aria-label="Zoom out"
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-xs tabular-nums w-10 text-center text-[var(--text)]">
                  {zoom}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(145, z + 15))}
                  aria-label="Zoom in"
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  onToggleBookmark({
                    id: slideBookmarkId,
                    kind: 'slide',
                    title: `W${week.id} Slide ${page}: ${currentSlideInfo.title}`,
                    subtitle: week.label,
                    route: `/week/${week.id}?page=${page}`,
                  })
                }
                aria-label="Bookmark this slide page"
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  slideBookmarked
                    ? 'border-amber-400 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" fill={slideBookmarked ? 'currentColor' : 'none'} />
                <span className="hidden sm:inline">{slideBookmarked ? 'Saved' : 'Save slide'}</span>
              </button>

              <button
                type="button"
                onClick={() => setFullscreen((f) => !f)}
                aria-label={fullscreen ? 'Exit presentation mode' : 'Presentation mode'}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </>
          )}

          {week.deck && (
            <div className="flex items-center gap-1.5">
              {pdfAvailable ? (
                <a
                  href={assetUrl(week.deck.pdf)}
                  download
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90 whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF ({week.deck.slides} slides)
                </a>
              ) : (
                <span
                  title={`Attach PDF to /public/${week.deck.pdf} later`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] text-xs font-medium whitespace-nowrap"
                >
                  PDF · Pending upload
                </span>
              )}
              {pptxAvailable ? (
                <a
                  href={assetUrl(week.deck.pptx)}
                  download
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs font-semibold hover:border-[var(--primary)] whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  PPTX ({week.deck.size})
                </a>
              ) : (
                <span
                  title={`Attach PPTX to /public/${week.deck.pptx} later`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] text-xs font-medium whitespace-nowrap"
                >
                  PPTX · Pending upload
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {tab === 'slides' ? (
        <div className={`p-4 sm:p-6 ${fullscreen ? 'flex-1 overflow-y-auto' : ''}`}>
          {/* Slide Stage — white page frame in both themes */}
          <div className="rounded-2xl border border-[var(--border)] bg-slate-100 dark:bg-slate-900/80 p-3 sm:p-5">
            <div
              className="mx-auto bg-white text-slate-900 rounded-xl shadow-md border border-slate-200 overflow-hidden transition-transform origin-top"
              style={{
                maxWidth: `${Math.round((840 * zoom) / 100)}px`,
              }}
            >
              {week.deck ? (
                slideMode === 'image' ? (
                  <div className="w-full bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4">
                    <img
                      src={assetUrl(`slides/images/week-${week.id}/slide-${page}.png`)}
                      alt={`${week.label} Slide ${page}`}
                      className="w-full h-auto max-h-[65vh] object-contain rounded-lg shadow-xl"
                      onError={(e) => {
                        const pad = String(page).padStart(2, '0');
                        (e.target as HTMLImageElement).src = assetUrl(`slides/images/week-${week.id}/slide-${pad}.png`);
                      }}
                    />
                    <div className="w-full mt-3 px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-mono">
                        Page {page} / {totalSlides} · {currentSlideInfo.title}
                      </span>
                      <a
                        href={assetUrl(week.deck.pdf)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-400 font-semibold hover:underline"
                      >
                        Show PDF in browser <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <iframe
                      src={`${assetUrl(week.deck.pdf)}#page=${page}`}
                      title={`${week.label} Slide ${page}`}
                      className="w-full h-[460px] sm:h-[540px] border-0"
                    />
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-mono">
                        Page {page} / {totalSlides} · {currentSlideInfo.title}
                      </span>
                      <a
                        href={assetUrl(week.deck.pdf)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                      >
                        Open in new tab <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )
              ) : (
                /* Graceful interactive Slide Map Stage when PPTX/PDF deck isn't attached yet */
                <div className="p-6 sm:p-10 min-h-[340px] flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/40">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
                      <span className="font-mono text-xs font-semibold text-indigo-600">
                        CSE 3100 · {week.label.toUpperCase()} · SLIDE {page} / {totalSlides}
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        {week.title}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-5 leading-snug">
                      {currentSlideInfo.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2">
                      {week.summary}
                    </p>

                    {slideSnippets.length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs font-semibold text-slate-500 mb-1">
                          Code shown on this slide:
                        </div>
                        {slideSnippets.map((sn) => (
                          <div
                            key={sn.id}
                            className="rounded-xl bg-slate-900 text-slate-100 p-3 font-mono text-xs overflow-x-auto"
                          >
                            <pre className="m-0">{sn.code}</pre>
                          </div>
                        ))}
                      </div>
                    )}

                    {slideSim && (
                      <div className="mt-5 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-indigo-900">
                            Interactive Simulation Linked to Slide {page}
                          </div>
                          <div className="text-xs text-indigo-700 mt-0.5">
                            {slideSim.title} — {slideSim.subtitle}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onNavigate(`/lab/${slideSim.id}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                        >
                          <FlaskConical className="w-3.5 h-3.5" />
                          Open Simulation
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FileWarning className="w-3.5 h-3.5 text-amber-600" />
                      Deck file pending upload — slide outline & code are active.
                    </span>
                    <span className="font-mono">Physical page {page} of {totalSlides}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination & Thumbnail Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] disabled:opacity-40 hover:border-[var(--primary)]"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous slide
            </button>

            <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
              Page {page} / {totalSlides}
            </span>

            <button
              type="button"
              disabled={page >= totalSlides}
              onClick={() => setPage((p) => Math.min(totalSlides, p + 1))}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] disabled:opacity-40 hover:border-[var(--primary)]"
            >
              Next slide
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Index / Strip */}
          {slideMap.length > 0 && (
            <div className="mt-4">
              <div className="text-xs font-semibold text-[var(--text-muted)] mb-2">
                Slide Index (click any slide · ← / → keys)
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {slideMap.map((s) => {
                  const active = s.page === page;
                  return (
                    <button
                      key={s.page}
                      type="button"
                      onClick={() => setPage(s.page)}
                      className={`shrink-0 w-32 p-1.5 rounded-xl border text-left transition-all ${
                        active
                          ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30 bg-[var(--primary-soft)]'
                          : 'border-[var(--border)] bg-[var(--surface-2)]/50 hover:border-[var(--primary)]/60'
                      }`}
                    >
                      <div className="aspect-video bg-slate-900 rounded overflow-hidden relative mb-1">
                        <img
                          src={assetUrl(`slides/images/week-${week.id}/slide-${s.page}.png`)}
                          alt={`Thumbnail ${s.page}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const padNum = String(s.page).padStart(2, '0');
                            (e.target as HTMLImageElement).src = assetUrl(`slides/images/week-${week.id}/slide-${padNum}.png`);
                          }}
                        />
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-white">
                          #{s.page}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-medium text-[var(--text)] line-clamp-1 leading-tight">
                          {s.title}
                        </div>
                        {s.simId && (
                          <FlaskConical className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Code Tab */
        <div className={`p-4 sm:p-6 space-y-4 ${fullscreen ? 'flex-1 overflow-y-auto' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-[var(--text)]">
                Code & Commands in {week.label}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Copy any snippet or open DartPad in a new tab to test Dart code directly.
              </p>
            </div>
          </div>
          {weekSnippets.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No code snippets in this week.</p>
          ) : (
            weekSnippets.map((sn) => {
              const bId = `snippet-${sn.id}`;
              return (
                <CodeBlock
                  key={sn.id}
                  code={sn.code}
                  lang={sn.lang}
                  title={sn.title}
                  explain={sn.explain}
                  slide={sn.slide}
                  isBookmarked={isBookmarked(bId)}
                  onToggleBookmark={() =>
                    onToggleBookmark({
                      id: bId,
                      kind: 'snippet',
                      title: sn.title,
                      subtitle: `Week ${sn.week} · Slide ${sn.slide}`,
                      route: `/week/${sn.week}?page=${sn.slide}&tab=code`,
                    })
                  }
                  onOpenSlide={() => {
                    setPage(sn.slide);
                    setTab('slides');
                  }}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
