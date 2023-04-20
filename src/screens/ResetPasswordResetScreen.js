import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import BasicInputs from "../components/Signup/BasicInputs";
import BasicButton from "../components/ResetPassword/BasicButton";
import Popup from "../components/Signup/Popup/Popup1";
import Ionicons from "react-native-vector-icons/Ionicons"
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from 'react-navigation';

const ResetPasswordResetScreen = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [confirm_new_password, set_new_password] = useState('');
    const [localEM, setLocalEM] = useState('')

    const {state, resetPassword, clearErrorMessage} = useContext(AuthContext);

    const checkPassword = () => {
        
        if (password !== confirm_new_password || password.length === 0) {
            setLocalEM('Passwords do not match!')
        } else {
            setLocalEM('')
            state.errorMessage = ''
            const email = state.email
            resetPassword({email, password})
        } 
    }

    const onPressX = () => {
        navigation.navigate('Signin')
    }

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <NavigationEvents onWillFocus={clearErrorMessage} />

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.Title}>
                        Reset Password
                    </Text>
                </View>

                <View style={styles.mainContainer}>              
                    <BasicInputs
                        title='New Password'
                        placeholder='New Password'
                        value={password}
                        setValue={setPassword}
                        fontSize={12}
                    />
                    <BasicInputs
                        title='Confirm New Password'
                        placeholder='Confirm New Password'
                        value={confirm_new_password}
                        setValue={set_new_password}
                        fontSize={12}
                />
                </View>

                <View style={styles.mainContainer}>
                    <BasicButton
                        text='Update Password'
                        onPress={checkPassword}
                     />
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}
                    {localEM ? <Text style={styles.errorMessage}>{localEM}</Text>: null}
                </View>

            </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
    },
    titleContainer: {
        alignItems: 'center',
        paddingTop: '30%'
    }, 
    Title: {
        fontSize: 38,
        textAlign: 'center',
        fontWeight: '900',
        color: 'black'
    },
    mainContainer: {
        alignItems: 'center',
        paddingTop: "20%",
        //marginLeft: '1%'
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
    },

});

export default ResetPasswordResetScreen;