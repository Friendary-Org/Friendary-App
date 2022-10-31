import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, IconButton } from 'react-native-paper';

const CategoryEntry = (props) => {
    const { editable, deleteCallback, index, entryValue, changeCallback} = props;

    if (editable == true) {
        return (
            <View style={[{ width: "100%" }]}>
                <TextInput
                    mode="outlined"
                    editable={true}
                    value={entryValue}
                    style={{marginRight: 14}}
                    onChangeText={text => changeCallback(index, text)}
                    right={<TextInput.Icon icon="trash-can-outline" onPress={() => deleteCallback(index)}/>}
                />

            </View>

        )
    } else {
        return (
            <Text style={styles.categoryEntry}>{entryValue}</Text>
        )
    }


}


const styles = StyleSheet.create({
    categoryEntry: {
        margin: "3%",
        width: "100%"
    }
});

export default CategoryEntry;