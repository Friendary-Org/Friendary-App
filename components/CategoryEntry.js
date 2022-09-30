import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, IconButton } from 'react-native-paper';

const CategoryEntry = (props) => {
    const { editable, initialValue, deleteCallback, index} = props;
    const [entryValue, setEntryValue] = React.useState(initialValue);


    if (editable == true) {
        return (
            <View style={{ width: "45%" }}>
                <TextInput
                    mode="outlined"
                    editable={true}
                    outlineColor="transparent"
                    value={entryValue}
                    onChangeText={entryValue => setEntryValue(entryValue)}
                    right={<TextInput.Icon icon="trash-can-outline" onPress={() => deleteCallback(index)}/>}
                />

            </View>

        )
    } else {
        return (
            <Text style={styles.categoryEntry}>{initialValue}</Text>
        )
    }


}


const styles = StyleSheet.create({
    categoryEntry: {
        margin: "1%",
        width: "45%"
    }
});

export default CategoryEntry;