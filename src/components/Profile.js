// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { Appbar } from 'react-native-paper';
// import Icon from "react-native-vector-icons/MaterialCommunityIcons"

// export default function Profile({ navigation}) {
//     return (
//         <View>
//          <Appbar.Header style={styles.header}>
//   <Appbar.Action  icon={({color, size}) => (
//                 <Icon 
//                 name="menu" 
//                 color={color}
//                 size={size}
//                 />

//             )} onPress={()=>navigation.toggleDrawer()} />
//             <Appbar.Content title="Profile"  />

// </Appbar.Header>

//         </View>
//     )
// }
// const styles = StyleSheet.create({
// header: {
//     height:30,
//     paddingBottom:10
// }
// })
import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, KeyboardAvoidingView, ImageBackground,Alert } from 'react-native'
import { Button, Item, Input, Icon, Container, Content, Picker, Label, Form } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import {Avatar} from "react-native-elements"

// import { ImagePicker } from "expo-image-picker";
// import { ImagePicker, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import { StyleSheet, Text, View,Image,KeyboardAvoidingView , TouchableOpacity,Alert, ImageBackground } from 'react-native';
// import { Button, Item, Input, Label } from 'native-base';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import firebase from "firebase"
// import firebase from "../../Firebase"
// const userData = SyncStorage.get('userInfo');



// console.log(">>>>>>>>>>>>>acaca>>>>>>>>>>>>>",uid)
// if(userData){
//   const uid = userData.id
export default class ProfileScreen extends Component {



