import Box from "@/components/Box";
import CustomText from "@/components/CustomText";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function CustomInputWithoutForm(props: Props & TextInputProps) {
  const { label, value, onChange } = props;
  const [focused, setFocused] = useState(false);

  const theme = useTheme<Theme>();
  return (
    <Box width={"100%"}>
      <CustomText variant={"body"} marginBottom={"s"}>
        {label}
      </CustomText>
      <TextInput
        {...(props as any)}
        style={[
          {
            borderWidth: 1.5,
            borderRadius: 8,
            borderColor: focused
              ? theme.colors.primaryColor
              : theme.colors.borderColor,
            height: 50,
            paddingHorizontal: 10,
            fontFamily: "Inter_Regular",
          },
          props.style,
        ]}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        keyboardType={props.keyboardType}
      />
    </Box>
  );
}
