export type ClusterId =
  | 'setup'
  | 'ui'
  | 'network'
  | 'maps'
  | 'tools'
  | 'project'
  | 'final';

export interface ClusterMeta {
  id: ClusterId;
  label: string;
  colorVar: string;
  hex: string;
}

export const CLUSTERS: Record<ClusterId, ClusterMeta> = {
  setup: { id: 'setup', label: 'Setup & Dart', colorVar: '--c-setup', hex: '#6366F1' },
  ui: { id: 'ui', label: 'Flutter UI', colorVar: '--c-ui', hex: '#8B5CF6' },
  network: { id: 'network', label: 'Networking', colorVar: '--c-net', hex: '#3B82F6' },
  maps: { id: 'maps', label: 'Maps & Location', colorVar: '--c-maps', hex: '#14B8A6' },
  tools: { id: 'tools', label: 'Tools & Git', colorVar: '--c-tools', hex: '#F59E0B' },
  project: { id: 'project', label: 'Project Sprints', colorVar: '--c-project', hex: '#F43F5E' },
  final: { id: 'final', label: 'Final Evaluation', colorVar: '--c-final', hex: '#64748B' },
};

export interface SlideMapEntry {
  page: number;
  title: string;
  simId?: string;
}

export interface DeliverableItem {
  n: number;
  title: string;
  text: string;
}

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface WeekDeck {
  title: string;
  pdf: string;
  pptx: string;
  slides: number;
  size: string;
}

export interface WeekData {
  id: number;
  label: string;
  title: string;
  status: 'published' | 'upcoming';
  co: string[];
  cluster: ClusterId;
  summary: string;
  forProject: string;
  topics: string[];
  deck?: WeekDeck;
  slideMap?: SlideMapEntry[];
  keyTakeaways?: string[];
  labs: string[];
  deliverables?: DeliverableItem[];
  submission?: string;
  nextWeekNote?: string;
  pairWorkNote?: string;
  flashcards?: FlashcardItem[];
  crossLinks?: { week: number; label: string }[];
  milestone?: string;
}

export interface CourseOutcome {
  id: string;
  statement: string;
  po: string;
  bloom: string;
  delivery: string;
  assessment: string;
}

export interface OutlineWeek {
  week: number;
  topics: string;
  co: string[];
  milestone?: string;
}

