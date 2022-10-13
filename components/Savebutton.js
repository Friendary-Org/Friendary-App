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
        justifyContent: "center",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
    },
    fab: {
        marginLeft: 150,
        marginBottom: 20,
    },
});

export default SaveButton;