import React from 'react';
import FloatingButtonsMain from './FloatingButtonsMain';
import { View, StyleSheet, Text} from "react-native";

const MainScreen = () => {

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 80}}>Hello</Text>
            <View style={[styles.box, styles.box1]}></View>
            <FloatingButtonsMain />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        marginTop: 120,
        width:100,
        height:100
    },

    box1: {
        backgroundColor: 'red'
    },
    })

export default MainScreen;