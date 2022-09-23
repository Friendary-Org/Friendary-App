import React from "react";
import FloatingButtonsMain from "../components/FloatingButtonsMain";
import { View, StyleSheet} from "react-native";
import { List, Avatar, TouchableRipple } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import { AiOutlineStar } from "react-icons/ai";


const MainScreen = ({navigation}) => {

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <List.Item onPress={() => console.log("Pressed list")}
                    title="Fabian Egartner" 
                    description="<short description>" 
                    left={() => 
                        [
                            <TouchableRipple style={styles.listIconTouch} key={0} onPress={() => console.log("Pressed star")}>
                                <List.Icon style={styles.listIcon} icon="star-outline"/>
                            </TouchableRipple>
                            , 
                            <TouchableRipple key={1} onPress={() => console.log("Pressed avatar")}>
                                <Avatar.Image size={60} source={require('../assets/avatar.png')} />
                            </TouchableRipple>
                        ]}
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
    },
    listIcon: {
        height: 20, 
        width: 20, 
        margin: 0
    },
    listIconTouch: {
        height: 25, 
        width: 25
    }
    })

export default MainScreen;