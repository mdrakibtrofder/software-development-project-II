import React, { useState } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, RefreshCw, Zap, Menu, Layers } from 'lucide-react';
import { SimWrapper } from './SimWrapper';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 5. widget-tree: Build the Widget Tree */
interface TreeChild {
  id: string;
  widget: 'Text' | 'SizedBox' | 'ElevatedButton' | 'Card' | 'Padding';
  label: string;
  isConst: boolean;
}

const INITIAL_CHILDREN: TreeChild[] = [
  { id: 'c1', widget: 'Text', label: "Text('CSE 3100')", isConst: true },
  { id: 'c2', widget: 'SizedBox', label: 'SizedBox(height: 12)', isConst: true },
  { id: 'c3', widget: 'ElevatedButton', label: "ElevatedButton('Open')", isConst: false },
];

export const WidgetTreeSim: React.FC<CommonSimProps> = (props) => {
  const [preset, setPreset] = useState<'scaffold' | 'course-card'>('scaffold');
  const [children, setChildren] = useState<TreeChild[]>(INITIAL_CHILDREN);
  const [showConstSkip, setShowConstSkip] = useState(true);
  const [classifierIdx, setClassifierIdx] = useState(0);
  const [classifierAnswer, setClassifierAnswer] = useState<'Stateless' | 'Stateful' | null>(null);

  const classifyItems = [
    { item: 'University Logo Header', answer: 'Stateless' as const, why: 'Logo never changes after build.' },
    { item: 'Like Counter Button', answer: 'Stateful' as const, why: 'Tap count changes over time via setState().' },
    { item: 'Sign-up Form with Input Validation', answer: 'Stateful' as const, why: 'Input text and validation messages mutate.' },
  ];

  const addChild = (widget: TreeChild['widget']) => {
    const id = `c${Date.now()}`;
    const labelMap: Record<TreeChild['widget'], string> = {
      Text: "Text('BAUST')",
      SizedBox: 'SizedBox(height: 8)',
      ElevatedButton: "ElevatedButton('Tap')",
      Card: "Card(child: Text('Item'))",
      Padding: "Padding(padding: 8)",
    };
    setChildren((prev) => [
      ...prev,
      { id, widget, label: labelMap[widget], isConst: widget === 'Text' || widget === 'SizedBox' },
    ]);
  };

  const moveChild = (idx: number, dir: -1 | 1) => {
    const next = [...children];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setChildren(next);
  };

  const dartPreview =
    preset === 'course-card'
      ? `Card(\n  child: Padding(\n    padding: const EdgeInsets.all(16),\n    child: Column(\n      children: [\n${children
          .map((c) => `        ${c.isConst ? 'const ' : ''}${c.label},`)
          .join('\n')}\n      ],\n    ),\n  ),\n)`
      : `MaterialApp(\n  home: Scaffold(\n    appBar: AppBar(title: const Text('BAUST')),\n    body: Center(\n      child: Column(\n        children: [\n${children
          .map((c) => `          ${c.isConst ? 'const ' : ''}${c.label},`)
          .join('\n')}\n        ],\n      ),\n    ),\n  ),\n)`;

  return (
    <SimWrapper
      labId="widget-tree"
      caption="Parents are blue, leaf widgets are green. Marking widgets const lets Flutter skip rebuilding them."
      onReset={() => {
        setPreset('scaffold');
        setChildren(INITIAL_CHILDREN);
        setClassifierAnswer(null);
      }}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setPreset('scaffold')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              preset === 'scaffold' ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs' : 'text-[var(--text-muted)]'
            }`}
          >
            Scaffold Tree
          </button>
          <button
            type="button"
            onClick={() => setPreset('course-card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              preset === 'course-card' ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs' : 'text-[var(--text-muted)]'
            }`}
          >
            Minimal Course Card
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={showConstSkip}
            onChange={(e) => setShowConstSkip(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          Highlight <code className="font-mono text-[var(--primary)]">const</code> rebuild skips
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Visual Tree */}
        <div className="lg:col-span-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2.5">
          <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[var(--border)]">
            {(['Text', 'SizedBox', 'ElevatedButton', 'Card', 'Padding'] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => addChild(w)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[11px] font-mono font-semibold hover:border-[var(--primary)]"
              >
                <Plus className="w-3 h-3" /> {w}
              </button>
            ))}
          </div>

          {/* Parent Chain (Blue) */}
          <div className="space-y-1.5 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500 text-sky-700 dark:text-sky-300 font-semibold">
              {preset === 'course-card' ? 'Card' : 'MaterialApp → home: Scaffold'}
            </div>
            <div className="ml-4 px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500 text-sky-700 dark:text-sky-300 font-semibold">
              {preset === 'course-card' ? 'child: Padding(16) → child: Column' : 'body: Center → child: Column'}
            </div>

            {/* Editable Leaf Children (Green) */}
            <div className="ml-8 space-y-1.5">
              {children.map((c, idx) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500 text-emerald-800 dark:text-emerald-300"
                >
                  <div className="min-w-0 truncate">
                    <span className="font-semibold">{c.label}</span>
                    {showConstSkip && c.isConst && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                        const (reused)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveChild(idx, -1)}
                      aria-label="Move widget up"
                      className="p-1 hover:bg-emerald-500/20 rounded"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveChild(idx, 1)}
                      aria-label="Move widget down"
                      className="p-1 hover:bg-emerald-500/20 rounded"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setChildren((p) => p.filter((x) => x.id !== c.id))}
                      aria-label="Remove widget"
                      className="p-1 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Dart Output + Classifier */}
        <div className="lg:col-span-6 space-y-3">
          <div className="rounded-xl bg-[#0F172A] text-slate-100 p-3.5 font-mono text-xs overflow-x-auto border border-[#273244]">
            <pre className="m-0">{dartPreview}</pre>
          </div>

          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs">
            <div className="font-bold text-[var(--text)] mb-1">
              Quick Check: Stateless or Stateful?
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-[var(--primary)]">
                "{classifyItems[classifierIdx].item}"
              </span>
              <div className="flex gap-1.5">
                {(['Stateless', 'Stateful'] as const).map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => setClassifierAnswer(choice)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                      classifierAnswer === choice
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--surface)] border-[var(--border)]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setClassifierIdx((i) => (i + 1) % classifyItems.length);
                    setClassifierAnswer(null);
                  }}
                  className="px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                >
                  Next
                </button>
              </div>
            </div>
            {classifierAnswer && (
              <div className="mt-1.5 text-[11px] font-medium text-[var(--text-muted)]">
                {classifierAnswer === classifyItems[classifierIdx].answer ? '✓ Correct: ' : '✗ '}
                {classifyItems[classifierIdx].why}
              </div>
            )}
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 6. state-lab: setState, Hot Reload and Hot Restart */
export const StateLabSim: React.FC<CommonSimProps> = (props) => {
  const [mode, setMode] = useState<'correct' | 'forgot'>('correct');
  const [memoryCount, setMemoryCount] = useState(0);
  const [screenCount, setScreenCount] = useState(0);
  const [cycleStep, setCycleStep] = useState(0);
  const [lastAction, setLastAction] = useState('Ready — tap +1 to observe the rebuild cycle.');

  const cycleSteps = [
    '1. Data changes (count++)',
    '2. Call setState(() => ...)',
    '3. Flutter marks widget dirty',
    '4. build() runs again & updates screen',
  ];

  const handleTap = () => {
    const next = memoryCount + 1;
    setMemoryCount(next);
    if (mode === 'correct') {
      setScreenCount(next);
      setCycleStep(3);
      setLastAction(`setState() ran: memory count = ${next}, screen updated to ${next}.`);
    } else {
      setCycleStep(0);
      setLastAction(`Forgot setState(): memory count is now ${next}, but screen is stuck at ${screenCount}!`);
    }
  };

  const handleHotReload = () => {
    setLastAction(`Hot Reload (r): code updated and state KEPT (count = ${memoryCount}).`);
  };

  const handleHotRestart = () => {
    setMemoryCount(0);
    setScreenCount(0);
    setCycleStep(0);
    setLastAction('Hot Restart (R): restarted from main() — state RESET to 0.');
  };

  return (
    <SimWrapper
      labId="state-lab"
      caption={`Reload keeps state, restart loses it. ${lastAction}`}
      step={cycleStep}
      totalSteps={4}
      onStepChange={setCycleStep}
      onReset={handleHotRestart}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('correct')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            mode === 'correct'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Case A: With setState()
        </button>
        <button
          type="button"
          onClick={() => setMode('forgot')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            mode === 'forgot'
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Case B: Forgot setState() bug
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Phone Mock */}
        <div className="lg:col-span-5 mx-auto w-full max-w-[260px] rounded-3xl border-4 border-slate-800 bg-[var(--surface)] overflow-hidden shadow-lg">
          <div className="bg-[var(--primary)] text-white px-4 py-2.5 text-xs font-bold">
            Counter App
          </div>
          <div className="p-6 text-center space-y-3">
            <div className="text-xs text-[var(--text-muted)]">Screen displays:</div>
            <div className="font-mono text-4xl font-extrabold tabular-nums text-[var(--text)]">
              {screenCount}
            </div>
            <button
              type="button"
              onClick={handleTap}
              className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:opacity-90"
            >
              Tap +1 ({mode === 'correct' ? 'with setState' : 'no setState'})
            </button>
          </div>
        </div>

        {/* Debug & Lifecycle Panel */}
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50">
              <div className="text-[11px] text-[var(--text-muted)] font-mono">Dart variable in memory</div>
              <div className="font-mono text-2xl font-bold tabular-nums text-[var(--primary)] mt-1">
                count = {memoryCount}
              </div>
            </div>
            <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50">
              <div className="text-[11px] text-[var(--text-muted)] font-mono">Rendered on screen</div>
              <div
                className={`font-mono text-2xl font-bold tabular-nums mt-1 ${
                  memoryCount !== screenCount ? 'text-[var(--danger)]' : 'text-[var(--success)]'
                }`}
              >
                Text('{screenCount}')
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {cycleSteps.map((s, idx) => (
              <div
                key={s}
                className={`p-2 rounded-lg border text-[11px] font-medium ${
                  cycleStep === idx
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleHotReload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Hot Reload (r) — keeps state
            </button>
            <button
              type="button"
              onClick={handleHotRestart}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-500" />
              Hot Restart (R) — resets state
            </button>
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            Note: Editing <code className="font-mono">initState()</code>, global variables, or native config requires a Hot Restart or full rebuild.
          </p>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 7. navigation: Four Ways to Move */
export const NavigationSim: React.FC<CommonSimProps> = (props) => {
  const [navType, setNavType] = useState<'bottom' | 'tabs' | 'drawer' | 'push'>('bottom');
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [routeStack, setRouteStack] = useState<string[]>(['HomeScreen']);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPick, setQuizPick] = useState<'State' | 'Route' | null>(null);

  const tabLabels = ['Courses', 'Map', 'Profile'];
  const quizItems = [
    { label: 'Switching between 3 bottom bar tabs', ans: 'State' as const },
    { label: 'Opening an About screen from a button', ans: 'Route' as const },
    { label: 'Picking an item in a slide-out Drawer', ans: 'State' as const },
    { label: 'Tapping a list item to view its DetailPage', ans: 'Route' as const },
  ];

  return (
    <SimWrapper
      labId="navigation"
      caption="Drawer, BottomNavigationBar & TabBar swap body content inside one screen; Navigator.push/pop stacks new routes."
      onReset={() => {
        setNavType('bottom');
        setActiveTab(0);
        setDrawerOpen(false);
        setRouteStack(['HomeScreen']);
        setQuizPick(null);
      }}
      {...props}
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {[
          { id: 'bottom', label: 'BottomNavigationBar (State)' },
          { id: 'tabs', label: 'TabBar (State)' },
          { id: 'drawer', label: 'Drawer (State)' },
          { id: 'push', label: 'Navigator.push / pop (Route)' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setNavType(item.id as typeof navType)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              navType === item.id
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Phone Simulator */}
        <div className="lg:col-span-5 mx-auto w-full max-w-[270px] rounded-3xl border-4 border-slate-800 bg-[var(--surface)] overflow-hidden shadow-md relative min-h-[260px] flex flex-col">
          <div className="bg-[var(--primary)] text-white px-3.5 py-2.5 flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              {navType === 'drawer' && (
                <button
                  type="button"
                  onClick={() => setDrawerOpen((d) => !d)}
                  aria-label="Toggle drawer"
                  className="p-0.5 hover:bg-white/20 rounded"
                >
                  <Menu className="w-4 h-4" />
                </button>
              )}
              <span>
                {navType === 'push' ? routeStack[routeStack.length - 1] : tabLabels[activeTab]}
              </span>
            </div>
            {navType === 'push' && routeStack.length > 1 && (
              <button
                type="button"
                onClick={() => setRouteStack((s) => s.slice(0, -1))}
                className="text-[11px] underline"
              >
                pop()
              </button>
            )}
          </div>

          {navType === 'tabs' && (
            <div className="flex border-b border-[var(--border)] bg-[var(--surface-2)]">
              {tabLabels.map((lbl, idx) => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 py-2 text-[11px] font-semibold border-b-2 ${
                    activeTab === idx
                      ? 'border-[var(--primary)] text-[var(--primary)]'
                      : 'border-transparent text-[var(--text-muted)]'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 p-5 flex flex-col items-center justify-center text-center">
            {navType === 'push' ? (
              <>
                <div className="text-sm font-bold text-[var(--text)]">
                  {routeStack[routeStack.length - 1]}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setRouteStack((s) => [...s, `DetailScreen #${s.length}`])
                  }
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
                >
                  Navigator.push(Detail)
                </button>
              </>
            ) : (
              <>
                <div className="text-sm font-bold text-[var(--text)]">
                  Showing {tabLabels[activeTab]} Body
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-1">
                  Same Scaffold — index = {activeTab}
                </div>
              </>
            )}
          </div>

          {navType === 'bottom' && (
            <div className="flex border-t border-[var(--border)] bg-[var(--surface-2)]">
              {tabLabels.map((lbl, idx) => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 py-2 text-[11px] font-semibold ${
                    activeTab === idx ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          )}

          {navType === 'drawer' && drawerOpen && (
            <div className="absolute inset-y-0 left-0 w-44 bg-[var(--surface)] border-r border-[var(--border)] shadow-xl p-3 space-y-1 z-10">
              <div className="text-[11px] font-mono text-[var(--primary)] font-bold pb-2 border-b border-[var(--border)]">
                Drawer Menu
              </div>
              {tabLabels.map((lbl, idx) => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => {
                    setActiveTab(idx);
                    setDrawerOpen(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--surface-2)]"
                >
                  {lbl}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Route Stack & Quiz */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text)] mb-2">
              <Layers className="w-4 h-4 text-[var(--primary)]" />
              Live Navigator Route Stack
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {routeStack.map((r, i) => (
                <span
                  key={`${r}-${i}`}
                  className="px-2.5 py-1 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] font-semibold border border-[var(--primary)]/30"
                >
                  {i}: {r}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2">
              Warning: Most navigation bugs come from confusing intra-screen state switches with pushing new routes onto the stack.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs">
            <div className="font-bold text-[var(--text)] mb-1">State or Route?</div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span>{quizItems[quizIdx].label}</span>
              <div className="flex gap-1.5">
                {(['State', 'Route'] as const).map((ans) => (
                  <button
                    key={ans}
                    type="button"
                    onClick={() => setQuizPick(ans)}
                    className={`px-2.5 py-1 rounded-lg border font-semibold ${
                      quizPick === ans
                        ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                        : 'bg-[var(--surface)] border-[var(--border)]'
                    }`}
                  >
                    {ans}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setQuizIdx((i) => (i + 1) % quizItems.length);
                    setQuizPick(null);
                  }}
                  className="px-2 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)]"
                >
                  Next
                </button>
              </div>
            </div>
            {quizPick && (
              <div className="mt-1.5 font-medium text-[var(--primary)]">
                {quizPick === quizItems[quizIdx].ans
                  ? `✓ Correct! Uses ${quizItems[quizIdx].ans}.`
                  : `✗ Actually uses ${quizItems[quizIdx].ans}.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};
