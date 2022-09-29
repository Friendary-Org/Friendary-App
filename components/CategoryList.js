import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';

import CategoryEntry from '../components/CategoryEntry';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const { editable, categoryValues} = props;

    if (editable) {
        return (
            <View style={styles.categoryContainer}>
                <List.Section title="Categories" >
                    <List.Accordion
                        style={[{ backgroundColor: "#F7F6F6" }]}
                        title="Likes"
                        left={props => <Text>👍</Text>}>
                        <View style={styles.categoryEntryContainer}>
                            <CategoryEntry initialValue="Test" editable />
                            <CategoryEntry initialValue="Bier" editable />
                            <CategoryEntry editable />
                            <IconButton
                                style={[styles.addEntry]}
                                icon="plus"
                                size={16}
                                onPress={() => console.log('Pressed')
                                }
                                mode="outlined"
                            />
                        </View>
                    </List.Accordion>
                </List.Section>
                <AddCategoryButton />
            </View >
        )
    } else {
        return (
            <View style={styles.categoryContainer}>
                <List.Section title="Categories" >
                    <List.Accordion
                        style={[{ backgroundColor: "#F7F6F6" }]}
                        title="Likes"
                        left={props => <Text>👍</Text>}>
                        <View style={styles.categoryEntryContainer}>
                            <CategoryEntry />
                            <CategoryEntry />
                            <CategoryEntry />
                        </View>
                    </List.Accordion>
                </List.Section>
                <AddCategoryButton />
            </View >
        )
    }

}

const styles = StyleSheet.create({
    categoryContainer: {
        flex: 2,
        width: "80%",
        paddingBottom: "15%",
    },
    categoryEntryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: "5%",
        justifyContent: "flex-start"
    },
    addEntry: {
        alignSelf: "center",
        marginLeft: "35%",
        backgroundColor: "#80D8F7",
    },
});

export default CategoryList;