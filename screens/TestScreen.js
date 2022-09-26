import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import BackButton from "../components/BackButton"

const TestScreen = ({navigation}) => {
    return(
        <View style={styles.containerView}>
            <Text>These are really awesome Details!</Text>
            <BackButton navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TestScreen;