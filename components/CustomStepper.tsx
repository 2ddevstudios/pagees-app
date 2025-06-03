import { View, Text, useWindowDimensions, BackHandler } from "react-native";
import React, { PropsWithChildren } from "react";
import Box from "./Box";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/theme";
import { ArrowLeft } from "iconsax-react-native";
import CustomText from "./CustomText";
import { router } from "expo-router";

interface IProps {
  totalSteps: number;
  currentStep: number;
  header: string;
  currentStepHeader: string;
  handleStepChange: (step: number) => void;
  showStep?: boolean;
}

const CustomStepper = ({
  totalSteps,
  currentStep,
  header,
  currentStepHeader,
  handleStepChange,
  children,
  showStep = true,
}: IProps & PropsWithChildren) => {
  const theme = useTheme<Theme>();
  const { height: HEIGHT } = useWindowDimensions();

  React.useEffect(() => {
    const handleBackPress = () => {
      if (currentStep > 1) {
        handleStepChange(currentStep - 1);
        return true;
      } else {
        return false;
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [currentStep, handleStepChange]);

  const handleBackButtonPress = React.useCallback(() => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1);
    } else {
      router.back();
    }
  }, [currentStep]);

  const handleCancel = () => {
    router.back();
  };

  return (
    <Box width='100%' backgroundColor="mainBackgroundColor" flex={1}>
      <Box width={"100%"} height={(HEIGHT / 100) * 10}>
        <Box
          flex={1}
          backgroundColor="secondaryBackgroundColor"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal="s"
        // paddingTop="l"
        >
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              borderRadius: 30,
              borderWidth: 0.5,
              borderColor: theme.colors.borderColor,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleBackButtonPress}
          >
            <ArrowLeft
              size={20}
              color={theme.colors.bodyTextColor}
              variant="Outline"
            />
          </TouchableOpacity>

          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginLeft="m"
          >
            <CustomText variant="body" fontSize={16} color="bodyTextColor">
              {header}
            </CustomText>
            {showStep && (
              <CustomText>
                {currentStep}/{totalSteps}{" "}
                <CustomText
                  variant="header"
                  fontSize={14}
                  color="bodyTextColor"
                >
                  {currentStepHeader}
                </CustomText>
              </CustomText>
            )}
          </Box>

          <TouchableOpacity
            style={{
              width: 80,
              height: 30,
              borderRadius: 30,
              borderWidth: 0.5,
              borderColor: theme.colors.borderColor,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleCancel}
          >
            <CustomText variant="header" fontSize={14}>
              Cancel
            </CustomText>
          </TouchableOpacity>
        </Box>

        <Box
          width={"100%"}
          height={7}
          backgroundColor="borderColor"
          position="relative"
        >
          <Box
            position="absolute"
            height={"100%"}
            width={`${(currentStep / totalSteps) * 100}%`}
            backgroundColor="primaryColor"
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
          />
        </Box>
      </Box>
      <Box flex={1}>{children}</Box>
    </Box>
  );
};

export default CustomStepper;
