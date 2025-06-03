import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  TouchableOpacity,
} from "react-native";
import CustomText from "./CustomText";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../theme";
import Box from "./Box";

interface IProps {
  width?: DimensionValue;
  height?: DimensionValue;
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  color?: string;
  textColor?: string;
  spinnerColor?: string;
  variant?: "xs" | "body" | "subheader" | "header";
  paddingVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
}

const CustomButton = ({
  title,
  onPress,
  width = 120,
  height = 32,
  isLoading = false,
  color = "grey",
  textColor = "white",
  spinnerColor = "white",
  variant = "body",
  leftIcon,
  paddingVertical,
  paddingHorizontal,
  borderRadius = 10,
  borderWidth = 0,
  borderColor = "transparent",
}: IProps) => {
  const theme = useTheme<Theme>();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        borderRadius,
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
        borderWidth,
        borderColor,
      }}
    >
      <>
        {isLoading && <ActivityIndicator color={spinnerColor} size="small" />}
        {!isLoading && (
          <Box flexDirection="row" alignItems="center">
            {leftIcon}
            <CustomText
              variant={variant}
              color="primaryColor"
              fontSize={14}
              style={{ color: textColor }}
            >
              {title}
            </CustomText>
          </Box>
        )}
      </>
    </TouchableOpacity>
  );
};

export default CustomButton;
