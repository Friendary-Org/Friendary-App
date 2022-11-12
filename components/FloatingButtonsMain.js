import { debounce } from 'lodash';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { FAB } from "react-native-paper";

const FloatingGroupMain = ({navigation}) => {

    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
    const windowWidth = Dimensions.get('window').width;

    const { open } = state;
    
    return (
            <View style={styles.navContainer}>
                <FAB
                    icon="star-outline"
                    style={[styles.fab, styles.fabLeft, {display:"none"}]}
                    onPress={debounce(() => navigation.push("Test"), 300)}
                    size="small"
                />
                <FAB
                    icon="wrench-outline"
                    style={[styles.fab, styles.fabRight, {display:"none"}]}
                    onPress={() => console.log("Pressed wrench")}
                    size="small"
                />
                <FAB.Group
                    style={[styles.fab]}
                    open={open}
                    visible
                    icon="account-plus-outline"
                    actions={[
                        {
                            icon: 'plus',
                            label: 'Create Friend',
                            onPress: debounce(() => navigation.push("Create Friend"), 300),
                        },
                        {
                            icon: 'import',
                            label: 'Import Friend',
                            onPress: debounce(() => navigation.push("ImportFriend"),300),
                        },
                    ]}
                    onStateChange={onStateChange}
                    backdropColor="transparent"
                />
            </View>
    );
}

const styles = StyleSheet.create({
    navContainer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "transparent",
        bottom: -2500,
        position: "absolute"
    },
    fab: {
        marginHorizontal: 16,
        marginTop: -2560,
        height: 40
    },
    fabLeft: {
        justifyContent: "flex-start",
    },
    fabRight: {
        justifyContent: "flex-end",
    }
});

export default FloatingGroupMain;