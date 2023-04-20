import React, { useContext, useState } from "react";
import createDataContext from "./createDataContext";
import carpoolApi from "../api/carpool"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const FPReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'postPassRequest':
            return {findDriverRequestInfo: action.payload}
        case 'loadTimeslot':
            return {timeslotInfo: action.payload}
        case 'getSelectedRequest':
            return {selectedRequestInfo: action.payload}
        case 'getMaxPrice':
            return {maxPrice: action.payload}
        case 'postDriverRequest':
            return {findPassengerRequestInfo: action.payload}
        default:
            return state
    }
}

// used in the findDriver screen

const postPassRequest = (dispatch) => async({from, to, location, destination, numPeople}) => { 

    const token = await AsyncStorage.getItem('token')

    const passRequestInfo = {
        // CHANGE TO ARMY TIME for from and to 4 digits
        from: from,
        to: to,
        pick_up: location,
        destination: destination,
        num_of_pass: numPeople,
    }


    try {
        const response = await carpoolApi.post('/api/findDriver/', passRequestInfo, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        

        dispatch({type:'add_error', payload: ''})

        navigate('Home')

    } catch (error) {
        const message = error.response.data.error
        dispatch({type: 'add_error', payload: message})
    }
}

// used in the timeslot buttons at FindPassengerScreen1
// data will be dictionary[time:numRequests]
let loadTimeslotInfo = null
const loadTimeslot = (dispatch) => async({currentLocation,finalDestination, maxCap}) => {
    
    const token = await AsyncStorage.getItem('token')

    loadTimeslotInfo = {
        max_capacity: maxCap,
        driver_current: currentLocation,
        driver_dest: finalDestination,
    }
    
    try {
        const response = await carpoolApi.post('/api/findDriver/count/', loadTimeslotInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        dispatch({type:'add_error', payload: ''})

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('dictionary', stringData)

        navigate('FindPassenger2')

    } catch (error) {
        const message = error.response.data.error
        dispatch({type: 'add_error', payload: message})
    }
}

// used to load all individual requests for FindPassengerScreen2
// get_Requested_Rides
const getSelectedRequest = (dispatch) => async({inputTime}) => {
    
    const token = await AsyncStorage.getItem('token')

    const getSelectedRequestInfo = {
        max_capacity: loadTimeslotInfo.max_capacity,
        driver_current: loadTimeslotInfo.driver_current,
        driver_dest: loadTimeslotInfo.driver_dest,
        time_interval: inputTime,
    }
    
    try {
        const response = await carpoolApi.post('/api/findDriver/get/', getSelectedRequestInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        dispatch({type:'add_error', payload: ''})


        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('array', stringData)

        navigate('FindPassenger3')

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

// used to post the driver's request in FindPassengerScreen2
// request_to_pass
    // use the json file object from get_Requested_Rides get API route to post, including price and rideTime
const postDriverRequest = (dispatch) => async({findDriver_id, pick_up, pass_dest, driver_current, driver_dest, max_price, min_price, additional_time, price, time_of_pickup}) => {
    const token = await AsyncStorage.getItem('token')
    
    const driverRequestInfo = {
        findDriver_id,
        pick_up,
        pass_dest,
        driver_current,
        driver_dest,
        max_price,
        min_price,
        additional_time,
        price,
        time_of_pickup
    }


    try {
        const response = await carpoolApi.post('/api/requests_to_pass/', driverRequestInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        dispatch({type:'add_error', payload: ''})

        navigate('Home')


    } catch (error) {
        const message = error.response.data.error
        console.log(message)
        dispatch({type: 'add_error', payload: message})
    }
}

// requested rides loading
const loadPassRequest = (dispatch) => async() => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.get('/api/findDriver/pending', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('passRequestData', stringData)

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

// delete individual requested rides
const deletePassRequest = (dispatch) => async({input}) => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.delete(`/api/findDriver/${input}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

// loading Pending Ride
const loadDriverRequest = (dispatch) => async() => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.get('/api/requests_to_pass/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('driverRequestData', stringData)

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

// deleting individual Pending Ride
const deleteDriverRequest = (dispatch) => async({input}) => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.delete(`/api/requests_to_pass/${input}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

const SAGpost = (dispatch) => async({item}) => {
    
    const token = await AsyncStorage.getItem('token')

    const SAGpostInfo = {
        price: item.price,
        driver_id: item.driver_id, 
        passenger_id: item.passenger_id, 
        time_of_arrival: item.time_of_arrival, 
        time_of_pickup: item.time_of_pickup,
        pick_up: item.pick_up,
        pass_dest: item.pass_dest,
        additional_time: item.additional_time,
    }
    
    try {
        const response = await carpoolApi.post('/api/transaction/', SAGpostInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        // console.log('response: ', response.data)

        navigate('HomeNavigator1')
        navigate('HomeNavigator2')
        

    } catch (error) {
        const message = error.response.data
        console.log(message)
    }
}

const loadTransaction = (dispatch) => async() => {
    
    const token = await AsyncStorage.getItem('token')

    try {
        const response = await carpoolApi.get('/api/transaction/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('upcomingRideData', stringData)

    } catch (error) {
        const message = error.response
        console.log(message)
    }
}

const patchTransaction = (dispatch) => async ({ _id, isVerified, isCancelled, reason }) => {
    const token = await AsyncStorage.getItem('token')
    
    var body = {};
  
    if (isVerified) {
        body = { isVerified };
    } else {
        body = { isCancelled, cancel_reason: reason };
    }
  
    try {
        const response = await carpoolApi.patch(`/api/transaction/${_id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        await AsyncStorage.setItem('cancel', '')


    } catch (error) {
        const message = error.response;
        await AsyncStorage.setItem('cancel', 'Transaction canceled by the other user.')
        console.log("Patch error:",message);
    }
};

const postRideHistory = (dispatch) => async({info}) => {
    
    const token = await AsyncStorage.getItem('token')

    const postInfo = {
        price: info.price, 
        driver_id: info.driver_id, 
        passenger_id: info.passenger_id, 
        time_of_arrival: info.time_of_arrival, 
        time_of_pickup: info.time_of_pickup, 
        pick_up: info.pick_up, 
        pass_dest: info.pass_dest,
        additional_time: info.additional_time,
        code: info.code, 
        isVerified: info.isVerified, 
        isCancelled: info.isCancelled, 
        cancel_reason: info.cancel_reason,
    }
    
    try {
        const response = await carpoolApi.post('/api/past_rides/', postInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

    } catch (error) {
        const message = error.response
        console.log(message)
    }
}
  
const deleteTransaction = (dispatch) => async ({ _id }) => {
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.delete(`/api/transaction/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    } catch (error) {
        const message = error.response;
        console.log(message);
    }
};


const deleteAllDriverRequest = (dispatch) => async({info}) => {
    
    const token = await AsyncStorage.getItem('token')
    
    const body = {
        user: info
    }
    
    try {
        const response = await carpoolApi.post('/api/requests_to_pass/delete/', body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

    } catch (error) {
        const message = error.response.data.error
    }
}

const deleteAllPassRequest = (dispatch) => async({info}) => {
    
    const token = await AsyncStorage.getItem('token')

    const body = {
        user: info
    }
    
    try {
        const response = await carpoolApi.post('/api/findDriver/delete/', body, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

const getHistoryPass = (dispatch) => async() => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.get('/api/past_rides/passenger/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('historyPassData', stringData)
        
    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

const getHistoryDriver = (dispatch) => async() => {
    
    const token = await AsyncStorage.getItem('token')
    
    try {
        const response = await carpoolApi.get('/api/past_rides/driver/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })

        const stringData = JSON.stringify(response.data)
        await AsyncStorage.setItem('historyDriverData', stringData)
        
    } catch (error) {
        const message = error.response.data.error
        console.log(message)
    }
}

export const { Provider, Context } = createDataContext(
    FPReducer,
    {postPassRequest, loadTimeslot, getSelectedRequest, postDriverRequest, loadPassRequest, loadDriverRequest, deleteDriverRequest, deletePassRequest, SAGpost, loadTransaction, patchTransaction, postRideHistory, deleteTransaction, deleteAllDriverRequest, deleteAllPassRequest, getHistoryPass, getHistoryDriver}, // object with all action functions included
    {errorMessage: '', findDriverRequestInfo: {}, timeslotInfo: {}, selectedRequestInfo: {}, maxPrice: 0, findPassengerRequestInfo: {}, timeslotRequestInfo: {}} // initial state of variables
)