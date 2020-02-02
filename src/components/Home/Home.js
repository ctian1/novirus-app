import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';

import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import getUser from 'selectors/UserSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from 'helpers/Colors';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

function titleCase(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1));
}

function Home(props) {

  const [viruses, setViruses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [cards, setCards] = useState([]);

  const user = useSelector(state => getUser(state));

  // useEffect(() => {
  //   if (!loaded) {
  //     setLoaded(true);

  //     setViruses([
  //       {
  //         map: require('../../images/chipotle.png'),
  //         title: "Influenza",
  //         description: "Possible contact 3 days ago",
  //       },
  //       {
  //         map: require('../../images/canes.png'),
  //         title: "Coronavirus",
  //         description: "Possible contact 6 days ago",
  //       },
  //     ])
  //   }
  // });

  useEffect(() => {
    if (user !== undefined && user !== null && 'sick' in user) {
      setViruses(user.sick);
    } else {
      setViruses([]);
    }
  }, [user])

  useEffect(() => {
    const result = [];
    for (const virus of viruses) {
      console.log(virus);
      result.push(
      <TouchableOpacity
        style={{flex:1, borderColor: 'gray', borderWidth: 2, margin: 10}}
        onPress={() => {
          props.navigation.navigate('Details', {virus})
        }}>
        <View
          style={{flex:1}}
          // title='Influenza'
          // image={virus.map}
          >
          <View style={{flex: 3}}>
            <MapView
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              style={{flex: 1, minWidth:100, minHeight:150}}
              initialRegion={{
                latitude: virus.coords[0],
                longitude: virus.coords[1],
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
                }}>
            </MapView>
          </View>
          <View style={{flex:1}}>
            <Text style={{margin: 12, fontSize: 18, fontWeight: '600', marginBottom:5}}>{titleCase(virus.disease)}</Text>
            <Text style={{margin: 12, marginTop: 0}}>{"Possible contact " + moment.unix(virus.time_met).fromNow()}</Text>
          </View>
        </View>
      </TouchableOpacity>);
    }
    setCards(result);
  }, [viruses])

  return (
    <ScrollView style={styles.container}>
      {cards.length > 0 ? cards : <Text style={{flex:1, textAlign: "center", fontSize: 20, margin: 45, textAlignVertical: "center"}}>
        No reports of contagious disease near you
      </Text>}


      {/* <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details')
        }}>
        <Card
          // title='Influenza'
          image={require('../../images/chipotle.png')}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom:5}}>Influenza</Text>
          <Text>Possible contact 3 days ago</Text>
        </Card>
      </TouchableOpacity>
      <Card
        // title='Influenza'
        image={require('../../images/canes.png')}>
        <Text style={{fontSize: 18, fontWeight: '600', marginBottom:5}}>Coronavirus</Text>
        <Text>Possible contact 6 days ago</Text>
      </Card> */}


      {/* <Text style={TextStyles.lightTitle}>
        {strings.home}
      </Text>
      <Text>
        {getMessage()}
      </Text> */}
    </ScrollView>
  );
}

Home.navigationOptions = ({ navigation }) => ({
    // title: typeof(navigation),
    title: typeof(navigation)==='undefined' || typeof(navigation.state)==='undefined' || typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.virus) === 'undefined' ? 'Novirus': titleCase(navigation.state.params.virus.disease),
    headerBackTitle: 'Back',
    headerStyle: {paddingBottom: 12},
    headerTitleStyle: {fontSize: 32, fontWeight: '700', color: Colors.red}
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
