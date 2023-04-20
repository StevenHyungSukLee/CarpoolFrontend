// this is the main SigninScreen file that takes all compoments together

import React, { useContext, useState,} from "react";
import {View, StyleSheet, ImageBackground, KeyboardAvoidingView, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements"
import { NavigationEvents } from 'react-navigation';
import PasswordInput from "../components/Signin/PasswordInput";
import EmailInput from "../components/Signin/EmailInput";
import { Context as AuthContext } from "../context/AuthContext"

const SigninScreen = ({navigation}) => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <ImageBackground style= {{width: '100%', height: '100%',}} source={require('../../assets/atlantaBackground.png')}>
            <KeyboardAvoidingView 
                style={{flex: 1, maxHeight: '100%'}}
                behavior='height'
            >
            <ScrollView style={{ flexGrow: 1, height: '100%', borderRadius: 10, }} showsVerticalScrollIndicator={false}>
                <NavigationEvents onWillFocus={clearErrorMessage} />
                <View style={styles.mainContainer}>
                    <Image style={{height: 225, width: 300, marginBottom: '40%', marginTop: '30%'}} source={require('../../assets/logo.png')}/>
                    <EmailInput value={email} setValue={setEmail}/>
                    <PasswordInput value={password} setValue={setPassword}/>
                    
                    <Button
                        buttonStyle={{
                            backgroundColor: '#98BEC4'
                        }}
                        
                        title= "Login"
                        titleStyle={{
                            marginVertical: 8,
                            fontSize: 24,
                            fontWeight: '700',
                            
                        }}
                        containerStyle={{
                            width: '85%',
                            borderRadius: 20,
                            marginBottom: 0, 
                        }}
                        
                        // logic for verifying credentials
                        onPress={() => signin({email, password})}
                    />

                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}
                </View>
                
                <View style= {styles.subContainer}>
                    <Button
                        type='clear' 
                        title= "Create Account"
                        titleStyle={{
                            fontSize: 16,
                            fontWeight: "700",
                            color: 'white'
                        }}
                        containerStyle={{
                        }}
                        onPress={() => navigation.navigate('Signup')}
                    />

                    <Button
                        type='clear'
                        title= "Forgot Password?"
                        titleStyle={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: 'white'
                        }}
                        containerStyle={{
                        }}
                        onPress={() => navigation.navigate('ResetPasswordVerify')}
                    />
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
    },

    subContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        marginBottom: '100%'

    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.9)',
        marginTop: 5,
    }
});

export default SigninScreen;