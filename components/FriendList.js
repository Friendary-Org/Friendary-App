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
                
                // {console.log("FT: " + filterType); return friend}

                {
                    console.log("-------------------")

                    if (filterType.toUpperCase() === "NAMES") {
                        console.log("FILTERTYPE = NAMES")
                        return friend
                    }

                    if (friend.categories !== undefined && friend.categories.length > 0) {
                        console.log("CATEGORIES IS DEFINED")

                        let categories = friend.categories
                        console.log("categories: " + categories)

                        let categoryNames = []
                        let categoryEntries = []

                        console.log(categories.length)

                        if (categories.length === 1) {
                            categoryNames.push(categories[0].name)
                            categoryEntries.push(categories[0].entries)
                        }
                        else {
                            categories.forEach(category => {
                                categoryNames.push(category.name);
                                categoryEntries.push(category.entries)
                            })
                        }

                        console.log("categoryNames: " + categoryNames)
                        console.log("categoryEntries: " + categoryEntries)

                        if (categoryNames.length === 1) {
                            console.log("CATEGORIE NAME LENGTH 1")
                            if (categoryNames[0].toLowerCase() === filterType.toLowerCase()) {
                                console.log("OK2")
                                let entries = categoryEntries.toString().split(',')

                                console.log(entries.length)

                                if (entries.length === 1) {
                                    console.log("OK AGAIN");

                                    console.log("AAAA: " + entries.length)

                                    if (categoryEntries[0].toString().toLowerCase() === filterString.toLowerCase()) {
                                        console.log("ROUTE B")
                                        return friend
                                    }
                                }
                                else if (entries.length !== 0 && entries.length > 1) {
                                    console.log("good")
                                    entries.forEach(categoryEntry => {
                                        let abc = categoryEntry.toString().toLowerCase()
                                        let ft = filterString.toLowerCase()
                                        console.log("ZZZ " + abc + " " + ft)

                                        if (categoryEntry.toString().toLowerCase() === filterString.toLowerCase()) {
                                            console.log("ROUTE C")
                                            console.log("ABBBBBB: " + categoryEntry.toString().toLowerCase() + ", " + filterString.toLowerCase())
                                            return friend
                                        }
                                    })
                                }

                                if (filterString === "") {
                                    console.log("ROUTE D")
                                    console.log(friend.name)
                                    return friend;
                                }
                            }
                        }

                        else if (categoryNames.length !== 0 && categoryNames.length > 1) {
                        console.log("CATEGORIE NAME LENGTH > 1")

                            categoryNames.forEach(categoryName => {
                                    let cat = categoryName.toLowerCase()
                                    let ft = filterType.toLowerCase()
                                    
                                    console.log("cat: " + cat + ", ft: " + ft)

                                    if (categoryName.toLowerCase() === filterType.toLowerCase()) {
                                        console.log("YES")
                                        console.log(friend.name)
                                        return friend;
                                    }
                                }
                            )
                        }
                    }
                    else {
                        console.log("DAMN")
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