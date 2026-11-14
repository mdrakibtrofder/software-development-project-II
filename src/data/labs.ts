import type { ClusterId } from './course';

export interface LabMeta {
  id: string;
  week: number;
  slide: number;
  cluster: ClusterId;
  title: string;
  subtitle: string;
  description: string;
}

export const LABS: LabMeta[] = [
  // Week 1
  {
    id: 'flutter-doctor',
    week: 1,
    slide: 9,
    cluster: 'setup',
    title: 'Fix the Doctor Report',
    subtitle: 'Interactive terminal troubleshooting',
    description: 'Apply real SDK Manager & licence fixes to turn a failing flutter doctor report into all ✓ checkmarks.',
  },
  {
    id: 'install-checker',
    week: 1,
    slide: 5,
    cluster: 'setup',
    title: 'Before You Install & PATH Picker',
    subtitle: 'OS prerequisites & safe SDK paths',
    description: 'Verify OS specs (10 GB disk, 8 GB RAM), trace the 5 install steps, and test safe vs broken Windows SDK paths.',
  },
  {
    id: 'flutter-arch',
    week: 1,
    slide: 4,
    cluster: 'setup',
    title: 'How Flutter Works (4 Layers)',
    subtitle: 'JIT debug vs AOT release',
    description: 'Inspect the 4-layer stack (Dart App → Framework → C++ Engine → Embedder) and compare JIT hot reload vs AOT native builds.',
  },
  {
    id: 'dart-null-safety',
    week: 1,
    slide: 12,
    cluster: 'setup',
    title: 'Dart Null Safety: What Prints?',
    subtitle: '?, ??, ?., ! and final/const/var',
    description: 'Predict outputs for Dart null-safety operators and variable declarations with immediate rule-based explanations.',
  },
  // Week 2
  {
    id: 'widget-tree',
    week: 2,
    slide: 4,
    cluster: 'ui',
    title: 'Widget Tree Builder',
    subtitle: 'Live tree + Dart code + Course Card',
    description: 'Add, remove and reorder widgets in MaterialApp → Scaffold; watch the parent/leaf tree and Dart code update together.',
  },
  {
    id: 'state-lab',
    week: 2,
    slide: 10,
    cluster: 'ui',
    title: 'setState, Hot Reload & Hot Restart',
    subtitle: 'Dirty-widget cycle & state retention',
    description: 'Step through setState(), witness the "forgot setState()" bug, and test Hot Reload (r) vs Hot Restart (R).',
  },
  {
    id: 'navigation',
    week: 2,
    slide: 10,
    cluster: 'ui',
    title: 'Four Ways to Move (State vs Route)',
    subtitle: 'Drawer, BottomNav, TabBar & Navigator',
    description: 'Compare intra-screen navigation against Navigator.push/pop route stacks and quiz yourself on 10 scenarios.',
  },
  // Week 3
  {
    id: 'layout-lab',
    week: 3,
    slide: 15,
    cluster: 'ui',
    title: 'Row, Column & Overflow Stripes',
    subtitle: 'Main/CrossAxisAlignment, Expanded, Stack',
    description: 'Adjust Row/Column axes, toggle Expanded & SizedBox, trigger yellow-and-black overflow stripes, and copy live Dart code.',
  },
  {
    id: 'container-box',
    week: 3,
    slide: 17,
    cluster: 'ui',
    title: 'Container Box Model',
    subtitle: 'Margin, Border, Padding & Assertion Error',
    description: 'Slide margin, border, padding and radius—plus trigger the color + decoration conflict and Card padding check.',
  },
  {
    id: 'color-lab',
    week: 3,
    slide: 19,
    cluster: 'ui',
    title: 'Colour Lab & 0xAARRGGBB Decoder',
    subtitle: 'ARGB channels, invisible hex bug & Material 3',
    description: 'Split 0xFF2196F3 into A/R/G/B decimals, inspect the Color(0x2196F3) alpha=00 bug, and generate ColorScheme.fromSeed palettes.',
  },
  {
    id: 'listview',
    week: 3,
    slide: 24,
    cluster: 'ui',
    title: 'ListView.builder Is Lazy',
    subtitle: '1,000 items vs visible window',
    description: 'Scroll a 1,000-row list comparing eager ListView(children:) against lazy ListView.builder and Column unbounded-height fixes.',
  },
  // Week 4
  {
    id: 'url-anatomy',
    week: 4,
    slide: 4,
    cluster: 'network',
    title: 'URL Anatomy & Uri.https Builder',
    subtitle: 'Scheme, Host, /v1, Path & Query',
    description: 'Dissect Open-Meteo endpoints, toggle /v1↔/v2, compare path vs query params, and encode Uri.https query maps.',
  },
  {
    id: 'http-lab',
    week: 4,
    slide: 3,
    cluster: 'network',
    title: 'HTTP Methods & Status Codes',
    subtitle: 'GET/POST/PUT/DELETE & 2xx/4xx/5xx',
    description: 'Drive a mock REST server with real scenario triggers (200, 201, 400, 401, 404, 500) and the restaurant analogy.',
  },
  {
    id: 'future-states',
    week: 4,
    slide: 6,
    cluster: 'network',
    title: 'FutureBuilder in Three States',
    subtitle: 'Waiting, Error (+Retry) & initState bug',
    description: 'Control latency and errors, and compare creating a Future in initState() vs the infinite refetch loop inside build().',
  },
  {
    id: 'json-model',
    week: 4,
    slide: 7,
    cluster: 'network',
    title: 'JSON to Dart Model Mapper',
    subtitle: 'Hover-trace Post.fromJson & Course.fromJson',
    description: 'Hover JSON fields to highlight constructor mappings and simulate key typo mapping errors.',
  },
  // Week 5
  {
    id: 'latlng-zoom',
    week: 5,
    slide: 2,
    cluster: 'maps',
    title: 'Latitude, Longitude & Zoom (4^z)',
    subtitle: 'World grid, coordinate swap & 68.7B tiles',
    description: 'Plot Saidpur, Rangpur, Dhaka & Cox\'s Bazar, test swapping (lng, lat), adjust decimal precision, and scale zoom 0–18.',
  },
  {
    id: 'weather-chain',
    week: 5,
    slide: 5,
    cluster: 'maps',
    title: 'City → Coordinates → Weather Chain',
    subtitle: 'Open-Meteo Geocoding + Forecast',
    description: 'Step through how a city search feeds lat/lng into a second forecast call to plot a temperature marker.',
  },
  {
    id: 'map-layers',
    week: 5,
    slide: 7,
    cluster: 'maps',
    title: 'Map Layers, Polylines & Circles',
    subtitle: 'flutter_map stack vs google_maps_flutter',
    description: 'Toggle TileLayer, PolylineLayer (Saidpur→Rangpur→Dhaka), scaled CircleMarker, and MarkerLayer.',
  },
  // Week 6
  {
    id: 'shortcuts',
    week: 6,
    slide: 4,
    cluster: 'tools',
    title: 'VS Code & Flutter CLI Trainer',
    subtitle: 'Keycap drill, global regex & CLI matcher',
    description: 'Practise Windows/macOS shortcuts on your keyboard, test Colors\\.blue regex replace, and match Flutter CLI commands.',
  },
  {
    id: 'git-lab',
    week: 6,
    slide: 8,
    cluster: 'tools',
    title: 'Git Four Places, Branches & Conflicts',
    subtitle: 'add → commit → push, switch -c & .gitignore',
    description: 'Step files across Working/Staging/Local/Remote, resolve a merge conflict, and audit .gitignore for leaked API keys.',
  },
];

