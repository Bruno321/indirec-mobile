import react, {useEffect,useState} from "react";
import { View, Text,FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import AsistenciasCard from "../components/AsistenciasCard";

const Asistencias = ({navigation}) => {
    const [data,setData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            let token = await AsyncStorage.getItem('token')
            axios({
                method: "GET",
                url: "http://192.168.100.25:3000/api/deportistas/asistencias",  //NOTA: En el url se debe cambiar con la DIRECCION IP DE TU MAQUINA, no funciona si ponemos localhost ni tampoco 127.0.0.1
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
    },[])
    return(
        <View>
            <Header navigation={navigation}/>
            <Text>Asistencias</Text>
            <FlatList 
                data={data}
                renderItem={({item})=><AsistenciasCard props={item}/>}
            />
        </View>
    )
}

export default Asistencias;