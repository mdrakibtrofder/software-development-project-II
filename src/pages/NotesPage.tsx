import React, { useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Presentation,
  GraduationCap,
} from 'lucide-react';
import { CLUSTERS, COURSE } from '../data/course';
import { STUDY_NOTES } from '../data/notes';
import { SNIPPETS } from '../data/snippets';
import { CodeBlock } from '../components/CodeBlock';
import { SimRenderer } from '../components/sims/SimRenderer';
import type { BookmarkItem, StudyProgressState } from '../state/useStudyStore';

interface NotesPageProps {
  noteWeek?: number;
  state: StudyProgressState;
  onNavigate: (to: string) => void;
  onToggleNoteRead: (week: number) => void;
  onRecordVisitedNote: (week: number) => void;
  onMarkLabCompleted: (labId: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({
  noteWeek,
  state,
  onNavigate,
  onToggleNoteRead,
  onRecordVisitedNote,
  onMarkLabCompleted,
  isBookmarked,
  onToggleBookmark,
}) => {
  useEffect(() => {
    if (noteWeek) onRecordVisitedNote(noteWeek);
  }, [noteWeek, onRecordVisitedNote]);

  if (!noteWeek) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--tile-violet)] uppercase tracking-wide">
              <FileText className="w-4 h-4" />
              NOTES LIBRARY
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
              Study Notes
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
              Clean, slide-authored study guides for every published week—complete with source-slide links, tables, Dart code and printable layout.
            </p>
          </div>
          <span
            className="px-3.5 py-1.5 rounded-full font-mono text-xs font-bold tabular-nums"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--tile-violet) 12%, transparent)',
              color: 'var(--tile-violet)',
            }}
          >
            {STUDY_NOTES.length} Notes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STUDY_NOTES.map((note) => {
            const cluster = CLUSTERS[note.cluster];
            const isRead = state.readNotes.includes(note.week);
            return (
              <article
                key={note.week}
                className="portal-card portal-card-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span
                      className="font-bold"
                      style={{ color: `var(${cluster.colorVar})` }}
                    >
                      Week {note.week} · {cluster.label}
                    </span>
                    <span className="text-[var(--text-muted)]">{note.readingTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text)] mt-2.5 leading-snug">
                    {note.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-2">
                    {note.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(`/week/${note.week}`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)]"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    Slides
                  </button>
                  <div className="flex items-center gap-2">
                    {isRead && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--success)]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Read
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => onNavigate(`/note/${note.week}`)}
                      className="px-3.5 py-2 rounded-xl bg-[var(--tile-violet)] text-white text-xs font-semibold hover:opacity-95"
                    >
                      Read Note
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  const note = STUDY_NOTES.find((n) => n.week === noteWeek);
  const week = COURSE.weeks.find((w) => w.id === noteWeek);

  if (!note) {
    return (
      <div className="portal-card rounded-2xl p-8 text-center">
        <h1 className="text-xl font-bold">Note not found</h1>
        <button
          type="button"
          onClick={() => onNavigate('/notes')}
          className="mt-4 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold"
        >
          Back to Notes Library
        </button>
      </div>
    );
  }

  const cluster = CLUSTERS[note.cluster];
  const headings = note.blocks.filter(
    (b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading'
  );
  const isRead = state.readNotes.includes(note.week);
  const noteBookmarkId = `note-w${note.week}`;
  const bookmarked = isBookmarked(noteBookmarkId);

  return (
    <div className="space-y-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/notes')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)]"
        >
          <ChevronLeft className="w-4 h-4" />
          All Notes
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() =>
              onToggleBookmark({
                id: noteBookmarkId,
                kind: 'note',
                title: `Week ${note.week} Note: ${note.title}`,
                subtitle: note.readingTime,
                route: `/note/${note.week}`,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
              bookmarked
                ? 'border-amber-400 bg-amber-500/10 text-amber-600 dark:text-amber-300'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
            {bookmarked ? 'Saved' : 'Bookmark'}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save as PDF
          </button>

          <button
            type="button"
            onClick={() => onToggleNoteRead(note.week)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${
              isRead
                ? 'bg-[var(--state-ok)] text-[var(--success)]'
                : 'bg-[var(--primary)] text-white'
            }`}
          >
            {isRead ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
            {isRead ? 'Marked as read' : 'Mark as read'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sticky Table of Contents */}
        <aside className="no-print hidden lg:block lg:col-span-3 sticky top-24 portal-card rounded-2xl p-4 space-y-3">
          <div className="font-mono text-xs font-bold uppercase text-[var(--text-muted)]">
            In This Note
          </div>
          <nav className="space-y-1.5">
            {headings.map((h) => (
              <a
                key={h.id}
                href={`#/note/${note.week}#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="block text-xs font-medium text-[var(--text-muted)] hover:text-[var(--primary)] py-1 leading-snug"
              >
                {h.text}
              </a>
            ))}
          </nav>
          {week && (
            <button
              type="button"
              onClick={() => onNavigate(`/week/${week.id}`)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-[var(--surface-2)] text-xs font-semibold text-[var(--text)] hover:text-[var(--primary)]"
            >
              Open Week {week.id} Slides
            </button>
          )}
        </aside>

        {/* Note Article Body */}
        <article className="lg:col-span-9 portal-card rounded-2xl p-6 sm:p-10 space-y-5">
          <header className="pb-6 border-b border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-bold" style={{ color: `var(${cluster.colorVar})` }}>
                WEEK {note.week} · {cluster.label.toUpperCase()}
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)]">{note.readingTime}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-2">
              {note.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2">{note.summary}</p>
          </header>

          {note.blocks.map((block, idx) => {
            switch (block.type) {
              case 'heading':
                return (
                  <div key={block.id} id={block.id} className="pt-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
                      {block.text}
                    </h2>
                    {block.slide && (
                      <button
                        type="button"
                        onClick={() => onNavigate(`/week/${note.week}?page=${block.slide}`)}
                        className="no-print font-mono text-xs px-2.5 py-1 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] font-semibold hover:opacity-90"
                      >
                        Source: Slide {block.slide}
                      </button>
                    )}
                  </div>
                );

              case 'paragraph':
                return (
                  <p key={idx} className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
                    {block.text}
                  </p>
                );

              case 'list':
                return block.ordered ? (
                  <ol key={idx} className="list-decimal pl-5 space-y-1.5 text-sm sm:text-base text-[var(--text)]">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-[var(--text)]">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );

              case 'callout': {
                const bg =
                  block.kind === 'warning'
                    ? 'bg-[var(--state-warn)] border-amber-500/40'
                    : block.kind === 'remember'
                    ? 'bg-[var(--primary-soft)] border-[var(--primary)]/30'
                    : 'bg-[var(--surface-2)] border-[var(--border)]';
                return (
                  <div key={idx} className={`p-4 rounded-2xl border ${bg} space-y-1`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase text-[var(--text)]">
                        {block.kind}: {block.title}
                      </span>
                      {block.slide && (
                        <button
                          type="button"
                          onClick={() => onNavigate(`/week/${note.week}?page=${block.slide}`)}
                          className="no-print font-mono text-[11px] text-[var(--primary)] underline"
                        >
                          Slide {block.slide}
                        </button>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text)]">{block.text}</p>
                  </div>
                );
              }

              case 'table':
                return (
                  <div key={idx} className="overflow-x-auto rounded-xl border border-[var(--border)]">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead className="bg-[var(--surface-2)]">
                        <tr>
                          {block.headers.map((h) => (
                            <th key={h} scope="col" className="px-4 py-2.5 font-bold text-[var(--text)] border-b border-[var(--border)]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--border)]">
                        {block.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-2.5 text-[var(--text)] align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );

              case 'code': {
                const sn = SNIPPETS.find((s) => s.id === block.snippetId);
                if (!sn) return null;
                return (
                  <CodeBlock
                    key={sn.id}
                    code={sn.code}
                    lang={sn.lang}
                    title={sn.title}
                    explain={sn.explain}
                    slide={sn.slide}
                    onOpenSlide={() => onNavigate(`/week/${sn.week}?page=${sn.slide}`)}
                  />
                );
              }

              case 'sim':
                return (
                  <div key={idx} className="no-print">
                    <SimRenderer
                      labId={block.labId}
                      isCompleted={state.completedLabs.includes(block.labId)}
                      onComplete={() => onMarkLabCompleted(block.labId)}
                      onNavigate={onNavigate}
                    />
                  </div>
                );

              case 'teacherNote':
                return (
                  <details key={idx} className="print-open rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-4">
                    <summary className="cursor-pointer font-mono text-xs font-bold text-[var(--primary)] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Teacher's note (speaker tip — click to expand)
                    </summary>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border)]">
                      {block.text}
                    </p>
                  </details>
                );

              default:
                return null;
            }
          })}

          {/* Prev / Next Note Footer */}
          <div className="no-print pt-6 mt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
            {note.week > 1 ? (
              <button
                type="button"
                onClick={() => onNavigate(`/note/${note.week - 1}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] text-xs font-semibold hover:border-[var(--primary)]"
              >
                <ChevronLeft className="w-4 h-4" />
                Week {note.week - 1} Note
              </button>
            ) : (
              <span />
            )}

            {note.week < STUDY_NOTES.length && (
              <button
                type="button"
                onClick={() => onNavigate(`/note/${note.week + 1}`)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90"
              >
                Week {note.week + 1} Note
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};
