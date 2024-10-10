import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonView: {
        marginTop: 20,
        width: '86%',
    },

    rolesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },

})