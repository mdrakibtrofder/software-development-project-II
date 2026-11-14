# Build Prompt: CSE 3100 Software Development Project II Study Website

> **How to use this file:** Give this whole file to an AI coding assistant (Claude, Claude Code, Cursor, etc.) and open the `CSE_3100` folder as its working folder. The file contains the course facts, the exact file names, a slide-by-slide content map, every worked number from the decks, the page structure, the visual design (modelled on the **CSE 2205 · DBMS** study portal, exactly like the CSE 3102 site) and the interactive simulations. The assistant should not need to guess anything.
>
> **Family of sites:** CSE 2205 (DBMS theory), CSE 2206 (DBMS sessional) and CSE 3102 (Software Engineering sessional) have study portals. **This site must look and feel like them**: same top bar, same hero layout, same "Explore the Study Portal" card grid, same tokens. Only the content and the simulations change. Section 9 describes the UI precisely.

---

## 1. Your Role and Goal

You are a senior front-end engineer and a learning-experience designer. Build a **beautiful, student-friendly study website** for **CSE 3100: Software Development Project II** at BAUST (Bangladesh Army University of Science & Technology, Saidpur).

This is a **project course**: students work in teams to build a real mobile application. The weekly lab decks teach the toolchain that project needs: **Flutter and Dart** (installation, widgets, layouts, colours, navigation), **REST APIs and HTTP**, **maps and live location data**, and **professional tools** (VS Code, Flutter CLI, Git and GitHub). The site must keep one question in front of the student: *"How does this week help my project app?"*

The website must:

1. Present the course **week by week**. Weeks 1–6 are published from the decks; Weeks 7–14 are "upcoming" from the course outline, so the roadmap shows the full 14-week project. Each published week's lab slides can be **viewed in the browser** and **downloaded** (PPTX and PDF).
2. Provide a **Notes Library**: one clean, site-authored study note per published week (6 notes), written **only from the slide content**, printable, with source-slide links.
3. Provide **20 interactive simulations** ("Visualizations") that let students *do* what the slide describes: fix a `flutter doctor` report, build a widget tree, watch `setState` and hot reload, play with Row/Column alignment, decode a hex colour, parse a REST URL, drive a `FutureBuilder`, zoom a map, chain geocoding to weather, practise VS Code shortcuts and Git branches (Section 8).
4. Provide a searchable **Glossary** of every key term (Appendix B).
5. Include per-week **Check yourself quizzes** (5 MCQs per week, 30 total, Appendix C), **flashcards**, and **lab-deliverable checklists** taken verbatim from each deck's last slide.
6. Include a dedicated **MCQ Practice page with 100 questions** (§7.11, Appendix D), 4 options each, with the correct answer viewable, and answers spread evenly across A–D.
7. Include a **Project Hub** page (§7.12): the official milestones, the assessment weights, and a **Proposal Builder** that follows the course's Project Proposal Documentation Template.
8. Open in **light mode by default**, with a **dark mode toggle** that remembers the choice.
9. Work well on **mobile phones**. Most students will open it on a phone.
10. Be a **static site** with no server, no login and no database. Deployable free on **GitHub Pages**, **Netlify** or **Vercel**.
11. Use **no AI service and no network calls at runtime** other than pinned CDN libraries and optional outbound links (docs.flutter.dev, dartpad.dev, pub.dev). Everything interactive is rule-based and computed in the browser.

**The soul of the site:** *"Install it. Build it. Connect it. Ship it."* (optional small tagline under the hero buttons).

---

## 2. Course Facts (use exactly as written)

Source: `CSE_3100_Course_Outline_Winter_2026.docx` (read it, **do not publish it**).

| Field | Value |
|---|---|
| Course code | CSE 3100 |
| Course title | Software Development Project II |
| Credit | 0.75 (1.50 hours/week) |
| Level / Term | Level-3, Term-I |
| Semester label on the site | **Summer 2026** (the folder says Summer 2026, the outline file says Winter 2026; see §15) |
| Type | Core · Prerequisite: None |
| Department | Department of Computer Science and Engineering, Faculty of Electrical and Computer Engineering, BAUST |
| Programme | B.Sc. Engineering in Computer Science and Engineering |
| Lead instructor | **Md. Rakib Trofder**, Lecturer (Room 303 (C) · trofder@baust.edu.bd · Sun and Thu, 10:50 AM – 1:20 PM). **Do not show phone numbers.** |
| Lab team (named on every deck) | Md. Rakib Trofder · **Md. Osama** · **Md. Sirajul Islam** (all Dept. of CSE, BAUST). The outline lists only Md. Rakib Trofder, so show him as lead instructor and the other two as "Lab team" without contact details. |
| Textbook | Roger S. Pressman & Bruce R. Maxim, *Software Engineering: A Practitioner's Approach*, 9th Edition, McGraw-Hill, 2019 |
| Other references | Design Patterns Tutorial, TutorialsPoint (`https://www.tutorialspoint.com/design_pattern/index.htm`) · Sommerville, *Software Engineering* (Pearson) · Gamma, Helm, Johnson, Vlissides, *Design Patterns* (Addison-Wesley) · Robert C. Martin, *Clean Code* (Prentice Hall) · Schwaber & Sutherland, *The Scrum Guide* (scrumguides.org) |

Show references as citations or outbound links only. Never host a textbook PDF.

**Synopsis (use as the Course Info paragraph):** the course prepares students to solve advanced industry-level problems and develop professional real-time software applications; learners apply the full software development lifecycle using modern tools, best practices and agile methodologies, strengthening problem-solving skills and the ability to independently build scalable, efficient, industry-standard software.

### Course Outcomes (COs)

| CO | Statement | PO | Bloom's |
|---|---|---|---|
| CO1 | Analyze an industry-level real-world problem to identify stakeholders, requirements and constraints, and formulate a feasible software project specification. | PO2 | C4 |
| CO2 | Design and develop a scalable, efficient real-time software solution by following the software development lifecycle, design patterns and best practices. | PO3 | C5, C6 · P4 |
| CO3 | Apply modern tools and technologies, including frameworks, version control, testing and deployment tools, to build and validate the software. | PO5 | C3 · P3 |
| CO4 | Manage the project as a team using agile practices and communicate the work effectively through documentation, demonstration and presentation. | PO10 | A3 · P3 |

Delivery and assessment per CO (Course Info page): CO1 → lecture, brainstorming, case study, supervisor meetings; assessed by project proposal and project report · CO2 → supervised development, design review, code review; assessed by progress presentation and final project and demonstration · CO3 → tool demonstration, hands-on practice, supervised development; assessed by final project and demonstration and viva · CO4 → sprint meetings, group discussion, presentation practice; assessed by progress presentation, project report, final presentation and viva.

The slides do not tag COs per week, so the site tags the **six lab decks (Weeks 1–6) with CO2 and CO3** (develop with frameworks and modern tools) and the upcoming Weeks 7–14 exactly as the outline does (§6). Instructors can change this in `course.js` (§15).

### Assessment (show as a donut chart on the Course Info page and on the Project Hub)

| Method | Weight |
|---|---|
| Project Proposal | 10% |
| Progress Presentation (Sprint Reviews) | 15% |
| Final Project & Demonstration | 35% |
| Project Report / Documentation | 15% |
| Final Presentation | 10% |
| Viva | 10% |
| Attendance | 5% |
| **Total** | **100%** |

### Official outline schedule (show as a reference table on Course Info and as milestone markers on the roadmap)

| Outline week | Topics | CO |
|---|---|---|
| 1 | Course orientation: team formation, identifying industry-level problems, idea brainstorming | CO1 |
| 2 | Problem analysis: feasibility study, stakeholder identification, scope definition | CO1 |
| 3 | Requirement engineering: SRS, user stories, product backlog | CO1 |
| 4 | **Project proposal presentation**; agile planning (sprint planning, scheduling, Gantt chart); Git/GitHub setup and branching workflow | CO1, CO4 |
| 5 | System design: software architecture (layered, MVC, client-server, microservices), UML diagrams | CO2 |
| 6 | Database and UI/UX design: schema design, wireframes and prototypes | CO2 |
| 7 | Design patterns and best practices: SOLID, clean code, selected design patterns, technology stack selection | CO2, CO3 |
| 8 | Sprint 1 development: core module implementation, code review | CO2, CO3 |
| 9 | **Sprint Review 1**: progress presentation and feedback | CO2, CO4 |
| 10 | Sprint 2 development: module integration, APIs, real-time features, authentication and security | CO2, CO3 |
| 11 | Software testing: unit, integration and system testing; automated testing tools | CO3 |
| 12 | Optimization and **Sprint Review 2**: performance tuning, scalability, refactoring; progress presentation | CO2, CO3, CO4 |
| 13 | Deployment and documentation: cloud hosting, CI/CD basics, user manual and technical report | CO3, CO4 |
| 14 | **Final evaluation**: final project demonstration, presentation, report submission and viva | CO4 |

> **Important:** the weekly **lab decks** teach the Flutter toolchain and follow the instructor's delivery plan (setup → Dart → widgets → REST → maps → tools). Their week numbers **do not match the outline's topics for Weeks 1–6** (which are project-process topics: orientation, analysis, SRS, proposal, design). **The decks are the source of truth for the site's Weeks 1–6.** The outline's project-process milestones (proposal in Week 4, sprint reviews in Weeks 9 and 12, final evaluation in Week 14) are shown as **milestone badges** on the roadmap and on the Project Hub. Add this note to Course Info: *"Weekly lab content follows the instructor's delivery plan; the official outline lists the project milestones."*

---

## 3. Source Files: The Exact Inventory

The site is built from the `CSE_3100` folder. **All week-wise slides are in the root of the folder.** There are no subfolders.

### 3.1 Week-wise slide decks (root folder): ALL must be attached

The **file names are the source of truth for the week numbers**. Quote paths in scripts (names are long).

| Week | Slide file | Slides | Size | Theme |
|---|---|---|---|---|
| 1 | `Week_1_Flutter_Installation_Introduciton_to_Dart.pptx` | 14 | 4.9 MB | From a blank machine to your first Dart program: SDK, PATH, Android Studio, `flutter doctor`, first app, Dart basics |
| 2 | `Week_2_Flutter_Basics.pptx` | 14 | 4.8 MB | Widgets, menus, maps and APIs: a minimal app that shows real data |
| 3 | `Week_3_Flutter_Widgets_Layouts_and_Colors.pptx` | 28 | 1.1 MB | Widgets, layouts, colours, interaction and navigation in one codebase |
| 4 | `Week_4_REST_APIs_and_HTTP.pptx` | 8 | 2.9 MB | How an app asks a server for data and shows it |
| 5 | `Week_5_Maps_and_Location_Data.pptx` | 7 | 2.5 MB | Latitude/longitude, zoom, Open-Meteo, `flutter_map` |
| 6 | `Week_6_Software_Development_Tools_and_Tricks.pptx` | 11 | 3.8 MB | VS Code, Flutter CLI and Git like a professional |

Total: **82 slides** across **6 decks** (the heaviest are Weeks 1, 2 and 6, so build light PDF copies for phones, §4.4).

### 3.2 Course resource (root folder)

| File | What it is | Where |
|---|---|---|
| `CSE_3100_Project_Proposal_Documentation_Template.docx` | The Project Documentation Report template (cover table: project name, student ID and name, level, term, section, submission date; sections 1 Problem Statement, 2 Objective (2.1 what we aim to solve, 2.2 how we plan to solve it), 3 Features of Your Idea, 4 Conclusion). | **Project Hub** (§7.12) as a **download**, and as the structure of the **Proposal Builder**. Default: published (students need it); the instructor can switch it off in §15. |

### 3.3 Notes on the decks (do not "fix" the slides, just be aware)

- The **Week 1** file name contains the typo `Introduciton`. The site title is **Week 1: Flutter Installation & Introduction to Dart**; the web file name is corrected (§4.2).
- **Weeks 2 and 3 overlap** on widgets, `StatelessWidget`/`StatefulWidget`, Navigator and `ListView`. Week 2 is project-oriented (menus, a map, an API) and Week 3 is a beginner-friendly consolidation that adds colours, themes and text styling. The site cross-links the two ("Revisit in Week 3") instead of merging them.
- **Two different map packages appear**: Week 2 uses **`google_maps_flutter`** (needs a Google Cloud API key, `LatLng(25.7770, 88.9270)`) and Week 5 uses **`flutter_map`** with OpenStreetMap tiles (**no key**, `LatLng(25.78, 88.90)`). Both are "Saidpur, approximately". Show each where the slide shows it, with a comparison callout in the Week 5 note.
- **Week 2 "Next Week"** promises forms, state management and local persistence; the actual Week 3 and 4 decks cover basics and REST. Leave the slide as it is; the Week 2 page does not repeat that promise.
- The **version numbers** in Week 1 (`Flutter 3.24.3`, `Dart 3.5.3`, `DevTools 2.37.3`, `Android SDK 34.0.0`) and the **sample Open-Meteo response** in Week 5 (time `2026-11-08T14:00`, 26.4 °C, 7.9 wind) are **illustrative**. Label them "example output; yours will differ".
- Slide footers use their own page labels (for example "Week 4 · REST APIs & HTTP 02"). The viewer, deep links and every "slide N" reference use the **physical PDF page number**.
- Weeks 2, 4, 5 and 6 contain "Next Week" lines and Week 4's lab uses **JSONPlaceholder** (`jsonplaceholder.typicode.com`). Treat both as part of the content.

### 3.4 Do NOT publish these

- `CSE_3100_Course_Outline_Winter_2026.docx` (source of §2; read, do not link unless the instructor asks)
- `.DS_Store` files
- Any marks sheet, question set or solution file added later (the sibling course folders contain such files; the prepare script must **only** pick up `Week_*.pptx`, `Week_*.pdf` and the single template listed in §3.2)

Add these patterns to `.gitignore`.

---

## 4. Preparing the Files (do this first)

Browsers cannot display `.pptx`. Do this:

1. **Convert each deck to PDF** with LibreOffice:
   ```bash
   soffice --headless --convert-to pdf --outdir site/assets/slides/pdf ./Week_*.pptx
   ```
2. **Rename to safe web names** (lowercase, hyphens, two-digit week), keeping the original PPTX for download:
   - `Week_1_Flutter_Installation_Introduciton_to_Dart.pptx` → `week-01-flutter-installation-dart-intro.pptx` / `.pdf`
   - `Week_2_Flutter_Basics.pptx` → `week-02-flutter-basics-menus-maps-apis.pptx` / `.pdf`
   - `Week_3_Flutter_Widgets_Layouts_and_Colors.pptx` → `week-03-widgets-layouts-colors.pptx` / `.pdf`
   - `Week_4_REST_APIs_and_HTTP.pptx` → `week-04-rest-apis-http.pptx` / `.pdf`
   - `Week_5_Maps_and_Location_Data.pptx` → `week-05-maps-location-data.pptx` / `.pdf`
   - `Week_6_Software_Development_Tools_and_Tricks.pptx` → `week-06-dev-tools-tricks.pptx` / `.pdf`
   - `CSE_3100_Project_Proposal_Documentation_Template.docx` → `assets/resources/project-proposal-template.docx`
