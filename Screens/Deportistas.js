import { Dimensions ,Text, View, SafeAreaView, StyleSheet } from "react-native";
import { ActionButton ,FiltersView, Header, List, OrderView, SearchInput, DeportistasCard } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';

const { fontScale } = Dimensions.get('window');

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
        <View style={{ flexDirection:'row', justifyContent: 'space-between'}}>
          <FiltersView />
          <OrderView />
        </View>
        {/* You can choose between the following options to show the data: */}

        {/* USING COLUMNS ARRAY */}
        {/* <List dataSource={deportistas} columns={columns} loading={loading} /> */}

        {/* USING CUSTOM RENDER */}
        <List dataSource={deportistas} renderItem={row => <DeportistasCard props={row}/>} loading={loading}/>
      </View>
    )
};

const styles = StyleSheet.create({
  main: {
    // backgroundColor: 'red',
    height: '90%',
    // overflow: 'hidden',
    paddingBottom: 50,
  }
});