import { TextInput } from "react-native-gesture-handler";
import Box from "../Box";
import CustomText from "../CustomText";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";

interface IProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  hasError?: boolean;
  errorMessage?: string;
}

export default function PhoneInput({
  label,
  value,
  onChange,
  hasError,
  errorMessage,
}: IProps) {
  const theme = useTheme<Theme>();
  return (
    <Box width={"100%"} height={"auto"}>
      <CustomText variant="body" color="black">
        {label}
      </CustomText>
      <Box
        width={"100%"}
        height={44}
        alignItems="center"
        marginTop="s"
        borderRadius={8}
        style={{
          backgroundColor: hasError ? "#FDA29B" : "transparent",
          padding: 1,
        }}
      >
        <Box
          width={"99%"}
          height={42}
          borderRadius={8}
          borderWidth={1}
          borderColor={hasError ? "error" : "borderColor"}
          flexDirection="row"
          alignItems="center"
          paddingHorizontal="s"
          backgroundColor="white"
        >
          <Box flexDirection="row" alignItems="center">
            <CustomText variant="body">+234</CustomText>
            <Feather
              name="chevron-down"
              color={theme.colors.bodyTextColor}
              size={20}
              style={{ marginLeft: 10 }}
            />
          </Box>
          <TextInput
            value={value}
            onChangeText={(val) => onChange(val)}
            keyboardType="number-pad"
            style={{ flex: 1, fontFamily: "Inter_Regular", marginLeft: 10 }}
          />
          {hasError && (
            <Feather name="info" color={theme.colors.error} size={20} />
          )}
        </Box>
      </Box>
      {hasError && errorMessage && (
        <CustomText variant="xs" color="error">
          {errorMessage}
        </CustomText>
      )}
    </Box>
  );
}
