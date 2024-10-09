import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    bottomButtons: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: '#f8f8f8', 
    },
  });