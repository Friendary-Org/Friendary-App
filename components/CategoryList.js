import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const { editable, categories } = props;
    const [newCategories, setCategories] = React.useState(categories);

    const categoryList = [
        {uid: 0, name: "Likes", icon: "👍", entries: [""]},
        {uid: 1, name: "Dislikes", icon: "👎", entries: [""]},
        {uid: 2, name: "Allergies", icon: "💉", entries: [""]}
    ];

    const addCategory = (categoryUid) => {
        let category = categoryList.filter(((item) => item.uid == categoryUid))[0];
        setCategories([...newCategories,category]);
    }
    const deleteCategory = (index) => {
        setCategories([...newCategories.slice(0, index), ...newEntries.slice(index + 1)]);
    }

        return (
            <View style={styles.categoryContainer}>
                <AddCategoryButton categoryList={categoryList} addCallback={addCategory}/>
                {newCategories.length > 0 ?
                    (<List.Section title="Categories" >
                    {newCategories.map((cat, index) => (
                             <Category category={cat} key={cat.uid} editable={editable?editable:undefined}/>
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