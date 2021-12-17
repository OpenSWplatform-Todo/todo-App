import React, { Component, PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableHightLight, View, FlatList } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import { Provider, Appbar, Card, Searchbar } from 'react-native-paper';

const DATA = [
  {
    id: "1",
    task: "Data Structures",
  },
  {
    id: "2",
    task: "STL",
  },
  {
    id: "3",
    task: "C++",
  },
];
  
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
};

const renderItem = ({ item }) => <Item title={item.task} />;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: DATA,
      error: null,
      searchValue: "",
    };
    this.arrayholder = DATA;
  }
  
  searchFunction = (text) => {
    const updatedData = this.arrayholder.filter((item) => {
      const item_data = `${item.task.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    this.setState({ data: updatedData, searchValue: text });
  };
  
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search"
          lightTheme
          // round
          value={this.state.searchValue}
          onChangeText={(text) => this.searchFunction(text)}
          autoCorrect={false}
        />
        <FlatList
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.task}
        />
      </View>
    );
  }
}
  
export default Search;

/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEBEB',
    borderColor: '#999',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

const styles = StyleSheet.create({
  container: {
  },
  item: {
    backgroundColor: "#EBEBEB",
    padding: 20,
    marginVertical: 4,
  },
});
