import * as React from 'react';
import { StyleSheet } from "react-native";
import { Avatar, IconButton } from "react-native-paper";


const AvatarWithStar = (props) => {

    const { avatar } = props;
    const IMAGE = {default: require(`../assets/avatar.png`)}

    return (
        <React.Fragment>
            <IconButton 
                icon="star-outline" 
                style={styles.starIconButton} 
                size={20} 
                onPress={() => console.log("pressed star")} 
            />

            {/* Case 1: Contact Avatar, Case 2: Uploaded Avatar, Case 3: Take Default Avatar */}
            {avatar != undefined && avatar.uri != undefined ?
                <Avatar.Image size={60} source={{ uri: avatar.uri }} /> :
                (avatar != undefined ? 
                    <Avatar.Image size={60} source={{ uri: avatar }}/> :
                    <Avatar.Image size={60} source={IMAGE["default"]} /> 
                )
            }
            
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    starIconButton: {
        margin: 0,
        display: "none"
    }
});

export default AvatarWithStar;