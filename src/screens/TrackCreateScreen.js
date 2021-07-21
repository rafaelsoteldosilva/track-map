import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Platform,
    Pressable
} from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
import { Text, Input, Button, CheckBox } from 'react-native-elements';

import Map from '../components/Map';
import TrackForm from '../components/TrackForm';
import { startInterval, stopInterval } from '../_mockLocations';
import { LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import useStateAsync from '../hooks/useStateAsync';

const TrackCreateScreen = ({ navigation, route }) => {
    const [intervalId, setIntervalId] = useState(0);
    const [moving, setMoving] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [drawState, setDrawState] = useState(false);
    const [steps, setSteps] = useStateAsync(0);

    const { state: {currentLocation, trackName, locations}, setTrackName, startRecording, stopRecording, addLocation } = useContext(
        LocationContext
    );

    const oneMoreStep = useCallback(() => {
        setSteps(steps.current + 1);
    });

    const stepNumber = useCallback(() => {
        return steps.current;
    });

    const [
        locationSubscriber,
        startWatchingForeground,
        stopWatchingForeground,
        errorMessage
    ] = useLocation(addLocation);

    const toggleMoving = () => {
        if (moving) {
            stopInterval(intervalId);
            setMoving(false);
        } else {
            setIntervalId(startInterval(oneMoreStep, stepNumber, addLocation));
            setMoving(true);
        }
    };

    const toggleTracking = () => {
        if (tracking) {
            startWatchingForeground();
            setTracking(false);
        } else {
            stopWatchingForeground();
            setTracking(true);
        }
    };

    const toggleDrawMovement = () => {
        setDrawState(!drawState);
    };

    return (
        <View style={styles.container}>
            {/* <Text h2>TrackCreateScreen</Text> */}
            <Pressable
                onPress={toggleMoving}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'blue' : '#2196F3'
                    },
                    styles.firstButton
                ]}
            >
                <Text style={styles.buttonText}>
                    {moving ? 'Stop Moving' : 'Start Moving'}
                </Text>
            </Pressable>
            <Pressable
                onPress={toggleTracking}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'blue' : '#2196F3'
                    },
                    styles.firstButton,
                    styles.firstPlusAdditionalButton
                ]}
            >
                <Text style={styles.buttonText}>
                    {tracking ? 'Stop Tracking' : 'Start Tracking'}
                </Text>
            </Pressable>
            <View style={{marginLeft: 227, marginTop: -43}}>
                <CheckBox
                    title='Draw'
                    checked={drawState}
                    onPress={toggleDrawMovement}
                />
            </View>
            <Map drawLine={drawState} />
            <TrackForm />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1
        // justifyContent: 'center',
    },
    firstButton: {
        borderRadius: 8,
        padding: 6,
        marginLeft: 5,
        marginTop: 10,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstPlusAdditionalButton: {
        marginLeft: 120,
        marginTop: -31
    },
    buttonText: {
        color: 'white'
    }
});

export default TrackCreateScreen;
