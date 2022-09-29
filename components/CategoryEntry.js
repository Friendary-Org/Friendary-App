import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

const CategoryEntry = (props) => {
    const {editable, initialValue} = props;
    const [entryValue, setEntryValue] = React.useState(initialValue);
    
    if (editable) {
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
            <Text style={styles.categoryEntry}>{value}</Text>
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