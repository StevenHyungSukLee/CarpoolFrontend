import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, ScrollView, Image, TouchableOpacity, Keyboard, FlatList} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context as FPContext} from "../context/FPContext"

const PendingRideEmpty = ({navigation}) => {
    
    const onPressRefresh = () => {
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

                <TouchableOpacity style={{alignSelf: 'flex-end', paddingRight: '5%', marginBottom: '5%'}} onPress={onPressRefresh}>
                    <FontAwesome
                        name='refresh'
                        size={25}
                        color='black'
                    />
                </TouchableOpacity>
 
                <View style={{marginTop: '50%', marginBottom: '100%'}}>
                    <Text style={{fontStyle: 'italic', fontSize: 14}}>For Drivers only: Make a request in Find Passenger</Text>
                </View>

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
        borderBottomColor: "lightgrey",
        color: "lightgrey",

    },
    pendingRide: {
        paddingTop: '10%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 5,
        fontWeight: 'bold',
        borderBottomColor: "black",
        color: "black",

    },

    container: {
        backgroundColor: 'rgba(0,0,0,0.25)',
        paddingHorizontal: '5%',
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

export default PendingRideEmpty;