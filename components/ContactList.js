import * as React from 'react';
import { ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import ContactEntry from './ContactEntry';


const ContactList = (props) => {

    const {contactList} = props;

    return (
        <React.Fragment>
            {contactList.map((contact) => (   
                <React.Fragment key={contact.id}>    
                    <ContactEntry name={contact.name} />
                    <Divider />      
                </React.Fragment>   
            ))}    
        </ React.Fragment>

    );
}

export default ContactList;