3. **Thumbnails**: first slide of every deck as `.webp` (about 640 px wide) plus a 160 px thumbnail for **every page** (the viewer's strip). `pdftoppm -f 1 -l 1 -r 60 -png in.pdf t && cwebp t-1.png -o thumb.webp`.
4. **Shrink for phones**: Weeks 1, 2 and 6 are 3.8–4.9 MB as PPTX (they contain screenshots). After conversion, any PDF over 3 MB gets a Ghostscript `/ebook` "light" copy (`gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook …`); keep the full-quality PDF as the download and serve the light one in the viewer.
5. **Extract speaker notes** with `python-pptx` (`slide.notes_slide.notes_text_frame.text`). Every deck has notes. They are **teaching tips**; show them only inside a collapsed "Teacher's note" block in the Notes Library, never on the public slide viewer.
6. **Extract text, tables and every code block** into `data/course.js` (§6): slide titles, the real PowerPoint tables (Week 3 project-folder table, widget table and cheat sheet; Week 4 methods table, query-parameter table and Week 5 coordinate and parameter tables; Week 6 shortcut and command tables). Dart code boxes become **snippets** (§7.5) with the slide number, a one-line "what this shows" and a "Copy" and "Open DartPad" action.
7. **Record each file's size and page count** in the data file; the UI shows them ("PDF · 14 slides · 1.9 MB").
8. Write `scripts/prepare-assets.sh` and `scripts/extract_slides.py` to repeat steps 1–7. The script **skips every file in §3.4**.

### Target folder structure

```
site/
├── index.html
├── assets/
│   ├── slides/  pptx/  pdf/  thumbs/   (week-01 … week-06)
│   ├── resources/ project-proposal-template.docx
│   └── img/     logo.svg, favicon.svg, og-image.png
├── data/
│   ├── course.js        ← single source of truth (§6)
│   ├── notes.js         ← the 6 study notes as structured blocks (§7.4)
│   ├── snippets.js      ← every Dart / shell code block from the decks (§7.5)
│   ├── glossary.js      ← Appendix B
│   ├── quizzes.js       ← Appendix C (30 per-week MCQs)
│   ├── mcq.js           ← Appendix D (100-question practice bank; copy of CSE_3100_MCQ_Bank.js)
│   └── labs.js          ← fixtures for the 20 simulations (numbers in §8)
├── css/   input.css (Tailwind source + tokens) → tailwind.css (generated, committed)
├── tailwind.config.js
├── js/    app.js, router.js, viewer.js, search.js, store.js, notes.js, quiz.js, mcq.js, project.js, viz/*.js
├── tests/ labs-fixtures.test.js, mcq-distribution.test.js
└── scripts/ prepare-assets.sh, extract_slides.py
```

---

## 5. Tech Stack

The instructor is not a full-time developer, so keep it **simple and dependency-light**:

- **Plain HTML + vanilla JavaScript (ES modules) + Tailwind CSS v3 (pinned)**. No JavaScript framework. Build the stylesheet with the **Tailwind standalone CLI** (`tailwindcss -i css/input.css -o css/tailwind.css --minify`), commit the generated CSS and document the command in `README.md`. No Tailwind Play CDN in production. Map the tokens of §10.2 into `tailwind.config.js` as CSS-variable colours and set `darkMode: ['selector', '[data-theme="dark"]']`.
- **Hash-based routing** (`#/`, `#/weeks`, `#/week/4`, `#/week/4?page=6`, `#/slides`, `#/notes`, `#/note/5`, `#/labs`, `#/lab/color-lab`, `#/glossary`, `#/mcq`, `#/project`, `#/about`) so GitHub Pages needs no server config.
- **PDF.js** (cdnjs, **pinned**) for the slide viewer.
- **Code display**: **Prism.js** (cdnjs, pinned, Dart + bash + yaml + json + sql-free) for Dart, shell, YAML and JSON blocks; a **Copy** button and an **Open in DartPad** link (`https://dartpad.dev/`, opens a new tab; DartPad cannot be pre-filled without a gist, so the button copies the code first and says "Code copied. Paste it in DartPad.").
- **Real Flutter and Dart cannot run in a static browser page.** The simulations therefore **model** the behaviour with small JavaScript state machines and inline SVG (a widget tree, a layout engine for Row/Column/Stack, a colour decoder, a URL parser, a mock server, a tile-zoom calculator, a Git simulator). Mark every mocked server or API response as **"illustration"** and every sample output as **"example output; yours will differ"**. Do not embed or call Open-Meteo, JSONPlaceholder or Google at runtime.
- **Drag and drop**: native Pointer Events (touch + mouse) with a **tap-to-move fallback** so every simulation works with a keyboard and on phones. No drag library.
- **Charts and maps**: hand-built inline SVG (a schematic world grid for the lat/long lab, a stylised Bangladesh outline for the map labs). D3 v7 (pinned) only for the assessment donut and the zoom-tile chart. **No live map tiles** are loaded.
- **Fonts**: *Plus Jakarta Sans* for UI text, *JetBrains Mono* for code, IDs, chips and numbers, *Hind Siliguri* as Bangla fallback (Google Fonts).
- **Icons**: Lucide (inline SVG).
- **No tracking, no login, no backend.** Progress, bookmarks, quiz scores and the Proposal Builder draft live in `localStorage` only; wrap every read and write in `try/catch` and keep working if storage is blocked.
- **Pin every CDN library to an exact version** (no `@latest`).
- **Offline (nice-to-have)**: a service worker caching the shell, fonts and any PDF the student has opened.

---

## 6. Single Source of Truth: `data/course.js`

All content comes from one data file so the instructor can add a week by editing one entry and dropping in one deck.

```js
export const course = {
  code: "CSE 3100",
  title: "Software Development Project II",
  semester: "Summer 2026",
  level: "Level-3, Term-I",
  credit: "0.75",
  instructors: [
    { name: "Md. Rakib Trofder", role: "Lecturer, Dept. of CSE", email: "trofder@baust.edu.bd",
      room: "303 (C)", hours: ["Sun 10:50 AM – 1:20 PM", "Thu 10:50 AM – 1:20 PM"], lead: true }
  ],
  labTeam: ["Md. Osama", "Md. Sirajul Islam"],
  assessment: [ { method: "Project Proposal", pct: 10 }, { method: "Progress Presentation (Sprint Reviews)", pct: 15 },
                { method: "Final Project & Demonstration", pct: 35 }, { method: "Project Report / Documentation", pct: 15 },
                { method: "Final Presentation", pct: 10 }, { method: "Viva", pct: 10 }, { method: "Attendance", pct: 5 } ],
  outcomes: [ /* CO1–CO4 from §2 */ ],
  milestones: [ { week: 4, label: "Project proposal presentation" }, { week: 9, label: "Sprint Review 1" },
                { week: 12, label: "Sprint Review 2" }, { week: 14, label: "Final evaluation" } ],
  resources: [ { title: "Project Proposal Documentation Template", file: "assets/resources/project-proposal-template.docx", kind: "docx" } ],
  weeks: [
    {
      id: 4, label: "Week 4", title: "REST APIs & HTTP: Getting Real Data into Flutter",
      status: "published",                 // "published" | "upcoming"
      co: ["CO2", "CO3"],
      cluster: "network",                  // setup | ui | network | maps | tools | project | final
      summary: "How an app asks a server for data and shows it: methods, status codes, endpoints, query parameters, http, JSON.",
      topics: ["REST and resources", "GET/POST/PUT/PATCH/DELETE", "Status codes", "/v1 endpoints", "Query parameters", "Uri.https", "http + jsonDecode", "Model.fromJson", "FutureBuilder"],
      deck: { title: "REST APIs & HTTP", pdf: "assets/slides/pdf/week-04-rest-apis-http.pdf",
              pptx: "assets/slides/pptx/week-04-rest-apis-http.pptx", thumb: "assets/slides/thumbs/week-04.webp",
              slides: 8, size: "2.9 MB" },
      slideMap: [ { page: 1, title: "Title" } /* … §7.1 */ ],
      snippets: [ { id: "w4-fetch", slide: 6, lang: "dart", title: "fetchPosts()", code: "…", explain: "…" } ],
      keyTakeaways: [ /* 3–5 bullets from the slides' call-outs */ ],
      labs: ["url-anatomy", "http-lab", "future-states", "json-model"],
      deliverables: [ { n: 1, title: "Posts List", text: "Fetch /posts from jsonplaceholder.typicode.com and show every title in a ListView of Cards." } /* … verbatim */ ],
      submission: "GitHub repository link plus screenshots of the loading, error and data states.",
      quiz: [ /* 5 MCQs, Appendix C */ ], flashcards: [ /* { front, back } */ ], terms: [ /* glossary ids */ ]
    }
    // … Weeks 1–6 published; Weeks 7–14 upcoming from the outline (below)
  ]
};
```

**Rules and special cases**
- **Weeks 1–6** are `published` (clusters: W1 `setup`, W2 and W3 `ui`, W4 `network`, W5 `maps`, W6 `tools`).
- **Weeks 7–14** are `upcoming`, created from the outline (cluster `project`, except Week 14 `final`) and rendered as locked "Coming soon" cards listing the outline topics and COs: **7 Design Patterns & Best Practices** (CO2, CO3) · **8 Sprint 1 Development** (CO2, CO3) · **9 Sprint Review 1** (CO2, CO4) · **10 Sprint 2 Development** (CO2, CO3) · **11 Software Testing** (CO3) · **12 Optimization & Sprint Review 2** (CO2, CO3, CO4) · **13 Deployment & Documentation** (CO3, CO4) · **14 Final Evaluation** (CO4). When the instructor adds a deck, they change `status` to `"published"` and fill `deck`.
- **Milestone badges** from `milestones` appear on the matching roadmap cards (even on published weeks: a "Proposal presentation" badge on Week 4, "Sprint Review 1" on Week 9, and so on).
- Counts (weeks, notes, simulations, glossary terms, snippets) are **computed from the data**, never hard-coded.
- **Write quizzes, flashcards and notes from the slide content only.** Do not invent facts beyond the slides and standard Flutter/Dart/Git knowledge.
- Every simulation reads its numbers from `data/labs.js`, and `tests/labs-fixtures.test.js` recomputes them (§8, §12).

---

## 7. Site Map, Pages and Content

### 7.1 Slide maps (physical PDF page → what it covers)

Use these for the viewer's page titles, deep links (`#/week/4?page=6`), global search and the Notes Library "Source slide" chips.

**Week 1 · Flutter Installation & Introduction to Dart** (14)
1 Title · 2 Roadmap: why Flutter, toolchain, `flutter doctor`, first app, Dart basics, classes · 3 Why Flutter (single codebase, hot reload, own renderer; six targets) · 4 How Flutter works (four layers; JIT vs AOT; everything is a widget) · 5 Before you install (OS, 10 GB disk, 8 GB RAM, ~2 GB download) · 6 Installation in five steps (short-path rule) · 7 Flutter SDK and the PATH · 8 Android Studio and your device · 9 `flutter doctor` (three errors you will see) · 10 Your first app (`flutter create`, `flutter run`, project layout, hot reload vs hot restart) · 11 Meet Dart (JIT/AOT, null safety, `main()`) · 12 Variables, types and null safety · 13 Functions, collections and classes · 14 Lab task

**Week 2 · Flutter Basics: Widgets, Menus, Maps & APIs** (14)
1 Title · 2 Roadmap · 3 Everything is a widget (stateless vs stateful) · 4 Anatomy of `main.dart` · 5 Text and styling · 6 Buttons and taps · 7 Container and Card · 8 Column, Row, Stack and ListView · 9 A minimal course card · 10 Multi-menu navigation (Drawer, BottomNavigationBar, TabBar, Navigator) · 11 Adding a Google Map (`google_maps_flutter`, API key) · 12 Fetching data from an API (`http`, `async/await`, `fromJson`) · 13 `FutureBuilder` · 14 Lab task

**Week 3 · Flutter Widgets, Layouts and Colors** (28)
1 Title · 2 Overview · 3 What is Flutter · 4 Why developers choose Flutter · 5 How Flutter is built, layer by layer · 6 Dart essentials · 7 Set up and run your first project · 8 What is inside a Flutter project (table) · 9 Everything is a widget · 10 Your first app, piece by piece · 11 The same app as a widget tree · 12 Stateless versus stateful · 13 `setState()` redraws the screen · 14 Eight widgets you will use constantly (table) · 15 Row and Column · 16 Six layout helpers · 17 Container: margin, border, padding, child · 18 Four ways to create a colour · 19 Reading a hex colour `0xAARRGGBB` · 20 `ThemeData` and `ColorScheme.fromSeed` · 21 `TextStyle` · 22 Buttons, text input and gestures · 23 Navigator · 24 `ListView.builder` · 25 Practice project: profile card app · 26 Cheat sheet · 27 Where to go next · 28 Thank you

**Week 4 · REST APIs & HTTP** (8)
1 Title · 2 What is a REST API (client, server, resource, endpoint, JSON) · 3 HTTP methods and status codes · 4 Reading an endpoint (`/v1`, five URL parts) · 5 Query parameters and `Uri.https` · 6 How a Flutter app fetches data (five steps) · 7 From JSON to the screen (model + `FutureBuilder`) · 8 Lab task: Posts Reader

**Week 5 · Maps & Location Data** (7)
1 Title · 2 Latitude and longitude · 3 Zoom levels (tiles = 4^z) · 4 Weather from Open-Meteo · 5 City name → coordinates → weather · 6 `flutter_map` and markers · 7 Draw lines and data on the map (polyline, circle, lab task)

**Week 6 · Software Development Tools & Tricks** (11)
1 Title · 2 The six tools you use every day · 3 Set up VS Code for Flutter · 4 Find, search and replace · 5 Editing shortcuts · 6 Format code and autocomplete · 7 Flutter commands · 8 How Git works: four places · 9 Git in the terminal: clone, pull, push · 10 Branches, history and undo · 11 Lab task

### 7.2 Home (`#/`): match the CSE 2205 portal (§9)
- **Hero** (§9.2): eyebrow `CSE 3100 · Summer 2026 · Level-3, Term-I · 0.75 Credits`; two-line title **"Software Development"** + gradient **"Project II"**; a one-sentence definition with the key term bold; a smaller second paragraph; two buttons (**Explore Weekly Roadmap →** primary, **Open Widget Tree Builder** secondary); the instructor line `Instructor: Md. Rakib Trofder, Lecturer, Department of CSE, BAUST`.
  - Definition: *"**Software Development Project II** is a hands-on, team-based course where you plan, design, build, test and present a real mobile application using Flutter and Dart, REST APIs, maps and professional Git workflows."*
  - Second paragraph: *"Core concepts include Flutter widgets and layouts, Dart null safety, state with setState, navigation, REST and JSON, maps and live weather data, VS Code productivity, Git and GitHub, and agile project practices, all aimed at the app your team will demonstrate in the final week."*
- **Hero visual card** (right, §9.2): a Flutter **widget tree** mini-diagram.
- **"Explore the Study Portal"** 2 × 2 grid (§9.3): Weekly Roadmap · Notes Library · Visualizations · Glossary.
- **"Your project at a glance"** strip under the grid: four milestone chips (`Wk 4 Proposal` · `Wk 9 Sprint Review 1` · `Wk 12 Sprint Review 2` · `Wk 14 Final`) and the two heaviest assessment weights (`Final Project 35%`, `Progress Presentations 15%`), linking to the Project Hub.
- **Continue where you left off** card (last week and slide page, last simulation) from `localStorage`, shown only when there is history.
- **Footer**: course code, department, "Discipline · Knowledge · Morality", link to the Project Hub, "Reset my progress".

**Main navigation (top bar on desktop; bottom tab bar + "More" drawer on phones):** Home · Roadmap · Slides · Notes · Visualizations · Glossary · **MCQ** · (right side) Search `⌘K` · Bookmarks · Theme toggle. **Project Hub** and **Course Info** sit in the "More" menu (and in the footer and on the Home strip).

### 7.3 Weekly Roadmap (`#/weeks`)
- Vertical timeline on phones, winding path on desktop, **14 stops**. Cluster colours:
  - **Setup & Dart** (W1) indigo `--c-setup` · **Flutter UI** (W2, W3) violet `--c-ui` · **Networking** (W4) blue `--c-net` · **Maps & Location** (W5) teal `--c-maps` · **Tools** (W6) amber `--c-tools` · **Project** (W7–W13, upcoming) rose `--c-project` · **Final** (W14) slate `--c-final`.
- Each card: thumbnail, week number, title, CO chips, slides count, simulation count, ✓ "Done" toggle, and a **"For your project"** one-liner (W1 "A working toolchain", W2 "Menus, a map and an API call", W3 "Screens, colours and lists", W4 "Talk to your backend", W5 "Show data on a map", W6 "Git workflow for your team"). **Milestone badges** from §6 (Week 4 Proposal, Week 9 Sprint Review 1, Week 12 Sprint Review 2, Week 14 Final) are drawn as small flags on the matching stops. Upcoming weeks show a lock and "Coming soon" with the outline topics.
- Filters: cluster, CO, "Not done yet", "Has simulations", "Published only".
- Under the timeline, a **"Your app's journey" ribbon**: `Install → Dart → Widgets → Layout & colour → REST → Maps → Git → Sprints → Test → Deploy → Demo`, each published step clickable.

### 7.4 Notes Library (`#/notes`, `#/note/:week`)
- Header pill **"6 Notes"** (computed). One card per published week with thumbnail, title, reading time and "Slides PDF" / "Note" buttons.
- Each **note** is a clean article built from `data/notes.js` blocks: `heading`, `paragraph`, `list`, `callout` (Remember / Tip / Warning / Rule of thumb), `table`, `code` (a snippet with Copy and Open DartPad), `command` (terminal line), `figure` (inline SVG), `sim` (embeds a simulation), `source` (chip → slide page). Content follows **Appendix A** and keeps the slides' wording where the slides give definitions.
- Features: sticky table of contents, source-slide chips, **collapsed "Teacher's note"** blocks (speaker notes, §4.5), **Print / Save as PDF** with a clean print stylesheet, prev/next note, "Mark as read".

### 7.5 Slides (`#/slides`) and the viewer inside each week
- `#/slides` lists all six decks as thumbnail cards with PPTX / PDF buttons and "Open viewer".
- **Viewer** (PDF.js): large page, thumbnail strip, "page x / y", zoom, full-screen / presentation mode, keyboard ←/→, **Download PPTX · Download PDF · Open in new tab**, bookmark this page ⭐. Lazy-load only when scrolled into view with a skeleton; on phones start fit-to-width and allow swipe. The PDF page stays white in dark mode; only the frame changes.
- **Code tab** beside the viewer: every Dart, YAML, JSON and shell block from the deck (`data/snippets.js`), in slide order, with syntax highlighting, the slide number, a one-line "what this shows", **Copy** and **Open in DartPad** (§5). Never present a snippet as "run in the browser".
- Under the viewer, the §7.1 slide index and **"Open the simulation for this slide"** chips (Week 1 slide 9 → Flutter Doctor, Week 3 slide 19 → Colour Lab, Week 4 slide 4 → URL Anatomy, Week 5 slide 3 → Latitude, Longitude & Zoom, Week 6 slide 9 → Git Lab, and so on).
- Remember the last page per deck.

### 7.6 Week Detail (`#/week/:id`)
1. **Header**: "Week 4 · REST APIs & HTTP", CO chips, cluster strip, milestone badge if any, prev/next.
2. **Slide viewer + Code tab** (§7.5).
3. **What you'll learn**: topic chips, and **"For your project"** line.
4. **Note** preview with "Read the full note".
5. **Simulations** for this week, embedded inline (§8).
6. **Key takeaways**: 3–5 cards (Appendix A).
7. **Lab deliverables**: the deck's last slide verbatim as a **checklist** with ticks saved locally, the **Submission** line and the "Next Week" line, plus a **"Copy my checklist"** Markdown button. For Week 2 and Week 4, a pairs note ("work in pairs; both names in the report/README").
8. **Check yourself**: 5 MCQs with instant feedback and explanation (Appendix C); best score saved.
9. **Flashcards**: flip cards for key terms.
10. **Mark week as done**.
- **Week 2 and Week 3 cross-links**: each shows "Revisit in Week 3 / Week 2" chips for overlapping topics (§3.3).

### 7.7 Visualizations (`#/labs`, `#/lab/:id`)
Gallery of the 20 simulations (§8) with an animated preview, a "Week N" chip and a cluster colour. Filters: week, cluster. Each simulation has its own route and an "Open slide N" link.

### 7.8 Glossary (`#/glossary`)
Searchable A–Z list (Appendix B) with cluster filter chips, the term, definition, a "Where you'll see it" example, source-slide chip and "Related terms". Deep link `#/glossary?term=setstate`.

### 7.9 Course Info (`#/about`)
Facts (§2), assessment **donut chart**, COs with Bloom's levels and delivery/assessment mapping, instructors (no phone), the **14-week official outline** table with the delivery-plan note, references as citations/links, and "How to use this site" tips. Links to the CSE 2205, 2206 and 3102 sites when the URLs are set (§15).

### 7.10 Search (`⌘K` / `Ctrl+K`) and Bookmarks
- **Command palette** searching week titles, topics, slide titles (§7.1), glossary terms, note headings, simulation names, **code identifiers and commands** (`setState`, `FutureBuilder`, `Uri.https`, `ListView.builder`, `flutter doctor`, `git switch -c`, `Ctrl+Shift+F`, `LatLng`, `jsonDecode`) and HTTP codes (`404`, `401`). Results grouped by type; Enter opens.
- **Bookmarks drawer** (bookmark icon): starred slide pages, snippets, notes, terms and simulations, stored locally.

### 7.11 MCQ Practice (`#/mcq`): 100 questions

A separate page in the top bar (**MCQ**), same card style as the rest of the portal. Data: `data/mcq.js` (Appendix D; same file as `CSE_3100_MCQ_Bank.js`).

- **Header:** mono eyebrow `PRACTICE`, H1 "MCQ Practice", subtitle "100 questions on Flutter, Dart, REST APIs, maps, developer tools, Git and project practices", and a pill `100 Questions`.
- **Two answer modes** (a segmented switch at the top, remembered locally):
  1. **Show answers at the end:** the student answers freely, moves back and forth with the navigator grid, then presses **Submit**. Results show the score, a breakdown per section, and a review list marking every question ✓ / ✗ / skipped with the correct option and explanation.
  2. **Show answer after each question:** after the student taps an option the card marks it green (correct) or red (wrong), reveals the correct option, and shows a one-line explanation. A **"Show answer"** button also reveals it without answering.
- **Filters and setup:** by **section** (7 chips coloured by cluster), by week, "Unanswered only", **quiz length** (10 · 25 · 50 · all 100), and **ordered** or **shuffled question order**.
- **Never shuffle the options.** The correct answers are deliberately spread evenly across A, B, C and D (25 each, never more than two identical answers in a row). Runtime shuffling would break that balance, so options always stay in the stored order. When the question order is shuffled, show the on-screen number `1…n` and keep the bank ID `Q42` as a small mono chip so students can quote it.
- **Question card:** section chip, `Q42` chip, the question (code in `monospace`), four option buttons labelled **A B C D** (keys `A`–`D` or `1`–`4` select, `Enter` next, `←` previous), a bookmark star, and **"Report a problem"** (prefilled mailto/GitHub issue; no backend).
- **Navigator grid:** 100 numbered squares; states answered, flagged, current and (after submit) correct/wrong.
- **Progress and stats** (local): best score, attempts, weakest section, "Retry only the ones I got wrong".
- **Print / export:** a clean print view of the questions, an optional **answer key** page, and "Copy answer key" (Q1 → B …).
- **Mobile:** one question per screen, 48 px option buttons, a sticky bottom bar with Previous / Next / Submit, and swipe gestures.
- **Accessibility:** options are a `radiogroup`; correctness is never colour-only (✓/✗ icons plus "Correct"/"Incorrect"); explanations use `aria-live="polite"`.

### 7.12 Project Hub (`#/project`)
The course is a project course, so the site gives the project its own page (same card style):
- **Milestones timeline** from the outline: **Week 4 Project proposal presentation** · **Week 9 Sprint Review 1** · **Week 12 Sprint Review 2** · **Week 14 Final evaluation (demonstration, presentation, report, viva)**, each with the weight it feeds (Proposal 10%, Progress presentations 15%, Final project 35%, Report 15%, Final presentation 10%, Viva 10%) and the COs it assesses. A "days to next milestone" counter appears only when dates are set in `course.js`.
- **Assessment donut** (shared with Course Info).
- **Proposal Builder** (a rule-based writing aid, no AI, nothing leaves the browser): it follows the **Project Documentation Report** template.
  - **Cover fields:** Project Name · Student ID · Student Name · Level (3) · Term (1) · Section · Submission Date.
  - **Four guided sections**, each with the template's own guidance as helper text and a live word count: **1 Problem Statement** (the real-world problem, who is affected, why it matters, what gap exists; *focus on the problem, not the solution*) · **2 Objective** with **2.1 What we aim to solve** (bullet list of specific objectives) and **2.2 How we plan to solve it** (approach: technology stack, architecture, tools, Agile/Scrum sprints) · **3 Features of Your Idea** (a repeater: "Feature N: short description", at least 4 rows as in the template) · **4 Conclusion** (summary, how it solves the problem, expected impact, future scope).
  - **Gentle checks** (never blocking): a hint if the Problem Statement mentions solution words such as "app", "system", "build" or "develop" (*"This reads like a solution. Keep Section 1 about the problem."*); a hint if Objectives are not a list; a hint if fewer than 4 features; a hint if the Conclusion does not restate the problem.
  - **Export**: copy as Markdown, print to PDF, and **Download the official template (.docx)**. Drafts autosave locally and a "Clear draft" button exists.
- **Team and repository checklist** from the lab slides: public/private repository with both names in the README (Weeks 2 and 4) · `.gitignore` in place (`build/`, `.dart_tool/`, `.idea/`, `*.iml`, `.flutter-plugins-dependencies`) · **no API keys committed** (Week 2) · one branch per lab (`lab6/<your-roll>`) · `git config` name and email set · screenshots of every state (loading, error, data).
- **"Which week helps which part of my app?"** matrix: Navigation and menus → W2, W3; Lists and cards → W2, W3; REST data → W2, W4; Map screen → W2, W5; Colours and themes → W3; Git workflow → W6.

---

## 8. Smart Visualizations: The 20 Simulations

Every simulation: **step controls** (Back / Play / Next / Reset), a **speed slider**, a one-line **caption** for the current step, a "Try it yourself" mode, keyboard and **touch** support, and correct colours in both themes. Pause animation under `prefers-reduced-motion`. Every number comes from `data/labs.js` and is **recomputed** in `tests/labs-fixtures.test.js`. Because Flutter, Dart and live APIs cannot run in a static page, each simulation **models** the behaviour and labels mocked data as "illustration" (§5).

### Week 1 (Setup & Dart)
1. **`flutter-doctor`: Fix the Doctor Report.** A terminal showing the slide-9 report: `[✓] Flutter (Channel stable, 3.24.3)` · `[✓] Android toolchain — SDK 34.0.0` · `[✗] cmdline-tools component is missing` · `[!] Android licence status unknown` · `[✓] Android Studio (version 2024.1)` · `[✓] Connected device (1 available)` · `! Doctor found issues in 2 categories.` The student applies fixes (SDK Manager ▸ SDK Tools ▸ tick **Android SDK Command-line Tools** ▸ Apply; run `flutter doctor --android-licenses` and press `y`); each fix flips a line to ✓ and the last run ends with a clean report ("your ticket to the next section"). A second scenario shows `'flutter' is not recognized` → wrong PATH or stale terminal. Version numbers are labelled "example output".
2. **`install-checker`: Before You Install.** (a) Prerequisite checker: OS (Windows 10/11 64-bit with PowerShell 5.0 and Git for Windows · macOS 10.15+ with Rosetta 2 on Apple silicon · Ubuntu 20.04+ with curl, git, unzip, xz-utils), **10 GB** free disk, **8 GB** RAM recommended (4 GB works but the emulator crawls), **~2 GB** download. (b) The **five steps** in order (Get the SDK → Set the PATH → Android Studio → Device → Verify). (c) **SDK location picker**: `C:\src\flutter` ✓; `C:\Program Files\flutter` ✗; any path with spaces ✗, each with the slide's reason. (d) A PATH editor for Windows (`C:\src\flutter\bin`) and macOS/Linux (`export PATH="$PATH:$HOME/dev/flutter/bin"`) with the "reopen the terminal" step.
3. **`flutter-arch`: How Flutter Works.** Animated stack **Your Dart code → Flutter framework (Material, layout, animation) → Flutter engine (Skia/Impeller, Dart VM) → platform canvas (Android, iOS, browser)**; a toggle **Debug build (JIT VM → hot reload possible)** vs **Release build (AOT → native ARM code)**; the six targets (Android, iOS, Web, Windows, Linux, macOS); and Week 3's four-layer view (App: Dart · Framework: Dart · Engine: C++ · Embedder: platform code). Caption: "Flutter paints every pixel itself, which is why the UI looks identical everywhere."
4. **`dart-null-safety`: What Does This Print?** A set of Dart one-liners with a multiple-choice "what happens?" (rule-based, no execution): `var`/`final`/`const` (reassign, runtime vs compile time), `String? middleName; print(middleName ?? 'not given');` → `not given`, `?.`, `!`, `marks['Rakib']! > 85`, named parameters `greet('Sara', year: 2)`, arrow functions, `for (var c in courses)`. Each answer explains with the slide's operator table (`?` may be null · `??` fallback · `?.` call only if not null · `!` assert not null) and the course rule of thumb: **final by default, const for literals, var only when you reassign**.

### Week 2 (Flutter UI)
5. **`widget-tree`: Build the Widget Tree.** Start with `MaterialApp → Scaffold → AppBar(Text 'BAUST') + Center(Text 'Hello Flutter')`. The student adds, moves and removes widgets (Padding, Column, Card, SizedBox, ElevatedButton); the **tree diagram and the Dart code update together**, with parents drawn blue and leaves green (Week 3 slide 11) and the constructor parameter names (`home`, `appBar`, `body`, `title`, `child`) on the edges. A **Stateless / Stateful** classifier asks "which one for a logo? a counter? a form?"; a `const` toggle shows what a `const` widget skips on rebuild. Includes the **Minimal Course Card** (Card → Padding → Column → Text/SizedBox/ElevatedButton) as a guided build.
6. **`state-lab`: setState, Hot Reload and Hot Restart.** A counter app. **Case A:** press the button with `setState` → the number changes; four-step cycle animation (*change the data → call setState → Flutter marks the widget dirty → build() runs again*). **Case B ("forget setState")**: a debug panel shows `count` increasing while the screen stays at 0. Then **hot reload (`r`)** keeps the count, **hot restart (`R`)** resets it to 0, and a "edit `initState` / a global / native config" scenario shows why a restart (or full restart) is needed. Caption: "Reload keeps state, restart loses it."
7. **`navigation`: Four Ways to Move.** A phone mock with **Drawer**, **BottomNavigationBar**, **TabBar** (these switch the body inside one screen = state) and **Navigator.push / pop** (a new screen on top of a stack, back button, `Navigator.pop(context, 'saved')` result). The stack is drawn live. A quiz asks "state or route?" for ten scenarios. The slide's warning "most bugs come from confusing the two" appears as a callout.

### Week 3 (Layouts, colours, lists)
8. **`layout-lab`: Row, Column and Friends.** A canvas with three coloured boxes. Dropdowns for **`mainAxisAlignment`** (start, end, center, spaceBetween, spaceAround, spaceEvenly) and **`crossAxisAlignment`** (start, center, end, stretch) for **Row** (main axis horizontal) and **Column** (main axis vertical); toggles for **Expanded**, **SizedBox(height: 16)**, **Center**, **Padding**, and **Stack with Positioned**. Making the Column taller than the screen shows the **yellow-and-black overflow stripes** and offers the fixes (`ListView` or `SingleChildScrollView`). The generated Dart code updates live. "Predict the next layout" mode mirrors the slide's demo.
9. **`container-box`: Margin, Border, Padding, Child.** The box model diagram with sliders for `margin`, `padding`, `width`, `height`, border and `borderRadius`; a **"use both `color` and `decoration`"** switch that raises the assertion error and shows the fix (colour inside `BoxDecoration`); a **Card** mode proving Card has no padding of its own (add a `Padding` child). Also "never nest a Container just for padding, use Padding".
10. **`color-lab`: Four Ways to Make a Colour.** Live swatch with the four constructors: named (`Colors.blue`), shade (`Colors.blue.shade700`, strip of 50–900), hex (`Color(0xFF2196F3)`), `Color.fromARGB(255, 33, 150, 243)`. A **hex decoder** splits `0x FF 21 96 F3` into **Alpha 255 · Red 33 · Green 150 · Blue 243** (hex → decimal), an **alpha slider** (`Colors.blue.withValues(alpha: 0.5)`; older tutorials use `withOpacity`), a **bug mode** (`Color(0x2196F3)` → alpha `00` → invisible), a **design-tool converter** (`#2196F3` → `Color(0xFF2196F3)`), and a **ThemeData seed picker** (`ColorScheme.fromSeed(seedColor: Colors.teal)` → an illustrative primary / secondary / surface / error palette with on-colours; Material 3 default since Flutter 3.16).
11. **`listview`: ListView.builder Is Lazy.** A list of 1,000 items: toggle **`ListView(children: …)`** (all built) vs **`ListView.builder`** (only visible rows built, counter shows built widgets), `itemCount` and `index` (0 … itemCount − 1), **`GridView.count`**, and the **"ListView inside a Column without Expanded"** unbounded-height error with its fix.

### Week 4 (REST and HTTP)
12. **`url-anatomy`: Read the Endpoint.** Colour-coded parser for `https://api.open-meteo.com/v1/forecast?latitude=23.81&longitude=90.41` → **1 Scheme** `https://` · **2 Host** `api.open-meteo.com` · **3 Version** `/v1` · **4 Resource path** `/forecast` · **5 Query string** `?key=value&key=value`. A `/v1` ↔ `/v2` switch shows why versioned apps keep working. **Path vs query parameter** (`/posts/7` identifies one item; `/posts?userId=1` filters a list). A **`Uri.https` builder** with host, path and a map: `{'userId': '1', '_limit': '5'}` → `https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5`; typing "Cox Bazar" shows the space encoded; "values are strings, write `'1'` not `1`" hint.
13. **`http-lab`: Methods and Status Codes.** A mock server (labelled illustration). The student chooses a **method** (GET read · POST create · PUT/PATCH update · DELETE remove), a path (`/v1/posts`, `/v1/posts/7`), headers (`Content-Type: application/json`, an API key) and a body, then sees the response: **200 OK · 201 Created · 400 Bad Request · 401 Unauthorized · 404 Not Found · 500 Server Error**. Scenario cards trigger each code (wrong URL → 404, missing key → 401, malformed body → 400, server fault → 500). A banner groups them: **2xx success · 4xx your mistake · 5xx server's mistake**. The restaurant analogy animates (app = you, API = menu, HTTP = waiter, server = kitchen, JSON = dish).
14. **`future-states`: FutureBuilder in Three States.** A mock screen driven by a latency slider and an **error switch**: **waiting → `CircularProgressIndicator`**, **error → message + Retry button**, **data → `ListView.builder`**. A toggle **"create the Future in `build()`"** makes a request counter climb on every rebuild (the infinite refetch bug), versus **"create it once in `initState`"** (counter stays at 1). The five fetch steps from Week 4 slide 6 (add package → build Uri → `await http.get` → check `statusCode == 200` → `jsonDecode`) can be stepped through.
15. **`json-model`: JSON to Dart Model.** The JSON `{ "userId": 1, "id": 7, "title": "Hello REST" }` beside the `Post` class and `Post.fromJson(Map<String, dynamic> j)`; hovering a field highlights the JSON key, the constructor parameter and the `j['id']` lookup. Editing a key (typo) shows a **mapping error** (illustration). Also the Week 2 `Course.fromJson` (`code`, `title`) and a `List` decode (`data.map((j) => Course.fromJson(j)).toList()`).

### Week 5 (Maps and location)
16. **`latlng-zoom`: Latitude, Longitude and Zoom.** (a) A schematic world grid: equator (lat 0°), prime meridian (lng 0°), latitude −90 … +90 (south–north), longitude −180 … +180 (west–east); click to drop a point; a table of the slide's places: **Saidpur 25.78 / 88.90 · Rangpur 25.74 / 89.25 · Dhaka 23.81 / 90.41 · Cox's Bazar 21.43 / 92.01**; "Bangladesh ≈ (24, 90)". A **"swap them" button** shows `LatLng(longitude, latitude)` landing in the wrong place (or invalid) with the rule *order is always (latitude, longitude)*. (b) **Precision slider**: 2 decimals ≈ **1 km**, 4 ≈ **11 m**, 6 ≈ **10 cm**. (c) **Zoom slider 0–18** with labels **0 World · 3 Continent · 6 Country · 10 City · 14 Streets · 18 Buildings** and the tile count **4^z** (z = 0 → 1; z = 5 → 1,024; z = 10 → 1,048,576; z = 18 → 68,719,476,736 ≈ 68.7 billion), plus the `MapOptions(initialCenter: LatLng(25.78, 88.90), initialZoom: 13, minZoom: 3, maxZoom: 18)` snippet. No real tiles are loaded.
17. **`weather-chain`: City → Coordinates → Weather.** The student types or picks a city (Rangpur, Saidpur, Dhaka, Cox's Bazar). Step 1: **geocoding request** `https://geocoding-api.open-meteo.com/v1/search?name=Rangpur&count=1` → latitude/longitude (`json['results'][0]['latitude']`). Step 2: **forecast request** `https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&current=temperature_2m` → temperature (`json['current']['temperature_2m']`). Step 3: a **marker** with the temperature drawn on a stylised map. The Dart from slide 5 appears beside each step. All values are **mocked, labelled "illustration; real values vary"**, and a note says Open-Meteo snaps coordinates to the nearest model grid point.
18. **`map-layers`: Layers, Markers and Polylines.** A stack diagram **TileLayer (bottom) → PolylineLayer → CircleLayer → MarkerLayer (top)** with a visibility toggle per layer. The student adds markers (with a child widget such as `Icon(Icons.location_pin)` or `Text('26°C')`), draws the **Saidpur → Rangpur → Dhaka polyline** (strokeWidth 4, green), and adds a **CircleMarker** (radius 5000 m, `useRadiusInMeter: true`) that **scales with zoom** versus a pixel-radius circle that does not. A comparison panel contrasts **`google_maps_flutter`** (Week 2: Google Cloud API key in `AndroidManifest.xml`/`AppDelegate.swift`, `minSdk 21`, `GoogleMap`, `Marker(markerId:)`, native config needs a full restart) with **`flutter_map`** (Week 5: OpenStreetMap tiles, no key, runs on Chrome, add `RichAttributionWidget` in production). A warning callout: *do not commit your Maps API key; restrict it by package name*.

### Week 6 (Tools)
19. **`shortcuts`: VS Code and Flutter CLI Trainer.** (a) **Shortcut drill**: a prompt ("Global search", "Rename a symbol everywhere", "Open any file by name", "Duplicate the line", "Format the document"…) and the student presses the keys on their own keyboard (or taps from options on phones); a **Windows/Linux ↔ macOS** switch (Cmd for Ctrl, Option for Alt). Table from slides 4–6: `Ctrl+F` find · `Ctrl+H` replace · `Ctrl+Shift+F` global search · `Ctrl+Shift+H` replace across all files · `Ctrl+P` open file · `Ctrl+Shift+P` command palette · `Ctrl+G` go to line · `Alt+Click` another cursor · `Ctrl+D` next match · `Alt+↑/↓` move line · `Shift+Alt+↓` duplicate line · `Ctrl+/` comment · `F2` rename symbol · `F12` go to definition · ``Ctrl+` `` terminal · `Shift+Alt+F` format · `Ctrl+Space` hints · `Ctrl+.` quick fix; snippets `stless`/`stful` + Tab. (b) **Find-and-replace demo**: `Colors\.blue` → `Colors.green` across files, with the Aa / whole-word / regex toggles and the safety tip *"commit before a global replace"*. (c) **CLI matcher**: match goals to commands (`flutter doctor`, `flutter create my_app`, `flutter pub get`, `flutter pub add http`, `flutter devices`, `flutter run -d chrome`, `flutter clean`, `flutter analyze`, `flutter build apk`, `dart format .`) and the run keys `r` hot reload · `R` hot restart · `q` quit · `h` help, with the "stuck? `flutter clean` → `flutter pub get` → run again" recipe.
20. **`git-lab`: Four Places, Branches and Conflicts.** (a) **Four places**: working folder → `git add` → staging area → `git commit` → local repository → `git push` → remote (GitHub, `origin`), with `git pull` and `git clone` arrows; the student runs the session `git config` → `git clone` → `git pull` → `git status` → `git add .` → `git commit -m "Add login screen"` → `git push` and watches files move. (b) **Branching**: `git switch -c feature/map`, `git branch`, `git switch main`, `git merge feature/map`, `git log --oneline`, `git diff`, `git restore lib/main.dart`. (c) **Merge-conflict simulator**: two branches edit the same lines; the editor shows **Accept Current / Accept Incoming / Accept Both**; the student resolves, saves, then `git add` and `git commit`. (d) **`.gitignore` and secrets check**: a file list (`build/`, `.dart_tool/`, `.idea/`, `*.iml`, `.flutter-plugins-dependencies`, `lib/keys.dart`) where the student decides what to ignore; committing a file with a Maps API key is flagged. (e) **Commit-message checker**: "Fix crash on empty list" ✓ vs "update" ✗. Also a first-push failure hint (`user.email` missing or GitHub authentication not set up).

**Simulation placement:** W1 → 1–4 · W2 → 5–7 · W3 → 8–11 · W4 → 12–15 · W5 → 16–18 · W6 → 19–20. Simulations 5–7 are also surfaced on Week 3's page (Week 3 re-teaches widgets, `setState` and Navigator). Home shows **"20 Simulations"**.


---

## 9. UI Reference: Match the CSE 2205 Study Portal

The two reference screenshots (CSE 2205 · DBMS home page, top and scrolled) define the look. Reproduce this layout, swapping the content for CSE 3100. Where this section and §10 differ, §10 tokens win for exact values; this section wins for **layout**.

### 9.1 Top bar (sticky, white, 1 px bottom border, ~72 px tall)
- **Left:** a 40 px **indigo rounded-square logo** (white icon) + wordmark **`CSE 3100 · SDP II`** in bold 700 (the 2205 site shows `CSE 2205 · DBMS`). Logo icon: a **layout-grid / smartphone** glyph (Lucide `smartphone` or `layout-dashboard`) in white on `--primary`.
- **Centre:** links **Home · Roadmap · Slides · Notes · Visualizations · Glossary · MCQ** (the 2205 site has the first six; **MCQ** is the one addition. Below 1100 px it moves into a "More" menu). The active link is **indigo with a 2 px indigo underline** offset below the text.
- **Right:** a rounded **Search pill** (light grey-blue fill `--surface-2`, magnifier icon, "Search", and a small bordered `⌘K` key chip), then a **bookmark** icon button and a **moon / sun** theme button (36–40 px hit areas).
- Phones: logo + wordmark, search icon, theme icon; the links move to a **bottom tab bar** (Home · Roadmap · Notes · MCQ · More).

### 9.2 Hero (inside a large softly tinted rounded panel)
- The hero sits in a **32 px-radius container** with a very light **indigo-to-white diagonal gradient** and a 1 px border, centred in a 1280–1440 px page with ~48–110 px side padding.
- **Left column (~55%)**
  - Eyebrow line: course code in **JetBrains Mono, indigo, 600** (`CSE 3100`), then `·`-separated grey meta in the UI font: `Summer 2026 · Level-3, Term-I · 0.75 Credits`.
  - **H1** on two lines, ~64–76 px, weight 700–800, tight tracking (−0.02em), **dark navy** for line one (`Software Development`) and an **indigo → violet gradient** on line two (`Project II`).
  - Lead paragraph ~20 px, slate, with the key term **bold** (see §7.2); a second, smaller (~17 px) muted paragraph beneath.
  - Buttons: primary **filled indigo, 12 px radius, white text with an arrow** (`Explore Weekly Roadmap →`) and a secondary **white button with a 1 px border and an icon** (`Open Widget Tree Builder`).
  - A thin divider, then the **instructor line** with a small graduation-cap icon: `Instructor: **Md. Rakib Trofder**, Lecturer, Department of CSE, BAUST`.
- **Right column (~40%): the hero visual**, a **28 px-radius lavender panel** (`--primary-soft`) with a soft shadow, containing:
  1. A **white card** (16 px radius). Header row: left label `Flutter Widget` (muted), right label `Scaffold` in **indigo mono**. A slim **progress bar** (indigo fill ~75%). Below it, three **mono cells** on a pale grey strip: `AppBar` · `Text('Hello')` · `child:`.
  2. Centre caption in **indigo mono** with arrows: `↓ Everything is a widget · build() ↓` (the 2205 site shows `B+ Tree Indexing O(log n)`).
  3. A **widget-tree strip** at the bottom, mirroring the tree: one **filled indigo** box in the middle (`[ MaterialApp ]`, white mono text) above three **outlined green-bordered** boxes (`[ Scaffold ]`, `[ Column ]`, `[ Text ]`) with green mono text on white. A small "hot reload" pulse can run on a 6 s loop (respect `prefers-reduced-motion`).
- Phones: the hero visual moves **below** the text and shrinks; the H1 drops to ~40 px.

### 9.3 "Explore the Study Portal" (below the hero)
- **H2** `Explore the Study Portal` (~40 px, 700) and a one-line muted subtitle `Everything you need for CSE 3100, in one place.`
- A **2 × 2 grid** (1 column on phones) of large white **cards**: 24 px radius, 1 px border, dual-layer shadow, ~44 px inner padding, hover lift 2 px with a stronger shadow.
- **Card anatomy:** top-left a **56 px rounded-square icon tile** in a solid colour with a white icon, next to a small **mono pill** (tinted background, coloured mono text); a **chevron** icon top-right; below, the **title** (~28 px, 700) and a two-line **muted description**. The whole card is a link.

| Card | Tile colour & icon | Pill (computed) | Title | Description |
|---|---|---|---|---|
| 1 | Indigo, `map` | `14 Weeks` | Weekly Roadmap | 14 weekly modules taking you from Flutter installation to your final project demonstration. |
| 2 | Violet, `file-text` | `6 Notes` | Notes Library | Slide-based study notes for every published week, with source-slide links, printable and downloadable as PDF. |
| 3 | Green, `flask-conical` | `20 Simulations` | Visualizations | 20 interactive simulators: widget tree, setState lab, layout lab, colour lab, URL anatomy, map zoom, Git lab and more. |
| 4 | Teal, `book-open` | `All Terms` | Glossary | Searchable reference of key Flutter, Dart, REST, maps and Git terms with definitions and examples. |

(Tile colours: indigo `#4338CA`, violet `#7C3AED`, green `#2F9E6B`, teal `#2B9A85`. The pill takes a 12% tint of its tile colour behind the mono label.)
- A thin **footer** with a top border sits below with generous bottom padding.

### 9.4 Floating action button (bottom-right, as in the screenshot)
A 56 px **white circular FAB** with a soft shadow and a dark icon (a "quick tools" glyph). It opens a small popover: **Jump to week · Bookmarks · Toggle theme · Back to top**. It must not overlap the bottom tab bar on phones (sit 16 px above it) and must be hidden when printing.

### 9.5 Inner pages
Reuse the same page background, container width, card style, mono pills and headings. Each inner page starts with a **mono eyebrow** (`WEEK 5 · MAPS & LOCATION`), an H1, a muted subtitle, then content. The Roadmap, Notes, Visualizations and Glossary pages use the **same four tile colours and icons** as their Home cards so the portal feels like one family.

---

## 10. Visual Design System

### 10.1 Overall feel
- A modern, minimal **SaaS aesthetic on Tailwind CSS**: clean, calm, generous white space; code, identifiers and numbers are first-class citizens (mono).
- **Radius:** 16 px cards and panels, 24 px large portal cards, 28–32 px hero containers, 10–12 px buttons, chips and inputs.
- **Depth:** a **dual-layer shadow** (1 px contact + soft 24 px ambient), 2 px hover lift.
- **Scrollbar:** thin (8 px), rounded thumb in `--scrollbar-thumb`, darker on hover, transparent track; Firefox + WebKit rules in both themes.
- **Colour used meaningfully:** indigo is the brand; each course **cluster** has a colour (§7.3) used on roadmap stops, cards, chips and simulation headers; status colours (green / amber / red) carry meaning in HTTP status codes, git states and pass/fail.

### 10.2 Theme tokens
```css
:root {
  --bg:#F8FAFC; --surface:#FFFFFF; --surface-2:#F1F5F9;
  --text:#0F172A; --text-muted:#475569; --border:#E2E8F0;
  --primary:#4F46E5; --primary-soft:#EEF2FF; --accent:#0EA5E9;
  --success:#16A34A; --warning:#D97706; --danger:#DC2626;
  /* clusters */
  --c-setup:#6366F1; --c-ui:#8B5CF6; --c-net:#3B82F6; --c-maps:#14B8A6;
  --c-tools:#F59E0B; --c-project:#F43F5E; --c-final:#64748B;
  /* portal tiles (§9.3) */
  --tile-indigo:#4338CA; --tile-violet:#7C3AED; --tile-green:#2F9E6B; --tile-teal:#2B9A85;
  /* state colours */
  --state-ok:#DCFCE7; --state-warn:#FEF3C7; --state-bad:#FEE2E2;
  --scrollbar-thumb:#CBD5E1; --scrollbar-thumb-hover:#94A3B8;
  --shadow:0 1px 2px rgba(15,23,42,.06), 0 8px 24px rgba(15,23,42,.06);
  --radius:16px;
}
:root[data-theme="dark"] {
  --bg:#0B1120; --surface:#111827; --surface-2:#1F2937;
  --text:#E5E7EB; --text-muted:#9CA3AF; --border:#273244;
  --primary:#818CF8; --primary-soft:#1E1B4B;
  --state-ok:#14532D; --state-warn:#713F12; --state-bad:#7F1D1D;
  --scrollbar-thumb:#334155; --scrollbar-thumb-hover:#475569;
  --shadow:0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.35);
}
```
Cluster colours, `--accent` and status colours stay the same in dark mode. As **backgrounds behind text** use a 10–15% tint (`color-mix(in srgb, var(--c-net) 12%, transparent)`) with the full colour as text/border. Check every pair for **WCAG AA** in both themes. Copy the slim-scrollbar rules from the 2206 site.

### 10.3 Theme toggle rules
- **Light mode is the default**, even if the OS is dark. The moon/sun button saves the choice (`cse3100-theme`) to `localStorage`.
- Apply the theme **before first paint** (tiny inline script in `<head>`); crossfade 200 ms.
- Simulations, diagrams, charts and the PDF frame follow the theme; PDF pages stay white.

### 10.4 Typography
*Plus Jakarta Sans* for UI (headings 700 with −0.02em tracking, body 16–17 px / line-height 1.65, labels and buttons 600; Bangla fallback *Hind Siliguri*). *JetBrains Mono* for course codes, Dart identifiers, shell commands, URLs, hex colours, pills, chips, code and numeric read-outs, 13–15 px. Use the real symbols `→  ≈  ≤  ≥  ×  ⌘  ⌥  ⇧  ✓  ✗` in text and key hints.

### 10.5 Components
Top bar · mobile bottom tab bar · hero · hero visual card · **portal card** (tile + pill + chevron) · week card · cluster strip · CO chips · milestone flag · **widget-tree node** (parent blue, leaf green) · **phone mock frame** · **terminal block** (dark in both themes, with Copy) · **code block** (Prism, Copy, Open DartPad) · **HTTP status badge** (2xx green, 4xx amber, 5xx red) · **shortcut keycap** · git "four places" diagram kit · quiz card + navigator · flashcard · checklist · note blocks (callouts: Remember, Tip, Warning, Rule of thumb) · bookmark drawer · command palette · FAB popover · PDF viewer · Proposal Builder form.

### 10.6 Motion
Small and purposeful: 2 px card hover lift, 150–250 ms page fade/slide, simulation steps 400–600 ms (speed slider). Disable non-essential motion under `prefers-reduced-motion`.

---

## 11. Student-Friendly Features

- **Global search (⌘/Ctrl + K)** over weeks, slides, notes, glossary, simulations, code identifiers and commands (§7.10).
- **Progress**: weeks done, quiz best scores, deliverable checklists, simulations completed, last page per deck; everything local, with a **"Reset my progress"** link in the footer.
- **Bookmarks**: star slide pages, snippets, notes, terms and simulations.
- **Resume reading**: reopening a deck or note jumps to the last position.
- **Deep links**: `#/week/5?page=6`, `#/note/4#uri-https`, `#/lab/url-anatomy`, `#/glossary?term=setstate`, `#/mcq`.
- **Print-friendly** notes, glossary and week pages (hide navigation, expand collapsibles).
- **Lab helpers**: each week's deliverable checklist exports to Markdown; the **Proposal Builder** exports Markdown or PDF; the **widget-tree builder** exports a Dart snippet to copy. These are *study aids*, clearly labelled; students still write their own code and report.
- **Snippet library**: every code block in the decks with Copy and Open DartPad.
- **Offline-friendly** (nice-to-have service worker).

---

## 12. Accessibility, Performance and Quality

- WCAG 2.1 AA in both themes; visible focus rings; full keyboard navigation (every simulation has a **keyboard path**: arrow keys move between widgets/steps, Space/Enter select, Esc cancels); ARIA labels on icon buttons; real `<table>` markup with `<th scope>`; every simulation and diagram has a **text caption** of the current step and an `aria-live` region for results.
- Breakpoints: 360, 768, 1024, 1440 px. **No horizontal page scroll on phones**; wide tables and code blocks scroll inside their own container.
- Lazy-load PDFs (only when a week is opened), D3 and each simulation (only when scrolled into view). First load must not download any PDF.
- Lighthouse (mobile) targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95.
- Favicon, per-route `<title>`, Open Graph tags.
- **Automated test** `tests/labs-fixtures.test.js` (Node) recomputes and asserts, at minimum:
  - **Map tiles:** `4^z` → z = 0 → 1; z = 5 → 1,024; z = 10 → 1,048,576; z = 18 → 68,719,476,736.
  - **Hex colour decode:** `0xFF2196F3` → A 255, R 33, G 150, B 243; `0x2196F3` → alpha `00` (invisible); `#2196F3` → `Color(0xFF2196F3)`; `Color.fromARGB(255, 33, 150, 243)` equals `Color(0xFF2196F3)`.
  - **URL parse:** the Open-Meteo URL splits into scheme `https`, host `api.open-meteo.com`, version `/v1`, path `/forecast`, query `latitude=23.81&longitude=90.41`; `Uri.https` with `{'userId':'1','_limit':'5'}` produces `https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5`.
  - **HTTP status classes:** 200 and 201 → success; 400, 401, 404 → client error; 500 → server error.
  - **Coordinate table:** Saidpur 25.78/88.90, Rangpur 25.74/89.25, Dhaka 23.81/90.41, Cox's Bazar 21.43/92.01; precision 2 / 4 / 6 decimals ≈ 1 km / 11 m / 10 cm.
  - **Layout lab:** the generated Dart for each `mainAxisAlignment` option matches a stored fixture.
  - **Git lab:** the four-place state machine reaches "pushed" only after `add` → `commit` → `push` in order.
  - **`tests/mcq-distribution.test.js`**: `mcq.js` has exactly **100** questions, each with **4 options** and a valid answer letter; the answers split **25 / 25 / 25 / 25** (a tolerance of ±2 is acceptable if the instructor adds questions); **no letter appears more than 2 times in a row** in bank order; no question has duplicate options.
  - All six slide decks present, slide counts **14, 14, 28, 8, 7, 11 = 82**, and **no forbidden file** (§3.4) under `site/`.

---

## 13. Build Order

1. Run `scripts/prepare-assets.sh` (convert, rename, thumbnail, extract notes, record sizes). Confirm no §3.4 file was copied.
2. Write `data/course.js`, `data/notes.js`, `data/snippets.js`, `data/glossary.js`, `data/quizzes.js`, `data/mcq.js`, `data/labs.js` from the decks and Appendices A–D.
3. Build the layout shell: top bar, bottom tab bar, theme system, router, footer, FAB (§9).
4. Build **Home** exactly as §9 (hero, hero visual, 2 × 2 portal cards). Compare against the screenshots at 1440 px and 360 px.
5. Build Roadmap, Slides (PDF viewer + code tab) and Week Detail.
6. Build the **priority simulations** first: #5 Widget tree, #6 setState lab, #8 Layout lab, #10 Colour lab, #12 URL anatomy, #16 Latitude/longitude/zoom, #20 Git lab; then the rest.
7. Build the Notes Library, Glossary, quizzes, flashcards, deliverable checklists.
8. Build the **MCQ Practice page** (§7.11) and the **Project Hub** (§7.12).
9. Build Search, Bookmarks, progress and Course Info.
10. Run both test files until they pass. Test at 360 px in both themes. Deploy to GitHub Pages.
11. Write `README.md`: how to add a week (one `course.js` entry + one deck), a glossary term, a quiz question, an MCQ (and how to keep the answers balanced), a simulation; how to rerun asset preparation and tests; how to deploy.

---

## 14. Acceptance Checklist

- [ ] All **6 decks** (82 slides) are attached, viewable in the browser, and downloadable as PPTX and PDF; Weeks 7–14 show as "Coming soon" with outline topics.
- [ ] The **home page matches the CSE 2205 layout**: top bar (logo + `CSE 3100 · SDP II`, Home/Roadmap/Slides/Notes/Visualizations/Glossary, search pill with ⌘K, bookmark, theme toggle), hero with eyebrow, two-line gradient title, definition, two buttons, instructor line, hero visual card, and the 2 × 2 "Explore the Study Portal" cards with computed pills (`14 Weeks`, `6 Notes`, `20 Simulations`, `All Terms`) and the bottom-right floating button.
- [ ] Light mode is default; dark mode toggles, persists, no flash; diagrams and simulations follow the theme.
- [ ] **Notes Library** has 6 notes with source-slide chips, collapsed teacher's notes, and a clean print layout.
- [ ] The **Code tab** lists every snippet with Copy and Open DartPad; nothing claims to run Flutter in the page.
- [ ] All **20 simulations** work with mouse, touch and keyboard, and reproduce the slide numbers listed in §8 (verified by the fixture test); mocked data is labelled "illustration".
- [ ] The colour lab decodes `0xFF2196F3` correctly and shows the invisible-colour bug for `0x2196F3`; the zoom simulation shows 68,719,476,736 tiles at zoom 18.
- [ ] The **Project Hub** shows the four milestones, the assessment donut, the Proposal Builder (four template sections, gentle checks, Markdown/PDF export) and the template download.
- [ ] **30 quiz questions** (5 per week) with explanations; **glossary** with all Appendix B terms; deliverable checklists for Weeks 1–6.
- [ ] The **MCQ Practice page** (`#/mcq`) shows all **100** questions with four options, supports **both answer modes** (reveal at the end, and after each question), section filters, a navigator grid, score and section breakdown, and never shuffles the options; the correct answers are evenly spread over A–D.
- [ ] Search finds identifiers such as `setState`, `FutureBuilder`, `Uri.https`, `LatLng`, commands such as `flutter doctor` and `git switch -c`, and HTTP codes such as `404`.
- [ ] No outline file, marks sheet, question set, solution or `.DS_Store` is published or committed; no phone number and no API key appears anywhere.
- [ ] Works at 360 px with no horizontal page scroll; Lighthouse targets met.
- [ ] All content comes from the `data/` files; adding a week takes one entry plus one deck.
- [ ] Deployed and reachable at a public URL.

---

## 15. Open Items for the Instructor (defaults are used if left blank)

| Item | Default |
|---|---|
| Semester label | **Summer 2026** |
| Instructor emails, rooms and phone numbers | Names and designations only |
| CO tags per week (slides do not state them) | CO2 + CO3 on every published week |
| Weeks 7–14 decks, dates and rules (team size, sprint dates, rubric, report format) | "Coming soon" cards with outline topics |
| Whether to publish the course outline | **No** (only topics and milestones are used) |
| Whether to publish the project proposal template | **Yes**, as `project-proposal-template.docx` (used by the Proposal Builder) |
| Milestone dates (Weeks 4, 9, 12, 14) | Week numbers only; no countdown |
| Links to the CSE 2205, 2206 and 3102 sites | Hidden until URLs are set |
| Whether to show speaker notes publicly | Collapsed "Teacher's note" in the Notes Library only |
| Site name / logo | `CSE 3100 · SDP II` with the indigo smartphone logo |
| BAUST branding (logo and colours) | Neutral indigo theme; swap `--primary` for BAUST colours if wanted |
| Hosting | GitHub Pages |

---

## Appendix A: Content Digest per Week (source for `notes.js`, takeaways and deliverables)

### Week 1 · Flutter Installation & Introduction to Dart
- **Why Flutter:** one Dart codebase for Android, iOS, Web, Windows, Linux and macOS; **hot reload** shows changes in about a second; Flutter draws every pixel with its **own renderer** (Skia / Impeller), so the UI looks the same everywhere. **Everything is a widget.**
- **How it works:** four layers: your Dart app → framework (Dart: Material, layout, animation) → engine (C++: renderer, Dart VM) → embedder (platform code). **Debug builds use JIT** (hot reload possible); **release builds use AOT** (native ARM code, fast start).
- **Before you install:** Windows 10/11 64-bit (PowerShell 5, Git for Windows) · macOS 10.15+ (Rosetta 2 on Apple silicon) · Ubuntu 20.04+ (curl, git, unzip, xz-utils); **10 GB** free disk, **8 GB RAM** recommended, **~2 GB** download.
- **Five steps:** get the SDK (unzip to a **short path without spaces**, e.g. `C:\src\flutter`, never `C:\Program Files`) → add `flutter/bin` to the **PATH** and reopen the terminal → install **Android Studio** (SDK, platform tools, command-line tools) → connect a **device or emulator** → verify with **`flutter doctor`**.
- **`flutter doctor` errors you will meet:** `cmdline-tools component is missing` (SDK Manager ▸ SDK Tools ▸ tick **Android SDK Command-line Tools**), **Android licence status unknown** (`flutter doctor --android-licenses`, press `y`), `'flutter' is not recognized` (wrong PATH or stale terminal). Goal: a report with no ✗ ("your ticket to the next section").
- **First app:** `flutter create hello_baust` → `cd hello_baust` → `flutter run`. Project layout: `lib/main.dart`, `pubspec.yaml`, `android/`, `ios/`, `test/`. **Hot reload (`r`)** keeps state; **hot restart (`R`)** resets it.
- **Dart basics:** `main()` is the entry point; **sound null safety** (`String?` may be null; `??` fallback; `?.` call only if not null; `!` assert not null); `var` / `final` / `const` (**final by default, const for literals, var only when you reassign**); functions (named parameters, arrow `=>`); collections (`List`, `Map`, `Set`; `for (var c in courses)`); classes with fields and constructors (`Student(this.name)`). A Flutter widget is just a class that extends `StatelessWidget`.
- **Lab (W1 deliverable):** (1) **Install & verify**: full setup and a `flutter doctor` report with no crosses; (2) **Run the counter app**: create `hello_baust`, run on an emulator or phone, change the app title using hot reload; (3) **Write Dart**: in `lib/main.dart` add a `Student` class with `name` and `id`, create two objects and print them. **Submission:** one PDF with the doctor report, a screenshot of the running app and the Dart output, named `CSE3100_W1_<your roll>.pdf`. **Next week:** widgets and layout.
- *Teacher's note:* students who cannot finish the install must come to the counselling hour. Encourage DartPad for the Dart exercises.

### Week 2 · Flutter Basics: Widgets, Menus, Maps & APIs
- **Widgets:** the building blocks; **StatelessWidget** (never changes after built) vs **StatefulWidget** (changes with data, uses `setState`). Anatomy of `main.dart`: `void main() => runApp(const MyApp());` → `MaterialApp` → `Scaffold` (`appBar`, `body`).
- **Building blocks:** `Text` + `TextStyle`; buttons `ElevatedButton(onPressed: …)`, `TextButton`, `IconButton`; `Container` (size, padding, margin, decoration) and `Card`; layout with `Column`, `Row`, `Stack`, `ListView`. **Minimal course card:** Card → Padding → Column → Text / SizedBox / ElevatedButton.
- **Menus and navigation:** `Drawer`, `BottomNavigationBar`, `TabBar` (switch content inside one screen) and **`Navigator.push` / `pop`** (a new screen on a stack). Most bugs come from confusing the two.
- **Google Map:** package `google_maps_flutter`; `GoogleMap(initialCameraPosition: …, markers: {Marker(markerId: …)})`; needs a **Google Cloud API key** in `AndroidManifest.xml` / `AppDelegate.swift`; `minSdk 21`; native config changes need a **full restart**. Never commit the key.
- **API data:** package `http`; `async` / `await`; `Course.fromJson(Map<String, dynamic> j)`; **`FutureBuilder`** with three states (waiting → spinner, error → message, data → `ListView.builder`); **create the Future once in `initState`**, because calling `fetch()` inside `build` refetches on every rebuild (the infinite request loop).
- **Lab (W2 deliverable, pairs, both names in the report):** one app with three tabs: (1) **Courses tab**: a `ListView` of `Card`s from a public API using `http` and `FutureBuilder`, with a loading spinner and an error message; (2) **Map tab**: a `GoogleMap` centred on your campus with at least one labelled marker; (3) **Menu & About**: a `Drawer` plus a bottom navigation bar, and an About screen opened with `Navigator.push`. **Submission:** a GitHub repository link plus screenshots of all three tabs. **Do not commit your Maps API key.** **Next week:** forms and user input, state management beyond `setState`, local persistence.
- *Teacher's note:* both students must be able to explain every file; bring the app running on a phone. Show the infinite request loop in the network tab.

### Week 3 · Flutter Widgets, Layouts and Colors
- **Recap and new ground:** what Flutter is, why developers choose it, four layers (App: Dart · Framework: Dart · Engine: C++ · Embedder: platform code), Dart essentials, creating and running a project, and what is inside a project (`lib/`, `pubspec.yaml`, `android/`, `ios/`, `web/`, `test/`).
- **Widget tree:** the same app read as code and as a tree (parents blue, leaves green). `MaterialApp → Scaffold → AppBar + Center → Text`.
- **State:** `StatelessWidget` vs `StatefulWidget`; **`setState()` redraws the screen**: change data → call `setState` → Flutter marks the widget dirty → `build()` runs again.
- **Eight constant widgets:** `Text`, `Icon`, `Image`, `Container`, `Padding`, `SizedBox`, `Card`, `ElevatedButton` (table on slide 14).
- **Layout:** `Row` (main axis horizontal) and `Column` (main axis vertical) with `mainAxisAlignment` (start, end, center, spaceBetween, spaceAround, spaceEvenly) and `crossAxisAlignment` (start, center, end, stretch); six helpers: `Expanded`, `SizedBox`, `Padding`, `Center`, `Align`, `Stack`/`Positioned`. **Container** = margin → border → padding → child; never use both `color` and `decoration`; use `Padding` rather than nesting a `Container`. Overflow shows yellow-and-black stripes: use `ListView` or `SingleChildScrollView`.
- **Colours:** four ways: named `Colors.blue`, shade `Colors.blue.shade700`, hex `Color(0xFF2196F3)`, `Color.fromARGB(255, 33, 150, 243)`. **Hex is `0xAARRGGBB`** (alpha first): `0xFF2196F3` = alpha 255, R 33, G 150, B 243; `0x2196F3` has alpha 00 and is invisible. Opacity: `Colors.blue.withValues(alpha: 0.5)`. Theme: `ThemeData(colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal))` (Material 3).
- **Text and input:** `TextStyle` (fontSize, fontWeight, color); `TextField`, buttons, `GestureDetector`/`InkWell`; `Navigator.push(context, MaterialPageRoute(builder: …))`, `Navigator.pop(context)`; **`ListView.builder`** builds only the visible rows (`itemCount`, `itemBuilder: (context, index)`).
- **Practice project (slide 25):** `flutter create profile_card` → `MaterialApp` + `Scaffold` + `AppBar` → centre a `Card` with `Padding` → `Column` with `CircleAvatar`, name `Text`, role `Text` → a `Row` of three `IconButton`s (call, email, share) → pick a `seedColor` and style text with `TextStyle`. **Stretch goal:** a Like button that counts taps with `setState`.
- **Cheat sheet (slide 26):** Widget · StatelessWidget · StatefulWidget + `setState()` · Row/Column · Container/Padding/SizedBox · `Colors.x` / `Color(0xAARRGGBB)` · ThemeData + ColorScheme · `Navigator.push/pop` · Hot reload (`r`).
- *Teacher's note:* give 30 to 45 minutes in the lab; early finishers do the stretch goal (needs a `StatefulWidget`).

### Week 4 · REST APIs & HTTP
- **REST API:** an app (client) asks a server for a **resource** at an **endpoint**, and the server answers in **JSON**. Analogy: you = app, menu = API, waiter = HTTP, kitchen = server, dish = JSON.
- **Methods:** GET read · POST create · PUT/PATCH update · DELETE remove. **Status codes:** 200 OK · 201 Created · 400 Bad Request · 401 Unauthorized · 404 Not Found · 500 Server Error. **2xx success, 4xx your mistake, 5xx the server's mistake.**
- **Reading an endpoint:** `https://api.open-meteo.com/v1/forecast?latitude=23.81&longitude=90.41` → scheme, host, version (`/v1`), resource path (`/forecast`), query string. `/posts/7` identifies one item; `/posts?userId=1` filters a list.
- **Query parameters in Dart:** `Uri.https('jsonplaceholder.typicode.com', '/posts', {'userId': '1'})`; values are strings; the package builds and encodes the URL.
- **Fetch in five steps:** add the `http` package → build the `Uri` → `await http.get(uri)` → check `response.statusCode == 200` → `jsonDecode(response.body)`.
- **JSON to screen:** a model class with `fromJson` (`Post.fromJson(Map<String, dynamic> j)`), then `FutureBuilder` with waiting / error / data. **Create the Future once in `initState`.**
- **Lab (W4 deliverable, pairs, both names in the README):** build a **"Posts Reader"** app on JSONPlaceholder: (1) **Posts list**: fetch `/posts` from `jsonplaceholder.typicode.com` and show every title in a `ListView` of `Card`s; (2) **Filter with a query**: a dropdown for `userId` 1–10; rebuild the `Uri` with `?userId=` and fetch again when it changes; (3) **Handle every state**: spinner while loading, error message with a **Retry** button, and the list when data arrives. **Submission:** GitHub repository link plus screenshots of the loading, error and data states. **Next week:** maps and location.
- *Teacher's note:* to test the error state, temporarily break the host name or switch off Wi-Fi.

### Week 5 · Maps & Location Data
- **Coordinates:** **latitude** −90 … +90 (south–north), **longitude** −180 … +180 (west–east); the **order is always (latitude, longitude)**. Places: Saidpur 25.78 / 88.90 · Rangpur 25.74 / 89.25 · Dhaka 23.81 / 90.41 · Cox's Bazar 21.43 / 92.01. Decimal places: 2 ≈ 1 km, 4 ≈ 11 m, 6 ≈ 10 cm.
- **Zoom levels:** 0 world · 3 continent · 6 country · 10 city · 14 streets · 18 buildings. Each zoom level has **4× the tiles** of the one before: `4^z` (zoom 18 ≈ 68.7 billion). `MapOptions(initialCenter: LatLng(25.78, 88.90), initialZoom: 13, minZoom: 3, maxZoom: 18)`.
- **Weather from Open-Meteo** (no API key): `https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&current=temperature_2m` → `json['current']['temperature_2m']`.
- **City name → coordinates → weather:** geocoding endpoint `https://geocoding-api.open-meteo.com/v1/search?name=Rangpur&count=1` → `json['results'][0]['latitude']` and `longitude`; then the forecast call.
- **`flutter_map`:** `FlutterMap` with a `TileLayer` (OpenStreetMap, `userAgentPackageName`), `MarkerLayer` with `Marker(point:, child:)` (a child can be an `Icon` or `Text('26°C')`); runs on Chrome (`flutter run -d chrome`).
- **Lines and shapes:** `PolylineLayer` (`Polyline(points:, strokeWidth: 4, color: Colors.green)`) joins points in order; `CircleLayer` with `CircleMarker(point:, radius: 5000, useRadiusInMeter: true)` scales with zoom. Layer order: tiles → polylines → circles → markers.
- **Lab (W5):** show **3 cities with markers that display live Open-Meteo temperature**, join them with a **Polyline**, and run it with **`flutter run -d chrome`**.
- *Teacher's note:* Polyline connects points in order (a route, a trip, a boundary); combine `fetchTemp()` with the markers.

### Week 6 · Software Development Tools & Tricks
- **Six everyday tools:** VS Code, the Flutter CLI, Git, GitHub, the browser (Chrome for `flutter run -d chrome`) and DartPad.
- **VS Code setup:** install the **Flutter** and **Error Lens** extensions; turn on **Auto Save** and **format on save**; pick a theme.
- **Search and replace:** `Ctrl+F` find, `Ctrl+H` replace, **`Ctrl+Shift+F` global search**, **`Ctrl+Shift+H` replace in all files**, `Ctrl+P` open file, `Ctrl+Shift+P` command palette, `Ctrl+G` go to line. Commit before a global replace.
- **Editing:** `Alt+Click` extra cursor, `Ctrl+D` select next match, `Alt+↑/↓` move line, `Shift+Alt+↓` duplicate line, `Ctrl+/` comment, `F2` rename symbol, `F12` go to definition.
- **Format and autocomplete:** `Shift+Alt+F` format; `Ctrl+Space` suggestions; `Ctrl+.` quick fix; snippets `stless` and `stful` + Tab.
- **Flutter commands:** `flutter doctor`, `flutter create`, `flutter pub get`, `flutter pub add`, `flutter devices`, `flutter run -d chrome`, `flutter clean`, `flutter analyze`, `flutter build apk`; run keys `r`, `R`, `q`, `h`.
- **How Git works: four places:** working folder → (`git add`) → staging area → (`git commit`) → local repository → (`git push`) → remote on GitHub; `git pull` brings changes back, `git clone` copies a repo.
- **Git in the terminal:** `git config --global user.name/user.email`, `git clone`, `git pull`, `git status`, `git add .`, `git commit -m "…"`, `git push`.
- **Branches, history, undo:** `git switch -c feature/x`, `git branch`, `git switch main`, `git merge`, `git log --oneline`, `git diff`, `git restore`. **Merge conflict?** VS Code shows **Accept Current / Incoming / Both**; pick one, save, then `git add` and `git commit`. **Never commit `build/` or API keys; `.gitignore` keeps them out** (`build/`, `.dart_tool/`, `.idea/`, `*.iml`, `.flutter-plugins-dependencies`).
- **Lab (W6 deliverable, individual):** (1) **Set up your editor**: Flutter and Error Lens extensions, Auto Save and format on save, a theme; (2) **Clone & branch**: clone the class repository, run `flutter pub get`, then `git switch -c lab6/<your-roll>`; (3) **Change, commit, push**: use global replace to change the app colour, test with `flutter run -d chrome`, then commit and push. **Submission:** link to your branch on GitHub plus a screenshot of the app running in Chrome. **Cheat sheet:** `Ctrl+Shift+P` · `Ctrl+Shift+F` · `Shift+Alt+F` · `git pull → add → commit → push`.
- *Teacher's note:* check `git config` is set; many first pushes fail because `user.email` is missing or GitHub authentication is not set up.

### Weeks 7–14 (upcoming; from the official outline, shown as "Coming soon")
Use only the topic names and milestone labels from the outline (no outline file is published): Week 7 onward project work and Agile sprints; **Week 9 Sprint Review 1**; **Week 12 Sprint Review 2**; **Week 14 Final evaluation** (demonstration, presentation, report, viva). Do not invent dates or rules.

---

## Appendix B: Glossary (`data/glossary.js`)

Format: **term**: definition · *example* · (week).

- **Flutter**: Google's UI toolkit that builds apps for mobile, web and desktop from one Dart codebase. · (1)
- **Dart**: the programming language used by Flutter; null-safe, compiled JIT in debug and AOT in release. · (1)
- **Widget**: the building block of a Flutter UI; everything on screen is a widget. · *`Text('Hello')`* · (1, 2, 3)
- **Widget tree**: the nested structure of widgets that describes a screen. · *`MaterialApp → Scaffold → Center → Text`* · (3)
- **SDK**: the software development kit; Flutter's SDK holds the framework, engine and tools. · *Unzipped to `C:\src\flutter`.* · (1)
- **PATH**: the list of folders the terminal searches for commands. · *Add `flutter/bin`.* · (1)
- **`flutter doctor`**: command that checks your installation and lists problems. · (1)
- **Android SDK / cmdline-tools**: Android build tools installed via Android Studio's SDK Manager. · (1)
- **Emulator**: a virtual phone running on your computer. · (1)
- **JIT / AOT**: just-in-time (debug, hot reload) and ahead-of-time (release, native code) compilation. · (1)
- **Hot reload (`r`)**: injects code changes into the running app and keeps state. · (1, 3)
- **Hot restart (`R`)**: restarts the app and resets state. · (1)
- **Null safety**: Dart's rule that a variable cannot be null unless its type ends with `?`. · *`String? middleName`* · (1)
- **`??` (if-null)**: gives a fallback when the left side is null. · *`name ?? 'Guest'`* · (1)
- **`?.` (null-aware call)**: calls a member only if the object is not null. · (1)
- **`!` (null assertion)**: tells Dart a value is not null; crashes if it is. · *`marks['Rakib']!`* · (1)
- **`var` / `final` / `const`**: reassignable variable / assigned once at run time / compile-time constant. · (1)
- **Named parameter**: a parameter passed by name, in braces. · *`greet('Sara', year: 2)`* · (1)
- **Class and constructor**: a blueprint for objects, with a constructor to create them. · *`Student(this.name)`* · (1)
- **`pubspec.yaml`**: file listing a project's name, dependencies and assets. · (1, 3)
- **Package / pub.dev**: reusable library from pub.dev, added with `flutter pub add`. · *`http`, `flutter_map`* · (2, 4, 5)
- **`MaterialApp`**: root widget that sets up theme, routes and Material design. · (2, 3)
- **`Scaffold`**: basic screen layout with `appBar`, `body`, drawer and more. · (2, 3)
- **`StatelessWidget`**: a widget whose UI never changes after it is built. · (2, 3)
- **`StatefulWidget`**: a widget that owns data that can change over time. · (2, 3)
- **`setState()`**: tells Flutter the data changed so `build()` runs again. · (3)
- **`build()`**: the method that returns the widget tree for a widget. · (2, 3)
- **`initState()`**: runs once when a stateful widget is created; the place to start a fetch. · (2, 4)
- **`Container`**: a box with size, padding, margin, colour and decoration. · (2, 3)
- **`Padding` / `SizedBox`**: inner spacing / fixed-size space. · (3)
- **`Row` / `Column`**: lay children out horizontally / vertically. · (2, 3)
- **Main axis / cross axis**: the direction of layout / the direction across it. · (3)
- **`Expanded`**: makes a child fill the remaining space in a Row or Column. · (3)
- **`Stack` / `Positioned`**: layer widgets on top of each other and place them. · (2, 3)
- **Overflow**: content that does not fit; shown as yellow-and-black stripes. · (3)
- **`ListView` / `ListView.builder`**: scrolling list; the builder creates only visible rows. · (2, 3)
- **`Card`**: a Material card with rounded corners and a shadow. · (2)
- **`Drawer`**: slide-in side menu. · (2)
- **`BottomNavigationBar` / `TabBar`**: switch content within a screen. · (2)
- **`Navigator.push` / `pop`**: open a new screen on a stack / go back. · (2, 3)
- **Route**: a screen managed by the Navigator. · (2, 3)
- **Colour (`Color(0xAARRGGBB)`)**: ARGB value; alpha comes first. · *`0xFF2196F3`* · (3)
- **Alpha**: opacity from 00 (invisible) to FF (solid). · *`withValues(alpha: 0.5)`* · (3)
- **`ThemeData` / `ColorScheme.fromSeed`**: app-wide colours and styles generated from a seed colour. · (3)
- **`TextStyle`**: font size, weight, colour and more for text. · (2, 3)
- **API**: a way for programs to talk to each other. · (4)
- **REST**: a style of web API where resources have URLs and HTTP methods act on them. · (4)
- **Endpoint**: the URL of a resource. · *`/v1/forecast`* · (4)
- **HTTP method**: GET, POST, PUT/PATCH, DELETE. · (4)
- **Status code**: three-digit server reply: 200, 201, 400, 401, 404, 500. · (4)
- **JSON**: lightweight text format of keys and values. · *`{"id": 7}`* · (2, 4)
- **`jsonDecode`**: turns a JSON string into Dart maps and lists. · (4)
- **Model class / `fromJson`**: a Dart class built from a JSON map. · *`Post.fromJson(j)`* · (2, 4)
- **Query parameter**: `?key=value` filter added to a URL. · *`?userId=1`* · (4)
- **`Uri.https`**: builds and encodes a URL from host, path and query map. · (4)
- **`Future` / `async` / `await`**: a value that arrives later / syntax to wait for it. · (2, 4)
- **`FutureBuilder`**: widget that rebuilds for waiting, error and data states. · (2, 4)
- **Latitude / longitude**: north–south and east–west position on Earth; always written (lat, lng). · (5)
- **Zoom level**: map scale from 0 (world) to 18 (buildings); tiles = 4^z. · (5)
- **Tile**: a small map image; a map is a grid of tiles. · (5)
- **`flutter_map`**: map package using OpenStreetMap tiles, no API key. · (5)
- **Marker / Polyline / CircleMarker**: a point / a line through points / a circle on the map. · (5)
- **Open-Meteo**: free weather and geocoding API with no key. · (5)
- **VS Code**: the code editor used in this course. · (6)
- **Command palette**: `Ctrl+Shift+P`, search every command. · (6)
- **Git**: version control system. · (6)
- **GitHub / remote / `origin`**: online host for repositories / the online copy / its default name. · (2, 4, 6)
- **Repository (repo)**: a project folder tracked by Git. · (6)
- **Staging area**: where `git add` puts changes before a commit. · (6)
- **Commit**: a saved snapshot with a message. · (6)
- **Branch**: a separate line of work. · *`lab6/<your-roll>`* · (6)
- **Merge / merge conflict**: combine branches / two edits to the same lines. · (6)
- **`.gitignore`**: list of files Git must not track. · *`build/`, API keys* · (6)
- **API key**: a secret code identifying your app to a service; never commit it. · (2)
- **Agile / sprint**: iterative development in short cycles with reviews. · (outline)

---

## Appendix C: Quiz Bank (`data/quizzes.js`): 5 MCQs per week, 30 total

Each question has four options, one correct answer (in bold) and a one-line explanation from the slides.

**Week 1**
1. Which build mode makes hot reload possible? A) AOT **B) JIT (debug)** C) Release D) Profile only *Debug builds run in the Dart VM with JIT.*
2. Where should the Flutter SDK be unzipped on Windows? A) `C:\Program Files\flutter` **B) `C:\src\flutter`** C) `C:\Users\My Name\flutter` D) Desktop *Use a short path without spaces.*
3. `flutter doctor` says "cmdline-tools component is missing". Fix? **A) Tick Android SDK Command-line Tools in SDK Manager** B) Reinstall Windows C) Delete `pubspec.yaml` D) Run `flutter clean` *Install it from SDK Manager ▸ SDK Tools.*
4. What does `String? name` mean? A) name is a constant B) name is private **C) name may be null** D) name is a list *The `?` allows null.*
5. Which keyword does the course prefer by default? A) var **B) final** C) dynamic D) late *Final by default, const for literals, var only when you reassign.*

