import React, {useState, useContext, useEffect} from "react";
import {View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ScrollView, TouchableOpacity} from "react-native";
import BaseContainer from "./BaseContainer"
import { Context as FPContext } from "../../context/FPContext"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Timeslot = () => {

    const [dict, setDict] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('dictionary')
            .then(data => {
                const parsedData = JSON.parse(data);
                setDict(parsedData);
            })
            .catch(error => console.log('AsyncStorage error:', error));
    }, []);
    
    
    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.mainContainer}>
                <BaseContainer
                    time='12:00AM - 12:30AM'
                    numRequests={dict['12:00AM - 12:30AM']}
                />
                <BaseContainer
                    time='12:30AM - 01:00AM'
                    numRequests={dict['12:30AM - 01:00AM']}
                />
                <BaseContainer
                    time='01:00AM - 01:30AM'
                    numRequests={dict['01:00AM - 01:30AM']}
                />
                <BaseContainer
                    time='01:30AM - 02:00AM'
                    numRequests={dict['01:30AM - 02:00AM']}
                />
                <BaseContainer
                    time='02:00AM - 02:30AM'
                    numRequests={dict['02:00AM - 02:30AM']}
                />
                <BaseContainer
                    time='02:30AM - 03:00AM'
                    numRequests={dict['02:30AM - 03:00AM']}
                />
                <BaseContainer
                    time='03:00AM - 03:30AM'
                    numRequests={dict['03:00AM - 03:30AM']}
                />
                <BaseContainer
                    time='03:30AM - 04:00AM'
                    numRequests={dict['03:30AM - 04:00AM']}
                />
                <BaseContainer
                    time='04:00AM - 04:30AM'
                    numRequests={dict['04:00AM - 04:30AM']}
                />
                <BaseContainer
                    time='04:30AM - 05:00AM'
                    numRequests={dict['04:30AM - 05:00AM']}
                />
                <BaseContainer
                    time='05:00AM - 05:30AM'
                    numRequests={dict['05:00AM - 05:30AM']}
                />
                <BaseContainer
                    time='05:30AM - 06:00AM'
                    numRequests={dict['05:30AM - 06:00AM']}
                />
                <BaseContainer
                    time='06:00AM - 06:30AM'
                    numRequests={dict['06:00AM - 06:30AM']}
                />
                <BaseContainer
                    time='06:30AM - 07:00AM'
                    numRequests={dict['06:30AM - 07:00AM']}
                />
                <BaseContainer
                    time='07:00AM - 07:30AM'
                    numRequests={dict['07:00AM - 07:30AM']}
                />
                <BaseContainer
                    time='07:30AM - 08:00AM'
                    numRequests={dict['07:30AM - 08:00AM']}
                />
                <BaseContainer
                    time='08:00AM - 08:30AM'
                    numRequests={dict['08:00AM - 08:30AM']}
                />
                <BaseContainer
                    time='08:30AM - 09:00AM'
                    numRequests={dict['08:30AM - 09:00AM']}
                />
                <BaseContainer
                    time='09:00AM - 09:30AM'
                    numRequests={dict['09:00AM - 09:30AM']}
                />
                <BaseContainer
                    time='09:30AM - 10:00AM'
                    numRequests={dict['09:30AM - 10:00AM']}
                />
                <BaseContainer
                    time='10:00AM - 10:30AM'
                    numRequests={dict['10:00AM - 10:30AM']}
                />
                <BaseContainer
                    time='10:30AM - 11:00AM'
                    numRequests={dict['10:30AM - 11:00AM']}
                />
                <BaseContainer
                    time='11:00AM - 11:30AM'
                    numRequests={dict['11:00AM - 11:30AM']}
                />
                <BaseContainer
                    time='11:30AM - 12:00PM'
                    numRequests={dict['11:30AM - 12:00PM']}
                />
                <BaseContainer
                    time='12:00PM - 12:30PM'
                    numRequests={dict['12:00PM - 12:30PM']}
                />
                <BaseContainer
                    time='12:30PM - 01:00PM'
                    numRequests={dict['12:30PM - 01:00PM']}
                />
                <BaseContainer
                    time='01:00PM - 01:30PM'
                    numRequests={dict['01:00PM - 01:30PM']}
                />
                <BaseContainer
                    time='01:30PM - 02:00PM'
                    numRequests={dict['01:30PM - 02:00PM']}
                />
                <BaseContainer
                    time='02:00PM - 02:30PM'
                    numRequests={dict['02:00PM - 02:30PM']}
                />
                <BaseContainer
                    time='02:30PM - 03:00PM'
                    numRequests={dict['02:30PM - 03:00PM']}
                />
                <BaseContainer
                    time='03:00PM - 03:30PM'
                    numRequests={dict['03:00PM - 03:30PM']}
                />
                <BaseContainer
                    time='03:30PM - 04:00PM'
                    numRequests={dict['03:30PM - 04:00PM']}
                />
                <BaseContainer
                    time='04:00PM - 04:30PM'
                    numRequests={dict['04:00PM - 04:30PM']}
                />
                <BaseContainer
                    time='04:30PM - 05:00PM'
                    numRequests={dict['04:30PM - 05:00PM']}
                />
                <BaseContainer
                    time='05:00PM - 05:30PM'
                    numRequests={dict['05:00PM - 05:30PM']}
                />
                <BaseContainer
                    time='05:30PM - 06:00PM'
                    numRequests={dict['05:30PM - 06:00PM']}
                />
                <BaseContainer
                    time='06:00PM - 06:30PM'
                    numRequests={dict['06:00PM - 06:30PM']}
                />
                <BaseContainer
                    time='06:30PM - 07:00PM'
                    numRequests={dict['06:30PM - 07:00PM']}
                />
                <BaseContainer
                    time='07:00PM - 07:30PM'
                    numRequests={dict['07:00PM - 07:30PM']}
                />
                <BaseContainer
                    time='07:30PM - 08:00PM'
                    numRequests={dict['07:30PM - 08:00PM']}
                />
                <BaseContainer
                    time='08:00PM - 08:30PM'
                    numRequests={dict['08:00PM - 08:30PM']}
                />
                <BaseContainer
                    time='08:30PM - 09:00PM'
                    numRequests={dict['08:30PM - 09:00PM']}
                />
                <BaseContainer
                    time='09:00PM - 09:30PM'
                    numRequests={dict['09:00PM - 09:30PM']}
                />
                <BaseContainer
                    time='09:30PM - 10:00PM'
                    numRequests={dict['09:30PM - 10:00PM']}
                />
                <BaseContainer
                    time='10:00PM - 10:30PM'
                    numRequests={dict['10:00PM - 10:30PM']}
                />
                <BaseContainer
                    time='10:30PM - 11:00PM'
                    numRequests={dict['10:30PM - 11:00PM']}
                />
                <BaseContainer
                    time='11:00PM - 11:30PM'
                    numRequests={dict['11:00PM - 11:30PM']}
                />
                <BaseContainer
                    time='11:30PM - 11:59PM'
                    numRequests={dict['11:30PM - 12:00AM']}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },

    mainContainer: {
        height: '100%'
        
    }
})

export default Timeslot