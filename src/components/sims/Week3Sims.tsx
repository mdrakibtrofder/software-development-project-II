import React, { useState } from 'react';
import { SimWrapper } from './SimWrapper';
import {
  decodeHexColor,
  generateLayoutDart,
  type MainAxisAlignOption,
  type CrossAxisAlignOption,
} from '../../data/labs';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 8. layout-lab: Row, Column and Friends */
export const LayoutLabSim: React.FC<CommonSimProps> = (props) => {
  const [axis, setAxis] = useState<'Row' | 'Column'>('Row');
  const [mainAxis, setMainAxis] = useState<MainAxisAlignOption>('spaceEvenly');
  const [crossAxis, setCrossAxis] = useState<CrossAxisAlignOption>('center');
  const [useExpanded, setUseExpanded] = useState(false);
  const [useGap, setUseGap] = useState(false);
  const [overflowMode, setOverflowMode] = useState(false);
  const [overflowFixed, setOverflowFixed] = useState(false);
  const [stackDemo, setStackDemo] = useState(false);

  const mainFlexMap: Record<MainAxisAlignOption, string> = {
    start: 'justify-start',
    end: 'justify-end',
    center: 'justify-center',
    spaceBetween: 'justify-between',
    spaceAround: 'justify-around',
    spaceEvenly: 'justify-evenly',
  };

  const crossFlexMap: Record<CrossAxisAlignOption, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const dartCode = generateLayoutDart({ axis, mainAxis, crossAxis, useExpanded, useGap });

  return (
    <SimWrapper
      labId="layout-lab"
      caption={
        overflowMode && !overflowFixed
          ? 'Overflow! Yellow-and-black stripes appear because content exceeds constraints. Wrap in ListView or SingleChildScrollView.'
          : `${axis}: mainAxis=${mainAxis}, crossAxis=${crossAxis}${useExpanded ? ', Box B Expanded' : ''}.`
      }
      onReset={() => {
        setAxis('Row');
        setMainAxis('spaceEvenly');
        setCrossAxis('center');
        setUseExpanded(false);
        setUseGap(false);
        setOverflowMode(false);
        setOverflowFixed(false);
        setStackDemo(false);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 space-y-2.5 text-xs">
          <div className="flex gap-1.5">
            {(['Row', 'Column'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAxis(a);
                  setStackDemo(false);
                }}
                className={`flex-1 py-2 rounded-lg font-semibold border ${
                  axis === a && !stackDemo
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)]'
                }`}
              >
                {a} ({a === 'Row' ? 'Horizontal' : 'Vertical'})
              </button>
            ))}
          </div>

          <label className="block">
            <span className="font-semibold text-[var(--text-muted)]">mainAxisAlignment</span>
            <select
              value={mainAxis}
              onChange={(e) => setMainAxis(e.target.value as MainAxisAlignOption)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
            >
              {(['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'] as const).map((m) => (
                <option key={m} value={m}>
                  MainAxisAlignment.{m}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-semibold text-[var(--text-muted)]">crossAxisAlignment</span>
            <select
              value={crossAxis}
              onChange={(e) => setCrossAxis(e.target.value as CrossAxisAlignOption)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
            >
              {(['start', 'center', 'end', 'stretch'] as const).map((c) => (
                <option key={c} value={c}>
                  CrossAxisAlignment.{c}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={useExpanded} onChange={(e) => setUseExpanded(e.target.checked)} className="accent-[var(--primary)]" />
              Expanded (Box B)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={useGap} onChange={(e) => setUseGap(e.target.checked)} className="accent-[var(--primary)]" />
              SizedBox(16)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={stackDemo} onChange={(e) => setStackDemo(e.target.checked)} className="accent-[var(--primary)]" />
              Stack + Positioned
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-amber-600 dark:text-amber-400 font-semibold">
              <input type="checkbox" checked={overflowMode} onChange={(e) => setOverflowMode(e.target.checked)} className="accent-amber-500" />
              Trigger Overflow
            </label>
          </div>

          {overflowMode && (
            <button
              type="button"
              onClick={() => setOverflowFixed((f) => !f)}
              className="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold"
            >
              {overflowFixed ? 'Fixed with SingleChildScrollView ✓' : 'Fix with SingleChildScrollView'}
            </button>
          )}
        </div>

        {/* Canvas + Live Dart */}
        <div className="lg:col-span-7 space-y-3">
          {stackDemo ? (
            <div className="relative h-52 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-2)]/50 overflow-hidden">
              <div className="absolute inset-4 rounded-xl bg-teal-500/30 border-2 border-teal-500 flex items-center justify-center font-mono text-xs font-bold">
                Base Layer (Container)
              </div>
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow">
                Positioned(top: 12, right: 12)
              </div>
            </div>
          ) : (
            <div
              className={`relative h-52 rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface-2)]/50 p-3 flex ${
                axis === 'Row' ? 'flex-row' : 'flex-col'
              } ${mainFlexMap[mainAxis]} ${crossFlexMap[crossAxis]} ${
                useGap ? 'gap-4' : 'gap-1'
              } ${overflowMode && overflowFixed ? 'overflow-y-auto' : 'overflow-hidden'}`}
            >
              <div className="px-4 py-3 rounded-lg bg-teal-500 text-white font-mono text-xs font-bold shrink-0">
                A
              </div>
              <div
                className={`px-4 py-3 rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center ${
                  useExpanded ? 'flex-1' : 'shrink-0'
                }`}
              >
                B {useExpanded ? '(Expanded)' : ''}
              </div>
              <div className="px-4 py-3 rounded-lg bg-amber-500 text-slate-950 font-mono text-xs font-bold shrink-0">
                C
              </div>
              {overflowMode &&
                [1, 2, 3, 4].map((n) => (
                  <div key={n} className="px-4 py-3 rounded-lg bg-rose-500 text-white font-mono text-xs font-bold shrink-0">
                    Extra {n}
                  </div>
                ))}
              {overflowMode && !overflowFixed && (
                <div className="absolute bottom-0 left-0 right-0 h-5 overflow-stripes flex items-center justify-center">
                  <span className="px-2 py-0.5 bg-slate-950 text-amber-300 font-mono text-[10px] font-bold">
                    RIGHT / BOTTOM OVERFLOWED BY 48 PIXELS
                  </span>
                </div>
              )}
            </div>
          )}

          <pre className="rounded-xl bg-[#0F172A] text-slate-100 p-3 font-mono text-xs overflow-x-auto border border-[#273244] m-0">
            {dartCode}
          </pre>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 9. container-box: Margin, Border, Padding, Child */
export const ContainerBoxSim: React.FC<CommonSimProps> = (props) => {
  const [margin, setMargin] = useState(16);
  const [border, setBorder] = useState(3);
  const [padding, setPadding] = useState(16);
  const [radius, setRadius] = useState(12);
  const [conflictBug, setConflictBug] = useState(false);
  const [cardMode, setCardMode] = useState(false);

  return (
    <SimWrapper
      labId="container-box"
      caption={
        conflictBug
          ? "AssertionError: Cannot provide both a color and a decoration! Put color inside BoxDecoration."
          : cardMode
          ? 'Card has zero internal padding of its own — wrap its child in Padding.'
          : 'Box order from outside in: Margin → Border → Padding → Child.'
      }
      onReset={() => {
        setMargin(16);
        setBorder(3);
        setPadding(16);
        setRadius(12);
        setConflictBug(false);
        setCardMode(false);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-5 space-y-2.5 text-xs">
          <label className="block">
            <div className="flex justify-between font-mono mb-1">
              <span>margin</span>
              <span>{margin}px</span>
            </div>
            <input type="range" min={0} max={32} value={margin} onChange={(e) => setMargin(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </label>
          <label className="block">
            <div className="flex justify-between font-mono mb-1">
              <span>borderWidth</span>
              <span>{border}px</span>
            </div>
            <input type="range" min={0} max={8} value={border} onChange={(e) => setBorder(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </label>
          <label className="block">
            <div className="flex justify-between font-mono mb-1">
              <span>padding</span>
              <span>{padding}px</span>
            </div>
            <input type="range" min={0} max={32} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </label>
          <label className="block">
            <div className="flex justify-between font-mono mb-1">
              <span>borderRadius</span>
              <span>{radius}px</span>
            </div>
            <input type="range" min={0} max={28} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </label>

          <div className="pt-1 space-y-1.5">
            <label className="flex items-center gap-2 font-semibold text-[var(--danger)] cursor-pointer">
              <input type="checkbox" checked={conflictBug} onChange={(e) => setConflictBug(e.target.checked)} className="accent-red-600" />
              Use both <code>color</code> and <code>decoration</code> (bug)
            </label>
            <label className="flex items-center gap-2 font-medium cursor-pointer">
              <input type="checkbox" checked={cardMode} onChange={(e) => setCardMode(e.target.checked)} className="accent-[var(--primary)]" />
              Switch to Card mode (needs Padding child)
            </label>
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            Rule: Never wrap a widget in a Container just for padding — use <code className="font-mono">Padding</code>.
          </p>
        </div>

        <div className="lg:col-span-7">
          {conflictBug ? (
            <div className="p-5 rounded-xl border-2 border-red-500 bg-[var(--state-bad)] text-[var(--danger)] font-mono text-xs space-y-2">
              <div className="font-bold">══╡ EXCEPTION CAUGHT BY WIDGETS LIBRARY ╞══</div>
              <div>
                'package:flutter/src/widgets/container.dart': Failed assertion: 'color == null || decoration == null': Cannot provide both a color and a decoration.
              </div>
              <div className="text-[var(--text)] font-sans pt-1">
                <strong>Fix:</strong> Remove <code className="font-mono">color:</code> from Container and put it inside <code className="font-mono">BoxDecoration(color: ...)</code>.
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-[var(--border)] bg-amber-500/15 flex items-center justify-center min-h-[210px]">
              <div
                style={{
                  margin: `${margin}px`,
                  borderWidth: `${border}px`,
                  padding: `${cardMode ? 0 : padding}px`,
                  borderRadius: `${radius}px`,
                }}
                className="border-indigo-600 bg-sky-500/20 transition-all shadow-md"
              >
                <div className="px-4 py-2.5 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-xs font-bold text-[var(--text)]">
                  Child: Text('BAUST') {cardMode && '(Card has 0 padding!)'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SimWrapper>
  );
};

/* 10. color-lab: Four Ways to Make a Colour */
export const ColorLabSim: React.FC<CommonSimProps> = (props) => {
  const [hexStr, setHexStr] = useState('0xFF2196F3');
  const [alphaRatio, setAlphaRatio] = useState(1);
  const [seedHex, setSeedHex] = useState('#0D9488');

  const decoded = decodeHexColor(hexStr);
  const effectiveAlpha = Math.round(decoded.alpha * alphaRatio);
  const cssBg = `rgba(${decoded.red}, ${decoded.green}, ${decoded.blue}, ${(effectiveAlpha / 255).toFixed(2)})`;

  return (
    <SimWrapper
      labId="color-lab"
      caption={
        decoded.invisibleWarning
          ? `Warning: ${decoded.normalized} has Alpha = 00 — the colour is completely INVISIBLE!`
          : `Decoded ${decoded.normalized}: Alpha ${decoded.alpha} · Red ${decoded.red} · Green ${decoded.green} · Blue ${decoded.blue}.`
      }
      onReset={() => {
        setHexStr('0xFF2196F3');
        setAlphaRatio(1);
        setSeedHex('#0D9488');
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Hex Decoder */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: 'Color(0xFF2196F3)', val: '0xFF2196F3' },
              { label: 'Invisible bug: 0x2196F3', val: '0x2196F3' },
              { label: 'Design hex: #4F46E5', val: '#4F46E5' },
              { label: 'Teal: 0xFF14B8A6', val: '0xFF14B8A6' },
            ].map((p) => (
              <button
                key={p.val}
                type="button"
                onClick={() => setHexStr(p.val)}
                className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] font-mono text-[11px] hover:border-[var(--primary)]"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={hexStr}
              onChange={(e) => setHexStr(e.target.value)}
              aria-label="Hex colour input"
              className="flex-1 min-w-[160px] px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono text-sm"
            />
            <div
              className="w-28 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center font-mono text-[11px] font-bold shadow-xs"
              style={{
                background: `linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%)`,
                backgroundSize: '12px 12px',
              }}
            >
              <div
                className="w-full h-full rounded-xl flex items-center justify-center"
                style={{ backgroundColor: cssBg }}
              >
                <span className="px-1.5 py-0.5 rounded bg-white/85 text-slate-900 text-[10px]">
                  {decoded.invisibleWarning ? 'INVISIBLE' : 'Preview'}
                </span>
              </div>
            </div>
          </div>

          {/* Channel Cards */}
          <div className="grid grid-cols-4 gap-2 font-mono text-center">
            {[
              { label: 'Alpha (AA)', hex: decoded.normalized.slice(2, 4), dec: decoded.alpha },
              { label: 'Red (RR)', hex: decoded.normalized.slice(4, 6), dec: decoded.red },
              { label: 'Green (GG)', hex: decoded.normalized.slice(6, 8), dec: decoded.green },
              { label: 'Blue (BB)', hex: decoded.normalized.slice(8, 10), dec: decoded.blue },
            ].map((ch) => (
              <div key={ch.label} className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50">
                <div className="text-[10px] text-[var(--text-muted)]">{ch.label}</div>
                <div className="text-sm font-bold text-[var(--primary)] mt-0.5">0x{ch.hex}</div>
                <div className="text-xs font-bold tabular-nums">{ch.dec}</div>
              </div>
            ))}
          </div>

          <label className="block text-xs">
            <div className="flex justify-between font-mono mb-1">
              <span>.withValues(alpha: {alphaRatio.toFixed(2)})</span>
              <span>{(alphaRatio * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={alphaRatio}
              onChange={(e) => setAlphaRatio(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </label>
        </div>

        {/* Material 3 Seed Palette + 4 Constructors */}
        <div className="lg:col-span-5 space-y-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs">
          <div className="font-bold text-[var(--text)]">Four Ways in Dart</div>
          <div className="font-mono text-[11px] space-y-1 text-[var(--text-muted)]">
            <div>1. Named: <span className="text-[var(--text)]">Colors.blue</span></div>
            <div>2. Shade: <span className="text-[var(--text)]">Colors.blue.shade700</span></div>
            <div>3. Hex: <span className="text-[var(--text)]">Color(0xFF{decoded.normalized.slice(4)})</span></div>
            <div>4. ARGB: <span className="text-[var(--text)]">Color.fromARGB({decoded.alpha}, {decoded.red}, {decoded.green}, {decoded.blue})</span></div>
          </div>

          <div className="pt-2 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">ColorScheme.fromSeed</span>
              <input
                type="color"
                value={seedHex}
                onChange={(e) => setSeedHex(e.target.value)}
                aria-label="Material 3 seed color"
                className="w-8 h-6 rounded border border-[var(--border)] cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
              <div className="p-2 rounded-lg text-white font-semibold" style={{ backgroundColor: seedHex }}>
                primary
              </div>
              <div className="p-2 rounded-lg text-slate-900 font-semibold" style={{ backgroundColor: `${seedHex}33` }}>
                primaryContainer
              </div>
              <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                surface
              </div>
              <div className="p-2 rounded-lg bg-red-600 text-white font-semibold">
                error
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 11. listview: ListView.builder Is Lazy */
export const ListViewSim: React.FC<CommonSimProps> = (props) => {
  const [mode, setMode] = useState<'builder' | 'eager'>('builder');
  const [scrollRow, setScrollRow] = useState(0);
  const [unboundedBug, setUnboundedBug] = useState(false);

  const totalItems = 1000;
  const visibleCount = 6;
  const builtCount = mode === 'builder' ? visibleCount + 2 : totalItems;

  return (
    <SimWrapper
      labId="listview"
      caption={
        unboundedBug
          ? 'Unbounded height error! Placing a ListView directly inside a Column needs Expanded(child: ListView...).'
          : mode === 'builder'
          ? `ListView.builder builds only ~${builtCount} widgets (visible window) out of ${totalItems} items.`
          : `ListView(children:) built all ${totalItems} widgets upfront in memory before scrolling!`
      }
      onReset={() => {
        setMode('builder');
        setScrollRow(0);
        setUnboundedBug(false);
      }}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setMode('builder')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              mode === 'builder' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'
            }`}
          >
            ListView.builder (Lazy)
          </button>
          <button
            type="button"
            onClick={() => setMode('eager')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              mode === 'eager' ? 'bg-amber-600 text-white border-amber-600' : 'bg-[var(--surface)] border-[var(--border)]'
            }`}
          >
            ListView(children:) (All 1,000)
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-[var(--danger)] cursor-pointer">
          <input type="checkbox" checked={unboundedBug} onChange={(e) => setUnboundedBug(e.target.checked)} className="accent-red-600" />
          Put ListView in Column without Expanded
        </label>
      </div>

      {unboundedBug ? (
        <div className="p-4 rounded-xl border-2 border-red-500 bg-[var(--state-bad)] text-[var(--danger)] font-mono text-xs space-y-1.5">
          <div className="font-bold">Vertical viewport was given unbounded height.</div>
          <div>
            A Column gives children infinite vertical space, and ListView wants infinite space too.
          </div>
          <div className="font-sans text-[var(--text)] pt-1">
            <strong>Fix:</strong> Wrap the ListView inside <code className="font-mono">Expanded(child: ListView.builder(...))</code>.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6 space-y-2">
            <label className="block text-xs">
              <div className="flex justify-between font-mono mb-1">
                <span>Scroll position (index)</span>
                <span>{scrollRow} – {scrollRow + visibleCount - 1} / {totalItems - 1}</span>
              </div>
              <input
                type="range"
                min={0}
                max={totalItems - visibleCount}
                value={scrollRow}
                onChange={(e) => setScrollRow(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </label>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] divide-y divide-[var(--border)]">
              {Array.from({ length: visibleCount }, (_, i) => scrollRow + i).map((idx) => (
                <div key={idx} className="px-3.5 py-2 flex items-center justify-between text-xs font-mono">
                  <span>Item #{idx}</span>
                  <span className="text-emerald-600 dark:text-emerald-400">built on demand</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50">
              <div className="text-xs text-[var(--text-muted)]">Widgets constructed in memory</div>
              <div
                className={`font-mono text-3xl font-extrabold tabular-nums mt-1 ${
                  mode === 'builder' ? 'text-[var(--success)]' : 'text-[var(--warning)]'
                }`}
              >
                {builtCount.toLocaleString()} / {totalItems.toLocaleString()}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                <code className="font-mono">itemCount: 1000</code> passes <code className="font-mono">index</code> from <code className="font-mono">0</code> to <code className="font-mono">itemCount - 1</code>.
              </p>
            </div>
          </div>
        </div>
      )}
    </SimWrapper>
  );
};
