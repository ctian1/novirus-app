import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import getUser from 'selectors/UserSelectors';
import Colors from 'helpers/Colors';
import BackgroundGeolocation from "react-native-background-geolocation";
import Url from '../../helpers/Url';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

function AuthHandler(props) {
  const user = useSelector(state => getUser(state));

  useEffect(() => {
    if (user !== null && user !== undefined) {
      props.navigation.navigate('App');
      BackgroundGeolocation.ready({
        // Geolocation Config
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 0,
        // Activity Recognition
        stationaryRadius: 0,
        autoSyncThreshold: 40,
        preventSuspend: true,
        stopTimeout: 5,
        // Application config
        debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
        startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
        // HTTP / SQLite config
        url: Url + '/track',
        batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
        autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
        autoSyncThreshold: 60,
        locationsOrderDirection: 'DESC',
        headers: {              // <-- Optional HTTP headers
          "X-FOO": "bar"
        },
        params: {               // <-- Optional HTTP params
          "auth_token": user === undefined ? 'error' : user.id
        }
      }, (state) => {
        console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
  
        if (!state.enabled) {
          ////
          // 3. Start tracking!
          //
          BackgroundGeolocation.start(function() {
            console.log("- Start success");
          });
        }
      });
      BackgroundGeolocation.onHttp((response) => {
        let status = response.status;
        let success = response.success;
        let responseText = response.responseText;
        console.log("[onHttp] ", response);
      });
    } else {
      props.navigation.navigate('Auth');
      BackgroundGeolocation.stop();
    }
  });

  return (
    <View style={styles.container} />
  );
}

AuthHandler.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AuthHandler;
