import React, { useState } from 'react';
import { MapPin, ArrowLeftRight, CloudSun, Layers } from 'lucide-react';
import { SimWrapper } from './SimWrapper';
import {
  COORDINATE_PLACES,
  PRECISION_GUIDE,
  ZOOM_LABELS,
  tilesAtZoom,
} from '../../data/labs';
import type { BookmarkItem } from '../../state/useStudyStore';

interface CommonSimProps {
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

/* 16. latlng-zoom: Latitude, Longitude and Zoom */
export const LatLngZoomSim: React.FC<CommonSimProps> = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [decimals, setDecimals] = useState<2 | 4 | 6>(2);
  const [zoom, setZoom] = useState(13);

  const place = COORDINATE_PLACES[selectedPlace];
  const latShown = swapped ? place.lng : place.lat;
  const lngShown = swapped ? place.lat : place.lng;
  const latInvalid = latShown > 90 || latShown < -90;
  const tileCount = tilesAtZoom(zoom);
  const precInfo = PRECISION_GUIDE.find((p) => p.decimals === decimals) || PRECISION_GUIDE[0];

  const zoomLabel =
    [...ZOOM_LABELS].reverse().find((z) => zoom >= z.z)?.label || 'World';

  // Project lat/lng onto schematic 360x180 SVG grid
  const mapX = ((lngShown + 180) / 360) * 320 + 20;
  const mapY = ((90 - Math.max(-90, Math.min(90, latShown))) / 180) * 140 + 20;

