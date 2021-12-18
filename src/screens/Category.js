import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';

import AddFloatingButton from '../components/floatingButtons/AddFloatingButton';
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