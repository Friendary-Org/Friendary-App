import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, FlatList, View } from "react-native";
import { Divider, List, Text, IconButton } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            <View key={data.id} style={[{alignItems: "center"}]}>
                <List.Item
                    title={data.item.name}
                    left={() => <Text variant={'headlineSmall'}>{data.item.icon}</Text>}
                    onPress={() => navigation.push("Edit Category", {category: data.item})}
                    right={() => <IconButton
                        style={styles.deleteCategory}
                        icon="trash-can-outline"
                        size={20}
                        onPress={() => console.log("test")}
                        mode="outlined"
                    />}
                    style={styles.item}
                />
                <Divider/>
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
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    item: {
        width: "95%"
    },
    deleteCategory: {
        backgroundColor: "#EADDFF",
    },
});

export default CategoryTab;