import React, {useState, useContext, useEffect} from "react";
import {View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Context as FPContext } from "../context/FPContext"
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestsList from "../components/FindPassenger/FP3/RequestsList";
import { navigate } from "../navigationRef";
import Ionicons from "react-native-vector-icons/Ionicons"

const FindPassenger3Screen = () => {
    const {state} = useContext(FPContext)

    const [array, setArray] = useState([])
    // const [requestArray, setRequestArray] = useState([])
    const [time, setTime] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('time')
            .then(data => {
                setTime(data);
            })
            .catch(error => {
                console.log('AsyncStorage error:', error);
                // Handle the error here
            });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('array')
            .then(data => {
                const parsedData = JSON.parse(data);
                setArray(parsedData);
            })
            .catch(error => {
                console.log('AsyncStorage error:', error);
                // Handle the error here
            });
    }, []);

    return (
        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <View style={{flexDirection: 'row', alignSelf: 'flex-start',}}>
                    <TouchableOpacity style={{marginTop: '10%', flexDirection: 'row', marginBottom: '5%'}} onPress={() => {navigate('FindPassenger2')}}>
                        <Ionicons
                            name='ios-arrow-back'
                            size={35}
                            color='black'
                        />
                        <Text style={{fontSize: 15, fontWeight: '700', marginLeft: 5, alignSelf: 'center'}}>Go back</Text>
                    </TouchableOpacity>
            </View>
            
            <View style={styles.mainContainer}> 
                <Text style={styles.mainText}>All Requests:</Text>
                <Text style={styles.timeText}>{time}</Text>
                {array ? <RequestsList headerTime={time} array={array}/>: null}
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(152,190,196, 1)',
    },
    
    mainContainer: {
        height: '90%',
        width: '90%',
        // marginTop: '10%',
    },

    scrollContainer: {
        flexGrow: 1,
    },

    mainText: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '800',
        color: 'black',
    },

    timeText: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '800',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
    }
});

export default FindPassenger3Screen;