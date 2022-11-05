import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { Avatar, List, Text, FAB } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CategoryTab = (props) => {
    const isFocused = useIsFocused();
    const { navigation } = props;
    const [categoryList, setcategoryList] = React.useState([]);
    const [friendList, setFriendList] = React.useState([]);
    const IMAGE = {default: require(`../assets/avatar.png`)}

    useEffect(() => {
        fetchCategoryList();
        fetchFriendList();
    }, []);

    useEffect(() => {
        fetchCategoryList();
        fetchFriendList();
    }, [isFocused]);

    const fetchFriendList = async () => {
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

    const renderItem = (data) => {
        let categoryFriendList = friendList.map((friend)=>{
            let editCategory = friend.categories.find((cat) => cat.uid === data.item.uid);
            if(editCategory !== undefined){  
                return friend
            }
        })
        let shortened = false;
        categoryFriendList = categoryFriendList.filter(element => element !== undefined)
        if(categoryFriendList.length > 7){
            categoryFriendList = categoryFriendList.slice(0,7);
            shortened = true;
        }
        return (
            <View key={data.id} style={styles.categoryContainer}>
            <TouchableOpacity onPress={debounce(() => navigation.push("Edit Category", { category: data.item }), 300)}>
                <List.Item
                    title={data.item.name}
                    left={() => <Text variant={'headlineSmall'}>{data.item.icon}</Text>}
                />
                <View style={styles.avatarContainer}>
                {categoryFriendList.map((friend) => {
                    if(friend.avatar != undefined && friend.avatar.uri != undefined){
                        return(<Avatar.Image key={friend.id} size={40} style={[{marginBottom: 10},{marginLeft: 10}]} source={{ uri: friend.avatar.uri }} />)
                    }else if(friend.avatar != undefined){
                        return(<Avatar.Image key={friend.id} size={40} style={[{marginBottom: 10},{marginLeft: 10}]} source={{ uri: friend.avatar }} />)
                    }else{
                        return(<Avatar.Image key={friend.id} size={40} style={[{marginBottom: 10},{marginLeft: 10}]} source={IMAGE["default"]} />)
                    }                    
                })}
                {shortened && <Text variant="titleLarge"> ... </Text>}
                </View>

            </TouchableOpacity>
            </View>
        )
    }
    return (
        <React.Fragment>
            <FlatList
                data={categoryList}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <View style={styles.addContainer}>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    label="Create category"
                    onPress={debounce(() => navigation.push("Create Category"), 300)}
                />
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginHorizontal: "2%",
        marginTop: "2%",
        backgroundColor: "#ececec",
        borderRadius: 15
    },
    addContainer: {
        width: "100%",
        position: "absolute",
        backgroundColor: "transparent",
        bottom: "3%",
        left: -800
    },
    avatarContainer: {
        width: "100%",
        flexDirection: "row",
    },
    fab: {
        marginLeft: Dimensions.get("screen").width / 2 + 720,
        width: 160
    }
});

export default CategoryTab;