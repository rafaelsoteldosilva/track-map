import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { initialLocation } from '../_mockLocations';

import MapView, {
    PROVIDER_GOOGLE,
    Polyline,
    Circle,
    Marker
} from 'react-native-maps';
import { LocationContext } from '../context/LocationContext';

const Map = ({ navigation, route, drawLine }) => {
    const { state: {trackName, locations, currentLocation} } = useContext(
        LocationContext
    );

    if (!currentLocation) {
        return (
            <Text style={{ fontSize: 50, margin: 151, width: '30%' }}> </Text>
        );
    }

    return (
        <View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                animateToRegion
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                // region={{
                //     ...currLocation.coords,
                //     latitudeDelta: 0.01,         // it moves the entire map to have the currLocation centered
                //     longitudeDelta: 0.01
                // }}
            >
                <Circle
                    center={currentLocation.coords}
                    radius={30}
                    strokeColor='rgba(158, 158, 255, 1.0)'
                    fillColor='rgba(0, 0, 255, 0.3)'
                />
                {drawLine && (
                    <MapView.Polyline
                        coordinates={locations.map(loc => {
                            return {
                                latitude: loc.coords.latitude,
                                longitude: loc.coords.longitude
                            };
                        })}
                        strokeColor='red'
                        strokeWidth={3}
                        lineDashPattern={[1]}
                    />
                )}
            </MapView>
            <Text></Text>
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
        height: 350
    }
});

export default Map;
