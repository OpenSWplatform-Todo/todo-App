import React, {useState} from "react";
import { StyleSheet, View, Text, Animated, Pressable, Modal, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { viewStyles, buttonStyles } from '../../styles/FloatingButtonStyles';
import { theme } from '../../theme';
import { NavigationEvents } from "react-navigation";

export default function CategoryItemButton ({ item, onPress }) {
    
    const [modalOpen, setModalOpen] = useState(false);
    const {categoryItem} = item;

    return (
        <View>
            <View style={styles.container}>
                <Pressable 
                    style={styles.buttonContainer}
                    onPress={()=>{}}
                >
                    <Text 
                        maxLength={20}
                        numberOfLines={1}
                        style={styles.categoryName}
                    >
                        {categoryItem}
                    </Text>
                    <Pressable 
                        style={styles.menuButton} 
                        onPress={() => {
                            /*setMenuModalVisible(true) 
                            getid(item.id)*/
                        }}
                    >
                        <MaterialCommunityIcons name='menu-down' size={35} color={theme.deepGray}/>
                    </Pressable>
                </Pressable>
            </View>

            <Modal
                // style={}
                visible={false}
                animationType='fade'
                onRequestClose={() => setModalOpen(false)}
                transparent={true}
            >

            </Modal>
        </View>
    );   
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    outerContainer: {
        flex:1,
        backgroundColor: theme.white,
        alignContent:'center', 
        justifyContent: 'center'
    },
    buttonContainer: {
        width: 140,
        height: 110,
        borderRadius: 20,
        borderTopLeftRadius: 0,
        backgroundColor: theme.lightgreen,
        alignItems: "center",
        justifyContent: "center",
    },
    categoryName: {
        position: 'absolute',
        padding: 5,
        top: 20,
        fontSize: 18,
        fontWeight: '600',
        color: theme.ewhagreen,
    },
    menuButton: {
        position: 'absolute',
        bottom: 15,
    }
});

const menuModalStyles = StyleSheet.create({

})