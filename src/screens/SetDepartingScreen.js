import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import BasicButton from "../components/BasicButton";

const SetDepartingScreen = ({ navigation }) => {

    const [checkValue_S, setCheckValue_S] = useState(false);
    const [checkValue_H, setCheckValue_H] = useState(false);

    const navigateS = () => {
        navigation.navigate('FindDriverS')
    }

    const navigateH = () => {
        navigation.navigate('FindDriverH')
    }

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <View style={styles.container}>
                <Text style={{fontSize: 48, fontWeight: '800', marginBottom: '5%'}}>Find Driver</Text>
                <View style={styles.textbox}>
                    <Text style={styles.title}>
                        Select your departing location:
                    </Text>
                </View>

                    <BasicButton
                        text='I am departing from Emory'
                        onPress={navigateS}
                    />

                    <BasicButton
                        text='I am departing from home'
                        onPress={navigateH}
                    />

                
                </View>
        </KeyboardAvoidingView>
    ) 
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(152,190,196, 1)'
    },
    container: {
        flex: 1,
        paddingTop: '20%',
        alignItems: 'center',
        height: '100%',
        width: '90%',
    },
    checkbox: {
        margin: 30
    },
    title: {
        alignItems: 'center',
        fontSize: 24,
        fontWeight: '700',
    },
    textbox: {
        alignItems: 'center',
        paddingTop: '15%',
        paddingBottom: '5%',
    }
})

export default SetDepartingScreen;
