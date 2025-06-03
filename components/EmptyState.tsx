import {} from "react-native";
import React from "react";
import Box from "./Box";
import CustomText from "./CustomText";
import { Image } from "expo-image";

const EmptyState = ({ title }: { title: string }) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      justifyContent="center"
      alignItems="center"
    >
      <Image
        source={require("../assets/images/empty.png")}
        contentFit="contain"
        style={{ width: 150, height: 150 }}
      />
      <CustomText variant="body" textAlign="center" fontSize={18} marginTop="m">
        {title}
      </CustomText>
    </Box>
  );
};

export default EmptyState;
