import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { TextInput, Text} from 'react-native-paper';
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
        return(
            <View style={styles.birthdateContainer}>
                        <Text
                            style={{ width: "100%" }} variant="headlineSmall"
                        > Birthday: {date.toLocaleDateString()}</Text>
            </View>
        )
    } else {
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
                            style={[{ width: "100%" },{marginTop: "2%"}]}
                            label="Birthdate"
                            mode="outlined"
                            value={date.toLocaleDateString()}
                            onFocus={() => setShow(true)}

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
    }
}

const styles = StyleSheet.create({
    birthdateContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default BirthdateEntry;
