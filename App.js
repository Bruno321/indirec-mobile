import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import Login from './Screens/Login';
import Home from './Screens/Home';
import Registro from './Screens/Registro';

import { AuthContext } from './components/context';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [userToken,setUserToken] = useState(null);

  const initialLoginState={
    userName:null,
    userToken:null,
  }

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
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext = React.useMemo(()=>({
    signIn:(userName,password)=>{
      // setUserToken('fgkj');
      let userToken;
      userToken=null;
      if(userName=='user' && password == 'pass'){
        userToken= 'dfgdfg';
      }
      dispatch({type:'LOGIN',id:userName, token:userToken})
    },
    signOut:()=>{
      setUserToken(null);
      dispatch({type:'LOGOUT'})

    },
    signUp:()=>{
      setUserToken('fgkj');
    },
  }),[]);

  useEffect(() => {
    async function prepare() {
      try {
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

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer onReady={onLayoutRootView}>
        { loginState.userToken !== null ? (
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Registro" component ={Registro} />
          </Stack.Navigator>
        )
        :
          <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="Login" component ={Login} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}