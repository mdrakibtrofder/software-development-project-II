import assert from 'node:assert/strict';
import {
  tilesAtZoom,
  decodeHexColor,
  parseEndpointUrl,
  buildUriHttps,
  classifyHttpStatus,
  COORDINATE_PLACES,
  PRECISION_GUIDE,
  ZOOM_LABELS,
  generateLayoutDart,
  LABS,
} from '../src/data/labs';
import { advanceGitStage } from '../src/components/sims/Week6Sims';

// 1. Tile counts at zoom (4^z)
assert.equal(tilesAtZoom(0), 1);
assert.equal(tilesAtZoom(5), 1024);
assert.equal(tilesAtZoom(10), 1048576);
assert.equal(tilesAtZoom(18), 68719476736);

// 2. ARGB hex colour decoder
const blue = decodeHexColor('0xFF2196F3');
assert.equal(blue.valid, true);
assert.equal(blue.alpha, 255);
assert.equal(blue.red, 33);
assert.equal(blue.green, 150);
assert.equal(blue.blue, 243);
assert.equal(blue.invisibleWarning, false);

const invisible = decodeHexColor('0x2196F3');
assert.equal(invisible.valid, true);
assert.equal(invisible.alpha, 0);
assert.equal(invisible.invisibleWarning, true);

const hashHex = decodeHexColor('#FF2196F3');
assert.equal(hashHex.valid, true);
assert.equal(hashHex.normalized, '0xFF2196F3');

// 3. Endpoint URL anatomy parser (Open-Meteo)
const parsed = parseEndpointUrl(
  'https://api.open-meteo.com/v1/forecast?latitude=25.78&longitude=88.90&current_weather=true'
);
assert.ok(parsed);
assert.equal(parsed.scheme, 'https');
assert.equal(parsed.host, 'api.open-meteo.com');
assert.equal(parsed.version, '/v1');
assert.equal(parsed.path, '/forecast');
assert.deepEqual(parsed.params, [
  { key: 'latitude', value: '25.78' },
  { key: 'longitude', value: '88.90' },
  { key: 'current_weather', value: 'true' },
]);

// 4. Uri.https builder
const built = buildUriHttps('jsonplaceholder.typicode.com', '/posts', {
  userId: '1',
  _limit: '5',
});
assert.equal(built, 'https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5');

// 5. HTTP status classification
assert.equal(classifyHttpStatus(200), 'success');
assert.equal(classifyHttpStatus(201), 'success');
assert.equal(classifyHttpStatus(400), 'client-error');
assert.equal(classifyHttpStatus(401), 'client-error');
assert.equal(classifyHttpStatus(404), 'client-error');
assert.equal(classifyHttpStatus(500), 'server-error');

// 6. Coordinate places & precision guide
assert.equal(COORDINATE_PLACES.length, 4);
assert.deepEqual(
  COORDINATE_PLACES.map((p) => p.name),
  ['Saidpur', 'Rangpur', 'Dhaka', "Cox's Bazar"]
);
assert.equal(PRECISION_GUIDE[0].approx, '1 km');
assert.equal(PRECISION_GUIDE[1].approx, '11 m');
assert.equal(PRECISION_GUIDE[2].approx, '10 cm');
assert.equal(ZOOM_LABELS.length, 6);

// 7. Layout Dart generator
const rowCode = generateLayoutDart({
  axis: 'Row',
  mainAxis: 'spaceBetween',
  crossAxis: 'center',
  useExpanded: true,
  useGap: true,
});
assert.ok(rowCode.includes('Row('));
assert.ok(rowCode.includes('MainAxisAlignment.spaceBetween'));
assert.ok(rowCode.includes('Expanded(child: _box(Colors.indigo, "B"))'));
assert.ok(rowCode.includes('const SizedBox(width: 16)'));

// 8. Git four-places state machine
let stage = advanceGitStage('working', 'commit'); // skipped add -> unchanged
assert.equal(stage, 'working');
stage = advanceGitStage('working', 'add');
assert.equal(stage, 'staged');
stage = advanceGitStage(stage, 'push'); // skipped commit -> unchanged
assert.equal(stage, 'staged');
stage = advanceGitStage(stage, 'commit');
assert.equal(stage, 'committed');
stage = advanceGitStage(stage, 'push');
assert.equal(stage, 'pushed');

// 9. Total simulation labs
assert.equal(LABS.length, 20);

console.log('✓ All labs-fixtures tests passed (9 test groups verified).');
