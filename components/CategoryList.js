import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import Category from '../components/Category';
import AddCategoryButton from "../components/AddCategoryButton";

const CategoryList = (props) => {
    const [categoryList, setcategoryList] = React.useState([]);
    const { editable, newCategories, setCategories, navigation } = props;
    const [unusedCategories, setUnusedCategories] = React.useState([]);
    const isFocused = useIsFocused();

    const _fetchCategoryList = async () => {
        try {
            const value = await AsyncStorage.getItem('categories').then((value) => {
                if (value != null) {
                    setcategoryList(JSON.parse(value));
                } else {
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
    }, []);

    useEffect(() => {
        _fetchCategoryList();
    }, [isFocused]);

    useEffect(() => {
        _filterUnusedCategories();
    }, [categoryList]);

    const addCategory = (categoryUid) => {
        let category = categoryList.filter(((item) => item.uid == categoryUid))[0];
        setCategories([...newCategories, category]);
        setUnusedCategories(unusedCategories.filter((cat) => cat.uid !== category.uid));
    }
    const deleteCategory = async (index) => {
        let value = await confirm();
        if (value == "true") {
            setCategories([...newCategories.slice(0, index), ...newCategories.slice(index + 1)]);
            setUnusedCategories([...unusedCategories, newCategories[index]]);
        }
    }

    const confirm = async () => new Promise((resolve) => {
        Alert.alert(
            "Delete Category",
            `Do you want to delete the whole category from your friend's page? This can't be reverted`,
            [
                {
                    text: "cancel",
                    onPress: () => resolve("false"),
                    style: "cancel"
                },
                {
                    text: "delete",
                    onPress: () => resolve("true"),
                    style: "destructive"
                }
            ]
        );
    });

    const changeEntries = (category, newEntries) => {
        let onlyEntries = newEntries.map(function (e) {
            delete e.uid;
            return e.value;
        });
        onlyEntries = onlyEntries.filter(e => e);
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
            {editable && <AddCategoryButton categoryList={unusedCategories} addCallback={addCategory} selectedCategories={newCategories} navigation={navigation} />}
            {newCategories.length > 0 ?
                (<List.Section title="Categories" style={{ width: "80%" }}>
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