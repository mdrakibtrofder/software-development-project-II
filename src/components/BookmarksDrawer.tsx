import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import type { BookmarkItem } from '../state/useStudyStore';

export const BookmarksDrawer: React.FC<{
  open: boolean;
  bookmarks: BookmarkItem[];
  onClose: () => void;
  onNavigate: (to: string) => void;
  onRemove: (item: BookmarkItem) => void;
}> = ({ open, bookmarks, onClose, onNavigate, onRemove }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Saved bookmarks"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[var(--surface)] border-l border-[var(--border)] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[var(--primary)]" />
            <h2 className="text-base font-bold text-[var(--text)]">Saved Bookmarks</h2>
            <span className="font-mono text-xs text-[var(--text-muted)] tabular-nums">
              ({bookmarks.length})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bookmarks"
            className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface-2)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {bookmarks.length === 0 ? (
            <div className="text-center py-14 px-4">
              <Bookmark className="w-8 h-8 mx-auto text-[var(--text-muted)] opacity-50 mb-3" />
              <p className="text-sm font-medium text-[var(--text)]">No bookmarks yet</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Star any slide page, code snippet, glossary term, simulation or MCQ question to save it here.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 hover:border-[var(--primary)] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase text-[var(--primary)] font-semibold">
                      {item.kind}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] text-[var(--text-muted)] truncate">
                        · {item.subtitle}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text)] truncate mt-0.5 flex items-center gap-1.5">
                    <span className="truncate">{item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  aria-label={`Remove ${item.title} bookmark`}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--surface-2)] shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
