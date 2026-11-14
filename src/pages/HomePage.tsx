import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  Presentation,
  FlaskConical,
  BookOpen,
  ChevronRight,
  Layers,
  Clock,
  CheckSquare,
} from 'lucide-react';
import { COURSE } from '../data/course';
import { LABS } from '../data/labs';
import { GLOSSARY } from '../data/glossary';
import { MCQ_BANK } from '../data/mcq';
import type { StudyProgressState } from '../state/useStudyStore';

interface HomePageProps {
  state: StudyProgressState;
  onNavigate: (to: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ state, onNavigate }) => {
  const publishedDecks = COURSE.weeks.filter((w) => w.status === 'published' && w.deck);
  const totalSlides = publishedDecks.reduce((sum, w) => sum + (w.deck?.slides || 0), 0);
  const totalSims = LABS.length;
  const totalTerms = GLOSSARY.length;
  const totalMcqs = MCQ_BANK.length;

  const hasHistory = Boolean(state.lastVisited.weekId) || Boolean(state.lastVisited.labId);

  const portalCards = [
    {
      title: 'Slide Decks',
      pill: `${publishedDecks.length} Decks · ${totalSlides} Slides`,
      tileColor: 'var(--tile-indigo)',
      tileBgTint: 'color-mix(in srgb, var(--tile-indigo) 12%, transparent)',
      icon: Presentation,
      to: '/slides',
      desc: 'Slide outlines, extracted Dart and CLI code snippets, deliverable checklists, and quick quizzes for every deck.',
    },
    {
      title: 'MCQ Practice & Exam',
      pill: `${totalMcqs} Questions`,
      tileColor: 'var(--tile-violet)',
      tileBgTint: 'color-mix(in srgb, var(--tile-violet) 12%, transparent)',
      icon: CheckSquare,
      to: '/mcq',
      desc: 'Quick Overview with instant answer toggles, self-paced Practice Mode, and timed Exam Mode across 7 topics.',
    },
    {
      title: 'Visualizations',
      pill: `${totalSims} Simulations`,
      tileColor: 'var(--tile-green)',
      tileBgTint: 'color-mix(in srgb, var(--tile-green) 12%, transparent)',
      icon: FlaskConical,
      to: '/labs',
      desc: `${totalSims} interactive simulators: widget tree, setState lab, layout lab, colour lab, URL anatomy, map zoom, Git lab and more.`,
    },
    {
      title: 'Glossary',
      pill: `All Terms (${totalTerms})`,
      tileColor: 'var(--tile-teal)',
      tileBgTint: 'color-mix(in srgb, var(--tile-teal) 12%, transparent)',
      icon: BookOpen,
      to: '/glossary',
      desc: 'Searchable reference of key Flutter, Dart, REST, maps, Git, and Agile terms with examples.',
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* Hero Container */}
      <section className="rounded-[32px] border border-[var(--border)] bg-gradient-to-br from-[#EEF2FF]/90 via-[var(--surface)] to-[var(--surface)] dark:from-[#1E1B4B]/45 dark:via-[var(--surface)] dark:to-[var(--surface)] p-6 sm:p-10 lg:p-14 shadow-[var(--shadow)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (~55%) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="font-mono font-semibold text-[var(--primary)]">
                {COURSE.code}
              </span>
              <span className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-muted)] font-medium">
                {COURSE.semester} · {COURSE.level} · {COURSE.credit} Credits
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold tracking-[-0.025em] leading-[1.06] text-balance">
              <span className="block text-[var(--text)]">Software Development</span>
              <span className="block bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] dark:from-[#818CF8] dark:to-[#A78BFA] bg-clip-text text-transparent">
                Project II
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[var(--text)]/90 leading-relaxed max-w-2xl">
              <strong className="font-bold text-[var(--text)]">
                Software Development Project II
              </strong>{' '}
              is a hands-on, team-based course where you plan, design, build, test and present a real mobile application using Flutter and Dart, REST APIs, maps and professional Git workflows.
            </p>

            <p className="text-sm sm:text-[17px] text-[var(--text-muted)] leading-relaxed max-w-2xl">
              Core concepts include Flutter widgets and layouts, Dart null safety, state with setState, navigation, REST and JSON, maps and live weather data, VS Code productivity, Git and GitHub, and agile project practices.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/mcq')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:opacity-95 transition-opacity shadow-sm whitespace-nowrap"
              >
                Start MCQ Practice ({totalMcqs} Qs)
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/lab/widget-tree')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm font-semibold hover:border-[var(--primary)] transition-colors whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                Open Widget Tree Builder
              </button>
            </div>

            <div className="text-xs font-mono text-[var(--text-muted)]">
              Install it. Build it. Connect it. Ship it.
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
              <GraduationCap className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span>
                Instructor: <strong className="text-[var(--text)]">Md. Rakib Trofder</strong>, Lecturer, Department of CSE, BAUST
              </span>
            </div>
          </div>

          {/* Right Column (~40%): Hero Visual Widget Tree Card */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-[var(--primary-soft)] p-5 sm:p-6 border border-[var(--primary)]/15 shadow-sm space-y-4">
              {/* Top White Card */}
              <div className="rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[var(--text-muted)]">Flutter Widget</span>
                  <span className="font-mono font-bold text-[var(--primary)]">Scaffold</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-2)] overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-[var(--primary)]" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {['AppBar', "Text('Hello')", 'child:'].map((cell) => (
                    <div
                      key={cell}
                      className="px-2 py-1.5 rounded-lg bg-[var(--surface-2)] font-mono text-[11px] font-medium text-center text-[var(--text)] truncate"
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              </div>

              {/* Centre Caption */}
              <div className="text-center font-mono text-xs font-semibold text-[var(--primary)]">
                ↓ Everything is a widget · build() ↓
              </div>

              {/* Widget Tree Strip */}
              <div className="space-y-2.5 animate-hot-reload">
                <div className="flex justify-center">
                  <div className="px-4 py-1.5 rounded-xl bg-[var(--primary)] text-white font-mono text-xs font-bold shadow-xs">
                    [ MaterialApp ]
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Scaffold', 'Column', 'Text'].map((leaf) => (
                    <div
                      key={leaf}
                      className="px-2 py-1.5 rounded-xl bg-[var(--surface)] border border-emerald-500/70 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold text-center"
                    >
                      [ {leaf} ]
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continue where you left off */}
      {hasHistory && (
        <section className="portal-card rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[var(--primary-soft)] text-[var(--primary)] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-mono uppercase text-[var(--primary)] font-semibold">
                Continue where you left off
              </div>
              <div className="text-sm font-bold text-[var(--text)]">
                {state.lastVisited.weekId
                  ? `Week ${state.lastVisited.weekId}${
                      state.lastVisited.slidePage ? ` · Slide ${state.lastVisited.slidePage}` : ''
                    }`
                  : `Simulation: ${state.lastVisited.labId}`}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.lastVisited.weekId && (
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    `/week/${state.lastVisited.weekId}?page=${state.lastVisited.slidePage || 1}`
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
              >
                Resume Slides
              </button>
            )}
            {state.lastVisited.labId && (
              <button
                type="button"
                onClick={() => onNavigate(`/lab/${state.lastVisited.labId}`)}
                className="px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold"
              >
                Resume Simulation
              </button>
            )}
          </div>
        </section>
      )}

      {/* Explore the Study Portal 2x2 Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl sm:text-[40px] font-bold tracking-[-0.02em] text-[var(--text)] leading-tight">
            Explore the Study Portal
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1">
            Everything you need for CSE 3100, in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portalCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onNavigate(card.to)}
                className="portal-card portal-card-hover rounded-[24px] p-7 sm:p-10 text-left flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <span
                      className="w-14 h-14 rounded-2xl text-white flex items-center justify-center shrink-0 shadow-xs"
                      style={{ backgroundColor: card.tileColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <span
                      className="px-3 py-1 rounded-full font-mono text-xs font-semibold tabular-nums"
                      style={{
                        backgroundColor: card.tileBgTint,
                        color: card.tileColor,
                      }}
                    >
                      {card.pill}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[var(--text)]">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2 line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
