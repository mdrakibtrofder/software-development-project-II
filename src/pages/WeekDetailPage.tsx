import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Flag,
  FileText,
  Copy,
  Check,
  RotateCcw,
  Users,
  BookOpen,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { COURSE, CLUSTERS } from '../data/course';
import { STUDY_NOTES } from '../data/notes';
import { WEEK_QUIZZES } from '../data/quizzes';
import { SlideViewer } from '../components/SlideViewer';
import { SimRenderer } from '../components/sims/SimRenderer';
import type { BookmarkItem, StudyProgressState } from '../state/useStudyStore';

interface WeekDetailPageProps {
  weekId: number;
  initialPage?: number;
  initialTab?: 'slides' | 'code';
  state: StudyProgressState;
  onNavigate: (to: string) => void;
  onToggleDone: (weekId: number) => void;
  onToggleDeliverable: (weekId: number, n: number) => void;
  onRecordQuizScore: (weekId: number, score: number) => void;
  onMarkLabCompleted: (labId: string) => void;
  onPageChange: (weekId: number, page: number) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (item: BookmarkItem) => void;
}

export const WeekDetailPage: React.FC<WeekDetailPageProps> = ({
  weekId,
  initialPage,
  initialTab,
  state,
  onNavigate,
  onToggleDone,
  onToggleDeliverable,
  onRecordQuizScore,
  onMarkLabCompleted,
  onPageChange,
  isBookmarked,
  onToggleBookmark,
}) => {
  const week = COURSE.weeks.find((w) => w.id === weekId);
  const [copiedChecklist, setCopiedChecklist] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [flippedCard, setFlippedCard] = useState<Record<number, boolean>>({});

  if (!week) {
    return (
      <div className="portal-card rounded-2xl p-8 text-center">
        <h1 className="text-xl font-bold">Week not found</h1>
        <button
          type="button"
          onClick={() => onNavigate('/weeks')}
          className="mt-4 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold"
        >
          Back to Roadmap
        </button>
      </div>
    );
  }

  const cluster = CLUSTERS[week.cluster];
  const isDone = state.doneWeeks.includes(week.id);
  const note = STUDY_NOTES.find((n) => n.week === week.id);
  const quiz = WEEK_QUIZZES[week.id] || [];
  const savedPage = initialPage || state.lastPageByWeek[week.id] || 1;

  const prevWeek = COURSE.weeks.find((w) => w.id === week.id - 1);
  const nextWeek = COURSE.weeks.find((w) => w.id === week.id + 1);

  const handleAnswerQuiz = (qId: string, optIdx: number) => {
    const next = { ...quizAnswers, [qId]: optIdx };
    setQuizAnswers(next);
    const correctCount = quiz.reduce(
      (acc, q) => acc + (next[q.id] === q.answerIndex ? 1 : 0),
      0
    );
    if (Object.keys(next).length === quiz.length) {
      onRecordQuizScore(week.id, correctCount);
    }
  };

  const handleCopyChecklist = async () => {
    if (!week.deliverables) return;
    const md = [
      `# ${week.label}: ${week.title} — Lab Deliverables`,
      ...(week.pairWorkNote ? [`_${week.pairWorkNote}_`] : []),
      '',
      ...week.deliverables.map((d) => {
        const checked = state.checkedDeliverables[`${week.id}-${d.n}`] ? 'x' : ' ';
        return `- [${checked}] **${d.title}**: ${d.text}`;
      }),
      '',
      week.submission ? `**Submission:** ${week.submission}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(md);
      setCopiedChecklist(true);
      setTimeout(() => setCopiedChecklist(false), 1800);
    } catch {
      // Ignore
    }
  };

  if (week.status === 'upcoming') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/weeks')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)]"
          >
            <ChevronLeft className="w-4 h-4" /> All Weeks
          </button>
        </div>

        <div className="portal-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="font-mono text-xs font-bold" style={{ color: `var(${cluster.colorVar})` }}>
            {week.label.toUpperCase()} · UPCOMING · {week.co.join(', ')}
          </div>
          {week.milestone && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--state-warn)] text-[var(--warning)] font-mono text-xs font-bold">
              <Flag className="w-3.5 h-3.5" /> {week.milestone}
            </div>
          )}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)]">{week.title}</h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">{week.summary}</p>
          <div className="pt-2">
            <h2 className="text-xs font-mono font-bold uppercase text-[var(--text-muted)] mb-2">
              Official Outline Topics
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--text)]">
              {week.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => onNavigate('/project')}
              className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
            >
              Open Project Hub & Proposal Builder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header & Prev/Next */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-bold" style={{ color: `var(${cluster.colorVar})` }}>
              {week.label.toUpperCase()} · {cluster.label.toUpperCase()}
            </span>
            <span className="text-[var(--text-muted)]">·</span>
            <span className="text-[var(--text-muted)]">{week.co.join(', ')}</span>
          </div>

          <div className="flex items-center gap-2">
            {prevWeek && (
              <button
                type="button"
                onClick={() => onNavigate(`/week/${prevWeek.id}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> {prevWeek.label}
              </button>
            )}
            {nextWeek && (
              <button
                type="button"
                onClick={() => onNavigate(`/week/${nextWeek.id}`)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
              >
                {nextWeek.label} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            {week.milestone && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--state-warn)] text-[var(--warning)] font-mono text-xs font-bold">
                <Flag className="w-3.5 h-3.5" />
                Milestone: {week.milestone}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
              {week.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-3xl">
              {week.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onToggleDone(week.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shrink-0 ${
              isDone
                ? 'bg-[var(--state-ok)] text-[var(--success)] border border-emerald-500/40'
                : 'bg-[var(--primary)] text-white hover:opacity-90'
            }`}
          >
            {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            {isDone ? 'Week Completed' : 'Mark Week as Done'}
          </button>
        </div>
      </header>

      {/* Slide Viewer + Code Tab */}
      <SlideViewer
        week={week}
        initialPage={savedPage}
        initialTab={initialTab}
        onPageChange={(p) => onPageChange(week.id, p)}
        onNavigate={onNavigate}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />

      {/* What you'll learn + Cross-links + Note Preview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 portal-card rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text)]">What You'll Learn</h2>
          <div className="flex flex-wrap gap-2">
            {week.topics.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-xs font-medium text-[var(--text)]"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--primary-soft)]/70 border border-[var(--primary)]/20 text-xs sm:text-sm">
            <strong className="text-[var(--primary)]">For your project: </strong>
            <span className="text-[var(--text)]">{week.forProject}</span>
          </div>

          {week.crossLinks && week.crossLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {week.crossLinks.map((cl) => (
                <button
                  key={cl.week}
                  type="button"
                  onClick={() => onNavigate(`/week/${cl.week}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--primary)] hover:border-[var(--primary)]"
                >
                  {cl.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          )}
        </div>

        {note && (
          <div className="lg:col-span-5 portal-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-violet-600 dark:text-violet-400">
                <FileText className="w-4 h-4" />
                STUDY NOTE · {note.readingTime.toUpperCase()}
              </div>
              <h2 className="text-lg font-bold text-[var(--text)] mt-1">{note.title}</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5">{note.summary}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(`/note/${week.id}`)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white text-xs sm:text-sm font-semibold hover:opacity-95"
            >
              Read the full note
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* Inline Simulations */}
      {week.labs.length > 0 && (
        <section className="space-y-4">
          <div>
            <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
              Interactive Simulations
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Try It Yourself ({week.labs.length})
            </h2>
          </div>
          {week.labs.map((labId) => (
            <SimRenderer
              key={labId}
              labId={labId}
              isCompleted={state.completedLabs.includes(labId)}
              onComplete={() => onMarkLabCompleted(labId)}
              onNavigate={onNavigate}
              isBookmarked={isBookmarked(`lab-${labId}`)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </section>
      )}

      {/* Key Takeaways */}
      {week.keyTakeaways && week.keyTakeaways.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Key Takeaways
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {week.keyTakeaways.map((kt, idx) => (
              <div key={idx} className="portal-card rounded-2xl p-4 text-sm text-[var(--text)]">
                <span className="font-mono text-xs font-bold text-[var(--primary)] mr-2">
                  0{idx + 1}.
                </span>
                {kt}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lab Deliverables Checklist */}
      {week.deliverables && week.deliverables.length > 0 && (
        <section className="portal-card rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-mono text-xs font-bold text-[var(--primary)] uppercase">
                Final Slide Task
              </div>
              <h2 className="text-xl font-bold text-[var(--text)]">Lab Deliverables Checklist</h2>
            </div>
            <button
              type="button"
              onClick={handleCopyChecklist}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
            >
              {copiedChecklist ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedChecklist ? 'Checklist copied' : 'Copy my checklist'}
            </button>
          </div>

          {week.pairWorkNote && (
            <div className="p-3 rounded-xl bg-[var(--state-warn)] text-[var(--warning)] text-xs font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 shrink-0" />
              {week.pairWorkNote}
            </div>
          )}

          <div className="space-y-2.5">
            {week.deliverables.map((d) => {
              const checked = Boolean(state.checkedDeliverables[`${week.id}-${d.n}`]);
              return (
                <label
                  key={d.n}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    checked
                      ? 'border-emerald-500/40 bg-[var(--state-ok)]/60'
                      : 'border-[var(--border)] bg-[var(--surface-2)]/40 hover:border-[var(--primary)]'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleDeliverable(week.id, d.n)}
                    className="mt-1 accent-emerald-600"
                  />
                  <div className="text-sm">
                    <div className={`font-bold ${checked ? 'line-through opacity-75' : 'text-[var(--text)]'}`}>
                      {d.n}. {d.title}
                    </div>
                    <div className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">{d.text}</div>
                  </div>
                </label>
              );
            })}
          </div>

          {week.submission && (
            <div className="pt-2 border-t border-[var(--border)] text-xs sm:text-sm text-[var(--text)]">
              <strong>Submission:</strong> {week.submission}
              {week.nextWeekNote && (
                <span className="text-[var(--text-muted)] ml-3">
                  · <strong>Next week:</strong> {week.nextWeekNote}
                </span>
              )}
            </div>
          )}
        </section>
      )}

      {/* Check Yourself Quiz (5 MCQs) */}
      {quiz.length > 0 && (
        <section className="portal-card rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-mono text-xs font-bold text-[var(--primary)] uppercase">
                Check Yourself
              </div>
              <h2 className="text-xl font-bold text-[var(--text)]">
                Quick 5-Question Quiz
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {state.quizBestScores[week.id] !== undefined && (
                <span className="font-mono text-xs font-bold text-[var(--success)] tabular-nums">
                  Best score: {state.quizBestScores[week.id]} / {quiz.length}
                </span>
              )}
              <button
                type="button"
                onClick={() => setQuizAnswers({})}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[var(--border)] text-xs font-medium text-[var(--text-muted)]"
              >
                <RotateCcw className="w-3 h-3" /> Reset quiz
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {quiz.map((q, qIdx) => {
              const picked = quizAnswers[q.id];
              const answered = picked !== undefined;
              return (
                <div key={q.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/30 space-y-2.5">
                  <div className="text-sm font-bold text-[var(--text)]">
                    <span className="font-mono text-[var(--primary)] mr-1.5">Q{qIdx + 1}.</span>
                    {q.q}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.answerIndex;
                      const isPicked = picked === oIdx;
                      let cls = 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]';
                      if (answered) {
                        if (isCorrect) cls = 'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-bold';
                        else if (isPicked) cls = 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]';
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleAnswerQuiz(q.id, oIdx)}
                          className={`px-3 py-2 rounded-xl border text-xs text-left transition-colors ${cls}`}
                        >
                          <span className="font-mono font-bold mr-2">
                            {['A', 'B', 'C', 'D'][oIdx]})
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div className="text-xs font-medium text-[var(--text-muted)] pt-1" aria-live="polite">
                      {picked === q.answerIndex ? '✓ Correct: ' : '✗ Explanation: '}
                      {q.explain}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Flashcards */}
      {week.flashcards && week.flashcards.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Flashcards (tap to flip)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {week.flashcards.map((fc, idx) => {
              const flipped = Boolean(flippedCard[idx]);
              return (
                <button
                  key={fc.front}
                  type="button"
                  onClick={() => setFlippedCard((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                  className={`portal-card rounded-2xl p-5 text-left min-h-[130px] flex flex-col justify-between transition-colors ${
                    flipped ? 'bg-[var(--primary-soft)] border-[var(--primary)]' : ''
                  }`}
                >
                  <div className="font-mono text-[11px] uppercase text-[var(--primary)] font-semibold">
                    {flipped ? 'Answer' : `Card ${idx + 1} · Question`}
                  </div>
                  <div className="text-sm font-bold text-[var(--text)] my-2">
                    {flipped ? fc.back : fc.front}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">
                    Click to flip
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
