import React from 'react';
<<<<<<< Updated upstream
import {View, Text, StatusBar, useWindowDimensions, TouchableOpacity} from 'react-native';
import {viewStyles, textStyles} from './styles';
import {Header, Contents, Footer} from './components/Layout';
import ShadowBox from './components/ShadowBox';
import styled, {ThemeProvider} from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import {theme} from './theme';
import Button from './components/Button';
import Input from './components/Input';
import Task from './components/Task';
import PopupTask from './components/PopupTask';

import Addtodo from './screen/Addtodo';
import Main from './screen/Main' 

const Stack = createNativeStackNavigator();

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #ffffff;
    align-items: center;
    justify-content: center;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({theme}) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: 100%;
`;

export default function App() {
    const width = useWindowDimensions().width;
    return (
        <NavigationContainer> 
            <Stack.Navigator initialRouteName="Main"> 
                <Stack.Screen name="Main" component={Main} /> 
                <Stack.Screen name="Addtodo" component={Addtodo} 
                    options={{ 
                        title: 'Create to-do item', 
                        headerStyle: {
                            backgroundColor: '#00462A',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                            fontWeight: 'bold',
                            },

                    }}/> 
            </Stack.Navigator> 
=======
import {Text} from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from './components/navigationContents/DrawerContent';
import { theme } from './theme';

import TodoListScreen from './screens/TodoList';
import CategoryScreen from './screens/Category';
import ReportScreen from './screens/Report';
import RandomScreen from './screens/Random';
import RandomScreen_result from './screens/Random_result';

import AddTodoItemScreen from './screens/AddTodoItem';
import EditTodoItemScreen from './screens/EditTodoItem';

const Drawer = createDrawerNavigator();
const TodoListStack = createStackNavigator();
const RandomStack = createStackNavigator();

const TodoListStackScreen = ({navigation}) => (
    <TodoListStack.Navigator 
        initialRouteName="TodoListScreen"
        screenOptions={{
            headerShown: false
        }}
    > 
        <TodoListStack.Screen name="TodoListScreen" component={TodoListScreen}/>
        <TodoListStack.Screen name="AddTodoItemScreen" component={AddTodoItemScreen}/> 
        <TodoListStack.Screen name="EditTodoItemScreen" component={EditTodoItemScreen}/> 
    </TodoListStack.Navigator> 
);

const RandomStackScreen = ({navigation}) => (
    <RandomStack.Navigator
        initialRouteName="RandomScreen"
        screenOptions={{
            headerShown: false
        }}
    > 
        <RandomStack.Screen name="RandomScreen" component={RandomScreen} />
        <RandomStack.Screen name="AddTodoItemScreen" component={AddTodoItemScreen} />
        <RandomStack.Screen name="RandomScreen_result" component={RandomScreen_result} />
    </RandomStack.Navigator> 
);

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="To-do List"
                drawerContent={props => <DrawerContent {...props}/>}
                screenOptions={{
                    headerStyle: {
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                        margin: 10,
                        color: theme.ewhagreen,

                    }
                }} 
            >
                <Drawer.Screen name="To-do List" component={TodoListStackScreen}/>
                <Drawer.Screen name="Category" component={CategoryScreen} />
                <Drawer.Screen name="Report" component={ReportScreen} />
                <Drawer.Screen name="Random" component={RandomStackScreen} />
            </Drawer.Navigator>
>>>>>>> Stashed changes
        </NavigationContainer>
    );
};