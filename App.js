import React, { useState, useEffect, useCallback } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from './components/CustomDrawer';
import { LoginContext } from './Context/LoginContext';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Login,
  Home,
  Registro,
  Deportistas,
  Asistencias,
  DeportistaDetails,
  RegistroEquipos,
  Equipos,
  Eventos
} from './Screens/index';

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Para saber cuando las fuentes hayan cargado y ocultar la pantalla de carga
  const [appIsReady, setAppIsReady] = useState(false);
  const [isAuth,setIsAuth] = useState(false)
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const loginContext = {
    iniciarSesion: async (token) => {
      setIsAuth(true)
      await AsyncStorage.setItem('token',token)
    },
    cerrarSesion: async () => {
      setIsAuth(false)
      await AsyncStorage.removeItem('token')
    }
  } 

  // Prepara las fuentes que se usarán en la app y cambia la variable para saber que puede ocultar la pantalla de carga
  useEffect(() => {
    async function prepare () {
      try {
        let retrieveToken = await AsyncStorage.getItem('token')
        if(retrieveToken){
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
        await Font.loadAsync({
          'Fredoka-Bold': require('./assets/Fuentes/Fredoka-Bold.ttf'),
          'Fredoka-Light': require('./assets/Fuentes/Fredoka-Light.ttf'),
          'Fredoka-Medium': require('./assets/Fuentes/Fredoka-Medium.ttf'),
          'Fredoka-Regular': require('./assets/Fuentes/Fredoka-Regular.ttf'),
          'Fredoka-SemiBold': require('./assets/Fuentes/Fredoka-SemiBold.ttf'),
        })
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
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

  const SideDrawer = () => {
    return(
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props}/>}
        screenOptions={{ 
          headerShown: false,
          drawerLabelStyle: {marginLeft: -15, color: '#fff'}
        }}
      >
          <Drawer.Screen name="Deportistas" component={Deportistas} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/sports.png')}/>,
              title: 'Deportistas'
            }}
          />
          <Drawer.Screen name="RegistroEquipos" component={RegistroEquipos} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/sports.png')}/>,
              title: 'Registrar Equipos'
            }}
          />
          <Drawer.Screen name="Asistencias" component={Asistencias} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/clock.png')}/>,
              title: 'Asistencias'
            }}
          />
          <Drawer.Screen name="Registro" component ={Registro} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/register.png')}/>,
              title: 'Registrar deportista'
            }}
          />
          <Drawer.Screen name="Home" component={Home} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/list.png')}/>,
              title: 'Pase de lista'
            }}
          />
          <Drawer.Screen name="Equipos" component={Equipos} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/list.png')}/>,
              title: 'Equipos'
            }}
          />
          <Drawer.Screen name="Eventos" component={Eventos} 
            options={{
              drawerIcon: () => <Image source={require('./assets/icons/list.png')}/>,
              title: 'Eventos'
            }}
          />
      </Drawer.Navigator>
    );
  };

  return (
    // AuthContext es importado desde context.js, authContext utiliza useMemo
    <LoginContext.Provider value={loginContext}>
      {/* Cuando carga NavigationContainer, llama la función onLayoutRootView*/}
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

        { isAuth ? 
          <>
            <Stack.Screen name="drawer" component={SideDrawer}/> 
            <Stack.Screen name="Deportista.details" component={DeportistaDetails}/> 
          </>
        : 
          <Stack.Screen name="Login" component={Login}/>
        }
        </Stack.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
};
