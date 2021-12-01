import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const Header = () => {
    return (
        <View style={[styles.container, styles.header]}>
            <Text style={styles.text}>To-do List</Text>
        </View>
    );
};

export const Contents = () => {
    return (
        <View style={[styles.container, styles.contents]}>
            <Text style={styles.text}>Contents</Text>
        </View>
    );
};

export const Footer = () => {
    return (
        <View style={[styles.container, styles.footer]}>
            <Text style={styles.text}>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
    },
    header: {
        backgroundColor: '#999999',
    },
    contents: {
        flex: 1,
        height: 640,
        backgroundColor: '#FFFFFF',
    },
    footer: {
        backgroundColor: '#FFFFFF',
    },
    text: {
        fontSize: 40,
        color: '#00462A',
    },
});