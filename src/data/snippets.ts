export interface CodeSnippet {
  id: string;
  week: number;
  slide: number;
  lang: 'dart' | 'bash' | 'yaml' | 'json' | 'xml';
  title: string;
  explain: string;
  code: string;
}

export const SNIPPETS: CodeSnippet[] = [
  // Week 1
  {
    id: 'w1-create-run',
    week: 1,
    slide: 10,
    lang: 'bash',
    title: 'Create and run your first Flutter app',
    explain: 'Generates starter project folders and launches the app on the connected device or emulator.',
    code: `flutter doctor
flutter doctor --android-licenses
flutter create hello_baust
cd hello_baust
flutter run`,
  },
  {
    id: 'w1-null-safety',
    week: 1,
    slide: 12,
    lang: 'dart',
    title: 'Variables, final/const and null safety',
    explain: 'Uses final by default, ? for nullable types, ?? for fallback and ?. for null-aware access.',
    code: `void main() {
  final String university = 'BAUST';
  const int creditPercent = 100;
  var semester = 'Summer 2026';

  String? middleName;
  print(middleName ?? 'not given'); // prints: not given
  print(middleName?.length);        // prints: null
  print('$university · $semester ($creditPercent%)');
}`,
  },
  {
    id: 'w1-student-class',
    week: 1,
    slide: 13,
    lang: 'dart',
    title: 'Student class & collection loop (Week 1 Lab)',
    explain: 'Defines a class with shorthand constructor parameters and iterates over a typed List.',
    code: `class Student {
  final String name;
  final String id;

  Student(this.name, this.id);

  @override
  String toString() => '$name ($id)';
}

void main() {
  final students = [
    Student('Ayesha', '220101'),
    Student('Tariq', '220102'),
  ];

  for (final s in students) {
    print(s);
  }
}`,
  },

  // Week 2
  {
    id: 'w2-main-anatomy',
    week: 2,
    slide: 4,
    lang: 'dart',
    title: 'Anatomy of main.dart',
    explain: 'Root MaterialApp wrapping a Scaffold with an AppBar and centred body text.',
    code: `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CSE 3100 Demo',
      home: Scaffold(
        appBar: AppBar(title: const Text('BAUST Campus')),
        body: const Center(child: Text('Hello Flutter')),
      ),
    );
  }
}`,
  },
  {
    id: 'w2-course-card',
    week: 2,
    slide: 9,
    lang: 'dart',
    title: 'Minimal Course Card widget',
    explain: 'Nests Card → Padding → Column with Text, SizedBox spacing and an ElevatedButton.',
    code: `Card(
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text(
          'CSE 3100',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 6),
        const Text('Software Development Project II'),
        const SizedBox(height: 12),
        ElevatedButton(
          onPressed: () {},
          child: const Text('Open Module'),
        ),
      ],
    ),
  ),
)`,
  },
  {
    id: 'w2-google-map',
    week: 2,
    slide: 11,
    lang: 'dart',
    title: 'GoogleMap centred on Saidpur',
    explain: 'Displays google_maps_flutter centred at LatLng(25.7770, 88.9270) with a marker.',
    code: `GoogleMap(
  initialCameraPosition: const CameraPosition(
    target: LatLng(25.7770, 88.9270),
    zoom: 14,
  ),
  markers: {
    const Marker(
      markerId: MarkerId('baust'),
      position: LatLng(25.7770, 88.9270),
      infoWindow: InfoWindow(title: 'BAUST Saidpur'),
    ),
  },
)`,
  },
  {
    id: 'w2-future-builder',
    week: 2,
    slide: 13,
    lang: 'dart',
    title: 'FutureBuilder with Future stored in initState()',
    explain: 'Prevents infinite refetches by creating the Future once in initState() rather than build().',
    code: `class CoursesTab extends StatefulWidget {
  const CoursesTab({super.key});
  @override
  State<CoursesTab> createState() => _CoursesTabState();
}

class _CoursesTabState extends State<CoursesTab> {
  late Future<List<Course>> _future;

  @override
  void initState() {
    super.initState();
    _future = fetchCourses(); // Created once!
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<Course>>(
      future: _future,
      builder: (context, snap) {
        if (snap.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        }
        if (snap.hasError) {
          return Center(child: Text('Error: \${snap.error}'));
        }
        final items = snap.data ?? [];
        return ListView.builder(
          itemCount: items.length,
          itemBuilder: (_, i) => ListTile(title: Text(items[i].title)),
        );
      },
    );
  }
}`,
  },

  // Week 3
  {
    id: 'w3-setstate',
    week: 3,
    slide: 13,
    lang: 'dart',
    title: 'setState() counter pattern',
    explain: 'Mutates state inside setState() so Flutter marks the widget dirty and reruns build().',
    code: `class LikeButton extends StatefulWidget {
  const LikeButton({super.key});
  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  int likes = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () => setState(() => likes++),
      icon: const Icon(Icons.thumb_up),
      label: Text('Likes: $likes'),
    );
  }
}`,
  },
  {
    id: 'w3-container-box',
    week: 3,
    slide: 17,
    lang: 'dart',
    title: 'Container with BoxDecoration (never mix color & decoration)',
    explain: 'Places color inside BoxDecoration alongside border and borderRadius.',
    code: `Container(
  margin: const EdgeInsets.all(12),
  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  decoration: BoxDecoration(
    color: const Color(0xFF2196F3),
    border: Border.all(color: Colors.indigo, width: 2),
    borderRadius: BorderRadius.circular(12),
  ),
  child: const Text('Styled Box', style: TextStyle(color: Colors.white)),
)`,
  },
  {
    id: 'w3-colors-theme',
    week: 3,
    slide: 20,
    lang: 'dart',
    title: 'Four colour forms & ColorScheme.fromSeed',
    explain: 'Demonstrates named, shade, ARGB hex, fromARGB, withValues(alpha:) and Material 3 ThemeData.',
    code: `const c1 = Colors.blue;
final c2 = Colors.blue.shade700;
const c3 = Color(0xFF2196F3); // 0xAARRGGBB -> FF = fully opaque
const c4 = Color.fromARGB(255, 33, 150, 243);
final half = Colors.blue.withValues(alpha: 0.5);

final theme = ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal),
  useMaterial3: true,
);`,
  },
  {
    id: 'w3-navigator-listview',
    week: 3,
    slide: 24,
    lang: 'dart',
    title: 'ListView.builder + Navigator.push / pop',
    explain: 'Builds visible list rows lazily and navigates to a detail screen on tap.',
    code: `ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text(items[index]),
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => DetailPage(title: items[index])),
        );
      },
    );
  },
)`,
  },

  // Week 4
  {
    id: 'w4-uri-https',
    week: 4,
    slide: 5,
    lang: 'dart',
    title: 'Building query URLs safely with Uri.https',
    explain: 'Passes String values in the query map so Uri.https automatically encodes special characters.',
    code: `final uri = Uri.https(
  'jsonplaceholder.typicode.com',
  '/posts',
  {
    'userId': '1',
    '_limit': '5',
  },
);
// Produces: https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5`,
  },
  {
    id: 'w4-fetch-posts',
    week: 4,
    slide: 6,
    lang: 'dart',
    title: 'Five-step fetchPosts() recipe',
    explain: 'Adds http, builds Uri, awaits http.get, verifies statusCode == 200 and decodes JSON.',
    code: `import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<Post>> fetchPosts({String? userId}) async {
  final query = userId == null ? null : {'userId': userId};
  final uri = Uri.https('jsonplaceholder.typicode.com', '/posts', query);
  final response = await http.get(uri);

  if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    return data.map((j) => Post.fromJson(j as Map<String, dynamic>)).toList();
  } else {
    throw Exception('Failed to load posts (HTTP \${response.statusCode})');
  }
}`,
  },
  {
    id: 'w4-post-model',
    week: 4,
    slide: 7,
    lang: 'dart',
    title: 'Post model with fromJson factory',
    explain: 'Maps JSON keys from an API response into strongly typed Dart fields.',
    code: `class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  const Post({
    required this.userId,
    required this.id,
    required this.title,
    required this.body,
  });

  factory Post.fromJson(Map<String, dynamic> j) {
    return Post(
      userId: j['userId'] as int,
      id: j['id'] as int,
      title: j['title'] as String,
      body: (j['body'] ?? '') as String,
    );
  }
}`,
  },

  // Week 5
  {
    id: 'w5-open-meteo-chain',
    week: 5,
    slide: 5,
    lang: 'dart',
    title: 'Chaining Geocoding → Forecast with Open-Meteo',
    explain: 'Resolves a city name to coordinates, then fetches current temperature_2m.',
    code: `Future<double> fetchCityTemp(String city) async {
  final geoUri = Uri.https(
    'geocoding-api.open-meteo.com',
    '/v1/search',
    {'name': city, 'count': '1'},
  );
  final geoRes = await http.get(geoUri);
  final geoJson = jsonDecode(geoRes.body);
  final lat = geoJson['results'][0]['latitude'];
  final lng = geoJson['results'][0]['longitude'];

  final wxUri = Uri.https(
    'api.open-meteo.com',
    '/v1/forecast',
    {'latitude': '$lat', 'longitude': '$lng', 'current': 'temperature_2m'},
  );
  final wxRes = await http.get(wxUri);
  final wxJson = jsonDecode(wxRes.body);
  return (wxJson['current']['temperature_2m'] as num).toDouble();
}`,
  },
  {
    id: 'w5-flutter-map',
    week: 5,
    slide: 7,
    lang: 'dart',
    title: 'flutter_map with TileLayer, PolylineLayer, CircleLayer & MarkerLayer',
    explain: 'Draws OpenStreetMap tiles (no API key) with a route polyline, 5 km circle and temperature markers.',
    code: `FlutterMap(
  options: const MapOptions(
    initialCenter: LatLng(25.78, 88.90), // Saidpur
    initialZoom: 13,
    minZoom: 3,
    maxZoom: 18,
  ),
  children: [
    TileLayer(
      urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      userAgentPackageName: 'edu.baust.cse3100',
    ),
    PolylineLayer(
      polylines: [
        Polyline(
          points: [
            LatLng(25.78, 88.90), // Saidpur
            LatLng(25.74, 89.25), // Rangpur
            LatLng(23.81, 90.41), // Dhaka
          ],
          strokeWidth: 4,
          color: Colors.green,
        ),
      ],
    ),
    CircleLayer(
      circles: [
        CircleMarker(
          point: const LatLng(25.78, 88.90),
          radius: 5000,
          useRadiusInMeter: true,
        ),
      ],
    ),
    const MarkerLayer(
      markers: [
        Marker(point: LatLng(25.78, 88.90), child: Icon(Icons.location_pin)),
      ],
    ),
  ],
)`,
  },

  // Week 6
  {
    id: 'w6-flutter-cli',
    week: 6,
    slide: 7,
    lang: 'bash',
    title: 'Everyday Flutter CLI commands',
    explain: 'Core commands to inspect dependencies, run in Chrome, clean stuck builds and release APKs.',
    code: `flutter doctor
flutter pub get
flutter pub add http
flutter devices
flutter run -d chrome
flutter analyze
dart format .
flutter clean && flutter pub get
flutter build apk`,
  },
  {
    id: 'w6-git-workflow',
    week: 6,
    slide: 10,
    lang: 'bash',
    title: 'Daily Git branch, commit & push workflow',
    explain: 'Configures identity, clones, creates a lab branch, commits and pushes cleanly.',
    code: `git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git clone <repo-url>
git switch -c lab6/220101
git status
git add .
git commit -m "Update theme primary color"
git push -u origin lab6/220101`,
  },
];
