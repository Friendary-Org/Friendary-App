import React from "react";
import { useState, useEffect} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";


const MainScreen = ({navigation}) => {

    const [ friendList, setFriendList ] = useState([]);
    const [ filterString, setFilterString ] = useState("");

    // data for testing purposes
    // const friendList = [
    //     {id: 0, title: "Fabian Egartner", description: "Nickname: Egi2k", avatar: require('../assets/avatar.png')},
    //     {id: 1, title: "John Walker", description: "Nickname: Cube", avatar: require('../assets/favicon.png')}
    // ];

    useEffect(() => {
        // _removeData();
        fetchData();
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
        });
        return willFocusSubscription;
    }, []);

    const fetchData = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                setFriendList(JSON.parse(contacts))
            else 
                console.log("no entry for given key")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar setFilterString={setFilterString}/>
            </View>

            {friendList !== undefined && friendList.length > 0 ?
                <View>
                    <ScrollView style={styles.scrollView}>
                        <FriendList friendList={friendList} filterString={filterString}
                        navigation={navigation}/>
                    </ScrollView>
                </View> :
                <View>
                    <Text style={styles.noFriendsText}>{"no friends to display ..."}</Text>
                </View>    
            }
            
            <FloatingButtonsMain navigation={navigation}/>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
    },
    scrollView: {
        padding: 2,
        backgroundColor: "#F7F6F6" //main background color
    },
    noFriendsText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        top: '35%',
        height: '100%',
    }
});

export default MainScreen;