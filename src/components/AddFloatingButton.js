import React from "react";
import { View, Animated, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { viewStyles, buttonStyles } from '../styles/FloatingButtonStyles';
import { theme } from '../theme';

export default class AddFloatingButton extends React.Component {
  render() {
    return (
      <View style={viewStyles.container_right}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Animated.View style={buttonStyles.button_green}>
            <AntDesign name="plus" size={28} color={theme.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );  
  };
}