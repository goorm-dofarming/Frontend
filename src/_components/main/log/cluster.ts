import { colorTheme } from '@/src/_styles/common/commonColorStyles';
import type { LayerProps } from 'react-map-gl';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      `${colorTheme.teritiary}`,
      0,
      `${colorTheme.teritiary}`,
      5,
      `${colorTheme.eighth}`,
      10,
      `${colorTheme.seventh}`,
      20,
      `${colorTheme.fifth}`,
      30,
      `${colorTheme.secondary}`,
      50,
      `${colorTheme.primary}`,
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': `${colorTheme.teritiary}`,
    'circle-radius': 7,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
};

export const clustererStyle = {
  styles: [
    {
      width: '40px',
      height: '40px',
      fontSize: '14px',
      background: 'rgba(241, 135, 139, .9)',
      borderRadius: '18px',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '40px',
      boxShadow: '0px 0px 5px 2px rgba(241, 135, 139, .9)',
    },
    {
      width: '52px',
      height: '52px',
      fontSize: '14px',
      background: 'rgba(243, 85, 92, .9)',
      borderRadius: '24px',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '52px',
      boxShadow: '0px 0px 5px 2px rgba(243, 85, 92, .9)',
    },
    {
      width: '60px',
      height: '60px',
      fontSize: '14px',
      background: 'rgba(237, 74, 81, .9)',
      borderRadius: '30px',
      color: '#fff',
      textAlign: 'center',
      lineHeight: '60px',
      boxShadow: '0px 0px 5px 2px rgba(237, 74, 81, .9)',
    },
  ],
  calculator: [10, 50],
}