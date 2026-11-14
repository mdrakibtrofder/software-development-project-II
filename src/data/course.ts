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
  setup: { id: 'setup', label: 'Requirements & Spec', colorVar: '--c-setup', hex: '#6366F1' },
  ui: { id: 'ui', label: 'Specification & Agile', colorVar: '--c-ui', hex: '#8B5CF6' },
  network: { id: 'network', label: 'Software Design & UML', colorVar: '--c-net', hex: '#3B82F6' },
  maps: { id: 'maps', label: 'Prompt Engineering', colorVar: '--c-maps', hex: '#14B8A6' },
  tools: { id: 'tools', label: 'Software Testing & QA', colorVar: '--c-tools', hex: '#F59E0B' },
  project: { id: 'project', label: 'Project Management', colorVar: '--c-project', hex: '#F43F5E' },
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
  imageDir?: string;
  coverImage?: string;
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
      title: 'Software Requirement Analysis & Specification',
      status: 'published',
      co: ['CO1', 'CO2'],
      cluster: 'setup',
      summary:
        'Explore fundamental motivations for software requirement engineering, client interviews, SRS documentation (IEEE 830), and functional/non-functional requirements.',
      forProject: 'Conduct client interviews and produce a validated Mini SRS for the university food delivery system.',
      topics: [
        'Requirement Engineering Foundations',
        'Process & Client Interviews',
        'Functional vs Non-Functional Requirements',
        'SRS Document Structure (IEEE 830)',
        'Business Rules & Use Cases',
        'Mini SRS Handoff',
      ],
      deck: {
        title: 'Software Requirement Analysis & Specification',
        pdf: 'slides/pdf/week-1.pdf',
        pptx: 'slides/Week_1_Software_Requirement_Analysis_and_Specification.pptx',
        slides: 12,
        size: '0.5 MB',
        imageDir: 'slides/images/week-1',
        coverImage: 'slides/images/week-1/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Software Requirement Analysis & Specification' },
        { page: 2, title: 'Foundations: What Is a Requirement & SRS?' },
        { page: 3, title: 'Process: Requirement Engineering Lifecycle' },
        { page: 4, title: 'Client Interviews: How to Talk with Clients' },
        { page: 5, title: 'Classification: Functional vs Non-Functional Requirements' },
        { page: 6, title: 'Documentation: Structure of an SRS Document' },
        { page: 7, title: "Today's Lab: Client Interview & Mini SRS" },
        { page: 8, title: 'Case Study: System Stakeholders (UFDS)' },
        { page: 9, title: 'Case Study: Functional Requirements' },
        { page: 10, title: 'Case Study: Non-Functional Requirements' },
        { page: 11, title: 'Case Study: Business Rules & Use Cases' },
        { page: 12, title: 'Your Turn, Software Engineers: Deliverables & Handoff' },
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
      title: 'Software Specification & GitHub Projects',
      status: 'published',
      co: ['CO2', 'CO3'],
      cluster: 'ui',
      summary:
        'Managing a 3-person software project with GitHub Projects: breaking epics into issues, story points, branch workflows, sprint board setup, WIP limits, and flow rules.',
      forProject: 'Transform your feature list into a live GitHub Project board with epics, issues, and sprint iterations.',
      topics: [
        'Three People, 13 Features, 10 Weeks',
        'Decomposing Epics into Cards',
        'Anatomy of a Good GitHub Issue',
        'Conventions: Labels & Story Points',
        'Standing Up the Board in GitHub',
        'Rules of Flow & Sprint Iterations',
      ],
      deck: {
        title: 'Software Specification & GitHub Projects',
        pdf: 'slides/pdf/week-2.pdf',
        pptx: 'slides/Week_2_Software_Specification.pptx',
        slides: 14,
        size: '0.5 MB',
        imageDir: 'slides/images/week-2',
        coverImage: 'slides/images/week-2/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Software Specification: Managing Projects with GitHub' },
        { page: 2, title: 'The Problem: Three People, Thirteen Features, Ten Weeks' },
        { page: 3, title: 'Decomposition: Turning Features into Shippable Cards' },
        { page: 4, title: 'The Card: Anatomy of an Actionable GitHub Issue' },
        { page: 5, title: 'Conventions: Story Points, Priorities & Labeling' },
        { page: 6, title: 'The Team: Ownership and Work-in-Progress (WIP) Limits' },
        { page: 7, title: 'Setup: Standing Up the Board in GitHub Projects' },
        { page: 8, title: 'The Board: Live Sprint Board Architecture' },
        { page: 9, title: 'Rules of Flow: Four Rules That Make the Board Work' },
        { page: 10, title: 'Iterations: Ten Weeks, Five Two-Week Sprints' },
        { page: 11, title: 'Automation: One Card, One Branch, One Pull Request' },
        { page: 12, title: 'Measurement: Velocity, Burndown & Board Metrics' },
        { page: 13, title: 'Habits: Keeping the Board Alive Every Day' },
        { page: 14, title: 'Lab Task: Build the Board Before You Build the App' },
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
      title: 'Software Design: UML Diagrams & Architecture',
      status: 'published',
      co: ['CO3'],
      cluster: 'network',
      summary:
        'Delve into procedural UML design models for the University Food Delivery System (UFDS): Use Case Diagrams, Class Diagrams, Activity Diagrams, and Sequence Diagrams.',
      forProject: 'Create comprehensive UML diagrams representing structural and behavioral views of your project.',
      topics: [
        'Four Views of One System',
        'Use Case Diagrams & Specifications',
        'Class Diagrams & Relationships',
        'Activity Diagrams & Business Flows',
        'Sequence Diagrams & Lifelines',
        'Connecting the Four Views',
      ],
      deck: {
        title: 'Software Design: UML Modeling',
        pdf: 'slides/pdf/week-3.pdf',
        pptx: 'slides/Week_3_Software_Design.pptx',
        slides: 16,
        size: '0.5 MB',
        imageDir: 'slides/images/week-3',
        coverImage: 'slides/images/week-3/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Software Design: UML Modeling for Sessional' },
        { page: 2, title: 'What We Build Today: Four Views of One System' },
        { page: 3, title: 'The System We Model: University Food Delivery (UFDS)' },
        { page: 4, title: 'Who Uses the System: Use Case Diagram' },
        { page: 5, title: 'Case Study Diagram 1: Use Case Diagram (UFDS)' },
        { page: 6, title: 'Behind Every Oval: Use Case Specification — Place Order' },
        { page: 7, title: 'Structure of the System: Class Diagram' },
        { page: 8, title: 'Case Study Diagram 2: Class Diagram (UFDS)' },
        { page: 9, title: 'How the Work Flows: Activity Diagram' },
        { page: 10, title: 'Case Study Diagram 3: Activity Diagram — Order to Delivery' },
        { page: 11, title: 'Who Talks to Whom: Sequence Diagram' },
        { page: 12, title: 'Case Study Diagram 4: Sequence Diagram — Place Order' },
        { page: 13, title: 'Keeping the Model Honest: Connecting the Four Views' },
        { page: 14, title: 'Before You Submit: Common Modeling Mistakes' },
        { page: 15, title: 'Week 3 Lab Work: Tasks & Deliverables' },
        { page: 16, title: 'Week 3 Wrap-Up: One Unified System Architecture' },
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
      title: 'Software Development Using Prompt Engineering',
      status: 'published',
      co: ['CO3', 'CO4'],
      cluster: 'maps',
      milestone: 'Project proposal presentation',
      summary:
        'From requirements and UML diagrams to build-ready prompts: prompt anatomy, zero/one/few-shot learning, constraints, and the UFDS AI build prompt.',
      forProject: 'Engineer robust prompts to scaffold and generate clean code for your project components.',
      topics: [
        'AI-Assisted Software Development',
        'Anatomy of a Great Prompt',
        'Zero-Shot, One-Shot & Few-Shot',
        'Refining & Constraining Output',
        'Worked Example: UFDS Role & Context',
        'Worked Example: UFDS Constraints & Schema',
      ],
      deck: {
        title: 'Software Development Using Prompt Engineering',
        pdf: 'slides/pdf/week-4.pdf',
        pptx: 'slides/Week_4_Software_Development_Using_Prompt_Engineering.pptx',
        slides: 8,
        size: '0.2 MB',
        imageDir: 'slides/images/week-4',
        coverImage: 'slides/images/week-4/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Prompt Engineering for Software Design' },
        { page: 2, title: 'AI-Assisted Development: What Is Prompt Engineering?' },
        { page: 3, title: 'The Building Blocks: Anatomy of a Great Prompt' },
        { page: 4, title: 'Teaching by Example: Zero-Shot, One-Shot & Few-Shot' },
        { page: 5, title: 'Getting Better Output: Tuning & Constraints' },
        { page: 6, title: "Today's Lab: Engineer the Build-Ready Prompt" },
        { page: 7, title: 'Worked Example: Role, Context & Task for UFDS' },
        { page: 8, title: 'Worked Example: Data, Schema & Architectural Constraints' },
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
      title: 'Software Testing & Quality Review',
      status: 'published',
      co: ['CO4'],
      cluster: 'tools',
      summary:
        'Comprehensive software testing & quality review: ISTQB principles, testing levels, test design & boundary value analysis, bug reports, and bug life cycles.',
      forProject: 'Formulate test cases, execute black-box and boundary tests, and document bug reports for peer systems.',
      topics: [
        'Foundations & ISTQB Principles',
        'Four Levels of Testing',
        'Equivalence Partitioning & Boundary Value Analysis',
        'Anatomy of a Test Case',
        'UX & Content Review',
        'Bug Reporting & Life Cycle',
      ],
      deck: {
        title: 'Software Testing & Quality Review',
        pdf: 'slides/pdf/week-5.pdf',
        pptx: 'slides/Week_5_Software_Testing.pptx',
        slides: 13,
        size: '1.4 MB',
        imageDir: 'slides/images/week-5',
        coverImage: 'slides/images/week-5/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Software Testing & Quality Review' },
        { page: 2, title: 'Foundations: What Is Software Testing?' },
        { page: 3, title: 'Principles: Seven Principles of Testing (ISTQB)' },
        { page: 4, title: 'Levels: Four Levels of Testing (Unit to Acceptance)' },
        { page: 5, title: 'Testing Types: Functional, Regression, Smoke & Sanity' },
        { page: 6, title: 'Test Design: Partitions & Boundary Value Analysis' },
        { page: 7, title: 'Test Cases: Anatomy of an Effective Test Case' },
        { page: 8, title: 'What We Hunt: Four Kinds of Software Defects' },
        { page: 9, title: 'UX & Content Review: UI Consistency, Copy & Usability' },
        { page: 10, title: 'Bug Reports: Anatomy of a Reproducible Bug Report' },
        { page: 11, title: 'Bug Life Cycle: From Discovery to Closure' },
        { page: 12, title: 'Test Report: UFDS Build v0.6 Test Summary' },
        { page: 13, title: 'Lab Task: Break It Before Your Users Do' },
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
      title: 'Software Project Management',
      status: 'published',
      co: ['CO4', 'CO5'],
      cluster: 'project',
      summary:
        'Planning, estimating, costing, and tracking the UFDS project: WBS, feature-wise effort estimation, cost modeling, Gantt charts, risk control, and change management.',
      forProject: 'Create a Work Breakdown Structure, effort estimates, and Gantt schedule for your team sprint delivery.',
      topics: [
        'Project Management Foundations',
        'Five Process Groups',
        'Work Breakdown Structure (WBS)',
        'Effort Estimation & Cost Modeling',
        'Gantt Scheduling & Milestones',
        'Risk Management & Status Control',
      ],
      deck: {
        title: 'Software Project Management',
        pdf: 'slides/pdf/week-6.pdf',
        pptx: 'slides/Week_6_Software_Project_Management.pptx',
        slides: 13,
        size: '1.7 MB',
        imageDir: 'slides/images/week-6',
        coverImage: 'slides/images/week-6/slide-01.png',
      },
      slideMap: [
        { page: 1, title: 'Software Project Management Foundations' },
        { page: 2, title: 'What Is Software Project Management?' },
        { page: 3, title: 'Lifecycle: Five Phases of a Project' },
        { page: 4, title: 'Scope: Work Breakdown Structure (WBS)' },
        { page: 5, title: 'Estimation: Hours, Man-Days & Duration' },
        { page: 6, title: 'Effort: Feature-Wise Effort Estimate for UFDS' },
        { page: 7, title: 'Cost: Financial Budgeting & Resource Cost' },
        { page: 8, title: 'Schedule: Ten-Week Timeline & Gantt Chart' },
        { page: 9, title: 'The Board: Unified Tracking for Features & Bugs' },
        { page: 10, title: 'Tracking: Planned vs Actual Time' },
        { page: 11, title: 'Risk: Risk Identification & Mitigation Strategy' },
        { page: 12, title: 'Control: Status Reports & Change Control' },
        { page: 13, title: 'Lab Task: Plan the Work, Then Work the Plan' },
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
