import { View, Text} from "react-native";
import { ActionButton, FiltersView, Header, List, OrderView, SearchInput } from '../components';
import { useFetchData } from '../Hooks/Fetch.hook';

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
      <View>
        <Header navigation={navigation}/>
        <Text style={{fontSize:40}}>Deportistas</Text>
        <SearchInput />
        <View style={{ flexDirection:'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <FiltersView />
          <OrderView />
        </View>
        <List dataSource={deportistas} columns={columns} loading={loading} />
      </View>
    )
};
