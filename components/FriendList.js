import * as React from 'react';
import { Divider } from 'react-native-paper';
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import Constants from 'expo-constants';

import FriendEntry from './FriendEntry';


const FriendList = (props) => {

    const { friendList, filterString, filterType, navigation } = props;

    const filterFriendList = () => {
        let filteredFriendList = friendList.filter((friend) => friend.name !== undefined && filterType !== undefined && filterType.toUpperCase() === "NAMES" ?
            friend.name.toLowerCase().includes(filterString.toLowerCase()) :
            true
        ).filter(
            (friend) => {
                if (filterType.toUpperCase() === "NAMES")
                    return true

                if (friend.categories !== undefined && friend.categories.length > 0) {
                    let categories = friend.categories

                    // single category with 0-x entries
                    if (categories.length === 1) {
                        if (categories[0].name.toLowerCase() !== filterType.toLowerCase())
                            return false;

                        if (filterString === "")
                            return true;

                        let entries = categories[0].entries
                        let length = entries.length

                        if (length === 1)
                            return entries[0].toLowerCase() === filterString.toLowerCase();

                        if (length > 1) {
                            return entries.find(entry => entry.toLowerCase() === filterString.toLowerCase()) !== undefined;
                        }
                    }
                    // multiple categories with 0-x entries
                    else {
                        let categoryNames = []
                        categories.forEach(category => categoryNames.push(category.name))

                        if (categoryNames.find(categoryName => categoryName.toLowerCase() === filterType.toLowerCase()) !== undefined &&
                            filterString === "")
                            return true;

                        for (let i = 0; i < categories.length; i++) {
                            let currentCategory = categories[i];

                            if (currentCategory.name.toLowerCase() === filterType.toLowerCase()) {

                                let currentCategoryEntries = currentCategory.entries

                                if (currentCategoryEntries.length === 0)
                                    return false;

                                if (currentCategoryEntries.length === 1)
                                    return currentCategory.entries[0].toLowerCase() === filterString.toLowerCase();

                                if (currentCategoryEntries.length > 1)
                                    return currentCategoryEntries.find(currentCategoryEntry =>
                                        currentCategoryEntry.toLowerCase() === filterString.toLowerCase())
                                        !== undefined;
                            }
                        }
                    }
                }
                return false;
            }
        )
        return filteredFriendList;
    }

    const renderItem = (data) => {
        return (
            <React.Fragment key={data.id}>
                <FriendEntry friend={data.item}
                    navigation={navigation} />
                <Divider />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <FlatList
                    data={filterFriendList()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.scrollView}
                />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingTop: Constants.statusBarHeight,
    },
    scrollView: {
        padding: 2,
        backgroundColor: "#F7F6F6", //main background color
    }
});
export default FriendList;