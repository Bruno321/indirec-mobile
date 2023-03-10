import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Modal  } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { aFacultities, aSports } from '../Utils/Constants';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { ActionButton } from './ActionButton';

const { fontScale, width} = Dimensions.get('window');

export const Filters = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState({});

  const sportItems = [
    {label: 'Todos', value: null},
    ...aSports.map(oSport => ({
      label: oSport,
      value: oSport,
    }))
  ]

  const statusItems = [
    {label: 'Todos', value: null},
    {label: 'Activo', value: 1},
    {label: 'Inactivo', value: 0},
  ];
  const facultitiesItems = [
    {label: 'Todas', value: null},
    ...aFacultities.map(oFaculty => ({
      label: oFaculty,
      value: `Facultad de ${oFaculty}`,
    }))
  ];
  
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View 
          style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(0,0,0,0.5)'
          }}>
          
          <View style={styles.container}>

            <View style={styles.filterHeader}>
              {/* arrow left */}
              <View style={styles.headerColumns}>
                <TouchableCmp style={{marginLeft: 8, width: '32%'}} onPress={() => { setModalVisible(!modalVisible) }}>
                  <Feather name={'chevron-left'} size={35} color={'grey'}/>
                </TouchableCmp>
              </View>
              
              {/* title 'filtros' */}
              <View style={styles.headerColumns}>
                <Text style={[styles.filterText, {textAlign: 'center', fontWeight: '600'}]}>Filtros</Text>
              </View>
              
              {/* reset button */}
              <View style={styles.headerColumns}>
                <TouchableCmp>
                  <Text style={[styles.filterText, {textAlign: 'center', fontSize: 14 / fontScale, color: '#838383'}]}>Restablecer</Text>
                </TouchableCmp>
              </View>
            </View>

            {/* Ordenar por */}
            <TouchableCmp style={styles.containerItem}>
              <View style={styles.filterItem}>
                <Text style={styles.filterText}>Ordenar por</Text>
                <Text style={styles.filterTextSelect}>Predeterminado</Text>
              </View>

              <View style={{width: '10%'}}>
                <Feather name={'chevron-right'} size={35} color={'grey'}/>
              </View>
            </TouchableCmp>

            {/* Deporte */}
            <TouchableCmp style={styles.containerItem}>        
              <View style={styles.filterItem}>
                <Text style={styles.filterText}>Deporter</Text>
                <Text style={styles.filterTextSelect}>Todos</Text>
              </View>

              <View style={{width: '10%'}}>
                <Feather name={'chevron-right'} size={35} color={'grey'}/>
              </View>
            </TouchableCmp>

            {/* Facultad */}
            <TouchableCmp style={styles.containerItem}>       
              <View style={styles.filterItem}>
                <Text style={styles.filterText}>Facultad</Text>
                <Text style={styles.filterTextSelect}>Todas</Text>
              </View>

              <View style={{width: '10%'}}>
                <Feather name={'chevron-right'} size={35} color={'grey'}/>
              </View>   
            </TouchableCmp>

            {/* Estatus */}
            <TouchableCmp style={styles.containerItem}>
              <View style={styles.filterItem}>
                <Text style={styles.filterText}>Estatus</Text>
                <Text style={styles.filterTextSelect}>Todos</Text>
              </View>

              <View style={{width: '10%'}}>
                <Feather name={'chevron-right'} size={35} color={'grey'}/>
              </View>   
            </TouchableCmp>

            {/* Sexo */}
            <TouchableCmp style={[styles.containerItem, {borderBottomWidth: 1}]}>         
              <View style={styles.filterItem}>
                <Text style={styles.filterText}>Sexo</Text>
                <Text style={styles.filterTextSelect}>Todos</Text>
              </View>

              <View style={{width: '10%'}}>
                <Feather name={'chevron-right'} size={35} color={'grey'}/>
              </View>   
            </TouchableCmp>

            <TouchableCmp 
              style={styles.btnShowAthletes} 
              onPress={() => {
                setSearch({});
                setModalVisible(!modalVisible)
              }}>
              <Text style={styles.buttonText}>Ver deportistas</Text>
            </TouchableCmp>
            
          </View>  
        </View>
      </Modal>

      <View style={styles.btnFilter}>
        <ActionButton
          icon="sliders"
          color="#FFF"
          backgroundColor="#003070"
          text="Filtros"
          handler={() => setModalVisible(!modalVisible)}
          widthPercentage={0.4}
          heightPercentage={0.04}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 600,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  filterHeader: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  filterText: {
    fontSize: 18 / fontScale,
  },
  headerColumns: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'gray',
  },
  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    height: 60,
    paddingHorizontal: '2.5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#C3BFBF',
  },
  filterItem: {
    width: '90%',
  },
  filterTextSelect: {
    color: '#838383',
    fontSize: 14 / fontScale,
    marginTop: 2,
  },
  btnShowAthletes: {
    width: '95%',
    height: 40,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#003070",
    borderRadius: 10,
    bottom: '8%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16 / fontScale,
  },
  btnFilter: {
    width: width*0.45,
    height: 40,
    alignSelf: 'center',
    backgroundColor: "#003070",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})