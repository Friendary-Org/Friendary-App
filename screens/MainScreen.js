import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, Text, Divider } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';

import SearchBar from "../components/SearchBar";
import FriendList from "../components/FriendList";
import FloatingButtonsMain from "../components/FloatingButtonsMain";



const MainScreen = ({ navigation }) => {

    const [friendList, setFriendList] = useState([]);
    const [filterString, setFilterString] = useState("");
    const [filterType, setFilterType] = useState("Names");
    const [categoryList, setcategoryList] = React.useState([]);
    const [filterOptions, setFilterOptions] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchData();
        fetchCategoryList();
    }, []);

    useEffect(() => {
        fetchData();
        fetchCategoryList();
    }, [isFocused]);

    useEffect(() => {
        if (categoryList !== null) {
            let filterOptions = [{ _id: -1, value: "Names" }]
            categoryList.forEach((c) => { filterOptions.push({ _id: c.uid, value: c.name }) })

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
            <View style={styles.searchContainer}>

                <SearchBar setFilterString={setFilterString} />

                {filterOptions && <PaperSelect
                    label="Active filter"
                    arrayList={[...filterOptions.list]}
                    selectedArrayList={filterOptions.selectedList}
                    textInputMode="flat"
                    multiEnable={false}
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
                    modalCloseButtonText="cancel"
                    modalDoneButtonText="select"
                />}

            </View>


            {friendList !== undefined && friendList.length > 0 ?
                <FriendList friendList={friendList}
                    filterString={filterString}
                    filterType={filterType}
                    navigation={navigation}
                /> :
                <View style={[{ padding: 12 }, { alignItems: "center" }]}>
                    <Text variant="bodyLarge" style={{ marginBottom: 10 }}>no friends to display</Text>
                    <Text variant="bodyLarge">add some using the <IconButton icon="account-plus-outline" style={{ marginTop: 0 }} size={20} /> Button</Text>
                    <Text variant="bodyLarge">you can either import existing contacts</Text>
                    <Text variant="bodyLarge">or create new contacts within Friendary</Text>
                </View>
            }


            <FloatingButtonsMain navigation={navigation} />
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        paddingTop: Constants.statusBarHeight,
    },
    scrollView: {
        padding: 2,
        backgroundColor: "#F7F6F6", //main background color
    }
});

export default MainScreen;