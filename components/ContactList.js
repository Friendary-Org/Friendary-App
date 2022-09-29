import * as React from 'react';
import { Divider } from 'react-native-paper';

import ContactEntry from './ContactEntry';


const ContactList = (props) => {

    const {contactList, filterString} = props;

    return (
        <React.Fragment>
            {contactList
                .filter((contact) => contact.name.includes(filterString))
                .map((contact) => (   
                    <React.Fragment key={contact.id}>    
                        <ContactEntry name={contact.name} />
                        <Divider />      
                    </React.Fragment>   
            ))}
        </ React.Fragment>

    );
}

export default ContactList;