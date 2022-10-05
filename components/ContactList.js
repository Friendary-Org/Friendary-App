import * as React from 'react';
import { Text } from 'react-native';
import { Divider } from 'react-native-paper';

import ContactEntry from './ContactEntry';


const ContactList = (props) => {

    const { contactList, filterString } = props;

    return (
        <React.Fragment>
            {contactList.filter((contact) => contact.name.toLowerCase().includes(filterString.toLowerCase()))
                        .map((contact) => (   
                            <React.Fragment key={contact.id}>    
                                <ContactEntry contact={contact} setChecked={props.setChecked}/>
                                <Divider />      
                            </React.Fragment>   
            ))}
        </ React.Fragment>

    );
}

export default ContactList;