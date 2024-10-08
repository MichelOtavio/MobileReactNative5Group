import { TextInput, Text, View } from 'react-native'

import styles from './styles'

type Props = {
    label: string,
    initialValue?: string,
    secureTextEntry?: boolean,
    change?: (value: string) => void,
}

export default function MyInput(props: Props) {
    return (
        <View style={styles.inputView}>
            <Text style={styles.label}>{props.label}:</Text>
            <TextInput
                style={styles.input}
                readOnly={!props.change}
                value={props.initialValue}
                onChangeText={props.change}
                secureTextEntry={props.secureTextEntry}
            />
        </View>
    )
}