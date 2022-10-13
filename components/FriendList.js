import * as React from 'react';
import { Divider } from 'react-native-paper';

import FriendEntry from './FriendEntry';


const FriendList = (props) => {

    const { friendList, filterString } = props;

    return (
        <React.Fragment>
            {friendList.filter((friend) => friend.name !== undefined ?
                                           friend.name.toLowerCase().includes(filterString.toLowerCase()) :
                                           ""
                            )

                                
                                           
            .map((friend) => (   
                <React.Fragment key={friend.id}>    
                    <FriendEntry friend={friend} />
                    <Divider />      
                </React.Fragment>
            ))}    
        </React.Fragment>
    );
}

export default FriendList;