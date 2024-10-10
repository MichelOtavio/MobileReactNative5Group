import { TextInput, Text, View } from "react-native";

import styles from "./styles";

type Props = {
  label: string;
  initialValue?: string;
  secureTextEntry?: boolean;
  change?: (value: string) => void;
  placeholder?: string; // Adiciona a propriedade placeholder
  placeholderTextColor?: string; // Adiciona a propriedade placeholderTextColor
};

export default function MyInput(props: Props) {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={styles.input}
        value={props.initialValue}
        onChangeText={props.change}
        secureTextEntry={props.secureTextEntry}
        readOnly={!props.change}
        placeholder={props.placeholder} // Usando o placeholder
        placeholderTextColor={props.placeholderTextColor || "#999"}
      />
    </View>
  );
}
