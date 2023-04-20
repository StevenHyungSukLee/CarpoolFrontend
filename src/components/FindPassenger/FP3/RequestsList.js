import React, {useState, useContext} from "react";
import {View, StyleSheet, Text, FlatList, KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, Alert} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { Context as FPContext } from "../../../context/FPContext"
    

const RequestsList = ({headerTime, array}) => {
    const {state, postDriverRequest} = useContext(FPContext)

    const [expandedIndex, setExpandedIndex] = useState(-1);
    
    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? -1 : index);
    };
    
    const [selectedPrice, setSelectedPrice] = useState('');
    const [time, setTime] = useState('');


    function timeArray() {
        if (headerTime === '12:00AM - 12:30AM') {
            return ['12:00 AM', '12:10 AM', '12:20 AM', '12:30 AM'];
        } else if (headerTime === '12:30AM - 01:00AM') {
            return ['12:30 AM', '12:40 AM', '12:50 AM', '01:00 AM'];
        } else if (headerTime === '01:00AM - 01:30AM') {
            return ['01:00 AM', '01:10 AM', '01:20 AM', '01:30 AM'];
        } else if (headerTime === '01:30AM - 02:00AM') {
            return ['01:30 AM', '01:40 AM', '01:50 AM', '02:00 AM'];
        } else if (headerTime === '02:00AM - 02:30AM') {
            return ['02:00 AM', '02:10 AM', '02:20 AM', '02:30 AM'];
        } else if (headerTime === '02:30AM - 03:00AM') {
            return ['02:30 AM', '02:40 AM', '02:50 AM', '03:00 AM'];
        } else if (headerTime === '03:00AM - 03:30AM') {
            return ['03:00 AM', '03:10 AM', '03:20 AM', '03:30 AM'];
        } else if (headerTime === '03:30AM - 04:00AM') {
            return ['03:30 AM', '03:40 AM', '03:50 AM', '04:00 AM'];
        } else if (headerTime === '04:00AM - 04:30AM') {
            return ['04:00 AM', '04:10 AM', '04:20 AM', '04:30 AM'];
        } else if (headerTime === '04:30AM - 05:00AM') {
            return ['04:30 AM', '04:40 AM', '04:50 AM', '05:00 AM'];
        } else if (headerTime === '05:00AM - 05:30AM') {
            return ['05:00 AM', '05:10 AM', '05:20 AM', '05:30 AM'];
        } else if (headerTime === '05:30AM - 06:00AM') {
            return ['05:30 AM', '05:40 AM', '05:50 AM', '06:00 AM'];
        } else if (headerTime === '06:00AM - 06:30AM') {
            return ['06:00 AM', '06:10 AM', '06:20 AM', '06:30 AM'];
        } else if (headerTime === '06:30AM - 07:00AM') {
            return ['06:30 AM', '06:40 AM', '06:50 AM', '07:00 AM'];
        } else if (headerTime === '07:00AM - 07:30AM') {
            return ['07:00 AM', '07:10 AM', '07:20 AM', '07:30 AM'];
        } else if (headerTime === '07:30AM - 08:00AM') {
            return ['07:30 AM', '07:40 AM', '07:50 AM', '08:00 AM'];
        } else if (headerTime === '08:00AM - 08:30AM') {
            return ['08:00 AM', '08:10 AM', '08:20 AM', '08:30 AM'];
        } else if (headerTime === '08:30AM - 09:00AM') {
            return ['08:30 AM', '08:40 AM', '08:50 AM', '09:00 AM'];
        } else if (headerTime === '09:00AM - 09:30AM') {
            return ['09:00 AM', '09:10 AM', '09:20 AM', '09:30 AM'];
        } else if (headerTime === '09:30AM - 10:00AM') {
            return ['09:30 AM', '09:40 AM', '09:50 AM', '10:00 AM'];
        } else if (headerTime === '10:00AM - 10:30AM') {
            return ['10:00 AM', '10:10 AM', '10:20 AM', '10:30 AM'];
        } else if (headerTime === '10:30AM - 11:00AM') {
            return ['10:30 AM', '10:40 AM', '10:50 AM', '11:00 AM'];
        } else if (headerTime === '11:00AM - 11:30AM') {
            return ['11:00 AM', '11:10 AM', '11:20 AM', '11:30 AM'];
        } else if (headerTime === '11:30AM - 12:00PM') {
            return ['11:30 AM', '11:40 AM', '11:50 AM', '12:00 PM'];
        } else if (headerTime === '12:00PM - 12:30PM') {
            return ['12:00 PM', '12:10 PM', '12:20 PM', '12:30 PM'];
        } else if (headerTime === '12:30PM - 01:00PM') {
            return ['12:30 PM', '12:40 PM', '12:50 PM', '01:00 PM'];
        } else if (headerTime === '01:00PM - 01:30PM') {
            return ['01:00 PM', '01:10 PM', '01:20 PM', '01:30 PM'];
        } else if (headerTime === '01:30PM - 02:00PM') {
            return ['01:30 PM', '01:40 PM', '01:50 PM', '02:00 PM'];
        } else if (headerTime === '02:00PM - 02:30PM') {
            return ['02:00 PM', '02:10 PM', '02:20 PM', '02:30 PM'];
        } else if (headerTime === '02:30PM - 03:00PM') {
            return ['02:30 PM', '02:40 PM', '02:50 PM', '03:00 PM'];
        } else if (headerTime === '03:00PM - 03:30PM') {
            return ['03:00 PM', '03:10 PM', '03:20 PM', '03:30 PM'];
        } else if (headerTime === '03:30PM - 04:00PM') {
            return ['03:30 PM', '03:40 PM', '03:50 PM', '04:00 PM'];
        } else if (headerTime === '04:00PM - 04:30PM') {
            return ['04:00 PM', '04:10 PM', '04:20 PM', '04:30 PM'];
        } else if (headerTime === '04:30PM - 05:00PM') {
            return ['04:30 PM', '04:40 PM', '04:50 PM', '05:00 PM'];
        } else if (headerTime === '05:00PM - 05:30PM') {
            return ['05:00 PM', '05:10 PM', '05:20 PM', '05:30 PM'];
        } else if (headerTime === '05:30PM - 06:00PM') {
            return ['05:30 PM', '05:40 PM', '05:50 PM', '06:00 PM'];
        } else if (headerTime === '06:00PM - 06:30PM') {
            return ['06:00 PM', '06:10 PM', '06:20 PM', '06:30 PM'];
        } else if (headerTime === '06:30PM - 07:00PM') {
            return ['06:30 PM', '06:40 PM', '06:50 PM', '07:00 PM'];
        } else if (headerTime === '07:00PM - 07:30PM') {
            return ['07:00 PM', '07:10 PM', '07:20 PM', '07:30 PM'];
        } else if (headerTime === '07:30PM - 08:00PM') {
            return ['07:30 PM', '07:40 PM', '07:50 PM', '08:00 PM'];
        } else if (headerTime === '08:00PM - 08:30PM') {
            return ['08:00 PM', '08:10 PM', '08:20 PM', '08:30 PM'];
        } else if (headerTime === '08:30PM - 09:00PM') {
            return ['08:30 PM', '08:40 PM', '08:50 PM', '09:00 PM'];
        } else if (headerTime === '09:00PM - 09:30PM') {
            return ['09:00 PM', '09:10 PM', '09:20 PM', '09:30 PM'];
        } else if (headerTime === '09:30PM - 10:00PM') {
            return ['09:30 PM', '09:40 PM', '09:50 PM', '10:00 PM'];
        } else if (headerTime === '10:00PM - 10:30PM') {
            return ['10:00 PM', '10:10 PM', '10:20 PM', '10:30 PM'];
        } else if (headerTime === '10:30PM - 11:00PM') {
            return ['10:30 PM', '10:40 PM', '10:50 PM', '11:00 PM'];
        } else if (headerTime === '11:00PM - 11:30PM') {
            return ['11:00 PM', '11:10 PM', '11:20 PM', '11:30 PM'];
        } else if (headerTime === '11:30PM - 11:59PM') {
            return ['11:30 PM', '11:40 PM', '11:50 PM', '11:59 PM'];
        }
    }

    function shortenAddress(str) {
        return str
    }
      

    const onPressedSubmit = async () => {
        
        const findDriver_id = array[expandedIndex].findDriver_id
        const pick_up = array[expandedIndex].pick_up
        const pass_dest = array[expandedIndex].pass_dest
        const driver_current = array[expandedIndex].driver_current
        const driver_dest = array[expandedIndex].driver_dest
        const max_price = array[expandedIndex].max_price
        const min_price = array[expandedIndex].min_price
        const additional_time = array[expandedIndex].additional_time
        const price = parseFloat(selectedPrice)
        
        function convertToMilitaryTime(timeStr) {
            // Parse the time string into hours, minutes, and meridian (AM/PM)
            const timeArr = timeStr.split(' ');
            const [hours, minutes] = timeArr[0].split(':').map(numStr => parseInt(numStr));
            const meridian = timeArr[1];
          
            // Convert the hours to 24-hour format
            let militaryHours = hours;
            if (meridian === 'PM' && hours !== 12) {
              militaryHours += 12;
            } else if (meridian === 'AM' && hours === 12) {
              militaryHours = 0;
            }
          
            // Format the military time as a 4-digit integer (e.g. 0945, 1830)
            const militaryTime = militaryHours.toString().padStart(2, '0') + minutes.toString().padStart(2, '0');
            return parseInt(militaryTime);
        }
        
        const time_of_pickup = convertToMilitaryTime(time)

        
        postDriverRequest({findDriver_id, pick_up, pass_dest, driver_current, driver_dest, max_price, min_price, additional_time, price, time_of_pickup})
    
    }

    return (
        <FlatList
            data={array}
            renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                    <View style={styles.container}>
                        <Text style={styles.text}>Pick up location:</Text>
                        <Text style={styles.infoText}>{shortenAddress(item.pick_up)}</Text>
                        <Text style={styles.text}>Passenger destination:</Text>
                        <Text style={styles.infoText}>{shortenAddress(item.pass_dest)}</Text>
                        <Text style={styles.text}>
                            <Text style={styles.text}>Price Range: </Text>
                            <Text style={styles.infoText}>${item.min_price} - ${item.max_price}</Text>
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.text}>Additional Time: </Text>
                            <Text style={styles.infoText}>{item.additional_time} min</Text>
                        </Text>
                        {expandedIndex === index && (
                            <>
                                <View style={styles.inputContainer}>
                                    <FontAwesome name='dollar' size={32} color='black' />
                                    <TextInput
                                        style={styles.priceInput}
                                        maxLength={5}
                                        textAlign='center'
                                        placeholder="Price"
                                        placeholderTextColor={'rgba(0,0,0, 1)'}
                                        value={selectedPrice}
                                        onChangeText={text => setSelectedPrice(text)}
                                        keyboardType={'numeric'}
                                    />
                        
                                    <FontAwesome name='clock-o' size={36} color='black' />
                                    <SelectDropdown
                                        data={timeArray()}
                                        defaultButtonText='Time'
                                        buttonStyle={styles.dropdownInput}
                                        buttonTextStyle={{fontSize: 20}}
                                        dropdownStyle={{borderRadius: 5 }}
                                        onSelect={(selectedItem, index) => {
                                            setTime(selectedItem)
                                        }}
                                        buttonTextAfterSelection={(selectedItem, index) => {
                                            return selectedItem
                                        }}
                                    />
                        
                                    <TouchableOpacity onPress={onPressedSubmit}>
                                        <View style={styles.button}>
                                            <Text style={{ fontSize: 20, color: 'rgba(0,0,0,0,1)' }}>Submit</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {state.errorMessage && (
                                    <View style={{ marginTop: 5, flexDirection: "column" }}>
                                        <Text style={styles.errorMessage}>Error: {state.errorMessage}</Text>
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    );
      
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
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
        justifyContent: "space-between",
    },

    priceInput: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 5,
        marginHorizontal: 5,
        height: 50,
        width: "20%",
        backgroundColor:'rgba(255,255,255, 0.5)',
        fontSize: 20,
    },

    dropdownInput: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 5,
        marginRight: 5,
        height: 50,
        width: "35%",
        backgroundColor: 'rgba(255,255,255, 0.6)',
    },

    button: {
        borderWidth: 2,
        borderColor: "#ccc",
        backgroundColor: "rgba(255,255,255,1)",
        marginLeft: 5,
        borderRadius: 5,
        height: 50,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center'
    },

    errorMessage: {
        fontSize: 18,
        fontWeight: '700',
        color: 'rgba(255,0,0,0.7)',
        marginTop: 5,
        textAlign: 'center'
    }
    
});

export default RequestsList;