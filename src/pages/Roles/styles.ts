import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

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

    buttonView: {
        marginTop: 20,
        width: '86%', // Set width of the button
    },

})