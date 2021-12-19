/*duedate랑 due time 용 */

import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, StyleSheet, TextInput, FlatList} from 'react-native';
import { textStyles, viewStyles } from '../styles/TodoListScreenStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CategoryInputModal from '../components/categoryContents/CategoryInputModal';


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

            <View style={viewStyles.container}>
                <Text style={[textStyles.heading, {flexDirection:"row"}]}>Due date and Due time</Text>
            </View>

            <View style={[viewStyles.container, viewStyles.subcontainer]}>
                <Box />
                <Pressable 
                    style = {[viewStyles.button, {height:30, width: '60%'}]}
                    onPress={() => showMode('date')}
                >
                    <Text style = {textStyles.heading}>{data1}</Text>
                </Pressable>  
                <Pressable 
                    style = {[viewStyles.button, {height:30, width: '28%'}]}
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


export const Category = ({data, getData}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryList, setCategoryList] = useState([
        {"id":0,"categoryItem":"study"},
        {"id":1,"categoryItem":"anniversary"},
        {"id":2,"categoryItem":"hobby"},
        {"id":3,"categoryItem":"etc"},
    ]);
    
   


    const CategoryItem = ({text}) => {
        return (
            <Pressable 
                style = {[viewStyles.button, styles.categoryButton, (data === text) ? {backgroundColor: '#AFAFAF'}:{}]}
                onPressOut = {()=>{getData(text)}}    
            >
                <Text style = {(data === text)? {margin:3, color:'white'}:{margin:3}}>{text}</Text>
            </Pressable>
        )
    }

    return(
        <View style ={viewStyles.container}>
            <View style={viewStyles.container}>
                <Text style={[textStyles.heading, {flexDirection:"row", width: '100%'}]}>Category</Text>
            </View>
            <View style = {{justifyContent: 'flex-start', alignItems: "center", width: '100%', flexDirection: 'row', marginTop: 10}}>
                <FlatList 
                    data={categoryList} 
                    numColumns={6}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={{marginBottom: 5}}
                    renderItem={({item}) => <CategoryItem text={item.categoryItem.toString()}/>}
                />
            </View>
        </View>
      
    );
};



const Box = () => {
    return(
        <View style = {[viewStyles.button, {height: 30, width: 30, marginLeft: 0}]}></View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    categoryButton: {
        marginLeft: 0, 
        marginRight: 8, 
        borderRadius: 5
    },
   
});