import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

// A basicbutton page for SetDepartingScreen
const BasicButton = ({ onPress, text }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',

        paddingHorizontal: 10,
        paddingVertical: 60,
        marginTop: "3%",

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },
    text: {
        fontSize: 24,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.6)'
    }
})

export default BasicButton
