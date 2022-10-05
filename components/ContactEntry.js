import * as React from 'react';
import { useState } from 'react';
import { List, Checkbox } from "react-native-paper";


const ContactEntry = (props) => {

    const { contact, setChecked } = props;
    const determineNewCheckState = (contact.checked == "unchecked" ? "checked" : "unchecked")

    return (
        <List.Item 
            title = {contact.name} 
            onPress={() => setChecked(contact.name, determineNewCheckState)}
            right = {() => <Checkbox 
                                status={contact.checked} 
                                onPress={() => setChecked(contact.name, determineNewCheckState)}
                            /> 
                    }
        />
    );
}

export default ContactEntry;