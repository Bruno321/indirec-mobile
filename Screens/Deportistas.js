import react, { useState,useEffect } from "react";
import { View, Text ,FlatList} from "react-native";
import Header from "../components/Header";
import DeportistasCard from "../components/DeportistasCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Deportistas = ({navigation}) => {
    const [data,setData] = useState([])
   
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
    },[])
    return(
        <View>
            <Header navigation={navigation}/>
            <Text style={{fontSize:40}}>Deportistas</Text>
            <FlatList 
                data={data}
                renderItem={({item})=><DeportistasCard props={item}/>}
            />
        </View>
    )
}

export default Deportistas;