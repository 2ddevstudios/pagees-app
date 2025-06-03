import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import Box from "./Box";
import CustomText from "./CustomText";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";

const LoadingState = ({ title = 'Loading' }: { title?: string }) => {
    const theme = useTheme<Theme>();

    return (
        <Box
            width={"100%"}
            height={100}
            justifyContent="center"
            alignItems="center"
        >
            <ActivityIndicator
                size={"small"}
                color={theme.colors.primaryColor}
            />
            <CustomText variant="body">
                {title}
            </CustomText>
        </Box>
    );
};

export default LoadingState;
