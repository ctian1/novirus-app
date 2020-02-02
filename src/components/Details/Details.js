import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';

import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import getUser from 'selectors/UserSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

function Details(props) {
  const user = useSelector(state => getUser(state));
  const getMessage = useCallback(() => `${strings.homeMessage} ${user && user.name}`, [user]);

  return (
    // <ScrollView style={styles.container}>
    //   <TouchableOpacity
    //     onPress={() => {
    //       props.navigation.navigate('Login')
    //     }}>
    //     <Card
    //       // title='Influenza'
    //       image={require('../../images/chipotle.png')}>
    //       <Text style={{fontSize: 18, fontWeight: '600', marginBottom:5}}>Influenza</Text>
    //       <Text>Possible contact 3 days ago</Text>
    //     </Card>
    //   </TouchableOpacity>
    //   <Card
    //     // title='Influenza'
    //     image={require('../../images/canes.png')}>
    //     <Text style={{fontSize: 18, fontWeight: '600', marginBottom:5}}>Coronavirus</Text>
    //     <Text>Possible contact 3 days ago</Text>
    //   </Card>
    <View
      style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 33.6497028,
          longitude: -117.8395963,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
          }}>
        <Marker
          coordinate={{
            latitude: 33.6497028,
            longitude: -117.8395963,
            }}/>
      </MapView>
      <View
        style={{flex: 1, padding: 20}}>
        <Text
          style={{fontSize: 24, flex: 4}}>
            {/* Reported by a user 2 days ago{'\n'}
            You were 10 meters away on January 24, 2020 */}
            You were about 10 meters away from someone with influenza on January 24, 2020. Someone reported this 2 days ago.
        </Text>
        <Text style={{fontSize:24, textDecorationLine: "underline", flex: 1, justifyContent: 'flex-end'}} onPress={() => {
          Linking.openURL("https://google.com")
        }}>Learn more about Influenza</Text>
      </View>
    </View>
    // </ScrollView>
  );
}

Details.navigationOptions = {
  title: 'Novirus',
};

Details.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Details;
