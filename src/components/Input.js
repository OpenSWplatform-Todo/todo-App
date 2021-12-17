/* add comment랑 add task 함수 제작 */
import React, { useState } from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import { textStyles, viewStyles } from '../styles/TodoListScreenStyles';


export const AddTask = ({value, onChangeText}) => {
   
    return(
        <View style = {viewStyles.container}>
        <TextInput style ={inputStyle.addTask}
            placeholder="Add Task here..."
            placeholderTextColor= {"#898989"}
            maxLength={50}
            autoCapitalize= 'none'
            autoCorrect= {false}
            value = {value} onChangeText={onChangeText} 
            >
        </TextInput>
        </View>
    );
};

export const AddComment = ({value, onChangeText}) => {
    return(
  
            <View style = {viewStyles.container}> 
                <Text style={textStyles.heading}>Notes</Text>
                <TextInput 
                    style={[inputStyle.addTask, inputStyle.addComment]}
                    multiline = {true}
                    placeholder="Write here"
                    placeholderTextColor={"#898989"}
                    maxLength={250}
                    autoCapitalize= 'none'
                    autoCorrect= {false}
                    value={value} onChangeText={onChangeText}></TextInput> 
            </View>
   

    );
};


const inputStyle = StyleSheet.create({
    addTask: {
        fontSize: 24,
        width: "100%",
        height: 30, 
        backgroundColor: "#E8E8E8", /*밑줄...치는 법을 몰라서 일단 색을 칠함 후에 수정*/
    },
    addComment: {
        fontSize: 14,
        height: 120,
        marginTop: 8,
        backgroundColor: "#E8E8E8",
        textAlignVertical: "top",
    },
});


