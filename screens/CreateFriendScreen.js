import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Menu, Button, TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


import BackButton from "../components/BackButton"
import BigAvatar from "../components/BigAvatar"
import AddCategoryButton from "../components/AddCategoryButton"

const CreateFriendScreen = ({ route, navigation }) => {
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    return (
        <View style={styles.containerView}>
            <View style={styles.baseInfo}>
                <BigAvatar editable />
                <TextInput
                    style={styles.input}
                    label="Name*"
                    mode="outlined"
                    value={name}
                    onChangeText={name => setName(name)}
                />
                <View style={styles.birthdateContainer}>
                    <TextInput
                        style={[{ width: "50%" }, { backgroundColor: "transparent" }]}
                        label="Birthdate*"
                        mode="outlined"
                        editable={false}
                        outlineColor="transparent"

                    />
                    <DateTimePicker
                        style={[{ width: "45%" }, { marginTop: "2%" }]}
                        testID="dateTimePicker"
                        value={date}
                        onChange={onChange}
                    />
                </View>
                <AddCategoryButton/>
            </View>
            <BackButton navigation={navigation} />
        </View>


    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
    },
    baseInfo: {
        width: "100%",
        flex: 1,
        alignContent: "center",
        alignItems: "center"
    },
    input: {
        width: "80%"
    },
    birthdateContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center"
    }
});

export default CreateFriendScreen;