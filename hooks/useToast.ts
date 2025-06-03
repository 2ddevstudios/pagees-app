import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import { useToast as useToastHook } from "react-native-toast-notifications";


const useToast = () => {
  const theme = useTheme<Theme>();
    const toast = useToastHook();
  return toast;
}

export default useToast