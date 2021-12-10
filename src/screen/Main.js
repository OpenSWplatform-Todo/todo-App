/*메인화면*/
import React, {useState, useEffect} from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {View, Text, Button} from 'react-native';
import { images } from '../images';
import { IconButton } from '../components/IconButton';
import { Task } from '../components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage'

function Main({navigation}) {

  const [userInfo, setUserInfo] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);
  const isFocused = useIsFocused();
  /*useFocusEffect( //네비게이션 넘어올때, 시작할때마다 실행!
    React.useCallback(()=>{
      const firstLoad = async () => {
          const loadedTasks = await AsyncStorage.getItem('tasks');
          setUserInfo(JSON.parse(loadedTasks || '{}'));
          console.log(userInfo)
          if(!loadedTasks){setIsEmpty(true)}
          else{console.log(setIsEmpty(false))}
      }
        firstLoad();
      
      return () => {
      }
    }, [])
  );*/

  
  useEffect(() => {
    
    if (isFocused) {
        const firstLoad = async () => {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setUserInfo(JSON.parse(loadedTasks || '{}'));
            if(!loadedTasks){setIsEmpty(true)}
            else{console.log(setIsEmpty(false))}
            console.log(userInfo)
            AsyncStorage.clear()
        }
          firstLoad();
    }
      
  }, [isFocused]);
      
 

  function _isemptytask(){
    if(isEmpty === false){return (<Task tasks = {userInfo}/>)}
    else {return(null)}
  }
  

  return (
    <View>
      <Button
        title="+"
        onPress={()=>navigation.navigate('Addtodo')}/>
      <_isemptytask/>
    </View>
  );
    
}


  
  export default Main;