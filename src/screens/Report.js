import React, {useState, useEffect} from 'react';
import { useIsFocused, TouchableHighlight } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ProgressBar, Colors } from "react-native-paper";
import { StyleSheet, View, Text, Pressable } from 'react-native';
// import {ProgressBar} from '@react-native-community/progress-bar-android';
import moment from 'moment';
import { theme } from '../theme';
// import { TouchableHighlight } from 'react-native-gesture-handler';


const Report = () => {

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
  const weekTotalTask = Object.keys(taskInfo).filter(taskInfo => moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentWeek).length;
  const weekCompleteTask = Object.values(taskInfo).filter(task => (task.completed === true) && (moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentWeek)).length;
  const weekPercentTask = Math.floor((weekCompleteTask*100)/(weekTotalTask));

  /*Month 달성률*/
  const monthTotalTask = Object.keys(taskInfo).filter(taskInfo => moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentMonth).length;
  const monthCompleteTask = Object.values(taskInfo).filter(task => (task.completed === true) && (moment(taskInfo.id).format('YYYY-MM-DD') <= currentDate && moment(taskInfo.id).format('YYYY-MM-DD') >= currentMonth)).length;
  const monthPercentTask = Math.floor((monthCompleteTask*100)/(monthTotalTask));

  /*Category별 개수*/
  const studyCompleteNumber = Object.keys(taskInfo).filter(taskInfo => ((taskInfo.category === 'study') && (taskInfo.completed === true))).length;
  const studyNumber = Object.keys(taskInfo).filter(task => (task.category === 'study')).length;
  const studyPercentTask = Math.floor((studyCompleteNumber*100)/studyNumber);

  const anniversaryCompleteNumber = Object.keys(taskInfo).filter(taskInfo => ((taskInfo.category === 'anniversary') && (taskInfo.completed === true))).length;
  const anniversaryNumber = Object.keys(taskInfo).filter(taskInfo => taskInfo.category === 'anniversary').length;
  const anniversaryPercentTask = Math.floor((anniversaryCompleteNumber*100)/anniversaryNumber);

  const hobbyCompleteNumber = Object.keys(taskInfo).filter(taskInfo => ((taskInfo.category === 'hobby') && (taskInfo.completed === true))).length;
  const hobbyNumber = Object.keys(taskInfo).filter(taskINfo => taskInfo.category === 'hobby').length;
  const hobbyPercentTask = Math.floor((hobbyCompleteNumber*100)/hobbyNumber);

  const etcCompleteNumber = Object.keys(taskInfo).filter(taskInfo => ((taskInfo.category === 'etc') && (taskInfo.completed === true))).length;
  const etcNumber = Object.keys(taskInfo).filter(taskInfo => taskInfo.category === 'etc').length;
  const etcPercentTask = Math.floor((etcCompleteNumber*100)/etcNumber);

  return (
    <View style={styles.container}>
      <View style={[styles.box, {backgroundColor:theme.lightgreen, borderColor:theme.white}]}>
        <Text style={[styles.textStyles,{borderBottomColor:theme.deepGray, color:theme.black}]}>Total Completion Rate</Text>
        <View>
          <Text style={[styles.rateStyles,{color:'black', marginBottom: 0}]}>{totalPercentTask}%</Text>
        </View>
      </View>
      <View style={[styles.box, {backgroundColor:theme.white}]}>
        <Text style={styles.textStyles}>Daily Completion Rate</Text> 
        <View style={styles.line}>
          <Text style={styles.rateStyles}>{dayPercentTask}%</Text>
        </View>
        <Text style={styles.textStyles}>Weekly Completion Rate</Text> 
        <Text style={styles.rateStyles}>{weekPercentTask}%</Text>
        <Text style={styles.textStyles}>Monthly Completion Rate</Text>
        <Text style={[styles.rateStyles, {marginBottom: 0}]}>{monthPercentTask}%</Text>
      </View>
      {/* <ProgressBar
        progress = {dayPercentTask}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
      {/* <Progress.Bar
        progress = {weekPercentTask/100}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
      {/* <Progress.Bar
        progress = {monthPercentTask/100}
        width = {300}
        height = {30}
        color = {theme.ewhagreen}
        unfilledcolor = {theme.midGray}
      /> */}
      {/* <Text> [School] : {studyPercentTask}% -{studyNumber} -{studyCompleteNumber}</Text>
      <Text> [Anniversary] : {anniversaryPercentTask}% -{anniversaryNumber} -{anniversaryCompleteNumber}</Text>
      <Text> [Hobby] : {hobbyPercentTask}% -{hobbyNumber} -{hobbyCompleteNumber}</Text>
      <Text> [etc] : {etcPercentTask}% -{etcNumber} -{etcCompleteNumber}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.white,
    alignContent:'center', 
    justifyContent: 'center',
    padding:10,
  },
  textStyles: {
    fontSize: 25,
    padding: 0,
    fontWeight: "bold",
    color: theme.deepGray,
    borderBottomColor: theme.lightGray,
    borderBottomWidth: 3,
  },
  rateStyles: {
    left: 220,
    color: theme.ewhagreen,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  box: {
    borderColor: theme.lightGray,
    borderWidth: 1,
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: theme.black,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    elevation: 2
  },
});

export default Report;