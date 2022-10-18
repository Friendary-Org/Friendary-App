import React from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView, } from 'react-native';
import { Snackbar, Text, IconButton, } from 'react-native-paper';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';

const ViewFriendScreen = ({ route, navigation }) => {
    const friend = route.params.friend

    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("")

    const onDismissSnackBar = () => setSnackBarVisible(false);



    return (
        <KeyboardAvoidingView style={styles.containerView}
            behavior={"padding"}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.baseInfo}>
                    <IconButton
                        icon="pencil-outline"
                        style={styles.iconButton}
                        size={20}
                        onPress={() => console.log("pressed")}


                    />
                    <BigAvatar
                        preloadedAvatar={friend.avatar}
                    />
                    <Text variant="headlineLarge">{friend.name}</Text>
                    <BirthdateEntry date={new Date(friend.birthday)} />
                </View>
                {/* <View style={styles.lineStyle} /> */}
                <CategoryList newCategories={friend.categories} navigation={navigation} />
            </ScrollView>
            <BackButton navigation={navigation} />
            <Snackbar
                visible={snackBarVisible}
                onDismiss={onDismissSnackBar}>
                {snackBarMessage}
            </Snackbar>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
        backgroundColor: "#F7F6F6",
        width: "100%",
    },
    baseInfo: {
        flex: 1,
        alignContent: "flex-start",
        alignItems: "center"
    },
    input: {
        width: "80%"
    },
    lineStyle: {
        borderWidth: 0.5,
        width: "80%",
        borderColor: 'black',
        margin: 0,
    },
    scrollView: {
        width: "100%",
        paddingBottom: 200
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    }
});
export default ViewFriendScreen;