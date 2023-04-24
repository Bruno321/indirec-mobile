import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Modal, TouchableWithoutFeedback, FlatList, SafeAreaView } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { aFacultities, aSports } from '../Utils/Constants';
import TouchableCmp from '../assetsUI/TouchableCmp';
import { ActionButton } from './ActionButton';

const { fontScale, width, height } = Dimensions.get('window');

export const Filters = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState({});
  const [eleccion,setEleccion] = useState("no");
  const [depActual, setDepActual] = useState("Todos");
  const [facActual, setfacActual] = useState("Todas");
  const [ordenActual, setOrdenActual] = useState("Predeterminado");
  const [esActual, setEsActual] = useState("Todos");
  const [sexoActual, setSexoActual] = useState("Todos");

  const sportItems = [
    { label: 'Todos', value: 'Todos' },
    ...aSports.map(oSport => ({
      label: oSport,
      value: oSport,
    }))
  ]

  const facultitiesItems = [
    { label: 'Todas', value: 'Todas' },
    ...aFacultities.map(oFaculty => ({
      label: oFaculty,
      value: oFaculty,
    }))
  ];

  const handleOrdenar = () =>{
    if(ordenActual=="Predeterminado"){
      setOrdenActual("Apellido [A-Z]")
    }
    if(ordenActual=="Apellido [A-Z]"){
      setOrdenActual("Apellido [Z-A]")
    }
    if(ordenActual=="Apellido [Z-A]"){
      setOrdenActual("Predeterminado")
    }
  }

  const handleEstatus = () =>{
    if(esActual=="Todos"){
      setEsActual("Seleccionado")
    }
    if(esActual=="Seleccionado"){
      setEsActual("No seleccionado")
    }
    if(esActual=="No seleccionado"){
      setEsActual("Todos")
    }
  }

  const handleSexo = () =>{
    if(sexoActual=="Todos"){
      setSexoActual("Masculino")
    }
    if(sexoActual=="Masculino"){
      setSexoActual("Femenino")
    }
    if(sexoActual=="Femenino"){
      setSexoActual("Otro")
    }
    if(sexoActual=="Otro"){
      setSexoActual("Todos")
    }
  }

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
          <TouchableWithoutFeedback onPress={()=>{setModalVisible(!modalVisible),setEleccion("no")}}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
          </TouchableWithoutFeedback>



          {/* DEFAULT   */ }
          {(eleccion=="no"||eleccion=="ordenar"||eleccion=="estatus"||eleccion=="sexo")&&
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
                <TouchableCmp onPress={()=>{setOrdenActual("Predeterminado"),setDepActual("Todos"),setfacActual("Todas"),setEsActual("Todos"),setSexoActual("Todos")}}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>

            {/* FILTRO ORDENAR POR */}
            <TouchableCmp onPress={()=>handleOrdenar()}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Ordenar por</Text>
                    <Text style={styles.filterTextSelect}>{ordenActual}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO DEPORTE */}
            <TouchableCmp onPress={()=>setEleccion("deporte")}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Deporte</Text>
                    <Text style={styles.filterTextSelect}>{depActual}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>

            {/* FILTRO FACULTAD */}
            <TouchableCmp onPress={()=>setEleccion("facultad")}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Facultad</Text>
                    <Text style={styles.filterTextSelect}>{facActual}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO ESTATUS */}
            <TouchableCmp onPress={()=>handleEstatus()}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Estatus</Text>
                    <Text style={styles.filterTextSelect}>{esActual}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO SEXO */}
            <TouchableCmp onPress={()=>handleSexo()}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Sexo</Text>
                    <Text style={styles.filterTextSelect}>{sexoActual}</Text>
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
          }



          {/* DEPORTE   */ }
          {eleccion=="deporte"&&
          <View style={styles.container}>
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{width: "25%",}}>
                <View style={styles.header1ViewOut}>
                  <TouchableCmp onPress={() => { setEleccion("no") }}>
                    <View style={styles.headerColumn1}>
                      <Feather name={'chevron-left'} size={35} color={'grey'} />
                    </View>
                  </TouchableCmp>
                </View>
              </View>

              {/* title 'ORdenar' */}
              <View style={styles.headerColumn2}>
                <Text style={[styles.filterText, { textAlign: 'center', fontWeight: '600' }]}>Deporte</Text>
              </View>

              {/* BOTON RESTABLECER */}
              <View style={styles.header3ViewOut}>
                <TouchableCmp onPress={()=>setDepActual("Todos")}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
            <SafeAreaView style={styles.flatContainer}>
              <FlatList 
                data = {sportItems}
                renderItem={({item}) =>
                  <TouchableCmp onPress={()=>setDepActual(item.label)}>
                    <View style={styles.containerItem}>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={styles.filterItem}>
                          <Text style={styles.filterText}>{item.label}</Text>
                        </View>
                        <View style={depActual==item.value?{ width: '9%', height:30, backgroundColor:'#003070', borderRadius:45, borderWidth:1, borderColor:'grey' }:{width: '9%', height:30, backgroundColor:'#EEEEEF', borderRadius:45, borderWidth:1, borderColor:'grey'}}>
                        </View>
                      </View>
                    </View>
                  </TouchableCmp>
                }
                keyExtractor={item=>item.label}
              />
            </SafeAreaView>
            

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
          }




          {/* FACULTAD   */ }
          {eleccion=="facultad"&&
          <View style={styles.container}>
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{width: "25%",}}>
                <View style={styles.header1ViewOut}>
                  <TouchableCmp onPress={() => { setEleccion("no") }}>
                    <View style={styles.headerColumn1}>
                      <Feather name={'chevron-left'} size={35} color={'grey'} />
                    </View>
                  </TouchableCmp>
                </View>
              </View>

              {/* title 'Facultad' */}
              <View style={styles.headerColumn2}>
                <Text style={[styles.filterText, { textAlign: 'center', fontWeight: '600' }]}>Facultad</Text>
              </View>

              {/* BOTON RESTABLECER */}
              <View style={styles.header3ViewOut}>
                <TouchableCmp onPress={()=>setfacActual("Todas")}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
            <SafeAreaView style={styles.flatContainer}>
              <FlatList 
                data = {facultitiesItems}
                renderItem={({item}) =>
                  <TouchableCmp onPress={()=>setfacActual(item.label)}>
                    <View style={styles.containerItem}>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={styles.filterItem}>
                          <Text style={styles.filterText}>{item.label}</Text>
                        </View>
                        <View style={facActual==item.value?{ width: '9%', height:30, backgroundColor:'#003070', borderRadius:45, borderWidth:1, borderColor:'grey' }:{width: '9%', height:30, backgroundColor:'#EEEEEF', borderRadius:45, borderWidth:1, borderColor:'grey'}}>
                        </View>
                      </View>
                    </View>
                  </TouchableCmp>
                }
                keyExtractor={item=>item.label}
              />
            </SafeAreaView>
            

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
          }
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
    paddingHorizontal:'3.5%'
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
    width: '100%',
    height: 60,
    paddingHorizontal: '2.5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#C3BFBF',
    // backgroundColor:'red'
  },
  filterItem: {
    width: '90%',
    justifyContent:'center'

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
  },
  flatContainer:{
    marginBottom:130,
    // paddingHorizontal: '3%',
  }
})