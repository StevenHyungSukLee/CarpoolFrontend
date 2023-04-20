import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import BasicInputs from "../components/Signup/BasicInputs";
import BasicButton from "../components/Signup/BasicButton";
import PopUpInput from "../components/Signup/Popup/PopUpInput";
import PopUpButton from "../components/Signup/Popup/PopUpButton";
import Popup from "../components/Signup/Popup/Popup1";
import { Context as AuthContext } from "../context/AuthContext"
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const ChangePassword1P = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    // this is for the popup screen component
    const [visible, setVisible] = useState(false)
    
    const {state, sendOTP, verifyOTP, clearErrorMessage} = useContext(AuthContext);

    const onVerifyEmailPressed =  async() => {
        await sendOTP({email})
        
        if (state.popupErrorMessage === '') {
            setVisible(true)
        }
    }

    const onConfirmPressed = async () => {
        await verifyOTP({email, emailCode})

        var value = await AsyncStorage.getItem('OTPStatus');

        if (value === '' || value === null) {
            setVisible(false)
            navigation.navigate('ChangePassword2')
        }
    }

    const onXpressed = () => {
        state.popupErrorMessage = ''
        setVisible(false)
    }

    // close keyboard when Email Code input length is 4
    useEffect(() => {
        if (emailCode.length === 4) {
            Keyboard.dismiss();
        }
    }, [emailCode]);

    return (

        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <NavigationEvents onWillFocus={clearErrorMessage} />
            
            <Popup visible={visible}>
                <View style={{ alignItems: 'flex-end', paddingBottom: '20%' }}>
                    <TouchableOpacity onPress={onXpressed}>
                        <Ionicons
                            style={{ paddingLeft: '90%', }}
                            name='close'
                            size={35}
                            color='black'
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.TextPopUp}>Please enter the 4-digit code sent to your Emory email</Text>
                <PopUpInput
                    placeholder='Enter 4-digit code'
                    value={emailCode}
                    setValue={setEmailCode}
                    fontSize={18}
                    keyboardType={'numeric'}
                />
                {state.popupErrorMessage ? <Text style={styles.errorMessage}>{state.popupErrorMessage}</Text>: null}
                <PopUpButton 
                    text={'Confirm'} 
                    onPress={onConfirmPressed} 
                />
            </Popup>

            <ScrollView style={styles.scrollContainer}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start',}}>
                        <TouchableOpacity style={{marginTop: '10%', flexDirection: 'row', marginBottom: '2%'}} onPress={() => {navigate('Pprofile')}}>
                            <Ionicons
                                name='ios-arrow-back'
                                size={35}
                                color='black'
                            />
                            <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 5, alignSelf: 'center'}}>Go back</Text>
                        </TouchableOpacity>
                </View>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.Title}>
                        Change Password
                    </Text></View>

                <View style={styles.textContainer}>
                    <Text style={styles.Notification}>
                    Enter your email Address and we will send you an email.
                    </Text>
                </View>

                <View style={styles.topContainer}>
                    
                    <BasicInputs
                        placeholder='Emory Email'
                        value={email}
                        setValue={setEmail}
                        fontSize={12 }
                    />
                </View>


                <View style={styles.bottomContainer}>
                    <BasicButton
                        text='Verify Email'
                        onPress={onVerifyEmailPressed}
                    />
                    {state.popupErrorMessage ? <Text style={styles.errorMessage}>{state.popupErrorMessage}</Text>: null}
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

    topContainer: {
        alignItems: 'center',
        paddingTop: '10%',
    },

    bottomContainer: {
        alignItems: 'center',
        // paddingTop: '5%',
    },

    CreateAccountText: {
        fontSize: 13,
        paddingRight: '20%',
        fontWeight: '500',
        color: 'white'
    },

    LogInText: {
        fontSize: 13,
        fontWeight: '500',
        paddingLeft: '20%',
        color: 'white'
    },

    TextPopUp: {
        fontWeight: '700',
        textAlign: 'center',
        width: '85%',
    } ,

    textContainer: {
        alignItems: 'center',
        paddingTop: '10%'
    }, 
    titleContainer: {
        alignItems: 'center',
        // paddingTop: '25%'
    }, 
    Notification: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '800',
        paddingHorizontal: '10%'
    },
    Title: {
        fontSize: 38,
        textAlign: 'center',
        fontWeight: '900',
        color: 'black'
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
    },
});

export default ChangePassword1P;