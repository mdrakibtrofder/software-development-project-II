import React from 'react';
import {
  FlutterDoctorSim,
  InstallCheckerSim,
  FlutterArchSim,
  DartNullSafetySim,
} from './Week1Sims';
import { WidgetTreeSim, StateLabSim, NavigationSim } from './Week2Sims';
import { LayoutLabSim, ContainerBoxSim, ColorLabSim, ListViewSim } from './Week3Sims';
import { UrlAnatomySim, HttpLabSim, FutureStatesSim, JsonModelSim } from './Week4Sims';
import { LatLngZoomSim, WeatherChainSim, MapLayersSim } from './Week5Sims';
import { ShortcutsSim, GitLabSim } from './Week6Sims';
import type { BookmarkItem } from '../../state/useStudyStore';

interface SimRendererProps {
  labId: string;
  onComplete?: () => void;
  isCompleted?: boolean;
  onNavigate?: (to: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (item: BookmarkItem) => void;
}

export const SimRenderer: React.FC<SimRendererProps> = ({ labId, ...rest }) => {
  switch (labId) {
    case 'flutter-doctor':
      return <FlutterDoctorSim {...rest} />;
    case 'install-checker':
      return <InstallCheckerSim {...rest} />;
    case 'flutter-arch':
      return <FlutterArchSim {...rest} />;
    case 'dart-null-safety':
      return <DartNullSafetySim {...rest} />;
    case 'widget-tree':
      return <WidgetTreeSim {...rest} />;
    case 'state-lab':
      return <StateLabSim {...rest} />;
    case 'navigation':
      return <NavigationSim {...rest} />;
    case 'layout-lab':
      return <LayoutLabSim {...rest} />;
    case 'container-box':
      return <ContainerBoxSim {...rest} />;
    case 'color-lab':
      return <ColorLabSim {...rest} />;
    case 'listview':
      return <ListViewSim {...rest} />;
    case 'url-anatomy':
      return <UrlAnatomySim {...rest} />;
    case 'http-lab':
      return <HttpLabSim {...rest} />;
    case 'future-states':
      return <FutureStatesSim {...rest} />;
    case 'json-model':
      return <JsonModelSim {...rest} />;
    case 'latlng-zoom':
      return <LatLngZoomSim {...rest} />;
    case 'weather-chain':
      return <WeatherChainSim {...rest} />;
    case 'map-layers':
      return <MapLayersSim {...rest} />;
    case 'shortcuts':
      return <ShortcutsSim {...rest} />;
    case 'git-lab':
      return <GitLabSim {...rest} />;
    default:
      return (
        <div className="p-6 rounded-2xl border border-[var(--border)] text-sm text-[var(--text-muted)]">
          Simulation "{labId}" not found.
        </div>
      );
  }
};