**Week 2**
1. Which widget has changing data and calls `setState`? A) StatelessWidget **B) StatefulWidget** C) Container D) Scaffold *Stateful widgets own mutable state.*
2. Which switches content inside one screen? A) Navigator.push **B) BottomNavigationBar** C) MaterialPageRoute D) runApp *Bars, tabs and drawers change the body; push adds a new screen.*
3. Where should a FutureBuilder's Future be created? A) Inside build **B) Once in initState** C) Inside onPressed only D) In main() *Creating it in build refetches on every rebuild.*
4. What must you NOT commit to GitHub? A) `main.dart` B) `pubspec.yaml` **C) Your Maps API key** D) `README.md` *Keep secrets out of the repository.*
5. Which package provides `GoogleMap`? A) http **B) google_maps_flutter** C) flutter_map D) provider *Needs a Google Cloud API key.*

**Week 3**
1. In `Color(0xFF2196F3)`, what does `FF` mean? **A) Alpha (fully opaque)** B) Red C) Green D) Blue *Alpha comes first in 0xAARRGGBB.*
2. Why does `Color(0x2196F3)` look invisible? A) Wrong blue B) Needs `const` **C) Its alpha is 00** D) Flutter ignores it *Missing the leading FF makes it transparent.*
3. Which builds only the visible list rows? A) ListView(children:) **B) ListView.builder** C) Column D) Stack *The builder is lazy.*
4. What does `setState()` do? **A) Marks the widget dirty so build() runs again** B) Saves to disk C) Opens a screen D) Changes the theme *It triggers a rebuild.*
5. Which widget lays children out vertically? A) Row **B) Column** C) Stack D) Center *Column's main axis is vertical.*

