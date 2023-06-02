import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Modal, TouchableWithoutFeedback, FlatList } from "react-native";
import { aFacultities, aSports } from '../Utils/Constants';
import { ActionButton } from './ActionButton';
import Feather from 'react-native-vector-icons/Feather';
import TouchableCmp from '../assetsUI/TouchableCmp';

const { fontScale, width, height } = Dimensions.get('window');

export const Filters = ({ reset, updateConcat }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [eleccion, setEleccion] = useState("no");
  const [depActual, setDepActual] = useState("Todos");
  const [facActual, setfacActual] = useState("Todas");
  const [ordenActual, setOrdenActual] = useState("Predeterminado");
  const [selActual, setSelActual] = useState("Todos");
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

  const handleOrdenar = () => {
    if (ordenActual == "Predeterminado") {
      setOrdenActual("Apellido [A-Z]")
    }
    if (ordenActual == "Apellido [A-Z]") {
      setOrdenActual("Apellido [Z-A]")
    }
    if (ordenActual == "Apellido [Z-A]") {
      setOrdenActual("Predeterminado")
    }
  }

  const handleSeleccionado = () => {
    if (selActual == "Todos") {
      setSelActual("Seleccionado")
    }
    if (selActual == "Seleccionado") {
      setSelActual("No seleccionado")
    }
    if (selActual == "No seleccionado") {
      setSelActual("Todos")
    }
  }

  const handleSexo = () => {
    if (sexoActual == "Todos") {
      setSexoActual("Masculino")
    }
    if (sexoActual == "Masculino") {
      setSexoActual("Femenino")
    }
    if (sexoActual == "Femenino") {
      setSexoActual("Todos")
    }
  }

  const verifyQuery = () => {
    var concat = "";
    /* ORDEN */
    switch (ordenActual) {
      case "Apellido [A-Z]":
        concat = concat + "$sort[nombres]=1"
        break;
      case "Apellido [Z-A]":
        concat = concat + "$sort[nombres]=-1"
        break;
      default:
        break;
    }
    /* DEPORTE */
    switch (depActual) {
      case "Fútbol":
        concat = concat + "&deporte=Futbol"
        break;
      case "Baloncesto":
        concat = concat + "&deporte=Basquetball"
        break;
      case "Voleibol":
        concat = concat + "&deporte=Volleyball"
        break;
      case "Atletismo":
        concat = concat + "&deporte=Atletismo"
        break;
      default:
        break;
    }
    /* FACULTAD */

    const findTerm = (term) => {
      if (facActual.includes(term)) {
        return facActual;
      }
    };

    switch (facActual) {
      case findTerm("Bellas"):
        concat = concat + "&facultad[$like]=%Bellas%";
        break;
      case findTerm("Naturales"):
        concat = concat + "&facultad[$like]=%Naturales%";
        break;
      case findTerm("Políticas"):
        concat = concat + "&facultad[$like]=%Políticas%";
        break;
      case findTerm("Derecho"):
        concat = concat + "&facultad[$like]=%Derecho%";
        break;
      case findTerm("Enfermería"):
        concat = concat + "&facultad[$like]=%Enfermería%";
        break;
      case findTerm("Filosofía"):
        concat = concat + "&facultad[$like]=%Filosofía%";
        break;
      case findTerm("Informática"):
        concat = concat + "&facultad[$like]=%Informática%";
        break;
      case findTerm("Ingeniería"):
        concat = concat + "&facultad[$like]=%Ingeniería%";
        break;
      case findTerm("Lenguas"):
        concat = concat + "&facultad[$like]=%Lenguas%";
        break;
      case findTerm("Medicina"):
        concat = concat + "&facultad[$like]=%Medicina%";
        break;
      case findTerm("Psicología"):
        concat = concat + "&facultad[$like]=%Psicología%";
        break;
      case findTerm("Contaduría"):
        concat = concat + "&facultad[$like]=%Contaduría%";
        break;
      case findTerm("Química"):
        concat = concat + "&facultad[$like]=%Química%";
        break;
      default:
        break;
    }
    /* SELECCIONADO */
    switch (selActual) {
      case "No seleccionado":
        concat = concat + "&jugadorSeleccionado=0"
        break;
      case "Seleccionado":
        concat = concat + "&jugadorSeleccionado=1"
        break;
      default:
        break;
    }
    /* SEXO */
    switch (sexoActual) {
      case "Masculino":
        concat = concat + "&sexo=0"
        break;
      case "Femenino":
        concat = concat + "&sexo=1"
        break;
      default:
        break;
    }
    updateConcat(concat)
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          verifyQuery();
        }}
      >
        <TouchableWithoutFeedback onPress={() => { setModalVisible(!modalVisible), setEleccion("no"), verifyQuery() }}>
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
        </TouchableWithoutFeedback>



        {/* ====== DEFAULT ====== */}
        {(eleccion == "no") &&
          <View style={styles.container}>
            {/* ====== HEADER ====== */}
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{ width: "25%", }}>
                <View style={styles.header1ViewOut}>
                  <TouchableCmp onPress={() => { setModalVisible(!modalVisible) }}>
                    <View style={styles.headerColumn1}>
                      <Feather name={'chevron-left'} size={35} color={'grey'} />
                    </View>
                  </TouchableCmp>
                </View>
              </View>

              {/* TITLE 'Filtros' */}
              <View style={styles.headerColumn2}>
                <Text style={[styles.filterText, { textAlign: 'center', fontWeight: '600' }]}>Filtros</Text>
              </View>

              {/* BOTON RESTABLECER */}
              <View style={styles.header3ViewOut}>
                <TouchableCmp onPress={() => { setOrdenActual("Predeterminado"), setDepActual("Todos"), setfacActual("Todas"), setSelActual("Todos"), setSexoActual("Todos") }}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>


            {/* ====== FILTROS ====== */}

            {/* FILTRO ORDENAR POR */}
            <TouchableCmp onPress={() => handleOrdenar()}>
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
            <TouchableCmp onPress={() => setEleccion("deporte")}>
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
            <TouchableCmp onPress={() => setEleccion("facultad")}>
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


            {/* FILTRO SELECCIONADO */}
            <TouchableCmp onPress={() => handleSeleccionado()}>
              <View style={styles.containerItem}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={styles.filterItem}>
                    <Text style={styles.filterText}>Seleccionado</Text>
                    <Text style={styles.filterTextSelect}>{selActual}</Text>
                  </View>
                  <View style={{ width: '10%' }}>
                    <Feather name={'chevron-right'} size={35} color={'grey'} />
                  </View>
                </View>
              </View>
            </TouchableCmp>


            {/* FILTRO SEXO */}
            <TouchableCmp onPress={() => handleSexo()}>
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
                  verifyQuery();
                  setModalVisible(!modalVisible)
                }}>
                <View style={styles.btnShowAthletes}>
                  <Text style={styles.buttonText}>Ver deportistas</Text>
                </View>
              </TouchableCmp>
            </View>

          </View>
        }



        {/* DEPORTE   */}
        {eleccion == "deporte" &&
          <View style={styles.container}>
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{ width: "25%", }}>
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
                <TouchableCmp onPress={() => setDepActual("Todos")}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
            <View style={styles.flatContainer}>
              <FlatList
                data={sportItems}
                renderItem={({ item }) =>
                  <TouchableCmp onPress={() => setDepActual(item.label)}>
                    <View style={styles.containerItem}>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={styles.filterItem}>
                          <Text style={styles.filterText}>{item.label}</Text>
                        </View>
                        <View style={depActual == item.value ? { width: '9%', height: 30, backgroundColor: '#003070', borderRadius: 45, borderWidth: 1, borderColor: 'grey' } : { width: '9%', height: 30, backgroundColor: '#EEEEEF', borderRadius: 45, borderWidth: 1, borderColor: 'grey' }}>
                        </View>
                      </View>
                    </View>
                  </TouchableCmp>
                }
                keyExtractor={item => item.label}
              />
            </View>
          </View>
        }


        {/* FACULTAD   */}
        {eleccion == "facultad" &&
          <View style={styles.container}>
            <View style={styles.filterHeader}>
              {/* BOTON VOLVER */}
              <View style={{ width: "25%", }}>
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
                <TouchableCmp onPress={() => setfacActual("Todas")}>
                  <View style={{ height: "100%", width: "100%", justifyContent: 'center' }}>
                    <Text style={[styles.filterText, { textAlign: 'center', fontSize: 14 / fontScale, color: '#838383' }]}>Restablecer</Text>
                  </View>
                </TouchableCmp>
              </View>
            </View>
            <View style={styles.flatContainer}>
              <FlatList
                data={facultitiesItems}
                renderItem={({ item }) =>
                  <TouchableCmp onPress={() => setfacActual(item.label)}>
                    <View style={styles.containerItem}>
                      <View style={{ flexDirection: 'row', }}>
                        <View style={styles.filterItem}>
                          <Text style={styles.filterText}>{item.label}</Text>
                        </View>
                        <View style={facActual == item.value ? { width: '9%', height: 30, backgroundColor: '#003070', borderRadius: 45, borderWidth: 1, borderColor: 'grey' } : { width: '9%', height: 30, backgroundColor: '#EEEEEF', borderRadius: 45, borderWidth: 1, borderColor: 'grey' }}>
                        </View>
                      </View>
                    </View>
                  </TouchableCmp>
                }
                keyExtractor={item => item.label}
              />
            </View>
          </View>
        }
      </Modal>
      <View style={[styles.btnFilter, (ordenActual !== "Predeterminado" || depActual !== "Todos" || facActual !== "Todas" || selActual !== "Todos" || sexoActual !== "Todos") ? { backgroundColor: "#057642" } : { backgroundColor: "#003070" }]}>

        <ActionButton
          icon="sliders"
          color="#FFF"
          backgroundColor={(ordenActual !== "Predeterminado" || depActual !== "Todos" || facActual !== "Todas" || selActual !== "Todos" || sexoActual !== "Todos") ? "#057642" : "#003070"}
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
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: '3.5%'
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
    justifyContent: 'center'

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
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatContainer: {
    flex: 1,
  }
})