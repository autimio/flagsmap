import React, { useState, useEffect } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BackgroundTimer from 'react-native-background-timer';

import { getCurrentPosition } from '../../utils/Geolocation';
import { requestLocationPermission } from '../../utils/Permission';

import Storage from '../../utils/Storage';
import Flag from '../../utils/Flag';

import _ from 'underscore';

MapboxGL.setAccessToken('pk.eyJ1IjoiYXV0aW1pbyIsImEiOiJja2F0MnZtdjAwZGNqMnhucm9zZDRib3diIn0.BP7QhaCLplGE_Y09tF7qAQ');

const SHAPES = [
  {
    id: 'africadosul',
    coordinates: [24.2578125, -30.9022247],
    image: Flag['africadosul'],
  },
  {
    id: 'alemanha',
    coordinates: [10.331446, 50.878857],
    image: Flag['alemanha'],
  },
  {
    id: 'angola',
    coordinates: [17.23086, -12.731319],
    image: Flag['angola'],
  },
  {
    id: 'argentina',
    coordinates: [-66.792576, -37.774956],
    image: Flag['argentina'],
  },
  {
    id: 'australia',
    coordinates: [133.487772, -25.939486],
    image: Flag['australia'],
  },
  {
    id: 'brasil',
    coordinates: [-49.286041, -16.665136],
    image: Flag['brasil'],
  },
  {
    id: 'canada',
    coordinates: [-106.636789, 58.600234],
    image: Flag['canada'],
  },
  {
    id: 'china',
    coordinates: [103.509698, 33.308356],
    image: Flag['china'],
  },
  {
    id: 'colombia',
    coordinates: [-73.0810547, 4914894],
    image: Flag['colombia'],
  },
  {
    id: 'costadomarfim',
    coordinates: [-5.826243, 6.256163],
    image: Flag['costadomarfim'],
  },
  {
    id: 'egito',
    coordinates: [29.50579, 25.58788],
    image: Flag['egito'],
  },
  {
    id: 'estadosunidos',
    coordinates: [-99.166085, 37.601914],
    image: Flag['estadosunidos'],
  },
  {
    id: 'gana',
    coordinates: [-1.168039, 8.86971],
    image: Flag['gana'],
  },
  {
    id: 'india',
    coordinates: [77.739021, 16.512119],
    image: Flag['india'],
  },
  {
    id: 'islandia',
    coordinates: [-17.885978, 64.492751],
    image: Flag['islandia'],
  },
  {
    id: 'madagascar',
    coordinates: [46.468681, -19.367279],
    image: Flag['madagascar'],
  },
  {
    id: 'marrocos',
    coordinates: [-8.989079, 30.482828],
    image: Flag['marrocos'],
  },
  {
    id: 'portugal',
    coordinates: [-8.110173, 41.042958],
    image: Flag['portugal'],
  },
  {
    id: 'russia',
    coordinates: [92.944098, 63.608276],
    image: Flag['russia'],
  },
  {
    id: 'suica',
    coordinates: [8.037038, 46.894121],
    image: Flag['suica'],
  },
  {
    id: 'turquia',
    coordinates: [37.104284, 39.17207],
    image: Flag['turquia'],
  },
];

const BACKGROUND_TIMER_INTERVAL = 30000; // three minutes

function Home() {
  const [images, setImages] = useState({});
  const [shape, setShape] = useState({ features: [], type: 'FeatureCollection' });

  function onHandlePressShape() {
    alert('pressed');
  }

  function onMountFeatures(items) {
    const imagesIcon = {};
    const features = [...shape.features];
    const propertiesIds = _.pluck(features, 'properties');
    const featuresIds = _.pluck(propertiesIds, 'id');

    items.map((item) => {
      if (!_.contains(featuresIds, item.id)) {
        imagesIcon[item.id] = item.image;
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: item.coordinates,
          },
          properties: {
            id: item.id,
            icon: item.id,
            showPin: true,
          },
        });
      }
    });

    setShape({ type: 'FeatureCollection', features });
    setImages(imagesIcon);
  }

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(async () => {
      await Storage.removeItem('@locations');
      let locations = await Storage.getItem('@locations', true);

      const location = await getCurrentPosition();

      if (!locations) locations = [];

      locations.push(location);

      await Storage.setItem('@locations', locations);
    }, BACKGROUND_TIMER_INTERVAL);

    BackgroundTimer.stopBackgroundTimer();
  }, []);

  useEffect(() => {
    async function checkPermission() {
      const grantedLocation = await requestLocationPermission();
      if (!grantedLocation && _.isEqual('android', Platform.OS)) {
        alert('É necessário habilitar as permissões de geolocalização na configuração do seus dispositivo.');
      }
    }

    checkPermission();
    onMountFeatures(SHAPES);
  }, []);

  return (
    <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Dark}>
      <MapboxGL.Camera centerCoordinate={[-25, -5]} zoomLevel={0.5} />
      <MapboxGL.Images images={images} />
      <MapboxGL.ShapeSource
        id="shapeSourceDefault"
        onPress={onHandlePressShape}
        clusterRadius={10}
        clusterMaxZoomLevel={8}
        cluster={true}
        shape={shape}>
        <MapboxGL.SymbolLayer
          id="{id}"
          minZoomLevel={0}
          style={{
            iconImage: ['get', 'icon'],
            iconOptional: true,
            iconAllowOverlap: true,
            iconSize: 0.5,
          }}
        />
      </MapboxGL.ShapeSource>
    </MapboxGL.MapView>
  );
}

export default Home;