**Week 4**
1. Which method reads data without changing it? **A) GET** B) POST C) DELETE D) PUT *GET only reads.*
2. A `404` response means… A) Success B) Server crashed **C) Resource not found** D) Created *4xx means your request was wrong.*
3. In `/v1/forecast?latitude=23.81`, what is `/v1`? A) Query B) Host **C) API version** D) Scheme *It versions the API so apps keep working.*
4. What do `Uri.https` query values need to be? A) Integers **B) Strings** C) Booleans D) Lists *Write `'1'`, not `1`.*
5. Which check comes before `jsonDecode` in the fetch recipe? A) Add the package **B) `response.statusCode == 200`** C) hot restart D) `flutter clean` *Only decode a successful response.*

**Week 5**
1. What is the correct order of a LatLng? A) (lng, lat) **B) (lat, lng)** C) (x, y) D) (zoom, lat) *Always latitude first.*
2. How many tiles does zoom level 3 have, by `4^z`? A) 12 B) 16 **C) 64** D) 81 *4³ = 64.*
3. Which API gives a city's coordinates? A) Forecast endpoint **B) Open-Meteo geocoding** C) `flutter_map` D) `jsonDecode` *The geocoding search returns latitude and longitude.*
4. Which layer draws a line through points in order? A) MarkerLayer **B) PolylineLayer** C) TileLayer D) CircleLayer *A Polyline connects points in sequence.*
5. What does `useRadiusInMeter: true` do? A) Hides the circle **B) Makes the circle scale with zoom** C) Colours it blue D) Adds a marker *The radius is in real metres.*

