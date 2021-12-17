import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { viewStyles, textStyles, buttonStyles } from '../styles/RandomScreenStyles';
import q from '../data/Random_quotes.json';
import T from '../data/Random_todo.json';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default class RoundButton extends Component{
    constructor(props) {
        super(props)
        this.state = {
           quote: '',
           author: '',
           todo: ''
        }
     }
  
     componentDidMount() {
        this.getQuote()
        this.getTodo()
     }
  
     getQuote() { 
              let data = q.quotes
              let quoteNum = Math.floor(Math.random() * data.length)
              let randomQuote = data[quoteNum]
  
              this.setState({
                 quote: randomQuote['quote'],
                 author: randomQuote['author']
              })
     }
     getTodo() { 
        let data = T.Todos
        let TodoNum = Math.floor(Math.random() * data.length)
        let randomTodo = data[TodoNum]

        this.setState({
            todo: randomTodo['Todo'],
        })
}
  
    getNew = () => {
        this.getQuote()
        this.getTodo()
    }

    render() {
        const { quote, author, todo } = this.state
        return (
            <View style={viewStyles.container2}>
                <View style={{ flex:1, top: 15, height: 30, alignItems: 'center' }}>
                    <Text style={textStyles.title2}> RECOMMANDATION </Text>
                    <View style={viewStyles.item1}>
                        <MaterialCommunityIcons name="checkbox-blank-outline" size={30} color="#000000" /> 
                        <View style={{ paddingLeft: 15 }}>
                            <Text style={textStyles.todo}>{todo}</Text>
                            <Text style={textStyles.duedate}>Set your own due date!</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex:1, height: 30, alignItems: 'center' }}>
                    <Text style={textStyles.title3}> MOTIVATING QUOTE </Text>
                    <View style={viewStyles.item2} >
                        <Text style={textStyles.quote}>"{quote}"</Text>
                        <Text style={textStyles.author}>- {author}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', top: 30}}>
                    <TouchableOpacity style={buttonStyles.button} onPress={() => {/*생성 화면 연결함수*/}}>
                        <Text style={buttonStyles.title}>ADD TO MY TO-DO LIST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonStyles.button2} onPress={this.getNew}>
                        <Text style={buttonStyles.title}>RETRY</Text>
                    </TouchableOpacity>
                </View>
            </View>
         );
    };
};