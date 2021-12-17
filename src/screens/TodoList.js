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

import AddFloatingButton from '../components/AddFloatingButton';
import ArchiveFloatingButton from '../components/ArchiveFloatingButton';

function TodoList({navigation}) {

  const [taskInfo, setTaskInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [taskview, setTaskview] = useState('all')
  const isFocused = useIsFocused();
  const [taskid, setTaskid] = useState('');

  const getId = (id) =>{
    setTaskid(id);
  }

  let todate = new Date();
  today = todate.getFullYear()+ "-" + parseInt(todate.getMonth()+1)+"-"+todate.getDate().toString().padStart(2,'0')
  let sorted = Object.values(taskInfo).filter(task => task.duedate.slice(0,-4) >= today );/*오늘 이후의 item만 여기에 있음.*/

  useEffect(() => {
    
    if (isFocused) {
        const firstLoad = async () => {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setTaskInfo(JSON.parse(loadedTasks || '{}'));
            if(!loadedTasks){setIsEmpty(true)}
            else{setIsEmpty(false)}
        }
          firstLoad();
    }
  }, [isFocused]);
      
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
    currentTasks[id] ['completed'] = !currentTasks[id]['completed'];
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
    delete currentTasks[id];
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
      delete currentTasks[c];
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
      if (!selectedItems.includes(id))
        selectedItems.push(id);
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
        <Pressable onPress={deSelectItems}>
            <FlatList
              data={Object.values(listview)}
              renderItem={({ item }) => (
                <Task key={item.id} item={item} deleteTask={_deleteTask} toggleTask={_toggleTask} Edit={_editTask} onPress={() => handleOnPress(item)} onLongPress={() => selectItems(item)} selected={getSelected(item)} getId={getId} />
              )}
              keyExtractor={(item, index) => index.toString()} />
        </Pressable>
    )}
    else {return(null)}
  }

  return (
    <View style ={ {flex:1, backgroundColor: 'white'} }>
      <Button
        title="+"
        onPress={()=>navigation.navigate('AddTodoItemScreen')}/>
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
        <ViewShot ref = {viewShot} options={{ format: "jpg", quality: 0.9 }}>
          <View style={{backgroundColor: 'white'}}>
          <Filtering/>
          <DefaultTasks/>
          </View>
      </ViewShot>
      <AddFloatingButton/>
      <ArchiveFloatingButton/>
    </View>
  );
    
}
  export default TodoList;
