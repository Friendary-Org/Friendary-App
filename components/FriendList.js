import * as React from 'react';
import { Divider } from 'react-native-paper';
import { concat } from 'react-native-reanimated';

import FriendEntry from './FriendEntry';


const FriendList = (props) => {

    const { friendList, filterString, filterType, navigation } = props;

    return (
        <React.Fragment>
            {friendList.filter((friend) => friend.name !== undefined && filterType !== undefined && filterType.toUpperCase() === "NAMES" ?
                                           friend.name.toLowerCase().includes(filterString.toLowerCase()) :
                                           friend                                    
            ) .filter(
                (friend) => 
                {
                    console.log("-------------------")
                    console.log("friend: " + friend.name)

                    if (filterType.toUpperCase() === "NAMES") {
                        console.log("FILTERTYPE = NAMES")
                        return true
                    }

                    if (friend.categories !== undefined && friend.categories.length > 0) {
                        console.log("CATEGORIES IS DEFINED")

                        let categories = friend.categories
                        console.log("categories: " + categories)

                        let categoryNames = []

                        // single category with 0-x entries
                        if (categories.length === 1) {
                            categoryNames.push(categories[0].name)
                            console.log("SINGLE CATEGORY PUSHED: " + categories[0].name)
                            console.log("categoryNames: " + categoryNames)

                            if (categoryNames[0].toLowerCase() !== filterType.toLowerCase())
                                return false;

                            if (filterString === "")
                                return true;

                            let entries = friend.categories[0].entries

                            if (entries.length === 0)
                                return false;

                            if (entries.length === 1) 
                                return entries[0].toLowerCase() === filterString.toLowerCase();

                            if (entries.length > 1) {
                                return entries.find(entry => entry.toLowerCase() === filterString.toLowerCase()) !== undefined;
                            }
                        }
                        // multiple categories with 0-x entries
                        else 
                        {
                            console.log("MULTIPLES CATEGORIES PUSHED: ")
                            categories.forEach(category => {
                                console.log("category: " + category.name)
                                categoryNames.push(category.name)
                            })

                            if (categoryNames.find(categoryName => categoryName.toLowerCase() === filterType.toLowerCase()) !== undefined &&
                            filterString === "")
                                return true;

                            for (let i = 0; i < categories.length; i++) {
                                let currentCategory = categories[i];
                                console.log("CurrentCategory[" + i + "]: " + currentCategory.name)

                                if (currentCategory.name.toLowerCase() === filterType.toLowerCase()) {
                                    console.log("MATCH")

                                    let currentCategoryEntries = currentCategory.entries

                                    if (currentCategoryEntries.length === 0) {
                                        return false;
                                    }

                                    if (currentCategoryEntries.length === 1) {
                                        return currentCategory.entries[0].toLowerCase() === filterString.toLowerCase();
                                    }

                                    if (currentCategoryEntries.length > 1) {
                                        return currentCategoryEntries.find(currentCategoryEntry => 
                                                    currentCategoryEntry.toLowerCase() === filterString.toLowerCase()) 
                                                !== undefined;
                                    }
                                }
                            }
                        }
                    }
                }
            ) .map((friend) => (   
                <React.Fragment key={friend.id}>    
                    <FriendEntry friend={friend} 
                    navigation={navigation}/>
                    <Divider />      
                </React.Fragment>
            ))}    
        </React.Fragment>
    );
}

export default FriendList;