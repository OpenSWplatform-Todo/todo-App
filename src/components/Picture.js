import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { textStyles, viewStyles } from '../styles/TodoListScreenStyles';
import { images } from "../images";

export const GalleryPicker = (props) => {
  const image = props.picture;
  const setImage = props.setPicture;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <><View style={viewStyles.container}>
      <Text style={[textStyles.heading, { flexDirection: "row" }]}>Picture</Text>
    </View>
    <View style={[viewStyles.container, viewStyles.subcontainer]}>
        <Pressable
          style={[viewStyles.button, {flexDirection: "row", marginLeft: 0, height: 30, width: '100%' }]}
          onPress={pickImage}
        >
        <Image source={images.gallery} style={{height: 18, width: 18}}/>
        <Text style = {textStyles.heading}>  Gallery</Text>
        </Pressable>
      </View></>
  );
}

export const Map = ({gotoMap}) => {
  return(
    <>
      <View style={viewStyles.container}>
        <Text style={[textStyles.heading, { flexDirection: "row" }]}>Location</Text>
      </View>
      <View style={[viewStyles.container, viewStyles.subcontainer]}>
        <Pressable
          style={[viewStyles.button, {flexDirection: "row", marginLeft: 0, height: 30, width: '100%' }]}
          onPress={gotoMap}
        >
          <Image source={images.mark} style={{height: 18, width: 18}}/>
          <Text style = {textStyles.heading}>  Map</Text>
        </Pressable>
      </View>
    </>
    )
}

/* 이거 그냥... 말그대로 카메라만 켜짐...ㅋ.ㅋ..ㅋ....
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});*/
