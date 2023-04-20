// helper component to display password input view, and store the actual password using the useState hook

import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"

const PasswordInput = ({value, setValue}) => {

    return (
            <View style={styles.passwordContainer}>
                <Ionicons 
                    name= 'lock-closed-outline'
                    size= {35}
                    color= 'white'
                />
                <TextInput
                    style= {styles.passwordTextInput}
                    color="white"
                    placeholder= "Password"
                    placeholderTextColor="rgba(255,255,255,0.8)"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value= {value}
                    onChangeText= {setValue}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(149,146,146,0.4)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 20,
        width: '85%',
    },

    passwordTextInput: {
        fontSize: 24,
        paddingLeft: 10,
        width: '80%'
    },

})

export default PasswordInput;