import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Picker, StyleSheet, TextInput
} from 'react-native';
import { Input } from 'react-native-elements';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './styles';

import Button from '../common/Button';
import TextStyles from 'helpers/TextStyles';
import strings from 'localization';
import getUser from 'selectors/UserSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from 'helpers/Colors';
import Url from 'helpers/Url';
import axios from 'axios';

function Report(props) {
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');

  const [loaded, setLoaded] = useState(false);

  const user = useSelector(state => getUser(state));

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    }
  });

  return (
    <ScrollView style={styles.container}>

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

      <View>
        {/* <FormLabel>Name</FormLabel> */}
        {/* <FormInput></FormInput> */}
      </View>
      <Text style={styles.label}>Virus type</Text>
      <View style={styles.formElement}>
        {/* <Picker
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => {
            setType(itemValue);
          }}>
          <Picker.Item label="Coronavirus" value="coronavirus" />
          <Picker.Item label="Influenza" value="influenza" />
        </Picker> */}
        <RNPickerSelect
          onValueChange={(value) => setType(value)}
          items={[
            { label: "Coronavirus", value: "coronavirus" },
            { label: "Influenza", value: "influenza" }
          ]}/>
      </View>
      <Text style={styles.label}>Date of first symptoms</Text>
      <View style={styles.formElement}>
        {/* <CalendarPicker
            // onDateChange={this.onDateChange}
          /> */}
        <TextInput
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          numberOfLines={1}
          placeholder={"mm/dd/yyyy"}
          maxLength={10}
          value={date}
          onChangeText={(text) => {
            setDate(text);
          }}/>
      </View>
      <Text style={styles.label}>Additional information</Text>
      <View style={styles.formElement}>
        <TextInput
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          enablesReturnKeyAutomatically={true}
          textAlignVertical={'top'}
          multiline={true}
          numberOfLines={6}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}/>
      </View>
      <Button
        title={"Submit"}
        style={{margin: 10, borderColor: Colors.red}}
        onPress={() => {
          axios.get(`${Url}/sick`, {
            params: {
              id: user.id,
              d: type,
              time: date
            },
            method: 'GET'
          }).then(() => {
            setDate('');
            setType('');
            setText('');
          });
        }}/>
      {/* <Text>
        REPORT A VIRUS
      </Text> */}
    </ScrollView>
  );
}

Report.navigationOptions = ({ navigation }) => ({
    // title: typeof(navigation),
    title: 'Report a virus',
    headerBackTitle: 'Back',
});

Report.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Report;
