// this is the main application file that connects all display screens together based on application logic

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import InitialScreen from './src/screens/InitialScreen'
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ResetPasswordVerifyScreen from './src/screens/ResetPasswordVerifyScreen';
import ResetPasswordResetScreen from './src/screens/ResetPasswordResetScreen';
import HomeScreen from './src/screens/HomeScreen';
import SeeAllSuggestions from './src/screens/SeeAllSuggestions';
import UpcomingRide_Passenger from './src/screens/UpcomingRide_Passenger';
import UpcomingRide_Driver from './src/screens/UpcomingRide_Driver';
import UpcomingRideEmpty from './src/screens/UpcomingRideEmpty';
import PendingRide from './src/screens/PendingRide';
import PendingRideEmpty from './src/screens/PendingRideEmpty'
import RequestedRide from './src/screens/RequestedRide';
import RequestedRideEmpty from './src/screens/RequestedRideEmpty';
import FindDriverScreen_DepartHome from './src/screens/FindDriverScreen_DepartHome';
import FindDriverScreen_DepartSchool from './src/screens/FindDriverScreen_DepartSchool';
import FindPassenger1Screen from './src/screens/FindPassenger1Screen';
import FindPassenger2Screen from './src/screens/FindPassenger2Screen';
import FindPassenger3Screen from './src/screens/FindPassenger3Screen';
import Profile_Passenger from './src/screens/Profile_Passenger';
import Profile_Driver from './src/screens/Profile_Driver';
import Profile_BecomeDriver from './src/screens/Profile_BecomeDriver';
import ChangePassword1D from './src/screens/ChangePassword1D';
import ChangePassword1P from './src/screens/ChangePassword1P';
import ChangePassword2 from './src/screens/ChangePassword2';
import RideHistory_Passenger from './src/screens/RideHistory_Passenger'
import RideHistory_Driver from './src/screens/RideHistory_Driver'
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as FPProvider} from './src/context/FPContext'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setNavigator } from './src/navigationRef';
import SetDepartingScreen from './src/screens/SetDepartingScreen';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeNavigator1 = createStackNavigator({
    Home: HomeScreen,
    SAG: SeeAllSuggestions,
} , {headerMode: "none"}
)

const HomeNavigator2 = createStackNavigator({
    Home: HomeScreen,
    SAG: SeeAllSuggestions,
} , {headerMode: "none"}
)

const HomeNavigator = createSwitchNavigator({
    HomeNavigator1,
    HomeNavigator2,
},
)

const FindDriverNavigator = createStackNavigator({
    SetDepart: SetDepartingScreen,
    FindDriverS: FindDriverScreen_DepartSchool,
    FindDriverH: FindDriverScreen_DepartHome,
}, {headerMode: "none"}
)

const FindPassengerNavigator = createStackNavigator({
    FindPassenger1: FindPassenger1Screen,
    FindPassenger2: FindPassenger2Screen,
    FindPassenger3: FindPassenger3Screen,
}, { headerMode: "none" }
)

const ProfilePassengerStack = createStackNavigator({
    Pprofile: Profile_Passenger,
    RideHistory: RideHistory_Passenger,
    BecomeDriver: Profile_BecomeDriver,
    ChangePassword1: ChangePassword1P,
    ChangePassword2: ChangePassword2,
}, { headerMode: "none" });

const ProfileDriverStack = createStackNavigator({
    Dprofile: Profile_Driver,
    RideHistory: RideHistory_Driver,
    ChangePassword1: ChangePassword1D,
    ChangePassword2: ChangePassword2,
}, { headerMode: 'none',});

const ProfileNavigator = createSwitchNavigator(
    {
        ProfilePassenger: ProfilePassengerStack,
        ProfileDriver: ProfileDriverStack,
    },
);

const switchNavigator = createSwitchNavigator({
    Initial: InitialScreen,

    loginFlow: createStackNavigator({
        Signin: SigninScreen,
        Signup: SignupScreen,
        ResetPasswordVerify: ResetPasswordVerifyScreen,
        ResetPasswordReset: ResetPasswordResetScreen

    }, { headerMode: "none" } // this will hide the header in the stackNavigator
    ),

    mainFlow: createMaterialBottomTabNavigator(
        {
            HomeFlow: {
                screen: HomeNavigator,
                navigationOptions: {
                    title: 'Home',
                    tabBarIcon: <Ionicons name= 'home-outline' size= {26} color= 'black'/>,
                },
            },

            FindDriverFlow: {
                screen: FindDriverNavigator,
                navigationOptions: {
                    title: 'Find Driver',
                    tabBarIcon: <Ionicons name= 'car-outline' size= {35} color= 'black'/>
                }
            },

            FindPassengerFlow: {
                screen: FindPassengerNavigator,
                navigationOptions: {
                    title: 'Find Passenger',
                    tabBarIcon: <FontAwesome name= 'handshake-o' size= {26} color= 'black'/>
                }
            },

            ProfileFlow: {
                screen: ProfileNavigator,
                navigationOptions: {
                    title: 'Profile',
                    tabBarIcon: <Ionicons name= 'md-person-circle-outline' size= {30} color= 'black'/>
                }
            },
        },
        
    )
})

const App = createAppContainer(switchNavigator)


export default () => {
    return (
        <SafeAreaProvider>
            <AuthProvider>
             <FPProvider>
                <App ref={(navigator)=> {setNavigator(navigator)}}/>
             </FPProvider>
            </AuthProvider>
        </SafeAreaProvider>
    )
};

