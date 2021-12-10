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
import Main from './screen/Main' 


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
    <ThemeProvider theme={theme}>
        <Header/>
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor={theme.background}
            />
            <List width={width}>
                <PopupTask text="Open SW Platform" date="2021/11/14   23:59"/>
                <PopupTask text="Open SW Platform" date="2021/11/14   23:59"/>
                {/* <Task text="Visit Library" date="2021/11/13   17:00"/> */}
            </List>
            <Button />
        </Container>
    </ThemeProvider>
    );
};