import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    Pressable
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Input } from 'react-native-elements';
import { LocationContext } from '../context/LocationContext';
import useStateAsync from '../hooks/useStateAsync'
import useLocation from '../hooks/useLocation';
import useTracks from '../hooks/useTracks';

const TrackForm = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [recording, setRecording] = useStateAsync(false, false);

    const { state: {currentLocation, trackName, locations}, setTrackName, startRecording, stopRecording, addLocation } = useContext(
        LocationContext
    );

    const [ saveTrackToDB ] = useTracks()

    const [
        locationSubscriber,
        startWatchingForeground,
        stopWatchingForeground,
        errorMessage
    ] = useLocation(addLocation);

    const toggleRecording = () => {
        if (recording.current) {
            setRecording(false);
            stopRecording();
        } else {
            setRecording(true);
            startRecording();
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (recording.current) {
                startWatchingForeground();
                startRecording()
            }

            return () => {
                if (recording.current) {
                    stopWatchingForeground();
                    stopRecording()
                }
            };
        }, [])
    );

    return (
        <View>
            <Input
                placeholder='Enter track name'
                label='Track Name'
                value={name}
                onChangeText={setName}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Pressable
                onPress={() => setTrackName(name)}
                style={({ pressed }) => [
                    {
                        backgroundColor:
                            name.trim().length === 0
                                ? 'gray'
                                : pressed
                                ? 'blue'
                                : '#2196F3'
                    },
                    styles.firstButton
                ]}
            >
                <Text style={styles.buttonText}>Set Track Name</Text>
            </Pressable>
            <Pressable
                onPress={toggleRecording}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'blue' : '#2196F3'
                    },
                    styles.secondButton
                ]}
            >
                <Text style={styles.buttonText}>
                    {recording.current ? 'Stop Recording' : 'Start Recording'}
                </Text>
            </Pressable>
            {trackName != undefined && locations.length > 0 && !recording.current && <Pressable
                onPress={saveTrackToDB}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? 'blue' : '#2196F3'
                    },
                    styles.thirdButton,
                ]}
            >
                <Text style={styles.buttonText}>
                    Save
                </Text>
            </Pressable>}
        </View>
    );
};
const styles = StyleSheet.create({
    firstButton: {
        borderRadius: 8,
        padding: 6,
        marginLeft: 5,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondButton: {
        borderRadius: 8,
        padding: 6,
        marginLeft: 5,
        width: '50%',
        marginLeft: 155,
        marginTop: -31,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thirdButton: {
        borderRadius: 8,
        padding: 6,
        marginLeft: 5,
        width: '50%',
        marginLeft: 155,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    }
});

export default TrackForm;
