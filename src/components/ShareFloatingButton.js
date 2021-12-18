import React from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {  viewStyles, buttonStyles } from '../styles/FloatingButtonStyles';
import { theme } from '../theme';

export default class ShareFloatingButton extends React.Component {
  render() {
    return (
      <View style={viewStyles.container_right}>
        <TouchableOpacity onPress={() => {}}>
          <Animated.View style={buttonStyles.button_white}>
            <AntDesign name="delete" size={28} color={theme.midGray} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );  
  }
}