**Week 6**
1. Which shortcut searches all files? A) Ctrl+F B) Ctrl+P **C) Ctrl+Shift+F** D) Ctrl+G *Global search.*
2. Which command saves a snapshot locally? A) git push **B) git commit** C) git clone D) git pull *Commit writes to the local repository.*
3. Which file stops `build/` being tracked? A) pubspec.yaml B) README.md **C) .gitignore** D) main.dart *List ignored paths there.*
4. What creates and switches to a new branch? A) git branch -d B) git merge **C) git switch -c** D) git restore *`git switch -c lab6/<roll>`.*
5. Which merge-conflict option keeps both edits? A) Accept Current B) Accept Incoming **C) Accept Both** D) Discard *Then save, `git add`, `git commit`.*


---

## Appendix D: MCQ Practice Bank (`data/mcq.js`): 100 questions, answers balanced across A–D

Answer distribution (verified by `tests/mcq-distribution.test.js`): **A 25 · B 25 · C 25 · D 25**, never more than **2 identical answers in a row**, no repeating pattern. **Do not shuffle the options at runtime**; shuffling the *question order* is fine. The same data is in `CSE_3100_MCQ_Bank.js` / `.json` next to this file.

Sections: Flutter & Dart Setup (14) · Widgets & State (14) · Layout, Colors & Navigation (16) · REST APIs & HTTP (14) · Maps & Location (12) · Dev Tools & Git (16) · Project & Agile Practice (14).


