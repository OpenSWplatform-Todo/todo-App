import React from 'react';
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
        </NavigationContainer>
    );
};