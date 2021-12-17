import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export function DrawerContent(props) {
    return (
        <View style = {{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri:"https://images.unsplash.com/photo-1501909991051-7c054658fde0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                }} /*임시 이미지*/
                                size={70}
                            />
                            <View style={{flexDirection: 'column', marginLeft:15}}>
                                <Title style={styles.title}>EWHA</Title>
                                <Caption style={styles.caption}>@openswplatform</Caption>
                            </View>
                        </View>
                    </View> 
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                    name="text-box-check-outline" 
                                    size={28}
                                    color={color}
                                />
                            )}
                            label="To-do list"
                            onPress={() => {props.navigation.navigate("To-do List")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialIcons 
                                    name="category" 
                                    size={28}
                                    color={color} 
                                />
                            )}
                            label="Category"
                            onPress={() => {props.navigation.navigate("Category")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                    name="poll-box-outline" 
                                    size={28}
                                    color={color} 
                                />
                            )}
                            label="Report"
                            onPress={() => {props.navigation.navigate("Report")}}
                        />
                        <DrawerItem
                            icon={({color, size}) => (
                                <MaterialCommunityIcons 
                                    name="dice-3-outline" 
                                    size={28}  
                                    color={color} 
                                />
                            )}
                            label="Random"
                            onPress={() => {props.navigation.navigate("Random")}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      padding: 20,
      paddingTop: 0,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1,
    },
    title: {
      fontSize: 18,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    drawerSection: {
      paddingLeft: 5,
    },
});