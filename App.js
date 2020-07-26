import React, {useState, useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import BackgroundTimer from 'react-native-background-timer';

import _ from 'underscore';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXV0aW1pbyIsImEiOiJja2F0MnZtdjAwZGNqMnhucm9zZDRib3diIn0.BP7QhaCLplGE_Y09tF7qAQ',
);

function App() {
  const [images, setImages] = useState({});
  const [shape, setShape] = useState({features: [], type: 'FeatureCollection'});

  function onHandlePressShape() {
    alert('cliquei aqui');
  }

  useEffect(() => {
    BackgroundTimer.runBackgroundTimer(() => {
      console.log('test call in background....');
    }, 3000);

    BackgroundTimer.stopBackgroundTimer();
  }, []);

  useEffect(() => {
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

        setShape({type: 'FeatureCollection', features});
        setImages(imagesIcon);
      }

      addShape([
        {
          id: 'islandia',
          coordinates: [-101.3818359, 39.7747695],
          image:
            'https://www.sogeografia.com.br/figuras/bandeiras/america/mini/estadosunidos.jpg',
        },
        {
          id: 'brasil',
          coordinates: [-49.286041, -16.665136],
          image:
            'https://www.sogeografia.com.br/figuras/bandeiras/america/mini/brasil.jpg',
        },
        {
          id: 'colombia',
          coordinates: [-73.0810547, 4914894],
          image:
            'https://www.sogeografia.com.br/figuras/bandeiras/america/mini/colombia.jpg',
        },
        {
          id: 'africa do sul',
          coordinates: [24.2578125, -30.9022247],
          image:
            'https://www.sogeografia.com.br/figuras/bandeiras/africa/mini/africadosul.jpg',
        },
      ]);
    }
    onMountFeatures();
  }, []);

  return (
    <MapboxGL.MapView style={{flex: 1}} styleURL={MapboxGL.StyleURL.Dark}>
      <MapboxGL.Camera centerCoordinate={[-10, -5]} zoomLevel={0.5} />
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

export default App;