  return (
    <SimWrapper
      labId="latlng-zoom"
      caption={
        swapped
          ? `Swapped LatLng(${latShown.toFixed(decimals)}, ${lngShown.toFixed(decimals)}) ${
              latInvalid ? 'exceeds ±90° latitude!' : 'lands in the wrong part of the world!'
            } Order is ALWAYS (latitude, longitude).`
          : `${place.name}: LatLng(${place.lat.toFixed(decimals)}, ${place.lng.toFixed(decimals)}) · Precision ≈ ${precInfo.approx} · Zoom ${zoom} (${zoomLabel}) = ${tileCount.toLocaleString()} tiles.`
      }
      onReset={() => {
        setSelectedPlace(0);
        setSwapped(false);
        setDecimals(2);
        setZoom(13);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Schematic World Grid */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {COORDINATE_PLACES.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setSelectedPlace(idx);
                  setSwapped(false);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                  selectedPlace === idx
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-[var(--surface)] border-[var(--border)]'
                }`}
              >
                {p.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSwapped((s) => !s)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ml-auto ${
                swapped
                  ? 'bg-[var(--state-bad)] text-[var(--danger)] border-red-500'
                  : 'bg-[var(--surface-2)] border-[var(--border)]'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {swapped ? 'Swapped (lng, lat)' : 'Swap them!'}
            </button>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/50 p-2">
            <svg viewBox="0 0 360 180" className="w-full h-44" role="img" aria-label="Schematic latitude and longitude grid">
              {/* Grid lines */}
              <line x1="20" y1="90" x2="340" y2="90" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="180" y1="20" x2="180" y2="160" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="20" y="20" width="320" height="140" fill="none" stroke="var(--border)" strokeWidth="1" />
              <text x="24" y="86" fontSize="8" fill="var(--text-muted)">Equator (0° lat)</text>
              <text x="184" y="30" fontSize="8" fill="var(--text-muted)">Prime Meridian (0° lng)</text>
              <text x="20" y="173" fontSize="8" fill="var(--text-muted)">−180°</text>
              <text x="322" y="173" fontSize="8" fill="var(--text-muted)">+180°</text>

              {/* Pin */}
              <circle
                cx={mapX}
                cy={mapY}
                r="6"
                fill={swapped ? '#DC2626' : '#14B8A6'}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text x={Math.min(265, mapX + 8)} y={mapY + 3} fontSize="9" fontWeight="bold" fill="var(--text)">
                {swapped ? `(${latShown}, ${lngShown}) WRONG` : place.name}
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-[var(--text-muted)]">Precision:</span>
            {PRECISION_GUIDE.map((p) => (
              <button
                key={p.decimals}
                type="button"
                onClick={() => setDecimals(p.decimals)}
                className={`px-2.5 py-1 rounded-lg border font-mono ${
                  decimals === p.decimals
                    ? 'border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)] font-bold'
                    : 'border-[var(--border)] bg-[var(--surface)]'
                }`}
              >
                {p.decimals} dec (≈ {p.approx})
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Slider & 4^z Tile Readout */}
        <div className="lg:col-span-6 space-y-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text)]">Zoom Level & 4^z Tiles</span>
            <span className="font-mono text-xs font-bold text-[var(--primary)]">
              z = {zoom} · {zoomLabel}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={18}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            aria-label="Map zoom level"
            className="w-full accent-[var(--primary)]"
          />

          <div className="flex justify-between font-mono text-[10px] text-[var(--text-muted)]">
            <span>0 World</span>
            <span>6 Country</span>
            <span>10 City</span>
            <span>14 Streets</span>
            <span>18 Buildings</span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="text-[11px] text-[var(--text-muted)] font-mono">
              Total world tiles at zoom {zoom} (4^{zoom})
            </div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold tabular-nums text-[var(--text)] mt-0.5">
              {tileCount.toLocaleString()}
            </div>
          </div>

          <pre className="rounded-xl bg-[#0F172A] text-sky-300 p-3 font-mono text-[11px] overflow-x-auto m-0">
{`MapOptions(
  initialCenter: LatLng(${place.lat.toFixed(decimals)}, ${place.lng.toFixed(decimals)}),
  initialZoom: ${zoom},
  minZoom: 3, maxZoom: 18,
)`}
          </pre>
        </div>
      </div>
    </SimWrapper>
  );
};

/* 17. weather-chain: City -> Coordinates -> Weather */
const MOCK_CITIES: Record<string, { lat: number; lng: number; temp: number; wind: number }> = {
  Saidpur: { lat: 25.78, lng: 88.90, temp: 26.4, wind: 7.9 },
  Rangpur: { lat: 25.74, lng: 89.25, temp: 25.8, wind: 6.4 },
  Dhaka: { lat: 23.81, lng: 90.41, temp: 28.1, wind: 9.2 },
  "Cox's Bazar": { lat: 21.43, lng: 92.01, temp: 29.3, wind: 14.5 },
};

export const WeatherChainSim: React.FC<CommonSimProps> = (props) => {
  const [city, setCity] = useState<string>('Rangpur');
  const [step, setStep] = useState(0);

  const info = MOCK_CITIES[city] || MOCK_CITIES.Rangpur;

  const stepCaptions = [
    `Step 1: Geocoding request looks up "${city}" on geocoding-api.open-meteo.com/v1/search`,
    `Step 2: Forecast request uses (${info.lat}, ${info.lng}) to fetch current temperature_2m`,
    `Step 3: Plot Marker on flutter_map showing ${info.temp}°C for ${city} (illustration)`,
  ];

  return (
    <SimWrapper
      labId="weather-chain"
      caption={stepCaptions[step]}
      step={step}
      totalSteps={3}
      onStepChange={setStep}
      onReset={() => {
        setCity('Rangpur');
        setStep(0);
      }}
      {...props}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(MOCK_CITIES).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCity(c);
                setStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                city === c ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-[var(--surface)] border-[var(--border)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          Illustration; real values vary
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setStep(0)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            step === 0 ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface-2)]/40'
          }`}
        >
          <div className="font-mono text-[11px] font-bold text-[var(--primary)]">1. Geocoding API</div>
          <div className="font-mono text-[11px] mt-1 break-all text-[var(--text)]">
            /v1/search?name={encodeURIComponent(city)}&count=1
          </div>
          <div className="mt-2 p-2 rounded-lg bg-[#0F172A] text-emerald-300 font-mono text-[11px]">
            lat: {info.lat}, lng: {info.lng}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStep(1)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            step === 1 ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface-2)]/40'
          }`}
        >
          <div className="font-mono text-[11px] font-bold text-[var(--primary)]">2. Forecast API</div>
          <div className="font-mono text-[11px] mt-1 break-all text-[var(--text)]">
            /v1/forecast?latitude={info.lat}&longitude={info.lng}&current=temperature_2m
          </div>
          <div className="mt-2 p-2 rounded-lg bg-[#0F172A] text-sky-300 font-mono text-[11px]">
            temperature_2m: {info.temp} °C
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className={`p-3.5 rounded-xl border text-left transition-colors ${
            step === 2 ? 'border-[var(--primary)] bg-[var(--primary-soft)]' : 'border-[var(--border)] bg-[var(--surface-2)]/40'
          }`}
        >
          <div className="font-mono text-[11px] font-bold text-[var(--primary)]">3. Map Marker</div>
          <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <CloudSun className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <div className="font-bold text-sm text-[var(--text)]">{city}</div>
              <div className="font-mono text-xs text-teal-600 dark:text-teal-400">
                {info.temp}°C · Wind {info.wind} km/h
              </div>
            </div>
          </div>
        </button>
      </div>
      <p className="text-[11px] text-[var(--text-muted)] mt-2.5">
        Note: Open-Meteo snaps requested coordinates to the nearest weather model grid point.
      </p>
    </SimWrapper>
  );
};

/* 18. map-layers: Layers, Markers and Polylines */
export const MapLayersSim: React.FC<CommonSimProps> = (props) => {
  const [showTile, setShowTile] = useState(true);
  const [showPoly, setShowPoly] = useState(true);
  const [showCircle, setShowCircle] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [useMeters, setUseMeters] = useState(true);
  const [zoom, setZoom] = useState(11);
  const [pkgCompare, setPkgCompare] = useState<'flutter_map' | 'google'>('flutter_map');

  const circlePx = useMeters ? Math.max(8, Math.round((zoom - 4) * 5)) : 28;

  return (
    <SimWrapper
      labId="map-layers"
      caption="Layer stack bottom-to-top: TileLayer → PolylineLayer → CircleLayer → MarkerLayer (markers sit on top)."
      onReset={() => {
        setShowTile(true);
        setShowPoly(true);
        setShowCircle(true);
        setShowMarkers(true);
        setUseMeters(true);
        setZoom(11);
      }}
      {...props}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Layer Stack Controls */}
        <div className="lg:col-span-5 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[var(--text)] mb-1">
            <Layers className="w-4 h-4 text-[var(--primary)]" />
            Layer Stack (top draws last)
          </div>

          {[
            { label: '4. MarkerLayer (top — cities)', checked: showMarkers, set: setShowMarkers },
            { label: '3. CircleLayer (5,000 m radius)', checked: showCircle, set: setShowCircle },
            { label: '2. PolylineLayer (Saidpur → Rangpur → Dhaka)', checked: showPoly, set: setShowPoly },
            { label: '1. TileLayer (bottom — OpenStreetMap)', checked: showTile, set: setShowTile },
          ].map((l) => (
            <label key={l.label} className="flex items-center gap-2 p-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)]/40 cursor-pointer">
              <input type="checkbox" checked={l.checked} onChange={(e) => l.set(e.target.checked)} className="accent-[var(--primary)]" />
              <span className="font-mono text-[11px]">{l.label}</span>
            </label>
          ))}

          <label className="flex items-center gap-2 pt-1 cursor-pointer font-semibold">
            <input type="checkbox" checked={useMeters} onChange={(e) => setUseMeters(e.target.checked)} className="accent-teal-600" />
            <code>useRadiusInMeter: true</code> (scales with zoom)
          </label>

          <label className="block pt-1">
            <div className="flex justify-between font-mono mb-1">
              <span>Zoom level</span>
              <span>z = {zoom}</span>
            </div>
            <input type="range" min={6} max={15} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
          </label>
        </div>

        {/* Stylised Bangladesh Map Canvas */}
        <div className="lg:col-span-7 space-y-3">
          <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-slate-100 dark:bg-slate-900">
            <svg viewBox="0 0 360 210" className="w-full h-52" role="img" aria-label="Stylised Bangladesh map layers">
              {showTile && (
                <g opacity="0.55">
                  <rect width="360" height="210" fill="var(--surface-2)" />
                  {[60, 120, 180, 240, 300].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="210" stroke="var(--border)" strokeWidth="1" />
                  ))}
                  {[52, 105, 158].map((y) => (
                    <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="var(--border)" strokeWidth="1" />
                  ))}
                  <path
                    d="M120,25 L210,35 L250,95 L235,175 L195,185 L155,165 L110,120 Z"
                    fill="var(--primary-soft)"
                    stroke="var(--primary)"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                  />
                </g>
              )}

              {showPoly && (
                <polyline
                  points="135,55 160,62 200,125"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {showCircle && (
                <circle
                  cx="135"
                  cy="55"
                  r={circlePx}
                  fill="rgba(20, 184, 166, 0.2)"
                  stroke="#14B8A6"
                  strokeWidth="2"
                />
              )}

              {showMarkers && (
                <g fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
                  <circle cx="135" cy="55" r="5" fill="#4F46E5" />
                  <text x="72" y="48" fill="var(--text)">Saidpur 26.4°C</text>
                  <circle cx="160" cy="62" r="5" fill="#4F46E5" />
                  <text x="168" y="64" fill="var(--text)">Rangpur 25.8°C</text>
                  <circle cx="200" cy="125" r="5" fill="#4F46E5" />
                  <text x="208" y="128" fill="var(--text)">Dhaka 28.1°C</text>
                </g>
              )}
            </svg>
          </div>

          {/* Package Comparison */}
          <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40 text-xs">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="font-bold">Package Comparison:</span>
              <button
                type="button"
                onClick={() => setPkgCompare('flutter_map')}
                className={`px-2 py-0.5 rounded font-mono ${pkgCompare === 'flutter_map' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)]'}`}
              >
                flutter_map (W5)
              </button>
              <button
                type="button"
                onClick={() => setPkgCompare('google')}
                className={`px-2 py-0.5 rounded font-mono ${pkgCompare === 'google' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--surface)]'}`}
              >
                google_maps_flutter (W2)
              </button>
            </div>
            {pkgCompare === 'flutter_map' ? (
              <p className="text-[var(--text-muted)]">
                Uses OpenStreetMap tiles, requires <strong>no API key</strong>, runs directly in Chrome (<code className="font-mono">flutter run -d chrome</code>). Add <code className="font-mono">RichAttributionWidget</code> in production.
              </p>
            ) : (
              <p className="text-[var(--text-muted)]">
                Needs a Google Cloud API key in <code className="font-mono">AndroidManifest.xml</code> / <code className="font-mono">AppDelegate.swift</code>, <code className="font-mono">minSdk 21</code>, and a full restart. Never commit your key; restrict it by package name.
              </p>
            )}
          </div>
        </div>
      </div>
    </SimWrapper>
  );
};
