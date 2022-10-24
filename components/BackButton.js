import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

const BackButton = ({navigation}) => {

    return (
            <View style={styles.navContainer}>
                <FAB
                    icon="arrow-left-top"
                    style={[styles.fab]}
                    onPress={() => navigation.goBack()}
                    size="small"
                />

            </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "transparent",
        bottom: -2500,
    },
    fab: {
        marginTop: -2560,
        backgroundColor: "#80D8F7",
        height: 40
    },
});

export default BackButton;