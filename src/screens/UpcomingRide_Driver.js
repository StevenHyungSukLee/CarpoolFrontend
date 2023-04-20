import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Keyboard, Animated, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { navigate } from "../navigationRef";
import Popup from "../components/HomeScreen/Popup";
import PopUpButton from "../components/HomeScreen/PopUpButton";
import { Context as FPContext} from "../context/FPContext"
import { Context as AuthContext} from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpcomingRide_Driver = ({navigation}) => {
    const [inputCode, setInputCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [cancelMess, setCancelMess] = useState('')
    const [reason, setReason] = useState('')
    const [visible, setVisible] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false);

    const [dataArray, setDataArray] = useState([])

    const { state, loadTransaction, patchTransaction, postRideHistory, deleteTransaction, deleteAllDriverRequest, deleteAllPassRequest} = useContext(FPContext)
    const {getUserInfo} = useContext(AuthContext)

    const onVerifyPressed = async () => {
        if (dataArray[0].code.toString() !== inputCode) {
            setErrorMessage('Please check your code again.')
        } else {
            setErrorMessage('')
            await patchTransaction({_id: dataArray[0]._id, isVerified: true, isCancelled: false, cancel_reason: ''})

            try {
                const data = await AsyncStorage.getItem('cancel')

                if (data === null || data === '') {
                    setErrorMessage('')
                    setVisible(true)
                } else {
                    setErrorMessage(data)
                }
    
            } catch (error) {
                console.log(error)
            }


        }
    };

    const onPressCancel = () => {
        setShowTextInput(prevState => !prevState);
    }

    const onPressSubmit = async () => {
        await patchTransaction({_id: dataArray[0]._id, isVerified: false, isCancelled: true, cancel_reason: reason})
        try {
            const data = await AsyncStorage.getItem('cancel')

            if (data === null || data === '') {
                setCancelMess('')

                await postRideHistory({info: {
                price: dataArray[0].price, 
                driver_id: dataArray[0].driver_id, 
                passenger_id: dataArray[0].passenger_id, 
                time_of_arrival: dataArray[0].time_of_arrival, 
                time_of_pickup: dataArray[0].time_of_pickup, 
                pick_up: dataArray[0].pick_up, 
                pass_dest: dataArray[0].pass_dest,
                additional_time: dataArray[0].additional_time,
                code: dataArray[0].code, 
                isVerified: false, 
                isCancelled: true, 
                cancel_reason: reason,
                }})
            
                await deleteTransaction({_id: dataArray[0]._id})
                setDataArray([])
                setShowTextInput(prevState => !prevState)
                setRefresh(!refresh)
            } else {

                setCancelMess(data)
            }

        } catch (error) {
            console.log(error)
        }
    }
      

    const onPressOK = async () => {
        await postRideHistory({info: {
            price: dataArray[0].price, 
            driver_id: dataArray[0].driver_id, 
            passenger_id: dataArray[0].passenger_id, 
            time_of_arrival: dataArray[0].time_of_arrival, 
            time_of_pickup: dataArray[0].time_of_pickup, 
            pick_up: dataArray[0].pick_up, 
            pass_dest: dataArray[0].pass_dest,
            additional_time: dataArray[0].additional_time,
            code: dataArray[0].code, 
            isVerified: true, 
            isCancelled: false, 
            cancel_reason: '',
        }})

        await deleteTransaction({_id: dataArray[0]._id})

        setDataArray([])
        setRefresh(!refresh)
        setVisible(false)
    }

    const handleCodeChange = (text) => {
        setInputCode(text)
        if (text.length === 4) {
            Keyboard.dismiss();
        }
    }

    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    function militaryTo12HrTime(militaryTime) {
        // Split the military time string into hours and minutes
        const time = militaryTime.toString()
        const digits = time.length
        if (digits === 4) {
            const hours = parseInt(time.substring(0, 2));
            const minutes = time.substring(2);
      
        // Determine whether it's AM or PM based on the hours
            const amOrPm = hours >= 12 ? 'PM' : 'AM';
      
        // Convert the hours to 12-hour time
            const twelveHour = hours % 12 || 12;
      
        // Combine the hours, minutes, and AM/PM into a formatted string
            const twelveHourTime = `${twelveHour}:${minutes} ${amOrPm}`;
      
            return twelveHourTime;
        } else if (digits == 3) {
            const hours = parseInt(time.substring(0, 1));
            const minutes = time.substring(1);
              
            const twelveHour = hours % 12 || 12;
            const twelveHourTime = `${twelveHour}:${minutes} AM`;
              
            return twelveHourTime
        } else if (digits === 2 ) {
            return '12:30 AM'
        } else if (digits === 1) {
            return '12:00 AM'
        }
        
    }

    useEffect(() => {
        const loadData = async () => {
            await loadTransaction()
            await AsyncStorage.getItem('upcomingRideData')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    if (parsedData !== null) {
                        helper(parsedData)
                    }
                    if (parsedData === null) {
                        setDataArray([])
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        };

        const helper = async(parsedData) => {
            var myArray = [parsedData]
            const id = myArray[0].passenger_id
            await getUserInfo({id});
            await AsyncStorage.getItem('UserInfo')
                .then(data => {
                    const infoData = JSON.parse(data)

                    const newObject = {
                        ...myArray[0],
                        name: infoData.first_name,
                        phone_number: infoData.phone_number.slice(0,3) + ' - ' + infoData.phone_number.slice(3,6) + ' - ' + infoData.phone_number.slice(6),
                    }
                
                    var myArrayCopy = [...myArray]

                    myArrayCopy[0] = newObject; 

                    myArray = myArrayCopy
                })
                .catch(error => {
                    console.log(error)
                })
            setDataArray(myArray)
        }

        loadData()

    }, [refresh]);




    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='position'>
            <ScrollView style={{flex: 1, height: '100%', width: '100%'}}>
                <View style={{ flexDirection: "row", marginBottom: '5%' }}>
                    <Text style={styles.upcomingRide}>
                        Upcoming Ride
                    </Text>

                    <Text style={styles.requestRide}>
                        Requested Ride
                    </Text>

                    <Text style={styles.pendingRide}>
                        Pending Ride
                    </Text>
                </View>

                <TouchableOpacity style={{alignSelf: 'flex-end', paddingRight: '5%'}} onPress={onPressRefresh}>
                    <FontAwesome
                        name='refresh'
                        size={25}
                        color='black'
                    />
                </TouchableOpacity>

                <Popup visible={visible}>
                    
                    <Text style={{fontWeight: '700', textAlign: 'center', paddingTop: '15%'}}>Success! Please drive safely to the destination.</Text>

                    <PopUpButton text={'OK'} onPress={() => onPressOK()} />
                </Popup>

                {Array.isArray(dataArray) && dataArray.length > 0 ? 

                    <View style={styles.titleContainer_1}>
                        <View style={{ flexDirection: "row", alignItems: 'center'}}>
                            <Ionicons
                                name='person'
                                size={25}
                                color='black'
                            />
                            <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {dataArray[0].name}
                            </Text>
                        </View>
                        
                        
                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                            <Ionicons
                                name='call'
                                size={25}
                                color='black'
                            />
                            <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {dataArray[0].phone_number}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center', paddingRight: '5%'}}>
                            <Ionicons
                                name='navigate'
                                size={25}
                                color='black'
                            />
                            <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold',}}>
                                {dataArray[0].pick_up}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                            <FontAwesome
                                name='flag-checkered'
                                size={25}
                                color='black'
                            />
                            <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {dataArray[0].pass_dest}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                            <Ionicons
                                name='alarm'
                                size={25}
                                color='black'
                            />
                            <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {militaryTo12HrTime(dataArray[0].time_of_pickup)}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                            <Ionicons
                                name='logo-usd'
                                size={25}
                                color='black'
                            />
                            <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {dataArray[0].price}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                                <Ionicons
                                    name='hourglass'
                                    size={25}
                                    color='black'
                                />
                            <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                {dataArray[0].additional_time} min
                            </Text>
                        </View>

                        <View style={{paddingTop: '10%', alignItems: 'center', paddingBottom: '10%'}}>
                            <Text style={{fontSize: 15, fontWeight:'bold', paddingBottom: '5%'}}>Enter 4-digit confirmation code:</Text>
                            <TextInput
                                style={styles.codeInput}
                                keyboardType='numeric'
                                maxLength={4}
                                onChangeText={handleCodeChange}
                                value={inputCode}
                            />
                            {errorMessage ? <Text style={{fontSize: 15, color: 'rgba(255,0,0,0.6)', fontWeight: '700', paddingBottom: 3,}}>{errorMessage}</Text>: null}
                            <TouchableOpacity onPress={onVerifyPressed} style={styles.verifyButton}>
                                <Text style={{textAlign: 'center', fontSize: 15, fontWeight: '700', color: 'rgba(0,0,0,1)'}}>Verify</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => onPressCancel()} style={styles.CancelButton}>
                                <Text style={styles.ButtonText}>Cancel Ride</Text>
                            </TouchableOpacity>

                            {showTextInput && (
                                <>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'space-between'}}>
                                    <TextInput
                                        style={{fontSize: 15, borderWidth: 1.5, borderColor: 'black', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 5, width: '70%', marginRight: 10,}}
                                        placeholder="Reason for cancellation"
                                        placeholderTextColor={'rgba(0,0,0, 1)'}
                                        textAlign='center'
                                        value={reason}
                                        onChangeText={text => setReason(text)}
                                    />

                                    <TouchableOpacity onPress={() => onPressSubmit()} style={{backgroundColor: 'rgba(0,0,0,0.3)' , borderColor: 'black', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 10}}>
                                        <Text style={styles.ButtonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                {cancelMess ? <Text style={{fontSize: 15, color: 'rgba(255,0,0,0.6)', fontWeight: '700', paddingTop: 3,}}>{cancelMess}</Text>: null}
                                </>
                            )}

                        </View>
                    </View>

                : 
                        
                    <View style={{marginTop: '50%', alignSelf: 'center', marginBottom: '100%'}}>
                        <Text style={{fontStyle: 'italic', fontSize: 15,}}>You have no upcoming rides</Text>
                    </View>

                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },

    scrollContainer: {
        flexGrow: 1,

    },

    driverName: {
        fontSize: 32,
    },

    Title: {
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,

    },
    titleContainer_1: {
        paddingHorizontal: '15%',
        flex: 1,
        maxHeight: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        maxWidth: '100%',
    },

    textContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: '10%',
        marginBottom: '10%',
        

    },

    upcomingRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        borderBottomColor: "black",
        color: "black",
        fontWeight: 'bold',
    },
    requestRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        fontWeight: 'bold',
        borderBottomColor: "lightgrey",
        color: "lightgrey",

    },
    pendingRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        fontWeight: 'bold',
        borderBottomColor: "lightgrey",
        color: "lightgrey",

    },

    codeInput: {
        width: '100%',
        height: 35,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: 'black',
        textAlign: 'center',
        letterSpacing: 15,
        fontSize: 20,
        marginBottom: '10%'
    },

    verifyButton: {
        backgroundColor: 'rgba(152,190,196, 1)',
        width: '100%',

        paddingHorizontal: 10,
        paddingVertical: 10,

        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    ButtonText: {
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center'
    },

    CancelButton: {
        marginTop: 10,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'rgba(255,0,0, 0.6)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },


});

export default UpcomingRide_Driver;