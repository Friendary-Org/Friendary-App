import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const { editable, categoryValues } = props;
    const testEntries = ["Bier", "Wein", "Katzen", "Rum"];
    console.log("Category list editable: " + editable);


    return (
        <View style={styles.categoryContainer}>
            <List.Section title="Categories" >
                <Category entries={testEntries} editable={editable ? true : undefined} />
            </List.Section>
            <AddCategoryButton />
        </View >
    )


}

const styles = StyleSheet.create({
    categoryContainer: {
        flex: 2,
        width: "80%",
        paddingBottom: "15%",
    },
    addEntry: {
        alignSelf: "center",
        marginLeft: "35%",
        backgroundColor: "#80D8F7",
    },
});

export default CategoryList;