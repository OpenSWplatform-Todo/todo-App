import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { theme } from '../theme';

const Report = () => {
  return (
    <View style = { styles.container }>
      <Text>Report Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default Report;