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
        position: "absolute",
        backgroundColor: "transparent",
        bottom: "10%",
        left: -800
    },
    fab: {
        marginLeft: Dimensions.get("screen").width / 2 + 740,
        width: 120
    },
});

export default SaveButton;