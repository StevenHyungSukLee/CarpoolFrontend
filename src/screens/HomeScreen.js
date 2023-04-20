import React, { useState, useRef, useContext, useEffect } from "react";
import { View, StyleSheet, Text, PanResponder, Animated, KeyboardAvoidingView, ScrollView, LayoutAnimation, Dimensions, UIManager, TouchableOpacity } from "react-native";
import UpcomingRideEmpty from "../screens/UpcomingRideEmpty";
import UpcomingRide_Driver from "../screens/UpcomingRide_Driver";
import UpcomingRide_Passenger from '../screens/UpcomingRide_Passenger';
import RequestedRide from '../screens/RequestedRide'
import PendingRide from '../screens/PendingRide'
import PendingRideEmpty from "./PendingRideEmpty";
import BasicButton from "../components/HomeScreen/BasicButton";
import {Context as AuthContext} from "../context/AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = () => {
    const [activeScreen, setActiveScreen] = useState('upcoming');

    const pan = useRef(new Animated.ValueXY()).current;
    const [name, setName] = useState('');
    const { width, height } = Dimensions.get('window');
    const animatedValue = useRef(new Animated.Value(0)).current;

    const { state, loadProfile} = useContext(AuthContext)
    const [isDriver, setIsDriver] = useState(false)

    const onPressU = () => {
        setActiveScreen('upcoming')
        renderScreen()
    }

    useEffect(() => {
        const getData = async () => {
            await loadProfile()
            await AsyncStorage.getItem('profileInfo')
                .then(data => {
                    const parsedData = JSON.parse(data)
                    if(parsedData.isDriver === true) {
                        setIsDriver(true)
                    } 
                    
                    if (parsedData.first_name) {
                        setName(parsedData.first_name)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        };
        getData();
    }, []);


    const renderScreen = () => {
        switch (activeScreen) {
            case 'upcoming':
                if (isDriver === true) {
                    return <UpcomingRide_Driver />;
                } else {
                    return <UpcomingRide_Passenger />;
                }
            case 'requested':
                return <RequestedRide />;
            case 'pending':
                if (isDriver === true) {
                    return <PendingRide />;
                } else {
                    return <PendingRideEmpty />;
                }
            default:
                return null;
        }
    };

    const handleSlide = (direction) => {
        switch (activeScreen) {
            case 'upcoming':
                direction === 'left' ? setActiveScreen('requested') : null;
                break;
            case 'requested':
                direction === 'left' ? setActiveScreen('pending') : setActiveScreen('upcoming');
                break;
            case 'pending':
                direction === 'right' ? setActiveScreen('requested') : null;
                break;
            default:
                return null;
        }
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          pan.x = gestureState.dx;
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx < -100 && activeScreen === 'upcoming') {
            handleSlide("left");
            UIManager.setLayoutAnimationEnabledExperimental &&
              UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            pan.x = 0;
          }else if (gestureState.dx < -100 && activeScreen === 'requested') {
                handleSlide("left");
                UIManager.setLayoutAnimationEnabledExperimental &&
                  UIManager.setLayoutAnimationEnabledExperimental(true);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                pan.x = 0;
          } else if (gestureState.dx > 100 && activeScreen === 'requested') {
            handleSlide("right");
            UIManager.setLayoutAnimationEnabledExperimental &&
              UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            pan.x = 0;
          } 
          else if (gestureState.dx > 100 && activeScreen === 'pending') {
            handleSlide("right");
            UIManager.setLayoutAnimationEnabledExperimental &&
              UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            pan.x = 0;
          } else {
            UIManager.setLayoutAnimationEnabledExperimental &&
              UIManager.setLayoutAnimationEnabledExperimental(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            pan.x = 0;
          }
        },
    });
    return (

        <KeyboardAvoidingView style={styles.rootContainer} behavior='height'>
            <View style={{height: '100%', width: '90%'}}>
                <View style={styles.titleContainer }>
                    <Text style={styles.Title}> Welcome, {name}!</Text>
                </View>

                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
                        <Animated.View
                            style={[styles.screen, { transform: [{ translateX: pan.x }] },
                            { flex: 1 }, ]}
                            {...panResponder.panHandlers}
                        >
                        {renderScreen()}
                        </Animated.View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        borderRadius: 20,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(152,190,196, 1)'
    },

    wrapper: {
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        width: '95%',
        height: '80%', 
    },

    Title: {
        borderColor: 'black',
        alignItem: 'center',
        justifyContent: 'center',
        fontSize: 35,
        paddingTop: '10%',
        color: "white",
        fontWeight: 'bold',
        
    },
    titleContainer: {
        paddingTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '5%',


    },
});

export default HomeScreen;