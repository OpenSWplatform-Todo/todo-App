/*메인화면*/
import React from 'react';
import {View, Text, Button} from 'react-native';
import { images } from '../images';
import { IconButton } from '../components/IconButton';
import { Task } from '../components/Task';

class Main extends React.Component {
  render() {
    return (
      <View>
        <Button
        title="+"
        onPress={()=>this.props.navigation.navigate('Addtodo')}
        />
        <Task task='example1' duedate = '2021.12.05' /> 
        
      </View>
    );
  }
    
}


  
  export default Main;