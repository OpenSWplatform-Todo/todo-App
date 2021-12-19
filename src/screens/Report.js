import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Progress from 'react-native-progress';
import { ProgressBar, Colors } from "react-native-paper";
import { StyleSheet, View, Text } from 'react-native';
import moment from 'moment';
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
      console.log(taskInfo)
    }
  }, [isFocused]);

  const totalTask = Object.keys(taskInfo).length;
  const completeTask = Object.values(taskInfo).filter(taskInfo => taskInfo.completed === true).length;

  const currentDate = moment().format('YYYY-MM-DD');
  const currentWeek = moment().day(-7).format('YYYY-MM-DD');
  const currentMonth = moment().day(-31).format('YYYY-MM-DD');

  const totalPercentTask = Math.floor((completeTask*100)/(totalTask));

  /*Day 달성률*/
  const dayTotalTask = Object.keys(taskInfo).filter(taskInfo => moment(taskInfo.id).format('YYYY-MM-DD') == currentDate).length;
  const dayCompleteTask = Object.values(taskInfo).filter((task) => (task.completed === true) && (moment(taskInfo.id).format('YYYY-MM-DD') === currentDate)).length;
  const dayPercentTask = Math.floor((dayCompleteTask*100)/(dayTotalTask));

  /*Week 달성률*/
  const weekTotalTask = Object.keys(taskInfo).filter(task => moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentWeek).length;
  const weekCompleteTask = Object.values(taskInfo).filter(task => (task.completed === true) && (moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentWeek)).length;
  const weekPercentTask = Math.floor((weekCompleteTask*100)/(weekTotalTask));

  /*Month 달성률*/
  const monthTotalTask = Object.keys(taskInfo).filter(task => moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentMonth).length;
  const monthCompleteTask = Object.values(taskInfo).filter(task => (task.completed === true) && (moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentMonth)).length;
  const monthPercentTask = Math.floor((monthCompleteTask*100)/(monthTotalTask));

  return (
    <View stlye={styles.container}>
      <Text>[전체] completeTask: {totalPercentTask}% -{totalTask} -{completeTask}</Text>
      <Text>{currentDate} [일] : {dayPercentTask}% -{dayTotalTask} -{dayCompleteTask}</Text>
      {/* <ProgressBar
        progress = {dayPercentTask/100}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
      <Text>{currentWeek} [주] : {weekPercentTask}% -{weekTotalTask} -{weekCompleteTask}</Text>
      {/* <Progress.Bar
        progress = {weekPercentTask/100}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
      <Text>{currentMonth} [월] : {monthPercentTask}% -{monthTotalTask} -{monthCompleteTask}</Text>
      {/* <Progress.Bar
        progress = {monthPercentTask/100}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: theme.white,
    alignContent:'center', 
    justifyContent: 'center',
  },
});


export default Report;