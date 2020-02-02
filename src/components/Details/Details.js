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
import moment from 'moment';

function titleCase(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

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
          latitude: props.navigation.getParam('virus').coords[0],
          longitude: props.navigation.getParam('virus').coords[1],
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
          }}>
        <Marker
          coordinate={{
            latitude: props.navigation.getParam('virus').coords[0],
            longitude: props.navigation.getParam('virus').coords[1],
            }}/>
      </MapView>
      <View
        style={{flex: 1, padding: 20}}>
        <Text
          style={{fontSize: 18, flex: 4}}>
            {/* Reported by a user 2 days ago{'\n'}
            You were 10 meters away on January 24, 2020 */}
            You were about {props.navigation.getParam('virus').distance} meters away from someone with {props.navigation.getParam('virus').disease} on {moment.unix(props.navigation.getParam('virus').time_met).format("MMMM Do YYYY")}. Someone reported this {moment.unix(props.navigation.getParam('virus').time_reported).fromNow()}.
        </Text>
        <Text style={{fontSize:18, textDecorationLine: "underline", flex: 1, justifyContent: 'flex-end'}} onPress={() => {
          Linking.openURL("https://google.com")
        }}>Learn more about {props.navigation.getParam('virus').disease}</Text>
      </View>
    </View>
    // </ScrollView>
  );
}

Details.navigationOptions = ({ navigation }) => ({
  // title: navigation.state.params.name,
  title: typeof(navigation)==='undefined' || typeof(navigation.state)==='undefined' || typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.virus) === 'undefined' ? 'Novirus': titleCase(navigation.state.params.virus.disease),
});

Details.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Details;
