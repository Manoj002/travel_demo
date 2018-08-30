import React, { Component } from 'react';
import { View, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, AnimatedRegion, Polyline } from 'react-native-maps';
import axios from 'axios';

const haversine = require('haversine');
const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

class TaskScreen extends React.Component {

    state={
        vehId: "",
        latitude: LATITUDE,
        longitude: LONGITUDE,
        error: null,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: { },
        coordinate: new AnimatedRegion({
            latitude: LATITUDE,
            longitude: LONGITUDE
        })
    }

    componentWillMount() {
        const { navigation } = this.props;
        let vehicle_id = navigation.getParam("vehId", " ");
        this.setState({ vehId: vehicle_id });
        navigator.geolocation.getCurrentPosition(
            (position) => { 
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000 },
        );
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition(
            // Toast : awesome!!!
            position => {
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                const newCoordinate = { 
                    latitude, longitude
                }

                if(Platform.OS === "android") {
                    if(this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else { 
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });

                axios.post(`http://travel.integritydigital.in/api/TrackDeatilsByVehicle?Lat=${this.state.latitude}&Lng=${this.state.longitude}`);                                                                                                                                    
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000 }
        )
    }

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    render() {

        return(
            <View
                style={styles.container}
            >

                <MapView
                    style={styles.map}
                    mapType="standard"
                    loadingEnabled
                    loadingIndicatorColor="#007aff"
                    loadingBackgroundColor="#FFFFFF"
                    showsCompass
                    provider={'google'}
                    showsBuildings
                    showsMyLocationButton
                    showsUserLocation
                    followUserLocation
                    toolbarEnabled
                    zoomControlEnabled
                    zoomEnabled
                    region={this.getMapRegion()}
                >

                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={4} />

                    <Marker.Animated
                        ref={marker => {
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate}
                    />

                </MapView>

                <View style={styles.buttonContainer} >

                    <Button
                        title='Start'
                        buttonStyle={{ backgroundColor: "#007aff", borderRadius: 2 }}
                        textStyle={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                        icon={{ name: 'forward', type: "materialicons", color: "#fff", size: 25}}
                        //onPress={this.onStart}
                    />

                    <TouchableOpacity style={[styles.bubble, styles.button]}>

                        <Text style={styles.bottomBarContent}>
                            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                        </Text>
                        
                    </TouchableOpacity>

                    <Button
                        title='Stop'
                        buttonStyle={{ backgroundColor: "#007aff", borderRadius: 2 }}
                        textStyle={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}
                        icon={{ name: 'stop', type: "ionicons", color: "#fff", size: 25 }}
                        //onPress={this.onStop}
                    />

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        marginVertical: 20,
        backgroundColor: "transparent"
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    bottomBarContent: {
        fontSize: 16,
        color: "#000",
        fontWeight: "300"
    }
})

export default TaskScreen;