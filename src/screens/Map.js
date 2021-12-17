import React, { Component, useState, useEffect } from "react";
import { StyleSheet} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";

export default function Map({navigation, route}) {

    const [initialRegion, setInitialRegion] = useState({
        latitude: 35.91395373474155,
        longitude: 127.73829440215488,
        latitudeDelta: 5,
        longitudeDelta: 5,
      })
    const [mapWidth, setMapWidth] = useState('99%');


    return (
      <>
        <MapView
           initialRegion={initialRegion}
           style={[styles.map]}
           provider={PROVIDER_GOOGLE}
           showsUserLocation={true}
           showsMyLocationButton={true}
        />
      </>
    );
  }
  const styles = StyleSheet.create({
    map: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });