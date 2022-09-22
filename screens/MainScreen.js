import React from "react";
import FloatingButtonsMain from "../components/FloatingButtonsMain";
import { View, StyleSheet, Text} from "react-native";
import SearchBar from "../components/SearchBar";

const MainScreen = ({navigation}) => {

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <View style={styles.helloContainer}>
                <Text>Hello</Text>
            </View>
            
            <FloatingButtonsMain navigation={navigation}/>

        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
        backgroundColor: "green"
    },
    helloContainer: {
        backgroundColor: "#F7F6F6", //main background color
        alignItems: "center",
        height: "100%",
    }
    })

export default MainScreen;