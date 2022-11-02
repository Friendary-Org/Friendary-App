import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Button, Divider, Text, FAB } from "react-native-paper";
import * as Contacts from 'expo-contacts';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

import ContactEntry from '../components/ContactEntry';
import SearchBar from "../components/SearchBar";
import BackButton from "../components/BackButton";


const ImportFriendScreen = ({ navigation }) => {

    const [contactList, setContactList] = useState([]);
    const [contactsToDisable, setContactsToDisable] = useState([]);
    const [existingFriendList, setExistingFriendList] = useState([]);
    const [error, setError] = useState("");
    const [filterString, setFilterString] = useState("");



    useEffect(() => {
        (async () => {

            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Name, Contacts.IMAGE],
                });

                if (data.length > 0) {
                    const contactList = data.map((phoneContact) => {
                        return {
                            id: phoneContact.id,
                            name: phoneContact.name,
                            description: "",
                            avatar: phoneContact.imageAvailable ? phoneContact.image : undefined,
                            birthday: "",
                            categories: [],
                            checked: "unchecked",
                            disabled: false
                        }
                    }
                    );
                    setContactList(contactList)
                }
                else {
                    setError("no contacts found")
                }
            }
        })();
    }, []);


    useEffect(() => {
        fetchData();
    }, [contactList])


    useEffect(() => {

        if (contactList.length !== 0 && existingFriendList !== 0) {
            let contactsToDisable = [];

            contactList.forEach(contact =>
                existingFriendList.forEach(existingFriend =>
                    contact.id === existingFriend.id ?
                        contactsToDisable.push(contact) :
                        ""
                )
            );

            setContactsToDisable(contactsToDisable);
        }
    }, [existingFriendList])


    useEffect(() => {

        if (contactList.length !== 0 && contactsToDisable.length !== 0) {

            contactList.forEach(contact =>
                contactsToDisable.forEach(disableContact => {
                    if (contact.id === disableContact.id) {
                        contact.disabled = true;
                    }
                })
            );
            setContactsToDisable([]);
        }

    }), [contactsToDisable]

    const fetchData = async () => {
        try {
            const contacts = await AsyncStorage.getItem('contacts');
            if (contacts != null)
                setExistingFriendList(JSON.parse(contacts))
            else
                console.log("no entry for given key")
        } catch (error) {
            console.log("error retrieving data: " + error.message)
        }
    }

    const setChecked = (contactName, newCheckedState) => {
        const updatedContactList = contactList.map((contact) => {
            if (contact.name == contactName) {
                contact.checked = newCheckedState
            }
            return contact
        })
        setContactList(updatedContactList)
    }

    const importSelectedContacts = async () => {
        const contactsToImportList = contactList.filter((contact) => contact.checked == "checked")
        const contacts = await AsyncStorage.getItem('contacts');

        if (contacts == null) {
            await AsyncStorage.setItem('contacts', JSON.stringify([]));
        }

        storeContacts(contactsToImportList)
    }

    const storeContacts = async (contactsToImportList) => {
        try {
            const contactsJSON = await AsyncStorage.getItem('contacts');
            const contacts = JSON.parse(contactsJSON)
            contactsToImportList.forEach((contactToImport) => contacts.push(contactToImport))

            await AsyncStorage.setItem(
                'contacts',
                JSON.stringify(contacts)
            );

        } catch (error) {
            console.log("error saving data: " + error.message)
        }

        navigation.goBack();
    }

    const renderItem = (data) => {
        return (
            <React.Fragment key={data.id}>
                <ContactEntry contact={data.item} setChecked={setChecked} />
                <Divider />
            </React.Fragment>
        );
    };

    const filterContactList = () => {
        let filteredContacts = contactList.filter((contact) => {
            if (contact.name !== undefined)
                return contact.name.toLowerCase().includes(filterString.toLowerCase())
        }
        );
        return filteredContacts;
    }

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar setFilterString={setFilterString} />
            </View>

            {error == "" ?

                <FlatList
                    data={filterContactList()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                /> :
                <Text variant="titleMedium" style={[{ alignSelf: "center" }, { marginTop: "20%" }]}>{error}</Text>
            }

            <View style={styles.importButtonContainer}>
                <FAB
                    icon="import"
                    size="medium"
                    label="Import"
                    style={styles.importButton}
                    onPress={debounce(() => importSelectedContacts(), 500)}
                />
            </View>

            <BackButton navigation={navigation} />
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F7F6F6"
    },
    errorText: {
        textAlign: "center",
        padding: 16,
    },
    scrollView: {
        padding: 2,
        width: "100%",
        height: "20%",
        backgroundColor: "#F7F6F6" //main background color
    },
    importButtonContainer: {
        width: "100%",
        position: "absolute",
        backgroundColor: "transparent",
        bottom: "10%",
        left: -800
    },
    importButton: {
        marginLeft: Dimensions.get("screen").width / 2 + 740,
        width: 120
    },
});

export default ImportFriendScreen;