  constructor(props) {
    super(props)

    this.state = {
      name:"",
      cell:null,
      uid:"",
      // language: 'Blood Group',
      firstLanguage: 'Blood Group',
      secondLanguage: '',
      selectImg: null,
      location: null,
      geocode: null,
      errorMessage: "",
      
     
    }

  }
  async componentDidMount() {
    const response = await SyncStorage.get('userInfo');
    const json = await response.id
    this.setState({ uid: json });
    
  }
  
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
    const { latitude, longitude } = location.coords
    this.getGeocodeAsync({ latitude, longitude })
    this.setState({ location: { latitude, longitude } });

  };
  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode })
  }

  addData =  () =>{
    console.log(this.state.geocode)
    console.log("asdfghhjjk")
    let {firstLanguage,uid,name,cell,secondLanguage,geocode,location,selectImg} = this.state
    if(name == ""|| cell == ""||firstLanguage == "Blood Group"||secondLanguage == "Fever"||geocode == null||location == null|| selectImg==null){
    
     
      Alert.alert(
        "Error",
        "Please fill all the fields!",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else{
     const storageRef = firebase.storage().ref().child(`images`);
     SyncStorage.set('location',location);
     SyncStorage.set('dp',selectImg.localUri);
     SyncStorage.set('name',name);
      storageRef.put(this.state.selectImg).then(function (response) {
        response.ref.getDownloadURL().then(function (uri) {
          
    firebase.firestore().collection("userData").doc(uid)
      .set({
        name: name,
        cell: cell,
        bloodGroup: firstLanguage,
        image: uri,
        fever: secondLanguage,
        geocode: geocode,
        location: location,
        distanceFromHere: 0,


      })
      .then(function () {
        // handleClose();
        console.log("success")
        Alert.alert(
          "Done",
          "Your data added Successfully",
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel"
            // },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        // Swal({
        //   title: "Company",
        //   text: "Your company added successfully",
        //   icon: "success",
        // });
      })
      .catch(function (e) {
        // Swal({
        //   title: "Error",
        //   text: e.message,
        //   icon: "error",
        // });
        alert("error");
      });
    });
    });
  }
  }



  // const [ setSelectedImg]  = useState(null)
  openImage = async () => {
    let permission = await ImagePicker.requestCameraRollPermissionsAsync();


    if (permission.granted === false) {
      return;
    }

    let picker = await ImagePicker.launchImageLibraryAsync()

    if (picker.cancelled === true) {
      return;
    }
    this.setState({ selectImg: { localUri: picker.uri } })
    console.log(picker)
  }
  render() {
    
   

    const { location, geocode, errorMessage } = this.state
    return (

      <KeyboardAvoidingView style={{backgroundColor:'rgba(32,32,32,0.9051995798319328)',flex:1}}>
        <ScrollView>
          <View style={Styles.root}>
            <Appbar.Header style={Styles.header}>
              <Appbar.Action icon={({ color, size }) => (
                <Icons
                  name="menu"
                  color={color}
                  size={size}
                />

              )} onPress={() => this.props.navigation.toggleDrawer()} />
              <Appbar.Content title="Profile" />

            </Appbar.Header>
            {/* <LinearGradient
           style={{height:180}}
           colors={["#f56262","#ff9e9e"]}
           
           /> */}
            {/* <Image

                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 100/4,
                    borderWidth: 3,
                    marginTop:-20,
                    borderColor: 'black',
                }}
             
        />  */}
            <View>
              <View style={Styles.container}>
                {
                  this.state.selectImg !== null ? (

                    <Avatar
                            rounded
                            onPress={()=>{props.navigation.navigate("Profile")}}
                            source={{ uri: (this.state.selectImg.localUri !== null) ? this.state.selectImg.localUri : 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg' }}
                                size={70}
                                
                            />
                    // <Image
                    //   style={{
                    //     width: 100,
                    //     height: 100,
                    //     borderRadius: 100 / 4,
                    //     borderWidth: 3,
                    //     marginTop: -50,
                    //     borderColor: '#f56262',
                    //   }}
                    //   source={{ uri: (this.state.selectImg.localUri !== null) ? this.state.selectImg.localUri : 'https://image.shutterstock.com/image-vector/dots-letter-c-logo-design-260nw-551769190.jpg' }} />
                  ) :  <Avatar
                  rounded
                  onPress={()=>{props.navigation.navigate("Profile")}}
                      source={{
                          uri: SyncStorage.get('userInfo').picture.data.url
                      }}
                      size={70}
                      
                  />
                }
                <TouchableOpacity
                  onPress={this.openImage}
                >
                  {/* <Icon style={{ color: "#b61515", marginLeft: 2 }} active name='camera' /> */}
                  <Icons name='camera' size={35} color='#b61515' style={{marginTop:4}}/>
                  {/* <Text>Click</Text> */}
                </TouchableOpacity>
              </View>
            </View>
            <View style={{paddingLeft:5,paddingRight:5}}>
            <Item floatingLabel >
              <Icon style={{ color: "#b61515" }} active name='person' />
              <Input
              style={{color:'#fff',marginTop:10}}
                  value={this.state.name}
                  onChangeText={(e)=>{this.setState({name:e})}}
                placeholder=' Full Name'
                placeholderTextColor='#fff'

              />
            </Item>
            <Item floatingLabel style={{paddingBottom:5 , marginTop:-5}}
            >
              <Icon style={{ color: "#b61515" }} active name='call' />
              <Input
              style={{color:'#fff',marginTop:5}}
                keyboardType='numeric'
                  value={this.state.cell}
                  onChangeText={(text)=>this.setState({cell:text})}
                placeholder='Phone number'
                placeholderTextColor='#fff'
              />
            </Item>
            <Item picker style={{marginTop:5}}>

              {/* <Icon style={{ color: "#b61515" }} active name='medkit' /> */}
              <Icons name='medical-bag' size={28} color='#b61515' style={{marginTop:-2}}/>


              <Picker style={{color:'#fff' }}

                //   style={styles.onePicker} itemStyle={styles.onePickerItem}
                selectedValue={this.state.firstLanguage}
                onValueChange={(itemValue) => this.setState({ firstLanguage: itemValue })}


              >
                <Picker.Item label="Blood Group" value="Blood Group" color='black '  />
                <Picker.Item label="A RhD positive (A+)" value="A RhD positive (A+)" />
                <Picker.Item label="A RhD negative (A-)" value="A RhD negative (A-)" />
                <Picker.Item label="B RhD positive (B+)" value="B RhD positive (B+)" />
                <Picker.Item label="B RhD negative (B-)" value="B RhD negative (B-)" />
                <Picker.Item label="O RhD positive (O+)" value="O RhD positive (O+)" />
                <Picker.Item label="O RhD negative (O-)" value="O RhD negative (O-)" />
                <Picker.Item label="AB RhD positive (AB+)" value="AB RhD positive (AB+)" />
                <Picker.Item label="AB RhD negative (AB-)" value="AB RhD negative (AB-)" />

              </Picker>

            </Item>
            <Item picker >

              <Icon style={{ color: "#b61515" }} active name='pulse' />

              <Picker style={{color:'#fff'}}

                //   style={styles.onePicker} itemStyle={styles.onePickerItem}
                selectedValue={this.state.secondLanguage}
                onValueChange={(itemValue) => this.setState({ secondLanguage: itemValue })}

              >
                <Picker.Item label="Health" value="Health" />
                <Picker.Item label="Fever" value="Fever" />
                <Picker.Item label="Cough" value="Cough" />
                <Picker.Item label="Flu" value="Flu" />
                <Picker.Item label="Heart Pain" value="Heart Pain" />


              </Picker>

            </Item>


          
          <Item style={Styles.overlay}  >

            <TouchableOpacity onPress={() => this.getLocationAsync()} >
            <Icons name='navigation' size={30} color='#b61515' style={{marginTop:20,marginLeft:-5}} />

              {/* <Icon style={{ color: "#b61515", ma}} name='navigate' /> */}

              {/* <Image source={require("../../assets/marker.png")} style={{width:100,height:100}} /> */}
              <Text style={{color:'#fff',marginLeft:35,marginTop:-25 ,fontSize:16, textAlign:"center"}}>{geocode ? "" : "Select current location"}</Text>
              <Text style={{color:'#fff',marginLeft:35 ,marginTop:-30, fontSize:16}}>{geocode ? `${geocode[0].city}, ${geocode[0].isoCountryCode}` : ""}</Text>
              <Text style={{color:'#fff',marginLeft:35 , textAlign:"center",fontSize:16,marginBottom:15}}>{geocode ? geocode[0].district : ""}</Text>
              {/* <Text style={Styles.heading3}>{location ? `${location.latitude}, ${location.longitude}` :""}</Text> */}
              <Text style={Styles.heading2}>{errorMessage}</Text>
              {/* <Button onPress={()=>this.getLocationAsync()}><Text>Click me</Text></Button>  */}
            </TouchableOpacity>

          </Item>
          </View>
          </View>
          <Button style={{ alignItems: "center", padding: 20, marginTop: 60, marginLeft: 110, backgroundColor: "#b61515", borderRadius: 10 }} onPress={() => {this.addData()}} >
            <Icon name='save' />
            <Text style={{ fontSize: 20, color: "white" }}>SAVE</Text>
          </Button>

        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
const Styles = StyleSheet.create({
  root: {

    flex: 1,
  }, item: {
    borderBottomColor: "red",
    margin: 10,
  },
  onePicker: {
    width: 200,
    height: 44,
    // backgroundColor: '#FFF0E0',
    borderColor: '#f56262',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red'
  },
  row: { flexDirection: 'row' },
  button: {
    borderRadius: 10,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f56262',
    width: 100,
    height: 100,
    borderRadius: 100 / 4,
    borderWidth: 3,
    padding: 10
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  container: {
    marginTop:10,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    
    marginTop: 40,
    textAlign: "center",
    // backgroundColor: "white",
    height: 30,
    width: 'auto'

  },
  heading1: {

    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: -35,

    marginLeft: 90
  },
  heading2: {
    color: "#fff",
    margin: 5,
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 105
  },
  header: {
    backgroundColor:'#b61515',
    height:40,
    paddingBottom: 10
  }
})


