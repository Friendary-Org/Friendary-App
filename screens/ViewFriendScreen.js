import React from 'react';
import { ScrollView, View, StyleSheet, Platform, KeyboardAvoidingView,} from 'react-native';
import { TextInput, Snackbar, Text,IconButton, MD3Colors} from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import CategoryList from '../components/CategoryList';
import BirthdateEntry from '../components/BirthdateEntry';

const ViewFriendScreen = ({ route, navigation }) => {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [newCategories, setCategories] = React.useState([]);

    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("")

    const onDismissSnackBar = () => setSnackBarVisible(false);

    
    const _fetchContacts = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                return JSON.parse(contacts);
            else
                return []
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

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
                    <BigAvatar />
                    <Text
                        style={styles.input}
                        label="Name*"
                        mode="outlined"
                        value={name}
                        onChangeText={name => setName(name)}
                    />
                    <Text
                        style={styles.input}
                        label="Description"
                        mode="outlined"
                        value={description}
                        onChangeText={desc => setDescription(desc)}
                    />
                    <BirthdateEntry date={date} setDate={setDate}/>
                </View>
                {/* <View style={styles.lineStyle} /> */}
                <CategoryList newCategories={newCategories} setCategories={setCategories} />
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
        top:0,
        right:0,
    }
});
export default ViewFriendScreen;