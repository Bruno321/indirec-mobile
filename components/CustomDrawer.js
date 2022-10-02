import React from "react";
import { View, Text, Img } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import {Entypo} from 'react-native-vector-icons';
import { AuthContext } from "./context";

const CustomDrawer = (props) => {

    const { signOut } = React.useContext(AuthContext);

    const logoutHandle= ()=>{
		signOut();
	}

    return (
        <View style={{flex: 1, backgroundColor:'#003070'}}>
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <DrawerItem 
                    label={ () => <Text style={{color: '#fff', marginLeft: -15, fontWeight: '600'}}>Cerrar Sesion</Text>}
                    onPress={() => {
                        logoutHandle()}
                    }  
                    labelStyle={{color: '#ffffff'}} 
                    icon={
                        () => <Entypo name='log-out' size={25} color='white'/>
                    }
                />
        </View>
    )
}

export default CustomDrawer;
