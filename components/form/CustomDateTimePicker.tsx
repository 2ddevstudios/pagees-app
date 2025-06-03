import { Theme } from "@/theme";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomText from "../CustomText";

interface IProps {
  onChange: (date: Date) => void;
  value: Date;
  type: "date" | "time";
  label?: string;
  minimiumDate?: Date | undefined;
  maximiumDate?: Date | undefined;
}

export default function CustomDateTimePicker({
  onChange,
  value = new Date(),
  type,
  label = "Select Date",
  minimiumDate,
  maximiumDate,
}: IProps) {
  const theme = useTheme<Theme>();

  const onDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (selectedDate) {
      onChange(new Date(selectedDate));
    }
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value,
      onChange: (evt, date) => onDateChange(evt, date),
      mode: type,
      is24Hour: false,
      minimumDate: minimiumDate,
      maximumDate: maximiumDate,
    });
  };

  return (
    <>
      <CustomText variant="body" fontSize={14} marginBottom="s">
        {label}
      </CustomText>
      <TouchableOpacity
        onPress={showMode}
        style={{
          width: "100%",
          height: 42,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.borderColor,
          justifyContent: "center",
          paddingLeft: 20,
        }}
      >
        <CustomText variant="body" fontSize={14} color="bodyTextColor">
          {type === "date" ? value.toDateString() : value.toUTCString()}
        </CustomText>
      </TouchableOpacity>
    </>
  );
}
