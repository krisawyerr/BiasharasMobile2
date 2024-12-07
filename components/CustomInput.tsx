import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CustomInputProps {
    title: string
    value: string
    color: string
    secureTextEntry?: boolean
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function CustomInput({title, value, setValue, color, secureTextEntry}: CustomInputProps) {
    return (
        <View style={styles.container}>
            <Text style={{opacity: value ? 100 : 0, color: `${color}90`}}>{title}</Text>
            <TextInput
                style={[styles.input, {borderColor: `${color}90`, color: color}]}
                placeholder={title}
                value={value}
                onChangeText={setValue}
                placeholderTextColor={`${color}90`}
                secureTextEntry={secureTextEntry} 
                textContentType={secureTextEntry ? "oneTimeCode" : "none"}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
    },
    input: {
        width: '100%',
        padding: 10,
        paddingLeft: 0,
        borderBottomWidth: 1,
    },
});