### Flutter & Dart Setup

**Q1.** Which language does Flutter use?  
A) JavaScript  
B) Kotlin  
C) Dart  
D) Swift  
**Answer: C.** Flutter apps are written in Dart.

**Q2.** What does hot reload do?  
A) Injects code changes into the running app and keeps its state  
B) Uploads the app to GitHub  
C) Restarts the app and clears state  
D) Rebuilds the APK from scratch  
**Answer: A.** Hot reload keeps state; hot restart resets it.

**Q3.** Which command checks your Flutter installation?  
A) flutter verify  
B) flutter doctor  
C) flutter install  
D) flutter check  
**Answer: B.** flutter doctor lists missing tools and problems.

**Q4.** Which build mode uses ahead-of-time (AOT) compilation?  
A) Emulator only  
B) Debug  
C) Hot reload  
D) Release  
**Answer: D.** Release builds compile to native code with AOT.

**Q5.** Where should the Flutter SDK be placed on Windows?  
A) A short path without spaces, such as C:\src\flutter  
B) Inside the Downloads folder with spaces  
C) C:\Program Files\flutter  
D) Any path, it does not matter  
**Answer: A.** Spaces and protected folders cause problems.

**Q6.** What must be added to the PATH after unzipping the SDK?  
A) The flutter/bin folder  
B) The android folder  
C) The pubspec.yaml file  
D) The lib folder  
**Answer: A.** This lets the terminal find the flutter command.

