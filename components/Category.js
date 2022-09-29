import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import CategoryEntry from '../components/CategoryEntry';

const Category = (props) => {
    const { entries, editable } = props;
    if(entries!==undefined){
        return (
            <List.Accordion
                style={[{ backgroundColor: "#F7F6F6" }]}
                title="Likes"
                left={props => <Text>👍</Text>}>
                <View style={styles.categoryEntryContainer}>
                    {entries.map((entry, index) => (
                        <CategoryEntry initialValue={entry} index={index} editable />
                    ))}
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
});
export default Category;