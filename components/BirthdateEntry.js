import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { TextInput, Text, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import FriendEntry from './FriendEntry';

const BirthdateEntry = (props) => {
    const { editable, date, setDate } = props;
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        Keyboard.dismiss();
    };

    if (editable === undefined) {
        return (
            <View style={styles.birthdateContainer}>
                <Text
                    style={[{ width: "100%" }, { textAlign: "center" }]} variant="bodyLarge"
                > Birthdate: {date.toLocaleDateString()}</Text>
            </View>
        )
    } else {
        if (date.toDateString() != new Date().toDateString()) {
            return (
                <View style={styles.birthdateContainer}>
                    {Platform.OS == "ios" ?
                        <React.Fragment>
                            <TextInput
                                style={[{ width: "50%" }, { backgroundColor: "transparent" }]}
                                label="Birthdate"
                                mode="outlined"
                                editable={false}
                                outlineColor="transparent"
                                right={<TextInput.Icon 
                                    style={[styles.deleteBirthdate,]}
                                    icon="trash-can-outline"
                                    size={20}
                                    onPress={() => setDate(new Date())}
                                    mode="outlined"
                                />}
                            />
                            <DateTimePicker
                                style={[{ width: "45%" }, { marginTop: "2%" }]}
                                value={date}
                                onChange={onChange}
                            />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <TextInput
                                style={[{ width: "100%" }, { marginTop: "2%" }]}
                                label="Birthdate"
                                mode="outlined"
                                value={date.toLocaleDateString()}
                                onFocus={() => setShow(true)}
                                right={<TextInput.Icon 
                                    style={[styles.deleteBirthdate,]}
                                    icon="trash-can-outline"
                                    size={20}
                                    onPress={() => setDate(new Date())}
                                    mode="outlined"
                                />}
                            />
                            {show && <DateTimePicker
                                style={[{ width: "45%" }, { marginTop: "2%" }]}
                                value={date}
                                onChange={onChange}
                            />}
                        </React.Fragment>
                    }
                </View>
            );
        } else {
            return (
                <View style={styles.birthdateContainer}>
                    <Button icon="plus"
                        mode="outlined"
                        onPress={() => setDate(new Date(date.getFullYear() - 20, date.getMonth(), date.getDate()))}
                        style={styles.addBirthdate}>
                        Add Birthdate
                    </Button>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    birthdateContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    addBirthdate: {
        alignSelf: "center",
        marginTop: "2%"
    },
    deleteBirthdate: {
        backgroundColor: "#EADDFF",
    },
});

export default BirthdateEntry;
