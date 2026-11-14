import React, { useState, useEffect } from 'react';
import { Check, GitBranch, AlertTriangle, ShieldAlert, Keyboard, Terminal } from 'lucide-react';
import { SimWrapper } from './SimWrapper';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 19. shortcuts: VS Code and Flutter CLI Trainer */
const SHORTCUT_DRILLS = [
  { task: 'Open Command Palette', win: 'Ctrl+Shift+P', mac: 'Cmd+Shift+P', keys: ['Control+Shift+P', 'Meta+Shift+P'], choices: ['Ctrl+Shift+P', 'Ctrl+P', 'Ctrl+G', 'Shift+Alt+F'] },
  { task: 'Global search across all files', win: 'Ctrl+Shift+F', mac: 'Cmd+Shift+F', keys: ['Control+Shift+F', 'Meta+Shift+F'], choices: ['Ctrl+F', 'Ctrl+Shift+F', 'Ctrl+H', 'Ctrl+P'] },
  { task: 'Rename a symbol everywhere', win: 'F2', mac: 'F2', keys: ['F2'], choices: ['F1', 'F2', 'F5', 'F12'] },
  { task: 'Quick open any file by name', win: 'Ctrl+P', mac: 'Cmd+P', keys: ['Control+P', 'Meta+P'], choices: ['Ctrl+P', 'Ctrl+K', 'Ctrl+Shift+P', 'Ctrl+/'] },
  { task: 'Format the document', win: 'Shift+Alt+F', mac: 'Shift+Option+F', keys: ['Shift+Alt+F'], choices: ['Ctrl+Shift+F', 'Shift+Alt+F', 'Alt+Up', 'Ctrl+Space'] },
  { task: 'Duplicate the current line', win: 'Shift+Alt+↓', mac: 'Shift+Option+↓', keys: ['Shift+Alt+ArrowDown'], choices: ['Alt+Down', 'Shift+Alt+↓', 'Ctrl+D', 'Ctrl+/'] },
];

const CLI_MATCHES = [
  { goal: 'Check SDK, Android toolchain & device status', cmd: 'flutter doctor' },
  { goal: 'Run the app in Chrome without an emulator', cmd: 'flutter run -d chrome' },
  { goal: 'Install the http package in pubspec.yaml', cmd: 'flutter pub add http' },
  { goal: 'Delete stale build files when stuck', cmd: 'flutter clean' },
  { goal: 'Check static warnings & errors', cmd: 'flutter analyze' },
];

