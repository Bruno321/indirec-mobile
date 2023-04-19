import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Modal, TouchableWithoutFeedback } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { aFacultities, aSports } from '../Utils/Constants';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { ActionButton } from './ActionButton';

const { fontScale, width, height } = Dimensions.get('window');

export const Filters = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState({});

  const sportItems = [
    { label: 'Todos', value: null },
    ...aSports.map(oSport => ({
      label: oSport,
      value: oSport,
    }))
  ]

  const statusItems = [
    { label: 'Todos', value: null },
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 },
  ];
  const facultitiesItems = [
    { label: 'Todas', value: null },
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
          <TouchableWithoutFeedback onPress={()=>setModalVisible(!modalVisible)}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
          </TouchableWithoutFeedback>
          <View style={styles.container}>
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{width: "25%",}}>
                <View style={styles.header1ViewOut}>
                  <TouchableCmp onPress={() => { setModalVisible(!modalVisible) }}>
                    <View style={styles.headerColumn1}>
                      <Feather name={'chevron-left'} size={35} color={'grey'} />
                    </View>
                  </TouchableCmp>
                </View>
              </View>

              {/* title 'filtros' */}
              <View style={styles.headerColumn2}>
                <Text style={[styles.filterText, { textAlign: 'center', fontWeight: '600' }]}>Filtros</Text>
              </View>

              {/* BOTON RESTABLECER */}
              <View style={styles.header3ViewOut}>
                <TouchableCmp>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>

            {/* FILTRO ORDENAR POR */}
            <TouchableCmp>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Ordenar por</Text>
                    <Text style={styles.filterTextSelect}>Predeterminado</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO DEPORTE */}
            <TouchableCmp>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Deporte</Text>
                    <Text style={styles.filterTextSelect}>Todos</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>

            {/* FILTRO FACULTAD */}
            <TouchableCmp>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Facultad</Text>
                    <Text style={styles.filterTextSelect}>Todas</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO ESTATUS */}
            <TouchableCmp>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Estatus</Text>
                    <Text style={styles.filterTextSelect}>Todos</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO SEXO */}
            <TouchableCmp>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Sexo</Text>
                    <Text style={styles.filterTextSelect}>Todos</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>

            {/* Boton VER DEPORTISTAS */}
            <View style={{ width: "100%", height: height * 0.12, bottom: 0, position: 'absolute', justifyContent: 'center', }}>
              <TouchableCmp
                onPress={() => {
                  setSearch({});
                  setModalVisible(!modalVisible)
                }}>
                <View style={styles.btnShowAthletes}>
                  <Text style={styles.buttonText}>Ver deportistas</Text>
                </View>
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
    height: height * 0.68,
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
  },
  filterText: {
    fontSize: 18 / fontScale,
  },
  header1ViewOut: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerColumn1: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "100%",
  },
  headerColumn2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "50%",
  },
  header3ViewOut: {
    width: width * 0.25,
    height: width * 0.15,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#003070",
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16 / fontScale,
  },
  btnFilter: {
    width: width * 0.45,
    height: 40,
    alignSelf: 'center',
    backgroundColor: "#003070",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
})