import * as React from 'react';
import { View, useWindowDimensions, StyleSheet, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Constants from 'expo-constants';
import FriendTab from "./FriendTab";
import CategoryTab from "./CategoryTab";

const MainScreen = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'friend', title: 'Friend' },
        { key: 'category', title: 'Categories' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'friend':
                return <FriendTab navigation={navigation} />;
            case 'category':
                return <CategoryTab navigation={navigation} />;
            default:
                return null;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#6750A4" }}
            style={styles.tabBar}
            inactiveColor='black'
            activeColor='black'
        />
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={styles.tabView}
            initialLayout={{ width: layout.width }}
        />
    );
};

const styles = StyleSheet.create({
    tabView: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#F7F6F6", //main background color
    },
    tabBar: {
        backgroundColor: "#EADDFF",
        color: "red"
    }
});

export default MainScreen;