**Q7.** Which Dart type allows a value to be null?  
A) String  
B) String?  
C) const String  
D) final String  
**Answer: B.** A trailing ? makes the type nullable.

**Q8.** What does `name ?? 'Guest'` return when name is null?  
A) 'Guest'  
B) An error  
C) An empty list  
D) null  
**Answer: A.** ?? gives a fallback when the left side is null.

**Q9.** Which keyword does the course recommend by default?  
A) late  
B) final  
C) dynamic  
D) var  
**Answer: B.** Final by default, const for literals, var only when reassigning.

**Q10.** What does `flutter create hello_baust` do?  
A) Creates a new Flutter project  
B) Cleans the build folder  
C) Installs Android Studio  
D) Runs the app  
**Answer: A.** It generates the project folders and starter code.

**Q11.** Which file lists a project's dependencies?  
A) AndroidManifest.xml  
B) pubspec.yaml  
C) README.md  
D) main.dart  
**Answer: B.** Packages and assets are declared in pubspec.yaml.

**Q12.** What is the entry point of a Dart program?  
A) start()  
B) run()  
C) main()  
D) init()  
**Answer: C.** Execution begins in main().

**Q13.** The doctor says the Android licence status is unknown. What fixes it?  
A) flutter pub get  
B) flutter devices  
C) flutter doctor --android-licenses  
D) flutter clean  
**Answer: C.** Accept the licences by pressing y.

**Q14.** Which Dart operator asserts a value is not null?  
A) ??  
B) ?  
C) ?.  
D) !  
**Answer: D.** ! tells Dart the value is not null and crashes if it is.


### Widgets & State

**Q15.** What is a widget in Flutter?  
A) A building block of the user interface  
B) A database table  
C) A Git branch  
D) A network request  
**Answer: A.** Everything on screen is a widget.

**Q16.** Which widget never changes after it is built?  
A) FutureBuilder  
B) AnimatedWidget  
C) StatefulWidget  
D) StatelessWidget  
**Answer: D.** Stateless widgets hold no changing data.

**Q17.** What does setState() do?  
A) Saves data to disk  
B) Marks the widget dirty so build() runs again  
C) Opens a new screen  
D) Closes the app  
**Answer: B.** It triggers a rebuild with the new data.

**Q18.** What happens if you change a variable without calling setState()?  
A) The data changes but the screen does not update  
B) The screen updates anyway  
C) The app crashes immediately  
D) Flutter restarts the app  
**Answer: A.** Flutter only redraws when told.

**Q19.** Which method returns the widget tree of a widget?  
A) build()  
B) draw()  
C) render()  
D) init()  
**Answer: A.** build() describes the UI.

**Q20.** Where should you start a one-time data fetch in a stateful widget?  
A) setState()  
B) build()  
C) initState()  
D) dispose()  
**Answer: C.** initState runs once when the widget is created.

**Q21.** Which widget provides the basic screen structure with appBar and body?  
A) Scaffold  
B) Padding  
C) Container  
D) Stack  
**Answer: A.** Scaffold is the standard Material screen layout.

**Q22.** Which widget is the root of a Material app?  
A) MaterialApp  
B) Card  
C) Scaffold  
D) ListView  
**Answer: A.** It sets up theme, routes and the home screen.

**Q23.** What does hot restart (R) do to the app state?  
A) Uploads it  
B) Resets it  
C) Keeps it  
D) Encrypts it  
**Answer: B.** A restart starts the app again from main().

