import React, { useState, useEffect } from 'react';
import { FAB } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";
import FloatingGroupMain from './FloatingGroupMain';

const MainScreen = () => {
    const [state, setState] = React.useState({ open: false });

    const { open } = state;

    return (
        <React.Fragment>
            <FloatingGroupMain />
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    navContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fab: {
        margin: 16,
    },
    fabLeft: {
        justifyContent: "flex-start",
    },
    fabRight: {
        justifyContent: "flex-end",
    },
});

export default MainScreen;