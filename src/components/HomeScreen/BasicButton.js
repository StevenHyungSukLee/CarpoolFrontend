import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

const BasicButton = ({ onPress, text }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(152,190,196, 1)',
        width: '50%',

        paddingHorizontal: 10,
        paddingVertical: 5,
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