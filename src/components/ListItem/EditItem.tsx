import { StyleSheet, Text, View } from "react-native"
import { BorderlessButton } from 'react-native-gesture-handler'

type Props = {
    action: () => void
}

export default function EditItem(props: Props) {
    return (
        <View style={styles.container}>
            <BorderlessButton onPress={() => props.action()}>
                <Text style={styles.text}>EDITAR</Text>
            </BorderlessButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: "center",
        backgroundColor: 'blue',
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: "bold",
    },
})