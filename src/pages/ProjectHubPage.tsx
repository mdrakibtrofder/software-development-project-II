import React, { useState } from 'react';
import {
  FolderKanban,
  Flag,
  FileCheck2,
  Copy,
  Check,
  Printer,
  Plus,
  Trash2,
  AlertTriangle,
  Download,
  RotateCcw,
} from 'lucide-react';
import { COURSE } from '../data/course';
import { AssessmentDonut } from '../components/AssessmentDonut';
import type { ProposalDraft, StudyProgressState } from '../state/useStudyStore';

interface ProjectHubPageProps {
  state: StudyProgressState;
  onUpdateProposal: (patch: Partial<ProposalDraft>) => void;
  onClearProposal: () => void;
  onToggleTeamCheck: (id: string) => void;
  onNavigate: (to: string) => void;
}

const TEAM_CHECKLIST = [
  { id: 'repo-names', text: 'GitHub repository includes both team members\' names in README (Weeks 2 & 4).' },
  { id: 'gitignore', text: '.gitignore excludes build/, .dart_tool/, .idea/, *.iml, .flutter-plugins-dependencies.' },
  { id: 'no-keys', text: 'Zero API keys committed to GitHub; keys restricted by package name (Week 2).' },
  { id: 'branches', text: 'One branch per lab or feature (e.g. lab6/<your-roll>).' },
  { id: 'git-config', text: 'git config --global user.name and user.email configured on every machine.' },
  { id: 'screenshots', text: 'Screenshots capture every app state: loading, error and data (Week 4).' },
];

const APP_WEEK_MATRIX = [
  { feature: 'Navigation & Menus (Drawer / BottomNav / TabBar)', weeks: [2, 3] },
  { feature: 'Lists, Cards & Themes (ColorScheme.fromSeed)', weeks: [2, 3] },
  { feature: 'REST Data, Uri.https & FutureBuilder', weeks: [2, 4] },
  { feature: 'Map Screen, Markers & Polylines', weeks: [2, 5] },
  { feature: 'Dart Null Safety & Project Setup', weeks: [1] },
  { feature: 'Git Branching & Merge Conflict Workflow', weeks: [6] },
];

