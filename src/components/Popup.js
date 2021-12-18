import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
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
        onBackdropPress={() => this.closeModal()}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={{
        //   flex: 1,
          backgroundColor: 'transparent',
        }} onPress={()=>setModalVisible(false)}/>

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
        <Iconimg type={images.update}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // position:"absolute",
    // top: 100,
    // right: 0,
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

export default App;