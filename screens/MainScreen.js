import React from 'react';
import FloatingButtonsMain from './FloatingButtonsMain';
import { View, StyleSheet, Text} from "react-native";
import SearchBar from './SearchBar';

const MainScreen = () => {

    return (
        <React.Fragment>
            <View style={styles.searchContainer}>
                <SearchBar />
            </View>

            <View style={styles.helloContainer}>
                <Text>Hello</Text>
            </View>
            
            <FloatingButtonsMain />

        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 50,
        backgroundColor: 'green'
    },
    helloContainer: {
        backgroundColor: 'red'
    }
    })

export default MainScreen;