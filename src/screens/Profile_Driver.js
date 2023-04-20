import React, { useState, useEffect, useContext } from "react";
import { View, Button, Image, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import BasicButton from "../components/ProfilePage/BasicButton";
import * as ImagePicker from 'expo-image-picker';
import defaultProfilePic from "../components/ProfilePage/default_profile_pic.png";
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext} from '../context/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";
import SelectDropdown from 'react-native-select-dropdown';


const Profile_Driver = ({ navigation }) => {
    const [isEditable, setIsEditable] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [occupation, setOccupation] = useState('Occupation')
    const [carBrand, setCarBrand] = useState('Car brand');
    const [carModel, setCarModel] = useState('Car model');
    const [color, setColor] = useState('Car color');
    const [plateNumber, setPlateNumber] = useState('Plate number');
    const occupationArray = ['Student', 'Faculty']

    const { state, signout, loadProfile, updateProfile } = useContext(AuthContext)

    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    const onPressBecomePass = async () => {
        await updateProfile({email, first_name, last_name, phoneNumber, isDriver: false})

        navigate('Pprofile')
        navigate('HomeNavigator1')
        navigate('HomeNavigator2')

    }

    useEffect(() => {
        const getData = async () => {
            await loadProfile()
            await AsyncStorage.getItem('profileInfo')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    setEmail(parsedData.email)
                    setFirst_Name(parsedData.first_name)
                    setLast_Name(parsedData.last_name)
                    setPhoneNumber(parsedData.phone_number)
                    setOccupation(parsedData.driver_info.occupation)
                    setCarBrand(parsedData.driver_info.car_brand)
                    setCarModel(parsedData.driver_info.car_model)
                    setColor(parsedData.driver_info.car_color)
                    setPlateNumber(parsedData.driver_info.plate_number)
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
            setImageUri(result.assets[0].uri);
        }
    };

    const handleEditPress = () => {
        setIsEditable(true);
    };

    const handleSavePress = async () => {
        const isDriver = true

        await updateProfile({email, first_name, last_name, phoneNumber, isDriver, occupation, carBrand, carModel, color, plateNumber})
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

    /// Occupation
    const handleOccupationChange = (newOccupation) => {
        setOccupation(newOccupation);
    };

    /// Car Brand
    const handleCarBrandChange = (newCarBrand) => {
        setCarBrand(newCarBrand);
    };

    /// Car Model
    const handleCarModelChange = (newCarModel) => {
        setCarModel(newCarModel);
    };

    /// Car Color
    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    /// Plate Number
    const handlePlateNumberChange = (newPlateNumber) => {
        setPlateNumber(newPlateNumber);
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
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={phoneNumber} 
                                onChangeText={handlePhoneNumberChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{phoneNumber}</Text> 
                        </View>
                    )}

                    
                    {isEditable ? (
                        <View>
                            <SelectDropdown
                                data={occupationArray}
                                buttonStyle={styles.editContainer}
                                buttonTextStyle={{fontWeight: '700'}}
                                defaultButtonText='Occupation'
                                dropdownStyle={{ borderRadius: 20 }}
                                onSelect={(selectedItem, index) => {
                                    setOccupation(selectedItem)
                                }}
                            />  
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{occupation}</Text> 
                        </View>
                    )}


                    {isEditable ? (
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={carBrand} 
                                onChangeText={handleCarBrandChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{carBrand}</Text> 
                        </View>
                    )}

                    {isEditable ? (
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={carModel} 
                                onChangeText={handleCarModelChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{carModel}</Text> 
                        </View>
                    )}

                    {isEditable ? (
                        <View style={styles.editContainer}>
                            <TextInput 
                                value={color} 
                                onChangeText={handleColorChange}
                                style={styles.emailText}
                            />     
                        </View>                     

                    ) : (
                        <View style={styles.editContainer}>
                            <Text style={styles.emailText}>{color}</Text> 
                        </View>
                    )}

                    {isEditable ? (
                        <View style={styles.supportingContainer}>
                            <View style={styles.editContainer}>
                                <TextInput 
                                    value={plateNumber} onChangeText={handlePlateNumberChange}
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
                                <Text style={styles.emailText}>{plateNumber}</Text>
                            </View>

                            <TouchableOpacity onPress={handleEditPress}>
                                <Ionicons
                                    style={{ marginLeft: '85%', }}
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
                            text="Become a passenger"
                            onPress={() => onPressBecomePass()}
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
        width: '80%'
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
        textAlign: 'center'
    }
    
});

export default Profile_Driver;