import React from "react";
import { useState, useEffect} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { PaperSelect } from 'react-native-paper-select';
import { useIsFocused } from '@react-navigation/native';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";


const MainScreen = ({navigation}) => {

    const [ friendList, setFriendList ] = useState([]);
    const [ filterString, setFilterString ] = useState("");
    const [ filterType, setFilterType ] = useState("Names");
    const [ categoryList, setcategoryList ] = React.useState([]);
    const [ filterOptions, setFilterOptions ] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchData();
        fetchCategoryList();
    }, []);

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    useEffect(() => {
        if (categoryList !== null) {
            let filterOptions = [{_id: -1, value: "Names"}]
            categoryList.forEach((c) => {filterOptions.push({_id: c.uid, value: c.name})})

            setFilterOptions({
                value: "Names",
                list: filterOptions,
                selectedList: [filterOptions[0]]
            })
        }
    }, [categoryList]);

    const fetchData = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null) 
                setFriendList(JSON.parse(contacts))
            else 
                setFriendList([])
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const fetchCategoryList = async () => {
        try {
            const categories = await AsyncStorage.getItem('categories');
            if(categories != null)
                setcategoryList(JSON.parse(categories));
            else
                setcategoryList([])
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const removeContacts = async () => {
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

                <SearchBar setFilterString={setFilterString}/>

                {filterOptions && <PaperSelect 
                    label = "active filter"
                    arrayList = {[...filterOptions.list]}
                    selectedArrayList = {filterOptions.selectedList}
                    textInputMode = "flat"
                    multiEnable = {false}
                    value = {filterOptions.value} 
                    onSelection = {(value) => {
                        setFilterOptions({
                            ...filterOptions,
                            value: value.text,
                            selectedList: value.selectedList,
                            error: ''
                        });

                        value.selectedList.length > 0 ? setFilterType(value.text) : setFilterType("Names")
                    }}
                    modalCloseButtonText="cancel"
                    modalDoneButtonText="select"
                />}

            </View>

            <ScrollView style={styles.scrollView}>
                {friendList !== undefined && friendList.length > 0 ?
                    <FriendList friendList={friendList} 
                                filterString={filterString} 
                                filterType={filterType}
                                navigation={navigation}
                    /> :
                    <View style={{padding: 12}}>
                        <Text style={styles.noFriendsText}>{"no friends to display ..."}</Text>
                    </View>
                }
            </ScrollView>
            
            <View>
                <FloatingButtonsMain navigation={navigation}/>
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
    },
    scrollView: {
        padding: 2,
        marginBottom: "20%",
        backgroundColor: "#F7F6F6", //main background color
    },
    noFriendsText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        top: "35%",
        height: "100%",
        width: "100%"
    }
});

export default MainScreen;