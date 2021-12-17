/*duedate랑 due time 용 */

import React, {useState} from 'react';
import {Text, View, Pressable, StyleSheet, TextInput} from 'react-native';
import { textStyles, viewStyles } from '../styles/TodoListScreenStyles';
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


export const Category = ({data, getData, categories, setCategories}) => {
    const [press, setPress] = useState(false)
    const [category, setCategory] = useState('')
    const [loadedCategories, setLoadedCategories] = useState({
        '1': {id: '1', text: 'study'},
        '2': {id: '2', text: 'social'} 

    });


    const CategoryItem = ({text}) => {
        if(data === text){
            return (
                <Pressable 
                    style = {[viewStyles.button, {marginLeft: 0, marginRight: 8, borderRadius: 5, backgroundColor: '#AFAFAF'},]}
                    onPressOut = {()=>{getData(text)}}    
                >
                    <Text style = {{margin:3, color:'white'}}>{text}</Text>
                </Pressable>
            )
        }
        else{
            return (
                <Pressable 
                    style = {[viewStyles.button, {marginLeft: 0, marginRight: 8, borderRadius: 5},]}
                    onPressOut = {()=>{getData(text)}} 
                >
                    <Text style = {{margin:3}}>{text}</Text>
                </Pressable>
            )
        }
    }

    const _saveCategory = () => {
        
        /*const ID = Date.now().toString ;
         const newCategoryObject = {
             [ID]: { id: ID, text: category},
         };
        setCategory({...loadedCategories,...newCategoryObject})
        console.log(category)*/
        setPress(false)
    }

    const _onChangeText = text =>{
        setCategory(text);
    }

    const AddCategories = ({value, onChangeText}) => {
        if(press === true){
            return(
                <View style = {{alignItems: "center", flexDirection: 'row', backgroundColor:"#E8E8E8"}}>
                    <TextInput style ={{
                        fontSize: 14,
                        width: 100,
                        height: 30,
                        backgroundColor: "#E8E8E8"}}
                        placeholder="  new category"
                        placeholderTextColor= {"#898989"}
                        maxLength={10}
                        autoCapitalize= 'none'
                        autoCorrect= {false}
                        value = {value} onChangeText={onChangeText}
                    ></TextInput>
                    <Pressable onPressOut = {()=>{setPress(false); setCategory('');}}><Text> x </Text></Pressable>
                    <Pressable onPressOut = {_saveCategory}><Text> submit  </Text></Pressable>
                </View>    
            )
        }
        else{
            return(
                <Pressable 
                    style = {[viewStyles.button, {height: 30, width: 30, borderRadius: 5}]}
                    onPressOut={()=>{setPress(true); console.log(loadedCategories)}}    
                >
                    <Text style = {{margin:3}}>+</Text>
                </Pressable>
            )
        }
    }

    return(
        <View style ={viewStyles.container}>
            <View style={viewStyles.container}>
                <Text style={[textStyles.heading, {flexDirection:"row", width: '100%'}]}>Category</Text>
            </View>
            <View style = {{justifyContent: 'flex-start', alignItems: "center", width: '100%', flexDirection: 'row', marginTop: 10,}}>
                <View style = {{flexDirection:"row", height: 30}}>
                    {Object.values(loadedCategories).map(item => (<CategoryItem key = {item.id} text = {item.text}/>))}
                </View>
                <AddCategories value = {category} onChangeText={_onChangeText}/>   
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
    centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
      },
    modal: {
        position: "absolute",
        top: 100,
        backgroundColor: '#E6E6E6',
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});