// App.js
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MyThemeAMB from './myFolder/mytheme';
import MyMainNavigate from './myFolder/mainnavigate';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <PaperProvider theme={MyThemeAMB}>
      <SafeAreaView style={styles.container}>
        <MyMainNavigate />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
