import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import {FontAwesome, AntDesign} from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LoginContext} from './Context/LoginContext';
import sports from './assets/icons/clock.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Screens/Login';
import Home from './Screens/Home';
import Registro from './Screens/Registro';
import Deportistas from './Screens/Deportistas';
import Asistencias from './Screens/Asistencias';


const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  // Para saber cuando las fuentes hayan cargado y ocultar la pantalla de carga
  const [appIsReady, setAppIsReady] = useState(false);

   
 
  const [isAuth,setIsAuth] = useState(false)

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
  

  const Drawer = createDrawerNavigator();

  return (
    // AuthContext es importado desde context.js, authContext utiliza useMemo
    <LoginContext.Provider value={loginContext}>
      {/* Cuando carga NavigationContainer, llama la función onLayoutRootView*/}
      <NavigationContainer onReady={onLayoutRootView}>
        { isAuth ===true ? ( // Si hay un token guardado
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
          </Drawer.Navigator>
        )
        : // Si no hay un token guardado
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component ={Login} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </LoginContext.Provider>
  );
}