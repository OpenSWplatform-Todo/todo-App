/*메인 스크린에 띄울 task list */
import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Pressable, Alert, Modal, TouchableWithoutFeedback, TouchableOpacity, Image } from "react-native";
import { IconButton } from "./IconButton";
import { ModalButton } from "./ModalBtn";
import { images } from "../images";
import { ThemeColors } from "react-navigation";

export const Task = ({Edit, item, index, drag, selected, onPress,  onLongPress, deleteTask, toggleTask, getId}) =>{

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    return (
        <View style={styles.centeredView}>
            {/* POPUP */}
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
            {/* EDIT, DELETE, SHARE */}
            <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible2}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible2(!modalVisible2);
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setModalVisible2(!modalVisible2)
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* Edit, Delete, Share */}
                  <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={Edit}
                  >
                    <Text style={styles.btntextStyle}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={deleteTask}
                  >
                    <Text style={styles.btntextStyle}>Delete</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonFunction]}
                    onPress={() => setModalVisible2(!modalVisible2)}
                  >
                    <Text style={styles.btntextStyle}>Share</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
            <TouchableOpacity
                style={[styles.icon, styles.buttonOpen]}
                id = {item.id} index = {item.index} onLongPress={onLongPress} onPress={onPress} onPress={() => {setModalVisible(true)}}
            >
<<<<<<< HEAD
              <View style = {itemStyle.container}>
=======
                <View style = {itemStyle.container}>
                    <Pressable onLongPress={drag} style={[styles.icon, styles.buttonOpen, {paddingLeft:10,}]}>
                      <Image source={images.order} style={{ height:20, width:20}} />
                    </Pressable>
>>>>>>> main
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
                    {/* <ModalButton type = {images.menu}/> */}
                    <Pressable
                      style={[styles.icon, styles.buttonOpen]}
                      onPress={() => {
                        setModalVisible2(true)
                        getId(item.id)
                      }}
                    >
                      <Image source={images.menu} style={IconStyle.icon}/>
                    </Pressable>
              </View>
                {selected && <View style={styles.overlay} />}
            </TouchableOpacity>
        </View>
    );
};

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
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 70, 42, 0.2)',
    },
  });
