import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Platform
} from "react-native";

const TrackListScreen = ({ navigation, route }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 48}}>TrackListScreen</Text>
            <Button title='Go to TrackDetail' onPress={() => navigation.navigate('TrackDetail')}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
})

export default TrackListScreen