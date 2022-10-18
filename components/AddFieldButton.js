import React, {useState} from 'react';
import { StyleSheet, Text, View } from "react-native";
import {Button} from 'react-native';
import { TextInput } from "react-native-paper";

const AddFieldButton =  () => {
    const [fields, setFields] = React.useState([{ value: null }]);
  
    function handleChange(i, event) {
        console.log(i)
        const values = [...fields];
        values[i].value = event;
        setFields(values);
        
      }
  
    function handleAdd() {
      
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
    }
  
    function handleRemove(i) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }
    
    return (
      <View>
        <Button title="add" onPress={() => handleAdd()} />
  
        {fields.map((field, idx) => {
          return (
            <View key={`${field}-${idx}`}>
              <TextInput
                type="text"
                placeholder="Enter Text"
                value={field.value}
                onChangeText={(text) => handleChange(idx, text)}
              />
              <Button title="remove" onPress={() => handleRemove(idx)} />
            </View>
          );
        })}
      </View>
    );
  }


  export default AddFieldButton;