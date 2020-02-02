import { StyleSheet } from 'react-native';
import Colors from 'helpers/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: Colors.primary,
  },
  label: {
    marginLeft: 10,
    marginTop: 20
  },
  formElement: {
    padding:10,
    margin:10,
    borderWidth: 1,
    borderColor: 'black'
  }
});

export default styles;
