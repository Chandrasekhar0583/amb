// App.js
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import MyThemeAMB from './myFolder/mytheme';
import MyMainNavigate from './myFolder/mainnavigate';

export default function App() {
  return (
    <PaperProvider theme={MyThemeAMB}>
      <View style={styles.container}>
        <MyMainNavigate />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
