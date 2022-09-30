import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

const CategoryEntry = (props) => {
    const {editable, initialValue} = props;
    const [entryValue, setEntryValue] = React.useState(initialValue);
    console.log("Category entry editable: "+editable);
    
    if (editable==true) {
        return (
            <TextInput
                mode="outlined"
                style={styles.categoryEntry}
                editable={true}
                outlineColor="transparent"
                value={entryValue}
                onChangeText={entryValue => setEntryValue(entryValue)}
            />
        )
    } else {
        return (
            <Text style={styles.categoryEntry}>{initialValue}</Text>
        )
    }


}


const styles = StyleSheet.create({
    categoryEntry: {
        width: "45%",
        margin: "1%"
    }
});

export default CategoryEntry;