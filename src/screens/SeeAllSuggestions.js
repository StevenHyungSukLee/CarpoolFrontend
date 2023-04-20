import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Keyboard, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as FPContext} from "../context/FPContext"
import { Context as AuthContext} from "../context/AuthContext"
import { navigate } from "../navigationRef";

const SeeAllSuggestions = ({navigation}) => {
    const { state, loadDriverRequest, deleteDriverRequest, SAGpost, deleteAllPassRequest, deleteAllDriverRequest} = useContext(FPContext)
    const {getUserInfo} = useContext(AuthContext)

    const [dataArray, setDataArray] = useState([]);
    
    const [refresh, setRefresh] = useState(false)

    const onPressRefresh = () => {
        setRefresh(!refresh)
    }

    const onPressedCheck = async (item) => {
        await deleteAllDriverRequest({info: item.driver_id})
        await deleteAllDriverRequest({info: item.passenger_id})
        await deleteAllPassRequest({info: item.passenger_id})
        await SAGpost({item})
    }

    const onPressedDelete = async (input) => {
        await deleteDriverRequest({input})
        setRefresh(!refresh);
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
        const loadSuggestions = async () => {
            await loadDriverRequest()
            await AsyncStorage.getItem('driverRequestData')
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
                            first_name: infoData.first_name,
                            occupation: infoData.driver_info.occupation
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

        loadSuggestions()

    }, [refresh]);

    return (
        <View style={styles.rootContainer}>
            <ScrollView style={{flexGrow: 1, width: '90%',}} showsVerticalScrollIndicator={false}>
                <View style={{maxWidth: '100%', alignItems: 'center',}}>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start',}}>
                        <TouchableOpacity style={{marginTop: '10%', flexDirection: 'row', marginBottom: '5%'}} onPress={() => {navigate('Home')}}>
                            <Ionicons
                                name='ios-arrow-back'
                                size={35}
                                color='black'
                            />
                            <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 5, alignSelf: 'center'}}>Go back</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={{fontSize: 36, fontWeight: '800', marginBottom: '5%'}}>Match With Driver</Text>

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
                                    <Ionicons
                                        name='person'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.first_name}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%'}}>
                                    <MaterialIcons
                                        name='work'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.occupation}
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

                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%', paddingRight: '5%'}}>
                                    <Ionicons
                                        name='navigate'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.pick_up}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: 'center', marginTop: '5%', paddingRight: '5%'}}>
                                    <FontAwesome
                                        name='flag-checkered'
                                        size={25}
                                        color='black'
                                    />
                                    <Text style={{ paddingLeft: '5%', fontSize: 15, fontWeight: 'bold'}}>
                                        {item.pass_dest}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row", alignSelf: 'center', marginTop: '5%'}}>
                                    <TouchableOpacity onPress={() => onPressedCheck(item)}>
                                        <View style={{backgroundColor: 'rgba(152,190,196, 1)', borderRadius: 20, paddingHorizontal: 40, paddingVertical: 10, marginRight: 5}}>
                                            <Ionicons
                                                name='checkmark-circle-outline'
                                                size={25}
                                                color='black'
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => onPressedDelete(item._id)}>
                                        <View style={{backgroundColor: 'rgba(255,0,0,0.8)', borderRadius: 20, paddingHorizontal: 40, paddingVertical: 10, marginRight: 5}}>
                                            <MaterialCommunityIcons
                                                name='cancel'
                                                size={25}
                                                color='black'
                                            />
                                        </View>
                                    </TouchableOpacity>

                                </View>
            
                            </View>
                        )))
                        
                        : 
                        
                        <View style={{marginTop: '50%',}}>
                            <Text style={{fontStyle: 'italic', fontSize: 18,}}>There are no suggestions for your ride requests</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: '90%',
        alignSelf:'center'
    },

});

export default SeeAllSuggestions;