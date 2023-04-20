import React, { useState, useEffect, useContext } from "react";
import { View, Button, Image, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BasicButton from "../components/ProfilePage/BasicButton";
import * as ImagePicker from 'expo-image-picker';
import defaultProfilePic from "../components/ProfilePage/default_profile_pic.png";
// import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext} from '../context/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const Profile_Passenger = ({ navigation }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const { state, signout, loadProfile, updateProfile, postImage } = useContext(AuthContext)

    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        const getData = async () => {
            await loadProfile()
            await AsyncStorage.getItem('profileInfo')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    if(parsedData.isDriver === true) {
                        navigate('ProfileDriver')
                    }
                    
                    setEmail(parsedData.email)
                    setFirst_Name(parsedData.first_name)
                    setLast_Name(parsedData.last_name)
                    setPhoneNumber(parsedData.phone_number)
                })
                .catch(error => {
                    console.log(error)
                })
        };
        getData();
    }, [refresh]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // var imageData = result.assets[0]
            // postImage({imageData})
            setImageUri(result.assets[0].uri);
        }
    };

    const handleEditPress = () => {
        setIsEditable(true);
    };

    const handleSavePress = async () => {
        await updateProfile({email, first_name, last_name, phoneNumber})
        var error = await AsyncStorage.getItem('updateError')
        
        if (error === '' || error === null) {
            setIsEditable(false);
        }
    };

    const handleCancelPress = () => {
        setIsEditable(false);
    };

    /// Name
    const handleNameChange = (newName) => {
        setFirst_Name(newName);
    };

    const handleLastNameChange = (newName) => {
        setLast_Name(newName);
    };


    /// Phone Number
    const handlePhoneNumberChange = (newPhoneNumber) => {
        setPhoneNumber(newPhoneNumber);
    };

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    
                    <View style={styles.editIconContainer}>
                        {/* <TouchableOpacity onPress={pickImage}>
                            <Ionicons
                                name='pencil-sharp'
                                size={25}
                                color='black'
                            />
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.picContainer}>
                        <Text style={{fontSize: 48, fontWeight: '800', marginBottom: '5%'}}>Profile</Text>
                        
                        {imageUri ? (
                            <View style={styles.imgContainer}>
                                <Image 
                                    source={{ uri: imageUri }} 
                                    style={styles.picImg} 
                                />
                            </View>
                        ) : (
                            <View style={styles.imgContainer}>
                                <Image
                                    source={imageUri ? { uri: imageUri } : defaultProfilePic}
                                    style={styles.picImg}
                                />
                            </View>
                        )}
                    </View>

                    <TouchableOpacity style={{alignSelf: 'flex-end', marginRight: '10%'}} onPress={onPressRefresh}>
                        <FontAwesome
                            name='refresh'
                            size={25}
                            color='black'
                        />
                    </TouchableOpacity>

                    <View style={styles.emailContainer}>
                        <Text style={styles.emailText}>{email}</Text>
                    </View>
                    
                    {isEditable ? (
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={first_name} 
                                onChangeText={handleNameChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{first_name}</Text> 
                        </View>
                    )}

                    {isEditable ? (
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={last_name} 
                                onChangeText={handleLastNameChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{last_name}</Text> 
                        </View>
                    )}

                    {isEditable ? (
                        <View style={styles.supportingContainer}>
                            <View style={styles.editContainer}>
                                <TextInput 
                                    value={phoneNumber} onChangeText={handlePhoneNumberChange}
                                    style={styles.emailText}
                                />
                            </View>

                            <View style={styles.editButtonContainer}>
                                {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}
                                <BasicButton
                                    onPress={handleSavePress} text="Save"
                                />
                                <BasicButton
                                    onPress={handleCancelPress} text="Cancel"
                                />
                            </View>
                        </View>


                    ) : (

                        <View style={styles.supportingContainer}>
                            <View style={styles.editContainer}>
                                <Text style={styles.emailText}>{phoneNumber}</Text>
                            </View>

                            <TouchableOpacity style={{marginLeft: '85%'}}onPress={handleEditPress}>
                                <Ionicons
                                    name='pencil-sharp'
                                    size={25}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                    )}


                    <View style={styles.buttonContainer}>
                        <BasicButton
                            text="Ride History"
                            onPress={() => navigation.navigate('RideHistory')}
                        />
                        <BasicButton
                            text="Become a driver"
                            onPress={() => navigation.navigate('BecomeDriver')}
                        />
                        
                        <BasicButton
                            text="Change Password"
                            onPress={() => navigation.navigate('ChangePassword1')}
                        />
                        
                        <BasicButton
                            text="Sign out"
                            onPress={signout}
                        />
                    </View>


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

    mainContainer: {
        maxWidth:'100%', 
        // borderWidth: 5, 
        // borderColor: 'white',
    },

    editIconContainer: {
        alignItems: 'flex-end', 
        paddingTop: '20%',
    },

    picContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginHorizontal: '20%',
    },

    picImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },

    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    emailContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        padding: 10,
        marginTop: '5%',
        width: 300,
        alignSelf: 'center'
    },

    editContainer: {
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 20,
        padding: 10,
        marginTop: '5%',
        width: 300,
        alignSelf: 'center'

    },

    supportingContainer: {

    },

    emailText: {
        fontSize: 20,
        fontWeight: "700",
        color: 'black',
        textAlign: 'center',
    },

    editButtonContainer: {
        width: 150,
        alignSelf: 'center',
        paddingTop: '5%'
        
    },

    buttonContainer: {
        paddingTop: '10%',
        alignSelf: 'center',
        width: 250
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
        textAlign: 'center'
    }
    
});

export default Profile_Passenger;