import React from 'react';
import { Info, GraduationCap, ExternalLink, Flag } from 'lucide-react';
import { COURSE } from '../data/course';
import { AssessmentDonut } from '../components/AssessmentDonut';

export const AboutPage: React.FC<{ onNavigate: (to: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">
          <Info className="w-4 h-4" />
          COURSE INFORMATION · {COURSE.code}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
          {COURSE.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1">
          {COURSE.department} · {COURSE.faculty} · {COURSE.university}
        </p>
      </div>

      {/* Key Facts & Synopsis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 portal-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text)]">Course Synopsis</h2>
          <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
            {COURSE.synopsis}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)]">
              <div className="text-[var(--text-muted)]">Credits</div>
              <div className="font-mono font-bold text-sm mt-0.5">{COURSE.credit}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)]">
              <div className="text-[var(--text-muted)]">Contact Hours</div>
              <div className="font-mono font-bold text-sm mt-0.5">{COURSE.hoursPerWeek}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)]">
              <div className="text-[var(--text-muted)]">Level / Term</div>
              <div className="font-mono font-bold text-sm mt-0.5">{COURSE.level}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--surface-2)]/60 border border-[var(--border)]">
              <div className="text-[var(--text-muted)]">Type</div>
              <div className="font-bold text-sm mt-0.5">{COURSE.type}</div>
            </div>
          </div>
        </section>

        {/* Instructor & Lab Team (no phone numbers!) */}
        <section className="lg:col-span-5 portal-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[var(--primary)]" />
            Instructors & Lab Team
          </h2>
          {COURSE.instructors.map((inst) => (
            <div key={inst.name} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-1.5 text-xs sm:text-sm">
              <div className="font-bold text-[var(--text)]">{inst.name}</div>
              <div className="text-[var(--text-muted)]">{inst.role}</div>
              <div className="font-mono text-xs text-[var(--primary)]">{inst.email}</div>
              <div className="text-xs text-[var(--text-muted)]">
                {inst.room} · Counselling: {inst.hours.join(' & ')}
              </div>
            </div>
          ))}
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs sm:text-sm">
            <div className="font-bold text-[var(--text)]">Lab Team</div>
            <div className="text-[var(--text-muted)] mt-1">
              {COURSE.labTeam.join(' · ')} (Dept. of CSE, BAUST)
            </div>
          </div>
        </section>
      </div>

      {/* Assessment Breakdown */}
      <section className="portal-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[var(--text)]">Assessment Breakdown</h2>
        <AssessmentDonut />
      </section>

      {/* Course Outcomes Table */}
      <section className="portal-card rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-[var(--text)]">Course Outcomes (CO1–CO4)</h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">CO</th>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">Statement</th>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">PO · Bloom's</th>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">Delivery & Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {COURSE.outcomes.map((co) => (
                <tr key={co.id}>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--primary)] align-top">{co.id}</td>
                  <td className="px-4 py-3 align-top">{co.statement}</td>
                  <td className="px-4 py-3 font-mono whitespace-nowrap align-top">
                    {co.po} · {co.bloom}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--text-muted)] align-top">
                    <div><strong>Delivery:</strong> {co.delivery}</div>
                    <div className="mt-1"><strong>Assessment:</strong> {co.assessment}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Official 14-Week Outline Schedule */}
      <section className="portal-card rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[var(--text)]">Official 14-Week Outline Schedule</h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Weekly lab content follows the instructor's delivery plan; the official outline lists the project milestones.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[var(--surface-2)]">
              <tr>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">Week</th>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">Outline Topics & Milestones</th>
                <th scope="col" className="px-4 py-3 font-bold border-b border-[var(--border)]">CO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {COURSE.outlineSchedule.map((row) => (
                <tr key={row.week}>
                  <td className="px-4 py-3 font-mono font-bold whitespace-nowrap align-top">
                    <button
                      type="button"
                      onClick={() => onNavigate(`/week/${row.week}`)}
                      className="text-[var(--primary)] hover:underline"
                    >
                      Week {row.week}
                    </button>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {row.milestone && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--state-warn)] text-[var(--warning)] font-mono text-[11px] font-bold mr-2">
                        <Flag className="w-3 h-3" /> {row.milestone}
                      </span>
                    )}
                    {row.topics}
                  </td>
                  <td className="px-4 py-3 font-mono whitespace-nowrap align-top text-[var(--text-muted)]">
                    {row.co.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Textbook & References */}
      <section className="portal-card rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-[var(--text)]">Textbook & References</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          {COURSE.references.map((ref) => (
            <div key={ref.title} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
              <div className="font-bold text-[var(--text)]">{ref.title}</div>
              <div className="text-[var(--text-muted)] mt-0.5">
                {ref.author} · {ref.publisher}
              </div>
              {ref.url && (
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline mt-1"
                >
                  Open resource <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
