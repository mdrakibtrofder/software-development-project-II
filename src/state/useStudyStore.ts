import { useState, useEffect, useCallback } from 'react';

export interface BookmarkItem {
  id: string;
  kind: 'slide' | 'snippet' | 'note' | 'term' | 'lab' | 'mcq';
  title: string;
  route: string;
  subtitle?: string;
}

export interface ProposalFeature {
  id: string;
  title: string;
  description: string;
}

export interface ProposalDraft {
  projectName: string;
  studentId: string;
  studentName: string;
  level: string;
  term: string;
  section: string;
  submissionDate: string;
  problemStatement: string;
  objectivesSolve: string;
  approachPlan: string;
  features: ProposalFeature[];
  conclusion: string;
}

export interface McqProgressState {
  mode: 'end' | 'immediate';
  attempts: number;
  bestScore: number | null;
  bestTotal: number | null;
  lastWrongIds: number[];
  flaggedIds: number[];
  sectionCorrect: Record<string, number>;
  sectionTotal: Record<string, number>;
}

export interface StudyProgressState {
  theme: 'light' | 'dark';
  doneWeeks: number[];
  readNotes: number[];
  completedLabs: string[];
  checkedDeliverables: Record<string, boolean>; // `${week}-${n}`
  checkedTeamItems: Record<string, boolean>;
  quizBestScores: Record<number, number>; // weekId -> best out of 5
  lastPageByWeek: Record<number, number>;
  lastVisited: {
    weekId?: number;
    slidePage?: number;
    labId?: string;
    noteWeek?: number;
  };
  bookmarks: BookmarkItem[];
  mcq: McqProgressState;
  proposal: ProposalDraft;
}

const STORAGE_KEY = 'cse3100-study-portal-v1';
const THEME_KEY = 'cse3100-theme';

const DEFAULT_PROPOSAL: ProposalDraft = {
  projectName: '',
  studentId: '',
  studentName: '',
  level: '3',
  term: '1',
  section: 'A',
  submissionDate: '',
  problemStatement: '',
  objectivesSolve: '',
  approachPlan: '',
  features: [
    { id: 'f1', title: '', description: '' },
    { id: 'f2', title: '', description: '' },
    { id: 'f3', title: '', description: '' },
    { id: 'f4', title: '', description: '' },
  ],
  conclusion: '',
};

const DEFAULT_STATE: StudyProgressState = {
  theme: 'light',
  doneWeeks: [],
  readNotes: [],
  completedLabs: [],
  checkedDeliverables: {},
  checkedTeamItems: {},
  quizBestScores: {},
  lastPageByWeek: {},
  lastVisited: {},
  bookmarks: [],
  mcq: {
    mode: 'end',
    attempts: 0,
    bestScore: null,
    bestTotal: null,
    lastWrongIds: [],
    flaggedIds: [],
    sectionCorrect: {},
    sectionTotal: {},
  },
  proposal: DEFAULT_PROPOSAL,
};