// Verified mathematical & domain fixtures (recomputed in tests/labs-fixtures.test.mjs)
export function tilesAtZoom(z: number): number {
  return Math.pow(4, z);
}

export function decodeHexColor(hexInput: string): {
  valid: boolean;
  normalized: string;
  alpha: number;
  red: number;
  green: number;
  blue: number;
  invisibleWarning: boolean;
  cssRgba: string;
} {
  const cleaned = hexInput.trim().replace(/^0x/i, '').replace(/^#/, '');
  if (!/^[0-9a-fA-F]{1,8}$/.test(cleaned)) {
    return {
      valid: false,
      normalized: '0x00000000',
      alpha: 0,
      red: 0,
      green: 0,
      blue: 0,
      invisibleWarning: true,
      cssRgba: 'rgba(0, 0, 0, 0)',
    };
  }
  const padded = cleaned.padStart(8, '0').toUpperCase();
  const alpha = parseInt(padded.slice(0, 2), 16);
  const red = parseInt(padded.slice(2, 4), 16);
  const green = parseInt(padded.slice(4, 6), 16);
  const blue = parseInt(padded.slice(6, 8), 16);
  return {
    valid: true,
    normalized: `0x${padded}`,
    alpha,
    red,
    green,
    blue,
    invisibleWarning: alpha === 0,
    cssRgba: `rgba(${red}, ${green}, ${blue}, ${(alpha / 255).toFixed(3)})`,
  };
}

export function parseEndpointUrl(rawUrl: string): {
  scheme: string;
  host: string;
  version: string;
  path: string;
  query: string;
  params: { key: string; value: string }[];
} | null {
  try {
    const u = new URL(rawUrl);
    const segments = u.pathname.split('/').filter(Boolean);
    const hasVersion = segments.length > 0 && /^v\d+$/i.test(segments[0]);
    const version = hasVersion ? `/${segments[0]}` : '';
    const restPath = hasVersion ? `/${segments.slice(1).join('/')}` : u.pathname;
    const params: { key: string; value: string }[] = [];
    u.searchParams.forEach((value, key) => params.push({ key, value }));
    return {
      scheme: u.protocol.replace(':', ''),
      host: u.host,
      version,
      path: restPath || '/',
      query: u.search.replace(/^\?/, ''),
      params,
    };
  } catch {
    return null;
  }
}

export function buildUriHttps(host: string, path: string, queryMap: Record<string, string>): string {
  const cleanHost = host.trim();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const sp = new URLSearchParams();
  Object.entries(queryMap).forEach(([k, v]) => {
    if (k.trim()) sp.append(k.trim(), v);
  });
  const qs = sp.toString();
  return `https://${cleanHost}${cleanPath}${qs ? `?${qs}` : ''}`;
}

export function classifyHttpStatus(code: number): 'success' | 'redirect' | 'client-error' | 'server-error' | 'other' {
  if (code >= 200 && code < 300) return 'success';
  if (code >= 300 && code < 400) return 'redirect';
  if (code >= 400 && code < 500) return 'client-error';
  if (code >= 500 && code < 600) return 'server-error';
  return 'other';
}

export const COORDINATE_PLACES = [
  { name: 'Saidpur', lat: 25.78, lng: 88.90, note: 'BAUST Campus (~25.7770, 88.9270 in Week 2)' },
  { name: 'Rangpur', lat: 25.74, lng: 89.25, note: 'Divisional city near Saidpur' },
  { name: 'Dhaka', lat: 23.81, lng: 90.41, note: 'Capital city (~23.81 N, 90.41 E)' },
  { name: "Cox's Bazar", lat: 21.43, lng: 92.01, note: 'Southern coastal city' },
] as const;

export const PRECISION_GUIDE = [
  { decimals: 2, approx: '1 km', label: 'City / Neighbourhood' },
  { decimals: 4, approx: '11 m', label: 'Building / Campus' },
  { decimals: 6, approx: '10 cm', label: 'Exact Doorway' },
] as const;

export const ZOOM_LABELS: { z: number; label: string }[] = [
  { z: 0, label: 'World' },
  { z: 3, label: 'Continent' },
  { z: 6, label: 'Country' },
  { z: 10, label: 'City' },
  { z: 14, label: 'Streets' },
  { z: 18, label: 'Buildings' },
];

export type MainAxisAlignOption =
  | 'start'
  | 'end'
  | 'center'
  | 'spaceBetween'
  | 'spaceAround'
  | 'spaceEvenly';

export type CrossAxisAlignOption = 'start' | 'center' | 'end' | 'stretch';

export function generateLayoutDart(opts: {
  axis: 'Row' | 'Column';
  mainAxis: MainAxisAlignOption;
  crossAxis: CrossAxisAlignOption;
  useExpanded: boolean;
  useGap: boolean;
}): string {
  const childGap = opts.useGap
    ? `\n    const SizedBox(${opts.axis === 'Column' ? 'height' : 'width'}: 16),`
    : '';
  const box2 = opts.useExpanded
    ? 'Expanded(child: _box(Colors.indigo, "B"))'
    : '_box(Colors.indigo, "B")';
  return `${opts.axis}(
  mainAxisAlignment: MainAxisAlignment.${opts.mainAxis},
  crossAxisAlignment: CrossAxisAlignment.${opts.crossAxis},
  children: [
    _box(Colors.teal, "A"),${childGap}
    ${box2},${childGap}
    _box(Colors.amber, "C"),
  ],
)`;
}
