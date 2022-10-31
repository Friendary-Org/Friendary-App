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
        position: "absolute",
        backgroundColor: "transparent",
        left: -800,
        bottom: "3%",
    },
    fab: {
        marginLeft: Dimensions.get("screen").width / 2 + 780,
        backgroundColor: "#80D8F7",
        width: 40
    },
});

export default BackButton;