// helper component to display Email input view, and store the actual email using the useState hook

import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const BasicInputs = ({value, setValue, placeholder, secureTextEntry, keyboardType}) => {

    return (
            <View style={styles.container}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    placeholderTextColor="rgba(0,0,0,0.6)"
                    fontWeight="700"
                    style={styles.input}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={keyboardType}
                    textContentType={'oneTimeCode'} //this disables strong password suggestion from ios
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: "90%",

        borderRadius: 20,
        
        paddingVertical: 20,
        paddingHorizontal: 15,
        marginVertical: 8,

        flexDirection: 'row',
        alignItems: 'center'
    },

    input: {
        fontSize: 24,
        fontWeight: '700',
        color:"rgba(0,0,0,0.6)",
        width: "100%",
    },
})

export default BasicInputs;