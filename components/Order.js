import { useState, useEffect } from 'react';
import { Dimensions, Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import { ActionButton } from './ActionButton';
import { RadioButton } from 'react-native-paper';

const { width, height, fontScale } = Dimensions.get('window');

const aOptions = ['Predeterminado', 'Nombre [Z-A]','Fecha Agregado [Nuevos-antiguos]','Fecha Agregado [Antiguos-nuevos]'];

export const OrderView = () => {
  const [checked, setChecked] = useState(aOptions[0]);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   console.log(checked);
  // }, [checked])

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
            <Text style={{ fontSize: width * 0.06 / fontScale }}>Ordenar por:</Text>
          </View>

          {/* ITEMS */}
          {aOptions.map(option => (
            <View style={styles.rowOption} key={option}>
              <Text style={styles.modalText}>{option}</Text>
              <RadioButton
                value={option}
                status={ checked === option ? 'checked' : 'unchecked' }
                onPress={() => setChecked(option)}
              />
            </View>
          ))
          }

          <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonApply]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>Ordenar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
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
          icon="reorder"
          color="#FFF"
          backgroundColor="#003070"
          text="Ordenar"
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
    width: width * 0.4,
    marginRight: width * 0.07,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.4,
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
  },
  rowOption: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '7%',
  },
});

