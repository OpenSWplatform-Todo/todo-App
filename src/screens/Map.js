import React, { Component, useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Text} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";

export default function Map({navigation, route}) {
    const {latitude, longitude, screen} = route.params;
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

    const _isButton = () => {
      if(screen !== 'onlyView'){
        return(
        <View style = {styles.footer}>
          <ConfirmButton text = 'confirm' onPressout={()=>{navigation.navigate({
            name: screen,
            params: {latitude: location.latitude, longitude: location.longitude},
            merge: true,
          })}}/>
        </View>)
        }
      else if (screen === 'onlyView'){
        return(
          <View style = {styles.footer}>
            <ConfirmButton text = 'goBack' onPressout={()=>{navigation.goBack()}}/>
          </View>)
      }
    }
    
    if (screen !== 'onlyView'){
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
            />
            <Text>{location.latitude}, {location.longitude}</Text>
          </MapView>

          <_isButton/>
        </>
      );
    }
    else if(screen === 'onlyView'){
      return (
        <>
          <MapView
            initialRegion={initialRegion}
            style={[styles.map]}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
          >
            <MapView.Marker 
              coordinate={{ latitude: location.latitude, longitude: location.longitude,}}
            />
            <Text>{location.latitude}, {location.longitude}</Text>
          </MapView>

          <_isButton/>
        </>
      );
    }
  }

  const ConfirmButton = ({onPressout, text}) => {
    return(
        <Pressable 
            style = {[{ backgroundColor: '#00462A' }, footer.pressable]}
            onPressOut = {onPressout}>
            <Text style = {footer.text}> {text} </Text>
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