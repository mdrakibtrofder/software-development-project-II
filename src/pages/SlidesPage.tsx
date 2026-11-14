import React, { useState, useEffect, useMemo } from 'react';
import {
  Presentation,
  Download,
  Eye,
  ExternalLink,
  Search,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { COURSE, CLUSTERS, type ClusterId, type WeekData } from '../data/course';
import { assetUrl } from '../utils/asset';

interface SlidesPageProps {
  onNavigate: (to: string) => void;
}

export const SlidesPage: React.FC<SlidesPageProps> = ({ onNavigate }) => {
  const publishedWeeks = useMemo(
    () => COURSE.weeks.filter((w) => w.status === 'published' && w.deck),
    []
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState<ClusterId | 'all'>('all');
  
  // Interactive In-Browser Presentation Modal state
  const [presentingWeek, setPresentingWeek] = useState<WeekData | null>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'images' | 'pdf'>('images');

  const totalSlides = publishedWeeks.reduce((sum, w) => sum + (w.deck?.slides || 0), 0);

  // Filtered slide decks
  const filteredWeeks = useMemo(() => {
    return publishedWeeks.filter((week) => {
      const matchesCluster =
        selectedCluster === 'all' || week.cluster === selectedCluster;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        week.label.toLowerCase().includes(q) ||
        week.title.toLowerCase().includes(q) ||
        week.summary.toLowerCase().includes(q) ||
        (week.deck?.title && week.deck.title.toLowerCase().includes(q)) ||
        week.topics.some((t) => t.toLowerCase().includes(q)) ||
        (week.slideMap && week.slideMap.some((s) => s.title.toLowerCase().includes(q)));

      return matchesCluster && matchesSearch;
    });
  }, [publishedWeeks, selectedCluster, searchQuery]);

  // Cluster counts
  const clusterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: publishedWeeks.length };
    publishedWeeks.forEach((w) => {
      counts[w.cluster] = (counts[w.cluster] || 0) + 1;
    });
    return counts;
  }, [publishedWeeks]);

  const activeClusters = useMemo(() => {
    const set = new Set(publishedWeeks.map((w) => w.cluster));
    return Object.keys(CLUSTERS).filter((c) => set.has(c as ClusterId)) as ClusterId[];
  }, [publishedWeeks]);

  // Open presentation modal
  const handleOpenPresentation = (week: WeekData, initialPage = 1) => {
    setPresentingWeek(week);
    setActiveSlide(initialPage);
    setZoom(100);
    setViewMode('images');
  };

  const handleClosePresentation = () => {
    setPresentingWeek(null);
    setIsFullscreen(false);
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (!presentingWeek) return;

    const total = presentingWeek.deck?.slides || presentingWeek.slideMap?.length || 1;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        setActiveSlide((s) => Math.min(total, s + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setActiveSlide((s) => Math.max(1, s - 1));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          handleClosePresentation();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen((f) => !f);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentingWeek, isFullscreen]);

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
            <Presentation className="w-4 h-4" />
            COURSE REPOSITORY
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1.5">
            Lecture Slides Library
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1.5 max-w-2xl leading-relaxed">
            {publishedWeeks.length} slide decks · {totalSlides} total slides covering the complete {COURSE.title} curriculum. View interactively in-browser or download the original PPTX files.
          </p>
        </div>

        {/* Search Box */}
        <div className="w-full md:w-80 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search slides or topics..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cluster Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider shrink-0 mr-1 font-mono">
          Clusters:
        </span>

        <button
          type="button"
          onClick={() => setSelectedCluster('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            selectedCluster === 'all'
              ? 'bg-[var(--primary)] text-white shadow-xs font-semibold'
              : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/50'
          }`}
        >
          All ({clusterCounts.all || 0})
        </button>

        {activeClusters.map((cId) => {
          const cluster = CLUSTERS[cId];
          const count = clusterCounts[cId] || 0;
          const isSelected = selectedCluster === cId;
          return (
            <button
              key={cId}
              type="button"
              onClick={() => setSelectedCluster(cId)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-[var(--primary)] text-white shadow-xs font-semibold'
                  : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]/50'
              }`}
            >
              {cluster.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Slide Cards Grid */}
      {filteredWeeks.length === 0 ? (
        <div className="portal-card rounded-2xl p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-[var(--text)]">No slide decks found matching your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedCluster('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWeeks.map((week) => {
            const cluster = CLUSTERS[week.cluster];
            const deck = week.deck;
            if (!deck) return null;

            return (
              <article
                key={week.id}
                className="portal-card portal-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-[var(--border)] shadow-xs hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  {/* Card Header with Rich Purple/Indigo Gradient */}
                  <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 text-white p-5 relative overflow-hidden">
                    {/* Top Row: Week badge + Present button */}
                    <div className="flex items-center justify-between relative z-10">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/20">
                        {week.label}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenPresentation(week, 1)}
                        title="Present in Browser"
                        aria-label={`Present ${week.label} in browser`}
                        className="p-2 rounded-xl bg-white/15 hover:bg-white/30 text-white border border-white/20 transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                      >
                        <Presentation className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Course Code & Title */}
                    <div className="mt-4 relative z-10">
                      <div className="font-mono text-xs uppercase tracking-wider text-indigo-200/90 font-medium">
                        {COURSE.code} · SDP II
                      </div>
                      <h2 className="text-lg font-bold text-white mt-1 leading-snug line-clamp-2">
                        {deck.title}
                      </h2>
                    </div>

                    {/* Subtle aesthetic backdrop pattern */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-[var(--text)] leading-snug">
                      {week.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] line-clamp-3 leading-relaxed">
                      {week.summary}
                    </p>

                    <div className="flex items-center gap-1.5 pt-2 text-xs text-[var(--text-muted)] font-mono">
                      <Layers className="w-3.5 h-3.5 text-[var(--primary)]" />
                      <span className="font-semibold text-[var(--text)]">{deck.slides} slides</span>
                      <span className="text-[var(--border)]">·</span>
                      <span>{deck.size}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-4 border-t border-[var(--border)] bg-[var(--surface-2)]/50 flex items-center gap-2">
                  {/* Download PPTX button */}
                  <a
                    href={assetUrl(deck.pptx)}
                    download
                    title={`Download original PPTX (${deck.size})`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90 shadow-xs transition-all active:scale-[0.98]"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>PPTX · {deck.size}</span>
                  </a>

                  {/* View In-Browser Presentation Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenPresentation(week, 1)}
                    title="Interactive In-Browser Presentation"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs font-semibold hover:bg-[var(--surface-2)] hover:border-[var(--primary)] transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>View</span>
                  </button>

                  {/* Show PDF in Browser Button (new tab) */}
                  <a
                    href={assetUrl(deck.pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Show PDF in browser (new tab)"
                    className="inline-flex items-center justify-center p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--primary)] transition-all shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Interactive In-Browser Presentation Modal */}
      {presentingWeek && presentingWeek.deck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
          <div
            className={`w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all ${
              isFullscreen
                ? 'fixed inset-0 rounded-none border-none h-full'
                : 'max-w-6xl h-[92vh] max-h-[900px]'
            }`}
          >
            {/* Modal Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[var(--border)] bg-[var(--surface-2)]/80">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[var(--primary)] text-white font-mono">
                  {presentingWeek.label}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)] line-clamp-1">
                    {presentingWeek.deck.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Slide {activeSlide} of {presentingWeek.deck.slides} · {presentingWeek.slideMap?.find(s => s.page === activeSlide)?.title || `Slide ${activeSlide}`}
                  </p>
                </div>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2">
                {/* View Mode Toggle: Slide Images vs PDF Document */}
                <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] p-0.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('images')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      viewMode === 'images'
                        ? 'bg-[var(--primary)] text-white font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    Presentation
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('pdf')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      viewMode === 'pdf'
                        ? 'bg-[var(--primary)] text-white font-semibold'
                        : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    PDF View
                  </button>
                </div>

                {/* Zoom Controls (Images Mode) */}
                {viewMode === 'images' && (
                  <div className="hidden sm:flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setZoom((z) => Math.max(70, z - 15))}
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
                      onClick={() => setZoom((z) => Math.min(150, z + 15))}
                      aria-label="Zoom in"
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Open in PDF Tab */}
                <a
                  href={assetUrl(presentingWeek.deck.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text)] hover:border-[var(--primary)]"
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>Show PDF</span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
                </a>

                {/* Download PPTX */}
                <a
                  href={assetUrl(presentingWeek.deck.pptx)}
                  download
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PPTX ({presentingWeek.deck.size})</span>
                </a>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen((f) => !f)}
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClosePresentation}
                  aria-label="Close presentation"
                  className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-500/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Presentation Stage */}
            <div className="flex-1 bg-slate-950 flex flex-col justify-center items-center overflow-auto p-4 relative select-none">
              {viewMode === 'images' ? (
                <div
                  className="max-w-full max-h-full flex items-center justify-center transition-transform duration-150"
                  style={{
                    transform: `scale(${zoom / 100})`,
                  }}
                >
                  <img
                    src={assetUrl(`slides/images/week-${presentingWeek.id}/slide-${activeSlide}.png`)}
                    alt={`${presentingWeek.label} - Slide ${activeSlide}`}
                    className="max-h-[64vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
                    onError={(e) => {
                      const padNum = String(activeSlide).padStart(2, '0');
                      (e.target as HTMLImageElement).src = assetUrl(`slides/images/week-${presentingWeek.id}/slide-${padNum}.png`);
                    }}
                  />
                </div>
              ) : (
                /* PDF Embedded Viewer */
                <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
                  <iframe
                    src={`${assetUrl(presentingWeek.deck.pdf)}#page=${activeSlide}`}
                    title={`${presentingWeek.label} PDF`}
                    className="w-full flex-1 border-0"
                  />
                </div>
              )}

              {/* Prev / Next Floating Navigation Arrows */}
              <button
                type="button"
                disabled={activeSlide <= 1}
                onClick={() => setActiveSlide((s) => Math.max(1, s - 1))}
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white disabled:opacity-30 disabled:pointer-events-none border border-slate-700 backdrop-blur-sm shadow-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                disabled={activeSlide >= (presentingWeek.deck.slides || 1)}
                onClick={() => setActiveSlide((s) => Math.min(presentingWeek.deck!.slides, s + 1))}
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white disabled:opacity-30 disabled:pointer-events-none border border-slate-700 backdrop-blur-sm shadow-xl transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Strip: Thumbnails Carousel & Navigation */}
            <div className="border-t border-[var(--border)] bg-[var(--surface)] p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono px-1">
                <span>
                  Keyboard: ← Previous · → / Space Next · Esc Close · F Fullscreen
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleClosePresentation();
                    onNavigate(`/week/${presentingWeek.id}?page=${activeSlide}`);
                  }}
                  className="font-sans font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                >
                  Open in Week Study Portal →
                </button>
              </div>

              {/* Scrollable Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                {Array.from({ length: presentingWeek.deck.slides }, (_, i) => i + 1).map((slideNum) => {
                  const isActive = slideNum === activeSlide;
                  const slideInfo = presentingWeek.slideMap?.find((s) => s.page === slideNum);

                  return (
                    <button
                      key={slideNum}
                      type="button"
                      onClick={() => setActiveSlide(slideNum)}
                      className={`shrink-0 w-24 p-1 rounded-xl border text-left transition-all ${
                        isActive
                          ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30 bg-[var(--primary-soft)]'
                          : 'border-[var(--border)] bg-[var(--surface-2)]/50 hover:border-[var(--primary)]/60'
                      }`}
                    >
                      <div className="aspect-video bg-slate-900 rounded overflow-hidden relative">
                        <img
                          src={assetUrl(`slides/images/week-${presentingWeek.id}/slide-${slideNum}.png`)}
                          alt={`Thumbnail ${slideNum}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const padNum = String(slideNum).padStart(2, '0');
                            (e.target as HTMLImageElement).src = assetUrl(`slides/images/week-${presentingWeek.id}/slide-${padNum}.png`);
                          }}
                        />
                        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-white">
                          #{slideNum}
                        </span>
                      </div>
                      <div className="text-[10px] font-medium text-[var(--text)] line-clamp-1 mt-1 px-0.5 leading-tight">
                        {slideInfo?.title || `Slide ${slideNum}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};