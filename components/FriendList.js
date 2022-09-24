import * as React from 'react';
import { Divider } from 'react-native-paper';

import FriendEntry from './FriendEntry';


const FriendList = (props) => {

    const {friendList} = props;

    return (
        <React.Fragment>
            {friendList.map((friend) => (   
                <React.Fragment key={friend.id}>    
                    <FriendEntry 
                        title={friend.title} 
                        description={friend.description} 
                        avatar={friend.avatar}
                    />

                    <Divider />      
                </React.Fragment>
            ))}    
        </React.Fragment>
    );
}

export default FriendList;