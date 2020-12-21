import React, { useEffect, useState } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    Alert,
    TouchableHighlight,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Linking, 
	Platform,
} from 'react-native';
import {
    Picker,
    Item,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    Text,
    Icon,
    Button,
    Left,
    Right,
    FlatList,
} from 'native-base';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase';
import { joinRoom } from '../../Firebase';
import { Appbar } from 'react-native-paper';
import Icons from "react-native-vector-icons/MaterialCommunityIcons"
import SyncStorage from 'sync-storage';
import {getDistance} from 'geolib';
import { Accuracy } from 'expo-location';
import ScrollableTabView from 'react-native-scrollable-tab-view'


function donor({ navigation}) {
    const location = SyncStorage.get('location') ? SyncStorage.get('location') : {latitude:0, longitude:0}
  
    const [donorList, setDonorList] = useState();
    const [modalVisible,setModelVisible] = useState(false);
    const [firstLanguage,setFirstLanguage] = useState(null);
    const [firstLanguage1,setFirstLanguage1] = useState(null);
    // const [distances,setDistances] = useState(0);
    useEffect(()=>{
        getDonor()
	
	},[])
	
const distanceFilter = function (loc,uid){
let id = uid
	let distance = getDistance(
		{ latitude: location.latitude, longitude: location.longitude },
		{ latitude: loc.latitude, longitude: loc.longitude },  1
	  );
	  console.log(distance/1000,"Km")
	  console.log(">id idi id>>>>")
	  let dis = distance/1000
	//   setDistances(dis)
	  const data = firebase.firestore().collection("userData").doc(id)
	  data.update({
		distanceFromHere: dis,
	})   .then(function () {
        // handleClose();
        console.log("success")
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
	  return (dis+ " Km")
	
	//   firebase.firestore().collection("userDate").doc(id).set({
	// 	  distanceFromHere: distance
	//   })
}
// const setDistance = function(id){
	
// }
    const getDonor = function () {


        firebase
            .firestore()
            .collection("userData")
            .onSnapshot((res) => {
                const list = [];
                res.forEach((doc) => {
                    const comp = doc.data();
                    list.push({ ...comp, compId: doc.id });
                });
                setDonorList(list);
                console.log(list)
            });

    };
    const getBloodFilter = function () {
		if(firstLanguage&&firstLanguage1==null){
			firebase
            .firestore()
            .collection("userData")
            .where("bloodGroup", "==", firstLanguage)
            .onSnapshot((res) => {
                const list = [];
                res.forEach((doc) => {
                    const comp = doc.data();
                    list.push({ ...comp, compId: doc.id });
                });
                setDonorList(list);
                console.log(list)
            });
		}
else if(firstLanguage1&&firstLanguage==null){

	firebase
	.firestore()
	.collection("userData")
	.where("distanceFromHere","<=",+firstLanguage1)
	.onSnapshot((res) => {
		const list = [];
		res.forEach((doc) => {
			const comp = doc.data();
			list.push({ ...comp, compId: doc.id });
		});
		setDonorList(list);
		console.log(list)
	});

}
else if(firstLanguage==null&&firstLanguage1==null){
	getDonor()
}
else{
	firebase
            .firestore()
            .collection("userData")
            .where("bloodGroup", "==", firstLanguage).where("distanceFromHere","<=",+firstLanguage1)
            .onSnapshot((res) => {
                const list = [];
                res.forEach((doc) => {
                    const comp = doc.data();
                    list.push({ ...comp, compId: doc.id });
                });
                setDonorList(list);
                console.log(list)
            });

}
        
    };
  
     const makeCall = function(cell) {

		let phoneNumber = '';
	
            if (Platform.OS === 'android') {
                phoneNumber = `tel:${cell}`;
              } else {
                phoneNumber = `telprompt:${cell}`;
              }
          
              Linking.openURL(phoneNumber);
      
        }
    //     const navigateToChat = function(fid){
    //         joinRoom(fid)
    //         console.log(fid)
    //         navigation.navigate('Chat' , { fid:fid})
    
		
	//   };
    return (
		
        <View style={{backgroundColor:'rgba(32,32,32,0.9051995798319328)',height:'auto',flex:1}}>
             <Appbar.Header style={styles.header}>
      <Appbar.Action  icon={({color, size}) => (
                    <Icons 
                    name="menu" 
                    color={color}
                    size={size}
                    />
                
                )} onPress={()=>navigation.toggleDrawer()} />
                <Appbar.Content title="Donor"  />
                <Appbar.Action icon="magnify" onPress={()=>setModelVisible(true)} />

    </Appbar.Header>
	<ScrollView>
    <View style={styles.centeredView}>
	
    <Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModelVisible(!modalVisible)
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Filter</Text>
							<Item picker >
								<Picker style={{color:'#fff'}}
									//   style={styles.onePicker} itemStyle={styles.onePickerItem}
									selectedValue={firstLanguage}
									onValueChange={(itemValue) =>
										setFirstLanguage(itemValue)
									}
								>
									<Picker.Item label='Blood-Group'  />
									<Picker.Item
										label='A RhD positive (A+)'
										value='A RhD positive (A+)'
									/>
									<Picker.Item
										label='A RhD negative (A-)'
										value='A RhD negative (A-)'
									/>
									<Picker.Item
										label='B RhD positive (B+)'
										value='B RhD positive (B+)'
									/>
									<Picker.Item
										label='B RhD negative (B-)'
										value='B RhD negative (B-)'
									/>
									<Picker.Item
										label='O RhD positive (O+)'
										value='O RhD positive (O+)'
									/>
									<Picker.Item
										label='O RhD negative (O-)'
										value='O RhD negative (O-)'
									/>
									<Picker.Item
										label='AB RhD positive (AB+)'
										value='AB RhD positive (AB+)'
									/>
									<Picker.Item
										label='AB RhD negative (AB-)'
										value='AB RhD negative (AB-)'
									/>
								</Picker>
							</Item>
							<Item picker>
								<Picker style={{color:'#fff'}}
									//   style={styles.onePicker} itemStyle={styles.onePickerItem}
									selectedValue={firstLanguage1}
									onValueChange={(itemValue) =>
										setFirstLanguage1(itemValue)
									}
								>
									<Picker.Item label='Distance'  />
									<Picker.Item
										label='Under 2 KM'
										value='0.005'
									/>
									<Picker.Item
										label='Under 5 KM'
										value='5'
									/>
									<Picker.Item
										label='Under 10 KM'
										value='10'
									/>
									
								</Picker>
							</Item>
							{/* <MapView
								style={styles.mapStyle}
								region={this.state.region}
								onRegionChange={this.onRegionChange}
								scrollEnabled={true}
							>
								<Marker.Animated
									ref={(marker) => {
										this.marker = marker;
									}}
									coordinate={this.state.coordinate}
									title={'Farhan Baryani'}
									description={'Mazaydar Baryani'}
								/>
							</MapView> */}
							<TouchableHighlight
								style={{ ...styles.ApplyFilter, backgroundColor: '#b61515' }}
								onPress={() => {
                                    setModelVisible(!modalVisible);
                                    console.log(firstLanguage)
                                    getBloodFilter()
								}}
							>
								<Text style={styles.textStyle}>Apply Filter</Text>
								
							</TouchableHighlight>
                            <TouchableHighlight
								style={{ ...styles.ApplyFilter, backgroundColor: '#b61515' }}
								onPress={() => {
                                    setModelVisible(!modalVisible);
                                    console.log(firstLanguage)
                                   getDonor()
								}}
							>
								<Text style={styles.textStyle}>Show All</Text>
								
							</TouchableHighlight>
						</View>
					</View>
				</Modal>
				
                </View>
				
            { donorList &&
                donorList.map((items) => {
                    return (
						
                            <View >
                           
                           
                            <Card style={styles.card}> 
                                <CardItem  style={styles.card}>
                                    <Body>
                                        <View >
                                        <Text style={styles.text}>Name :{items.name}</Text>
                                        <Text style={styles.text}>Blood Group : {items.bloodGroup}</Text>
                                        <Text style={styles.text}>Phone :{items.cell}</Text>
                                        <Text style={styles.text} onPress={()=>navigation.navigate('Map',{location:items.location,name:items.name,bloodGroup:items.bloodGroup})}>Location :{items.geocode[0].district},{items.geocode[0].city},{items.geocode[0].isoCountryCode}</Text>
					<Text style={styles.text} >Distance :{ SyncStorage.get('location')? distanceFilter(items.location,items.compId):` 0 km`}</Text>
                                        </View>
                                        {/* <View style={{marginTop:20}}>

                                              </View> */}
                                    </Body>
                                    <View>
                                    {/* <Icon name="chatbubbles" style={styles.icon} onPress={()=>{navigateToChat(items.compId)}}  /> */}
                                    <Icon name="chatbubbles" style={styles.icon} onPress={()=>navigation.navigate('Chat' , { fid:items.compId})}  />
                                    </View>
                                    <View>
                                    <Icon name="call" style={styles.icon1} onPress={() => {makeCall(items.cell)}} activeOpacity={0.7} />
                                    </View>
                                </CardItem>
                            </Card>
							
                           </View>
                       
                    );
                })
            }
		</ScrollView>
        </View>
	
    )
}
export default donor

const styles = StyleSheet.create({
	card: {
		maxHeight:'auto',
		padding: -10,
		backgroundColor: '#b61515',
		borderRadius : 30,
	},
	icon: {
		color: '#fff',
		marginTop : 60,
		marginRight:-35,
		fontSize : 35,
		
	},
	icon1 :{
	 marginTop:-40,
	 fontSize : 35,
	 color: '#fff',
	},
	text : {
		color : '#fff',
		fontWeight: 'bold',
		fontSize : 15,
    },
    header: {
        backgroundColor:'#b61515',
        height:40,
		paddingBottom:10,
		
    },
    centeredView: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'rgb(32,32,32)',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	ApplyFilter:{
		marginTop:15,
		backgroundColor: '#F194FF',
		borderRadius: 20/2,
		padding: 20,
		elevation: 2,
	},
	openButton: {
		
		backgroundColor: '#F194FF',
		borderRadius: 80/4,
		padding: 20,
		elevation: 2,
	},
	textStyle: {
		
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		color:'#fff',
		marginBottom: 15,
		textAlign: 'center',
	},
});
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#36a4ba',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     card: {
//         height: 120,
//         padding: -10,
//         backgroundColor: '#36a4ba',
//     },
//     buttton: {
//         color: '#fff',
//         padding: 14,
//         //backgroundColor : "#36a4ba",
//         marginLeft: 250,
//         marginTop: -40,
//     },
// });
