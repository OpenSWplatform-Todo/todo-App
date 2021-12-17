/*항목 생성 screen */
import React, {useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, Text, View, Pressable, TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import { AddTask, AddComment } from '../components/Input'
import { Duedate_time, Category } from '../components/Duedate-time'
import { GalleryPicker, Map} from '../components/Picture'

import AsyncStorage from '@react-native-async-storage/async-storage'


function Addtodo({navigation}){
    const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let today = new Date();
    let date = today.getFullYear()+ "-" + parseInt(today.getMonth()+1)+"-"+today.getDate().toString().padStart(2,'0') +" "+weekday[today.getDay()];
    let time = today.getHours().toString().padStart(2,'0') + ":"+ today.getMinutes().toString().padStart(2,'0');


    const [task, setTask] = useState('')/*task 변수*/
    const [duedate, setDuedate] = useState(date) /*duedate 변수*/
    const [duetime, setDuetime] = useState(time) /*duetime 변수*/
    const [category, setCategory] = useState('.') /*선택한 category 변수*/
    const [comment, setComment] = useState('')/*comment 변수 */
    const [picture, setPicture] = useState('.') /*사진 url*/
    const [loading, setLoading] = useState(false);
    
    const getData1 = (data1) => { /*dudate, time 값 자식에게서 가져오기 */
        setDuedate(data1);
    }

    const getData2 = (data2) => {
        setDuetime(data2);
    }

    const getData3 = (data3) => {
        setCategories(data3);
    }

    const taskChangetext = text =>{ /*task에 text가 변할때마다 task에 그 값을 넣어줌 */
        setTask(text);
    }

    const commentChangetext = text => { /*comment에 text가 변할때마다 task에 그 값을 넣어줌 */
        setComment(text);
    }

    const [categories, setCategories] = useState({})
    const [tasks, setTasks] = useState({}) /*최종으로 넘길 값*/
    
    useEffect(() => {
        const firstLoad = async () => {
          try {
            const loadedTasks = await AsyncStorage.getItem('tasks');
            setTasks(JSON.parse(loadedTasks || '{}'));
            const loadedCategories = await AsyncStorage.getItem('categories')
            setCategories(JSON.parse(loadedCategories || '{}'));
          } catch (err) {
            console.log(err);
          }
        };
        firstLoad();
        return () => setLoading(false);
      }, []);
    

    const _saveTasks = async tasks => {
        try{
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
            setTasks(tasks);
        }catch(e) {
            console.error(e);
        }
    };
    
    const _saveCategories = async categories => {
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(categories));
            setCategories(categories)
        } catch(e) {
            console.error(e);
        }
    }

    function PressSubmit() {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, task: task, duedate: duedate, duetime: duetime, category: category, comment: comment, picture: picture, completed: false },
        };
        _saveTasks({...tasks, ...newTaskObject});
        setLoading(true);
        navigation.navigate('TodoListScreen');
    }


    return (
        <SafeAreaView style = {viewStyles.container}>
            <StatusBar/>
            {/*여기 부터 center(task, duedate&time, addcomment...) 부분*/}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style = {[viewStyles.itemsetting]}>
                    <AddTask value = {task} onChangeText = {taskChangetext}/>
                    
                    <Duedate_time data1={duedate} data2={duetime} getData1={getData1} getData2={getData2}/>

                    <Category data = {category} getData = {setCategory}/>
            
                    <AddComment value = {comment} onChangeText = {commentChangetext}/> 
                    <GalleryPicker picture = {picture} setPicture = {setPicture}/>
                    <Map gotoMap = {()=>{navigation.navigate('MapScreen')}}/>

                    </View>
            </TouchableWithoutFeedback>
                
            {/*여기 부터 footer 버튼(reset,submit 버튼) 부분*/}
            <View style = {viewStyles.footer}>
                <ResetButton onPressout = {() => {navigation.push('AddTodoItemScreen')}}/>
                <ExportButton onPressout = {PressSubmit}/>
            </View>

        </SafeAreaView>

    );
}

/*reset, export 아래 버튼 reset은 삭제 가능성 잇음*/
const ResetButton = ({onPressout}) => {
    /*const _reset = () => 값 reset*/
    
    return(
        <Pressable 
            style = {[footer.pressable, { backgroundColor: '#C4C4C4'}]}
            onPressOut = {onPressout}>
            <Text style = {footer.text}> reset </Text>
        </Pressable>
    );
};

const ExportButton = ({onPressout}) => {
    /*const _import = () => 메인화면으로 이동, 값 전달*/ 
    
        return(
            <Pressable 
                style = {[{ backgroundColor: '#00462A' }, footer.pressable]}
                onPressOut = {onPressout}>
                <Text style = {footer.text}> submit </Text>
            </Pressable>
        );
}

/*중간 부분 */
  
const viewStyles = StyleSheet.create({ /*가장 큰 메인이 되는 컨테이너*/
    container: { /*전체용 이 안에 itemsetting이랑 footer가 구성*/
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start', 
    },
    itemsetting: { /*항목생성 설정 (input~map까지)칸*/
        height: '90%',
        alignItems: 'center',
    },
    footer: { /*맨 아래 버튼 2개*/
        height: '10%',
        flexDirection: 'row',
        backgroundColor: '#C4C4C4',
    }
});

const footer = StyleSheet.create({ /*항목생성 화면 아래의 버튼 두개용 text랑 align 신경씀 */
    text: {
        color: 'white',
        fontSize: 25,
    },
    pressable: {
        height: '100%', 
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
   

export default Addtodo;
