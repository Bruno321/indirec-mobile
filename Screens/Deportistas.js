import { useState,useEffect } from "react";
import { View, Text , FlatList} from "react-native";
import { ActionButton, FiltersView, List, OrderView, SearchInput, Header } from '../components';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Deportistas = ({navigation}) => {
    const [data,setData] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            let token = await AsyncStorage.getItem('token')
            axios({
                method: "GET",
                url: "http://192.168.100.25:3000/api/deportistas",  //NOTA: En el url se debe cambiar con la DIRECCION IP DE TU MAQUINA, no funciona si ponemos localhost ni tampoco 127.0.0.1
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin":null ,
                    "Accept":"*/*"
                },
                mode: 'cors',
            })
            .then((response)=>{
                setData(response.data.data)
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        fetchData()
    },[]);

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
                icon="info-circle"
                handler={() => console.log('Editar', sId)}
                color="#FFF"
                backgroundColor="#003070"
                text="Información"
            />
            </View>
            ),
        }
    ];
    return(
        <View>
            <Header navigation={navigation}/>
            <Text style={{fontSize:40}}>Deportistas</Text>
            {/* <FlatList 
                data={data}
                renderItem={({item})=><DeportistasCard props={item}/>}
            /> */}
            <SearchInput />
            <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                <FiltersView />
                <OrderView />
            </View>
            <List dataSource={data} columns={columns}/>
        </View>
    )
}

export default Deportistas;