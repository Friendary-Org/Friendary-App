import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CategoryEntry from './CategoryEntry';

const Category = (props) => {
    const { category, editable, deleteCallback, index, changeEntriesCallback } = props;
    const [newEntries, setEntries] = React.useState(category.entries);
    useEffect(() => {
        let uuidEntries = category.entries.map(item => {
            return { uid: uuidv4(), value: item };
        })
        setEntries(uuidEntries)
    }, []);   

    const addEntry = () => {
        const changedEntries = [...newEntries, { uid: uuidv4(), value: "" }];
        changeEntriesCallback(category, changedEntries);
        setEntries(changedEntries);
    }
    const deleteEntry = (index) => {
        const changedEntries = [...newEntries.slice(0, index), ...newEntries.slice(index + 1)];
        changeEntriesCallback(category, changedEntries);
        setEntries(changedEntries);
    }
    const changeEntry = (index, value) => {
        const changedEntries = newEntries.map((e, i) => {
            if (i === index) {
                e.value = value;
                return e;
            } else {
                return e;
            }
        });
        changeEntriesCallback(category, changedEntries);
        setEntries(changedEntries);
        
    }

    return (
        <View style={styles.accordionContainer}>
        <List.Accordion
            style={styles.accordionHeader}
            title={category.name}
            left={props => <Text>{category.icon}</Text>}>
            <View style={styles.categoryEntryContainer}>
                {newEntries.map((entry, index) => (
                    <CategoryEntry entryValue={entry.value} editable={editable ? editable : undefined} index={index} key={index} deleteCallback={deleteEntry} changeCallback={changeEntry} />
                ))}
                <IconButton
                    style={[styles.addEntry, editable == undefined ? { display: "none" } : {}]}
                    icon="plus"
                    size={20}
                    onPress={() => addEntry()}
                    mode="outlined"
                />
                <IconButton
                    style={[styles.addEntry, editable == undefined ? { display: "none" } : {}]}
                    icon="trash-can-outline"
                    size={20}
                    onPress={() => deleteCallback(index)}
                    mode="outlined"
                />
            </View>
        </List.Accordion>
        </View>
    )


}

const styles = StyleSheet.create({
    accordionContainer: {
        backgroundColor: "#ececec",
        borderRadius: 15,
        marginBottom: 10
    },
    accordionHeader: {
        backgroundColor: "#ececec",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    categoryEntryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    addEntry: {
        alignSelf: "center",
        backgroundColor: "#EADDFF",
    },
});

export default Category;