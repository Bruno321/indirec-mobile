import { useState, useEffect } from 'react';
import { Dimensions, Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import { aFacultities, aSports } from '../Utils/Constants';
import { ActionButton } from './ActionButton';
import { Dropdown } from 'react-native-element-dropdown';

const { width, height, fontScale } = Dimensions.get('window');       

export const FiltersView = () => {
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

  //TODO: Generate queries based on search object
  const handleQueries = (name, { value }) => {
    setSearch({
      ...search,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.rowOption}>
              <Text style={{ fontSize: width * 0.06 / fontScale }}>Filtrar por:</Text>
            </View>

            {/* ITEMS */}
            <View style={styles.rowOption}>
              <Text style={styles.modalText}>Deporte</Text>
              <Dropdown
                data={sportItems}
                labelField="label"
                valueField="value"
                placeholder='Todos'
                placeholderStyle={styles.dropdown_text}
                selectedTextStyle={styles.dropdown_text}
                itemTextStyle={styles.dropdown_text}
                style={styles.dropdown}
                containerStyle={styles.dropdown}
                onChange={value => {
                  handleQueries('deporte', value);
                }}
                value={search?.deporte}
                search={true}
              />
            </View>

            <View style={styles.rowOption}>
              <Text style={styles.modalText}>Estatus</Text>
              <Dropdown
                data={statusItems}
                labelField="label"
                valueField="value"
                placeholder='Todos'
                placeholderStyle={styles.dropdown_text}
                selectedTextStyle={styles.dropdown_text}
                itemTextStyle={styles.dropdown_text}
                style={styles.dropdown}
                containerStyle={styles.dropdown}
                onChange={value => {
                  handleQueries('activo', value);
                }}
                value={search?.activo}
              />
            </View>

            <View style={styles.rowOption}>
              <Text style={styles.modalText}>Facultad</Text>
              <Dropdown
                data={facultitiesItems}
                labelField="label"
                valueField="value"
                placeholder='Todas'
                placeholderStyle={styles.dropdown_text}
                selectedTextStyle={styles.dropdown_text}
                itemTextStyle={styles.dropdown_text}
                style={styles.dropdown}
                containerStyle={styles.dropdown}
                onChange={value => {
                  handleQueries('facultad', value);
                }}
                value={search?.facultad}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonApply]}
                onPress={() => {
                  setSearch({});
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Filtrar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSearch({});
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <ActionButton
          icon="filter"
          color="#FFF"
          backgroundColor="#003070"
          text="Filtros"
          handler={() => setModalVisible(!modalVisible)}
          widthPercentage={0.4}
          heightPercentage={0.04}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.5,
    marginLeft: width * 0.055,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.34,
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: height * 0.225,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonContainer: {
    width: width * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#C7402B",
  },
  buttonApply: {
    backgroundColor: "#5FDA80",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: width * 0.03/ fontScale,
  },
  modalText: {
    fontSize: width * 0.035 / fontScale,
    // fontSize: width * 0.05 / fontScale,
  },
  rowOption: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '7%',
    alignItems: 'flex-start',
  },
  dropdown: {
    width: width * 0.4,
    fontSize: width * 0.035 / fontScale,
  },
  dropdown_text : {
    fontSize: width * 0.035 / fontScale,
  }
});
