/* eslint-disable import/no-unresolved */
import Box from "@/components/Box";
import CustomText from "@/components/CustomText";
import { Theme } from "@/theme";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

interface IProps {
  required?: boolean;
  name: string;
  placeholder: string;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  label?: string;
  showLabel?: boolean;
  removeSpecialCharater?: boolean;
  removeSpaces?: boolean;
  textInputStyle?: TextStyle;
  showClearButton?: boolean;
}

export const CustomTextInput = (props: IProps & TextInputProps) => {
  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const theme = useTheme<Theme>();

  // form context
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  return (
    <Box style={{ ...props.containerStyle }}>
      {props.showLabel && (
        <Box flexDirection="row">
          <CustomText
            variant="medium"
            fontSize={14}
            color="black"
            marginBottom="s"
          >
            {props.label}
          </CustomText>
          {props.required && (
            <CustomText style={{ color: "red" }}>*</CustomText>
          )}
        </Box>
      )}
      <Controller
        control={control}
        rules={{
          required: props.required || false,
        }}
        name={props.name}
        render={({ field: { onChange, value } }) => {
          const handleInputChange = (text: string) => {
            // // Remove special characters using a regular expression
            // const filteredText = text.replace(/[^\w\s]/gi, "");

            // //remove all spaces
            // const newText = props.removeSpaces
            //   ? filteredText.replace(/\s/g, "_")
            //   : filteredText;
            onChange(text);
          };
          return (
            <Box
              style={[
                Style.parent,
                {
                  borderColor:
                    focused && !errors[props.name]
                      ? theme.colors.primaryColor
                      : errors[props.name]
                        ? theme.colors.error
                        : theme.colors.borderColor,
                },
              ]}
            >
              <Box
                style={{
                  flex: 1,
                  justifyContent: "center",

                  paddingRight: 5,
                }}
              >
                {/* {focused && <Text variant='xs'>{props.placeholder || props.name}</Text>} */}
                <TextInput
                  placeholderTextColor={theme.colors.bodyTextColor}

                  cursorColor={theme.colors.primaryColor}
                  placeholder={props.placeholder}
                  value={value}
                  onChangeText={(e) => {
                    props.removeSpecialCharater
                      ? handleInputChange(e)
                      : onChange(e);
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  secureTextEntry={props.isPassword ? showPassword : false}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    color: theme.colors.bodyTextColor,
                    fontFamily: "AirbnbCereal_W_Light",
                    fontSize: 16
                    // ...props.textInputStyle,
                  }}
                />
              </Box>
              {props.isPassword && (
                <Feather
                  onPress={() => setShowPassword((prev) => !prev)}
                  name={showPassword ? "eye" : "eye-off"}
                  size={23}
                  color={theme.colors.bodyTextColor}
                />
              )}
              {!props.isPassword && props.showClearButton && (
                <Feather
                  onPress={() => setValue(props.name, "")}
                  name={'x-circle'}
                  size={23}
                  color={theme.colors.bodyTextColor}
                />
              )}
            </Box>
          );
        }}
      />
      {errors[props.name] && (
        <CustomText
          variant="xs"
          fontSize={14}
          fontFamily={"AirbnbCereal_W_Light"}
          style={{ color: "red" }}
        >
          {errors[props.name]?.message as any}
        </CustomText>
      )}
    </Box>
  );
};

const Style = StyleSheet.create({
  parent: {
    width: "100%",
    height: 42,
    borderRadius: 0,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    fontFamily: "Inter_Regular",
  },
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
});

// export CustomTextInput
