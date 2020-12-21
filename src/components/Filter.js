import React, { Component } from 'react';
import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	Dimensions,
} from 'react-native';
import {
	Container,
	Header,
	Content,
	Item,
	
	Button,
	Picker,
	
} from 'native-base';
import Icon from 'react-native-ionicons'
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView, {
	Marker,
	AnimatedRegion,
	ProviderPropType,
} from 'react-native-maps';
class App extends Component {
	state = {
		modalVisible: false,
		firstLanguage: 'Filter',
		// region: {
		// 	latitude: 24.907462,
		// 	longitude: 67.1378945,
		// 	latitudeDelta: 0.001,
		// 	longitudeDelta: 0.001,
		// },
		// // coordinate: new AnimatedRegion({
		// // 	latitude: 24.907462,
		// // 	longitude: 67.1378945,
		// // }),
		// markers: [],
		// location: null,
	};

	async componentDidMount() {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			Alert('Permission to access location was denied');
            return;
            
		}

		Location.watchPositionAsync(
			{
				distanceInterval: 2,
				accuracy: 6,
			},
			(location) => {
				console.log('location***', location);
				let {
					coords: { latitude, longitude },
				} = location;
				this.setState({
					region: {
						latitude,
						longitude,
						latitudeDelta: 0.001,
						longitudeDelta: 0.001,
					},
				});
				this.animate({ latitude, longitude });
			}
		);

		let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});

		console.log(location, 'location****')
		this.setState({ region: {
		  latitude,
		  longitude,
		  latitudeDelta: 0.003,
		  longitudeDelta: 0.003
		} });
	}
	animate(newCoordinate) {
		const { coordinate } = this.state;
		if (Platform.OS === 'android') {
		  if (this.marker) {
		    this.marker_component.animateMarkerToCoordinate(newCoordinate, 500);
		  }
		} else {
		coordinate.timing(newCoordinate).start();
		}
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	};

	render() {
		const { modalVisible } = this.state;
		return (
			<View style={styles.centeredView}>
				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Filter</Text>
							<Item picker>
								<Picker
									//   style={styles.onePicker} itemStyle={styles.onePickerItem}
									selectedValue={this.state.firstLanguage}
									onValueChange={(itemValue) =>
										this.setState({ firstLanguage: itemValue })
									}
								>
									<Picker.Item label='Blood-Group' value='Blood-Group' />
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
								style={{ ...styles.ApplyFilter, backgroundColor: '#2196F3' }}
								onPress={() => {
									this.setModalVisible(!modalVisible);
								}}
							>
								<Text style={styles.textStyle}>Apply Filter</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

				<TouchableHighlight
					style={styles.openButton}
					onPress={() => {
						this.setModalVisible(true);
					}}
				>
					<Text style={styles.textStyle}> <Feather name='filter' size={24} color='white' /> Search Filter  </Text>
				</TouchableHighlight>
			</View>
		);
	}
}
App.propTypes = {
	provider: ProviderPropType,
};
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
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
		marginBottom: 15,
		textAlign: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height * 0.5,
	},
});

export default App;
