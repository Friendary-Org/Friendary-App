import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CategoryEntry from './CategoryEntry';

const Category = (props) => {
    const { category, editable } = props;
    let uuidEntries = category.entries.map(item => {
        return { uid: uuidv4(), value: item };
    })
    const [newEntries, setEntries] = React.useState(uuidEntries);

    const addEntry = () => {
        setEntries([...newEntries, { uid: uuidv4(), value: "" }]);
    }
    const deleteEntry = (index) => {
        setEntries([...newEntries.slice(0, index), ...newEntries.slice(index + 1)]);
    }

    return (
        <List.Accordion
            style={[{ backgroundColor: "#F7F6F6" }]}
            title={category.name}
            left={props => <Text>{category.icon}</Text>}>
            <View style={styles.categoryEntryContainer}>
                {newEntries.map((entry, index) => (
                    <CategoryEntry initialValue={entry.value} editable={editable ? editable : undefined} index={index} key={entry.uid} deleteCallback={deleteEntry}/>
                ))}
                <IconButton
                    style={[styles.addEntry, editable == undefined ? { display: "none" } : {}]}
                    icon="plus"
                    size={16}
                    onPress={() => addEntry()}
                    mode="outlined"
                />
            </View>
        </List.Accordion>
    )


}

const styles = StyleSheet.create({
    categoryEntryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: "5%",
        justifyContent: "center"
    },
    addEntry: {
        alignSelf: "center",
        backgroundColor: "#80D8F7",
    },
});

export default Category;