import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from "react-native-paper";
import * as Contacts from 'expo-contacts';

import ContactList from "../components/ContactList";

const ImportFriendScreen = ({navigation}) => {

    const [ contacts, setContacts ] = useState([]);
    const [ error, setError ] = useState("");

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.Name],
            });
    
            if (data.length > 0) {
                setContacts(data)
            }
            else {
                setError("no contacts found ...")
            }
          }
        })();
      }, []);


    return (
        <React.Fragment>
            <View style={styles.importTextContainer}>
                <Text style={styles.importText}>Import from Contacts</Text>
            </View>

            {error == "" ?
                <ScrollView>
                    <View style={styles.contactList}>
                        <ContactList contactList={contacts}/>
                    </View>
                </ScrollView> :
                <Text style={styles.errorText}>{error}</Text>
            }

            <View style={styles.selectButtonContainer}>
                <Button style={styles.selectButton} mode="contained" onPress={() => console.log('select pressed')}>Select</Button>
            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    importTextContainer: {
        marginTop: "10%",
        height: "5%",
        backgroundColor: "#A1C8E8"
    },
    importText: {
        marginTop: 10,
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        textAlign: "center",
        padding: 16,
    },
    contactList: {
        height: "80%",
        backgroundColor: "#F7F6F6" //main background color
    },
    selectButtonContainer: {
        height: "10%",
    }
});

export default ImportFriendScreen;