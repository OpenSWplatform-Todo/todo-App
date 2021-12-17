import React, { PureComponent } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableHightLight, View, FlatList } from 'react-native';
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import { Provider, Appbar, Card, Searchbar } from 'react-native-paper';

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = query => setSearchQuery(query);
  
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
  };
  
export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEBEB',
    borderColor: '#999',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
