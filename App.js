import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack"

import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/config/Navigation'
import Login from "./src/components/Login"
import firebase from "./Firebase"


// import {firebaseConfig} from './Firebase'
// firebase.initializeApp(firebaseConfig)

// export function App() {
//   return (
//     <NavigationContainer>
//       {/* <Login/> */}
      
//       <StackNavigator />
//       <StatusBar />
//     </NavigationContainer>
//   );
// }
const mystack = createStackNavigator({
  Login: Login,
  
  
 
},{
  defaultNavigationOptions:{
    headerStyle: {
      backgroundColor: '#821515',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})
const myswitch = createSwitchNavigator({
  
  stack:mystack,
  Home: Navigation,
  
 
  

})
export default createAppContainer(myswitch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
