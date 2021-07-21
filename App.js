import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import mainFlowComponent from './src/components/mainFlowComponent';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
import { TrackProvider } from './src/context/TrackContext';

const AppFlow = createStackNavigator();

const App = () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <NavigationContainer>
                        <AppFlow.Navigator
                            initialRouteName={'Signup'}
                            screenOptions={{
                                headerShown: false
                            }}
                        >
                            <AppFlow.Screen
                                name='Signin'
                                component={SigninScreen}
                            />
                            <AppFlow.Screen
                                name='Signup'
                                component={SignupScreen}
                            />
                            <AppFlow.Screen
                                name='TrackDetail'
                                component={TrackDetailScreen}
                            />
                            <AppFlow.Screen
                                name='mainFlow'
                                component={mainFlowComponent}
                            />
                        </AppFlow.Navigator>
                    </NavigationContainer>
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};

export default App;
