import React, { useEffect, useState } from 'react';
import { StatusBar, List, ScrollView, StyleSheet, View, Text, Modal, TextInput, Button, FlatList, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { theme } from '../theme';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AddFloatingButton from '../components/floatingButtons/AddFloatingButton';
import CategoryInputModal from '../components/categoryContents/CategoryInputModal';
import CategoryItemButton from '../components/categoryContents/CategoryItemButton';

export default function Category(){

  const [modalVisible, setModalVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  const findCategoryList = async () => {
    const categoryResult = await AsyncStorage.getItem('categoryList');
    console.log(categoryResult)
    if(categoryResult !== null) setCategoryList(JSON.parse(categoryResult));
  };

  useEffect(() => {
    findCategoryList();
  }, []);

  const handleOnSubmit = async (categoryItem) => {
    const categoryName = {id: Date.now(), categoryItem};
    const updatedCategoryList = [...categoryList, categoryName];
    setCategoryList(updatedCategoryList)
    await AsyncStorage.setItem('categoryList', JSON.stringify(updatedCategoryList));
  }

  return (
    <View style={styles.container}>
      <View style={styles.flatlistcontainer}>
        <FlatList 
          data={categoryList} 
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', margin: 35, marginTop: 15, marginBottom: 15}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <CategoryItemButton item={item}/>}
        />
        {!categoryList.length ? (
          <View>
            <Text>Add Categories</Text>
          </View>
        ) : null}
      </View>

      <AddFloatingButton 
        onPress={()=>setModalVisible(true)}
      />

      <CategoryInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: theme.white,
    alignContent:'center', 
    justifyContent: 'center'
  },
  flatlistcontainer: {
    flex:1,
    backgroundColor: theme.white,
    alignContent:'center', 
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  }
});