export const ShortcutsSim: React.FC<CommonSimProps> = (props) => {
  const [tab, setTab] = useState<'drill' | 'regex' | 'cli'>('drill');
  const [os, setOs] = useState<'win' | 'mac'>('win');
  const [drillIdx, setDrillIdx] = useState(0);
  const [drillResult, setDrillResult] = useState<string | null>(null);
  const [listenKeys, setListenKeys] = useState(false);

  // Regex find & replace
  const [regexMode, setRegexMode] = useState(true);
  const [replaced, setReplaced] = useState(false);
  const [committedFirst, setCommittedFirst] = useState(true);

  // CLI matcher
  const [cliIdx, setCliIdx] = useState(0);
  const [cliPick, setCliPick] = useState<string | null>(null);

  const drill = SHORTCUT_DRILLS[drillIdx];

  useEffect(() => {
    if (!listenKeys) return;
    const onKey = (e: KeyboardEvent) => {
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;
      e.preventDefault();
      const parts: string[] = [];
      if (e.ctrlKey) parts.push('Control');
      if (e.metaKey) parts.push('Meta');
      if (e.shiftKey) parts.push('Shift');
      if (e.altKey) parts.push('Alt');
      parts.push(e.key.length === 1 ? e.key.toUpperCase() : e.key);
      const combo = parts.join('+');
      if (drill.keys.includes(combo)) {
        setDrillResult(`✓ Correct! ${os === 'win' ? drill.win : drill.mac}`);
        setListenKeys(false);
      } else {
        setDrillResult(`Pressed ${combo} — expected ${os === 'win' ? drill.win : drill.mac}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [listenKeys, drill, os]);

  return (
    <SimWrapper
      labId="shortcuts"
      caption={
        tab === 'drill'
          ? `Tip: stless + Tab generates a StatelessWidget; stful + Tab generates a StatefulWidget.`
          : tab === 'regex'
          ? 'Always commit your work before a global find-and-replace (Ctrl+Shift+H) so git restore can undo mistakes.'
          : 'Stuck on a broken build? Run: flutter clean → flutter pub get → flutter run.'
      }
      onReset={() => {
        setDrillIdx(0);
        setDrillResult(null);
        setListenKeys(false);
        setReplaced(false);
        setCliIdx(0);
        setCliPick(null);
      }}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <button type="button" onClick={() => setTab('drill')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tab === 'drill' ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs' : 'text-[var(--text-muted)]'}`}>
            Shortcut Drill
          </button>
          <button type="button" onClick={() => setTab('regex')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tab === 'regex' ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs' : 'text-[var(--text-muted)]'}`}>
            Global Replace
          </button>
          <button type="button" onClick={() => setTab('cli')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tab === 'cli' ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs' : 'text-[var(--text-muted)]'}`}>
            Flutter CLI Matcher
          </button>
        </div>

        {tab === 'drill' && (
          <div className="flex gap-1 text-xs">
            <button type="button" onClick={() => setOs('win')} className={`px-2.5 py-1 rounded-lg border font-mono ${os === 'win' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
              Windows / Linux
            </button>
            <button type="button" onClick={() => setOs('mac')} className={`px-2.5 py-1 rounded-lg border font-mono ${os === 'mac' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'}`}>
              macOS (⌘ / ⌥)
            </button>
          </div>
        )}
      </div>

      {tab === 'drill' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-3">
            <div className="font-mono text-xs text-[var(--primary)] font-bold">
              Prompt {drillIdx + 1}/{SHORTCUT_DRILLS.length}
            </div>
            <div className="text-lg font-bold text-[var(--text)]">{drill.task}</div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setListenKeys((v) => !v);
                  setDrillResult(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border ${
                  listenKeys ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                {listenKeys ? 'Press keys on keyboard now...' : 'Capture on keyboard'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrillIdx((i) => (i + 1) % SHORTCUT_DRILLS.length);
                  setDrillResult(null);
                  setListenKeys(false);
                }}
                className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold"
              >
                Next prompt
              </button>
            </div>
            {drillResult && (
              <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] font-mono text-xs">
                {drillResult}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-2">
            {drill.choices.map((ch) => {
              const label = os === 'mac' ? ch.replace('Ctrl', 'Cmd').replace('Alt', 'Option') : ch;
              const expected = os === 'win' ? drill.win : drill.mac;
              return (
                <button
                  key={ch}
                  type="button"
                  onClick={() =>
                    setDrillResult(
                      label === expected
                        ? `✓ Correct! ${expected}`
                        : `✗ ${label} is a different shortcut. Expected ${expected}.`
                    )
                  }
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] font-mono text-xs font-bold shadow-xs"
                >
                  <kbd className="px-2 py-1 rounded bg-[var(--surface-2)] border border-[var(--border)]">
                    {label}
                  </kbd>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {tab === 'regex' && (
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
            <span className="font-mono">Find: <strong className="text-sky-600 dark:text-sky-300">Colors\.blue</strong></span>
            <span className="font-mono">Replace: <strong className="text-emerald-600 dark:text-emerald-300">Colors.green</strong></span>
            <label className="flex items-center gap-1.5 cursor-pointer font-mono">
              <input type="checkbox" checked={regexMode} onChange={(e) => setRegexMode(e.target.checked)} className="accent-[var(--primary)]" />
              .* Regex
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
              <input type="checkbox" checked={committedFirst} onChange={(e) => setCommittedFirst(e.target.checked)} className="accent-emerald-600" />
              Committed before replace?
            </label>
            <button
              type="button"
              onClick={() => setReplaced((r) => !r)}
              className="ml-auto px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white font-semibold"
            >
              {replaced ? 'Undo Replace' : 'Replace All in Files'}
            </button>
          </div>
          {!committedFirst && (
            <div className="p-2.5 rounded-lg bg-[var(--state-warn)] text-[var(--warning)] font-medium">
              Warning: Commit your work before running a global find-and-replace so you can safely revert!
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-[#0F172A] text-slate-200 border border-[#273244]">
              <div className="text-slate-400 text-[11px] mb-1">lib/main.dart</div>
              <div>seedColor: {replaced && regexMode ? 'Colors.green' : 'Colors.blue'},</div>
            </div>
            <div className="p-3 rounded-xl bg-[#0F172A] text-slate-200 border border-[#273244]">
              <div className="text-slate-400 text-[11px] mb-1">lib/theme.dart</div>
              <div>primary: {replaced && regexMode ? 'Colors.green' : 'Colors.blue'},</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'cli' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
          <div className="lg:col-span-6 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-[var(--primary)] font-bold">
              <Terminal className="w-3.5 h-3.5" />
              Goal {cliIdx + 1}/{CLI_MATCHES.length}
            </div>
            <div className="text-base font-bold text-[var(--text)]">{CLI_MATCHES[cliIdx].goal}</div>
            <div className="text-[11px] text-[var(--text-muted)] pt-1">
              Run keys while app is active: <code className="font-mono">r</code> reload · <code className="font-mono">R</code> restart · <code className="font-mono">q</code> quit · <code className="font-mono">h</code> help.
            </div>
          </div>

          <div className="lg:col-span-6 space-y-1.5">
            {CLI_MATCHES.map((m) => {
              const correct = m.cmd === CLI_MATCHES[cliIdx].cmd;
              const picked = cliPick === m.cmd;
              return (
                <button
                  key={m.cmd}
                  type="button"
                  onClick={() => setCliPick(m.cmd)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border font-mono text-left ${
                    picked
                      ? correct
                        ? 'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-bold'
                        : 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]'
                      : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]'
                  }`}
                >
                  <span>$ {m.cmd}</span>
                  {picked && correct && <Check className="w-4 h-4" />}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setCliIdx((i) => (i + 1) % CLI_MATCHES.length);
                setCliPick(null);
              }}
              className="mt-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-semibold"
            >
              Next CLI goal
            </button>
          </div>
        </div>
      )}
    </SimWrapper>
  );
};

/* 20. git-lab: Four Places, Branches and Conflicts */
export type GitStage = 'working' | 'staged' | 'committed' | 'pushed';

export function advanceGitStage(current: GitStage, command: 'add' | 'commit' | 'push'): GitStage {
  if (command === 'add' && current === 'working') return 'staged';
  if (command === 'commit' && current === 'staged') return 'committed';
  if (command === 'push' && current === 'committed') return 'pushed';
  return current;
}

export const GitLabSim: React.FC<CommonSimProps> = (props) => {
  const [subTab, setSubTab] = useState<'places' | 'conflict' | 'ignore'>('places');
  const [gitStage, setGitStage] = useState<GitStage>('working');
  const [branch, setBranch] = useState<'main' | 'lab6/220101'>('main');
  const [commitMsg, setCommitMsg] = useState('Add login screen');
  const [emailConfigured, setEmailConfigured] = useState(true);
  const [conflictChoice, setConflictChoice] = useState<'none' | 'current' | 'incoming' | 'both'>('none');
  const [ignoredFiles, setIgnoredFiles] = useState<Record<string, boolean>>({
    'build/': true,
    '.dart_tool/': true,
    '.idea/': true,
    'lib/keys.dart': true,
    'lib/main.dart': false,
  });

  const msgGood = commitMsg.trim().length >= 8 && !/^update$/i.test(commitMsg.trim());

  const placeList: { id: GitStage; label: string; desc: string }[] = [
    { id: 'working', label: '1. Working Folder', desc: 'Edited files on disk' },
    { id: 'staged', label: '2. Staging Area', desc: 'Queued via git add .' },
    { id: 'committed', label: '3. Local Repository', desc: 'Saved snapshot via git commit' },
    { id: 'pushed', label: '4. Remote (GitHub origin)', desc: 'Uploaded via git push' },
  ];

  const leakedKey = !ignoredFiles['lib/keys.dart'];

  return (
    <SimWrapper
      labId="git-lab"
      caption={
        subTab === 'places'
          ? `Branch: ${branch} · Stage: ${gitStage}${!emailConfigured ? ' · Warning: user.email missing (first push will fail!)' : ''}`
          : subTab === 'conflict'
          ? conflictChoice === 'none'
            ? 'Merge conflict! Pick Current, Incoming or Both, then save, git add and git commit.'
            : `Conflict resolved using "${conflictChoice}". Ready to git add & git commit.`
          : leakedKey
          ? 'SECURITY ALERT: lib/keys.dart (Maps API key) is tracked! Add it to .gitignore!'
          : 'Safe .gitignore: build/, .dart_tool/, .idea/ and API keys stay out of Git; lib/main.dart is tracked.'
      }
      onReset={() => {
        setGitStage('working');
        setBranch('main');
        setConflictChoice('none');
        setEmailConfigured(true);
      }}
      {...props}
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {[
          { id: 'places', label: 'Four Places & Branching' },
          { id: 'conflict', label: 'Merge Conflict Resolver' },
          { id: 'ignore', label: '.gitignore & API Key Audit' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSubTab(t.id as typeof subTab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              subTab === t.id ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === 'places' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {placeList.map((p) => {
              const active = gitStage === p.id;
              return (
                <div
                  key={p.id}
                  className={`p-3 rounded-xl border-2 transition-colors ${
                    active ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface-2)]/40'
                  }`}
                >
                  <div className="font-mono text-xs font-bold text-[var(--text)]">{p.label}</div>
                  <div className="text-[11px] text-[var(--text-muted)] mt-0.5">{p.desc}</div>
                  {active && (
                    <div className="mt-2 inline-block px-2 py-0.5 rounded bg-[var(--primary)] text-white font-mono text-[10px] font-bold">
                      lib/main.dart here
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center text-xs">
            <div className="lg:col-span-7 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBranch((b) => (b === 'main' ? 'lab6/220101' : 'main'))}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono font-semibold hover:border-[var(--primary)]"
              >
                <GitBranch className="w-3.5 h-3.5 text-amber-500" />
                git switch -c lab6/220101 ({branch})
              </button>
              <button
                type="button"
                disabled={gitStage !== 'working'}
                onClick={() => setGitStage((s) => advanceGitStage(s, 'add'))}
                className="px-3 py-2 rounded-xl bg-sky-600 text-white font-mono font-semibold disabled:opacity-40"
              >
                1. git add .
              </button>
              <button
                type="button"
                disabled={gitStage !== 'staged' || !msgGood}
                onClick={() => setGitStage((s) => advanceGitStage(s, 'commit'))}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white font-mono font-semibold disabled:opacity-40"
              >
                2. git commit -m
              </button>
              <button
                type="button"
                disabled={gitStage !== 'committed' || !emailConfigured}
                onClick={() => setGitStage((s) => advanceGitStage(s, 'push'))}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-mono font-semibold disabled:opacity-40"
              >
                3. git push
              </button>
            </div>

            <div className="lg:col-span-5 space-y-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
              <label className="block">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Commit message</span>
                  <span className={msgGood ? 'text-[var(--success)] font-bold' : 'text-[var(--danger)] font-bold'}>
                    {msgGood ? 'Descriptive ✓' : 'Too vague ✗'}
                  </span>
                </div>
                <input
                  type="text"
                  value={commitMsg}
                  onChange={(e) => setCommitMsg(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
                />
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={emailConfigured} onChange={(e) => setEmailConfigured(e.target.checked)} className="accent-[var(--primary)]" />
                <code>git config --global user.email</code> configured
              </label>
            </div>
          </div>
        </div>
      )}

      {subTab === 'conflict' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <button type="button" onClick={() => setConflictChoice('current')} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">
              Accept Current (HEAD)
            </button>
            <button type="button" onClick={() => setConflictChoice('incoming')} className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-semibold">
              Accept Incoming (lab6)
            </button>
            <button type="button" onClick={() => setConflictChoice('both')} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold">
              Accept Both
            </button>
          </div>

          <pre className="rounded-xl bg-[#0F172A] text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-[#273244] m-0">
            {conflictChoice === 'none'
              ? `<<<<<<< HEAD (Current Change)\nseedColor: Colors.indigo,\n=======\nseedColor: Colors.teal,\n>>>>>>> lab6/220101 (Incoming Change)`
              : conflictChoice === 'current'
              ? `seedColor: Colors.indigo, // Resolved: Current kept`
              : conflictChoice === 'incoming'
              ? `seedColor: Colors.teal, // Resolved: Incoming kept`
              : `// Resolved: Both kept (adjust one)\nseedColor: Colors.indigo,\naccentColor: Colors.teal,`}
          </pre>
        </div>
      )}

      {subTab === 'ignore' && (
        <div className="space-y-2.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(ignoredFiles).map(([file, ignored]) => {
              const isSource = file === 'lib/main.dart';
              const isSecret = file === 'lib/keys.dart';
              return (
                <label
                  key={file}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer font-mono ${
                    isSecret && !ignored
                      ? 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]'
                      : 'border-[var(--border)] bg-[var(--surface-2)]/40'
                  }`}
                >
                  <span>{file}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-sans">
                      {ignored ? 'Ignored' : isSource ? 'Tracked ✓' : 'Tracked ⚠️'}
                    </span>
                    <input
                      type="checkbox"
                      checked={ignored}
                      onChange={() =>
                        setIgnoredFiles((prev) => ({ ...prev, [file]: !prev[file] }))
                      }
                      className="accent-[var(--primary)]"
                    />
                  </div>
                </label>
              );
            })}
          </div>
          {leakedKey ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--state-bad)] text-[var(--danger)] font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              Never commit API keys! Add lib/keys.dart to .gitignore and restrict keys by package name.
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--state-ok)] text-[var(--success)] font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0 hidden" />
              <Check className="w-4 h-4 shrink-0" />
              Good hygiene: build artefacts and API keys are excluded in .gitignore.
            </div>
          )}
        </div>
      )}
    </SimWrapper>
  );
};
