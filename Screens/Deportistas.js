import { Dimensions ,Text, View } from "react-native";
import { ActionButton, DeportistasCard ,FiltersView, Header, List, OrderView, SearchInput } from '../components';
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
      <View style={{ flex:1, marginBottom: '65%' }}>
        <Header navigation={navigation} title={"DEPORTISTAS"}/>
        <Text style={{ fontSize: 35 / fontScale, fontFamily: 'Fredoka-Medium', alignSelf: 'center'}}>Deportistas</Text>
        <SearchInput />
        <View style={{ flexDirection:'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <FiltersView />
          <OrderView />
        </View>
        {/* You can choose between the following options to show the data: */}

        {/* USING COLUMNS ARRAY */}
        <List dataSource={deportistas} columns={columns} loading={loading} />

        {/* USING CUSTOM RENDER */}
        {/* <List dataSource={deportistas} renderItem={row => <DeportistasCard props={row} />} loading={loading} /> */}
      </View>
    )
};
