/*Task 나열에 사용*/
// Modal 추가

import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
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

export const ModalButton = ({type, onPressOut, id}) => {
    const _onPressOut = () => {
        onPressOut(id);
    }

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
            <TouchableWithoutFeedback
              onPress={() => setModalVisible(!modalVisible)}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
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
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Pressable
            style={[styles.icon, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Image source={type} style={IconStyle.icon}/>
          </Pressable>
        </View>
    );

}

export const ModalButton_direct = ({type}) => {
    return(
        <Pressable>
            <Image source={type} style={IconStyle.direction}/>
        </Pressable>
)}

ModalButton.defaultProps = {
    onPressOut: () => {},
};


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-end",
      // position:"absolute",
      // top: 100,
      // right: 0,
    },
    modalView: {
      position: "absolute",
      top: 100,
      backgroundColor: '#E6E6E6',
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: '#000',
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
      backgroundColor: '#E6E6E6',
    },
    buttonClose: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: '#999999',
    },
    buttonFunction: {
        borderRadius: 0,
        backgroundColor: '#E6E6E6',
    },
    textStyle: {
      color: '#000',
      fontWeight: "bold",
      textAlign: "center"
    },
    btntextStyle: {
      color: '#000',
      fontSize: 18,
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});