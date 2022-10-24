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
        alignItems: "center",
        position: "absolute",
        backgroundColor: "transparent",
        flex: 0,
        overflow: "visible",
        bottom: -2500
    },
    fab: {
        backgroundColor: "#80D8F7",
        height: 60,
        marginTop: -2640
    },
});

export default SaveButton;