import React from "react";
import FloatingButtonsMain from "../components/FloatingButtonsMain";
import { View, StyleSheet} from "react-native";
import { List } from "react-native-paper";
import SearchBar from "../components/SearchBar";
import AvatarWithStar from "../components/AvatarWithStar";
import FriendEntry from "../components/FriendEntry";


const MainScreen = ({navigation}) => {

    const avatar = require('../assets/avatar.png')

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <FriendEntry title="Fabian Egartner" description="Nickname: Egi2k" avatar={avatar} />
            
            <FloatingButtonsMain navigation={navigation}/>

        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
        backgroundColor: "green"
    },
    helloContainer: {
        backgroundColor: "#F7F6F6", //main background color
        alignItems: "center",
        height: "100%",
    }
    })

export default MainScreen;