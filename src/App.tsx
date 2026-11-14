/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useHashRoute } from './state/useHashRoute';
import { useStudyStore } from './state/useStudyStore';
import { Layout } from './components/Layout';
import { CommandPalette } from './components/CommandPalette';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { HomePage } from './pages/HomePage';
import { RoadmapPage } from './pages/RoadmapPage';
import { SlidesPage } from './pages/SlidesPage';
import { WeekDetailPage } from './pages/WeekDetailPage';
import { NotesPage } from './pages/NotesPage';
import { LabsPage } from './pages/LabsPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { McqPage } from './pages/McqPage';
import { ProjectHubPage } from './pages/ProjectHubPage';
import { AboutPage } from './pages/AboutPage';

function getPageTitle(segments: string[]): string {
  const [first, second] = segments;
  if (!first) return 'CSE 3100 · SDP II Study Portal';
  switch (first) {
    case 'weeks':
      return 'Course Roadmap · CSE 3100';
    case 'week':
      return `Week ${second || ''} · CSE 3100`;
    case 'slides':
      return 'Slide Decks · CSE 3100';
    case 'notes':
      return 'Study Notes · CSE 3100';
    case 'note':
      return `Week ${second || ''} Note · CSE 3100`;
    case 'labs':
      return 'Interactive Visualizations · CSE 3100';
    case 'lab':
      return `Simulation Lab · CSE 3100`;
    case 'glossary':
      return 'Glossary · CSE 3100';
    case 'mcq':
      return 'MCQ Practice (100 Qs) · CSE 3100';
    case 'project':
      return 'Project Hub & Proposal Builder · CSE 3100';
    case 'about':
      return 'Course Info & Outline · CSE 3100';
    default:
      return 'CSE 3100 · SDP II Study Portal';
  }
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const {
    state,
    toggleTheme,
    toggleWeekDone,
    toggleNoteRead,
    markLabCompleted,
    toggleDeliverable,
    toggleTeamCheck,
    recordQuizScore,
    setWeekSlidePage,
    recordVisitedLab,
    recordVisitedNote,
    toggleBookmark,
    isBookmarked,
    setMcqMode,
    toggleMcqFlag,
    recordMcqAttempt,
    updateProposal,
    clearProposal,
    resetProgress,
  } = useStudyStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  useEffect(() => {
    document.title = getPageTitle(route.segments);
  }, [route.segments]);

  useEffect(() => {
    if (!route.anchor) return;
    const timer = window.setTimeout(() => {
      const target = document.getElementById(route.anchor!);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [route.path, route.anchor]);

  const renderPage = () => {
    const [first, second] = route.segments;

    if (!first) {
      return <HomePage state={state} onNavigate={navigate} />;
    }

    if (first === 'weeks') {
      return (
        <RoadmapPage
          state={state}
          onToggleDone={toggleWeekDone}
          onNavigate={navigate}
        />
      );
    }

    if (first === 'week' && second) {
      const weekId = Number(second);
      const initialPage = route.query.page ? Number(route.query.page) : undefined;
      const initialTab = route.query.tab === 'code' ? 'code' : 'slides';
      return (
        <WeekDetailPage
          key={`week-${weekId}`}
          weekId={weekId}
          initialPage={Number.isFinite(initialPage) ? initialPage : undefined}
          initialTab={initialTab}
          state={state}
          onNavigate={navigate}
          onToggleDone={toggleWeekDone}
          onToggleDeliverable={toggleDeliverable}
          onRecordQuizScore={recordQuizScore}
          onMarkLabCompleted={markLabCompleted}
          onPageChange={setWeekSlidePage}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'slides') {
      return <SlidesPage onNavigate={navigate} />;
    }

    if (first === 'notes') {
      return (
        <NotesPage
          state={state}
          onNavigate={navigate}
          onToggleNoteRead={toggleNoteRead}
          onRecordVisitedNote={recordVisitedNote}
          onMarkLabCompleted={markLabCompleted}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'note' && second) {
      const noteWeek = Number(second);
      return (
        <NotesPage
          noteWeek={Number.isFinite(noteWeek) ? noteWeek : undefined}
          state={state}
          onNavigate={navigate}
          onToggleNoteRead={toggleNoteRead}
          onRecordVisitedNote={recordVisitedNote}
          onMarkLabCompleted={markLabCompleted}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'labs') {
      return (
        <LabsPage
          state={state}
          onNavigate={navigate}
          onMarkLabCompleted={markLabCompleted}
          onRecordVisitedLab={recordVisitedLab}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'lab' && second) {
      return (
        <LabsPage
          labId={second}
          state={state}
          onNavigate={navigate}
          onMarkLabCompleted={markLabCompleted}
          onRecordVisitedLab={recordVisitedLab}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'glossary') {
      return (
        <GlossaryPage
          initialTermId={route.query.term}
          onNavigate={navigate}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'mcq') {
      return (
        <McqPage
          state={state}
          onSetMode={setMcqMode}
          onToggleFlag={toggleMcqFlag}
          onRecordAttempt={recordMcqAttempt}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmark}
        />
      );
    }

    if (first === 'project') {
      return (
        <ProjectHubPage
          state={state}
          onUpdateProposal={updateProposal}
          onClearProposal={clearProposal}
          onToggleTeamCheck={toggleTeamCheck}
          onNavigate={navigate}
        />
      );
    }

    if (first === 'about') {
      return <AboutPage onNavigate={navigate} />;
    }

    return <HomePage state={state} onNavigate={navigate} />;
  };

  return (
    <>
      <Layout
        route={route}
        theme={state.theme}
        bookmarkCount={state.bookmarks.length}
        onNavigate={navigate}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onResetProgress={resetProgress}
      >
        {renderPage()}
      </Layout>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      <BookmarksDrawer
        open={bookmarksOpen}
        bookmarks={state.bookmarks}
        onClose={() => setBookmarksOpen(false)}
        onNavigate={navigate}
        onRemove={toggleBookmark}
      />
    </>
  );
}
