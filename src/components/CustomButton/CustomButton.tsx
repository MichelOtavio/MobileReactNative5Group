// CustomButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

// Define an interface for the props
interface CustomButtonProps {
  title: string; // Title of the button
  onPress: (event: GestureResponderEvent) => void; // Function to call on button press
  color: string; // Background color of the button
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 10, // Margin between buttons
  },
  buttonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16,
  },
});

export default CustomButton;
``
