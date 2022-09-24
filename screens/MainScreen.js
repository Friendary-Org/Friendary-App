import React from "react";
import { View, StyleSheet } from "react-native";

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";


const MainScreen = ({navigation}) => {

    // data for testing purposes
    const friendList = [
        {id: 0, title: "Fabian Egartner", description: "Nickname: Egi2k", avatar: require('../assets/avatar.png')},
        {id: 1, title: "John Walker", description: "Nickname: Cube", avatar: require('../assets/favicon.png')}
    ];

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <View style={styles.friendList}>
                <FriendList friendList={friendList} />
            </View>
            
            <FloatingButtonsMain navigation={navigation}/>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
    },
    friendList: {
        marginTop: 5,
        backgroundColor: "#F7F6F6" //main background color
    }
});

export default MainScreen;