function readInitialState(): StudyProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<StudyProgressState>) : {};
    return {
      ...DEFAULT_STATE,
      ...parsed,
      theme: savedTheme === 'dark' ? 'dark' : 'light',
      mcq: {
        ...DEFAULT_STATE.mcq,
        ...(parsed.mcq || {}),
      },
      proposal: {
        ...DEFAULT_PROPOSAL,
        ...(parsed.proposal || {}),
        features:
          parsed.proposal?.features && parsed.proposal.features.length >= 4
            ? parsed.proposal.features
            : DEFAULT_PROPOSAL.features,
      },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useStudyStore() {
  const [state, setState] = useState<StudyProgressState>(readInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(THEME_KEY, state.theme);
    } catch {
      // Ignore storage quota / disabled storage
    }
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state]);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  }, []);

  const toggleWeekDone = useCallback((weekId: number) => {
    setState((prev) => {
      const exists = prev.doneWeeks.includes(weekId);
      return {
        ...prev,
        doneWeeks: exists
          ? prev.doneWeeks.filter((w) => w !== weekId)
          : [...prev.doneWeeks, weekId],
      };
    });
  }, []);

  const toggleNoteRead = useCallback((weekId: number) => {
    setState((prev) => {
      const exists = prev.readNotes.includes(weekId);
      return {
        ...prev,
        readNotes: exists
          ? prev.readNotes.filter((w) => w !== weekId)
          : [...prev.readNotes, weekId],
      };
    });
  }, []);

  const markLabCompleted = useCallback((labId: string) => {
    setState((prev) => {
      if (prev.completedLabs.includes(labId)) return prev;
      return {
        ...prev,
        completedLabs: [...prev.completedLabs, labId],
      };
    });
  }, []);

  const toggleDeliverable = useCallback((weekId: number, n: number) => {
    const key = `${weekId}-${n}`;
    setState((prev) => ({
      ...prev,
      checkedDeliverables: {
        ...prev.checkedDeliverables,
        [key]: !prev.checkedDeliverables[key],
      },
    }));
  }, []);

  const toggleTeamCheck = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checkedTeamItems: {
        ...prev.checkedTeamItems,
        [id]: !prev.checkedTeamItems[id],
      },
    }));
  }, []);

  const recordQuizScore = useCallback((weekId: number, score: number) => {
    setState((prev) => {
      const currentBest = prev.quizBestScores[weekId] ?? 0;
      return {
        ...prev,
        quizBestScores: {
          ...prev.quizBestScores,
          [weekId]: Math.max(currentBest, score),
        },
      };
    });
  }, []);

  const setWeekSlidePage = useCallback((weekId: number, page: number) => {
    setState((prev) => ({
      ...prev,
      lastPageByWeek: {
        ...prev.lastPageByWeek,
        [weekId]: page,
      },
      lastVisited: {
        ...prev.lastVisited,
        weekId,
        slidePage: page,
      },
    }));
  }, []);

  const recordVisitedLab = useCallback((labId: string) => {
    setState((prev) => ({
      ...prev,
      lastVisited: {
        ...prev.lastVisited,
        labId,
      },
    }));
  }, []);

  const recordVisitedNote = useCallback((noteWeek: number) => {
    setState((prev) => ({
      ...prev,
      lastVisited: {
        ...prev.lastVisited,
        noteWeek,
      },
    }));
  }, []);

  const toggleBookmark = useCallback((item: BookmarkItem) => {
    setState((prev) => {
      const exists = prev.bookmarks.some((b) => b.id === item.id);
      return {
        ...prev,
        bookmarks: exists
          ? prev.bookmarks.filter((b) => b.id !== item.id)
          : [item, ...prev.bookmarks],
      };
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => state.bookmarks.some((b) => b.id === id),
    [state.bookmarks]
  );

  const setMcqMode = useCallback((mode: 'end' | 'immediate') => {
    setState((prev) => ({
      ...prev,
      mcq: { ...prev.mcq, mode },
    }));
  }, []);

  const toggleMcqFlag = useCallback((id: number) => {
    setState((prev) => {
      const exists = prev.mcq.flaggedIds.includes(id);
      return {
        ...prev,
        mcq: {
          ...prev.mcq,
          flaggedIds: exists
            ? prev.mcq.flaggedIds.filter((x) => x !== id)
            : [...prev.mcq.flaggedIds, id],
        },
      };
    });
  }, []);

  const recordMcqAttempt = useCallback(
    (
      score: number,
      total: number,
      wrongIds: number[],
      sectionBreakdown: Record<string, { correct: number; total: number }>
    ) => {
      setState((prev) => {
        const nextCorrect = { ...prev.mcq.sectionCorrect };
        const nextTotal = { ...prev.mcq.sectionTotal };
        Object.entries(sectionBreakdown).forEach(([sec, val]) => {
          nextCorrect[sec] = (nextCorrect[sec] || 0) + val.correct;
          nextTotal[sec] = (nextTotal[sec] || 0) + val.total;
        });
        const prevPct =
          prev.mcq.bestScore !== null && prev.mcq.bestTotal
            ? prev.mcq.bestScore / prev.mcq.bestTotal
            : -1;
        const currPct = total > 0 ? score / total : 0;
        const isBetter = currPct >= prevPct;
        return {
          ...prev,
          mcq: {
            ...prev.mcq,
            attempts: prev.mcq.attempts + 1,
            bestScore: isBetter ? score : prev.mcq.bestScore,
            bestTotal: isBetter ? total : prev.mcq.bestTotal,
            lastWrongIds: wrongIds,
            sectionCorrect: nextCorrect,
            sectionTotal: nextTotal,
          },
        };
      });
    },
    []
  );

  const updateProposal = useCallback((patch: Partial<ProposalDraft>) => {
    setState((prev) => ({
      ...prev,
      proposal: { ...prev.proposal, ...patch },
    }));
  }, []);

  const clearProposal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      proposal: DEFAULT_PROPOSAL,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setState((prev) => ({
      ...DEFAULT_STATE,
      theme: prev.theme,
    }));
  }, []);

  return {
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
  };
}
