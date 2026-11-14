// 100 MCQs for CSE 3102. Do NOT shuffle options at runtime: answers are pre-balanced across A-D.
export const mcq = [
 {
  "id": 1,
  "section": "Flutter & Dart Setup",
  "q": "Which language does Flutter use?",
  "options": [
   "JavaScript",
   "Kotlin",
   "Dart",
   "Swift"
  ],
  "answer": "C",
  "explain": "Flutter apps are written in Dart."
 },
 {
  "id": 2,
  "section": "Flutter & Dart Setup",
  "q": "What does hot reload do?",
  "options": [
   "Injects code changes into the running app and keeps its state",
   "Uploads the app to GitHub",
   "Restarts the app and clears state",
   "Rebuilds the APK from scratch"
  ],
  "answer": "A",
  "explain": "Hot reload keeps state; hot restart resets it."
 },
 {
  "id": 3,
  "section": "Flutter & Dart Setup",
  "q": "Which command checks your Flutter installation?",
  "options": [
   "flutter verify",
   "flutter doctor",
   "flutter install",
   "flutter check"
  ],
  "answer": "B",
  "explain": "flutter doctor lists missing tools and problems."
 },
 {
  "id": 4,
  "section": "Flutter & Dart Setup",
  "q": "Which build mode uses ahead-of-time (AOT) compilation?",
  "options": [
   "Emulator only",
   "Debug",
   "Hot reload",
   "Release"
  ],
  "answer": "D",
  "explain": "Release builds compile to native code with AOT."
 },
 {
  "id": 5,
  "section": "Flutter & Dart Setup",
  "q": "Where should the Flutter SDK be placed on Windows?",
  "options": [
   "A short path without spaces, such as C:\\src\\flutter",
   "Inside the Downloads folder with spaces",
   "C:\\Program Files\\flutter",
   "Any path, it does not matter"
  ],
  "answer": "A",
  "explain": "Spaces and protected folders cause problems."
 },
 {
  "id": 6,
  "section": "Flutter & Dart Setup",
  "q": "What must be added to the PATH after unzipping the SDK?",
  "options": [
   "The flutter/bin folder",
   "The android folder",
   "The pubspec.yaml file",
   "The lib folder"
  ],
  "answer": "A",
  "explain": "This lets the terminal find the flutter command."
 },
 {
  "id": 7,
  "section": "Flutter & Dart Setup",
  "q": "Which Dart type allows a value to be null?",
  "options": [
   "String",
   "String?",
   "const String",
   "final String"
  ],
  "answer": "B",
  "explain": "A trailing ? makes the type nullable."
 },
 {
  "id": 8,
  "section": "Flutter & Dart Setup",
  "q": "What does `name ?? 'Guest'` return when name is null?",
  "options": [
   "'Guest'",
   "An error",
   "An empty list",
   "null"
  ],
  "answer": "A",
  "explain": "?? gives a fallback when the left side is null."
 },
 {
  "id": 9,
  "section": "Flutter & Dart Setup",
  "q": "Which keyword does the course recommend by default?",
  "options": [
   "late",
   "final",
   "dynamic",
   "var"
  ],
  "answer": "B",
  "explain": "Final by default, const for literals, var only when reassigning."
 },
 {
  "id": 10,
  "section": "Flutter & Dart Setup",
  "q": "What does `flutter create hello_baust` do?",
  "options": [
   "Creates a new Flutter project",
   "Cleans the build folder",
   "Installs Android Studio",
   "Runs the app"
  ],
  "answer": "A",
  "explain": "It generates the project folders and starter code."
 },
 {
  "id": 11,
  "section": "Flutter & Dart Setup",
  "q": "Which file lists a project's dependencies?",
  "options": [
   "AndroidManifest.xml",
   "pubspec.yaml",
   "README.md",
   "main.dart"
  ],
  "answer": "B",
  "explain": "Packages and assets are declared in pubspec.yaml."
 },
 {
  "id": 12,
  "section": "Flutter & Dart Setup",
  "q": "What is the entry point of a Dart program?",
  "options": [
   "start()",
   "run()",
   "main()",
   "init()"
  ],
  "answer": "C",
  "explain": "Execution begins in main()."
 },
 {
  "id": 13,
  "section": "Flutter & Dart Setup",
  "q": "The doctor says the Android licence status is unknown. What fixes it?",
  "options": [
   "flutter pub get",
   "flutter devices",
   "flutter doctor --android-licenses",
   "flutter clean"
  ],
  "answer": "C",
  "explain": "Accept the licences by pressing y."
 },
 {
  "id": 14,
  "section": "Flutter & Dart Setup",
  "q": "Which Dart operator asserts a value is not null?",
  "options": [
   "??",
   "?",
   "?.",
   "!"
  ],
  "answer": "D",
  "explain": "! tells Dart the value is not null and crashes if it is."
 },
 {
  "id": 15,
  "section": "Widgets & State",
  "q": "What is a widget in Flutter?",
  "options": [
   "A building block of the user interface",
   "A database table",
   "A Git branch",
   "A network request"
  ],
  "answer": "A",
  "explain": "Everything on screen is a widget."
 },
 {
  "id": 16,
  "section": "Widgets & State",
  "q": "Which widget never changes after it is built?",
  "options": [
   "FutureBuilder",
   "AnimatedWidget",
   "StatefulWidget",
   "StatelessWidget"
  ],
  "answer": "D",
  "explain": "Stateless widgets hold no changing data."
 },
 {
  "id": 17,
  "section": "Widgets & State",
  "q": "What does setState() do?",
  "options": [
   "Saves data to disk",
   "Marks the widget dirty so build() runs again",
   "Opens a new screen",
   "Closes the app"
  ],
  "answer": "B",
  "explain": "It triggers a rebuild with the new data."
 },
 {
  "id": 18,
  "section": "Widgets & State",
  "q": "What happens if you change a variable without calling setState()?",
  "options": [
   "The data changes but the screen does not update",
   "The screen updates anyway",
   "The app crashes immediately",
   "Flutter restarts the app"
  ],
  "answer": "A",
  "explain": "Flutter only redraws when told."
 },
 {
  "id": 19,
  "section": "Widgets & State",
  "q": "Which method returns the widget tree of a widget?",
  "options": [
   "build()",
   "draw()",
   "render()",
   "init()"
  ],
  "answer": "A",
  "explain": "build() describes the UI."
 },
 {
  "id": 20,
  "section": "Widgets & State",
  "q": "Where should you start a one-time data fetch in a stateful widget?",
  "options": [
   "setState()",
   "build()",
   "initState()",
   "dispose()"
  ],
  "answer": "C",
  "explain": "initState runs once when the widget is created."
 },
 {
  "id": 21,
  "section": "Widgets & State",
  "q": "Which widget provides the basic screen structure with appBar and body?",
  "options": [
   "Scaffold",
   "Padding",
   "Container",
   "Stack"
  ],
  "answer": "A",
  "explain": "Scaffold is the standard Material screen layout."
 },
 {
  "id": 22,
  "section": "Widgets & State",
  "q": "Which widget is the root of a Material app?",
  "options": [
   "MaterialApp",
   "Card",
   "Scaffold",
   "ListView"
  ],
  "answer": "A",
  "explain": "It sets up theme, routes and the home screen."
 },
 {
  "id": 23,
  "section": "Widgets & State",
  "q": "What does hot restart (R) do to the app state?",
  "options": [
   "Uploads it",
   "Resets it",
   "Keeps it",
   "Encrypts it"
  ],
  "answer": "B",
  "explain": "A restart starts the app again from main()."
 },
 {
  "id": 24,
  "section": "Widgets & State",
  "q": "Which widget shows a tappable raised button?",
  "options": [
   "Text",
   "Drawer",
   "Card",
   "ElevatedButton"
  ],
  "answer": "D",
  "explain": "ElevatedButton takes an onPressed callback."
 },
 {
  "id": 25,
  "section": "Widgets & State",
  "q": "Which keyword makes a widget constructor cheaper on rebuild?",
  "options": [
   "static",
   "dynamic",
   "late",
   "const"
  ],
  "answer": "D",
  "explain": "A const widget is reused instead of rebuilt."
 },
 {
  "id": 26,
  "section": "Widgets & State",
  "q": "In the profile card practice, which widget shows the circular photo?",
  "options": [
   "Card",
   "Chip",
   "CircleAvatar",
   "Icon"
  ],
  "answer": "C",
  "explain": "CircleAvatar draws a round picture or initials."
 },
 {
  "id": 27,
  "section": "Widgets & State",
  "q": "Which widget holds a Text with rounded corners and a shadow around a child?",
  "options": [
   "SizedBox",
   "Expanded",
   "Card",
   "Align"
  ],
  "answer": "C",
  "explain": "Card adds elevation and rounded corners."
 },
 {
  "id": 28,
  "section": "Widgets & State",
  "q": "The stretch goal for the profile card needs which kind of widget?",
  "options": [
   "InheritedWidget only",
   "None, it uses a global",
   "StatelessWidget",
   "StatefulWidget"
  ],
  "answer": "D",
  "explain": "A Like counter needs state and setState."
 },
 {
  "id": 29,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget lays children out horizontally?",
  "options": [
   "Stack",
   "Row",
   "Column",
   "ListView only"
  ],
  "answer": "B",
  "explain": "Row's main axis is horizontal."
 },
 {
  "id": 30,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget lays children out vertically?",
  "options": [
   "TabBar",
   "Positioned",
   "Column",
   "Row"
  ],
  "answer": "C",
  "explain": "Column's main axis is vertical."
 },
 {
  "id": 31,
  "section": "Layout, Colors & Navigation",
  "q": "Which property spaces children evenly with equal gaps including both ends?",
  "options": [
   "MainAxisAlignment.start",
   "CrossAxisAlignment.stretch",
   "MainAxisSize.min",
   "MainAxisAlignment.spaceEvenly"
  ],
  "answer": "D",
  "explain": "spaceEvenly puts equal space everywhere."
 },
 {
  "id": 32,
  "section": "Layout, Colors & Navigation",
  "q": "What do yellow-and-black stripes on screen mean?",
  "options": [
   "A layout overflow",
   "A network error",
   "A Git conflict",
   "A missing API key"
  ],
  "answer": "A",
  "explain": "Content is bigger than the space available."
 },
 {
  "id": 33,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget fixes an overflowing Column of many items?",
  "options": [
   "Opacity",
   "Padding",
   "Align",
   "ListView or SingleChildScrollView"
  ],
  "answer": "D",
  "explain": "Make the content scrollable."
 },
 {
  "id": 34,
  "section": "Layout, Colors & Navigation",
  "q": "In Color(0xFF2196F3), what does FF mean?",
  "options": [
   "Blue is 255",
   "Green is 255",
   "Fully opaque alpha",
   "Red is 255"
  ],
  "answer": "C",
  "explain": "Hex colours are 0xAARRGGBB, alpha first."
 },
 {
  "id": 35,
  "section": "Layout, Colors & Navigation",
  "q": "Why is Color(0x2196F3) invisible?",
  "options": [
   "The red channel is zero",
   "Its alpha is 00",
   "It needs const",
   "Blue is not supported"
  ],
  "answer": "B",
  "explain": "Without FF the alpha is 00."
 },
 {
  "id": 36,
  "section": "Layout, Colors & Navigation",
  "q": "How do you make Colors.blue half transparent?",
  "options": [
   "Colors.blue.withValues(alpha: 0.5)",
   "Colors.blue.alpha()",
   "Colors.blue.shade50",
   "Colors.blue.half"
  ],
  "answer": "A",
  "explain": "withValues(alpha:) sets opacity."
 },
 {
  "id": 37,
  "section": "Layout, Colors & Navigation",
  "q": "Which call builds an app-wide colour scheme from one colour?",
  "options": [
   "ColorScheme.fromSeed",
   "TextStyle.merge",
   "Color.fromARGB",
   "Colors.shade"
  ],
  "answer": "A",
  "explain": "fromSeed generates a Material 3 palette."
 },
 {
  "id": 38,
  "section": "Layout, Colors & Navigation",
  "q": "Why must you not use both color and decoration on a Container?",
  "options": [
   "Decoration is deprecated",
   "It is slower only",
   "Color is deprecated",
   "They conflict and cause an error"
  ],
  "answer": "D",
  "explain": "Put the colour inside BoxDecoration."
 },
 {
  "id": 39,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget is better than a Container just for spacing?",
  "options": [
   "Opacity",
   "Padding",
   "Align",
   "Divider"
  ],
  "answer": "B",
  "explain": "Padding is the lighter widget for spacing."
 },
 {
  "id": 40,
  "section": "Layout, Colors & Navigation",
  "q": "Which constructor builds the list rows lazily?",
  "options": [
   "ListView(children:)",
   "Wrap",
   "ListView.builder",
   "Column"
  ],
  "answer": "C",
  "explain": "Only the visible items are built."
 },
 {
  "id": 41,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget opens a new screen on top of the stack?",
  "options": [
   "BottomNavigationBar",
   "TabBar",
   "Drawer",
   "Navigator.push"
  ],
  "answer": "D",
  "explain": "push adds a route; pop goes back."
 },
 {
  "id": 42,
  "section": "Layout, Colors & Navigation",
  "q": "Which of these changes content inside one screen rather than adding a route?",
  "options": [
   "Navigator.push",
   "MaterialPageRoute",
   "Navigator.pop",
   "BottomNavigationBar"
  ],
  "answer": "D",
  "explain": "Bars and tabs swap the body."
 },
 {
  "id": 43,
  "section": "Layout, Colors & Navigation",
  "q": "Which widget layers children on top of each other?",
  "options": [
   "Column",
   "Stack",
   "ListTile",
   "Row"
  ],
  "answer": "B",
  "explain": "Stack with Positioned places widgets freely."
 },
 {
  "id": 44,
  "section": "Layout, Colors & Navigation",
  "q": "What does Expanded do inside a Row?",
  "options": [
   "Hides the child",
   "Centres the Row",
   "Makes the child fill the remaining space",
   "Adds a border"
  ],
  "answer": "C",
  "explain": "Expanded takes the free space."
 },
 {
  "id": 45,
  "section": "REST APIs & HTTP",
  "q": "What does REST stand for in everyday use?",
  "options": [
   "A style of web API using URLs and HTTP methods",
   "A Flutter widget",
   "A Dart state manager",
   "A database engine"
  ],
  "answer": "A",
  "explain": "Resources have URLs; methods act on them."
 },
 {
  "id": 46,
  "section": "REST APIs & HTTP",
  "q": "Which HTTP method reads data?",
  "options": [
   "GET",
   "PUT",
   "DELETE",
   "POST"
  ],
  "answer": "A",
  "explain": "GET does not change data."
 },
 {
  "id": 47,
  "section": "REST APIs & HTTP",
  "q": "Which HTTP method creates a new resource?",
  "options": [
   "GET",
   "POST",
   "HEAD",
   "TRACE"
  ],
  "answer": "B",
  "explain": "POST sends data to create something."
 },
 {
  "id": 48,
  "section": "REST APIs & HTTP",
  "q": "What does status code 404 mean?",
  "options": [
   "Success",
   "Not found",
   "Created",
   "Server error"
  ],
  "answer": "B",
  "explain": "The resource or URL does not exist."
 },
 {
  "id": 49,
  "section": "REST APIs & HTTP",
  "q": "Which status class means the server failed?",
  "options": [
   "2xx",
   "3xx",
   "5xx",
   "4xx"
  ],
  "answer": "C",
  "explain": "5xx codes are server errors."
 },
 {
  "id": 50,
  "section": "REST APIs & HTTP",
  "q": "Which status code means created?",
  "options": [
   "500",
   "201",
   "400",
   "200"
  ],
  "answer": "B",
  "explain": "201 follows a successful POST."
 },
 {
  "id": 51,
  "section": "REST APIs & HTTP",
  "q": "What is JSON?",
  "options": [
   "A Git command",
   "A lightweight text format of keys and values",
   "A compiled binary format",
   "A Flutter widget"
  ],
  "answer": "B",
  "explain": "APIs commonly reply in JSON."
 },
 {
  "id": 52,
  "section": "REST APIs & HTTP",
  "q": "Which function turns a JSON string into Dart objects?",
  "options": [
   "toJson",
   "jsonPrint",
   "parseWidget",
   "jsonDecode"
  ],
  "answer": "D",
  "explain": "jsonDecode returns maps and lists."
 },
 {
  "id": 53,
  "section": "REST APIs & HTTP",
  "q": "Which package does the course use for HTTP calls?",
  "options": [
   "path",
   "provider",
   "flutter_map",
   "http"
  ],
  "answer": "D",
  "explain": "Add it with flutter pub add http."
 },
 {
  "id": 54,
  "section": "REST APIs & HTTP",
  "q": "What goes after ? in a URL?",
  "options": [
   "Query parameters",
   "The status code",
   "The host",
   "The scheme"
  ],
  "answer": "A",
  "explain": "Example: ?userId=1."
 },
 {
  "id": 55,
  "section": "REST APIs & HTTP",
  "q": "What type do Uri.https query values need to be?",
  "options": [
   "bool",
   "List",
   "String",
   "int"
  ],
  "answer": "C",
  "explain": "Write '1', not 1."
 },
 {
  "id": 56,
  "section": "REST APIs & HTTP",
  "q": "Which check should come before decoding the body?",
  "options": [
   "response.isBig",
   "response.reload",
   "response.hot",
   "response.statusCode == 200"
  ],
  "answer": "D",
  "explain": "Only decode a successful response."
 },
 {
  "id": 57,
  "section": "REST APIs & HTTP",
  "q": "Why create the Future once in initState instead of build?",
  "options": [
   "Futures cannot be created in build at all",
   "build never runs",
   "initState is faster for UI",
   "build can run many times and would refetch each time"
  ],
  "answer": "D",
  "explain": "Otherwise every rebuild sends a new request."
 },
 {
  "id": 58,
  "section": "REST APIs & HTTP",
  "q": "Which FutureBuilder state shows a spinner?",
  "options": [
   "Done only",
   "Data",
   "Waiting",
   "Error"
  ],
  "answer": "C",
  "explain": "While the Future is pending, show a loader."
 },
 {
  "id": 59,
  "section": "Maps & Location",
  "q": "Which order is correct for LatLng?",
  "options": [
   "Longitude, then latitude",
   "Latitude, then longitude",
   "Altitude, then longitude",
   "Zoom, then latitude"
  ],
  "answer": "B",
  "explain": "Always (lat, lng)."
 },
 {
  "id": 60,
  "section": "Maps & Location",
  "q": "What range does latitude cover?",
  "options": [
   "0 to 90 only",
   "0 to 360",
   "-90 to +90",
   "-180 to +180"
  ],
  "answer": "C",
  "explain": "Latitude is south to north."
 },
 {
  "id": 61,
  "section": "Maps & Location",
  "q": "What range does longitude cover?",
  "options": [
   "-90 to +90",
   "-180 to +180",
   "0 to 100",
   "-45 to +45"
  ],
  "answer": "B",
  "explain": "Longitude is west to east."
 },
 {
  "id": 62,
  "section": "Maps & Location",
  "q": "Roughly where is Dhaka's latitude and longitude?",
  "options": [
   "90.41, 23.81",
   "23.81, 90.41",
   "0, 0",
   "51.5, -0.12"
  ],
  "answer": "B",
  "explain": "Dhaka is about 23.81 N, 90.41 E."
 },
 {
  "id": 63,
  "section": "Maps & Location",
  "q": "How many map tiles exist at zoom level z?",
  "options": [
   "4^z",
   "2z",
   "10z",
   "z^2"
  ],
  "answer": "A",
  "explain": "Each zoom level multiplies the tiles by four."
 },
 {
  "id": 64,
  "section": "Maps & Location",
  "q": "Which zoom is best for showing a whole country?",
  "options": [
   "18",
   "1",
   "About 6",
   "0"
  ],
  "answer": "C",
  "explain": "Roughly 6 is country level."
 },
 {
  "id": 65,
  "section": "Maps & Location",
  "q": "Which package draws OpenStreetMap maps without an API key?",
  "options": [
   "http",
   "flutter_map",
   "provider",
   "google_maps_flutter"
  ],
  "answer": "B",
  "explain": "flutter_map uses open tiles."
 },
 {
  "id": 66,
  "section": "Maps & Location",
  "q": "Which Open-Meteo endpoint turns a city name into coordinates?",
  "options": [
   "The geocoding search endpoint",
   "The tiles endpoint",
   "The marker layer",
   "The forecast endpoint"
  ],
  "answer": "A",
  "explain": "geocoding-api.open-meteo.com/v1/search."
 },
 {
  "id": 67,
  "section": "Maps & Location",
  "q": "Which layer draws a line through points in order?",
  "options": [
   "TileLayer",
   "MarkerLayer",
   "PolylineLayer",
   "CircleLayer"
  ],
  "answer": "C",
  "explain": "A Polyline connects points in sequence."
 },
 {
  "id": 68,
  "section": "Maps & Location",
  "q": "What does useRadiusInMeter: true do?",
  "options": [
   "Adds a marker",
   "Changes the colour",
   "Hides the circle",
   "Scales the circle with the map zoom"
  ],
  "answer": "D",
  "explain": "The radius is a real distance."
 },
 {
  "id": 69,
  "section": "Maps & Location",
  "q": "Which command runs the map lab in Chrome?",
  "options": [
   "flutter doctor",
   "flutter build apk",
   "flutter clean",
   "flutter run -d chrome"
  ],
  "answer": "D",
  "explain": "Chrome needs no emulator."
 },
 {
  "id": 70,
  "section": "Maps & Location",
  "q": "In the layer stack, which layer sits on top?",
  "options": [
   "TileLayer",
   "None, the order is random",
   "MarkerLayer",
   "PolylineLayer"
  ],
  "answer": "C",
  "explain": "Markers draw last so they stay visible."
 },
 {
  "id": 71,
  "section": "Dev Tools & Git",
  "q": "Which shortcut opens the command palette in VS Code?",
  "options": [
   "Ctrl+G",
   "Ctrl+S",
   "Ctrl+Shift+P",
   "Ctrl+F"
  ],
  "answer": "C",
  "explain": "Search any command by name."
 },
 {
  "id": 72,
  "section": "Dev Tools & Git",
  "q": "Which shortcut searches across all files?",
  "options": [
   "Ctrl+F",
   "Ctrl+Shift+F",
   "Ctrl+P",
   "Ctrl+H"
  ],
  "answer": "B",
  "explain": "Global search."
 },
 {
  "id": 73,
  "section": "Dev Tools & Git",
  "q": "Which shortcut formats the document?",
  "options": [
   "Ctrl+Shift+F",
   "Shift+Alt+F",
   "Ctrl+/",
   "Alt+Up"
  ],
  "answer": "B",
  "explain": "Format on demand or on save."
 },
 {
  "id": 74,
  "section": "Dev Tools & Git",
  "q": "Which key renames a symbol everywhere?",
  "options": [
   "F5",
   "F1",
   "F12",
   "F2"
  ],
  "answer": "D",
  "explain": "Rename updates all references."
 },
 {
  "id": 75,
  "section": "Dev Tools & Git",
  "q": "Which shortcut opens a file by name?",
  "options": [
   "Ctrl+P",
   "Ctrl+G",
   "Ctrl+K",
   "Ctrl+D"
  ],
  "answer": "A",
  "explain": "Quick open."
 },
 {
  "id": 76,
  "section": "Dev Tools & Git",
  "q": "What does the snippet stless + Tab create?",
  "options": [
   "A Git branch",
   "A StatelessWidget skeleton",
   "A JSON model",
   "A new project"
  ],
  "answer": "B",
  "explain": "Snippets speed up boilerplate."
 },
 {
  "id": 77,
  "section": "Dev Tools & Git",
  "q": "Which Git command stages all changes?",
  "options": [
   "git add .",
   "git clone",
   "git commit",
   "git push"
  ],
  "answer": "A",
  "explain": "Adds changes to the staging area."
 },
 {
  "id": 78,
  "section": "Dev Tools & Git",
  "q": "Which command saves a snapshot to the local repository?",
  "options": [
   "git push",
   "git status",
   "git pull",
   "git commit -m"
  ],
  "answer": "D",
  "explain": "A commit needs a message."
 },
 {
  "id": 79,
  "section": "Dev Tools & Git",
  "q": "Which command uploads commits to GitHub?",
  "options": [
   "git merge",
   "git restore",
   "git push",
   "git add"
  ],
  "answer": "C",
  "explain": "Push sends local commits to the remote."
 },
 {
  "id": 80,
  "section": "Dev Tools & Git",
  "q": "Which command copies a remote repository to your computer?",
  "options": [
   "git switch",
   "git diff",
   "git init",
   "git clone"
  ],
  "answer": "D",
  "explain": "Clone downloads the repo and history."
 },
 {
  "id": 81,
  "section": "Dev Tools & Git",
  "q": "Which command creates and switches to a new branch?",
  "options": [
   "git stash drop",
   "git merge",
   "git log",
   "git switch -c"
  ],
  "answer": "D",
  "explain": "Example: git switch -c lab6/roll."
 },
 {
  "id": 82,
  "section": "Dev Tools & Git",
  "q": "Which file keeps build/ out of the repository?",
  "options": [
   "LICENSE",
   "analysis_options.yaml",
   ".gitignore",
   "pubspec.yaml"
  ],
  "answer": "C",
  "explain": "List ignored paths there."
 },
 {
  "id": 83,
  "section": "Dev Tools & Git",
  "q": "What happens in a merge conflict?",
  "options": [
   "GitHub deletes the branch",
   "Git deletes both versions",
   "Two edits changed the same lines and you must choose",
   "Flutter restarts"
  ],
  "answer": "C",
  "explain": "Choose Current, Incoming or Both, then add and commit."
 },
 {
  "id": 84,
  "section": "Dev Tools & Git",
  "q": "Which VS Code option keeps both sides of a conflict?",
  "options": [
   "Accept Incoming",
   "Accept Both",
   "Compare Only",
   "Accept Current"
  ],
  "answer": "B",
  "explain": "Then save, git add and git commit."
 },
 {
  "id": 85,
  "section": "Dev Tools & Git",
  "q": "What should you do before a global find-and-replace?",
  "options": [
   "Commit your work first",
   "Close VS Code",
   "Delete the .git folder",
   "Turn off Auto Save"
  ],
  "answer": "A",
  "explain": "A commit lets you undo with git restore."
 },
 {
  "id": 86,
  "section": "Dev Tools & Git",
  "q": "Which Flutter command removes build files when stuck?",
  "options": [
   "flutter devices",
   "flutter doctor",
   "flutter clean",
   "flutter analyze"
  ],
  "answer": "C",
  "explain": "Then run flutter pub get again."
 },
 {
  "id": 87,
  "section": "Project & Agile Practice",
  "q": "What is the purpose of the Problem Statement in the proposal?",
  "options": [
   "Describe the real-world problem, not the solution",
   "Name the database",
   "List the app screens",
   "Show the code"
  ],
  "answer": "A",
  "explain": "Focus on the problem and who is affected."
 },
 {
  "id": 88,
  "section": "Project & Agile Practice",
  "q": "Which proposal section lists specific things you aim to solve?",
  "options": [
   "4 Conclusion",
   "2.1 What we aim to solve",
   "Cover page",
   "1 Problem Statement"
  ],
  "answer": "B",
  "explain": "Objectives are a bullet list."
 },
 {
  "id": 89,
  "section": "Project & Agile Practice",
  "q": "Which proposal section describes tools, stack and sprints?",
  "options": [
   "2.1 What we aim to solve",
   "2.2 How we plan to solve it",
   "Problem Statement",
   "Features"
  ],
  "answer": "B",
  "explain": "The approach covers technology and Agile plan."
 },
 {
  "id": 90,
  "section": "Project & Agile Practice",
  "q": "How many features does the proposal template list as a minimum?",
  "options": [
   "Ten",
   "Two",
   "Exactly one",
   "At least four"
  ],
  "answer": "D",
  "explain": "The template shows Feature 1 to Feature 4."
 },
 {
  "id": 91,
  "section": "Project & Agile Practice",
  "q": "What does the Conclusion of the proposal include?",
  "options": [
   "Only the team names",
   "The Git log",
   "The source code",
   "Summary, how it solves the problem, impact and future scope"
  ],
  "answer": "D",
  "explain": "Close by restating value."
 },
 {
  "id": 92,
  "section": "Project & Agile Practice",
  "q": "In which week is the project proposal presentation?",
  "options": [
   "Week 14",
   "Week 4",
   "Week 1",
   "Week 9"
  ],
  "answer": "B",
  "explain": "The outline sets the proposal in Week 4."
 },
 {
  "id": 93,
  "section": "Project & Agile Practice",
  "q": "Which weeks hold sprint reviews?",
  "options": [
   "Weeks 9 and 12",
   "Only Week 14",
   "Weeks 5 and 6",
   "Weeks 2 and 3"
  ],
  "answer": "A",
  "explain": "Sprint Review 1 and 2."
 },
 {
  "id": 94,
  "section": "Project & Agile Practice",
  "q": "In which week is the final evaluation?",
  "options": [
   "Week 7",
   "Week 12",
   "Week 10",
   "Week 14"
  ],
  "answer": "D",
  "explain": "Demonstration, presentation, report and viva."
 },
 {
  "id": 95,
  "section": "Project & Agile Practice",
  "q": "Which assessment item has the largest weight?",
  "options": [
   "Final project (35%)",
   "Viva (10%)",
   "Report (15%)",
   "Proposal (10%)"
  ],
  "answer": "A",
  "explain": "It carries the biggest share."
 },
 {
  "id": 96,
  "section": "Project & Agile Practice",
  "q": "What is a sprint?",
  "options": [
   "A short, fixed cycle of planned work",
   "A Flutter widget",
   "A type of test",
   "A Git command"
  ],
  "answer": "A",
  "explain": "Agile teams deliver in sprints."
 },
 {
  "id": 97,
  "section": "Project & Agile Practice",
  "q": "Which practice keeps API keys safe?",
  "options": [
   "Share them on chat",
   "Paste them in the README",
   "Keep them out of the repository and restrict them",
   "Commit them to main"
  ],
  "answer": "C",
  "explain": "Never commit secrets."
 },
 {
  "id": 98,
  "section": "Project & Agile Practice",
  "q": "What should each lab use to separate work in Git?",
  "options": [
   "One huge main branch",
   "Zip files by email",
   "No version control",
   "One branch per lab"
  ],
  "answer": "D",
  "explain": "Branches keep work isolated."
 },
 {
  "id": 99,
  "section": "Project & Agile Practice",
  "q": "Why do pair labs require both names?",
  "options": [
   "To skip the report",
   "To double the marks",
   "Both students must be able to explain every file",
   "To avoid using Git"
  ],
  "answer": "C",
  "explain": "Each member is accountable."
 },
 {
  "id": 100,
  "section": "Project & Agile Practice",
  "q": "Which screenshots show a complete REST app?",
  "options": [
   "Only the code",
   "Only the data state",
   "Loading, error and data states",
   "Only the logo"
  ],
  "answer": "C",
  "explain": "Handle every state."
 }
];
