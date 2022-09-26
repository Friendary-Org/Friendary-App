import * as React from 'react';
import { Divider } from 'react-native-paper';

import ContactEntry from './ContactEntry';


const ContactList = (props) => {

    const {contactList} = props;

    return (
        <React.Fragment>
            {contactList.map((contact) => (   
                <React.Fragment key={contact.contactId}>    
                    <ContactEntry name={contact.fields.name} />
                    <Divider />      
                </React.Fragment>   
            ))}    
        </ React.Fragment>

    );
}

export default ContactList;