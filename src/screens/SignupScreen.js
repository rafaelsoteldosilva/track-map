import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import GlobalStyles from '../global/GlobalStyles';
import { SafeAreaView } from 'react-native';

import { Text, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Spacer from '../components/Spacer';
import { AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { state, signup, clearErrorMessage, tryToSignin } = useContext(AuthContext);

    function navigateToMainFlow () {
        navigation.navigate('mainFlow', { screen: 'TrackList' });
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearErrorMessage();
        });

        return unsubscribe;
    }, [navigation]);

    const checkForTokenInStorage = async () => {
        const jsonValue = await AsyncStorage.getItem('@token_Key');
        let obj = JSON.parse(jsonValue);
        if (obj !== null) {
            navigation.navigate('mainFlow', { screen: 'TrackList'});
        };
    };

    useEffect(() => {
        tryToSignin();
        checkForTokenInStorage()
    }, []);

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <View style={styles.container}>
                <Spacer>
                    <Text h3>"Sign Up for Track"</Text>
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
                    <Text style={styles.errorMessage}>
                        {state.errorMessage}
                    </Text>
                ) : null}
                <Spacer>
                    <Button
                        title='Sign Up'
                        onPress={() =>
                            signup({ email, password }, navigateToMainFlow)
                        }
                    />
                </Spacer>

                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                    <Spacer>
                        <Text style={styles.link}>
                            Already have an account?. Sign in instead
                        </Text>
                    </Spacer>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// 'flex: 1' will make the container fit the entire screen, "justifyContent: 'center'" will make it content to be
//    centered, then 'marginBottom: 200' will make everything appear to go up by 200
const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default SignupScreen;
