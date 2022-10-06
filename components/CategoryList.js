import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const { editable, categories } = props;
    const [newCategories, setCategories] = React.useState([categories]);

    console.log(newCategories.length)

    const addCategory = (category) => {
        if(newCategories[1]==[]){
            setCategories([category]);
        }
        setCategories([...newCategories,{category}]);
        console.log("added "+category.name);
    }
    const deleteCategory = (index) => {
        setCategories([...newCategories.slice(0, index), ...newEntries.slice(index + 1)]);
    }

    const testEntries = ["Bier", "Wein", "Katzen", "Rum"];
        return (
            <View style={styles.categoryContainer}>
                <AddCategoryButton addCallback={addCategory}/>
                {newCategories.length > 1 ?
                    (<List.Section title="Categories" >
                    {newCategories.map((entry, index) => (
                            <Category entries={entry.entries} key={entry.uid} index={index} deleteCallback={deleteCategory} editable={editable ? true : undefined} />
                        ))}
                    </List.Section>) : null
                }  
            </View >
        )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flex: 2,
        width: "80%",
        paddingBottom: "15%",
        paddingTop: "20%"
    },
});

export default CategoryList;