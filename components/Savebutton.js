import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

const SaveButton = (props) => {
    const {callback} = props;

    return (
            <View style={styles.navContainer}>
                <FAB
                    icon="content-save-outline"
                    label="Save"
                    style={[styles.fab]}
                    onPress={() => callback()}
                    size="medium"
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
        bottom: -2500,
    },
    fab: {
        marginTop: -2630,
    },
});

export default SaveButton;