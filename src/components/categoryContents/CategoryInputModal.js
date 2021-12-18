import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { theme } from '../../theme';

const CategoryInputModal = ({visible, onClose, onSubmit}) => {
    const [categoryItem, setCategoryItem] = useState('');
    
    const handleOnChangeText = (text) => {
        setCategoryItem(text);
    };

    const handleSubmit = () => {
        if (!categoryItem.trim()) {
            return onClose();
        }
        onSubmit(categoryItem);
        setCategoryItem('');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <Pressable 
                style={modalStyles.centeredView}
                onPress={()=>[onClose(), setCategoryItem('')]}
            >
                <View style={modalStyles.popupBox}>
                    <View style={modalStyles.popupTitle}>
                        <Text style={modalStyles.textTitle}>ITEM</Text>
                    </View>
                    <TextInput 
                        style={modalStyles.popupInput} 
                        placeholder="Category Name"
                        maxLength={20}
                        autoCapitalize="none"
                        value = {categoryItem}
                        onChangeText = {(text) => handleOnChangeText(text)}
                    />
                    <TouchableOpacity 
                        style={modalStyles.popupButton} 
                        onPress={()=>{handleSubmit()}}
                    >
                        <AntDesign name='check' size={20} color={theme.white}/>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
}

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFFAA",
    },
    popupBox: {
        width: 250,
        height: 170,
        backgroundColor: theme.lightGray,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: theme.black,
          shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    popupTitle: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.ewhagreen,
    },
    popupInput: {
        paddingBottom: 3,
        width: 200,
        margin: 8,
        bottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.deepGray,
        fontSize: 15,
    },
    popupButton: {
        position: 'absolute',
        backgroundColor: theme.midGray,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
        padding: 8,
        borderRadius: 20, 
    },
    textTitle: {
        color: theme.lightGray,
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default CategoryInputModal