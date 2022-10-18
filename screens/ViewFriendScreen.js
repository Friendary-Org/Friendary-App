import React from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView, } from 'react-native';
import { Snackbar, Text, IconButton, Modal, Portal } from 'react-native-paper';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';

const ViewFriendScreen = ({ route, navigation }) => {
    const friend = route.params.friend

    const [modalVisible, setModalVisible] = React.useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    return (
        <KeyboardAvoidingView style={styles.containerView}
            behavior={"padding"}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Text variant="bodyLarge">{friend.description!=""?friend.description:"No description"}</Text>
                    </Modal>
                </Portal>
                <View style={styles.baseInfo}>
                    <IconButton
                        icon="pencil-outline"
                        style={styles.iconButton}
                        size={32}
                        onPress={() => navigation.push("Edit Friend",{friend})}
                    />
                    <BigAvatar
                        preloadedAvatar={friend.avatar}
                        descriptionCallback={() => showModal()}/>
                        <Text variant="headlineMedium" style={{textAlign: "center"}}>{friend.name}</Text>
                    {friend.birthday!=""?<BirthdateEntry date={new Date(friend.birthday)} />:null}
                </View>
                <View style={styles.lineStyle} />
                <CategoryList newCategories={friend.categories} navigation={navigation} />
            </ScrollView>
            <BackButton navigation={navigation} />
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
        marginTop: "2%",
        alignSelf: "center"
    },
    scrollView: {
        width: "100%",
        paddingBottom: 200
    },
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        width: "90%",
        alignSelf: "center",
    }
});
export default ViewFriendScreen;