/*메인화면*/
import React, {useState, useEffect} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { View, Text, Button, ScrollView, Pressable, FlatList } from 'react-native';
import { Task } from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { viewStyles } from '../styles/TodoListScreenStyles';

import AddFloatingButton from '../components/floatingButtons/AddFloatingButton';
import ArchiveFloatingButton from '../components/floatingButtons/ArchiveFloatingButton';

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
    if (id) {
    for(const id in currentTasks){
        delete currentTasks[id];
    }
    setSelectedItems([]);
    _saveTasks(currentTasks);
    }
  };

  // 전체 task 선택
  const _selectAllItems = () => {
    const currentTasks = Object.assign({}, taskInfo);
    for (const id in currentTasks) {
      if (!selectedItems.includes(id))
        selectedItems.push(id);
    }
    setSelectedItems([...selectedItems]);
  };

  // 전체 task 선택 해제
  const _deselectAllItems = () => {
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
              keyExtractor={item => item.id} />
        </Pressable>
    )}
    else {return(null)}
  }

  return (
    <View style ={ {flex:1} }>
      <Button
        title="삭제하기" //select task 제거
        onPress={_SdeleteTask}/>
      <Button
        title="전체 삭제하기" //전체 task 제거
        onPress={_deleteTaskAll}/>
      <Button
        title="전체 선택하기" //전체 task 선택(log로만 확인 가능)
        onPress={_selectAllItems} />
      <Button
        title="전체 해제하기" //전체 task 선택(log로만 확인 가능)
        onPress={_deselectAllItems} />
      <Button title="공유" onPress={()=>{}/*shareImage*/} />
      <Filtering/>
      <DefaultTasks/>
      <AddFloatingButton
        onPress={()=>navigation.navigate('AddTodoItemScreen')}
      />
      <ArchiveFloatingButton/>
    </View>
  );
    
}
 
  export default TodoList;
