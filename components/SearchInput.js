import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { ActionButton } from './ActionButton';

const { width, height, fontScale } = Dimensions.get('window');

export const SearchInput = ({ setPagina, screen, updateConcat}) => {
  const [search, setSearch] = useState('');
  //TODO: Add logic to search from API
  var concat = ``;
  const handleSearch = () => {
    concat = ``;
    switch (screen) {
      case "deportistas":
        if (search?.length >= 1) {
          if (isNaN(search)) {
            concat = `$or[0][nombres][$iLike]=%${search.toLowerCase()}%&$or[1][apellidos][$iLike]=%${search.toLowerCase()}%`
            // console.log(`Searching for nombres or apellidos: ${search.toLowerCase()}`);
            updateConcat(concat);
            setPagina(0);
          } else {
            concat = `expediente[$like]=%${search}%`
            // console.log(`Searching for exp: ${search}`);
            updateConcat(concat);
            setPagina(0);
          }
        } else {
          concat = ``;
            updateConcat(concat);
            setPagina(0);
            // updateConcat(concat);
            // setPagina(0);
        }
        break;
      case "equipos":
        if (search?.length >= 1) {
          concat = `nombre[$iLike]=%${search.toLowerCase()}%`;
          // console.log(`Searching for nombres or apellidos: ${search}`);
            updateConcat(concat);
            setPagina(0);
        }
        else {
          concat = ``;
          updateConcat(concat);
          setPagina(0);
        }
        break;
      case "asistencias":
        if (search?.length >= 1) {
          concat = `$or[0][nombres][$iLike]=%${search.toLowerCase()}%&$or[1][apellidos][$iLike]=%${search.toLowerCase()}%`
            updateConcat(concat);
            setPagina(0);
        }
        else {
          concat = ``;
          updateConcat(concat);
          setPagina(0);
        }
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

              handler={() => {setSearch(''); updateConcat(''); setPagina(0)}}
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
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,
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