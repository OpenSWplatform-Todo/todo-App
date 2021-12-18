/*메인화면*/
import React, {useState, useEffect} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, ScrollView, Pressable, FlatList } from 'react-native';
import { Task } from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { viewStyles } from '../styles/TodoListScreenStyles';
import ViewShot from 'react-native-view-shot';
import * as Sharing from "expo-sharing";
import { theme } from '../theme';
import DraggableFlatList from 'react-native-draggable-flatlist';

import { ListItem, SearchBar } from "react-native-elements";
import { Provider, Appbar, Card, Searchbar } from 'react-native-paper';
import filter from "lodash.filter";

import AddFloatingButton from '../components/floatingButtons/AddFloatingButton';
import ArchiveFloatingButton from '../components/floatingButtons/ArchiveFloatingButton';

function TodoList({navigation}) {
const [taskInfo, setTaskInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [taskview, setTaskview] = useState('all')
  const isFocused = useIsFocused();
  const [taskid, setTaskid] = useState('');
  const [loading, setLoading] = useState(false);

  const getId = (id) =>{
    setTaskid(id);
  }

  let todate = new Date();
  today = todate.getFullYear()+ "-" + parseInt(todate.getMonth()+1)+"-"+todate.getDate().toString().padStart(2,'0')
  let sorted = Object.values(taskInfo).filter(task => task.duedate.slice(0,-4) >= today);/*오늘 이후의 item만 여기에 있음.*/

  useEffect(() => {
    
    if (isFocused) {
        const firstLoad = async () => {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setTaskInfo(JSON.parse(loadedTasks || '{}'));
            if(!loadedTasks){setIsEmpty(true)}
            else{setIsEmpty(false)}
        }
      firstLoad();
      console.log(taskInfo)
    }
  }, [isFocused]);
      
  useEffect(()=>{
    return () => setLoading(false);
  },[]);

  const _saveTasks = async tasks => {
      try{
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
          setTaskInfo(tasks);
      }catch(e) {
          console.error(e);
      }
  };
  
  const _toggleTask = id => {
    const currentTasks = Object.assign({},taskInfo);
    for (const C_id in currentTasks)
      if (currentTasks[C_id].id == id)
        currentTasks[C_id] ['completed'] = !currentTasks[C_id]['completed'];
    setTaskInfo(currentTasks);
    _saveTasks(currentTasks);
  }
  const _editTask = () =>{
    navigation.navigate('EditTodoItemScreen', {itemId: taskid})
  };

  // task Modal에서 제거 
  const _deleteTask = () => {
    id = taskid
    const currentTasks = Object.assign({}, taskInfo);
    for (const C_id in currentTasks)
        if (currentTasks[C_id].id == id)
          delete currentTasks[C_id];
    _saveTasks(currentTasks);
  };

/* Select/Deselect */
  const [selectedItems, setSelectedItems] = useState([]);

  const getSelected = id => selectedItems.includes(id.id);

  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {
    if (selectedItems.includes(item.id)) {
      const newListItems = selectedItems.filter(
        Task => Task !== item.id,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.id]);
  };

// select task 제거
  const _SdeleteTask = () => {
    const currentTasks = Object.assign({}, taskInfo);
    if(Object.keys(currentTasks).length == 0 || selectedItems.length == 0){
      alert("There is no item to delete")
      return;
    }
    for(var i = 0; i < selectedItems.length; i++){
      var c = selectedItems[i];
      for (const id in currentTasks)
        if (currentTasks[id].id == c)
          delete currentTasks[id];
      setSelectedItems([]);
    }
    _saveTasks(currentTasks);
  };
  
// 전체 task 제거
  const _deleteTaskAll = id => {
    const currentTasks = Object.assign({}, taskInfo);
    if(Object.keys(currentTasks).length == 0){
      alert("There is no item to delete all")
      return;
    }
    if (id) {
    for(const id in currentTasks){
        delete currentTasks[id];
    }
  }
    setSelectedItems([]);
    _saveTasks(currentTasks);
  };

  // 전체 task 선택
  const _selectAllItems = () => {
    const currentTasks = Object.assign({}, taskInfo);
    if(Object.keys(currentTasks).length == 0){
      alert("There is no item to select all")
      return;
    }
    for (const id in currentTasks) {
      if (!selectedItems.includes([id].id))
        selectedItems.push(currentTasks[id].id);
    }
    setSelectedItems([...selectedItems]);
  };

  // 전체 task 선택 해제
  const _deselectAllItems = () => {
    const currentTasks = Object.assign({}, taskInfo);
    if(Object.keys(currentTasks).length == 0 || selectedItems.length == 0){
      alert("There is no item to deselect all")
      return;
    }
    setSelectedItems([]);
  };

  {/* SORT */}
  const _sortByDueDate = () => {

  ;}

// sort하기 이전으로 돌아감
  const _sortByAddedDate = () => {

  ;}


  
  const dragChange = (dragList) => {
    setTaskInfo(dragList);
    _saveTasks(dragList);
    setLoading(true);
  }

  function Filtering() {
    return(
      <View style={{margintop: 5,marginLeft:5, marginRight:5, width: '95%', height: 50, alignItems: 'center', flexDirection: "row"}}>
          <View style={{width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <View style = {[viewStyles.button, {backgroundColor:"#424242", flexDirection: "row", justifyContent: 'center', alignItems: 'center', borderRadius: 8}]}>
              <Text style = {{color: '#E8E8E8', margin:5, marginVertical:8, fontWeight: 'bold', fontSize: 15}}>{today}</Text>
            </View>
          </View>
          <View style={{width: '50%', justifyContent: 'center', alignItems: 'flex-end', flexDirection: "row" }}>
            <Pressable style = {{margin: 10}} onPress={()=>{setTaskview('all')}}><Text>All</Text></Pressable>
            <Pressable style = {{margin: 10}} onPress={()=>{setTaskview('completed')}}><Text>Completed</Text></Pressable>
            <Pressable style = {{margin: 10}} onPress={()=>{setTaskview('incompleted')}}><Text>Incompleted</Text></Pressable>
          </View>
        </View>
    )}

  const captureAndShareScreenshot = () => {
    viewShot.current.capture().then((uri) => {
    console.log("do something with ", uri);
    Sharing.shareAsync("file://" + uri);
    }),
    (error) => console.error("Oops, snapshot failed", error);
  };

  const viewShot = React.useRef();

   function SearchTasks(){
      if(isEmpty === false){
            let listview = sorted
            if(taskview === 'completed'){
              listview = Object.values(sorted).filter(task => task.completed === true );
            }
            else if(taskview === 'incompleted'){
              listview = Object.values(sorted).filter(task => task.completed === false );
            }
            const [loading, setLoading] = useState(false);
            const [data, setData] = useState(Object.values(listview));
            const [error, setError] = useState(null);
            const [searchValue, setSearchValue] = useState("");
            const [filteredDataSource, setFilteredDataSource] = useState([]);

            const searchFunction = (text) => {

                 const updatedData = Object.values(listview).filter((item) => {
                 const item_data = `${item.task})`;
                 const text_data = text;

                 setData(updatedData);
                 setSearchValue(text);

                 return item_data.indexOf(text_data) > -1;
                 });
            };

            return (
                <View style={styles.container}>
                <SearchBar
                   placeholder="Search"
                   lightTheme
                   round
                   onChangeText={text => searchFunction(text)}
                   autoCorrect={false}
                />
                <Pressable onPress={deSelectItems}>
                  <DraggableFlatList
                     data = {Object.values(listview)}
                     keyExtractor={(item, index) => index.toString()}
                     renderItem={({ item, index, drag}) => (
                        <Task key={item.id} item={item} index = {index}
                        drag={drag} deleteTask={_deleteTask} toggleTask={_toggleTask} Edit={_editTask}
                        onPress={() => handleOnPress(item)} onLongPress={() => selectItems(item)} selected={getSelected(item)} getId={getId} />
                     )}
                     onDragEnd={({ data }) => dragChange(data)}
                  />
                </Pressable>
                </View>
          )
      } else {return(null)}
    };

  function DefaultTasks() { /*오늘 이후의 것만 나옴 */
    if(isEmpty === false){
      let listview = sorted
      if(taskview === 'completed'){
        listview = Object.values(sorted).filter(task => task.completed === true );
      }
      else if(taskview === 'incompleted'){
        listview = Object.values(sorted).filter(task => task.completed === false );
      }
      
      return (
        <Pressable onPress={deSelectItems} >
            <DraggableFlatList
              data = {Object.values(listview)}
              keyExtractor={(item, index) => index.toString()} 
              renderItem={({ item, index, drag}) => (
                <Task key={item.id} item={item} index = {index} 
                drag={drag} deleteTask={_deleteTask} toggleTask={_toggleTask} Edit={_editTask} 
                onPress={() => handleOnPress(item)} onLongPress={() => selectItems(item)} selected={getSelected(item)} getId={getId} />
              )}
              onDragEnd={({ data }) => dragChange(data)}
              />
        </Pressable>
    )}
    else {return(null)}
  }


  return (
    <View style ={ {flex:1, backgroundColor: 'white'} }>
        <Button color = "#00462A" title="Share My Todo List" onPress={captureAndShareScreenshot} />
        <View style={viewStyles.fixToText}> 
          <Pressable onPress={_selectAllItems} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Select All</Text></Pressable>
          <Pressable onPress={_deselectAllItems} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Deselect All</Text></Pressable>
          <Pressable onPress={_SdeleteTask} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Delete</Text></Pressable>
          <Pressable onPress={_deleteTaskAll} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Delete All</Text></Pressable>
        </View>
        {/* SORT BY DATE */}
        <View style={viewStyles.fixToText}>
          <Pressable onPress={_sortByDueDate} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Sort by Due Date</Text></Pressable>
          <Pressable onPress={_sortByAddedDate} style={({ pressed }) => [{backgroundColor: pressed ? 'rgba(0, 70, 42, 0.2)' : 'white'}, viewStyles.wrapperCustom]}>
          <Text>Sort by Added Date</Text></Pressable>
        </View>
        <ViewShot ref = {viewShot} options={{ format: "jpg", quality: 0.9 }}>
          <View style={{backgroundColor: 'white'}}>
          <Filtering/>
          <SearchTasks/>
          {/*<DefaultTasks/>*/}
          </View>
        </ViewShot>
      <AddFloatingButton onPress={()=>navigation.navigate('AddTodoItemScreen')}/>
      <ArchiveFloatingButton onPress={()=>navigation.navigate('AddTodoItemScreen')}/>
    </View>
  );
    
}
  export default TodoList;

  const styles = StyleSheet.create({
      container: {
      },
      item: {
        backgroundColor: "#EBEBEB",
        padding: 20,
        marginVertical: 4,
      },
  });