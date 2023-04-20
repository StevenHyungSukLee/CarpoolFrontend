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
        backgroundColor: 'white',
        width: '100%',

        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: "4%",

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },
    text: {
        fontSize: 20,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.6)'
    }
})

export default BasicButton