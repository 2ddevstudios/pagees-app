import { View, Text, Modal, DimensionValue, Pressable } from "react-native";
import React, { PropsWithChildren } from "react";
import Box from "./Box";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  isOpen: boolean;
  height?: DimensionValue;
  onClose: () => void;
}

const ReactNativeModalWrapper = ({
  isOpen,
  children,
  height = 250,
  onClose,
}: IProps & PropsWithChildren) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      presentationStyle="overFullScreen"
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <Pressable
        onPress={() => onClose()}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#0c0c0c98",
        }}
      >
        <Box
          width={"100%"}
          height={height}
          borderRadius={28}
          backgroundColor="mainBackgroundColor"
          padding="m"
        >
          <>{children}</>
        </Box>
      </Pressable>
    </Modal>
  );
};

export default ReactNativeModalWrapper;