export const COURSE = {
  code: 'CSE 3100',
  shortMark: 'CSE 3100 · SDP II',
  title: 'Software Development Project II',
  semester: 'Summer 2026',
  level: 'Level-3, Term-I',
  credit: '0.75',
  hoursPerWeek: '1.50 hours/week',
  type: 'Core · Prerequisite: None',
  department: 'Department of Computer Science and Engineering',
  faculty: 'Faculty of Electrical and Computer Engineering',
  university: 'Bangladesh Army University of Science & Technology (BAUST), Saidpur',
  synopsis:
    'The course prepares students to solve advanced industry-level problems and develop professional real-time software applications; learners apply the full software development lifecycle using modern tools, best practices and agile methodologies, strengthening problem-solving skills and the ability to independently build scalable, efficient, industry-standard software.',
  instructors: [
    {
      name: 'Md. Rakib Trofder',
      role: 'Lecturer, Dept. of CSE, BAUST',
      email: 'trofder@baust.edu.bd',
      room: 'Room 303 (C)',
      hours: ['Sun 10:50 AM – 1:20 PM', 'Thu 10:50 AM – 1:20 PM'],
      lead: true,
    },
  ],
  labTeam: ['Md. Osama', 'Md. Sirajul Islam'],
  assessment: [
    { method: 'Project Proposal', pct: 10, color: '#6366F1' },
    { method: 'Progress Presentation (Sprint Reviews)', pct: 15, color: '#8B5CF6' },
    { method: 'Final Project & Demonstration', pct: 35, color: '#4F46E5' },
    { method: 'Project Report / Documentation', pct: 15, color: '#0EA5E9' },
    { method: 'Final Presentation', pct: 10, color: '#14B8A6' },
    { method: 'Viva', pct: 10, color: '#F59E0B' },
    { method: 'Attendance', pct: 5, color: '#64748B' },
  ],
  outcomes: [
    {
      id: 'CO1',
      statement:
        'Analyze an industry-level real-world problem to identify stakeholders, requirements and constraints, and formulate a feasible software project specification.',
      po: 'PO2',
      bloom: 'C4',
      delivery: 'Lecture, brainstorming, case study, supervisor meetings',
      assessment: 'Project proposal and project report',
    },
    {
      id: 'CO2',
      statement:
        'Design and develop a scalable, efficient real-time software solution by following the software development lifecycle, design patterns and best practices.',
      po: 'PO3',
      bloom: 'C5, C6 · P4',
      delivery: 'Supervised development, design review, code review',
      assessment: 'Progress presentation and final project and demonstration',
    },
    {
      id: 'CO3',
      statement:
        'Apply modern tools and technologies, including frameworks, version control, testing and deployment tools, to build and validate the software.',
      po: 'PO5',
      bloom: 'C3 · P3',
      delivery: 'Tool demonstration, hands-on practice, supervised development',
      assessment: 'Final project and demonstration and viva',
    },
    {
      id: 'CO4',
      statement:
        'Manage the project as a team using agile practices and communicate the work effectively through documentation, demonstration and presentation.',
      po: 'PO10',
      bloom: 'A3 · P3',
      delivery: 'Sprint meetings, group discussion, presentation practice',
      assessment: 'Progress presentation, project report, final presentation and viva',
    },
  ] as CourseOutcome[],
  milestones: [
    { week: 4, label: 'Project Proposal Presentation', weight: '10%', co: ['CO1', 'CO4'] },
    { week: 9, label: 'Sprint Review 1', weight: '7.5%', co: ['CO2', 'CO4'] },
    { week: 12, label: 'Sprint Review 2', weight: '7.5%', co: ['CO2', 'CO4'] },
    { week: 14, label: 'Final Evaluation (Demo, Presentation, Report, Viva)', weight: '70%', co: ['CO2', 'CO3', 'CO4'] },
  ],
  outlineSchedule: [
    { week: 1, topics: 'Course orientation: team formation, identifying industry-level problems, idea brainstorming', co: ['CO1'] },
    { week: 2, topics: 'Problem analysis: feasibility study, stakeholder identification, scope definition', co: ['CO1'] },
    { week: 3, topics: 'Requirement engineering: SRS, user stories, product backlog', co: ['CO1'] },
    { week: 4, topics: 'Project proposal presentation; agile planning (sprint planning, scheduling, Gantt chart); Git/GitHub setup and branching workflow', co: ['CO1', 'CO4'], milestone: 'Project proposal presentation' },
    { week: 5, topics: 'System design: software architecture (layered, MVC, client-server, microservices), UML diagrams', co: ['CO2'] },
    { week: 6, topics: 'Database and UI/UX design: schema design, wireframes and prototypes', co: ['CO2'] },
    { week: 7, topics: 'Design patterns and best practices: SOLID, clean code, selected design patterns, technology stack selection', co: ['CO2', 'CO3'] },
    { week: 8, topics: 'Sprint 1 development: core module implementation, code review', co: ['CO2', 'CO3'] },
    { week: 9, topics: 'Sprint Review 1: progress presentation and feedback', co: ['CO2', 'CO4'], milestone: 'Sprint Review 1' },
    { week: 10, topics: 'Sprint 2 development: module integration, APIs, real-time features, authentication and security', co: ['CO2', 'CO3'] },
    { week: 11, topics: 'Software testing: unit, integration and system testing; automated testing tools', co: ['CO3'] },
    { week: 12, topics: 'Optimization and Sprint Review 2: performance tuning, scalability, refactoring; progress presentation', co: ['CO2', 'CO3', 'CO4'], milestone: 'Sprint Review 2' },
    { week: 13, topics: 'Deployment and documentation: cloud hosting, CI/CD basics, user manual and technical report', co: ['CO3', 'CO4'] },
    { week: 14, topics: 'Final evaluation: final project demonstration, presentation, report submission and viva', co: ['CO4'], milestone: 'Final evaluation' },
  ] as OutlineWeek[],
  references: [
    {
      title: 'Software Engineering: A Practitioner\'s Approach (9th Edition)',
      author: 'Roger S. Pressman & Bruce R. Maxim',
      publisher: 'McGraw-Hill, 2019 (Course Textbook)',
    },
    {
      title: 'Design Patterns Tutorial',
      author: 'TutorialsPoint',
      publisher: 'Online Reference',
      url: 'https://www.tutorialspoint.com/design_pattern/index.htm',
    },
    {
      title: 'Software Engineering',
      author: 'Ian Sommerville',
      publisher: 'Pearson',
    },
    {
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gamma, Helm, Johnson, Vlissides',
      publisher: 'Addison-Wesley',
    },
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publisher: 'Prentice Hall',
    },
    {
      title: 'The Scrum Guide',
      author: 'Ken Schwaber & Jeff Sutherland',
      publisher: 'scrumguides.org',
      url: 'https://scrumguides.org/',
    },
  ],
  weeks: [
    {
      id: 1,
      label: 'Week 1',
      title: 'Flutter Installation & Introduction to Dart',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'setup',
      summary:
        'From a blank machine to your first Dart program: SDK, PATH, Android Studio, flutter doctor, first app and Dart null safety.',
      forProject: 'A working toolchain on your laptop so you can build and hot-reload your team app.',
      topics: [
        'Why Flutter',
        'Four-layer architecture',
        'JIT vs AOT',
        'SDK & short PATH rule',
        'Android Studio & cmdline-tools',
        'flutter doctor',
        'flutter create & run',
        'Hot reload (r) vs restart (R)',
        'Dart null safety (?, ??, ?., !)',
        'final vs const vs var',
        'Collections & classes',
      ],
      deck: {
        title: 'Flutter Installation & Introduction to Dart',
        pdf: 'assets/slides/pdf/week-01-flutter-installation-dart-intro.pdf',
        pptx: 'assets/slides/pptx/week-01-flutter-installation-dart-intro.pptx',
        slides: 14,
        size: '4.9 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: Flutter Installation & Introduction to Dart' },
        { page: 2, title: 'Roadmap: why Flutter, toolchain, doctor, first app, Dart' },
        { page: 3, title: 'Why Flutter (single codebase, hot reload, own renderer, 6 targets)', simId: 'flutter-arch' },
        { page: 4, title: 'How Flutter works (four layers; JIT vs AOT; everything is a widget)', simId: 'flutter-arch' },
        { page: 5, title: 'Before you install (OS, 10 GB disk, 8 GB RAM, ~2 GB download)', simId: 'install-checker' },
        { page: 6, title: 'Installation in five steps (short-path rule)', simId: 'install-checker' },
        { page: 7, title: 'Flutter SDK and the PATH', simId: 'install-checker' },
        { page: 8, title: 'Android Studio and your device' },
        { page: 9, title: 'flutter doctor (three errors you will see)', simId: 'flutter-doctor' },
        { page: 10, title: 'Your first app (flutter create, run, hot reload vs restart)', simId: 'state-lab' },
        { page: 11, title: 'Meet Dart (JIT/AOT, null safety, main())', simId: 'dart-null-safety' },
        { page: 12, title: 'Variables, types and null safety', simId: 'dart-null-safety' },
        { page: 13, title: 'Functions, collections and classes', simId: 'dart-null-safety' },
        { page: 14, title: 'Lab task: Install, Run Counter & Student Class' },
      ],
      keyTakeaways: [
        'Flutter paints every pixel itself via Skia/Impeller, so UI looks identical across Android, iOS, web and desktop.',
        'Unzip the Flutter SDK to a short path with no spaces (such as C:\\src\\flutter) and add flutter/bin to PATH.',
        'Debug builds use JIT for instant hot reload (r); release builds compile AOT to native machine code.',
        'Use final by default, const for compile-time literals, and var only when reassigning.',
        'Sound null safety prevents null crashes: String? allows null, ?? provides a fallback, ?. guards calls, ! asserts non-null.',
      ],
      labs: ['flutter-doctor', 'install-checker', 'flutter-arch', 'dart-null-safety'],
      deliverables: [
        {
          n: 1,
          title: 'Install & verify',
          text: 'Complete full Flutter SDK and Android Studio setup and capture a flutter doctor report with no crosses (✗).',
        },
        {
          n: 2,
          title: 'Run the counter app',
          text: 'Create hello_baust with flutter create hello_baust, run it on an emulator or phone, and change the app title using hot reload.',
        },
        {
          n: 3,
          title: 'Write Dart',
          text: 'In lib/main.dart add a Student class with name and id, create two objects and print them.',
        },
      ],
      submission:
        'One PDF with the flutter doctor report, a screenshot of the running app and the Dart output, named CSE3100_W1_<your roll>.pdf.',
      nextWeekNote: 'Widgets and layout.',
      flashcards: [
        { front: 'Hot reload (r) vs Hot restart (R)', back: 'Hot reload injects updated code and keeps app state; hot restart restarts from main() and resets state.' },
        { front: 'JIT vs AOT in Flutter', back: 'Debug builds use JIT (Just-In-Time) for fast hot reload; Release builds use AOT (Ahead-Of-Time) native ARM compilation.' },
        { front: 'Safe Windows SDK path', back: 'A short path with no spaces and outside Program Files, e.g. C:\\src\\flutter.' },
        { front: 'Null safety operators (?, ??, ?., !)', back: '? nullable type · ?? fallback value · ?. safe member access · ! assert non-null (crashes if null).' },
        { front: 'final vs const vs var', back: 'final: set once at runtime (default choice). const: compile-time constant. var: type-inferred reassignable variable.' },
      ],
    },
    {
      id: 2,
      label: 'Week 2',
      title: 'Flutter Basics: Widgets, Menus, Maps & APIs',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'ui',
      summary:
        'Widgets, menus, maps and APIs: build a minimal multi-tab app with navigation, a map and real data from an endpoint.',
      forProject: 'Menus, a map screen and an API call—the three pillars of most team apps.',
      topics: [
        'StatelessWidget vs StatefulWidget',
        'Anatomy of main.dart',
        'Text, buttons, Container & Card',
        'Column, Row, Stack & ListView',
        'Drawer, BottomNavigationBar & TabBar',
        'Navigator.push / pop',
        'google_maps_flutter & API keys',
        'http + async/await + fromJson',
        'FutureBuilder & initState',
      ],
      deck: {
        title: 'Flutter Basics: Widgets, Menus, Maps & APIs',
        pdf: 'assets/slides/pdf/week-02-flutter-basics-menus-maps-apis.pdf',
        pptx: 'assets/slides/pptx/week-02-flutter-basics-menus-maps-apis.pptx',
        slides: 14,
        size: '4.8 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: Flutter Basics' },
        { page: 2, title: 'Roadmap: widgets, menus, maps, APIs' },
        { page: 3, title: 'Everything is a widget (Stateless vs Stateful)', simId: 'widget-tree' },
        { page: 4, title: 'Anatomy of main.dart (MaterialApp, Scaffold)', simId: 'widget-tree' },
        { page: 5, title: 'Text and styling' },
        { page: 6, title: 'Buttons and taps (ElevatedButton, TextButton, IconButton)' },
        { page: 7, title: 'Container and Card', simId: 'container-box' },
        { page: 8, title: 'Column, Row, Stack and ListView', simId: 'layout-lab' },
        { page: 9, title: 'A minimal course card', simId: 'widget-tree' },
        { page: 10, title: 'Multi-menu navigation (Drawer, BottomNav, TabBar, Navigator)', simId: 'navigation' },
        { page: 11, title: 'Adding a Google Map (google_maps_flutter, API key)', simId: 'map-layers' },
        { page: 12, title: 'Fetching data from an API (http, async/await, fromJson)', simId: 'json-model' },
        { page: 13, title: 'FutureBuilder (waiting, error, data; create Future in initState)', simId: 'future-states' },
        { page: 14, title: 'Lab task: 3-Tab Campus App (Pairs)' },
      ],
      keyTakeaways: [
        'Drawer, BottomNavigationBar and TabBar switch views inside one screen (state); Navigator.push/pop adds a new screen on top of a route stack.',
        'Always create a FutureBuilder\'s Future once in initState()—calling fetch() inside build() causes an infinite request loop.',
        'Native map configs (AndroidManifest.xml / AppDelegate.swift) require a full app restart, not hot reload.',
        'Never commit your Google Maps API key to GitHub; restrict it and keep secrets out of the repo.',
      ],
      labs: ['widget-tree', 'state-lab', 'navigation'],
      deliverables: [
        {
          n: 1,
          title: 'Courses tab',
          text: 'A ListView of Cards fetched from a public API using http and FutureBuilder, with a loading spinner and an error message.',
        },
        {
          n: 2,
          title: 'Map tab',
          text: 'A GoogleMap centred on your campus with at least one labelled marker.',
        },
        {
          n: 3,
          title: 'Menu & About',
          text: 'A Drawer plus a bottom navigation bar, and an About screen opened with Navigator.push.',
        },
      ],
      pairWorkNote: 'Pair lab: work in pairs, include both names in the report/README, and both students must be able to explain every file.',
      submission: 'GitHub repository link plus screenshots of all three tabs. Do not commit your Maps API key.',
      crossLinks: [
        { week: 3, label: 'Revisit widgets, layouts & Navigator in Week 3' },
        { week: 5, label: 'Compare google_maps_flutter with flutter_map in Week 5' },
      ],
      flashcards: [
        { front: 'BottomNavigationBar vs Navigator.push', back: 'BottomNavigationBar switches content inside one screen (state); Navigator.push pushes a new route onto the navigation stack.' },
        { front: 'Why create a Future in initState()?', back: 'build() can run many times per second; creating a Future inside build() restarts the HTTP request on every rebuild.' },
        { front: 'google_maps_flutter setup requirement', back: 'Requires a Google Cloud API key in AndroidManifest.xml / AppDelegate.swift, minSdk 21, and a full restart.' },
        { front: 'Minimal course card widget chain', back: 'Card → Padding → Column → Text / SizedBox / ElevatedButton.' },
      ],
    },
    {
      id: 3,
      label: 'Week 3',
      title: 'Flutter Widgets, Layouts and Colors',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'ui',
      summary:
        'Widgets, widget trees, setState(), Row/Column alignment, Container box model, ARGB hex colours, ThemeData and ListView.builder.',
      forProject: 'Polished multi-screen UI with consistent Material 3 colours, responsive layouts and scrolling lists.',
      topics: [
        'Project folder anatomy',
        'Widget tree (parents vs leaves)',
        'setState() rebuild cycle',
        'Eight constant widgets',
        'Row, Column & overflow stripes',
        'Expanded, SizedBox & Stack',
        'Container box model',
        'Hex colours (0xAARRGGBB)',
        'ThemeData & ColorScheme.fromSeed',
        'TextStyle & TextField',
        'ListView.builder (lazy)',
      ],
      deck: {
        title: 'Flutter Widgets, Layouts and Colors',
        pdf: 'assets/slides/pdf/week-03-widgets-layouts-colors.pdf',
        pptx: 'assets/slides/pptx/week-03-widgets-layouts-colors.pptx',
        slides: 28,
        size: '1.1 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: Flutter Widgets, Layouts and Colors' },
        { page: 2, title: 'Overview' },
        { page: 3, title: 'What is Flutter' },
        { page: 4, title: 'Why developers choose Flutter' },
        { page: 5, title: 'How Flutter is built, layer by layer', simId: 'flutter-arch' },
        { page: 6, title: 'Dart essentials', simId: 'dart-null-safety' },
        { page: 7, title: 'Set up and run your first project' },
        { page: 8, title: 'What is inside a Flutter project (table)' },
        { page: 9, title: 'Everything is a widget', simId: 'widget-tree' },
        { page: 10, title: 'Your first app, piece by piece', simId: 'widget-tree' },
        { page: 11, title: 'The same app as a widget tree', simId: 'widget-tree' },
        { page: 12, title: 'Stateless versus stateful', simId: 'state-lab' },
        { page: 13, title: 'setState() redraws the screen', simId: 'state-lab' },
        { page: 14, title: 'Eight widgets you will use constantly (table)' },
        { page: 15, title: 'Row and Column', simId: 'layout-lab' },
        { page: 16, title: 'Six layout helpers', simId: 'layout-lab' },
        { page: 17, title: 'Container: margin, border, padding, child', simId: 'container-box' },
        { page: 18, title: 'Four ways to create a colour', simId: 'color-lab' },
        { page: 19, title: 'Reading a hex colour 0xAARRGGBB', simId: 'color-lab' },
        { page: 20, title: 'ThemeData and ColorScheme.fromSeed', simId: 'color-lab' },
        { page: 21, title: 'TextStyle' },
        { page: 22, title: 'Buttons, text input and gestures' },
        { page: 23, title: 'Navigator', simId: 'navigation' },
        { page: 24, title: 'ListView.builder', simId: 'listview' },
        { page: 25, title: 'Practice project: profile card app' },
        { page: 26, title: 'Cheat sheet' },
        { page: 27, title: 'Where to go next' },
        { page: 28, title: 'Thank you' },
      ],
      keyTakeaways: [
        'setState() marks a widget dirty so Flutter re-runs build(); changing state variables without setState() leaves the screen unchanged.',
        'Hex colours in Flutter are 0xAARRGGBB—alpha comes first. Omitting FF (e.g. Color(0x2196F3)) sets alpha to 00 (invisible).',
        'Never pass both color and decoration to a Container; place color inside BoxDecoration. Use Padding instead of Container for simple spacing.',
        'Yellow-and-black stripes signal layout overflow; fix by wrapping with Expanded, ListView or SingleChildScrollView.',
        'ListView.builder creates rows lazily on scroll, unlike ListView(children:) which builds all items upfront.',
      ],
      labs: ['layout-lab', 'container-box', 'color-lab', 'listview', 'widget-tree', 'state-lab', 'navigation'],
      deliverables: [
        {
          n: 1,
          title: 'Create profile_card',
          text: 'Run flutter create profile_card and build a MaterialApp + Scaffold + AppBar.',
        },
        {
          n: 2,
          title: 'Profile Card UI',
          text: 'Centre a Card with Padding containing a Column with CircleAvatar, name Text, role Text and a Row of three IconButtons (call, email, share).',
        },
        {
          n: 3,
          title: 'Theme & Typography',
          text: 'Pick a ColorScheme.fromSeed(seedColor:) and style text with TextStyle.',
        },
        {
          n: 4,
          title: 'Stretch goal (StatefulWidget)',
          text: 'Add a Like button that counts taps with setState().',
        },
      ],
      submission: 'Practice project completed in lab (30–45 minutes); bring the working profile_card app with the stretch goal.',
      crossLinks: [
        { week: 2, label: 'See project-oriented widget intro in Week 2' },
      ],
      flashcards: [
        { front: 'Color(0xAARRGGBB)', back: '8-digit hex where AA is alpha (FF = opaque, 00 = invisible), followed by RR, GG, BB.' },
        { front: 'Why is Color(0x2196F3) invisible?', back: 'Hex literals pad leading zeros, so 0x002196F3 has alpha 00 (completely transparent).' },
        { front: 'Container conflict rule', back: 'You cannot set both color and decoration on a Container; put the colour inside BoxDecoration.' },
        { front: 'ListView.builder advantage', back: 'Builds only the items currently visible on screen, saving memory for long lists.' },
        { front: 'Yellow-and-black stripes', back: 'Flutter\'s visual warning for a layout overflow—content exceeds available constraints.' },
      ],
    },
    {
      id: 4,
      label: 'Week 4',
      title: 'REST APIs & HTTP: Getting Real Data into Flutter',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'network',
      milestone: 'Project proposal presentation',
      summary:
        'How an app asks a server for data and shows it: HTTP methods, status codes, URL anatomy, query parameters, Uri.https, http + jsonDecode and FutureBuilder.',
      forProject: 'Talk to your backend or public APIs cleanly, handling loading, errors and JSON parsing.',
      topics: [
        'REST resources & endpoints',
        'GET, POST, PUT/PATCH, DELETE',
        'Status codes (200, 201, 400, 401, 404, 500)',
        'URL parts & /v1 versioning',
        'Query parameters & Uri.https',
        '5-step fetch recipe',
        'Model.fromJson',
        'FutureBuilder 3 states',
      ],
      deck: {
        title: 'REST APIs & HTTP',
        pdf: 'assets/slides/pdf/week-04-rest-apis-http.pdf',
        pptx: 'assets/slides/pptx/week-04-rest-apis-http.pptx',
        slides: 8,
        size: '2.9 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: REST APIs & HTTP' },
        { page: 2, title: 'What is a REST API (client, server, resource, endpoint, JSON)', simId: 'http-lab' },
        { page: 3, title: 'HTTP methods and status codes', simId: 'http-lab' },
        { page: 4, title: 'Reading an endpoint (/v1, five URL parts)', simId: 'url-anatomy' },
        { page: 5, title: 'Query parameters and Uri.https', simId: 'url-anatomy' },
        { page: 6, title: 'How a Flutter app fetches data (five steps)', simId: 'future-states' },
        { page: 7, title: 'From JSON to the screen (model + FutureBuilder)', simId: 'json-model' },
        { page: 8, title: 'Lab task: Posts Reader' },
      ],
      keyTakeaways: [
        'HTTP status classes: 2xx = success (200 OK, 201 Created), 4xx = client mistake (400, 401, 404), 5xx = server mistake (500).',
        'Uri.https query map values must all be Strings (write \'1\', not 1); Uri.https handles URL encoding automatically.',
        'Always check response.statusCode == 200 before calling jsonDecode(response.body).',
        'Keep the Future in initState() (and re-assign it via setState only when a filter like userId changes).',
      ],
      labs: ['url-anatomy', 'http-lab', 'future-states', 'json-model'],
      deliverables: [
        {
          n: 1,
          title: 'Posts list',
          text: 'Fetch /posts from jsonplaceholder.typicode.com and show every title in a ListView of Cards.',
        },
        {
          n: 2,
          title: 'Filter with a query',
          text: 'Add a dropdown for userId 1–10; rebuild the Uri with ?userId= and fetch again when it changes.',
        },
        {
          n: 3,
          title: 'Handle every state',
          text: 'Show a spinner while loading, an error message with a Retry button on failure, and the list when data arrives.',
        },
      ],
      pairWorkNote: 'Pair lab: work in pairs and include both names in the README.',
      submission: 'GitHub repository link plus screenshots of the loading, error and data states.',
      nextWeekNote: 'Maps and location.',
      flashcards: [
        { front: '2xx vs 4xx vs 5xx', back: '2xx = success · 4xx = your request mistake (400/401/404) · 5xx = server error (500).' },
        { front: 'Path parameter vs Query parameter', back: '/posts/7 identifies a single item; /posts?userId=1 filters a collection.' },
        { front: 'Uri.https value rule', back: 'All query parameter values in the Map must be Strings, e.g. {\'userId\': \'1\'}.' },
        { front: '5 steps to fetch in Flutter', back: '1. Add http · 2. Build Uri · 3. await http.get(uri) · 4. Check statusCode == 200 · 5. jsonDecode(body).' },
      ],
    },
    {
      id: 5,
      label: 'Week 5',
      title: 'Maps & Location Data',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'maps',
      summary:
        'Latitude and longitude, zoom levels (4^z tiles), Open-Meteo weather & geocoding APIs, flutter_map markers, polylines and circles.',
      forProject: 'Show real places, routes and live location-based data on an interactive map without an API key.',
      topics: [
        'LatLng(latitude, longitude)',
        'Coordinate precision (2/4/6 decimals)',
        'Zoom levels & 4^z tiles',
        'Open-Meteo forecast endpoint',
        'Open-Meteo geocoding chain',
        'flutter_map & TileLayer',
        'MarkerLayer, PolylineLayer & CircleLayer',
        'flutter run -d chrome',
      ],
      deck: {
        title: 'Maps & Location Data',
        pdf: 'assets/slides/pdf/week-05-maps-location-data.pdf',
        pptx: 'assets/slides/pptx/week-05-maps-location-data.pptx',
        slides: 7,
        size: '2.5 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: Maps & Location Data' },
        { page: 2, title: 'Latitude and longitude', simId: 'latlng-zoom' },
        { page: 3, title: 'Zoom levels (tiles = 4^z)', simId: 'latlng-zoom' },
        { page: 4, title: 'Weather from Open-Meteo', simId: 'weather-chain' },
        { page: 5, title: 'City name → coordinates → weather', simId: 'weather-chain' },
        { page: 6, title: 'flutter_map and markers', simId: 'map-layers' },
        { page: 7, title: 'Draw lines and data on the map (polyline, circle, lab task)', simId: 'map-layers' },
      ],
      keyTakeaways: [
        'Order is always LatLng(latitude, longitude): latitude is −90 to +90 (N/S), longitude is −180 to +180 (E/W).',
        'Each zoom level multiplies total world map tiles by 4 (tiles = 4^z); zoom 18 has 68,719,476,736 tiles.',
        'Chaining APIs: query Open-Meteo geocoding (/v1/search) to turn a city name into lat/lng, then pass them to /v1/forecast.',
        'flutter_map renders OpenStreetMap tiles with no API key required and runs directly in Chrome (flutter run -d chrome).',
        'Layer stack order: TileLayer (bottom) → PolylineLayer → CircleLayer → MarkerLayer (top).',
      ],
      labs: ['latlng-zoom', 'weather-chain', 'map-layers'],
      deliverables: [
        {
          n: 1,
          title: '3 Cities with Live Weather',
          text: 'Show 3 cities with Marker widgets that display live Open-Meteo temperature.',
        },
        {
          n: 2,
          title: 'Connect with a Polyline',
          text: 'Join the 3 cities in order using a PolylineLayer (e.g. Saidpur → Rangpur → Dhaka).',
        },
        {
          n: 3,
          title: 'Run in Chrome',
          text: 'Run and verify the app in the browser with flutter run -d chrome.',
        },
      ],
      submission: 'Working map app running in Chrome showing 3 city temperature markers connected by a Polyline.',
      crossLinks: [
        { week: 2, label: 'Compare with google_maps_flutter in Week 2' },
      ],
      flashcards: [
        { front: 'LatLng order & ranges', back: 'Always (latitude, longitude): lat −90..+90, lng −180..+180. Dhaka ≈ (23.81, 90.41).' },
        { front: 'Coordinate decimal precision', back: '2 decimals ≈ 1 km · 4 decimals ≈ 11 m · 6 decimals ≈ 10 cm.' },
        { front: 'Zoom tile formula', back: 'Total tiles at zoom z = 4^z. Zoom 0 = 1 tile, Zoom 6 = Country, Zoom 18 ≈ 68.7 billion.' },
        { front: 'flutter_map vs google_maps_flutter', back: 'flutter_map uses OpenStreetMap with no API key and runs on Chrome; google_maps_flutter requires a Google Cloud API key.' },
      ],
    },
    {
      id: 6,
      label: 'Week 6',
      title: 'Software Development Tools & Tricks',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'tools',
      summary:
        'VS Code setup & shortcuts, global find/replace, Flutter CLI commands, Git four places, branching, merge conflicts and .gitignore.',
      forProject: 'Clean Git branching workflow and fast daily editing for your whole team.',
      topics: [
        'VS Code extensions & Auto Save',
        'Ctrl+Shift+P, Ctrl+Shift+F, F2',
        'Snippets (stless, stful)',
        'Flutter CLI (clean, analyze, build)',
        'Git 4 places (Working, Staging, Local, Remote)',
        'git switch -c, merge & log',
        'Merge conflict resolution',
        '.gitignore & secret safety',
      ],
      deck: {
        title: 'Software Development Tools & Tricks',
        pdf: 'assets/slides/pdf/week-06-dev-tools-tricks.pdf',
        pptx: 'assets/slides/pptx/week-06-dev-tools-tricks.pptx',
        slides: 11,
        size: '3.8 MB',
      },
      slideMap: [
        { page: 1, title: 'Title: Software Development Tools & Tricks' },
        { page: 2, title: 'The six tools you use every day' },
        { page: 3, title: 'Set up VS Code for Flutter (Flutter, Error Lens, Auto Save)', simId: 'shortcuts' },
        { page: 4, title: 'Find, search and replace (Ctrl+F, Ctrl+Shift+F, Ctrl+Shift+H)', simId: 'shortcuts' },
        { page: 5, title: 'Editing shortcuts (Alt+Click, Ctrl+D, F2, F12)', simId: 'shortcuts' },
        { page: 6, title: 'Format code and autocomplete (Shift+Alt+F, stless/stful)', simId: 'shortcuts' },
        { page: 7, title: 'Flutter commands (doctor, pub add, clean, analyze, build apk)', simId: 'shortcuts' },
        { page: 8, title: 'How Git works: four places', simId: 'git-lab' },
        { page: 9, title: 'Git in the terminal: clone, pull, push', simId: 'git-lab' },
        { page: 10, title: 'Branches, history and undo (switch -c, merge, conflicts)', simId: 'git-lab' },
        { page: 11, title: 'Lab task: Individual Branch & Chrome Run' },
      ],
      keyTakeaways: [
        'Commit your work before running a global find-and-replace (Ctrl+Shift+H) so git restore can undo mistakes safely.',
        'Git moves snapshots across four places: Working folder → (add) → Staging area → (commit) → Local repo → (push) → Remote (origin).',
        'Use one branch per task/lab (git switch -c lab6/<roll>) to keep main clean and avoid collisions.',
        'Keep build/, .dart_tool/, .idea/ and API keys out of Git using .gitignore.',
      ],
      labs: ['shortcuts', 'git-lab'],
      deliverables: [
        {
          n: 1,
          title: 'Set up your editor',
          text: 'Install Flutter and Error Lens extensions in VS Code, enable Auto Save and format on save, and pick a theme.',
        },
        {
          n: 2,
          title: 'Clone & branch',
          text: 'Clone the class repository, run flutter pub get, then create your branch with git switch -c lab6/<your-roll>.',
        },
        {
          n: 3,
          title: 'Change, commit, push',
          text: 'Use global replace to change the app colour, test with flutter run -d chrome, then commit and push.',
        },
      ],
      submission: 'Link to your branch on GitHub plus a screenshot of the app running in Chrome. (Individual deliverable)',
      flashcards: [
        { front: 'Four places in Git', back: 'Working folder → Staging area (git add) → Local repository (git commit) → Remote origin (git push).' },
        { front: 'Create & switch to a branch', back: 'git switch -c <branch-name> (e.g. git switch -c lab6/220101).' },
        { front: 'Stuck Flutter build recipe', back: 'flutter clean → flutter pub get → flutter run.' },
        { front: 'F2 vs Ctrl+Shift+P vs Shift+Alt+F', back: 'F2 renames a symbol project-wide · Ctrl+Shift+P opens command palette · Shift+Alt+F formats the file.' },
      ],
    },
    {
      id: 7,
      label: 'Week 7',
      title: 'Design Patterns & Best Practices',
      status: 'upcoming',
      co: ['CO2', 'CO3'],
      cluster: 'project',
      summary: 'SOLID principles, clean code, selected design patterns and technology stack selection.',
      forProject: 'Clean, maintainable architecture before Sprint 1 kicks off.',
      topics: ['SOLID principles', 'Clean code', 'Selected design patterns', 'Technology stack selection'],
      labs: [],
    },
    {
      id: 8,
      label: 'Week 8',
      title: 'Sprint 1 Development',
      status: 'upcoming',
      co: ['CO2', 'CO3'],
      cluster: 'project',
      summary: 'Core module implementation and structured peer/supervisor code review.',
      forProject: 'Build the core working screens and models of your team application.',
      topics: ['Core module implementation', 'Code review', 'Agile sprint tracking'],
      labs: [],
    },
    {
      id: 9,
      label: 'Week 9',
      title: 'Sprint Review 1',
      status: 'upcoming',
      co: ['CO2', 'CO4'],
      cluster: 'project',
      milestone: 'Sprint Review 1',
      summary: 'Progress presentation and live feedback on Sprint 1 deliverables.',
      forProject: 'Demonstrate working Sprint 1 features and incorporate instructor feedback.',
      topics: ['Progress presentation', 'Demo of Sprint 1 increment', 'Feedback & backlog refinement'],
      labs: [],
    },
    {
      id: 10,
      label: 'Week 10',
      title: 'Sprint 2 Development',
      status: 'upcoming',
      co: ['CO2', 'CO3'],
      cluster: 'project',
      summary: 'Module integration, REST APIs, real-time features, authentication and security.',
      forProject: 'Connect modules end-to-end with authentication and real-time data.',
      topics: ['Module integration', 'APIs & real-time features', 'Authentication & security'],
      labs: [],
    },
    {
      id: 11,
      label: 'Week 11',
      title: 'Software Testing',
      status: 'upcoming',
      co: ['CO3'],
      cluster: 'project',
      summary: 'Unit, integration and system testing alongside automated testing tools.',
      forProject: 'Verify edge cases, widget behaviour and API error handling.',
      topics: ['Unit testing', 'Integration testing', 'System testing', 'Automated testing tools'],
      labs: [],
    },
    {
      id: 12,
      label: 'Week 12',
      title: 'Optimization & Sprint Review 2',
      status: 'upcoming',
      co: ['CO2', 'CO3', 'CO4'],
      cluster: 'project',
      milestone: 'Sprint Review 2',
      summary: 'Performance tuning, scalability, refactoring and Sprint 2 progress presentation.',
      forProject: 'Polish speed, eliminate rebuild bottlenecks and present Sprint 2.',
      topics: ['Performance tuning', 'Scalability & refactoring', 'Sprint Review 2 presentation'],
      labs: [],
    },
    {
      id: 13,
      label: 'Week 13',
      title: 'Deployment & Documentation',
      status: 'upcoming',
      co: ['CO3', 'CO4'],
      cluster: 'project',
      summary: 'Cloud hosting, CI/CD basics, user manual and final technical report preparation.',
      forProject: 'Package release builds, host backend services and finish documentation.',
      topics: ['Cloud hosting', 'CI/CD basics', 'User manual', 'Technical report'],
      labs: [],
    },
    {
      id: 14,
      label: 'Week 14',
      title: 'Final Evaluation',
      status: 'upcoming',
      co: ['CO4'],
      cluster: 'final',
      milestone: 'Final evaluation',
      summary: 'Final project demonstration, presentation, report submission and viva.',
      forProject: 'Present your complete application and defend design decisions in the viva.',
      topics: ['Final project demonstration', 'Final presentation', 'Report submission', 'Viva'],
      labs: [],
    },
  ] as WeekData[],
};

export const APP_JOURNEY_STEPS = [
  { label: 'Install', week: 1 },
  { label: 'Dart', week: 1 },
  { label: 'Widgets', week: 2 },
  { label: 'Layout & colour', week: 3 },
  { label: 'REST', week: 4 },
  { label: 'Maps', week: 5 },
  { label: 'Git', week: 6 },
  { label: 'Sprints', week: 8 },
  { label: 'Test', week: 11 },
  { label: 'Deploy', week: 13 },
  { label: 'Demo', week: 14 },
];
