import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const PopUpInput = ({value, setValue, placeholder, secureTextEntry, keyboardType}) => {

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
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        width: "90%",

        borderRadius: 20,
        
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 8,
        borderWidth: 2,
        borderColor: 'black',

        flexDirection: 'row',
        alignItems: 'center'
    },

    input: {
        fontSize: 16,
        fontWeight: '700',
        color:"rgba(0,0,0,0.6)",
        width: "80%"
    },
})

export default PopUpInput;