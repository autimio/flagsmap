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
    id: 'brasil',
    coordinates: [-49.286041, -16.665136],
    image: Flag['brasil'],
  },
  {
    id: 'colombia',
    coordinates: [-73.0810547, 4914894],
    image: Flag['colombia'],
  },
  {
    id: 'africadosul',
    coordinates: [24.2578125, -30.9022247],
    image: Flag['africadosul'],
  },
];

const BACKGROUND_TIMER_INTERVAL = 30000; // three minutes

function Home() {
  const [images, setImages] = useState({});
  const [shape, setShape] = useState({ features: [], type: 'FeatureCollection' });

  function onHandlePressShape() {
    alert('pressed');
  }

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(async () => {
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

    function onMountFeatures() {
      let imagesIcon = {};
      let features = [...shape.features];
      let propertiesIds = _.pluck(features, 'properties');
      let featuresIds = _.pluck(propertiesIds, 'id');

      function addShape(items) {
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

      addShape(SHAPES);
    }
    onMountFeatures();
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