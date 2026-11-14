import type { ClusterId } from './course';

export type NoteBlock =
  | { type: 'heading'; id: string; text: string; slide?: number }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'callout'; kind: 'remember' | 'tip' | 'warning' | 'rule'; title: string; text: string; slide?: number }
  | { type: 'table'; headers: string[]; rows: string[][]; slide?: number }
  | { type: 'code'; snippetId: string }
  | { type: 'command'; command: string; caption?: string }
  | { type: 'sim'; labId: string; caption?: string }
  | { type: 'teacherNote'; text: string };

export interface StudyNote {
  week: number;
  title: string;
  cluster: ClusterId;
  readingTime: string;
  summary: string;
  blocks: NoteBlock[];
}

export const STUDY_NOTES: StudyNote[] = [
  {
    week: 1,
    title: 'Flutter Installation & Introduction to Dart',
    cluster: 'setup',
    readingTime: '6 min read',
    summary: 'How Flutter renders UI, installing the SDK cleanly, passing flutter doctor, hot reload vs restart, and Dart null safety.',
    blocks: [
      { type: 'heading', id: 'why-flutter', text: '1. Why Flutter & Four-Layer Architecture', slide: 3 },
      {
        type: 'paragraph',
        text: 'Flutter lets your team write one Dart codebase for six targets: Android, iOS, Web, Windows, Linux and macOS. Instead of wrapping native OEM buttons, Flutter draws every pixel using its own renderer (Skia / Impeller), which is why your UI looks identical everywhere. Everything on screen is a widget.',
      },
      {
        type: 'table',
        slide: 4,
        headers: ['Layer', 'Language / Technology', 'Responsibility'],
        rows: [
          ['Your Dart App', 'Dart', 'Your screens, widgets, state and business logic'],
          ['Flutter Framework', 'Dart', 'Material & Cupertino widgets, layout, gestures, animation'],
          ['Flutter Engine', 'C++', 'Skia/Impeller graphics renderer, Dart VM, text layout'],
          ['Platform Embedder', 'Kotlin / Swift / C++ / JS', 'Connects to Android, iOS, desktop or browser canvas'],
        ],
      },
      {
        type: 'callout',
        kind: 'remember',
        title: 'JIT vs AOT Compilation',
        text: 'Debug builds use Just-In-Time (JIT) compilation inside the Dart VM so hot reload injects edits in about a second. Release builds use Ahead-Of-Time (AOT) compilation to fast native ARM machine code.',
        slide: 4,
      },
      { type: 'sim', labId: 'flutter-arch', caption: 'Explore the 4-layer architecture and JIT vs AOT toggle.' },
      { type: 'heading', id: 'installation', text: '2. Before You Install & Five-Step Setup', slide: 5 },
      {
        type: 'list',
        items: [
          'System requirements: Windows 10/11 64-bit (PowerShell 5.0 + Git for Windows), macOS 10.15+ (Rosetta 2 on Apple Silicon), or Ubuntu 20.04+ (curl, git, unzip, xz-utils).',
          'Hardware space: at least 10 GB free disk space, 8 GB RAM recommended (4 GB works but the emulator crawls), and ~2 GB initial download.',
          'Five steps: 1) Get the SDK → 2) Set the PATH → 3) Install Android Studio → 4) Connect a device or emulator → 5) Verify with flutter doctor.',
        ],
      },
      {
        type: 'callout',
        kind: 'warning',
        title: 'Short-Path Rule on Windows',
        text: 'Unzip the Flutter SDK to a short path without spaces such as C:\\src\\flutter. Never place it inside C:\\Program Files\\ or a user folder containing spaces.',
        slide: 6,
      },
      { type: 'sim', labId: 'install-checker', caption: 'Check OS prerequisites, SDK path safety, and PATH setup.' },
      { type: 'heading', id: 'flutter-doctor', text: '3. Passing flutter doctor', slide: 9 },
      {
        type: 'paragraph',
        text: 'Run flutter doctor after adding flutter/bin to your PATH and reopening your terminal. Treat a clean report with zero crosses (✗) as your ticket to the next section.',
      },
      {
        type: 'table',
        slide: 9,
        headers: ['Doctor Symptom', 'Fix'],
        rows: [
          ['[✗] cmdline-tools component is missing', 'Open Android Studio ▸ SDK Manager ▸ SDK Tools ▸ tick Android SDK Command-line Tools ▸ Apply'],
          ['[!] Android licence status unknown', 'Run flutter doctor --android-licenses and press y to accept'],
          ["'flutter' is not recognized", 'Add C:\\src\\flutter\\bin to PATH and open a fresh terminal'],
        ],
      },
      { type: 'sim', labId: 'flutter-doctor', caption: 'Interactive terminal: apply the exact fixes to turn ✗ and ! into ✓.' },
      { type: 'heading', id: 'first-app-dart', text: '4. First App & Dart Essentials', slide: 10 },
      { type: 'code', snippetId: 'w1-create-run' },
      {
        type: 'paragraph',
        text: 'Inside a new project, lib/main.dart holds your Dart code, pubspec.yaml lists dependencies and assets, and android/ / ios/ / test/ hold platform and test files. In the running terminal, press r for Hot Reload (keeps app state) and R for Hot Restart (restarts from main() and resets state).',
      },
      {
        type: 'callout',
        kind: 'rule',
        title: 'Course Variable Rule of Thumb',
        text: 'Use final by default, const for compile-time literals, and var only when you plan to reassign a variable.',
        slide: 12,
      },
      { type: 'code', snippetId: 'w1-null-safety' },
      { type: 'code', snippetId: 'w1-student-class' },
      { type: 'sim', labId: 'dart-null-safety', caption: 'Predict what Dart null-safety expressions print.' },
      {
        type: 'teacherNote',
        text: 'Students who cannot finish the installation during lab must come to the counselling hour. Encourage DartPad (dartpad.dev) for practising the Week 1 Dart exercises immediately.',
      },
    ],
  },
  {
    week: 2,
    title: 'Flutter Basics: Widgets, Menus, Maps & APIs',
    cluster: 'ui',
    readingTime: '6 min read',
    summary: 'Anatomy of main.dart, Stateless vs Stateful, multi-menu navigation, Google Maps API key discipline, and FutureBuilder.',
    blocks: [
      { type: 'heading', id: 'widgets-anatomy', text: '1. Everything Is a Widget & Anatomy of main.dart', slide: 3 },
      {
        type: 'paragraph',
        text: 'Every UI element in Flutter is a widget. A StatelessWidget never changes after it is built; a StatefulWidget owns mutable data and calls setState() to redraw. Every Material app starts from main() calling runApp(const MyApp()), wrapping a MaterialApp and a Scaffold.',
      },
      { type: 'code', snippetId: 'w2-main-anatomy' },
      { type: 'code', snippetId: 'w2-course-card' },
      { type: 'sim', labId: 'widget-tree', caption: 'Build and inspect the Course Card and Scaffold widget tree.' },
      { type: 'heading', id: 'navigation', text: '2. Menus vs Routes: Four Ways to Move', slide: 10 },
      {
        type: 'paragraph',
        text: 'Drawer, BottomNavigationBar and TabBar swap content inside a single screen by updating local state. Navigator.push and Navigator.pop add or remove whole screens on a route stack.',
      },
      {
        type: 'callout',
        kind: 'warning',
        title: 'Common Navigation Bug',
        text: 'Most navigation bugs come from confusing intra-screen state switching (tabs/drawer) with pushing a new route onto the Navigator stack.',
        slide: 10,
      },
      { type: 'sim', labId: 'navigation', caption: 'Compare Drawer, BottomNavigationBar, TabBar and Navigator.push/pop.' },
      { type: 'heading', id: 'google-map', text: '3. Adding a Google Map', slide: 11 },
      {
        type: 'paragraph',
        text: 'Week 2 introduces google_maps_flutter centred on Saidpur (LatLng(25.7770, 88.9270)). Native configuration requires a Google Cloud API key in AndroidManifest.xml / AppDelegate.swift, minSdk 21, and a full app restart (hot reload does not reload native XML/plist edits).',
      },
      { type: 'code', snippetId: 'w2-google-map' },
      {
        type: 'callout',
        kind: 'warning',
        title: 'Protect Your API Key',
        text: 'Never commit your Google Maps API key to GitHub. Keep keys out of version control and restrict them by app package name.',
        slide: 11,
      },
      { type: 'heading', id: 'future-builder', text: '4. Fetching API Data with FutureBuilder', slide: 12 },
      {
        type: 'paragraph',
        text: 'Use the http package with async/await and a Course.fromJson(Map<String, dynamic> j) factory. Wire it to FutureBuilder to handle waiting (CircularProgressIndicator), error, and data (ListView.builder).',
      },
      { type: 'code', snippetId: 'w2-future-builder' },
      {
        type: 'callout',
        kind: 'remember',
        title: 'Create the Future Once in initState()',
        text: 'If you call fetchCourses() inside build(), every screen redraw sends a brand-new HTTP request—creating an infinite request loop.',
        slide: 13,
      },
      {
        type: 'teacherNote',
        text: 'Pair lab: both students must be able to explain every file and bring the app running on a physical phone. Demonstrate the infinite request loop live in the network tab.',
      },
    ],
  },
  {
    week: 3,
    title: 'Flutter Widgets, Layouts and Colors',
    cluster: 'ui',
    readingTime: '8 min read',
    summary: 'Project folders, setState() cycle, 8 essential widgets, Row/Column alignment, Container box model, ARGB hex colours, ThemeData and ListView.builder.',
    blocks: [
      { type: 'heading', id: 'project-tree', text: '1. Inside a Flutter Project & Widget Tree', slide: 8 },
      {
        type: 'table',
        slide: 8,
        headers: ['Path', 'Purpose'],
        rows: [
          ['lib/', 'Your Dart source files (starts at lib/main.dart)'],
          ['pubspec.yaml', 'Project name, packages, fonts and asset declarations'],
          ['android/ & ios/', 'Native mobile wrapper configs (permissions, API keys, minSdk)'],
          ['web/', 'HTML host and web icons for Chrome targets'],
          ['test/', 'Automated widget and unit tests'],
        ],
      },
      { type: 'heading', id: 'setstate-cycle', text: '2. How setState() Redraws the Screen', slide: 13 },
      {
        type: 'list',
        ordered: true,
        items: [
          'Change your state variable inside the setState(() { ... }) callback.',
          'Flutter marks that widget element as dirty.',
          'On the next frame, Flutter calls build() again with the updated value.',
          'Remember: changing a variable without calling setState() updates memory, NOT the screen.',
        ],
      },
      { type: 'code', snippetId: 'w3-setstate' },
      { type: 'sim', labId: 'state-lab', caption: 'Step through setState() vs forgetting setState(), plus Hot Reload (r) vs Restart (R).' },
      { type: 'heading', id: 'eight-widgets-layout', text: '3. Eight Core Widgets, Row/Column & Container', slide: 14 },
      {
        type: 'table',
        slide: 14,
        headers: ['Widget', 'Role', 'Widget', 'Role'],
        rows: [
          ['Text', 'Display styled strings', 'Padding', 'Add space around one child'],
          ['Icon', 'Material vector icons', 'SizedBox', 'Fixed-width/height gap or box'],
          ['Image', 'Asset or network graphics', 'Card', 'Elevated rounded Material surface'],
          ['Container', 'Margin + border + padding + decoration', 'ElevatedButton', 'Tappable raised action button'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Row arranges children horizontally (main axis = horizontal); Column arranges children vertically (main axis = vertical). Use MainAxisAlignment (start, end, center, spaceBetween, spaceAround, spaceEvenly) and CrossAxisAlignment (start, center, end, stretch). Yellow-and-black stripes indicate an overflow—wrap long content in ListView, SingleChildScrollView, or Expanded.',
      },
      { type: 'sim', labId: 'layout-lab', caption: 'Experiment with Row, Column, Expanded, Stack and overflow stripes.' },
      { type: 'code', snippetId: 'w3-container-box' },
      {
        type: 'callout',
        kind: 'warning',
        title: 'Container Rules',
        text: 'Never pass both color and decoration to a Container—it throws a runtime assertion error. Put color inside BoxDecoration. Also never wrap a child in a Container solely for padding; use Padding.',
        slide: 17,
      },
      { type: 'sim', labId: 'container-box', caption: 'Adjust margin, border, padding and trigger the color+decoration conflict.' },
      { type: 'heading', id: 'colors-theme', text: '4. Four Ways to Make a Colour & 0xAARRGGBB', slide: 18 },
      {
        type: 'paragraph',
        text: 'Flutter colours are 32-bit integers formatted as 0xAARRGGBB where AA (alpha) comes first: FF is fully opaque (255) and 00 is completely invisible. Write Color(0xFF2196F3), never Color(0x2196F3). Use Colors.blue.withValues(alpha: 0.5) for transparency, and ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: ...)) for Material 3 palettes.',
      },
      { type: 'code', snippetId: 'w3-colors-theme' },
      { type: 'sim', labId: 'color-lab', caption: 'Decode 0xFF2196F3 channel by channel and generate a Material 3 seed scheme.' },
      { type: 'heading', id: 'listview-builder', text: '5. Lazy Lists with ListView.builder', slide: 24 },
      { type: 'code', snippetId: 'w3-navigator-listview' },
      { type: 'sim', labId: 'listview', caption: 'Compare building 1,000 items upfront vs lazily with ListView.builder.' },
      {
        type: 'teacherNote',
        text: 'Give 30 to 45 minutes in the lab for the profile_card practice app. Early finishers should implement the Like-counter stretch goal using a StatefulWidget.',
      },
    ],
  },
  {
    week: 4,
    title: 'REST APIs & HTTP: Getting Real Data into Flutter',
    cluster: 'network',
    readingTime: '5 min read',
    summary: 'HTTP methods, status code families (2xx/4xx/5xx), URL anatomy, Uri.https query strings, 5-step fetch recipe, and Model.fromJson.',
    blocks: [
      { type: 'heading', id: 'rest-analogy', text: '1. What Is a REST API?', slide: 2 },
      {
        type: 'paragraph',
        text: 'In a REST API, your Flutter app (client) requests a resource at a URL endpoint, and the server replies—usually in lightweight JSON text. Think of a restaurant: you are the app, the API is the menu, HTTP is the waiter, the server is the kitchen, and JSON is the dish.',
      },
      {
        type: 'table',
        slide: 3,
        headers: ['Method', 'Purpose', 'Status Code', 'Meaning'],
        rows: [
          ['GET', 'Read data (safe, no side effects)', '200 OK', 'Request succeeded'],
          ['POST', 'Create a new resource', '201 Created', 'New resource created after POST'],
          ['PUT / PATCH', 'Replace or update a resource', '400 / 401 / 404', 'Your mistake: bad input / unauth / not found'],
          ['DELETE', 'Remove a resource', '500 Server Error', 'Server failed while handling request'],
        ],
      },
      { type: 'sim', labId: 'http-lab', caption: 'Send GET/POST/PUT/DELETE requests to a mock server and inspect status codes.' },
      { type: 'heading', id: 'url-anatomy', text: '2. Reading an Endpoint & Query Parameters', slide: 4 },
      {
        type: 'paragraph',
        text: 'Every endpoint URL splits into five parts: Scheme (https://) → Host (api.open-meteo.com) → Version (/v1) → Resource path (/forecast) → Query string (?latitude=23.81&longitude=90.41). Path segments like /posts/7 pick one item; query strings like /posts?userId=1 filter a list.',
      },
      { type: 'code', snippetId: 'w4-uri-https' },
      {
        type: 'callout',
        kind: 'tip',
        title: 'Uri.https Query Map Rule',
        text: "All values in the Uri.https query map must be Strings—write {'userId': '1'}, never {'userId': 1}. Uri.https handles percent-encoding spaces automatically.",
        slide: 5,
      },
      { type: 'sim', labId: 'url-anatomy', caption: 'Inspect the 5 URL parts and build valid Uri.https queries interactively.' },
      { type: 'heading', id: 'fetch-json', text: '3. Five-Step Fetch & Model.fromJson', slide: 6 },
      { type: 'code', snippetId: 'w4-fetch-posts' },
      { type: 'code', snippetId: 'w4-post-model' },
      { type: 'sim', labId: 'future-states', caption: 'Drive FutureBuilder through Waiting, Error (+Retry), and Data states.' },
      { type: 'sim', labId: 'json-model', caption: 'Hover JSON keys to trace Post.fromJson mapping and typo errors.' },
      {
        type: 'teacherNote',
        text: 'To test the error state in the Posts Reader lab, ask students to temporarily break the hostname or switch off Wi-Fi and verify their Retry button recovers cleanly.',
      },
    ],
  },
  {
    week: 5,
    title: 'Maps & Location Data',
    cluster: 'maps',
    readingTime: '5 min read',
    summary: 'LatLng coordinate order and precision, zoom tile math (4^z), chaining Open-Meteo geocoding + weather, and flutter_map layers.',
    blocks: [
      { type: 'heading', id: 'latlng-zoom', text: '1. Latitude, Longitude & Zoom Levels', slide: 2 },
      {
        type: 'paragraph',
        text: 'Latitude runs south to north (−90° to +90°); longitude runs west to east (−180° to +180°). In Flutter, LatLng is ALWAYS written (latitude, longitude). Swapping them lands in the wrong ocean or throws a range error.',
      },
      {
        type: 'table',
        slide: 2,
        headers: ['Place', 'Latitude', 'Longitude', 'Precision Guide'],
        rows: [
          ['Saidpur', '25.78', '88.90', '2 decimals ≈ 1 km'],
          ['Rangpur', '25.74', '89.25', '4 decimals ≈ 11 m'],
          ['Dhaka', '23.81', '90.41', '6 decimals ≈ 10 cm'],
          ["Cox's Bazar", '21.43', '92.01', 'Bangladesh ≈ (24, 90)'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Every zoom level multiplies the map tile count by 4 (total tiles = 4^z): Zoom 0 = 1 world tile, Zoom 3 = Continent (64), Zoom 6 = Country, Zoom 10 = City (1,048,576), Zoom 14 = Streets, Zoom 18 = Buildings (68,719,476,736 tiles).',
      },
      { type: 'sim', labId: 'latlng-zoom', caption: 'Drop pins on the world grid, swap lat/lng, and inspect 4^z tile scaling.' },
      { type: 'heading', id: 'open-meteo', text: '2. City Name → Coordinates → Live Weather', slide: 4 },
      {
        type: 'paragraph',
        text: 'Open-Meteo needs no API key. Chain two requests: first call geocoding-api.open-meteo.com/v1/search?name=Rangpur&count=1 to extract results[0].latitude and longitude, then pass them to api.open-meteo.com/v1/forecast?current=temperature_2m.',
      },
      { type: 'code', snippetId: 'w5-open-meteo-chain' },
      { type: 'sim', labId: 'weather-chain', caption: 'Step through the 2-stage Geocoding → Forecast API chain.' },
      { type: 'heading', id: 'flutter-map', text: '3. flutter_map Layers & Comparison with Week 2', slide: 6 },
      { type: 'code', snippetId: 'w5-flutter-map' },
      {
        type: 'callout',
        kind: 'tip',
        title: 'google_maps_flutter (Week 2) vs flutter_map (Week 5)',
        text: 'Week 2 used google_maps_flutter (requires a Google Cloud API key & Android/iOS native setup). Week 5 uses flutter_map with OpenStreetMap tiles: zero API key, works immediately via flutter run -d chrome (include RichAttributionWidget in production).',
        slide: 6,
      },
      { type: 'sim', labId: 'map-layers', caption: 'Toggle TileLayer, PolylineLayer, CircleLayer (useRadiusInMeter) and MarkerLayer.' },
      {
        type: 'teacherNote',
        text: 'Polyline connects points in list order—ideal for a route, trip or boundary. Combine fetchTemp() from slide 5 with the MarkerLayer widgets.',
      },
    ],
  },
  {
    week: 6,
    title: 'Software Development Tools & Tricks',
    cluster: 'tools',
    readingTime: '6 min read',
    summary: 'VS Code setup & shortcuts, safe global search & replace, Flutter CLI troubleshooting, Git four places, branching and merge conflicts.',
    blocks: [
      { type: 'heading', id: 'vscode-shortcuts', text: '1. VS Code Setup & Essential Shortcuts', slide: 3 },
      {
        type: 'paragraph',
        text: 'Install the Flutter and Error Lens extensions, enable Auto Save and Format on Save. Learn the high-leverage keyboard shortcuts below to move cleanly across large Flutter projects.',
      },
      {
        type: 'table',
        slide: 4,
        headers: ['Shortcut (Win/Linux)', 'Action', 'Shortcut (Win/Linux)', 'Action'],
        rows: [
          ['Ctrl+Shift+P', 'Command palette', 'F2', 'Rename symbol project-wide'],
          ['Ctrl+P', 'Quick open file by name', 'F12', 'Go to definition'],
          ['Ctrl+Shift+F', 'Global search across files', 'Shift+Alt+F', 'Format document'],
          ['Ctrl+Shift+H', 'Replace across all files', 'Ctrl+Space / Ctrl+.', 'Autocomplete / Quick fix'],
          ['Alt+↑/↓ / Shift+Alt+↓', 'Move / duplicate line', 'stless / stful + Tab', 'Widget boilerplate snippets'],
        ],
      },
      {
        type: 'callout',
        kind: 'warning',
        title: 'Safety Rule Before Global Replace',
        text: 'Always commit your working code before running Ctrl+Shift+H across all files, so git restore can undo an unintended replacement cleanly.',
        slide: 4,
      },
      { type: 'sim', labId: 'shortcuts', caption: 'Drill VS Code shortcuts, regex find/replace, and Flutter CLI commands.' },
      { type: 'heading', id: 'flutter-cli', text: '2. Flutter CLI & Run Keys', slide: 7 },
      { type: 'code', snippetId: 'w6-flutter-cli' },
      {
        type: 'paragraph',
        text: 'When a Flutter build gets stuck on stale artefacts, run flutter clean followed by flutter pub get, then run again. While running, use r (hot reload), R (hot restart), h (help) and q (quit).',
      },
      { type: 'heading', id: 'git-four-places', text: '3. How Git Works: Four Places & Branching', slide: 8 },
      {
        type: 'paragraph',
        text: 'Git tracks snapshots across four places: Working folder → (git add .) → Staging area → (git commit -m "...") → Local repository → (git push) → Remote on GitHub (origin). Use git switch -c lab6/<roll> so each lab or feature stays isolated from main.',
      },
      { type: 'code', snippetId: 'w6-git-workflow' },
      {
        type: 'callout',
        kind: 'remember',
        title: '.gitignore & Secret Hygiene',
        text: 'Keep build/, .dart_tool/, .idea/, *.iml, .flutter-plugins-dependencies and API keys out of Git. If a merge conflict occurs, pick Accept Current, Accept Incoming or Accept Both in VS Code, save, then git add and git commit.',
        slide: 10,
      },
      { type: 'sim', labId: 'git-lab', caption: 'Move files across the 4 Git places, switch branches and resolve a merge conflict.' },
      {
        type: 'teacherNote',
        text: 'Verify students have set git config user.name and user.email; many first pushes fail simply because user.email is missing or GitHub authentication is not configured.',
      },
    ],
  },
];
