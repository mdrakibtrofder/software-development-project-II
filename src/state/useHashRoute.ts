import { useState, useEffect, useCallback } from 'react';

export interface ParsedRoute {
  path: string; // e.g. '/', '/weeks', '/week/4', '/note/5'
  segments: string[];
  query: Record<string, string>;
  anchor?: string;
}

function parseHash(rawHash: string): ParsedRoute {
  const cleaned = rawHash.replace(/^#/, '') || '/';
  const [beforeAnchor, anchor] = cleaned.split('#');
  const [rawPath, rawQuery] = beforeAnchor.split('?');
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const segments = path.split('/').filter(Boolean);
  const query: Record<string, string> = {};
  if (rawQuery) {
    const sp = new URLSearchParams(rawQuery);
    sp.forEach((v, k) => {
      query[k] = v;
    });
  }
  return { path, segments, query, anchor };
}

export function useHashRoute() {
  const [route, setRoute] = useState<ParsedRoute>(() =>
    parseHash(typeof window !== 'undefined' ? window.location.hash : '#/')
  );

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setRoute(parsed);
      if (!parsed.anchor) {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    const target = to.startsWith('#') ? to : `#${to.startsWith('/') ? to : `/${to}`}`;
    if (window.location.hash === target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  }, []);

  return { route, navigate };
}
