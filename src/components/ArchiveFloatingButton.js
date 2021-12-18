import React from "react";
import { View, Animated, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { viewStyles, buttonStyles } from '../../styles/FloatingButtonStyles';
import { theme } from '../../theme';

export default class AddFloatingButton extends React.Component {
  state={
    backgroundColor: theme.white,
    borderWidth: 3,
    borderColor: theme.midGray,
    iconColor: theme.midGray,
    pressed: false,
  };

  changeColor(){
    if(!this.state.pressed){
      this.setState({ 
        pressed: true, 
        backgroundColor: theme.midGray, 
        borderWidth: 0,
        borderColor: theme.white,
        iconColor: theme.white 
      });
    } else {
      this.setState({ 
        pressed: false, 
        backgroundColor: theme.white, 
        borderWidth: 3,
        borderColor: theme.midGray,
        iconColor: theme.midGray 
      });
    }
  };

  gotoArchiveScreen(){
    this.props.navigation.navigate('Report');
  }
  
  render() {
    return (
      <View style={viewStyles.container_left}>
        <Pressable 
          style={[ 
            buttonStyles.button_white, { 
              backgroundColor: this.state.backgroundColor,  
              borderWidth: this.state.borderWidth,
              borderColor: this.state.borderColor,
            }]
          }
          onPress={() => [this.changeColor(), /*this.gotoArchive()*/]}
        >
          <Animated.View>  
            <AntDesign name="inbox" size={28} color={this.state.iconColor} />
          </Animated.View>
        </Pressable>
      </View>
    );  
  }
}