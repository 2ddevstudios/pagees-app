import { TextInput } from "react-native-gesture-handler";
import Box from "../Box";
import CustomText from "../CustomText";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import { KeyboardTypeOptions } from "react-native";

interface IProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  icon?: JSX.Element;
  isPassword?: boolean;
  keyboardTye?: KeyboardTypeOptions;
}

export default function InputWithoutForm({
  label,
  value,
  onChange,
  hasError,
  errorMessage,
  icon,
  isPassword = false,
  keyboardTye = "default",
}: IProps) {
  const theme = useTheme<Theme>();
  return (
    <Box width={"100%"} height={"auto"}>
      <CustomText variant="body" color="black">
        {label}
      </CustomText>
      <Box
        width={"100%"}
        height={42}
        borderRadius={8}
        borderWidth={1}
        borderColor={hasError ? "error" : "borderColor"}
        flexDirection="row"
        alignItems="center"
        paddingHorizontal="s"
        marginTop="s"
      >
        <TextInput
          value={value}
          onChangeText={(val) => onChange(val)}
          keyboardType={keyboardTye}
          secureTextEntry={isPassword}
          style={{ flex: 1, fontFamily: "Inter_Regular", marginLeft: 10 }}
        />
        {icon && icon}
      </Box>
      {hasError && errorMessage && (
        <CustomText variant="xs" color="error">
          {errorMessage}
        </CustomText>
      )}
    </Box>
  );
}
