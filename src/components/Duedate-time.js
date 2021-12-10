/*duedate랑 due time 용 */

import React, {useState} from 'react';
import {Text, View, Pressable, StyleSheet, Modal, Dimensions} from 'react-native';
import { textStyles, viewStyle } from '../substyle';
import DateTimePicker from '@react-native-community/datetimepicker';

export const Duedate_time = ({data1, getData1, data2, getData2 }) => {
    const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    const [date, setDate] = useState(new Date(Date.now()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear()+ "-" + parseInt(tempDate.getMonth()+1)+"-"+tempDate.getDate().toString().padStart(2,'0')+" "+weekday[tempDate.getDay()];
        let fTime = tempDate.getHours().toString().padStart(2,'0') + ":"+ tempDate.getMinutes().toString().padStart(2,'0');
        
        getData1(fDate)
        getData2(fTime)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      
    
    return(
        <>

            <View style={viewStyle.container}>
                <Text style={[textStyles.heading, {flexDirection:"row"}]}>Due date and Due time</Text>
            </View>

            <View style={[viewStyle.container, viewStyle.subcontainer]}>
                <Box />
                <Pressable 
                    style = {[viewStyle.button, {height:30, width: '60%'}]}
                    onPress={() => showMode('date')}
                >
                    <Text style = {textStyles.heading}>{data1}</Text>
                </Pressable>  
                <Pressable 
                    style = {[viewStyle.button, {height:30, width: '28%'}]}
                    onPress={() => showMode('time')}
                >
                    <Text style = {textStyles.heading}>{data2}</Text>
                </Pressable>  
            </View>
            {show && (
                <DateTimePicker
                test ID = 'dateTimePicker'
                value = {date}
                mode = {mode}
                is24Hour={true}
                onChange={onChange}
                />
            )}
        </>
  
        
    );
};


export const Category = () => {
    return(
        <View style = {viewStyle.container}>
        <Text style ={textStyles.heading}>Category</Text>
        </View>
    );
};

const Box = () => {
    return(
        <View style = {[viewStyle.button, {height: 30, width: 30, marginLeft: 0}]}></View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
});