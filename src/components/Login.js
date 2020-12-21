import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,KeyboardAvoidingView , TouchableOpacity,Alert } from 'react-native';
import StackNavigator from '../config/Navigation'
import { Button, Item, Input, Label } from 'native-base';
import * as firebase from 'firebase'
import * as Facebook from 'expo-facebook';
// import SyncStorage from 'sync-storage';
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { LinearGradient } from 'expo-linear-gradient';

export default class SignupScreen extends React.Component {
  state={
    Email:"",
    Password:""
  
  }
  async facebookLogin() {
    await Facebook.initializeAsync({
      appId: '1034819950265260',
    });
    const {
      type,
      token,
      expirationDate,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    })

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`);
      const userInfo = await response.json()
      console.log('userInfo', userInfo)
      SyncStorage.set('userInfo', userInfo);
    // const result = SyncStorage.get('userInfo');
    //   Alert.alert('Logged in!', `Hi ${result.name}!`);
    //   console.log(">>>>>>>>",result)
      this.props.navigation.navigate('Home')
  
    
    } else {
      // type === 'cancel'
    }
  }
  static navigationOptions ={
    title:" Log in"
  }
  userSignin(Email,Pass){

      firebase.auth().signInWithEmailAndPassword(Email,Pass)
      .then(()=>{
        Alert.alert("Your Account LogIn SucessFully!!")
        this.props.navigation.navigate("Home")
      })
      .catch(error=>{
Alert.alert(error.message)
      })
  }
    render(){
        return (
          <LinearGradient
        // Background Linear Gradient
        colors={['#303030','#000000', '#000000']}
        style={{maxHeight:"auto",flex:1}}
      >
            <KeyboardAvoidingView
            behavior="position"
            
            >
           
              <View style={{alignItems:"center"}}>
             
                
                 <Image source={require("../../assets/abc3.png")}
                 style={{width:180,height:180,marginTop:30,}}/>
                 <Text style={{color:"#bb2121",fontWeight:"bold",fontSize:20}}>
                   Blood Donation
                 </Text>
              </View>
              
            {/* <Item floatingLabel
            style={styles.item}> */}
              {/* <Label>Email</Label>
              <Input
              value={this.state.Email}
              onChangeText={(text)=>this.setState({Email:text})}
              /> */}
            {/* </Item> */}
            {/* <Item floatingLabel
            style={styles.item}>
              <Label>Password</Label>
              <Input
              secureTextEntry={true}
              value={this.state.Password}
              onChangeText={(text)=>this.setState({Password:text})}
              />
            </Item> */}
            {/* <Button style={{backgroundColor:"#f56262", margin:30}} full rounded danger
            onPress={()=>this.userSignin(this.state.Email,this.state.Password)}
            >
              <Text style={{fontSize:20,color:"white"}}>
                 Log In
              </Text>
            </Button> */}
            {/* <TouchableOpacity
            onPress={()=>this.props.navigation.navigate("Signup")}
            >
              <Text style={{textAlign:"center"}}>
                Don't have an account ?
              </Text>
            </TouchableOpacity> */}
            <Button style={{backgroundColor:"#821515", margin:30,marginTop:130}} full rounded danger
            onPress={()=> this.facebookLogin()}
            >
              <Text style={{fontSize:20,color:"white"}}>
                 Sign In With Facebook
              </Text>
            </Button>
              <StatusBar style="auto" />
            </KeyboardAvoidingView>
            </LinearGradient>
           
          );
    }
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: (107,107,110),

    padding:10,
    justifyContent: 'flex-start',
  },
  item:{
    borderBottomColor:"red",
    margin:10,
  }
});
// const signOut = function(){
     
  // Facebook.logOutAsync()
// }

class signOut extends React.Component {
  abc(){
    console.log("hamza rana")
  }
 
  }
export {signOut}