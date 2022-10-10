import React from 'react';
import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';


import BackButton from "../components/BackButton";
import BigAvatar from "../components/BigAvatar";
import SaveButton from '../components/SaveButton';
import CategoryList from '../components/CategoryList';

const CreateFriendScreen = ({ route, navigation }) => {
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(new Date());
    const [categories, setCategories] = React.useState([]);
    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const save = () => {
        console.log("Pressed Save");
    }

    const horizontalLine = (color) => (
        <hr
            style={{
                color,
                backgroundColor: color,
                height: 4
            }}
        />
    );


    return (
        <React.Fragment>
            <ScrollView contentContainerStyle={styles.containerView}>
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
                        {Platform.OS == "ios" ?
                            <React.Fragment>
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
                            </React.Fragment>

                            :
                            <React.Fragment>
                                <TextInput
                                    style={{width: "100%"}}
                                    label="Birthdate*"
                                    mode="outlined"
                                    value={date.toLocaleDateString()}
                                    onFocus={() => setShow(true)}

                                />
                                {show && <DateTimePicker
                                    style={[{ width: "45%" }, { marginTop: "2%" }]}
                                    testID="dateTimePicker"
                                    value={date}
                                    onChange={onChange}
                                />}
                            </React.Fragment>
                        }
                    </View>
                </View>
                {/* <View style={styles.lineStyle} /> */}
                <CategoryList editable categories={[]} />
            </ScrollView>
            <SaveButton callback={save} />
            <BackButton navigation={navigation} />
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "10%",
        backgroundColor: "#F7F6F6",
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
        alignItems: "center",
    },
    lineStyle: {
        borderWidth: 0.5,
        width: "80%",
        borderColor: 'black',
        margin: 0,
    },
});
export default CreateFriendScreen;