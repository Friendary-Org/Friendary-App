import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button } from "react-native-paper";

import ContactList from "../components/ContactList";


const ImportFriendScreen = ({navigation}) => {

// static data for testing purposes (data comes frome phone contact list later)
    const contactList = [
        {contactId: 100, fields: {name: "Fabian Egartner"}},
        {contactId: 101, fields: {name: "John Walker"}},
        {contactId: 102, fields: {name: "Max Test"}}
    ];

    return (
        <React.Fragment>
            <View style={styles.importTextContainer}>
                <Text style={styles.importText}>Import from Contacts</Text>
            </View>

            <View style={styles.contactList}>
                <ContactList contactList={contactList}/>
            </View>

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
    contactList: {
        height: "80%",
        backgroundColor: "#F7F6F6" //main background color
        
    },
    selectButtonContainer: {
        height: "10%",
    },
    selectButton: {

    }
});

export default ImportFriendScreen;