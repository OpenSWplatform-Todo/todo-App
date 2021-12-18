import React, { Component, useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";

export default function Map({navigation, route}) {
    const {latitude, longitude} = route.params;
    const [initialRegion, setInitialRegion] = useState({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.03, 
      longitudeDelta: 0.015,
    })

    const [mapWidth, setMapWidth] = useState('99%');

    const[location, setLocation] = useState({
      latitude: latitude,
      longitude: longitude,
    });

    return (
      <>
        <MapView
           initialRegion={initialRegion}
           style={[styles.map]}
           provider={PROVIDER_GOOGLE}
           showsUserLocation={true}
           showsMyLocationButton={true}
           onRegionChange={region=>{
             setLocation({
               latitude: region.latitude,
               longitude: region.longitude,
             });
           }}
           onRegionChageComplete = {region => {
             setLocation({
               latitude: region.latitude,
               longitude: region.longitude,
             })
           }}
        >
          <MapView.Marker 
            coordinate={{ latitude: location.latitude, longitude: location.longitude,}}
            //onPress={onPressEvent}
            />
          <Text>{location.latitude}, {location.longitude}</Text>
        </MapView>
        <View style = {styles.footer}>
          <ConfirmButton onPressout={()=>{navigation.navigate({
            name: 'AddTodoItemScreen',
            params: {latitude: location.latitude, longitude: location.longitude},
            merge: true,
          })}}/>
        </View>
      </>
    );
  }


const ConfirmButton = ({onPressout}) => {
  return(
      <Pressable 
          style = {[{ backgroundColor: '#00462A' }, footer.pressable]}
          onPressOut = {onPressout}>
          <Text style = {footer.text}> confirm </Text>
      </Pressable>
  );
}

  const styles = StyleSheet.create({
    map: {
      flex: 1,
      width: '100%',
      height: '92%',
    },
    footer: { /*맨 아래 버튼 2개*/
      height: '8%',
      backgroundColor: '#C4C4C4',
    },
  });
  const footer = StyleSheet.create({ /*항목생성 화면 아래의 버튼 두개용 text랑 align 신경씀 */
    text: {
        color: 'white',
        fontSize: 25,
    },
    pressable: {
        height: '100%', 
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});