import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar, Colors} from "react-native-paper";
import { StyleSheet, View, Text } from 'react-native';

import { theme } from '../theme';

function Report() {

const isFocused = useIsFocused();
const [taskInfo, setTaskInfo] = useState({});

  useEffect(() => {
    if (isFocused) {
        const _loadTasks = async () => {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setTaskInfo(JSON.parse(loadedTasks || '{}'));
        }
      _loadTasks();
    }
  }, [isFocused]);

  const totalTask = Object.keys(taskInfo).length;
  const completeTask = Object.values(taskInfo).filter(task => task.completed === true).length;
  const percentTask = Math.floor((completeTask*100)/(totalTask));

  return (
    <View>
      <Text>completeTask: {percentTask}%</Text>
      {/*<ProgressBar
               progress={percentTask/100} color={Colors.green900} width={300}
      />*/}
    </View>
  );
}
export default Report;