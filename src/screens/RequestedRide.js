import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Keyboard, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as FPContext} from "../context/FPContext"

const RequestedRide = ({navigation}) => {
    
    const { state, loadPassRequest, deletePassRequest} = useContext(FPContext)

    const [dataArray, setDataArray] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    useEffect(() => {
        const getData = async () => {
            await loadPassRequest()
            await AsyncStorage.getItem('passRequestData')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    if (parsedData !== null) {
                        setDataArray(parsedData)
                    }
                    if (parsedData === null ) {
                        setDataArray([])
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        };
        getData();
    }, [refresh]);

    const onPressedDelete = async (input) => {
        await deletePassRequest({input})
        setRefresh(!refresh)
    }

    const onPressSAG = () => {
        navigate('SAG')
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


    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <View style={{flex: 1, alignItems: 'center', paddingBottom: '5%'}}>
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

                {Array.isArray(dataArray) && dataArray.length > 0 ? 
                    <>
                        <TouchableOpacity onPress={onPressSAG} style={styles.SAGButton}>
                            <Text style={styles.SAGText}>Match With Driver</Text>
                        </TouchableOpacity>
        
        
                        {dataArray.map((item, index) => (
                            <View style={styles.container} key={index}>
            
                                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                                    <Ionicons
                                        name='alarm'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {militaryTo12HrTime(item.from) + " - " + militaryTo12HrTime(item.to)}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%', paddingRight: '10%'}}>
                                    <Ionicons
                                        name='navigate'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.pick_up}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%', paddingRight: '10%'}}>
                                    <Ionicons
                                        name='flag'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.destination}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <Ionicons
                                        name='people'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.num_of_pass}
                                    </Text>
                                </View>
            
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity onPress={() => onPressedDelete(item._id)}>
                                        <View style={styles.button}>
                                            <Text style={{ fontSize: 15, color: 'rgba(0,0,0,0,1)', fontWeight: '700'}}>Delete Request</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
            
                            </View>

                        ))}

                    <View style={{marginBottom: '100%'}}></View>    
                    </>
                    
                    : 
                    
                    <View style={{marginTop: '50%', marginBottom: '100%'}}>
                        <Text style={{fontStyle: 'italic', fontSize: 14}}>Make a request under the "Find Driver" tab</Text>
                    </View>
                }

            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },

    scrollContainer: {
        flexGrow: 1,
    },

    Title: {
        borderColor: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 20,
    },

    textContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: '10%',
        marginBottom: '10%',

    },

    upcomingRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        borderBottomColor: "lightgrey",
        color: "lightgrey",
        fontWeight: 'bold',
    },
    requestRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        fontWeight: 'bold',
        borderBottomColor: "black",
        color: "black",

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





    container: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: '80%',
        alignSelf:'center',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    infoText: {
        fontSize: 20,
        fontWeight: 'normal'
    },

    inputContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
    },

    button: {
        borderRadius: 20,
        backgroundColor: "rgba(255,0,0,0.7)",
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    SAGButton: {
        marginBottom: 10,
        backgroundColor: 'rgba(152,190,196, 1)',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    SAGText: {
        fontWeight: '700',
        fontSize: 15,
    }
});

export default RequestedRide;