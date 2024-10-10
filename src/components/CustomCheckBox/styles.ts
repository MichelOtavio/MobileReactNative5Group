import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#6200EE',
        backgroundColor: '#FFF',
        marginRight: 2,
    },
    checkboxChecked: {
        backgroundColor: '#6200EE',
    },
    label: {
        fontSize: 16,
    },
})