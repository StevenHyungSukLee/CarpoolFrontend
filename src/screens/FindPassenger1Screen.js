import React, {useState, useContext, useEffect} from "react";
import {View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ScrollView, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SelectDropdown from 'react-native-select-dropdown';
import BasicInputs from "../components/FindPassenger/BasicInputs";
import BasicButton from "../components/FindPassenger/BasicButton";
import Ionicons from "react-native-vector-icons/Ionicons"
import Timeslot from "../components/FindPassenger/Timeslot";
import { Context as FPContext } from "../context/FPContext"
import { Context as AuthContext } from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";


const FindPassenger1Screen = ({navigation}) => {
    // need API action functions that
    
    // const {} = useContext(FPContext);

    // useEffect for default API call to load data on timeslot (maybe needed at Timeslot.js)
    // useEffect(() => {
    //     toggleModal()
    // }, [visible])

    const numPassenger = [1, 2, 3, 4];
    const [currentLocation, setCurrentLocation] = useState('')
    const [finalDestination, setFinalDestination] = useState('');
    const [maxCap, setMaxCap] = useState(0)

    const {state, postPassRequest, loadTimeslot, getSelectedRequest, getMaxPrice, postDriverRequest} = useContext(FPContext);
    const {loadProfile} = useContext(AuthContext)

    const [em, setEm] = useState('')

    const onPressedSubmit = async () => {
        await loadProfile()
        await AsyncStorage.getItem('profileInfo')
            .then(data => {
                const parsedData = JSON.parse(data)
                if(parsedData.isDriver === false) {
                    setEm('You are not a driver. This is for driver users only.')
                } else {
                    setEm('')
                    loadTimeslot({currentLocation, finalDestination, maxCap})
                }
            })
            .catch(error => {
                console.log(error)
        })
    }

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>    
                    <Text style={styles.mainText}>Find Passenger</Text>
                    <Text style={styles.firstText}>1. Input your current location</Text>
                    <BasicInputs
                        placeholder='Current Location (Specific)'
                        value={currentLocation}
                        setValue={setCurrentLocation}
                    />
                    <Text style={styles.subText}>2. Input your final destination</Text>
                    <BasicInputs
                        placeholder='Final Destination (Specific)'
                        value={finalDestination}
                        setValue={setFinalDestination}
                    />
                    <Text style={styles.subText}>3. Maximum Capacity</Text>
                    <SelectDropdown
                        data={numPassenger}
                        buttonStyle={styles.dropdownButton}
                        buttonTextStyle={styles.dropdownButtonText}
                        dropdownStyle={{borderRadius: 20 }}
                        renderDropdownIcon={() => <Ionicons name="caret-down-outline" color={'rgba(0,0,0,0.6)'} size={25}/>}
                        onSelect={(selectedItem, index) => {
                            //this will save the selectedItem to the variable maxCap that I initialized at line 13
                            setMaxCap(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <BasicButton onPress={onPressedSubmit} text='Submit' />
                    {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>: null}
                    {em ? <Text style={styles.errorMessage}>{em}</Text>: null}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

FindPassenger1Screen.navigationOptions = {
    title: 'Find Passenger',
    tabBarIcon: <FontAwesome name= 'handshake-o' size= {30} color= 'black'/>
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(152,190,196, 1)',
    },

    scrollContainer: {
        flexGrow: 1,
    },

    topContainer: {
        alignItems: 'center',
        paddingTop: '20%',
    },

    mainText: {
        fontSize: 44,
        textAlign: 'center',
        fontWeight: '800',
        color: 'black',
    },

    firstText: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        fontWeight: '800',
        color: 'black',
        paddingTop: 40,
    },

    subText: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        fontWeight: '800',
        color: 'black',
        paddingTop: 10,
    },

    dropdownButton: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 20, 
        width: 345,
        height: 65,
        marginTop: 5,

        alignItems: 'center'
    },

    dropdownButtonText: {
        fontSize: 24,
        fontWeight: '700',
        color:"rgba(0,0,0,0.6)",
        width: "100%",
    },

    errorMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
    }

});

export default FindPassenger1Screen;