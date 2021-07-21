import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    SafeAreaView 
} from 'react-native';

// import { SafeAreaView } from 'react-navigation'

import { Text, Button } from 'react-native-elements';

import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';

const AccountScreen = ({ navigation, route }) => {
    const { state, signout } = useContext(AuthContext);

    function pressedSignoutButton() {
        signout()
        navigation.navigate('Signup')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
            <Spacer />
            <Button title='Sign out' onPress={() => pressedSignoutButton()} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
});

export default AccountScreen;
