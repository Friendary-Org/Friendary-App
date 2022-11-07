import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Text, Divider } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";

const FriendTab = ({ navigation }) => {
    const [friendList, setFriendList] = useState([]);
    const [filterString, setFilterString] = useState("");
    const [filterType, setFilterType] = useState("Names");
    const [categoryList, setcategoryList] = React.useState([]);
    const [filterOptions, setFilterOptions] = useState(null);
    const [searchbarFocused, setSearchbarFocused] = React.useState(false);
    const isFocused = useIsFocused();
    const [ filterOptionIndex, setFilterOptionIndex ] = useState(0);

    useEffect(() => {
        fetchData();
        fetchCategoryList();
    }, []);

    useEffect(() => {
        if (!searchbarFocused) {
            Keyboard.dismiss();
        }
    }, [searchbarFocused]);

    useEffect(() => {
        fetchData();
        fetchCategoryList();
    }, [isFocused]);

    useEffect(() => {
        if (categoryList !== null) {
            let filterOptions = [{ _id: -1, value: "Names" }]
            let useDefaultFilterType = true;

            categoryList.forEach((c, idx) => { 
                                    filterOptions.push({ _id: c.uid, value: c.name});

                                    if (filterType.toLowerCase() === c.name.toLowerCase()) {
                                        setFilterOptionIndex(idx + 1); 
                                        useDefaultFilterType = false;
                                    }
                                });

            if (useDefaultFilterType)
                setFilterOptionIndex(0);

            if (filterOptions[filterOptionIndex] === undefined)
                setFilterOptionIndex(0)


            setFilterOptions({
                value: (filterOptions[filterOptionIndex] !== undefined ? filterOptions[filterOptionIndex].value : filterOptions[0].value),
                list: filterOptions,
                selectedList: [filterOptions[filterOptionIndex] !== undefined ? filterOptions[filterOptionIndex] : filterOptions[0]]
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
            if (categories != null)
                setcategoryList(JSON.parse(categories));
            else
                setcategoryList([])
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    return (
        <React.Fragment>
            <SearchBar setFilterString={setFilterString} setSearchbarFocused={setSearchbarFocused} />

            {filterOptions && <PaperSelect
                label="Active Filter"
                arrayList={[...filterOptions.list]}
                selectedArrayList={filterOptions.selectedList}
                textInputMode="flat"
                multiEnable={false}
                hideSearchBox={true}
                value={filterOptions.value}
                onSelection={(value) => {
                    setFilterOptions({
                        ...filterOptions,
                        value: value.text,
                        selectedList: value.selectedList,
                        error: ''
                    });

                    value.selectedList.length > 0 ? setFilterType(value.text) : setFilterType("Names")
                }}
                modalCloseButtonText="Cancel"
                modalDoneButtonText="Select"
            />}


            {friendList !== undefined && friendList.length > 0 ?
                <FriendList friendList={friendList}
                    filterString={filterString}
                    filterType={filterType}
                    navigation={navigation}
                /> :
                <View style={[{ padding: 12 }, { alignItems: "center" }]}>
                    <Text variant="bodyLarge" style={{ marginBottom: 10 }}>No friends to display!</Text>
                    <Text variant="bodyLarge">Add some using the<IconButton icon="account-plus-outline" style={{ marginTop: 0 }} size={20} />button!</Text>
                    <Text variant="bodyLarge">You can either import existing contacts</Text>
                    <Text variant="bodyLarge">or create new contacts within Friendary.</Text>
                </View>
            }


            <FloatingButtonsMain navigation={navigation} />
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        padding: 2,
        backgroundColor: "#F7F6F6", //main background color
    }
});

export default FriendTab;