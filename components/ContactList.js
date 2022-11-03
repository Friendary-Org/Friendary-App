import * as React from 'react';
import { Divider } from 'react-native-paper';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';

import ContactEntry from './ContactEntry';


const ContactList = (props) => {

    const { contactList, filterString, setChecked } = props;

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
            <FlatList
                    data={filterContactList()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.scrollView}
                />
        </ React.Fragment>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        padding: 2,
        width: "100%",
        height: "20%",
        backgroundColor: "#F7F6F6" //main background color
    },
});

export default ContactList;