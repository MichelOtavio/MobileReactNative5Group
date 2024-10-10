import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    inputView: {
      marginBottom: 10,
    },

    label: {
      fontSize: 22,
    },

    input: {
      backgroundColor: '#f0f0f0',  
      padding: 10, 
      borderRadius: 5, 
      color: '#5d5d5d',  
      borderColor: '#ccc', 
      width: Dimensions.get('screen').width - 60,
      marginBottom: 3,
      elevation: 3, 
    },
})