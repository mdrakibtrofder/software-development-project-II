import React, { useState } from 'react';
import { COURSE } from '../data/course';

export const AssessmentDonut: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const total = COURSE.assessment.reduce((acc, item) => acc + item.pct, 0);

  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const slices = COURSE.assessment.map((item, idx) => {
    const startPct = cumulative / total;
    cumulative += item.pct;
    const len = (item.pct / total) * circumference;
    const offset = -startPct * circumference;
    return { ...item, idx, len, offset };
  });

  const activeItem = activeIdx !== null ? slices[activeIdx] : null;

  return (
    <div className={`flex flex-col ${compact ? 'md:flex-row' : 'lg:flex-row'} items-center gap-6`}>
      <div className="relative shrink-0 w-44 h-44 flex items-center justify-center">
        <svg viewBox="0 0 160 160" className="w-44 h-44 -rotate-90" role="img" aria-label="Course assessment breakdown donut chart">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--surface-2)"
            strokeWidth="22"
          />
          {slices.map((s) => {
            const isHovered = activeIdx === s.idx;
            return (
              <circle
                key={s.method}
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={s.color}
                strokeWidth={isHovered ? 26 : 22}
                strokeDasharray={`${Math.max(0, s.len - 1.5)} ${circumference}`}
                strokeDashoffset={s.offset}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setActiveIdx(s.idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onFocus={() => setActiveIdx(s.idx)}
                onBlur={() => setActiveIdx(null)}
                tabIndex={0}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
          <span className="font-mono text-xl font-bold tabular-nums text-[var(--text)]">
            {activeItem ? `${activeItem.pct}%` : '100%'}
          </span>
          <span className="text-[11px] font-medium text-[var(--text-muted)] leading-tight mt-0.5 line-clamp-2">
            {activeItem ? activeItem.method : 'Total Marks'}
          </span>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
        {slices.map((s) => {
          const isHovered = activeIdx === s.idx;
          return (
            <div
              key={s.method}
              onMouseEnter={() => setActiveIdx(s.idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-xs transition-colors cursor-default ${
                isHovered
                  ? 'border-[var(--primary)] bg-[var(--primary-soft)]'
                  : 'border-[var(--border)] bg-[var(--surface-2)]/50'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                />
                <span className="font-medium text-[var(--text)] truncate">{s.method}</span>
              </div>
              <span className="font-mono font-semibold tabular-nums text-[var(--text)] shrink-0">
                {s.pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
