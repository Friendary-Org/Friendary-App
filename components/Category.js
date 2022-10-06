import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CategoryEntry from '../components/CategoryEntry';

const Category = (props) => {
    const { entries, editable } = props;
    let uuidEntries = newEntries.map(item => { 
        return {uid: uuidv4(), value: item};
    })
    
    const [newEntries, setEntries] = React.useState(entries);
    if(uuidEntries!= undefined){
        setEntries(uuidEntries);
    }
    
    const addEntry = () => {
        setEntries([...newEntries,{uid: uuidv4(), value:""}]);
    }
    const deleteEntry = (index) => {
        setEntries([...newEntries.slice(0, index), ...newEntries.slice(index + 1)]);
    }

    if(entries!==undefined){
        return (
            <List.Accordion
                style={[{ backgroundColor: "#F7F6F6" }]}
                title="Likes"
                left={props => <Text>👍</Text>}>
                <View style={styles.categoryEntryContainer}>
                    {newEntries.map((entry, index) => (
                        <CategoryEntry initialValue={entry.value} editable={editable?editable:undefined} index={index} deleteCallback={deleteEntry} key={entry.uid}/>
                    ))}
                    <IconButton
                        style={[styles.addEntry,editable==undefined?{display:"none"}:{}]}
                        icon="plus"
                        size={16}
                        onPress={() => addEntry()}
                        mode="outlined"
                    />
                </View>
            </List.Accordion>
        )
    }
    
}

const styles = StyleSheet.create({
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
export default Category;