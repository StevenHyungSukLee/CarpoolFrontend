// helper component to display Email input view, and store the actual email using the useState hook

import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

const EmailInput = ({value, setValue}) => {

    return (
            <View style={styles.emailContainer}>
                <Ionicons 
                    name= 'mail-outline'
                    size= {35}
                    color= 'white'
                />
                <TextInput
                    style= {styles.emailTextInput}
                    color="white"
                    placeholder= "Emory Email"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    onChangeText={setValue}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(149,146,146,0.4)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
        width: '85%',
    },

    emailTextInput: {
        fontSize: 24,
        paddingLeft: 10,
        width: "80%"
    },
})

export default EmailInput;