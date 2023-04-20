import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Keyboard, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as FPContext} from "../context/FPContext"
import { Context as AuthContext} from "../context/AuthContext"
import { navigate } from "../navigationRef";

const RideHistory_Passenger = ({navigation}) => {
    const { state, getHistoryPass} = useContext(FPContext)
    const {getUserInfo} = useContext(AuthContext)

    const [dataArray, setDataArray] = useState([]);
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
        const getData = async () => {
            await getHistoryPass()
            await AsyncStorage.getItem('historyPassData')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    if (parsedData !== null) {
                        helper(parsedData)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        };

        const helper = async(parsedData) => {
            var myArray = parsedData

            for (let i = 0; i < myArray.length; i++) {
                const id = myArray[i].driver_id;
                await getUserInfo({id});
                await AsyncStorage.getItem('UserInfo')
                    .then(data => {
                        const infoData = JSON.parse(data)

                        const newObject = {
                            ...myArray[i],
                            name: infoData.first_name,
                            occupation: infoData.driver_info.occupation,
                            phone_number: infoData.phone_number.slice(0,3) + ' - ' + infoData.phone_number.slice(3,6) + ' - ' + infoData.phone_number.slice(6),
                            carInfo: infoData.driver_info.car_color + ' ' + infoData.driver_info.car_brand + ' ' + infoData.driver_info.car_model,
                            plate: infoData.driver_info.plate_number
                        }
                    
                        var myArrayCopy = [...myArray]

                        myArrayCopy[i] = newObject; // replace the object at index i with the newObject

                        myArray = myArrayCopy
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            setDataArray(myArray);
        }

        getData()

    }, [refresh]);


    return (
        <View style={styles.rootContainer}>
            <ScrollView style={{flexGrow: 1, width: '90%',}} showsVerticalScrollIndicator={false}>
                <View style={{maxWidth: '100%', alignItems: 'center', justifyContent: 'center',}}>
                    
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
                    
                    <Text style={{fontSize: 48, fontWeight: '800', marginBottom: '5%'}}>Ride History</Text>

                    <TouchableOpacity style={{alignSelf: 'flex-end', paddingRight: '5%', marginBottom:'5%'}} onPress={onPressRefresh}>
                        <FontAwesome
                            name='refresh'
                            size={25}
                            color='black'
                        />
                    </TouchableOpacity>

                    {Array.isArray(dataArray) && dataArray.length > 0 ? 
                        (dataArray.map((item, index) => (
                            <View style={styles.container} key={index}>

                                <View style={{ flexDirection: "row", alignItems: 'center'}}>
                                    <FontAwesome
                                        name='calendar'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.updatedAt.substring(0, 10)}
                                    </Text>
                                </View>

                                {item.isCancelled === true ? 
                                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                        <MaterialCommunityIcons
                                            name='cancel'
                                            size={25}
                                            color='black'
                                        />
                                        <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                            Cancellation Reason: {item.cancel_reason}
                                        </Text>
                                    </View>
                                : null}

                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <Ionicons
                                        name='person'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {`${item.name} (${item.occupation})`}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <Ionicons
                                        name='alarm'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {militaryTo12HrTime(item.time_of_pickup)}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <Ionicons
                                        name='logo-usd'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.price}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <Ionicons
                                        name='navigate'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.pick_up}
                                    </Text>
                                </View>
            
                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <FontAwesome
                                        name='flag-checkered'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.pass_dest}
                                    </Text>
                                </View>
            
                            </View>
                        )))
                        
                        : 
                        
                        <View style={{marginTop: '50%'}}>
                            <Text style={{fontStyle: 'italic', fontSize: 18}}>There no previous rides completed</Text>
                        </View>
                    }

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(152,190,196, 1)',
    },

    container: {
        backgroundColor: 'white',
        paddingHorizontal: '10%',
        paddingVertical: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: '90%',
        alignSelf:'center'
    },

});

export default RideHistory_Passenger;