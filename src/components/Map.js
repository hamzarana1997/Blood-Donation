import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

export default class App extends React.Component {
   
  render() {
    const { route } = this.props;
    const params = route.params;
    // const { params } = this.props.navigation.state;
    const location = params ? params.location : null;
    const name = params ? params.name : null;
    const bloodGroup = params ? params.bloodGroup : null;
    const lat = location.latitude
    const lng = location.longitude
   
    const latlng =location
    const back =()=>{
      console.log(name)
      // donor
      this.props.navigation.navigate('Donor')
      
    }
    return (
      <View style={styles.container}>
          {/* <Appbar.Header style={styles.header}>
      <Appbar.Action  icon={({color, size}) => (
                    <Icon 
                    name="menu" 
                    color={color}
                    size={size}
                    />
                
                )} onPress={()=>back()} />
                <Appbar.Content title="Home"  />

    </Appbar.Header> */}
        <MapView  style={styles.mapStyle}
    // initialRegion={
     
      
    // }
    region={{latitude:lat,
    longitude:lng,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,}}
  >
  <Marker coordinate={latlng} title={`${name}`} description={bloodGroup} >
  
</Marker>
  </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
