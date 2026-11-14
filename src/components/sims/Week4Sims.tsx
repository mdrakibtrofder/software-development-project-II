import React, { useState, useEffect } from 'react';
import { RefreshCw, Send, Loader2, AlertCircle } from 'lucide-react';
import { SimWrapper } from './SimWrapper';
import { parseEndpointUrl, buildUriHttps, classifyHttpStatus } from '../../data/labs';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 12. url-anatomy: Read the Endpoint & Uri.https Builder */
export const UrlAnatomySim: React.FC<CommonSimProps> = (props) => {
  const [version, setVersion] = useState<'v1' | 'v2'>('v1');
  const [userId, setUserId] = useState('1');
  const [limit, setLimit] = useState('5');
  const [cityQuery, setCityQuery] = useState('Cox Bazar');

  const openMeteoUrl = `https://api.open-meteo.com/${version}/forecast?latitude=23.81&longitude=90.41`;
  const parsed = parseEndpointUrl(openMeteoUrl);
  const postsUri = buildUriHttps('jsonplaceholder.typicode.com', '/posts', {
    userId,
    _limit: limit,
  });
  const encodedCityUri = buildUriHttps('geocoding-api.open-meteo.com', '/v1/search', {
    name: cityQuery,
    count: '1',
  });

  return (
    <SimWrapper
      labId="url-anatomy"
      caption="Five URL parts: Scheme → Host → Version (/v1) → Resource path → Query string. Uri.https encodes strings automatically."
      onReset={() => {
        setVersion('v1');
        setUserId('1');
        setLimit('5');
        setCityQuery('Cox Bazar');
      }}
      {...props}
    >
      <div className="space-y-4">
        {/* Colour-coded Open-Meteo Endpoint */}
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-[var(--text)]">1. Five Parts of an Endpoint</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[var(--text-muted)]">Version:</span>
              {(['v1', 'v2'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVersion(v)}
                  className={`px-2.5 py-1 rounded-lg font-mono font-semibold border ${
                    version === v ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'
                  }`}
                >
                  /{v}
                </button>
              ))}
            </div>
          </div>

          {parsed && (
            <>
              <div className="p-3 rounded-xl bg-[#0F172A] font-mono text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
                <span className="text-emerald-300">{parsed.scheme}://</span>
                <span className="text-sky-300">{parsed.host}</span>
                <span className="text-amber-300 font-bold">{parsed.version}</span>
                <span className="text-violet-300">{parsed.path}</span>
                <span className="text-rose-300">?{parsed.query}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 font-mono text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <div className="text-[var(--text-muted)]">1 Scheme</div>
                  <div className="font-bold text-emerald-600 dark:text-emerald-300">{parsed.scheme}</div>
                </div>
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30">
                  <div className="text-[var(--text-muted)]">2 Host</div>
                  <div className="font-bold text-sky-600 dark:text-sky-300 truncate">{parsed.host}</div>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="text-[var(--text-muted)]">3 Version</div>
                  <div className="font-bold text-amber-600 dark:text-amber-300">{parsed.version}</div>
                </div>
                <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/30">
                  <div className="text-[var(--text-muted)]">4 Resource</div>
                  <div className="font-bold text-violet-600 dark:text-violet-300">{parsed.path}</div>
                </div>
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 col-span-2 sm:col-span-1">
                  <div className="text-[var(--text-muted)]">5 Query</div>
                  <div className="font-bold text-rose-600 dark:text-rose-300 truncate">?{parsed.query}</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Uri.https Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2.5 text-xs">
            <div className="font-bold text-[var(--text)]">
              2. <code className="font-mono">Uri.https</code> Query Builder (values must be Strings!)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label>
                <span className="font-mono text-[var(--text-muted)]">userId (String)</span>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1 w-full px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
                />
              </label>
              <label>
                <span className="font-mono text-[var(--text-muted)]">_limit (String)</span>
                <input
                  type="text"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="mt-1 w-full px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
                />
              </label>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0F172A] text-sky-300 font-mono text-[11px] break-all">
              {postsUri}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Tip: <code className="font-mono">/posts/7</code> picks one item; <code className="font-mono">/posts?userId=1</code> filters a list.
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 space-y-2.5 text-xs">
            <div className="font-bold text-[var(--text)]">3. Automatic Space Encoding</div>
            <label className="block">
              <span className="font-mono text-[var(--text-muted)]">City name (try spaces like "Cox Bazar")</span>
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => setCityQuery(e.target.value)}
                className="mt-1 w-full px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] font-mono"
              />
            </label>
            <div className="p-2.5 rounded-lg bg-[#0F172A] text-emerald-300 font-mono text-[11px] break-all">
              {encodedCityUri}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Write <code className="font-mono">'1'</code> (String), not <code className="font-mono">1</code> (int) in the query map.
            </div>
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 13. http-lab: Methods and Status Codes */
export const HttpLabSim: React.FC<CommonSimProps> = (props) => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [path, setPath] = useState('/v1/posts');
  const [apiKey, setApiKey] = useState('baust-demo-key');
  const [body, setBody] = useState('{"title": "Sprint 1", "userId": 1}');
  const [statusCode, setStatusCode] = useState(200);
  const [responseBody, setResponseBody] = useState('[{"id": 1, "title": "Hello REST"}]');

  const runScenario = (
    m: typeof method,
    p: string,
    key: string,
    b: string,
    forceServerCrash = false
  ) => {
    setMethod(m);
    setPath(p);
    setApiKey(key);
    setBody(b);

    if (forceServerCrash) {
      setStatusCode(500);
      setResponseBody('{"error": "Internal Server Error (5xx — server mistake)"}');
      return;
    }
    if (!key.trim()) {
      setStatusCode(401);
      setResponseBody('{"error": "Unauthorized — missing API key"}');
      return;
    }
    if (!p.startsWith('/v1/posts')) {
      setStatusCode(404);
      setResponseBody(`{"error": "Not Found: ${p}"}`);
      return;
    }
    if (m === 'POST' || m === 'PUT') {
      try {
        JSON.parse(b);
      } catch {
        setStatusCode(400);
        setResponseBody('{"error": "Bad Request — malformed JSON body"}');
        return;
      }
      if (m === 'POST') {
        setStatusCode(201);
        setResponseBody('{"id": 101, "status": "Created"}');
        return;
      }
    }
    setStatusCode(200);
    setResponseBody(
      m === 'DELETE'
        ? '{"deleted": true}'
        : '[{"userId": 1, "id": 7, "title": "Hello REST"}]'
    );
  };

  const cls = classifyHttpStatus(statusCode);
  const badgeStyle =
    cls === 'success'
      ? 'bg-[var(--state-ok)] text-[var(--success)] border-emerald-500/40'
      : cls === 'client-error'
      ? 'bg-[var(--state-warn)] text-[var(--warning)] border-amber-500/40'
      : 'bg-[var(--state-bad)] text-[var(--danger)] border-red-500/40';

  return (
    <SimWrapper
      labId="http-lab"
      caption="2xx = success · 4xx = your request mistake · 5xx = server mistake. (Mock server illustration)"
      onReset={() => runScenario('GET', '/v1/posts', 'baust-demo-key', '{"title": "Sprint 1", "userId": 1}')}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <button type="button" onClick={() => runScenario('GET', '/v1/posts', 'baust-demo-key', body)} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            200 GET
          </button>
          <button type="button" onClick={() => runScenario('POST', '/v1/posts', 'baust-demo-key', '{"title":"New"}')} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            201 POST
          </button>
          <button type="button" onClick={() => runScenario('GET', '/v1/wrong-url', 'baust-demo-key', body)} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            404 Wrong URL
          </button>
          <button type="button" onClick={() => runScenario('GET', '/v1/posts', '', body)} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            401 No Key
          </button>
          <button type="button" onClick={() => runScenario('POST', '/v1/posts', 'baust-demo-key', '{bad json')} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            400 Bad Body
          </button>
          <button type="button" onClick={() => runScenario('GET', '/v1/posts', 'baust-demo-key', body, true)} className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-xs font-mono hover:border-[var(--primary)]">
            500 Server Fault
          </button>
        </div>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">Mock server · illustration</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 space-y-2.5 text-xs">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as typeof method)}
              className="px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono font-bold"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono"
            />
            <button
              type="button"
              onClick={() => runScenario(method, path, apiKey, body)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </div>
          <label className="block">
            <span className="font-mono text-[var(--text-muted)]">Header X-API-Key</span>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="(leave blank for 401)"
              className="mt-1 w-full px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono"
            />
          </label>
          {(method === 'POST' || method === 'PUT') && (
            <label className="block">
              <span className="font-mono text-[var(--text-muted)]">JSON Body</span>
              <textarea
                rows={2}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1 w-full px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] font-mono"
              />
            </label>
          )}
        </div>

        <div className="lg:col-span-6 space-y-2.5">
          <div className={`px-3.5 py-2.5 rounded-xl border font-mono text-xs font-bold flex items-center justify-between ${badgeStyle}`}>
            <span>HTTP {statusCode}</span>
            <span>
              {cls === 'success' ? '2xx Success' : cls === 'client-error' ? '4xx Client Mistake' : '5xx Server Mistake'}
            </span>
          </div>
          <pre className="rounded-xl bg-[#0F172A] text-emerald-300 p-3.5 font-mono text-xs overflow-x-auto border border-[#273244] m-0">
            {responseBody}
          </pre>
          <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50 text-[11px] text-[var(--text-muted)]">
            <strong>Restaurant analogy:</strong> App = you · API = menu · HTTP = waiter · Server = kitchen · JSON = dish.
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 14. future-states: FutureBuilder in Three States */
export const FutureStatesSim: React.FC<CommonSimProps> = (props) => {
  const [latencyMs, setLatencyMs] = useState(700);
  const [simulateError, setSimulateError] = useState(false);
  const [futureInBuildBug, setFutureInBuildBug] = useState(false);
  const [fbState, setFbState] = useState<'waiting' | 'error' | 'data'>('data');
  const [requestCount, setRequestCount] = useState(1);
  const [step, setStep] = useState(0);

  const fetchSteps = [
    '1. Add http package',
    '2. Build Uri with Uri.https',
    '3. await http.get(uri)',
    '4. Check response.statusCode == 200',
    '5. jsonDecode(response.body)',
  ];

  const triggerFetch = () => {
    setFbState('waiting');
    setRequestCount((c) => c + 1);
    setTimeout(() => {
      setFbState(simulateError ? 'error' : 'data');
    }, Math.min(latencyMs, 1500));
  };

  useEffect(() => {
    if (!futureInBuildBug) return;
    const id = setInterval(() => {
      setRequestCount((c) => c + 1);
    }, 600);
    return () => clearInterval(id);
  }, [futureInBuildBug]);

  return (
    <SimWrapper
      labId="future-states"
      caption={
        futureInBuildBug
          ? `Infinite loop! Creating the Future inside build() keeps firing requests (${requestCount} sent). Put it in initState()!`
          : `FutureBuilder is in ${fbState.toUpperCase()} state. Total requests sent: ${requestCount}.`
      }
      step={step}
      totalSteps={fetchSteps.length}
      onStepChange={setStep}
      onReset={() => {
        setFutureInBuildBug(false);
        setSimulateError(false);
        setFbState('data');
        setRequestCount(1);
        setStep(0);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-6 space-y-3 text-xs">
          <label className="block">
            <div className="flex justify-between font-mono mb-1">
              <span>Network latency</span>
              <span>{latencyMs} ms</span>
            </div>
            <input
              type="range"
              min={200}
              max={1500}
              step={100}
              value={latencyMs}
              onChange={(e) => setLatencyMs(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
          </label>

          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
              className="accent-red-600"
            />
            Simulate network / 404 error
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={triggerFetch}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--primary)] text-white font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Run Fetch (initState)
            </button>

            <button
              type="button"
              onClick={() => setFutureInBuildBug((b) => !b)}
              className={`px-3 py-2 rounded-xl border font-semibold ${
                futureInBuildBug
                  ? 'border-red-500 bg-[var(--state-bad)] text-[var(--danger)]'
                  : 'border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              {futureInBuildBug ? 'Stop build() loop' : 'Bug: Create Future in build()'}
            </button>
          </div>

          <div className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50 font-mono flex items-center justify-between">
            <span>HTTP GET requests sent:</span>
            <span className={`font-bold tabular-nums ${futureInBuildBug ? 'text-[var(--danger)]' : 'text-[var(--primary)]'}`}>
              {requestCount}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-1">
            {fetchSteps.map((s, idx) => (
              <div
                key={s}
                className={`p-1.5 rounded-lg border text-[10px] font-medium ${
                  step === idx ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold' : 'border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Phone Screen Output */}
        <div className="lg:col-span-6 mx-auto w-full max-w-[290px] rounded-3xl border-4 border-slate-800 bg-[var(--surface)] overflow-hidden shadow-md min-h-[210px] flex flex-col">
          <div className="bg-[var(--primary)] text-white px-4 py-2 text-xs font-bold">
            Posts Reader
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center">
            {fbState === 'waiting' && (
              <div className="text-center space-y-2">
                <Loader2 className="w-7 h-7 animate-spin mx-auto text-[var(--primary)]" />
                <div className="font-mono text-xs text-[var(--text-muted)]">CircularProgressIndicator</div>
              </div>
            )}
            {fbState === 'error' && (
              <div className="text-center space-y-2">
                <AlertCircle className="w-7 h-7 mx-auto text-[var(--danger)]" />
                <div className="text-xs font-semibold text-[var(--danger)]">Failed to load posts</div>
                <button
                  type="button"
                  onClick={() => {
                    setSimulateError(false);
                    setFbState('waiting');
                    setTimeout(() => setFbState('data'), 400);
                  }}
                  className="px-3 py-1 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
                >
                  Retry
                </button>
              </div>
            )}
            {fbState === 'data' && (
              <div className="space-y-1.5 text-xs">
                {['Post #1: Flutter Setup', 'Post #2: Dart Null Safety', 'Post #3: FutureBuilder'].map((t) => (
                  <div key={t} className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/50 font-medium">
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 15. json-model: JSON to Dart Model */
export const JsonModelSim: React.FC<CommonSimProps> = (props) => {
  const [hoveredKey, setHoveredKey] = useState<'userId' | 'id' | 'title' | null>('title');
  const [typoKey, setTypoKey] = useState(false);

  const fields: { key: 'userId' | 'id' | 'title'; jsonVal: string; type: string }[] = [
    { key: 'userId', jsonVal: '1', type: 'int' },
    { key: 'id', jsonVal: '7', type: 'int' },
    { key: 'title', jsonVal: '"Hello REST"', type: 'String' },
  ];

  return (
    <SimWrapper
      labId="json-model"
      caption={
        typoKey
          ? "Runtime TypeError: j['titel'] is null and cannot be cast to String!"
          : 'Hover or tap a JSON key to trace how Post.fromJson maps it to a typed Dart field.'
      }
      onReset={() => {
        setHoveredKey('title');
        setTypoKey(false);
      }}
      {...props}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[var(--text-muted)]">
          Tap/hover any field to highlight both sides
        </span>
        <label className="flex items-center gap-2 text-xs font-semibold text-[var(--danger)] cursor-pointer">
          <input type="checkbox" checked={typoKey} onChange={(e) => setTypoKey(e.target.checked)} className="accent-red-600" />
          Simulate key typo (j['titel'])
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#0F172A] text-slate-100 border border-[#273244] space-y-1">
          <div className="text-slate-400 mb-1">// JSON response</div>
          <div>{'{'}</div>
          {fields.map((f) => (
            <button
              key={f.key}
              type="button"
              onMouseEnter={() => setHoveredKey(f.key)}
              onClick={() => setHoveredKey(f.key)}
              className={`block w-full text-left px-2 py-1 rounded transition-colors ${
                hoveredKey === f.key ? 'bg-indigo-500/30 text-amber-300' : 'hover:bg-white/5'
              }`}
            >
              &nbsp;&nbsp;"{f.key}": {f.jsonVal},
            </button>
          ))}
          <div>{'}'}</div>
        </div>

        <div className="p-4 rounded-xl bg-[#0F172A] text-slate-100 border border-[#273244] space-y-1">
          <div className="text-slate-400 mb-1">// Dart Post.fromJson</div>
          <div className="text-violet-300">factory Post.fromJson(Map&lt;String, dynamic&gt; j) =&gt; Post(</div>
          {fields.map((f) => {
            const keyName = f.key === 'title' && typoKey ? 'titel' : f.key;
            return (
              <div
                key={f.key}
                onMouseEnter={() => setHoveredKey(f.key)}
                className={`px-2 py-1 rounded transition-colors ${
                  f.key === 'title' && typoKey
                    ? 'bg-red-500/30 text-red-300 font-bold'
                    : hoveredKey === f.key
                    ? 'bg-indigo-500/30 text-sky-300 font-bold'
                    : ''
                }`}
              >
                &nbsp;&nbsp;{f.key}: j['{keyName}'] as {f.type},
              </div>
            );
          })}
          <div className="text-violet-300">);</div>
          {typoKey && (
            <div className="mt-2 p-2 rounded bg-red-950 text-red-300 text-[11px]">
              Error: type 'Null' is not a subtype of type 'String' in type cast.
            </div>
          )}
        </div>
      </div>
    </SimWrapper>
  );
};
