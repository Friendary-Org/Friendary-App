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
        position: "absolute",
        alignItems: "center",
        backgroundColor: "transparent",
        bottom: 0,
    },
    fab: {
        margin: 32,
        backgroundColor: "#80D8F7"
    },
});

export default BackButton;