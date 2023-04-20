import React, {useState, useContext} from "react";
import {View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { Context as FPContext } from "../../context/FPContext"
import { navigate } from "../../navigationRef";

const PassRequestList = ({array}) => {
    const {deletePassRequest} = useContext(FPContext)


    const onPressedDelete = (input) => {
        deletePassRequest({input})
        
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
        <>
            <TouchableOpacity onPress={onPressSAG} style={styles.SAGButton}>
                <Text style={styles.SAGText}>See All Suggestions</Text>
            </TouchableOpacity>


            {array.map((item, index) => (
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
        </>
    );
      
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        paddingHorizontal: '5%',
        paddingVertical: 20,
        marginBottom: 15,
        borderRadius: 20,
        width: '80%',
        alignSelf:'center'
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

export default PassRequestList;