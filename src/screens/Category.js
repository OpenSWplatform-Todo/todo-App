import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';

import AddFloatingButton from '../components/floatingButtons/AddFloatingButton';

const Category = () => {
  return (
    <View style = { styles.container }>
      <Text>Category Screen</Text>
      <AddFloatingButton />
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

export default Category;