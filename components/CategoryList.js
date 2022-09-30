import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const { editable, categoryValues } = props;

    const testEntries = ["Bier", "Wein", "Katzen", "Rum"];

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
});

export default CategoryList;