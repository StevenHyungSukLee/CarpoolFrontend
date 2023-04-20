import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import defaultProfilePic from "../components/ProfilePage/default_profile_pic.png";
import BasicButton from "../components/HomeScreen/BasicButton";
import PopUpButton from "../components/HomeScreen/PopUpButton";
import PopUpInput from "../components/Signup/Popup/PopUpInput";
import Popup from "../components/HomeScreen/Popup";
import { navigate } from "../navigationRef";
import { Context as FPContext} from "../context/FPContext"
import { Context as AuthContext} from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpcomingRide_Passenger = ({navigation}) => {
    const [imageUri, setImageUri] = useState(null);
    const [visible, setVisible] = useState(false)
    const [code, setCode] = useState('')
    const [reason, setReason] = useState('')
    const [showTextInput, setShowTextInput] = useState(false);
    const [error, setError] = useState('')

    const [dataArray, setDataArray] = useState([])

    const { state, loadTransaction, patchTransaction, postRideHistory, deleteTransaction} = useContext(FPContext)
    const {getUserInfo} = useContext(AuthContext)

    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    const onPressCancel = () => {
        setShowTextInput(prevState => !prevState);
    }

    const onCompletedPressed = () => {
        setVisible(false)
        setRefresh(!refresh)
    }

    const onPressSubmit = async () => {
        await patchTransaction({_id: dataArray[0]._id, isVerified: false, isCancelled: true, cancel_reason: reason})

        // put error message: already cancelled
        const cancelled = AsyncStorage.getItem('cancel')

        try {
            const data = await AsyncStorage.getItem('cancel')

            if (data === null || data === '') {
                setError('')

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

                setError(data)
            }

        } catch (error) {
            console.log(error)
        }
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
            const id = myArray[0].driver_id
            await getUserInfo({id});
            await AsyncStorage.getItem('UserInfo')
                .then(data => {
                    const infoData = JSON.parse(data)

                    const newObject = {
                        ...myArray[0],
                        name: infoData.first_name,
                        occupation: infoData.driver_info.occupation,
                        phone_number: infoData.phone_number.slice(0,3) + ' - ' + infoData.phone_number.slice(3,6) + ' - ' + infoData.phone_number.slice(6),
                        carInfo: infoData.driver_info.car_color + ' ' + infoData.driver_info.car_brand + ' ' + infoData.driver_info.car_model,
                        plate: infoData.driver_info.plate_number
                    }
                
                    var myArrayCopy = [...myArray]

                    myArrayCopy[0] = newObject; 

                    myArray = myArrayCopy
                })
                .catch(error => {
                    console.log(error)
                })
            setDataArray(myArray)
            setCode(myArray[0].code)
        }

        loadData()

    }, [refresh]);

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='position'>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ flexDirection: "row", marginBottom: '5%'}}>
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
                    <View style={{ alignItems: 'flex-end', paddingBottom: '5%' }}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <Ionicons
                                style={{ paddingLeft: '90%', }}
                                name='close'
                                size={35}
                                color='black'
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{fontWeight: '700', textAlign: 'center'}}>Please confirm the 4-digit confirmation code with your driver: {code}</Text>

                    <PopUpButton text={'Completed'} onPress={() => onCompletedPressed()} />
                </Popup>

                {Array.isArray(dataArray) && dataArray.length > 0 ? 

                    <View style={styles.titleContainer_1}>
                        <View style={styles.textContainer}>
                            <View style={styles.imgContainer}>
                                <Image source={imageUri ? { uri: imageUri }: defaultProfilePic}
                                style={styles.picImg} />
                            </View>
                            <Text style={styles.DriverName}>
                                {`${dataArray[0].name} (${dataArray[0].occupation})`}
                            </Text>
                            <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                                <Ionicons
                                    name='call'
                                    size={25}
                                    color='black'
                                />
                                <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                    {dataArray[0].phone_number}
                                </Text>
                            </View>

                            <View style={{ flexDirection: "row", paddingTop: '5%', alignItems: 'center'}}>
                                <Ionicons
                                    name='car'
                                    size={25}
                                    color='black'
                                />
                                <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                    {`${dataArray[0].carInfo} (${dataArray[0].plate})`}
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
                                <MaterialCommunityIcons
                                    name='shield-key'
                                    size={25}
                                    color='black'
                                />
                                <Text style={{justifyContent: 'center', paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                    {dataArray[0].code}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', alignContent: 'space-between',}}>
                            <TouchableOpacity onPress={() => setVisible(true)} style={styles.StartButton}>
                                <Text style={styles.ButtonText}>Verify Ride</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => onPressCancel()} style={styles.CancelButton}>
                                <Text style={styles.ButtonText}>Cancel Ride</Text>
                            </TouchableOpacity>

                        </View>

                        {showTextInput && (
                            <>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'space-between'}}>
                                <TextInput
                                    style={{fontSize: 15, borderWidth: 1.5, borderColor: 'black', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 5, width: '55%', marginRight: 10,}}
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
                            {error ? <Text style={{fontSize: 15, color: 'rgba(255,0,0,0.6)', fontWeight: '700', paddingBottom: 3, textAlign: 'center'}}>{error}</Text>: null}
                            </>
                        )}

                        
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
        height: '100%',
        width: '100%',
    },

    DriverName: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },

    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    picImg: {
        width: 100,
        height: 100,
        borderRadius: 100

    },

    Title: {
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,



    },
    titleContainer_1: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
        marginBottom: '10%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        width: '90%',
    },

    textContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '0%',
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

    StartButton: {
        marginBottom: 10,
        backgroundColor: 'rgba(152,190,196, 1)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },

    ButtonText: {
        fontWeight: '700',
        fontSize: 15,
    },

    CancelButton: {
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255,0,0, 0.6)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default UpcomingRide_Passenger;