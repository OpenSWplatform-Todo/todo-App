import React, { Component, useState, useEffect } from "react";
import { StyleSheet} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps";

export default function Map({navigation, route}) {

    const [initialRegion, setInitialRegion] = useState({
        latitude:  37.56646571416213,
        longitude: 126.94838534971927,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
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
        >
          <MapView.Marker coordinate={{ latitude: 37.56646571416213, longitude: 126.94838534971927, }} />
        </MapView>

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