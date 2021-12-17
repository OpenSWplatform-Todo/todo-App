import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import { viewStyles, imageStyles, textStyles, buttonStyles } from '../styles/RandomScreenStyles';
import random_dice from '../../assets/random_dice.png';

export default class RoundButton extends Component{
    render() {
        return (
            <View style={viewStyles.container}>
                <Image style={imageStyles.image} source={random_dice} />
                <Text style={textStyles.title}> CLICK THE BUTTON </Text>
                <Text style={textStyles.title}> BELOW! </Text>
                <TouchableOpacity style={buttonStyles.button} onPress={() => this.goRandomDScreen()}>
                    <Text style={buttonStyles.title}>RANDOM GOAL</Text>
                </TouchableOpacity>
            </View>
         );
    };
    goRandomDScreen(){ 
        this.props.navigation.navigate('RandomScreen_result'); 
    };       
};