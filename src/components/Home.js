import React from 'react'
import { View, Text, Button, Image,StyleSheet} from 'react-native'
import SyncStorage from 'sync-storage';
import { Appbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { LinearGradient } from 'expo-linear-gradient';

export default function Home({ navigation}) {
    const result = SyncStorage.get('userInfo');
   
    return (
        <View style={{backgroundColor:'rgba(32,32,32,0.9051995798319328)',maxHeight:"auto",flex:1}}>
        <Appbar.Header style={styles.header}>
      <Appbar.Action  icon={({color, size}) => (
                    <Icon 
                    name="menu" 
                    color={color}
                    size={size}
                    />
                
                )} onPress={()=>navigation.toggleDrawer()} />
                <Appbar.Content title="Home"  />

    </Appbar.Header >
    <Image source={require("../../assets/abc5.jpeg")}
                 style={{width:350,height:140,margin:10,marginTop:20}}/>
                  <Image source={require("../../assets/abc4.jpg")}
                 style={{width:350,height:200,margin:10}}/>
                 <Text style={{color:'#fff',textAlign:'center',margin:10,fontSize:15}}>Remember that the happiest people are not those getting more, but those giving more.”<Text style={{fontWeight:'bold'}}> – H. Jackson Brown Jr.</Text></Text>
                 <Text style={{color:'#fff',textAlign:'center',margin:10,fontSize:15}}>“We make a living by what we get. We make a life by what we give.” <Text style={{fontWeight:'bold'}}>– Winston Churchill</Text></Text>
       {/* <LinearGradient colors={['#303030','#000000', '#000000']}> */}
            
            {/* <Image
            style={{ width: 200, height: 200, borderRadius: 50 }}
            source={{ uri: result.picture.data.url }}
            /> */}
            {/* <Button 
                title="Go To Profile"
                onPress={() => navigation.navigate('Profile')}/> */}
                {/* </LinearGradient> */}
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        
        backgroundColor:'#b61515',
        height:40,
        paddingBottom:10
    }
})