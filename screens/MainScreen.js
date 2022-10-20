import React from "react";
import { useState, useEffect} from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';   
import { PaperSelect } from 'react-native-paper-select';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";


const MainScreen = ({navigation}) => {

    // let filterList = [
    //     { _id: '1', value: "NAMES"},
    //     { _id: '2', value: "LIKES"},
    //     { _id: '3', value: "DISLIKES"},
    //     { _id: '4', value: "MOVIES"},
    // ];

    // const [filterList, setFilterList] = useState([{ _id: '1', value: "NAMES"}])
    // const [filterOptions, setFilterOptions] = useState({
    //     value: filterList[0].value,
    //     list: filterList,
    //     selectedList: [filterList[0]]
    // });

    // const [filterOptions, setFilterOptions] = useState({
    //     value: filterList[0].value,
    //     list: filterList,
    //     selectedList: [filterList[0]]
    // });

    const [ friendList, setFriendList ] = useState([]);
    const [ filterString, setFilterString ] = useState("");
    const [ filterType, setFilterType ] = useState("Names");
    const [ categoryList, setcategoryList ] = React.useState([]);
    const [ filterOptions, setFilterOptions ] = useState(null);

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchData();
            fetchCategoryList();
        });
        return willFocusSubscription;
    }, []);

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
            if (contacts != null) {
                // console.log(contacts)
                setFriendList(JSON.parse(contacts))
            } else 
                console.log("no entry for given key")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const fetchCategoryList = async () => {
        try {
            const categories = AsyncStorage.getItem('categories');
            if(categories != null)
                setcategoryList(JSON.parse(value));
            else
                setcategoryList([])
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
        return []
    }

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>

                <SearchBar setFilterString={setFilterString}/>

                {filterOptions && <PaperSelect 
                    label = "active filter"
                    arrayList = {[...filterOptions.list]}
                    selectedArrayList = {filterOptions.selectedList}
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
                        console.log("SELECTED: " + value.text)
                    }}
                    modalCloseButtonText="cancel"
                    modalDoneButtonText="select"
                />}

            </View>

            {friendList !== undefined && friendList.length > 0 ?
                <View>
                    <ScrollView style={styles.scrollView}>
                        <FriendList friendList={friendList} filterString={filterString} filterType={filterType}
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