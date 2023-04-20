import React, {useState, useEffect, useContext} from "react";
import {View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Keyboard} from "react-native";
import { NavigationEvents } from 'react-navigation';
import Ionicons from "react-native-vector-icons/Ionicons"
import BasicInputs from "../components/Signup/BasicInputs";
import BasicButton from "../components/Signup/BasicButton";
import PopUpInput from "../components/Signup/Popup/PopUpInput";
import PopUpButton from "../components/Signup/Popup/PopUpButton";
import Popup from "../components/Signup/Popup/Popup1";
import { Context as AuthContext } from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const SignupScreen = ({navigation}) => {
    const {state, signup, sendOTP, verifyOTP, clearErrorMessage} = useContext(AuthContext);

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [password, setPassword] = useState('');
    const [re_password, setRe_password] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const isDriver = false;
    const driver_info = {car_brand: '', car_model: '', car_color: '' , plate_number: '', occupation: ''}
    
    // this is for the popup screen component
    const [visible, setVisible] = useState(false)

    // this is for validing email verification
    const [emailVerified, setEmailVerified] = useState(false)
    
    const [localErrorMessage, setLocalErrorMessage] = useState('');

    const onCompletePressed = async () => {
        // useContext signup prop
        if (emailVerified === false) {
            setLocalErrorMessage('Please verify your Emory email first')
        }
        else if (password !== re_password ) {
            setLocalErrorMessage('Please check if your passwords match')
        } else {
            setLocalErrorMessage('')
            await signup({first_name, last_name, email, phone_number, password, isDriver, driver_info})
        }
    }

    // create logic that if post request fails, setVisible should not be set to false
    const onConfirmPressed = async () => { 
        await verifyOTP({email, emailCode})

        var value = await AsyncStorage.getItem('OTPStatus');

        if (value === '' || value === null) {
            setVisible(false)
            setEmailVerified(true)
        }
    
    }

    const onVerifyPressed = () => {
        sendOTP({email})
        setVisible(true)

    }

    const onXpressed = () => {
        setVisible(false)
    }

    // close keyboard when Email Code input length is 4
    useEffect(() => {
        if (emailCode.length === 4) {
            Keyboard.dismiss();
        }
    }, [emailCode]);

    // close keyboard when phone number input length is 10
    useEffect(() => {
        if (phone_number.length === 10) {
            Keyboard.dismiss();
        }
    }, [phone_number]);

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            
            <NavigationEvents onWillFocus={clearErrorMessage} />
            
            <Popup visible={visible}>
                <View style={{alignItems: 'flex-end', paddingBottom: '10%'}}>
                    <TouchableOpacity onPress={onXpressed}>
                        <Ionicons 
                            style={{paddingLeft: '90%',}}
                            name= 'close'
                            size= {35}
                            color= 'black'
                        />
                    </TouchableOpacity>
                </View>
                    <Text style={styles.TextPopUp}>Please enter the verification code sent to your Emory email</Text>
                    <PopUpInput
                        placeholder='Enter verification code'
                        value={emailCode}
                        setValue={setEmailCode}
                        fontSize={12}
                        keyboardType={'numeric'}
                    />
                    {state.popupErrorMessage ? <Text style={styles.errorMessage}>{state.popupErrorMessage}</Text>: null}
                    {/* change the onPress prop so that it checks the code */}
                    <PopUpButton text={'Confirm'} onPress={onConfirmPressed}/>
            </Popup>
            
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start',}}>
                    <TouchableOpacity style={{marginTop: '10%', flexDirection: 'row', marginBottom: '3%'}} onPress={() => {navigate('Signin')}}>
                        <Ionicons
                            name='ios-arrow-back'
                            size={35}
                            color='black'
                        />
                        <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 5, alignSelf: 'center'}}>Go back</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.topContainer}>
                    <Text style={styles.headerText}>Create an Account</Text>
                    
                    <BasicInputs
                        placeholder='First Name'
                        value={first_name}
                        setValue={setFirst_name}
                    />
                    <BasicInputs
                        placeholder='Last Name'
                        value={last_name}
                        setValue={setLast_name}
                    />

                    <BasicInputs
                        placeholder='Emory Email'
                        value={email}
                        setValue={setEmail}
                    />
                </View>
                    <TouchableOpacity style={{marginLeft: '70%'}} onPress={onVerifyPressed}>
                        <Text style={styles.verifyEmailText}>Verify Email</Text>
                    </TouchableOpacity>

                <View style={styles.bottomContainer}>
                    <BasicInputs
                        placeholder='Phone Number'
                        value={phone_number}
                        setValue={setPhone_number}
                        keyboardType={'numeric'}
                    />

                    <BasicInputs
                        placeholder='Password'
                        value={password}
                        setValue={setPassword}
                        secureTextEntry
                    />
                    <BasicInputs
                        placeholder='Re-enter Password'
                        value={re_password}
                        setValue={setRe_password}
                        secureTextEntry
                    />

                    <BasicButton 
                        text='Complete' 
                        onPress={onCompletePressed}
                    />
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}
                    {localErrorMessage ? <Text style={styles.errorMessage}>{localErrorMessage}</Text>: null}
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
        // paddingTop: '20%',
    },

    bottomContainer: {
        alignItems: 'center',
        paddingTop: '10%',
    },

    headerText: {
        fontSize: 38,
        textAlign: 'center',
        fontWeight: '800',
        color: 'black',
        marginBottom: '5%'
    },

    verifyEmailText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.6)'
    },

    TextPopUp: {
        fontWeight: '700',
        textAlign: 'center',
        width: '85%',
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
    }

});

export default SignupScreen;