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

function Home(props) {

  const [viruses, setViruses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [cards, setCards] = useState([]);

  const user = useSelector(state => getUser(state));

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);

      setViruses([
        {
          map: require('../../images/chipotle.png'),
          title: "Influenza",
          description: "Possible contact 3 days ago",
        },
        {
          map: require('../../images/canes.png'),
          title: "Coronavirus",
          description: "Possible contact 6 days ago",
        },
      ])
    }
  });

  useEffect(() => {
    const result = [];
    for (const virus of viruses) {
      result.push(
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Details', {virus})
        }}>
        <Card
          // title='Influenza'
          image={virus.map}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom:5}}>{virus.title}</Text>
          <Text>{virus.description}</Text>
        </Card>
      </TouchableOpacity>);
    }
    setCards(result);
  }, [viruses])

  return (
    <ScrollView style={styles.container}>
      {cards}


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
    title: typeof(navigation)==='undefined' || typeof(navigation.state)==='undefined' || typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.virus) === 'undefined' ? 'Novirus': navigation.state.params.virus.title,
    headerBackTitle: 'Back',
    headerStyle: {paddingBottom: 12},
    headerTitleStyle: {fontSize: 32, fontWeight: '700', color: Colors.primary}
});

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
