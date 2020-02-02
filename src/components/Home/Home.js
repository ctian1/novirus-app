import React, { useCallback } from 'react';
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

function Home(props) {
  const user = useSelector(state => getUser(state));
  const getMessage = useCallback(() => `${strings.homeMessage} ${user && user.name}`, [user]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
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
        <Text>Possible contact 3 days ago</Text>
      </Card>
      {/* <Text style={TextStyles.lightTitle}>
        {strings.home}
      </Text>
      <Text>
        {getMessage()}
      </Text> */}
    </ScrollView>
  );
}

Home.navigationOptions = {
  title: 'Novirus',
  headerBackTitle: 'Back'
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Home;
