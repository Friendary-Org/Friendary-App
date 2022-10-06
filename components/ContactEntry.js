import * as React from 'react';
import { List, Checkbox } from "react-native-paper";


const ContactEntry = (props) => {

    const { contact, setChecked } = props;
    const determineNewCheckedState = (contact.checked == "unchecked" ? "checked" : "unchecked")

    return (
        <List.Item 
            title = {contact.name} 
            onPress={() => setChecked(contact.name, determineNewCheckedState)}
            right = {() => <Checkbox 
                                status={contact.checked} 
                                onPress={() => setChecked(contact.name, determineNewCheckedState)}
                            /> 
                    }
        />
    );
}

export default ContactEntry;