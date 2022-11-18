import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { ActionButton } from './ActionButton';

const { width, height } = Dimensions.get('window');

export const SearchInput = () => {
  const [search, setSearch] = useState('');


  //TODO: Add logic to search from API
  const handleSearch = () => {
    console.log(search);
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
      <TextInput
        style={styles.input}
        placeholder="Buscar por Nombre o Expediente"
        value={search}
        onChange={value => setSearch(value)}
      />
      <ActionButton
        icon="search"
        color="#000"
        backgroundColor="#FFF"
        text="Buscar"
        handler={handleSearch}
        widthPercentage={0.25}
        heightPercentage={0.04}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4%'
  },
  input: {
    width: width * 0.6,
    height: 35,
    margin: height*0.01,
    borderBottomWidth: 1,
		borderBottomColor:'black',
    color:'#000000',
    fontFamily:'Fredoka-Light',
    backgroundColor:'#ffffff',
    fontSize:width * .04,
  },
});