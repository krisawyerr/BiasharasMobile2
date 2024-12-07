import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { signIn, signUp } from '../utils/firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native'; // Add this import
import CustomInput from './CustomInput';
import { useTheme } from '../context/ThemeContext';
import { dark, light } from '../data/colors';
import { createUser, getUser } from '../utils/firebase/users';

export default function AuthPage() {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [credentials, setCredentials] = useState<string>('');
    const [confirmCredentials, setConfirmCredentials] = useState<string>('');
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const { setUser } = useAuth();
    const navigation = useNavigation();
    const { theme } = useTheme();
    const colorTheme = theme === "light" ? light : dark;

    const handleSignUp = async () => {
        try {
            await signUp(email, credentials);
            if (auth.currentUser) {
                const userDetails = await createUser(auth.currentUser.uid, {
                    uid: auth.currentUser.uid,
                    fullName: fullName,
                    email: email,
                    dateCreated: new Date()
                })
                setUser(userDetails![0]);
            }
            navigation.navigate('(home)');
        } catch (error) {
            console.error("Error during sign-up:", error);
        }
    };

    const handleSignIn = async () => {
        try {
            await signIn(email, credentials);
            if (auth.currentUser) {
                const userDetails = await getUser(auth.currentUser.uid)
                setUser(userDetails![0]);
            }

            navigation.navigate('(home)');
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colorTheme.bodyBackground}}>
            <View style={styles.container}>
                <View></View>
                <View>
                    <Text style={[styles.header, {color: colorTheme.headerText}]}>{isSignUp ? 'Create an account' : "Sign into you account"}</Text>
                    {isSignUp && <CustomInput
                        title={'Full Name'}
                        value={fullName}
                        setValue={setFullName}
                        color={colorTheme.headerText}
                    />}
                    <CustomInput
                        title={'Email'}
                        value={email}
                        setValue={setEmail}
                        color={colorTheme.headerText}
                    />
                    <CustomInput
                        title={'Password'}
                        value={credentials}
                        setValue={setCredentials}
                        color={colorTheme.headerText}
                        secureTextEntry
                    />
                    {isSignUp && <CustomInput
                        title={'Confirm Password'}
                        value={confirmCredentials}
                        setValue={setConfirmCredentials}
                        color={colorTheme.headerText}
                        secureTextEntry
                    />}
                    <Pressable style={[styles.button, {backgroundColor: colorTheme.addTradeButton}]} onPress={isSignUp ? handleSignUp : handleSignIn}>
                        <Text style={[styles.buttonText, {color: colorTheme.bodyBackground}]}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Text style={{color: colorTheme.headerText}}>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</Text>
                    <Pressable onPress={() => setIsSignUp(!isSignUp)}>
                        <Text style={{color: colorTheme.addTradeButton}}>{isSignUp ? 'Sign In' : "Sign Up"}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 25
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    input: {
        width: '100%',
        padding: 10,
        paddingLeft: 0,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    button: {
        width: '100%',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 700
    },
});