**Q24.** Which widget shows a tappable raised button?  
A) Text  
B) Drawer  
C) Card  
D) ElevatedButton  
**Answer: D.** ElevatedButton takes an onPressed callback.

**Q25.** Which keyword makes a widget constructor cheaper on rebuild?  
A) static  
B) dynamic  
C) late  
D) const  
**Answer: D.** A const widget is reused instead of rebuilt.

**Q26.** In the profile card practice, which widget shows the circular photo?  
A) Card  
B) Chip  
C) CircleAvatar  
D) Icon  
**Answer: C.** CircleAvatar draws a round picture or initials.

**Q27.** Which widget holds a Text with rounded corners and a shadow around a child?  
A) SizedBox  
B) Expanded  
C) Card  
D) Align  
**Answer: C.** Card adds elevation and rounded corners.

**Q28.** The stretch goal for the profile card needs which kind of widget?  
A) InheritedWidget only  
B) None, it uses a global  
C) StatelessWidget  
D) StatefulWidget  
**Answer: D.** A Like counter needs state and setState.


### Layout, Colors & Navigation

**Q29.** Which widget lays children out horizontally?  
A) Stack  
B) Row  
C) Column  
D) ListView only  
**Answer: B.** Row's main axis is horizontal.

**Q30.** Which widget lays children out vertically?  
A) TabBar  
B) Positioned  
C) Column  
D) Row  
**Answer: C.** Column's main axis is vertical.

**Q31.** Which property spaces children evenly with equal gaps including both ends?  
A) MainAxisAlignment.start  
B) CrossAxisAlignment.stretch  
C) MainAxisSize.min  
D) MainAxisAlignment.spaceEvenly  
**Answer: D.** spaceEvenly puts equal space everywhere.

**Q32.** What do yellow-and-black stripes on screen mean?  
A) A layout overflow  
B) A network error  
C) A Git conflict  
D) A missing API key  
**Answer: A.** Content is bigger than the space available.

**Q33.** Which widget fixes an overflowing Column of many items?  
A) Opacity  
B) Padding  
C) Align  
D) ListView or SingleChildScrollView  
**Answer: D.** Make the content scrollable.

**Q34.** In Color(0xFF2196F3), what does FF mean?  
A) Blue is 255  
B) Green is 255  
C) Fully opaque alpha  
D) Red is 255  
**Answer: C.** Hex colours are 0xAARRGGBB, alpha first.

**Q35.** Why is Color(0x2196F3) invisible?  
A) The red channel is zero  
B) Its alpha is 00  
C) It needs const  
D) Blue is not supported  
**Answer: B.** Without FF the alpha is 00.

**Q36.** How do you make Colors.blue half transparent?  
A) Colors.blue.withValues(alpha: 0.5)  
B) Colors.blue.alpha()  
C) Colors.blue.shade50  
D) Colors.blue.half  
**Answer: A.** withValues(alpha:) sets opacity.

**Q37.** Which call builds an app-wide colour scheme from one colour?  
A) ColorScheme.fromSeed  
B) TextStyle.merge  
C) Color.fromARGB  
D) Colors.shade  
**Answer: A.** fromSeed generates a Material 3 palette.

**Q38.** Why must you not use both color and decoration on a Container?  
A) Decoration is deprecated  
B) It is slower only  
C) Color is deprecated  
D) They conflict and cause an error  
**Answer: D.** Put the colour inside BoxDecoration.

**Q39.** Which widget is better than a Container just for spacing?  
A) Opacity  
B) Padding  
C) Align  
D) Divider  
**Answer: B.** Padding is the lighter widget for spacing.

**Q40.** Which constructor builds the list rows lazily?  
A) ListView(children:)  
B) Wrap  
C) ListView.builder  
D) Column  
**Answer: C.** Only the visible items are built.

**Q41.** Which widget opens a new screen on top of the stack?  
A) BottomNavigationBar  
B) TabBar  
C) Drawer  
D) Navigator.push  
**Answer: D.** push adds a route; pop goes back.

**Q42.** Which of these changes content inside one screen rather than adding a route?  
A) Navigator.push  
B) MaterialPageRoute  
C) Navigator.pop  
D) BottomNavigationBar  
**Answer: D.** Bars and tabs swap the body.

**Q43.** Which widget layers children on top of each other?  
A) Column  
B) Stack  
C) ListTile  
D) Row  
**Answer: B.** Stack with Positioned places widgets freely.

**Q44.** What does Expanded do inside a Row?  
A) Hides the child  
B) Centres the Row  
C) Makes the child fill the remaining space  
D) Adds a border  
**Answer: C.** Expanded takes the free space.


### REST APIs & HTTP

**Q45.** What does REST stand for in everyday use?  
A) A style of web API using URLs and HTTP methods  
B) A Flutter widget  
C) A Dart state manager  
D) A database engine  
**Answer: A.** Resources have URLs; methods act on them.

**Q46.** Which HTTP method reads data?  
A) GET  
B) PUT  
C) DELETE  
D) POST  
**Answer: A.** GET does not change data.

**Q47.** Which HTTP method creates a new resource?  
A) GET  
B) POST  
C) HEAD  
D) TRACE  
**Answer: B.** POST sends data to create something.

**Q48.** What does status code 404 mean?  
A) Success  
B) Not found  
C) Created  
D) Server error  
**Answer: B.** The resource or URL does not exist.

**Q49.** Which status class means the server failed?  
A) 2xx  
B) 3xx  
C) 5xx  
D) 4xx  
**Answer: C.** 5xx codes are server errors.

**Q50.** Which status code means created?  
A) 500  
B) 201  
C) 400  
D) 200  
**Answer: B.** 201 follows a successful POST.

**Q51.** What is JSON?  
A) A Git command  
B) A lightweight text format of keys and values  
C) A compiled binary format  
D) A Flutter widget  
**Answer: B.** APIs commonly reply in JSON.

**Q52.** Which function turns a JSON string into Dart objects?  
A) toJson  
B) jsonPrint  
C) parseWidget  
D) jsonDecode  
**Answer: D.** jsonDecode returns maps and lists.

**Q53.** Which package does the course use for HTTP calls?  
A) path  
B) provider  
C) flutter_map  
D) http  
**Answer: D.** Add it with flutter pub add http.

**Q54.** What goes after ? in a URL?  
A) Query parameters  
B) The status code  
C) The host  
D) The scheme  
**Answer: A.** Example: ?userId=1.

**Q55.** What type do Uri.https query values need to be?  
A) bool  
B) List  
C) String  
D) int  
**Answer: C.** Write '1', not 1.

**Q56.** Which check should come before decoding the body?  
A) response.isBig  
B) response.reload  
C) response.hot  
D) response.statusCode == 200  
**Answer: D.** Only decode a successful response.

**Q57.** Why create the Future once in initState instead of build?  
A) Futures cannot be created in build at all  
B) build never runs  
C) initState is faster for UI  
D) build can run many times and would refetch each time  
**Answer: D.** Otherwise every rebuild sends a new request.

**Q58.** Which FutureBuilder state shows a spinner?  
A) Done only  
B) Data  
C) Waiting  
D) Error  
**Answer: C.** While the Future is pending, show a loader.


### Maps & Location

**Q59.** Which order is correct for LatLng?  
A) Longitude, then latitude  
B) Latitude, then longitude  
C) Altitude, then longitude  
D) Zoom, then latitude  
**Answer: B.** Always (lat, lng).

**Q60.** What range does latitude cover?  
A) 0 to 90 only  
B) 0 to 360  
C) -90 to +90  
D) -180 to +180  
**Answer: C.** Latitude is south to north.

**Q61.** What range does longitude cover?  
A) -90 to +90  
B) -180 to +180  
C) 0 to 100  
D) -45 to +45  
**Answer: B.** Longitude is west to east.

**Q62.** Roughly where is Dhaka's latitude and longitude?  
A) 90.41, 23.81  
B) 23.81, 90.41  
C) 0, 0  
D) 51.5, -0.12  
**Answer: B.** Dhaka is about 23.81 N, 90.41 E.

**Q63.** How many map tiles exist at zoom level z?  
A) 4^z  
B) 2z  
C) 10z  
D) z^2  
**Answer: A.** Each zoom level multiplies the tiles by four.

**Q64.** Which zoom is best for showing a whole country?  
A) 18  
B) 1  
C) About 6  
D) 0  
**Answer: C.** Roughly 6 is country level.

**Q65.** Which package draws OpenStreetMap maps without an API key?  
A) http  
B) flutter_map  
C) provider  
D) google_maps_flutter  
**Answer: B.** flutter_map uses open tiles.

**Q66.** Which Open-Meteo endpoint turns a city name into coordinates?  
A) The geocoding search endpoint  
B) The tiles endpoint  
C) The marker layer  
D) The forecast endpoint  
**Answer: A.** geocoding-api.open-meteo.com/v1/search.

**Q67.** Which layer draws a line through points in order?  
A) TileLayer  
B) MarkerLayer  
C) PolylineLayer  
D) CircleLayer  
**Answer: C.** A Polyline connects points in sequence.

**Q68.** What does useRadiusInMeter: true do?  
A) Adds a marker  
B) Changes the colour  
C) Hides the circle  
D) Scales the circle with the map zoom  
**Answer: D.** The radius is a real distance.

**Q69.** Which command runs the map lab in Chrome?  
A) flutter doctor  
B) flutter build apk  
C) flutter clean  
D) flutter run -d chrome  
**Answer: D.** Chrome needs no emulator.

**Q70.** In the layer stack, which layer sits on top?  
A) TileLayer  
B) None, the order is random  
C) MarkerLayer  
D) PolylineLayer  
**Answer: C.** Markers draw last so they stay visible.


### Dev Tools & Git

**Q71.** Which shortcut opens the command palette in VS Code?  
A) Ctrl+G  
B) Ctrl+S  
C) Ctrl+Shift+P  
D) Ctrl+F  
**Answer: C.** Search any command by name.

**Q72.** Which shortcut searches across all files?  
A) Ctrl+F  
B) Ctrl+Shift+F  
C) Ctrl+P  
D) Ctrl+H  
**Answer: B.** Global search.

**Q73.** Which shortcut formats the document?  
A) Ctrl+Shift+F  
B) Shift+Alt+F  
C) Ctrl+/  
D) Alt+Up  
**Answer: B.** Format on demand or on save.

**Q74.** Which key renames a symbol everywhere?  
A) F5  
B) F1  
C) F12  
D) F2  
**Answer: D.** Rename updates all references.

**Q75.** Which shortcut opens a file by name?  
A) Ctrl+P  
B) Ctrl+G  
C) Ctrl+K  
D) Ctrl+D  
**Answer: A.** Quick open.

**Q76.** What does the snippet stless + Tab create?  
A) A Git branch  
B) A StatelessWidget skeleton  
C) A JSON model  
D) A new project  
**Answer: B.** Snippets speed up boilerplate.

**Q77.** Which Git command stages all changes?  
A) git add .  
B) git clone  
C) git commit  
D) git push  
**Answer: A.** Adds changes to the staging area.

**Q78.** Which command saves a snapshot to the local repository?  
A) git push  
B) git status  
C) git pull  
D) git commit -m  
**Answer: D.** A commit needs a message.

**Q79.** Which command uploads commits to GitHub?  
A) git merge  
B) git restore  
C) git push  
D) git add  
**Answer: C.** Push sends local commits to the remote.

**Q80.** Which command copies a remote repository to your computer?  
A) git switch  
B) git diff  
C) git init  
D) git clone  
**Answer: D.** Clone downloads the repo and history.

**Q81.** Which command creates and switches to a new branch?  
A) git stash drop  
B) git merge  
C) git log  
D) git switch -c  
**Answer: D.** Example: git switch -c lab6/roll.

**Q82.** Which file keeps build/ out of the repository?  
A) LICENSE  
B) analysis_options.yaml  
C) .gitignore  
D) pubspec.yaml  
**Answer: C.** List ignored paths there.

**Q83.** What happens in a merge conflict?  
A) GitHub deletes the branch  
B) Git deletes both versions  
C) Two edits changed the same lines and you must choose  
D) Flutter restarts  
**Answer: C.** Choose Current, Incoming or Both, then add and commit.

**Q84.** Which VS Code option keeps both sides of a conflict?  
A) Accept Incoming  
B) Accept Both  
C) Compare Only  
D) Accept Current  
**Answer: B.** Then save, git add and git commit.

**Q85.** What should you do before a global find-and-replace?  
A) Commit your work first  
B) Close VS Code  
C) Delete the .git folder  
D) Turn off Auto Save  
**Answer: A.** A commit lets you undo with git restore.

**Q86.** Which Flutter command removes build files when stuck?  
A) flutter devices  
B) flutter doctor  
C) flutter clean  
D) flutter analyze  
**Answer: C.** Then run flutter pub get again.


### Project & Agile Practice

**Q87.** What is the purpose of the Problem Statement in the proposal?  
A) Describe the real-world problem, not the solution  
B) Name the database  
C) List the app screens  
D) Show the code  
**Answer: A.** Focus on the problem and who is affected.

**Q88.** Which proposal section lists specific things you aim to solve?  
A) 4 Conclusion  
B) 2.1 What we aim to solve  
C) Cover page  
D) 1 Problem Statement  
**Answer: B.** Objectives are a bullet list.

**Q89.** Which proposal section describes tools, stack and sprints?  
A) 2.1 What we aim to solve  
B) 2.2 How we plan to solve it  
C) Problem Statement  
D) Features  
**Answer: B.** The approach covers technology and Agile plan.

**Q90.** How many features does the proposal template list as a minimum?  
A) Ten  
B) Two  
C) Exactly one  
D) At least four  
**Answer: D.** The template shows Feature 1 to Feature 4.

**Q91.** What does the Conclusion of the proposal include?  
A) Only the team names  
B) The Git log  
C) The source code  
D) Summary, how it solves the problem, impact and future scope  
**Answer: D.** Close by restating value.

**Q92.** In which week is the project proposal presentation?  
A) Week 14  
B) Week 4  
C) Week 1  
D) Week 9  
**Answer: B.** The outline sets the proposal in Week 4.

**Q93.** Which weeks hold sprint reviews?  
A) Weeks 9 and 12  
B) Only Week 14  
C) Weeks 5 and 6  
D) Weeks 2 and 3  
**Answer: A.** Sprint Review 1 and 2.

**Q94.** In which week is the final evaluation?  
A) Week 7  
B) Week 12  
C) Week 10  
D) Week 14  
**Answer: D.** Demonstration, presentation, report and viva.

**Q95.** Which assessment item has the largest weight?  
A) Final project (35%)  
B) Viva (10%)  
C) Report (15%)  
D) Proposal (10%)  
**Answer: A.** It carries the biggest share.

**Q96.** What is a sprint?  
A) A short, fixed cycle of planned work  
B) A Flutter widget  
C) A type of test  
D) A Git command  
**Answer: A.** Agile teams deliver in sprints.

**Q97.** Which practice keeps API keys safe?  
A) Share them on chat  
B) Paste them in the README  
C) Keep them out of the repository and restrict them  
D) Commit them to main  
**Answer: C.** Never commit secrets.

**Q98.** What should each lab use to separate work in Git?  
A) One huge main branch  
B) Zip files by email  
C) No version control  
D) One branch per lab  
**Answer: D.** Branches keep work isolated.

**Q99.** Why do pair labs require both names?  
A) To skip the report  
B) To double the marks  
C) Both students must be able to explain every file  
D) To avoid using Git  
**Answer: C.** Each member is accountable.

**Q100.** Which screenshots show a complete REST app?  
A) Only the code  
B) Only the data state  
C) Loading, error and data states  
D) Only the logo  
**Answer: C.** Handle every state.
