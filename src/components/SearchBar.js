import React, { Component, useState } from "react";
import {StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import filter from "lodash.filter";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import {DefaultTasks} from '../screens/TodoList';

const DATA = [
{
	id: "1",
	task: "Java Programming",
},
{
	id: "2",
	task: "Go for a walk",
},
{
	id: "3",
	task: "Zoom Meeting",
},
];

const firstLoad = async () => {
   const loadedTasks = await AsyncStorage.getItem('tasks');
   setTaskInfo(JSON.parse(loadedTasks || '{}'));
};

const Item = ({ task }) => {
return (
	<View style={styles.item}>
	<Text style={styles.itemtxt}>{task}</Text>
	</View>
);
};

const renderItem = ({ item }) => <Item task={item.task} />;

class Search extends Component {

constructor(props) {
	super(props);
	this.state = {
        loading: false,
        data: null,
        error: null,
        searchValue: "",
	};
	this.arrayholder = DATA;
};

searchFunction = (text) => {
    if (text) {
        const updatedData = this.arrayholder.filter((item) => {
    	const item_data = `${item.task.toUpperCase()})`;
    	const text_data = text.toUpperCase();
    	return item_data.indexOf(text_data) > -1;
    	});
    	this.setState({ data: updatedData, searchValue: text });
    } else {
        // text 비어 있을 경우 item 숨김
        const updatedData = this.arrayholder.filter((item) => {
        const item_data = `${item.task.toUpperCase()})`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
        });
        this.setState({ data: null, searchValue: text });
    }
};

render() {

	return (
	<View style={styles.container}>
		<SearchBar
		placeholder="Search"
		lightTheme
		round
		value={this.state.searchValue}
		onChangeText={(text) => this.searchFunction(text)}
		autoCorrect={false}
		/>
		<FlatList
		data={this.state.data}
		renderItem={renderItem}
		keyExtractor={(item) => item.id}
		/>
	</View>
	);
}
}

export default Search;

const styles = StyleSheet.create({
container: {
    marginBottom: 0,
},
item: {
	backgroundColor: "white",
	padding: 10,
	marginVertical: 4,
},
itemtxt: {
    color: "#00462A",
    fontSize: 20,
},
});
