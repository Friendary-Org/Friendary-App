import React from "react";
import FloatingButtonsMain from "../components/FloatingButtonsMain";
import { View, StyleSheet, Image} from "react-native";
import SearchBar from "../components/SearchBar";
import { List } from "react-native-paper";

const MainScreen = ({navigation}) => {

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <List.Item 
                    title="Fabian Egartner" 
                    description="Nickname: Egi2k" 
                    left={props => <List.Icon {...props} icon="folder" />}
            />
            
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