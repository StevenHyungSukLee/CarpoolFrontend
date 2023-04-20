import React from "react";
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";

const PopUpButton = ({ onPress, text}) => {
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '40%',

        paddingHorizontal: 10,
        paddingVertical: 13,
        marginTop: '10%',
        marginLeft: '45%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.6)',
        

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: 'rgba(0,0,0,1)'
    }
})

export default PopUpButton