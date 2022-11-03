import * as React from 'react';
import { List, Checkbox } from "react-native-paper";


const ContactEntry = (props) => {

    const { contact, setChecked } = props;
    const determineNewCheckedState = (contact.checked == "unchecked" ? "checked" : "unchecked")
    
    return (
        <List.Item 
            title = {contact.name} 
            style = {contact.disabled ? {backgroundColor: 'lightgrey'}:{}}
            onPress={() => !contact.disabled ? setChecked(contact.id, determineNewCheckedState) : ""}
            right = {() => <Checkbox 
                                status={contact.checked}
                                disabled={contact.disabled}
                                onPress={() => !contact.disabled ? setChecked(contact.name, determineNewCheckedState) : ""}
                            /> 
                    }
        />
    );
}

export default ContactEntry;