/*메인화면*/
import React, {useState, useEffect} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {View, Text, Button, ScrollView, Pressable, FlatList} from 'react-native';
import { Task } from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Main({navigation}) {

  const [taskInfo, setTaskInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);
  const [taskview, setTaskview] = useState('all')
  const isFocused = useIsFocused();

  let today = new Date();
  today = today.getFullYear()+ "-" + parseInt(today.getMonth()+1)+"-"+today.getDate().toString().padStart(2,'0')
  let sorted = Object.values(taskInfo).filter(task => task.duedate.slice(0,-4) >= today );/*오늘 이후의 item만 여기에 있음*/

  useEffect(() => {
    
    if (isFocused) {
        const firstLoad = async () => {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setTaskInfo(JSON.parse(loadedTasks || '{}'));
            if(!loadedTasks){setIsEmpty(true)}
            else{console.log(setIsEmpty(false))}
            console.log(taskInfo)
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

  // task 제거 modal과 연결 필요
  const _deleteTask = id => {
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
// 모든 task 제거
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

  // 모든 task 선택
  const _selectAllItems = () => {
    const currentTasks = Object.assign({}, taskInfo);
    for(const id in currentTasks){
      if (!selectedItems.includes(id))
        selectedItems.push(id);
      }
    console.log(selectedItems)
  };


  function DefaultTasks() { /*오늘 이후의 것만 나옴 */
    if(isEmpty === false){
      if(taskview === 'all'){
        return (
          <>
            <FlatList 
              data = {Object.values(sorted)}
              renderItem = {({item}) =>  <Task key = {item.id} item = {item} toggleTask = {_toggleTask}/>}  
            />
          </>
        )
      }
      else if(taskview === 'completed'){
        let viewCompleted = Object.values(taskInfo).filter(task => task.completed === true );
        return (
          <>
            <FlatList 
              data = {Object.values(viewCompleted)}
              renderItem = {({item}) =>  <Task key = {item.id} item = {item} toggleTask = {_toggleTask}/>}  
            />
          </>
        )
      }

      else if(taskview === 'incompleted'){
        let viewIncompleted = Object.values(taskInfo).filter(task => task.completed === false );
        return (
          <>
            <FlatList 
              data = {Object.values(viewIncompleted)}
              renderItem = {({item}) =>  <Task key = {item.id} item = {item} toggleTask = {_toggleTask}/>}  
            />
          </>
        )
      }
    }
    else {return(null)}
  }

  return (
    <View>
      <Button
        title="+"
        onPress={()=>navigation.navigate('Addtodo')}/>
      <Button
        title="삭제하기" //select task 제거
        onPress={_SdeleteTask}/>
      <Button
        title="전체 삭제하기" //전체 task 제거
        onPress={_deleteTaskAll}/>
      <Button
        title="전체 선택하기" //전체 task 선택(log로만 확인 가능)
        onPress={_selectAllItems} />
      <DefaultTasks/>
    </View>
  );
    
}
 
  export default Main;
