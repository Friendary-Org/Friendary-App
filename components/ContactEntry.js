import * as React from 'react';
import { useState } from 'react';
import { Text } from "react-native";
import { List, Checkbox } from "react-native-paper";


const ContactEntry = (props) => {

    const { name } = props;
    const [checked, setChecked] = useState("unchecked");

    return (
        <List.Item 
            title = {name} 
            onPress={() => setChecked(checked == "unchecked"?"checked":"unchecked")}
            right = {() => <Checkbox 
                                status={checked} 
                                onPress={() => setChecked(checked == "unchecked"?"checked":"unchecked")}
                            /> 
                    }
        />
    );
}

export default ContactEntry;