import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackDetailScreen = ({ navigation, route }) => {
const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('@token');
    let obj = JSON.parse(jsonValue)
}

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 48 }}>TrackDetailScreen</Text>
            <Button title='Go back' onPress={() => navigation.pop()} />

            <Button title='get' onPress={() => getData()} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
});

export default TrackDetailScreen;
