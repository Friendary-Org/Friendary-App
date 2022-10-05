import * as React from 'react';
import { useState } from 'react';
import { List, Checkbox } from "react-native-paper";


const ContactEntry = (props) => {

    const { name } = props;
    const [ checked, setChecked ] = useState("unchecked");
    const determineCheckState = (checked == "unchecked" ? "checked" : "unchecked")

    return (
        <List.Item 
            title = {name} 
            onPress={() => setChecked(determineCheckState)}
            right = {() => <Checkbox 
                                status={checked} 
                                onPress={() => setChecked(determineCheckState)}
                            /> 
                    }
        />
    );
}

export default ContactEntry;