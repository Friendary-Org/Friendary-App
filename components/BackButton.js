import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import { debounce } from 'lodash';

const BackButton = ({navigation}) => {

    return (
            <View style={styles.navContainer}>
                <FAB
                    icon="arrow-left-top"
                    style={[styles.fab]}
                    onPress={debounce(() => navigation.goBack(),300)}
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
        width: 40
    },
});

export default BackButton;