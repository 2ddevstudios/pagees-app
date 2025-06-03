import { PropsWithChildren } from "react";
import { DimensionValue, Pressable } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: string;
  borderRadius?: number;
  onPress: () => void;
  disabled?: boolean;
  disabledColor?: string;
  borderWidth?: number;
  borderColor?: string;
}

export default function ButtonWrapper({
  width = 100,
  height = 38,
  backgroundColor = "white",
  borderRadius = 50,
  onPress,
  disabled = false,
  disabledColor = "white",
  borderColor = "white",
  borderWidth = 0,
  children,
}: IProps & PropsWithChildren) {
  return (
    <Pressable
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      android_disableSound={true}
      onPress={() => (disabled ? null : onPress())}
      style={{
        width,
        height,
        borderRadius: borderRadius,
        backgroundColor:
          disabled && disabledColor ? disabledColor : backgroundColor,
        overflow: "hidden",
        borderWidth,
        borderColor,
      }}
    >
      {children}
    </Pressable>
  );
}
