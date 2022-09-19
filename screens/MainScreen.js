import { FAB } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const MainScreen = () => {
    
    return (
        <View style={styles.container}>
            <FAB
            icon="star-outline"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            size="small"
            />
            <FAB
            icon="account-plus-outline"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            />
            <FAB
            icon="wrench-outline"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            size="small"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
      },
    fab: {
        justifyContent: "flex-start"
    },
});

export default MainScreen;