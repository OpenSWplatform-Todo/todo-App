/*메인 스크린에 띄울 task list */
import React, {useState} from "react";
import { StyleSheet, View, Text, Pressable, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { IconButton } from "./IconButton";
import { images } from "../images";
import { ThemeColors } from "react-navigation";

export const Task = ({item, toggleTask}) =>{

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onBackdropPress={() => this.closeModal()}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Title</Text>
                    <Text style={styles.modalsubText}>Date</Text>
                    <Text style={styles.modalsubText}>Category</Text>
                    <Text style={styles.modalsubText}>Assignment Due</Text>
                    <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.btntextStyle}>Picture</Text>
                    </Pressable>
                    <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.btntextStyle}>Location</Text>
                    </Pressable>
                </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Pressable
                style={[styles.icon, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <View style = {itemStyle.container}>
                    <IconButton style = {[{flex: 1}]} type = {item.completed ? images.completed : images.uncompleted} 
                    id = {item.id} onPressOut={toggleTask}/>
                    <View style = {[itemStyle.contents, {flex: 5}]}>
                        <Text style = {[itemStyle.taskfont,
                            {color: (item.completed) ? '#595959':'#00462A'},
                            {textDecorationLine: (item.completed ? 'line-through':'none')}]}>{item.task}
                        </Text>
                        <View style = {{flexDirection: 'row'}}>
                            <Text style = {itemStyle.datefont}>{item.duedate}</Text>
                            <Text style = {itemStyle.datefont}>  {item.duetime}</Text>
                        </View>
                    </View>
                    <IconButton type = {images.menu} />
                </View>
            </Pressable>
        </View>
    );
};

const itemStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6E6E6',
        width: '100%',
        marginTop: 10,
    },
    contents: {
        flexDirection: 'column',
        alignItems: 'flex-start', 
    },
    taskfont: {
        fontSize: 25,
        color: '#00462A',
    },
    datefont: {
        fontSize: 16,
        color: '#595959',
    },
});


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // position:"absolute",
      // top: 100,
      // right: 0,
      marginBottom: 10,
    //   borderWidth: 1,
    //   borderColor: 'red',
    },
    modalView: {
      margin: 0,
      backgroundColor: "#E6E6E6",
      borderRadius: 10,
      padding: 20,
      width: 350,
      alignItems: "flex-start",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    icon: {
        padding: 0,
    },
    button: {
      borderRadius: 20,
      padding: 10,
    },
    buttonOpen: {
      backgroundColor: "#E6E6E6",
    },
    buttonClose: {
      position: "absolute",
      bottom: 10,
      right: 10,
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: "#999999",
    },
    buttonFunction: {
        borderRadius: 0,
        backgroundColor: "#E6E6E6",
    },
    textStyle: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center"
    },
    btntextStyle: {
      color: "black",
      fontSize: 18,
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      fontSize: 25,
      textAlign: "center",
    },
    modalsubText: {
      marginBottom: 15,
      fontSize: 18,
      textAlign: "center",
    }
  });