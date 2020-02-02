import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './components/navigation';
import Colors from './helpers/Colors';
import { store, persist } from './reducers';
// import MapboxGL from "@react-native-mapbox-gl/maps";
    // BackgroundGeolocation.onLocation(this.onLocation, this.onError);

// MapboxGL.setAccessToken("sk.eyJ1IjoiY3RpYW4xIiwiYSI6ImNrNjNmM3RvMDA1bzkzbmx3emlreHYzaWQifQ.WcM2--jYUE1eHlj9UtXMTA");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    persist(() => {
      setReady(true);
    });
  });

  const loading = (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );

  const loaded = (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );

  return ready ? loaded : loading;
}
