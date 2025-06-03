import { Ionicons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import React from "react";
import Box from "@/components/Box";
import CustomText from "@/components/CustomText";
import { StyleSheet } from "react-native";

interface ICustomDropDownProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onSelected: (value: string) => void;
  placeHolder: string;
  label: string;
}

export default function CustomDropDown({
  options,
  value,
  onSelected,
  placeHolder,
  label,
}: ICustomDropDownProps) {
  const [isFocus, setIsFocused] = React.useState(false);

  return (
    <Box width={"100%"} height={"auto"}>
      <CustomText variant={"body"} marginBottom="s">
        {label}
      </CustomText>
      <Dropdown
        style={[
          Styles.dropdown,
          isFocus && { borderColor: "#2D66DD", borderWidth: 1 },
        ]}
        selectedTextStyle={{ color: "black", fontSize: 14 }}
        iconStyle={Styles.iconStyle}
        fontFamily="Inter_Regular"
        placeholder={placeHolder}
        placeholderStyle={{
          fontFamily: "Inter_Regular",
          fontSize: 14,
          color: "grey",
        }}
        itemTextStyle={{
          fontSize: 14
        }}   
        
        data={options}
        maxHeight={200}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          onSelected(item.value);
        }}
        search
        searchPlaceholder="Search..."
        inputSearchStyle={{ fontSize: 12, width: '95%', height: 46, borderColor: 'lightgrey', borderRadius: 10 }}
        renderRightIcon={() => (
          <Ionicons
            style={Styles.icon}
            color={isFocus ? "blue" : "black"}
            name={isFocus ? "chevron-up-outline" : "chevron-down-outline"}
            size={20}
          />
        )}
      />
    </Box>
  );
}

const Styles = StyleSheet.create({
  dropdown: {
    height: 52,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontFamily: "Inter_Regular",
    backgroundColor: "white",
    fontSize: 12,
  },
  icon: {
    marginRight: 5,
    color: "grey",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
