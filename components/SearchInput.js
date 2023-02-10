import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { ActionButton } from './ActionButton';

const { width, height, fontScale } = Dimensions.get('window');

export const SearchInput = () => {
  const [search, setSearch] = useState('');

  //TODO: Add logic to search from API
  const handleSearch = () => {
    if (search?.length >= 3) {
      if (isNaN(search)) {
        console.log(`Searching for name: ${search}`);
      } else {
        console.log(`Searching for exp: ${search}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por Nombre o Expediente"
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.buttons}>
          <View style={{borderRadius: 18, overflow: 'hidden',}}>
            <ActionButton
              icon="close"
              color="#000"
              // backgroundColor="#FFF"
              handler={() => setSearch('')}
              widthPercentage={0.1}
              heightPercentage={0.04}
          />
          </View>
          <ActionButton
            icon="search"
            color="#000"
            // backgroundColor="#FFF"
            handler={handleSearch}
            widthPercentage={0.1}
            heightPercentage={0.04}
          />
        </View>
      </View>
    </View>
  );
};

const styles =  StyleSheet.create({
  container: {
    // width,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%',
    marginVertical: 5,
  },
  input: {
    width: width * 0.65,
    height: 35,
    margin: height*0.01,
    // borderBottomWidth: 1,
		// borderBottomColor:'black',
    color:'#000000',
    fontFamily:'Fredoka-Light',
    backgroundColor:'#ffffff',
    fontSize: 15 / fontScale,
  },
  buttons: {
    width: width * 0.22,
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerInput: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 18,
  }
});