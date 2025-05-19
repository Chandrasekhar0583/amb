import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const HomeAMB = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={{ color: colors.primary }}>Hello with Theme!</Text>
    </View>
  );
};

export default HomeAMB;
