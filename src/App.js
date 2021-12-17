import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from './components/DrawerContent';
import { theme } from './theme';

import TodoListScreen from './screens/TodoList';
import CategoryScreen from './screens/Category';
import ReportScreen from './screens/Report';
import RandomScreen from './screens/Random';
import RandomScreen_result from './screens/Random_result';

import AddTodoItemScreen from './screens/AddTodoItem';
import MapScreen from './screens/Map'
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
        <TodoListStack.Screen name="TodoListScreen" component={TodoListScreen} /> 
        <TodoListStack.Screen name="AddTodoItemScreen" component={AddTodoItemScreen}/> 
        <TodoListStack.Screen name="MapScreen" component={MapScreen} /> 
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
                <Drawer.Screen name="To-do List" component={TodoListStackScreen} />
                <Drawer.Screen name="Category" component={CategoryScreen} />
                <Drawer.Screen name="Report" component={ReportScreen} />
                <Drawer.Screen name="Random" component={RandomStackScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;