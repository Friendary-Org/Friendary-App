import React from "react";
import { useState, useEffect} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";


const MainScreen = ({navigation}) => {

    const [ friendList, setFriendList] = useState([]);
    const defaultAvatar = require('../assets/avatar.png');

    // data for testing purposes
    // const friendList = [
    //     {id: 0, title: "Fabian Egartner", description: "Nickname: Egi2k", avatar: require('../assets/avatar.png')},
    //     {id: 1, title: "John Walker", description: "Nickname: Cube", avatar: require('../assets/favicon.png')}
    // ];

    useEffect( () => {
        // _removeData();
        _fetchData();
        
    }, []);

    const _fetchData = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                setFriendList(JSON.parse(contacts))
            else 
                console.log("not entry for given key")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const _removeData = async () => {
        try {
            await AsyncStorage.removeItem('contacts');
            console.log("removal successful");
        } catch (error) {
            console.log("removal failed: " + error.message)
        }
    }

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            {friendList.length > 0 ?
                    <View style={styles.friendList}>
                        <FriendList friendList={friendList} defaultAvatar={defaultAvatar}/>
                    </View> :
                <Text>{"no contacts found ..."}</Text>
            }
            
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