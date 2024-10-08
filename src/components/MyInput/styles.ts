import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    inputView: {
        marginBottom: 10,
    },

    label: {
        fontSize: 22,
    },

    input: {
        padding: 5,
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 5,
        width: Dimensions.get('screen').width - 60,
    },
})