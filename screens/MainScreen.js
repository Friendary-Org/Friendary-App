import React, { useState, useEffect } from "react";
import { FAB } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";

const MainScreen = () => {
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
    const windowWidth = Dimensions.get("window").width;

    const { open } = state;

    return (
        <React.Fragment>
            <View style={styles.contentContainer}></View>
            <View style={styles.navContainer}>
                <FAB
                    icon="star-outline"
                    style={[styles.fab, styles.fabLeft]}
                    onPress={() => console.log("Pressed star")}
                    size="small"
                />
                <FAB
                    icon="wrench-outline"
                    style={[styles.fab, styles.fabRight]}
                    onPress={() => console.log("Pressed wrench")}
                    size="small"
                />
                <FAB.Group
                    style={[{paddingRight: windowWidth / 2.56}]}
                    open={open}
                    icon="account-plus-outline"
                    actions={[
                        {
                            icon: "plus",
                            label: "Create Friend",
                            onPress: () => console.log("Pressed create"),
                        },
                        {
                            icon: "import",
                            label: "Import Friend",
                            onPress: () => console.log("Pressed import"),
                        },
                    ]}
                    onStateChange={onStateChange}
                />
                
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        flexDirection: "row",
    },
    navContainer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "transparent",
        position: "absolute",
        bottom: 0,
    },
    fab: {
        margin: 16,
    },
    fabLeft: {
        justifyContent: "flex-start",
    },
    fabRight: {
        justifyContent: "flex-end",
    }
});

export default MainScreen;