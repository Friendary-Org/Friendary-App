import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { Avatar, List, Text, FAB } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

const CategoryTab = (props) => {
    const isFocused = useIsFocused();
    const { navigation } = props;
    const [categoryList, setcategoryList] = React.useState([]);

    useEffect(() => {
        fetchCategoryList();
    }, []);

    useEffect(() => {
        fetchCategoryList();
    }, [isFocused]);

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
        return (
            <View key={data.id} style={styles.categoryContainer}>
                <List.Item
                    title={data.item.name}
                    left={() => <Text variant={'headlineSmall'}>{data.item.icon}</Text>}
                    onPress={debounce(() => navigation.push("Edit Category", { category: data.item }), 300)}
                />
                <View style={styles.avatarContainer}>

                </View>

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