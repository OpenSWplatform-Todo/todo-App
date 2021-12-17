/*Task 나열에 사용*/

import React from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import { images } from '../images';

const IconStyle = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    direction: {
        width: 10,
        height: 10,
    }
});
export const IconButton = ({type, onPressOut, id}) => {
    const _onPressOut = () => {
        onPressOut(id);
    }

    return(
        <Pressable onPressOut={_onPressOut}>
            <Image source={type} style={IconStyle.icon}/>
        </Pressable>
)}

export const IconButton_direct = ({type}) => {
    return(
        <Pressable>
            <Image source={type} style={IconStyle.direction}/>
        </Pressable>
)}

IconButton.defaultProps = {
    onPressOut: () => {},
};