import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { List, Text, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { DeviceEventEmitter } from "react-native";

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
        if(editable){
            DeviceEventEmitter.addListener("event.createdCategory", async (eventData) => {
                addCategory(eventData);
            });
            DeviceEventEmitter.addListener("event.changedCategory", async (eventData) => {
                changeCategory(eventData);

            });
            DeviceEventEmitter.addListener("event.deletedCategory", async (eventData) => {
                let index = newCategories.findIndex((cat) => cat.uid === eventData.uid);
                setCategories([...newCategories.slice(0, index), ...newCategories.slice(index + 1)]);
            });
            return () => {
                DeviceEventEmitter.removeAllListeners("event.createdCategory");
                DeviceEventEmitter.removeAllListeners("event.changedCategory");
                DeviceEventEmitter.removeAllListeners("event.deletedCategory");
            };
        }
        
    }, []);

    useEffect(() => {
        _fetchCategoryList();
    }, [isFocused]);

    useEffect(() => {
        _filterUnusedCategories();
    }, [categoryList]);



    const addCategory = (category) => {
        setCategories([...newCategories, category]);
        setUnusedCategories(unusedCategories.filter((cat) => cat.uid !== category.uid));
    }
    const changeCategory = (changedCategory) => {
        let changedCategoryList = newCategories.map((cat) => {
            if(cat.uid === changedCategory.uid){
                cat.name = changedCategory.name;
                cat.icon = changedCategory.icon;
            }
            return cat;
        })
        console.log(changedCategoryList);
        setCategories(changedCategoryList);
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
            {newCategories.length > 0 &&
                (<List.Section title="Categories" style={{ width: "80%" }}>
                    {newCategories.map((cat, index) => (
                        <Category
                            category={cat}
                            key={cat.uid}
                            editable={editable ? editable : undefined}
                            deleteCallback={deleteCategory}
                            changeEntriesCallback={changeEntries}
                            index={index}
                            navigation={navigation}/>
                    ))}
                </List.Section>)}
            {editable == undefined && newCategories.length == 0 &&
                <React.Fragment>
                    <Text variant="bodyLarge" style={{ marginBottom: 10 }}>No categories yet!</Text>
                    <Text variant="bodyLarge">Add some using the <IconButton icon="pencil-outline" style={{ margin: 0 }} size={20} />button</Text>
                    <Text variant="bodyLarge">in the top right of your screen</Text>
                </React.Fragment>
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