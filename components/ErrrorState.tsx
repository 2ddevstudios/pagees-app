import { ActivityIndicator, Image } from "react-native";
import React from "react";
import Box from "./Box";
import CustomText from "./CustomText";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const ErrorState = ({ title = 'An error occured'}: { title?: string}) => {
    const theme = useTheme<Theme>();

    return (
        <Box
            width={"100%"}
            height={'auto'}
            justifyContent="center"
            alignItems="center"
        >
            <Image source={require('../assets/images/warning.png')} resizeMode="cover" style={{ width: 100, height: 100 }} />
            <CustomText variant="body">
                {title}
            </CustomText>
            <Box height={20} />
            <CustomButton title="Go back" onPress={() => router.back()} width={'100%'} height={45} borderRadius={30} textColor="white" color={theme.colors.primaryColor} variant="subheader" />
        </Box>
    );
};

export default ErrorState;
