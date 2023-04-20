import React, { useState, useEffect, useContext } from "react";
import { View, Image, StyleSheet, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput} from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from "react-native-vector-icons/Ionicons"
import BasicButton from "../components/ProfilePage/BasicButton";
import defaultProfilePic from "../components/ProfilePage/default_profile_pic.png";
import { Context as AuthContext} from '../context/AuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";


const Profile_BecomeDriver = (navigation) => {
    const [isEditable, setIsEditable] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [occupation, setOccupation] = useState('Occupation')
    const [carBrand, setCarBrand] = useState('Car brand');
    const [carModel, setCarModel] = useState('Car model');
    const [color, setColor] = useState('Car color');
    const [email,setEmail] = useState('')
    const [plateNumber, setPlateNumber] = useState('Plate number');
    const occupationArray = ['Student', 'Faculty']
    const [didSave, setDidSave] = useState(false)
    const [localErrorMessage, setLocalErrorMessage] = useState('')

    const { state, loadProfile, updateProfile } = useContext(AuthContext)

    useEffect(() => {
        const getData = async () => {
            await loadProfile()
            await AsyncStorage.getItem('profileInfo')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    setEmail(parsedData.email)
                })
                .catch(error => {
                    console.log(error)
                })
        };
        getData();
    }, []);

    const handleEditPress = () => {
        setIsEditable(true);
    };

    const handleSavePress = async () => {
        const isDriver = true
        
        if (occupation === 'Occupation' || carBrand === 'Car brand' || carBrand === '' || carModel === 'Car model' || carModel === '' || color === 'Car color' || color === '' || plateNumber === 'Plate number' || plateNumber === '') {
            await updateProfile({email, isDriver, occupation: '', carBrand: '', carModel: '', color: '', plateNumber: ''})
        } else {
            await updateProfile({email, isDriver, occupation, carBrand, carModel, color, plateNumber})
        }

        var error = await AsyncStorage.getItem('updateError')
        
        if (error === '' || error === null) {
            setIsEditable(false);
            setDidSave(true)
        }
    };

    const handleCancelPress = () => {
        setOccupation('Occupation')
        setIsEditable(false);
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

    const pressSubmit = () => {
        if (didSave === false) {
            setLocalErrorMessage('Please Input Your Driver Information First')
        } else {
            setLocalErrorMessage('')
            navigate('ProfileDriver')
            navigate('HomeNavigator1')
            navigate('HomeNavigator2')
        }
        
    };

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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

                <View style={styles.picContainer}>
                    <Text style={{fontSize: 36, fontWeight: '800', marginBottom: '5%'}}>Become a Driver</Text>
                    
                    {/* <TouchableOpacity onPress={pickImage}>
                        <Ionicons
                            style={{ paddingLeft: '40%' }}
                            name='pencil-sharp'
                            size={25}
                            color='black'
                        />
                    </TouchableOpacity> */}
                    {imageUri ? (
                        <View style={styles.imgContainer}>
                            <Image source={{ uri: imageUri }} style={styles.picImg} />
                        </View>
                    ) : (
                        <View style={styles.imgContainer}>
                            <Image
                                source={imageUri ? { uri: imageUri } : defaultProfilePic}
                                style={styles.picImg}
                            />
                        </View>)}
                </View>

                <View style={styles.emailContainer}>
                        <Text style={styles.emailText}>{email}</Text>
                    </View>

                <View style={styles.example}>
                    {isEditable ? (
                        
                                <SelectDropdown
                                    data={occupationArray}
                                    buttonStyle={styles.editContainer}
                                    buttonTextStyle={{fontWeight: '700', fontSize: 20}}
                                    defaultButtonText='Occupation'
                                    dropdownStyle={{ borderRadius: 20 }}
                                    onSelect={(selectedItem, index) => {
                                        setOccupation(selectedItem)
                                    }}
                                />
                        


                    ) : (
                        <View style={styles.editContainer}>
                            
                                <Text style={styles.emailText}>{occupation}</Text>
                            

                            <TouchableOpacity onPress={handleEditPress}>
                            </TouchableOpacity>
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
                                    value={plateNumber} 
                                    onChangeText={handlePlateNumberChange}
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

                            <TouchableOpacity style={{marginLeft: '85%'}}onPress={handleEditPress}>
                                <Ionicons
                                    name='pencil-sharp'
                                    size={25}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.bottomContainer}>
                    {localErrorMessage ? <Text style={styles.errorMessage}>{localErrorMessage}</Text>: null}
                    <BasicButton
                        text="Submit"
                        onPress={pressSubmit}
                        // If ready, delete onPress={pressSubmit} and uncomment onPress={() => navigation.navigate('Profile_Driver')}
                        // onPress={() => navigation.navigate('Profile_Driver')}
                    />
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

export default Profile_BecomeDriver;