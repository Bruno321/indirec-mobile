import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { ActionButton } from './ActionButton';

const { width, height, fontScale } = Dimensions.get('window');

export const SearchInput = ({ change, reset, screen }) => {
  const [search, setSearch] = useState('');
  //TODO: Add logic to search from API
  const handleSearch = () => {
    var concat = ``;
    switch (screen) {
      case "deportistas":
        if (search?.length >= 1) {
          if (isNaN(search)) {
            concat = `$or[0][nombres][$like]=%${search}%&$or[1][apellidos][$like]=%${search}%`
            // console.log(`Searching for nombres or apellidos: ${search}`);
            change(concat, 0, 10)
          } else {
            concat = `expediente[$like]=%${search}%`
            // console.log(`Searching for exp: ${search}`);
            change(concat, 0, 10)
          }
        } else {
          concat = ``;
          change(concat, 0, 10)
        }
        break;
      case "equipos":
        if (search?.length >= 1) {
          concat = `nombre[$like]=%${search}%`;
          // console.log(`Searching for nombres or apellidos: ${search}`);
          change(concat, 0, 10);
        }
        else {
          concat = ``;
          change(concat, 0, 10)
        }
        break;
      case "asistencias":
        break
      default:
        break;
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Buscar"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.buttons}>
          <View style={{ borderRadius: 18, overflow: 'hidden', }}>
            <ActionButton
              icon="close"
              color="#A3A2A2"

              handler={() => setSearch('')}
              widthPercentage={0.1}
              heightPercentage={0.04}
            />
          </View>
          <View style={{ borderRadius: 18, overflow: 'hidden', }}>
            <ActionButton
              icon="search"
              color="#A3A2A2"
              handler={handleSearch}
              widthPercentage={0.1}
              heightPercentage={0.04}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15 / fontScale,
  },
  buttons: {
    flexDirection: 'row',
  },

});