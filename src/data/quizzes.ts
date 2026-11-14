export interface WeekQuizQuestion {
  id: string;
  q: string;
  options: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explain: string;
}

export const WEEK_QUIZZES: Record<number, WeekQuizQuestion[]> = {
  1: [
    {
      id: 'w1-q1',
      q: 'Which build mode makes hot reload possible?',
      options: ['AOT', 'JIT (debug)', 'Release', 'Profile only'],
      answerIndex: 1,
      explain: 'Debug builds run in the Dart VM with JIT.',
    },
    {
      id: 'w1-q2',
      q: 'Where should the Flutter SDK be unzipped on Windows?',
      options: ['C:\\Program Files\\flutter', 'C:\\src\\flutter', 'C:\\Users\\My Name\\flutter', 'Desktop'],
      answerIndex: 1,
      explain: 'Use a short path without spaces.',
    },
    {
      id: 'w1-q3',
      q: 'flutter doctor says "cmdline-tools component is missing". Fix?',
      options: [
        'Tick Android SDK Command-line Tools in SDK Manager',
        'Reinstall Windows',
        'Delete pubspec.yaml',
        'Run flutter clean',
      ],
      answerIndex: 0,
      explain: 'Install it from SDK Manager ▸ SDK Tools.',
    },
    {
      id: 'w1-q4',
      q: 'What does String? name mean?',
      options: ['name is a constant', 'name is private', 'name may be null', 'name is a list'],
      answerIndex: 2,
      explain: 'The ? allows null.',
    },
    {
      id: 'w1-q5',
      q: 'Which keyword does the course prefer by default?',
      options: ['var', 'final', 'dynamic', 'late'],
      answerIndex: 1,
      explain: 'Final by default, const for literals, var only when you reassign.',
    },
  ],
  2: [
    {
      id: 'w2-q1',
      q: 'Which widget has changing data and calls setState?',
      options: ['StatelessWidget', 'StatefulWidget', 'Container', 'Scaffold'],
      answerIndex: 1,
      explain: 'Stateful widgets own mutable state.',
    },
    {
      id: 'w2-q2',
      q: 'Which switches content inside one screen?',
      options: ['Navigator.push', 'BottomNavigationBar', 'MaterialPageRoute', 'runApp'],
      answerIndex: 1,
      explain: 'Bars, tabs and drawers change the body; push adds a new screen.',
    },
    {
      id: 'w2-q3',
      q: "Where should a FutureBuilder's Future be created?",
      options: ['Inside build', 'Once in initState', 'Inside onPressed only', 'In main()'],
      answerIndex: 1,
      explain: 'Creating it in build refetches on every rebuild.',
    },
    {
      id: 'w2-q4',
      q: 'What must you NOT commit to GitHub?',
      options: ['main.dart', 'pubspec.yaml', 'Your Maps API key', 'README.md'],
      answerIndex: 2,
      explain: 'Keep secrets out of the repository.',
    },
    {
      id: 'w2-q5',
      q: 'Which package provides GoogleMap?',
      options: ['http', 'google_maps_flutter', 'flutter_map', 'provider'],
      answerIndex: 1,
      explain: 'Needs a Google Cloud API key.',
    },
  ],
  3: [
    {
      id: 'w3-q1',
      q: 'In Color(0xFF2196F3), what does FF mean?',
      options: ['Alpha (fully opaque)', 'Red', 'Green', 'Blue'],
      answerIndex: 0,
      explain: 'Alpha comes first in 0xAARRGGBB.',
    },
    {
      id: 'w3-q2',
      q: 'Why does Color(0x2196F3) look invisible?',
      options: ['Wrong blue', 'Needs const', 'Its alpha is 00', 'Flutter ignores it'],
      answerIndex: 2,
      explain: 'Missing the leading FF makes it transparent.',
    },
    {
      id: 'w3-q3',
      q: 'Which builds only the visible list rows?',
      options: ['ListView(children:)', 'ListView.builder', 'Column', 'Stack'],
      answerIndex: 1,
      explain: 'The builder is lazy.',
    },
    {
      id: 'w3-q4',
      q: 'What does setState() do?',
      options: [
        'Marks the widget dirty so build() runs again',
        'Saves to disk',
        'Opens a screen',
        'Changes the theme',
      ],
      answerIndex: 0,
      explain: 'It triggers a rebuild.',
    },
    {
      id: 'w3-q5',
      q: 'Which widget lays children out vertically?',
      options: ['Row', 'Column', 'Stack', 'Center'],
      answerIndex: 1,
      explain: "Column's main axis is vertical.",
    },
  ],
  4: [
    {
      id: 'w4-q1',
      q: 'Which method reads data without changing it?',
      options: ['GET', 'POST', 'DELETE', 'PUT'],
      answerIndex: 0,
      explain: 'GET only reads.',
    },
    {
      id: 'w4-q2',
      q: 'A 404 response means…',
      options: ['Success', 'Server crashed', 'Resource not found', 'Created'],
      answerIndex: 2,
      explain: '4xx means your request was wrong.',
    },
    {
      id: 'w4-q3',
      q: 'In /v1/forecast?latitude=23.81, what is /v1?',
      options: ['Query', 'Host', 'API version', 'Scheme'],
      answerIndex: 2,
      explain: 'It versions the API so apps keep working.',
    },
    {
      id: 'w4-q4',
      q: 'What do Uri.https query values need to be?',
      options: ['Integers', 'Strings', 'Booleans', 'Lists'],
      answerIndex: 1,
      explain: "Write '1', not 1.",
    },
    {
      id: 'w4-q5',
      q: 'Which check comes before jsonDecode in the fetch recipe?',
      options: ['Add the package', 'response.statusCode == 200', 'hot restart', 'flutter clean'],
      answerIndex: 1,
      explain: 'Only decode a successful response.',
    },
  ],
  5: [
    {
      id: 'w5-q1',
      q: 'What is the correct order of a LatLng?',
      options: ['(lng, lat)', '(lat, lng)', '(x, y)', '(zoom, lat)'],
      answerIndex: 1,
      explain: 'Always latitude first.',
    },
    {
      id: 'w5-q2',
      q: 'How many tiles does zoom level 3 have, by 4^z?',
      options: ['12', '16', '64', '81'],
      answerIndex: 2,
      explain: '4³ = 64.',
    },
    {
      id: 'w5-q3',
      q: "Which API gives a city's coordinates?",
      options: ['Forecast endpoint', 'Open-Meteo geocoding', 'flutter_map', 'jsonDecode'],
      answerIndex: 1,
      explain: 'The geocoding search returns latitude and longitude.',
    },
    {
      id: 'w5-q4',
      q: 'Which layer draws a line through points in order?',
      options: ['MarkerLayer', 'PolylineLayer', 'TileLayer', 'CircleLayer'],
      answerIndex: 1,
      explain: 'A Polyline connects points in sequence.',
    },
    {
      id: 'w5-q5',
      q: 'What does useRadiusInMeter: true do?',
      options: ['Hides the circle', 'Makes the circle scale with zoom', 'Colours it blue', 'Adds a marker'],
      answerIndex: 1,
      explain: 'The radius is in real metres.',
    },
  ],
  6: [
    {
      id: 'w6-q1',
      q: 'Which shortcut searches all files?',
      options: ['Ctrl+F', 'Ctrl+P', 'Ctrl+Shift+F', 'Ctrl+G'],
      answerIndex: 2,
      explain: 'Global search.',
    },
    {
      id: 'w6-q2',
      q: 'Which command saves a snapshot locally?',
      options: ['git push', 'git commit', 'git clone', 'git pull'],
      answerIndex: 1,
      explain: 'Commit writes to the local repository.',
    },
    {
      id: 'w6-q3',
      q: 'Which file stops build/ being tracked?',
      options: ['pubspec.yaml', 'README.md', '.gitignore', 'main.dart'],
      answerIndex: 2,
      explain: 'List ignored paths there.',
    },
    {
      id: 'w6-q4',
      q: 'What creates and switches to a new branch?',
      options: ['git branch -d', 'git merge', 'git switch -c', 'git restore'],
      answerIndex: 2,
      explain: 'git switch -c lab6/<roll>.',
    },
    {
      id: 'w6-q5',
      q: 'Which merge-conflict option keeps both edits?',
      options: ['Accept Current', 'Accept Incoming', 'Accept Both', 'Discard'],
      answerIndex: 2,
      explain: 'Then save, git add, git commit.',
    },
  ],
};
