import * as React from 'react';
import { Divider } from 'react-native-paper';

import FriendEntry from './FriendEntry';


const FriendList = (props) => {

    const { friendList, filterString, filterType, navigation } = props;

    return (
        <React.Fragment>
            {friendList.filter((friend) => friend.name !== undefined && filterType !== undefined && filterType.toUpperCase() === "NAMES" ?
                                           friend.name.toLowerCase().includes(filterString.toLowerCase()) :
                                           friend                                    
            ) .filter((friend) => {return friend; }
            
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