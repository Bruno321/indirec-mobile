import { Dimensions ,Text, View, SafeAreaView, StyleSheet } from "react-native";
import { ActionButton ,FiltersView, Header, List, OrderView, SearchInput, DeportistasCard, Pressable } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';
import TouchableCmp from '../assetsUI/TouchableCmp';
import Feather from 'react-native-vector-icons/Feather';


const { fontScale, width} = Dimensions.get('window');

export const Deportistas = ({ navigation }) => {
  const [deportistas, loading] = useFetchData('deportistas');

  const columns = [
    {
      title: 'Nombre',  
      dataIndex: 'nombres',
      render: (_, record) => `${record.nombres} ${record.apellidos}`,
    },
    {
      title: 'Expediente',
      dataIndex: 'expediente',
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      render: s => s === 0 ? 'Masculino' : 'Femenino',
    },
    {
      title: 'Facultad',
      dataIndex: 'facultad',
    },
    {
      dataIndex: 'id',
      title: 'Acciones',
      render: (sId, row, styles) => (
        <View style={styles}>
          <ActionButton
            icon="info"
            handler={() => {
              navigation.navigate('Deportista.details', { data: row });
            }}
            color="#FFF"
            backgroundColor="#003070"
            text="Información"
            widthPercentage={0.3}
            heightPercentage={0.035}
          />
        </View>
      ),
    }
  ];
    return (
      <View style={styles.main}>
        <SafeAreaView style={{backgroundColor: "#003070"}}/>
        <Header navigation={navigation} title={"Deportistas"}/>
        <SearchInput />
        <View style={{paddingVertical: 24, justifyContent: 'space-around', flexDirection: 'row'}}>
          {/* <View style={{flexDirection: 'row'}}> */}
            {/* <FiltersView /> */}
            {/* <OrderView /> */}
          {/* </View> */}
          <TouchableCmp>
            <View style={styles.agregarJugadorButton}>
                <Feather name={'sliders'} size={24} color={'white'}/>
                <Text style={styles.buttonText}>Filtro</Text>
            </View>
          </TouchableCmp>
          <TouchableCmp onPress={() => {navigation.navigate("Registro")}}>
            <View style={styles.agregarJugadorButton}>
                <Feather name={'user-plus'} size={24} color={'white'}/>
                <Text style={styles.buttonText}>Agregar Jugador</Text>
            </View>
          </TouchableCmp>
        </View>
        {/* You can choose between the following options to show the data: */}

        {/* USING COLUMNS ARRAY */}
        {/* <List dataSource={deportistas} columns={columns} loading={loading} /> */}

        {/* USING CUSTOM RENDER */}
        <View style={{flex: 1}}>
          <List dataSource={deportistas} renderItem={row => <DeportistasCard props={row}/>} loading={loading}/>
        </View>
          <View style={{width: "100%", height: 100, backgroundColor: 'red'}}></View>
        <View style={styles.paginacion}>
          <TouchableCmp style={styles.paginacionArrowSection} onPress={() => {console.log("Presionado PAGE LEFT")}}>
            <View style={styles.paginacionArrowButton}>
              <Feather name={'chevron-left'} size={35} color={'white'}/>
            </View>
          </TouchableCmp>
          <View style={styles.paginacionSelectPage}></View>
          <TouchableCmp style={styles.paginacionArrowSection} onPress={() => {console.log("Presionado PAGE RIGHT")}}>
            <View style={styles.paginacionArrowButton}>
              <Feather name={'chevron-right'} size={35} color={'white'}/>
            </View>
          </TouchableCmp>
        </View>
      </View>
    )
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    // position: 'relative',
  },
  paginacion:{
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
    height: 60,
    width: "90%",
    backgroundColor: 'rgba(255,0,0,0.2)',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  paginacionArrowSection:{
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  paginacionArrowButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    width: "100%",
    flex: 1,
  },
  paginacionSelectPage:{
    width: "60%",
    height: "100%",
    backgroundColor: 'green',
  },
  agregarJugadorButton:{
    width: width*0.45,
    height: 40,
    alignSelf: 'center',
    backgroundColor: "#003070",
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 12,
    // marginBottom: 12,
  },
  buttonText:{
    marginLeft: 10,
    color: "white",
    fontSize: 16 / fontScale,
  }
});