function wordCount(str: string): number {
  const trimmed = str.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export const ProjectHubPage: React.FC<ProjectHubPageProps> = ({
  state,
  onUpdateProposal,
  onClearProposal,
  onToggleTeamCheck,
  onNavigate,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [templateNotice, setTemplateNotice] = useState(false);
  const p = state.proposal;

  // Gentle non-blocking checks
  const problemMentionsSolution = /\b(app|system|build|develop|flutter|application)\b/i.test(
    p.problemStatement
  );
  const objectivesIsList =
    p.objectivesSolve.trim().length > 0 &&
    (p.objectivesSolve.includes('\n') || p.objectivesSolve.includes('-') || p.objectivesSolve.includes('•'));
  const filledFeaturesCount = p.features.filter(
    (f) => f.title.trim().length > 0 || f.description.trim().length > 0
  ).length;

  const exportMarkdown = () => {
    return `# Project Documentation Report
- **Project Name:** ${p.projectName || '(Untitled)'}
- **Student ID:** ${p.studentId || '—'}
- **Student Name:** ${p.studentName || '—'}
- **Level / Term / Section:** Level ${p.level}, Term ${p.term}, Section ${p.section}
- **Submission Date:** ${p.submissionDate || '—'}

## 1. Problem Statement
${p.problemStatement || '_Not written yet._'}

## 2. Objective
### 2.1 What We Aim to Solve
${p.objectivesSolve || '_Not written yet._'}

### 2.2 How We Plan to Solve It
${p.approachPlan || '_Not written yet._'}

## 3. Features of Your Idea
${p.features
  .map((f, i) => `### Feature ${i + 1}: ${f.title || 'Untitled'}\n${f.description || '_Description pending._'}`)
  .join('\n\n')}

## 4. Conclusion
${p.conclusion || '_Not written yet._'}
`;
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(exportMarkdown());
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 1800);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--primary)] uppercase tracking-wide">
            <FolderKanban className="w-4 h-4" />
            PROJECT HUB · CSE 3100
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mt-1">
            Project Milestones & Proposal Builder
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-1 max-w-2xl">
            Official project milestones, assessment breakdown, team repository checklist, and a guided Proposal Builder matching the official documentation template.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setTemplateNotice(true)}
          className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs sm:text-sm font-semibold hover:opacity-90"
        >
          <Download className="w-4 h-4" />
          Download Proposal Template (.docx)
        </button>
      </div>

      {templateNotice && (
        <div className="no-print p-4 rounded-2xl border border-[var(--border)] bg-[var(--primary-soft)] text-xs sm:text-sm flex items-center justify-between gap-3">
          <span>
            The official <code className="font-mono">project-proposal-template.docx</code> slot is configured at <code className="font-mono">/assets/resources/project-proposal-template.docx</code>. Meanwhile, use the Proposal Builder below to write and export Markdown or PDF.
          </span>
          <button type="button" onClick={() => setTemplateNotice(false)} className="font-bold text-[var(--primary)] shrink-0">
            Dismiss
          </button>
        </div>
      )}

      {/* Milestones & Assessment Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 portal-card rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <Flag className="w-5 h-5 text-amber-500" />
            Official Project Milestones
          </h2>
          <div className="space-y-3">
            {COURSE.milestones.map((m) => (
              <div
                key={m.week}
                className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-[var(--primary)]">
                    Week {m.week} · {m.co.join(', ')}
                  </div>
                  <div className="text-sm font-bold text-[var(--text)] mt-0.5">{m.label}</div>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--text)] px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] tabular-nums shrink-0">
                  {m.weight}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-6 portal-card rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="text-lg font-bold text-[var(--text)]">Assessment Weights (100%)</h2>
          <AssessmentDonut compact />
        </section>
      </div>

      {/* Guided Proposal Builder */}
      <section className="portal-card rounded-2xl p-5 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
          <div>
            <div className="font-mono text-xs font-bold uppercase text-[var(--primary)]">
              Study Aid · Autosaved Locally
            </div>
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Project Proposal Builder
            </h2>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold hover:border-[var(--primary)]"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedMd ? 'Copied Markdown' : 'Copy Markdown'}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClearProposal}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--danger)]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear draft
            </button>
          </div>
        </div>

        {/* Cover Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            { key: 'projectName', label: 'Project Name', placeholder: 'e.g. BAUST Smart Bus Tracker' },
            { key: 'studentId', label: 'Student ID(s)', placeholder: 'e.g. 220101, 220102' },
            { key: 'studentName', label: 'Student Name(s)', placeholder: 'e.g. Ayesha & Tariq' },
            { key: 'level', label: 'Level', placeholder: '3' },
            { key: 'term', label: 'Term', placeholder: '1' },
            { key: 'section', label: 'Section', placeholder: 'A' },
            { key: 'submissionDate', label: 'Submission Date', placeholder: '2026-08-15' },
          ].map((f) => (
            <label key={f.key} className="block">
              <span className="font-semibold text-[var(--text-muted)]">{f.label}</span>
              <input
                type="text"
                value={p[f.key as keyof ProposalDraft] as string}
                onChange={(e) => onUpdateProposal({ [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
              />
            </label>
          ))}
        </div>

        {/* Section 1: Problem Statement */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="prop-problem" className="font-bold text-sm text-[var(--text)]">
              1. Problem Statement
            </label>
            <span className="font-mono text-[var(--text-muted)] tabular-nums">
              {wordCount(p.problemStatement)} words
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Describe the real-world problem, who is affected, why it matters, and what gap exists. Focus on the problem, not the solution.
          </p>
          <textarea
            id="prop-problem"
            rows={4}
            value={p.problemStatement}
            onChange={(e) => onUpdateProposal({ problemStatement: e.target.value })}
            placeholder="Students waiting at off-campus stops currently have no live visibility into shuttle location..."
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
          />
          {problemMentionsSolution && (
            <div className="flex items-center gap-2 text-xs text-[var(--warning)] font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Hint: This reads like a solution ("app/system/build"). Keep Section 1 focused on the problem.
            </div>
          )}
        </div>

        {/* Section 2: Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="prop-solve" className="font-bold text-sm text-[var(--text)]">
                2.1 What We Aim to Solve
              </label>
              <span className="font-mono text-[var(--text-muted)] tabular-nums">
                {wordCount(p.objectivesSolve)} words
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Provide a bullet list of specific objectives your project addresses.
            </p>
            <textarea
              id="prop-solve"
              rows={4}
              value={p.objectivesSolve}
              onChange={(e) => onUpdateProposal({ objectivesSolve: e.target.value })}
              placeholder="- Provide real-time shuttle ETA&#10;- Eliminate manual schedule guesswork&#10;- Notify students of route delays"
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
            />
            {p.objectivesSolve.trim().length > 0 && !objectivesIsList && (
              <div className="text-xs text-[var(--warning)]">
                Hint: Format Section 2.1 as a bullet list (one objective per line starting with -).
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="prop-plan" className="font-bold text-sm text-[var(--text)]">
                2.2 How We Plan to Solve It
              </label>
              <span className="font-mono text-[var(--text-muted)] tabular-nums">
                {wordCount(p.approachPlan)} words
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Describe your technology stack (Flutter, REST API, flutter_map), architecture, tools and Agile/Scrum sprints.
            </p>
            <textarea
              id="prop-plan"
              rows={4}
              value={p.approachPlan}
              onChange={(e) => onUpdateProposal({ approachPlan: e.target.value })}
              placeholder="We will build a cross-platform Flutter client using flutter_map and REST endpoints, delivered across two 2-week sprints using Git branches..."
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
            />
          </div>
        </div>

        {/* Section 3: Features Repeater (min 4) */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-[var(--text)]">
                3. Features of Your Idea (minimum 4 features)
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                The template lists Feature 1 through Feature 4. Completed: {filledFeaturesCount}/4+
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onUpdateProposal({
                  features: [
                    ...p.features,
                    { id: `f${Date.now()}`, title: '', description: '' },
                  ],
                })
              }
              className="no-print inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[var(--border)] text-xs font-semibold hover:border-[var(--primary)]"
            >
              <Plus className="w-3.5 h-3.5" /> Add Feature
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {p.features.map((feat, idx) => (
              <div key={feat.id} className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--primary)]">
                    Feature {idx + 1}
                  </span>
                  {p.features.length > 4 && (
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateProposal({
                          features: p.features.filter((f) => f.id !== feat.id),
                        })
                      }
                      aria-label={`Remove Feature ${idx + 1}`}
                      className="text-[var(--text-muted)] hover:text-[var(--danger)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={feat.title}
                  onChange={(e) => {
                    const next = p.features.map((f) =>
                      f.id === feat.id ? { ...f, title: e.target.value } : f
                    );
                    onUpdateProposal({ features: next });
                  }}
                  placeholder={`Feature ${idx + 1} title`}
                  className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold"
                />
                <textarea
                  rows={2}
                  value={feat.description}
                  onChange={(e) => {
                    const next = p.features.map((f) =>
                      f.id === feat.id ? { ...f, description: e.target.value } : f
                    );
                    onUpdateProposal({ features: next });
                  }}
                  placeholder="Short description of what this feature does..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Conclusion */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="prop-conclusion" className="font-bold text-sm text-[var(--text)]">
              4. Conclusion
            </label>
            <span className="font-mono text-[var(--text-muted)] tabular-nums">
              {wordCount(p.conclusion)} words
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Include summary, how it solves the problem, expected impact and future scope.
          </p>
          <textarea
            id="prop-conclusion"
            rows={3}
            value={p.conclusion}
            onChange={(e) => onUpdateProposal({ conclusion: e.target.value })}
            placeholder="In summary, this system addresses..."
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm"
          />
        </div>
      </section>

      {/* Team & Repository Checklist + Week-to-Feature Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 portal-card rounded-2xl p-5 sm:p-6 space-y-3">
          <h2 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Team & Repository Checklist
          </h2>
          <div className="space-y-2">
            {TEAM_CHECKLIST.map((item) => {
              const checked = Boolean(state.checkedTeamItems[item.id]);
              return (
                <label
                  key={item.id}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleTeamCheck(item.id)}
                    className="mt-0.5 accent-emerald-600"
                  />
                  <span className={checked ? 'line-through opacity-75' : 'text-[var(--text)]'}>
                    {item.text}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-6 portal-card rounded-2xl p-5 sm:p-6 space-y-3">
          <h2 className="text-lg font-bold text-[var(--text)]">
            Which Week Helps Which Part of My App?
          </h2>
          <div className="space-y-2">
            {APP_WEEK_MATRIX.map((row) => (
              <div
                key={row.feature}
                className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs"
              >
                <span className="font-medium text-[var(--text)]">{row.feature}</span>
                <div className="flex gap-1.5 shrink-0">
                  {row.weeks.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => onNavigate(`/week/${w}`)}
                      className="px-2.5 py-1 rounded-lg bg-[var(--primary-soft)] text-[var(--primary)] font-mono font-bold hover:bg-[var(--primary)] hover:text-white transition-colors"
                    >
                      W{w}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
