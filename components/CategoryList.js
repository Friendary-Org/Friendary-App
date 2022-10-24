import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const [categoryList, setcategoryList] = React.useState([]);
    const { editable, newCategories, setCategories, navigation } = props;
    const [unusedCategories, setUnusedCategories] = React.useState([])

    const _fetchCategoryList = async () => {
        try {
            const value = await AsyncStorage.getItem('categories').then((value) => {
                if(value != null){
                    setcategoryList(JSON.parse(value));
                }else{
                    setcategoryList([])
                }
            });
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
        return []
    }

    const _filterUnusedCategories = () => {
        setUnusedCategories(categoryList.filter(ar => !newCategories.find(rm => (rm.uid === ar.uid))));
    }

    useEffect(() => {
        _fetchCategoryList();
        const willFocusSubscription = navigation.addListener('focus', () => {
            _fetchCategoryList();
        });
        return willFocusSubscription;
    }, []);

    useEffect(() => {
        _filterUnusedCategories();
    }, [categoryList]);

    const addCategory = (categoryUid) => {
        let category = categoryList.filter(((item) => item.uid == categoryUid))[0];
        setCategories([...newCategories, category]);
        setUnusedCategories(unusedCategories.filter((cat) => cat.uid !== category.uid));
    }
    const deleteCategory = (index) => {
        setCategories([...newCategories.slice(0, index), ...newCategories.slice(index + 1)]);
        setUnusedCategories([...unusedCategories, newCategories[index]]);
    }

    const changeEntries = (category, newEntries) => {
        let onlyEntries = newEntries.map(function(e) { 
            delete e.uid; 
            return e.value;  
        });
        onlyEntries = onlyEntries.filter(e =>  e);
        const changedCategories = newCategories.map((e) => {
            if (e.uid === category.uid) {
                e.entries = onlyEntries;
                return e;
            } else {
                return e;
            }
        });
        setCategories(changedCategories);

    }

    return (
        <View style={styles.categoryContainer}>
            {editable && <AddCategoryButton categoryList={unusedCategories} addCallback={addCategory} selectedCategories={newCategories} navigation={navigation}/>}    
            {newCategories.length > 0 ?
                (<List.Section title="Categories" style={{width: "80%"}}>
                    {newCategories.map((cat, index) => (
                        <Category 
                            category={cat}
                            key={cat.uid}
                            editable={editable ? editable : undefined}
                            deleteCallback={deleteCategory}
                            changeEntriesCallback={changeEntries}
                            index={index} />
                    ))}
                </List.Section>) : null
            }
        </View >
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

});

export default CategoryList;