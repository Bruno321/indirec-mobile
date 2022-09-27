import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import {FontAwesome, AntDesign} from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

import sports from './assets/icons/clock.png'

import Login from './Screens/Login';
import Home from './Screens/Home';
import Registro from './Screens/Registro';

import { AuthContext } from './components/context';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  // Para saber cuando las fuentes hayan cargado y ocultar la pantalla de carga
  const [appIsReady, setAppIsReady] = useState(false);
  // const [userToken,setUserToken] = useState(null);

  // La primera vez que se abre la aplicación, no tiene usuario ni token
  const initialLoginState={
    userName:null,
    userToken:null,
  }

  // Reducer para las acciones, asigna usuario y/o token. Usado para actualizar el estado de la aplicacón
  loginReducer = (prevState,action) =>{
    switch(action.type){
      case 'RETREIVE_TOKEN':
        return{
          ... prevState,
          userToken:action.token,
        }
      case 'LOGIN':
        return{
          ... prevState,
          userName:action.id,
          userToken:action.token,
        }
      case 'LOGOUT':
        return{
          ... prevState,
          userName:null,
          userToken:null,
        }
      case 'REGISTER':
        return{
          ... prevState,
          userName:action.id,
          userToken:action.token,
        }
    }
  }

  // LoginState = estado actual de login para saber si enviar a pantalla Login o a las demás
  // Dispatch para realizar una acción del reducer
  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  // useMemo solo recalculara el valor "memoizado" cuando una de las dependencias cambió, tendrá los valores para saber si ingresar a la aplicación o ir a las demás pantallas
  const authContext = React.useMemo(()=>({
    signIn: async(userName,password)=>{
      // setUserToken('fgkj');
      let userToken;
      userToken=null;
      if(userName=='user' && password == 'pass'){
        userToken= 'dfgdfg';
        try{
          await AsyncStorage.setItem('userToken', userToken)
        }catch(e){
          console.log(e)
        }
      }
      dispatch({type:'LOGIN',id:userName, token:userToken})
    },
    signOut: async()=>{
      // setUserToken(null);
      try{
        await AsyncStorage.removeItem('userToken');
      }catch(e){
        console.log(e)
      }
      dispatch({type:'LOGOUT'})
    },
    signUp:()=>{
      // setUserToken('fgkj');
    },
  }),[]);

  // Prepara las fuentes que se usarán en la app y cambia la variable para saber que puede ocultar la pantalla de carga
  useEffect(() => {
    let userToken = null;
    async function prepare () {
      try {
        await Font.loadAsync({
          'Fredoka-Bold': require('./assets/Fuentes/Fredoka-Bold.ttf'),
          'Fredoka-Light': require('./assets/Fuentes/Fredoka-Light.ttf'),
          'Fredoka-Medium': require('./assets/Fuentes/Fredoka-Medium.ttf'),
          'Fredoka-Regular': require('./assets/Fuentes/Fredoka-Regular.ttf'),
          'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka-SemiBold.ttf'),
        })
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
      dispatch({type:'REGISTER', token:userToken})
    }
    prepare();
  }, []);

  // Oculta la pantalla de carga cuando la app está lista
  /* A function that is called when the app is ready. It hides the splash screen. */
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;
  

  const Drawer = createDrawerNavigator();

  return (
    // AuthContext es importado desde context.js, authContext utiliza useMemo
    <AuthContext.Provider value={authContext}>
      {/* Cuando carga NavigationContainer, llama la función onLayoutRootView*/}
      <NavigationContainer onReady={onLayoutRootView}>
        { loginState.userToken !== null ? ( // Si hay un token guardado
          <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props}/>}
            screenOptions={{ 
              headerShown: false,
              drawerLabelStyle: {marginLeft: -15, color: '#fff'}
            }}
          >
              <Drawer.Screen name="Home" component={Home} 
                options={{
                  drawerIcon: () => <AntDesign name='home' size={25} color='#fff'/>,
                  title: 'Home'
                }}
              />
              <Drawer.Screen name="Registro" component ={Registro} 
                options={{
                  drawerIcon: () => <AntDesign name='checkcircleo' size={25} color='#fff'/>,
                  title: 'Registro'
                }}
              />
          </Drawer.Navigator>
        )
        : // Si no hay un token guardado
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component ={Login} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}