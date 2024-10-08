import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light background color for the page
      },
      inputContainer: {
        marginVertical: 10,
        width: '80%', // Set width of the input container
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'reed', // Dark color for label text
      },
      input: {
        height: 40,
        borderWidth: 2, // Border thickness
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#cccccc', // Background color for the input field
      },
      buttonView: {
        marginTop: 20,
        width: '86%', // Set width of the button
      },

    
})