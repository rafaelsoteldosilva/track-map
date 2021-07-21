import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrackListScreen from '../screens/TrackListScreen';
import TrackCreateScreen from '../screens/TrackCreateScreen';
import AccountScreen from '../screens/AccountScreen';

const mainFlow = createBottomTabNavigator();

const mainFlowComponent = () => {
    return (
        <mainFlow.Navigator initialRouteName='TrackList'>
            <mainFlow.Screen name='TrackList' component={TrackListScreen}/>
            <mainFlow.Screen name='TrackCreate' component={TrackCreateScreen} />
            <mainFlow.Screen name='Account' component={AccountScreen} />
        </mainFlow.Navigator>
    );
};
const styles = StyleSheet.create({});

export default mainFlowComponent;
