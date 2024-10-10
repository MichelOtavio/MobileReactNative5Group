import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"

import styles from './styles'

interface Props {
    isChecked: boolean;
    onPress: () => void;
    label: string;
    labelStyle?: object;
    checkboxStyle?: object;
}

export default function CustomCheckBox({ isChecked, onPress, label, labelStyle, checkboxStyle }: Props) {
    return (
        <GestureHandlerRootView>
            <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked, checkboxStyle]} />
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            </TouchableOpacity>
        </GestureHandlerRootView>
    )
}
