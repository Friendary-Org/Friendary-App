import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FAB, Provider as PaperProvider } from 'react-native-paper';

import MainScreen from './screens/MainScreen'

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <MainScreen />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
