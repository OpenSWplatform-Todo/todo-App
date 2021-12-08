import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";
import { Contents } from "./Layout";
import IconButton from './IconButton';
import {images} from '../images';
import Iconimg from "./Iconimg";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={{
          // flex:1,
          backgroundColor: 'transparent',
        }} onPress={()=>setModalVisible(false)}/>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Modal</Text> */}
            {/* Edit, Delete, Share */}
            <Pressable
              style={[styles.button, styles.buttonFunction]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btntextStyle}>Edit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonFunction]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btntextStyle}>Delete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonFunction]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btntextStyle}>Share</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.btntextStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.icon, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Iconimg type={images.more}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    // position:"absolute",
    // top: 100,
    // right: 0,
  },
  modalView: {
    margin: 0,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
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
    textAlign: "center"
  }
});

export default App;