import React, { useState } from 'react';
import { Check, X as XIcon, AlertTriangle, Terminal } from 'lucide-react';
import { SimWrapper } from './SimWrapper';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 1. flutter-doctor: Fix the Doctor Report */
export const FlutterDoctorSim: React.FC<CommonSimProps> = (props) => {
  const [scenario, setScenario] = useState<'android' | 'path'>('android');
  const [fixedCmdline, setFixedCmdline] = useState(false);
  const [fixedLicenses, setFixedLicenses] = useState(false);
  const [fixedPath, setFixedPath] = useState(false);
  const [step, setStep] = useState(0);

  const applyStep = (next: number) => {
    setStep(next);
    setScenario('android');
    setFixedCmdline(next >= 1);
    setFixedLicenses(next >= 2);
  };

  const reset = () => {
    setStep(0);
    setFixedCmdline(false);
    setFixedLicenses(false);
    setFixedPath(false);
  };

  const issueCount =
    scenario === 'android'
      ? (fixedCmdline ? 0 : 1) + (fixedLicenses ? 0 : 1)
      : fixedPath
      ? 0
      : 1;

  const caption =
    scenario === 'path'
      ? fixedPath
        ? "PATH updated to C:\\src\\flutter\\bin and terminal reopened — 'flutter' command now works."
        : "'flutter' is not recognized: add flutter\\bin to PATH and reopen your terminal."
      : issueCount === 0
      ? 'Clean report! Zero crosses — your ticket to the next section.'
      : `Doctor found issues in ${issueCount} categor${issueCount === 1 ? 'y' : 'ies'}. Apply the fixes on the right.`;

  return (
    <SimWrapper
      labId="flutter-doctor"
      caption={caption}
      step={step}
      totalSteps={3}
      onStepChange={applyStep}
      onReset={reset}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => setScenario('android')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            scenario === 'android'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Scenario A: Android & Licences
        </button>
        <button
          type="button"
          onClick={() => setScenario('path')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
            scenario === 'path'
              ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
              : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Scenario B: 'flutter' is not recognized
        </button>
        <span className="font-mono text-[11px] text-[var(--text-muted)] ml-auto">
          Example output; your versions will differ
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Dark Terminal */}
        <div className="lg:col-span-7 rounded-xl bg-[#0F172A] text-slate-100 p-4 font-mono text-xs leading-relaxed border border-[#273244] overflow-x-auto">
          <div className="flex items-center gap-2 text-slate-400 pb-2 mb-2 border-b border-slate-800">
            <Terminal className="w-3.5 h-3.5" />
            <span>$ flutter doctor</span>
          </div>

          {scenario === 'path' ? (
            !fixedPath ? (
              <div className="text-red-400">
                'flutter' is not recognized as an internal or external command, operable program or batch file.
              </div>
            ) : (
              <div className="space-y-1 text-emerald-300">
                <div>[✓] Flutter (Channel stable, 3.24.3, on Microsoft Windows)</div>
                <div>[✓] Android toolchain - develop for Android devices (Android SDK 34.0.0)</div>
                <div>[✓] Chrome - develop for the web</div>
                <div>[✓] Android Studio (version 2024.1)</div>
                <div className="pt-1 font-semibold">• No issues found!</div>
              </div>
            )
          ) : (
            <div className="space-y-1.5">
              <div className="text-emerald-300">[✓] Flutter (Channel stable, 3.24.3)</div>
              <div className="text-emerald-300">[✓] Android toolchain — SDK 34.0.0</div>
              <div className={fixedCmdline ? 'text-emerald-300' : 'text-red-400'}>
                {fixedCmdline
                  ? '[✓] Android SDK Command-line Tools (latest)'
                  : '[✗] cmdline-tools component is missing'}
              </div>
              <div className={fixedLicenses ? 'text-emerald-300' : 'text-amber-300'}>
                {fixedLicenses
                  ? '[✓] Android licences accepted'
                  : '[!] Android licence status unknown'}
              </div>
              <div className="text-emerald-300">[✓] Android Studio (version 2024.1)</div>
              <div className="text-emerald-300">[✓] Connected device (1 available)</div>
              <div className={`pt-2 font-semibold ${issueCount === 0 ? 'text-emerald-300' : 'text-amber-300'}`}>
                {issueCount === 0
                  ? '• No issues found!'
                  : `! Doctor found issues in ${issueCount} categor${issueCount === 1 ? 'y' : 'ies'}.`}
              </div>
            </div>
          )}
        </div>

        {/* Action Fixes */}
        <div className="lg:col-span-5 space-y-2.5">
          {scenario === 'android' ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setFixedCmdline(true);
                  setStep(1);
                }}
                disabled={fixedCmdline}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-colors ${
                  fixedCmdline
                    ? 'border-emerald-500/40 bg-[var(--state-ok)] text-[var(--success)]'
                    : 'border-[var(--border)] bg-[var(--surface-2)]/60 hover:border-[var(--primary)]'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>1. Fix cmdline-tools</span>
                  {fixedCmdline && <Check className="w-4 h-4" />}
                </div>
                <div className="mt-1 opacity-90">
                  Android Studio ▸ SDK Manager ▸ SDK Tools ▸ tick <strong>Android SDK Command-line Tools</strong> ▸ Apply
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFixedLicenses(true);
                  setStep(2);
                }}
                disabled={fixedLicenses}
                className={`w-full p-3 rounded-xl border text-left text-xs transition-colors ${
                  fixedLicenses
                    ? 'border-emerald-500/40 bg-[var(--state-ok)] text-[var(--success)]'
                    : 'border-[var(--border)] bg-[var(--surface-2)]/60 hover:border-[var(--primary)]'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>2. Accept Android licences</span>
                  {fixedLicenses && <Check className="w-4 h-4" />}
                </div>
                <div className="mt-1 font-mono opacity-90">
                  flutter doctor --android-licenses (press y)
                </div>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setFixedPath(true)}
              disabled={fixedPath}
              className={`w-full p-3.5 rounded-xl border text-left text-xs transition-colors ${
                fixedPath
                  ? 'border-emerald-500/40 bg-[var(--state-ok)] text-[var(--success)]'
                  : 'border-[var(--border)] bg-[var(--surface-2)]/60 hover:border-[var(--primary)]'
              }`}
            >
              <div className="font-bold flex items-center justify-between">
                <span>Add C:\src\flutter\bin to PATH & reopen terminal</span>
                {fixedPath && <Check className="w-4 h-4" />}
              </div>
              <div className="mt-1 opacity-90">
                Existing open terminal tabs keep the old PATH; always open a fresh terminal after editing environment variables.
              </div>
            </button>
          )}
        </div>
      </div>
    </SimWrapper>
  );
};

/* 2. install-checker: Before You Install */
export const InstallCheckerSim: React.FC<CommonSimProps> = (props) => {
  const [os, setOs] = useState<'windows' | 'macos' | 'linux'>('windows');
  const [diskGb, setDiskGb] = useState(14);
  const [ramGb, setRamGb] = useState(8);
  const [selectedPath, setSelectedPath] = useState<'safe' | 'program-files' | 'spaces'>('safe');
  const [reopened, setReopened] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    '1. Get the SDK (unzip to short path)',
    '2. Set the PATH (flutter/bin)',
    '3. Install Android Studio & SDK tools',
    '4. Connect device or create emulator',
    '5. Verify with flutter doctor',
  ];

  const osReqs = {
    windows: {
      label: 'Windows 10/11 64-bit',
      tools: 'PowerShell 5.0 and Git for Windows',
      pathCmd: 'Add C:\\src\\flutter\\bin to User PATH',
    },
    macos: {
      label: 'macOS 10.15+',
      tools: 'Xcode / Rosetta 2 on Apple Silicon',
      pathCmd: 'export PATH="$PATH:$HOME/dev/flutter/bin"',
    },
    linux: {
      label: 'Ubuntu 20.04+',
      tools: 'curl, git, unzip, xz-utils',
      pathCmd: 'export PATH="$PATH:$HOME/dev/flutter/bin"',
    },
  }[os];

  const diskOk = diskGb >= 10;
  const ramStatus = ramGb >= 8 ? 'Recommended (smooth emulator)' : ramGb >= 4 ? 'Works, but emulator crawls' : 'Insufficient (< 4 GB)';

  const pathEval = {
    safe: { ok: true, label: 'C:\\src\\flutter', msg: 'Short path without spaces or admin locks — recommended!' },
    'program-files': { ok: false, label: 'C:\\Program Files\\flutter', msg: 'Protected folder: Windows blocks writes without elevated permissions and has a space.' },
    spaces: { ok: false, label: 'C:\\Users\\My Name\\Downloads\\flutter', msg: 'Contains spaces in path — build scripts and Gradle tools fail unpredictably.' },
  }[selectedPath];

  return (
    <SimWrapper
      labId="install-checker"
      caption={`${steps[activeStep]} · ${pathEval.ok && diskOk && reopened ? 'Setup choices look solid (~2 GB download).' : 'Check highlighted warnings above.'}`}
      step={activeStep}
      totalSteps={5}
      onStepChange={setActiveStep}
      onReset={() => {
        setActiveStep(0);
        setSelectedPath('safe');
        setDiskGb(14);
        setRamGb(8);
        setReopened(true);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Prerequisites & Sliders */}
        <div className="space-y-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
          <div className="text-xs font-bold text-[var(--text)]">A. OS & Hardware Prerequisites</div>
          <div className="flex flex-wrap gap-1.5">
            {(['windows', 'macos', 'linux'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setOs(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize ${
                  os === k
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="text-xs text-[var(--text-muted)]">
            <strong className="text-[var(--text)]">{osReqs.label}:</strong> needs {osReqs.tools}. Initial download ~2 GB.
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-xs">
              <div className="flex justify-between mb-1">
                <span className="font-medium">Free Disk Space (min 10 GB)</span>
                <span className={`font-mono font-bold ${diskOk ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
                  {diskGb} GB {diskOk ? '✓' : '✗'}
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={30}
                value={diskGb}
                onChange={(e) => setDiskGb(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </label>

            <label className="block text-xs">
              <div className="flex justify-between mb-1">
                <span className="font-medium">System RAM (8 GB recommended)</span>
                <span className={`font-mono font-bold ${ramGb >= 8 ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                  {ramGb} GB · {ramStatus}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={16}
                step={2}
                value={ramGb}
                onChange={(e) => setRamGb(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </label>
          </div>
        </div>

        {/* SDK Location Picker + PATH */}
        <div className="space-y-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
          <div className="text-xs font-bold text-[var(--text)]">B. SDK Folder & PATH Check</div>
          <div className="space-y-1.5">
            {(['safe', 'program-files', 'spaces'] as const).map((pKey) => {
              const info = {
                safe: { txt: 'C:\\src\\flutter', ok: true },
                'program-files': { txt: 'C:\\Program Files\\flutter', ok: false },
                spaces: { txt: 'C:\\Users\\My Name\\Downloads\\flutter', ok: false },
              }[pKey];
              return (
                <button
                  key={pKey}
                  type="button"
                  onClick={() => setSelectedPath(pKey)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border font-mono text-xs text-left ${
                    selectedPath === pKey
                      ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--text)]'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="truncate">{info.txt}</span>
                  {info.ok ? (
                    <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  ) : (
                    <XIcon className="w-4 h-4 text-[var(--danger)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
          <div
            className={`p-2.5 rounded-lg text-xs ${
              pathEval.ok
                ? 'bg-[var(--state-ok)] text-[var(--success)]'
                : 'bg-[var(--state-bad)] text-[var(--danger)]'
            }`}
          >
            {pathEval.msg}
          </div>

          <div className="p-2.5 rounded-lg bg-[#0F172A] text-sky-300 font-mono text-xs">
            {osReqs.pathCmd}
          </div>

          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={reopened}
              onChange={(e) => setReopened(e.target.checked)}
              className="accent-[var(--primary)]"
            />
            I closed and reopened my terminal after editing PATH
          </label>
        </div>
      </div>

      {/* 5-step pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
        {steps.map((s, idx) => (
          <button
            key={s}
            type="button"
            onClick={() => setActiveStep(idx)}
            className={`p-2.5 rounded-xl border text-left text-[11px] font-semibold transition-colors ${
              activeStep === idx
                ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </SimWrapper>
  );
};

/* 3. flutter-arch: How Flutter Works */
export const FlutterArchSim: React.FC<CommonSimProps> = (props) => {
  const [buildMode, setBuildMode] = useState<'debug' | 'release'>('debug');
  const [activeLayer, setActiveLayer] = useState(0);

  const layers = [
    {
      name: '1. Your Dart App',
      tech: 'Dart',
      desc: 'Your screens, StatelessWidget / StatefulWidget classes, models and app logic.',
      color: 'border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
    },
    {
      name: '2. Flutter Framework',
      tech: 'Dart',
      desc: 'Material & Cupertino widget libraries, layout, rendering tree, gestures and animation.',
      color: 'border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    },
    {
      name: '3. Flutter Engine',
      tech: 'C++',
      desc:
        buildMode === 'debug'
          ? 'Skia / Impeller renderer + Dart VM running JIT (enables sub-second hot reload).'
          : 'Skia / Impeller renderer + AOT-compiled native ARM machine code (fast startup).',
      color: 'border-sky-500 bg-sky-500/10 text-sky-700 dark:text-sky-300',
    },
    {
      name: '4. Platform Embedder',
      tech: 'Android / iOS / Web / Desktop',
      desc: 'Hosts the surface canvas and platform events across all 6 target platforms.',
      color: 'border-teal-500 bg-teal-500/10 text-teal-700 dark:text-teal-300',
    },
  ];

  const targets = ['Android', 'iOS', 'Web', 'Windows', 'Linux', 'macOS'];

  return (
    <SimWrapper
      labId="flutter-arch"
      caption="Flutter paints every pixel itself, which is why the UI looks identical everywhere."
      step={activeLayer}
      totalSteps={layers.length}
      onStepChange={setActiveLayer}
      onReset={() => {
        setActiveLayer(0);
        setBuildMode('debug');
      }}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setBuildMode('debug')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              buildMode === 'debug'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)]'
            }`}
          >
            Debug Build (JIT VM → Hot Reload)
          </button>
          <button
            type="button"
            onClick={() => setBuildMode('release')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              buildMode === 'release'
                ? 'bg-[var(--surface)] text-[var(--primary)] shadow-xs'
                : 'text-[var(--text-muted)]'
            }`}
          >
            Release Build (AOT → Native ARM)
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {targets.map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-muted)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {layers.map((l, idx) => {
          const active = idx === activeLayer;
          return (
            <button
              key={l.name}
              type="button"
              onClick={() => setActiveLayer(idx)}
              className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${
                active ? `${l.color} scale-[1.01]` : 'border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-sm">{l.name}</span>
                <span className="font-mono text-xs font-semibold">{l.tech}</span>
              </div>
              <p className="text-xs opacity-90 mt-1">{l.desc}</p>
            </button>
          );
        })}
      </div>
    </SimWrapper>
  );
};

/* 4. dart-null-safety: What Does This Print? */
const DART_CHALLENGES = [
  {
    code: `String? middleName;\nprint(middleName ?? 'not given');`,
    options: ['null', "'not given'", 'Compile error', 'Runtime crash'],
    answer: 1,
    explain: "?? returns the right-hand fallback ('not given') when the left side is null.",
  },
  {
    code: `String? title;\nprint(title?.length);`,
    options: ['0', 'null', 'Runtime crash', 'Throws NullPointerException'],
    answer: 1,
    explain: '?. calls .length only if title is non-null; otherwise the whole expression evaluates to null.',
  },
  {
    code: `final marks = {'Rakib': 90};\nprint(marks['Rakib']! > 85);`,
    options: ['true', 'false', 'null', 'Compile error'],
    answer: 0,
    explain: "! asserts that marks['Rakib'] (90) is non-null, and 90 > 85 prints true.",
  },
  {
    code: `final name = 'BAUST';\nname = 'CSE';`,
    options: ['Prints CSE', 'Prints BAUST', 'Compile error: final can only be set once', 'null'],
    answer: 2,
    explain: 'final variables cannot be reassigned. Course rule: final by default, const for literals, var only when reassigning.',
  },
  {
    code: `String greet(String name, {int year = 1}) => '$name (Y$year)';\nprint(greet('Sara', year: 2));`,
    options: ['Sara (Y1)', 'Sara (Y2)', 'year: 2 Sara', 'Syntax error'],
    answer: 1,
    explain: 'Named parameters sit in { } and override the default value (1) when passed by name (year: 2).',
  },
];

export const DartNullSafetySim: React.FC<CommonSimProps> = (props) => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const item = DART_CHALLENGES[idx];
  const isCorrect = picked === item.answer;

  return (
    <SimWrapper
      labId="dart-null-safety"
      caption={
        picked === null
          ? 'Rule of thumb: final by default, const for literals, var only when reassigning.'
          : item.explain
      }
      step={idx}
      totalSteps={DART_CHALLENGES.length}
      onStepChange={(n) => {
        setIdx(n);
        setPicked(null);
      }}
      onReset={() => {
        setIdx(0);
        setPicked(null);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 space-y-3">
          <div className="rounded-xl bg-[#0F172A] text-slate-100 p-4 font-mono text-xs sm:text-sm border border-[#273244] whitespace-pre-wrap">
            {item.code}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50">
              <strong>?</strong> may be null
            </div>
            <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50">
              <strong>??</strong> fallback value
            </div>
            <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50">
              <strong>?.</strong> call only if not null
            </div>
            <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50">
              <strong>!</strong> assert non-null
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-2">
          <div className="text-xs font-bold text-[var(--text-muted)] mb-1">
            What does this print or do? (Challenge {idx + 1}/{DART_CHALLENGES.length})
          </div>
          {item.options.map((opt, oIdx) => {
            const selected = picked === oIdx;
            const correctOpt = oIdx === item.answer;
            let cls = 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]';
            if (picked !== null) {
              if (correctOpt) cls = 'border-emerald-500 bg-[var(--state-ok)] text-[var(--success)] font-bold';
              else if (selected) cls = 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]';
            }
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setPicked(oIdx)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-mono text-left transition-colors ${cls}`}
              >
                <span>{opt}</span>
                {picked !== null && correctOpt && <Check className="w-4 h-4 shrink-0" />}
                {picked !== null && selected && !correctOpt && <AlertTriangle className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}

          {picked !== null && (
            <div
              className={`p-3 rounded-xl text-xs font-medium mt-2 ${
                isCorrect
                  ? 'bg-[var(--state-ok)] text-[var(--success)]'
                  : 'bg-[var(--state-warn)] text-[var(--warning)]'
              }`}
            >
              {isCorrect ? 'Correct! ' : 'Not quite. '}
              {item.explain}
            </div>
          )}
        </div>
      </div>
    </SimWrapper>
  );
};
