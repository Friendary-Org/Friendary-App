import * as React from 'react';
import { StyleSheet, Text } from "react-native";
import { Avatar, IconButton } from "react-native-paper";


const AvatarWithStar = (props) => {

    const { avatar } = props;

    const IMAGES = {
        default: require(`../assets/avatar.png`),
        icon: require('../assets/icon.png'), 
    }
      
    const getImage = (avatar) => { // dynamically invoked
        return IMAGES[avatar];
    }

    // const testImage = "https://image.shutterstock.com/image-photo/word-example-written-on-magnifying-260nw-1883859943.jpg"

    return (
        <React.Fragment>
            <IconButton 
                icon="star-outline" 
                style={styles.starIconButton} 
                size={20} 
                onPress={() => console.log("pressed star")} 
            />
            {/* <Avatar.Image size={60} source={getImage(avatar)} /> */}
            {avatar.uri != undefined ?
                <Avatar.Image size={60} source={{ uri: avatar.uri }} /> :
                <Avatar.Image size={60} source={getImage(avatar)} /> 
            }
            
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    starIconButton: {
        margin: 0
    }
});

export default AvatarWithStar;