import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Avatar, IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker'

const avatarSize = 128;

const BigAvatar = (props) => {

    const IMAGE = { default: require(`../assets/avatar_neutral.jpg`) }
    const { editable, setAvatar, preloadedAvatar } = props;

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(preloadedAvatar);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setAvatar(result.uri);
        }

        if (hasGalleryPermission === false) {
            return <Text>No access to image gallery granted</Text>
        }
    }

    return (
        <React.Fragment>
            <View style={styles.avatarContainer}>

                {image != null && image.uri != null ?
                    <Avatar.Image size={avatarSize} source={{ uri: image.uri }} /> :
                    (image != null ?
                        <Avatar.Image size={avatarSize} source={{ uri: image }} /> :
                        <Avatar.Image size={avatarSize} source={IMAGE["default"]} />
                    )
                }
                <IconButton
                    style={[styles.upload, editable == undefined ? { display: "none" } : {}]}
                    icon="pencil-outline"
                    size={avatarSize / 6}
                    onPress={() => pickImage()}
                    mode="outlined"
                />
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    icon: {
        backgroundColor: "#EADDFF",
    },
    upload: {
        position: "absolute",
        marginLeft: avatarSize * 0.65,
        marginTop: avatarSize * 0.65,
        backgroundColor: "#EADDFF",
    },
    description: {
        position: "absolute",
        marginRight: avatarSize * 0.65,
        marginTop: avatarSize * 0.65,
        backgroundColor: "#EADDFF",
    },
    avatarContainer: {
        flexDirection: "row",
    },
});

export default BigAvatar;