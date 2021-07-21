import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { Text, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, signin, clearErrorMessage, tryToSignin } = useContext(
        AuthContext
    );

    function navigateToMainFlow () {
        navigation.navigate('mainFlow', { screen: 'TrackList' });
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearErrorMessage();
        });
        return () => {
            return unsubscribe;
        };
    }, [navigation]);

    const checkForTokenInStorage = async () => {
        const jsonValue = await AsyncStorage.getItem('@token_Key');
        let obj = JSON.parse(jsonValue);
        if (obj !== null) {
            navigation.navigate('mainFlow', { screen: 'TrackList' });
        }
    };

    useEffect(() => {
        tryToSignin();
        checkForTokenInStorage();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Spacer>
                <Text h3>"Sign In for Track"</Text>
            </Spacer>
            <Input
                label='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false}
            />
            <Spacer />
            <Input
                secureTextEntry={true}
                label='Password'
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {state.errorMessage ? (
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    title='Sign In'
                    onPress={() =>
                        signin({ email, password }, navigateToMainFlow)
                    }
                />
            </Spacer>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Spacer>
                    <Text style={styles.link}>
                        Don't have an account?. Sign up instead
                    </Text>
                </Spacer>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// 'flex: 1' will make the container fit the entire screen, "justifyContent: 'center'" will make it content to be
//    centered, then 'marginBottom: 200' will make everything appear to go up by 200
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        justifyContent: 'center',
        marginBottom: 100
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    },
    link: {
        color: 'blue'
    }
});

export default SigninScreen;
