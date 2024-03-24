// All screens shown in the homestack.

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {HomeStackParamList} from "./types";
import HomeScreen from "../screens/homeScreen/homeScreen";
import RegPetScreen from "../screens/regPetScreen/regPetScreen";
import SettingsScreen from "../screens/settingsScreen/settingsScreen";
import PetProfileScreen from "../screens/petProfileScreen/petProfileScreen";
import UpdatePetScreen from "../screens/updatePetScreen/updatePetScreen";
import OnBoarding1 from "../screens/onBoardScreens/onBoard1";
import OnBoarding2 from "../screens/onBoardScreens/onBoard2";
import OnBoarding3 from "../screens/onBoardScreens/onBoard3";

import { useContext } from 'react';
import { NavigationContext } from "./navigationContext";

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = () => {
    const { initialScreen } = useContext(NavigationContext);

    return (
        // <Stack.Navigator>
        // initialScreen is determined in authStack 
        // based on if user is registering for the 1st time 
        // or is logging in as a preexisting user
        // the initialScreen value will be either Onboard1 or Home 
        // and so will dictate the name of the 1st screen that gets loaded on the home stack
        <Stack.Navigator initialRouteName={initialScreen as keyof HomeStackParamList}>
            <Stack.Screen
                name={"Onboard1"}
                options={{
                    // changing to allow for back button option
                    // headerShown: false,
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
                component={OnBoarding1}
            />
            <Stack.Screen
                name={"Onboard2"}
                options={{
                    headerShown: false,
                }}
                component={OnBoarding2}
            />
            <Stack.Screen
                name={"Onboard3"}
                options={{
                    headerShown: false,
                }}
                component={OnBoarding3}
            />

           <Stack.Screen 
                name={"Home"} 
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,           
                }}    
                component={HomeScreen}
            />
           {/* register pet screen */}
           <Stack.Screen 
                name={"RegPet"} 
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
                component={RegPetScreen}
            />
            {/* user clicks on the settings button in the header */}
            <Stack.Screen 
                name={"Settings"} 
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
                component={SettingsScreen}
            />
            {/* user selects pet from home screen */}
            <Stack.Screen 
                name={"PetProfile"} 
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
                component={PetProfileScreen}
            />
            {/* user selects to update pet profile from pet profile screen */}
            <Stack.Screen 
                name={"UpdatePet"}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                }}
                component={UpdatePetScreen}
            />
        </Stack.Navigator>
    )
}

export default HomeStackNavigator