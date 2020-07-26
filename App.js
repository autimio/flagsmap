/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import {StyleSheet, View} from 'react-native';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYXV0aW1pbyIsImEiOiJja2F0MnZtdjAwZGNqMnhucm9zZDRib3diIn0.BP7QhaCLplGE_Y09tF7qAQ',
);

MapboxGL.setConnected(true);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

function App() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default App;
