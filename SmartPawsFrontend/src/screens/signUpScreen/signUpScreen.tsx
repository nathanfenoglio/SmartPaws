import { Box, Text } from "../../utils/theme/style";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "../../navigation/types";
import { Pressable, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import SafeAreaWrapper from "../../components/shared/safeAreaWrapper";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "../../types";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import { FIREBASE_AUTH } from "../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axiosInstance from "../../services/config";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>()
    const navigateToSignInScreen = () => {
        navigation.navigate("SignIn")
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>({
        defaultValues: {
            email: "",
            password: "",
            name: "", // Add name in default values
        },
    })

    const onSubmit = async (data: IUser) => {
        try {
            const { email, name, password } = data;
            /**
             * register user
             */
            await signUpWithEmailAndPassword(email, password, name);
            // navigateToSignInScreen() // Removed to avoid navigation until user is registered in MongoDB
        } catch (error) {
            console.log("Error here on submit", error);
        }
    }

    return (
        <SafeAreaWrapper>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                    colors={[
                        "#43B2BD",
                        "#EEEEEE",
                        "#EEEEEE",
                        "#EEEEEE",
                        "#EEEEEE",
                        "#43B2BD",
                    ]}
                    style={{ flex: 1 }}
                >
                <Box flex={1} px="5.5" mt={"13"}>
                    <Text variant="textLg" color="neutral700" fontWeight="700" mb="10">
                        
                    </Text>

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter your name..."
                                error={errors.name}
                            />
                        )}
                        name="name"
                    />
                    <Box mb="6" />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter your email..."
                                error={errors.email}
                            />
                        )}
                        name="email"
                    />
                    <Box mb="6" />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="Enter your password..."
                                error={errors.password}
                                secureTextEntry
                            />
                        )}
                        name="password"
                    />
                    <Box mt="5.5" />
                    <Pressable onPress={navigateToSignInScreen}>
                        <Text color="primary" textAlign="right">
                            Already have an account? Sign in
                        </Text>
                    </Pressable>
                    <Box mb="5.5" />

                    <Button label="Register" onPress={handleSubmit(onSubmit)} uppercase />
                    </Box>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </SafeAreaWrapper>
    )
}


// Uses values provided by user then creates the user with email and password in Firebase.
const signUpWithEmailAndPassword = async (email: string, password: string, name: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        // Signed in
        const user = userCredential.user;
        console.log('User logged in:', user);

        // Update the user's profile with their name
         await updateProfile(user, {
            displayName: name
        });
        console.log("User's display name updated:", name);

        // Save user to MongoDB
         await registerUserMongoDB(name, email, user.uid, password);
        console.log("User registered to MongoDB");
        // Navigate to the next screen after successful login
    } catch (error) {
        console.error('Error signing in or updating profile:', error);
        // Handle error, maybe show a message to the user
    }
}
// Takes UID provided by firebase API then hits backend API to store information in MongoDB database.
const registerUserMongoDB = async (name: string, email: string, uid: string, password: string) => {
    try {
        const response = await axiosInstance.post("user/create", {
            email,
            password,
            uid,
            name,
        });
        return response.data.user;
    } catch (error) {
        console.log("error in registerUser", error);
        throw error;
    }
}
;

export default SignUpScreen;
