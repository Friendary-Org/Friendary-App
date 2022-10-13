import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from "react-native-paper";
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";


const ImportFriendScreen = ({navigation}) => {

    const [ contactList, setContactList ] = useState([]);
    const [ filteredContactList, setFilteredContactList ] = useState([]);
    const [ existingFriendList, setExistingFriendList ] = useState([]);
    const [ error, setError ] = useState("");
    const [ filterString, setFilterString ] = useState("");

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
                                            description: "no description",
                                            avatar: phoneContact.imageAvailable?phoneContact.image:"default",
                                            birthday: "",
                                            categories: [],
                                            checked: "unchecked"
                                        }
                                    }
                );

                setContactList(contactList)
            }
            else {
                setError("no contacts found ...")
            }
          }
        })();
    }, []);


    useEffect(() => {
        fetchData();
    }, [contactList]) 

    useEffect(() => {
        if (contactList.length !== 0 && existingFriendList !== 0) {
            console.log("existingFriendList: " + existingFriendList);
            console.log("contactList: " + contactList);

            let filteredContacts = [...contactList];
            filteredContacts = filteredContacts.filter((contact) => existingFriendList.find((friend) => contact.id === friend.id) === undefined)
            console.log("filtered?" + filteredContacts);
            setFilteredContactList(filteredContacts)
        }
    }, [existingFriendList]) 

    // useEffect(() => {
    //     console.log("existingFriendList: " + existingFriendList)
    // }, [existingFriendList]) r

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

        navigation.push("Friends")
    } 

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

    // for testing purposes 
    const _removeData = async () => {
        try {
            await AsyncStorage.removeItem('contacts');
            console.log("removal successful");
        } catch (error) {
            console.log("removal failed: " + error.message)
        }
    }

    // for testing purposes
    const _printAllEntriesFromAsyncStorage = async () => {   
        const keys = await AsyncStorage.getAllKeys();
        const entries = await AsyncStorage.multiGet(keys);
        console.log(entries);
    }
    

    return (
        <React.Fragment>
            <View style={styles.importTextContainer}>
                <Text style={styles.importText}>Import from Contacts</Text>
            </View>

            <View style={styles.searchContainer}>
                <SearchBar setFilterString={setFilterString}/>
            </View>

            {error == "" ?
                <ScrollView>
                    <View style={styles.contactList}>
                        <ContactList contactList={filteredContactList} filterString={filterString} setChecked={setChecked} />
                    </View>
                </ScrollView> :
                <Text style={styles.errorText}>{error}</Text>
            }

            <View style={styles.selectButtonContainer}>
                <Button style={styles.selectButton} mode="contained" onPress={() => _removeData()}>Remove</Button>
            </View>

            <View style={styles.selectButtonContainer}>
                <Button style={styles.selectButton} mode="contained" onPress={() => _printAllEntriesFromAsyncStorage()}>Print</Button>
            </View>

            <View style={styles.selectButtonContainer}>
                <Button style={styles.selectButton} mode="contained" onPress={() => importSelectedContacts()}>Import</Button>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    importTextContainer: {
        justifyContent: "center",
        marginTop: "10%",
        height: "6%",
        backgroundColor: "#A1C8E8"
    },
    importText: {
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        textAlign: "center",
        padding: 16,
    },
    contactList: {
        height: "100%",
        backgroundColor: "#F7F6F6" //main background color
    },
    selectButtonContainer: {
        height: "10%",
    },
    searchContainer: {
    },
});

export default ImportFriendScreen;