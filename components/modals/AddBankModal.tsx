// import { View, Text, ActivityIndicator } from "react-native";
// import React, { useRef } from "react";
// import { useAtomValue, useSetAtom } from "jotai";
// import { showAddBankModalAtom } from "@/hooks/useRenderModal";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { useTheme } from "@shopify/restyle";
// import { Theme } from "@/theme";
// import ModalWrapper from "../ModalWrapper";
// import Box from "../Box";
// import CustomText from "../CustomText";
// import ButtonWrapper from "../ButtonWrapper";
// import { IPaystackBank } from "@/models/PaystackBank";
// import useGetNigerianBanks from "@/hooks/query/useGetNigerianBanks";
// import { last, uniqBy } from "lodash";
// import { PaginationResponse } from "@/models/paginationType";
// import CustomDropDown from "../form/CustomDropDown";
// import CustomInputWithoutForm from "../form/CustomInputWithoutForm";
// import { useMutation, useQueryClient } from "react-query";
// import httpService from "@/utils/httpService";
// import Urls from "@/hooks/http/urls";
// import { detailsAtom } from "@/states/dashboardState";
// import useToast from "@/hooks/useToast";
// import { QUERY_KEYS } from "@/hooks/query/querykeys";

// export default function AddBankModal() {
//   const setShowModal = useSetAtom(showAddBankModalAtom);
//   const details = useAtomValue(detailsAtom);
//   // states
//   const ref = useRef<BottomSheetModal>();
//   const theme = useTheme<Theme>();
//   const toast = useToast();
//   const queryClient = useQueryClient();

//   const [options, setOptions] = React.useState<
//     Array<{ label: string; value: string }>
//   >([]);
//   const [value, setValue] = React.useState({ value: "", label: "" });
//   const [accountNumber, setAccountNumber] = React.useState("");
//   const [accountName, setAccountName] = React.useState("");

//   const { isLoading, data } = useGetNigerianBanks();

//   const resolveBank = useMutation({
//     mutationFn: () =>
//       httpService.get(`${Urls.bank}/resolve-account`, {
//         params: {
//           accountNumber,
//           bankCode: value.value,
//         },
//       }),
//     onSuccess: (data) => {
//       console.log(data?.data);
//       setAccountName(data?.data?.data?.account_name);
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//   });

//   const saveBank = useMutation({
//     mutationFn: ({ bankName }: { bankName: string }) =>
//       httpService.post(`${Urls.bank}/create`, {
//         userId: details?.id,
//         bankName: bankName,
//         accountName: accountName,
//         bankCode: value.value,
//         accountNumber,
//       }),
//     onSuccess: (data) => {
//       toast.show(data?.data?.message, { type: "success" });
//       queryClient.invalidateQueries([QUERY_KEYS["get-banks"]]);
//       setShowModal(false);
//     },
//     onError: (error) => {
//       toast.show("An error occured while trying to save your bank Account");
//     },
//   });

//   React.useEffect(() => {
//     if (!isLoading && data?.data && options.length === 0) {
//       const item: PaginationResponse<IPaystackBank> = data?.data;
//       const bankOptions = item.data.map((item) => ({
//         value: item.code,
//         label: item.name,
//       }));
//       setOptions(uniqBy(bankOptions, "value"));
//     }
//   }, [data]);

//   React.useEffect(() => {
//     if (ref.current !== null) {
//       ref?.current?.present();
//     }
//   }, []);

//   React.useEffect(() => {
//     if (accountNumber.length === 10) {
//       resolveBank.mutate();
//     } else {
//       setAccountName("");
//     }
//   }, [accountNumber]);

//   const handleSelect = (value: string) => {
//     setValue({ value: value, label: value });
//   };

//   const handleSave = () => {
//     const item = options.filter((item) => item.value === value.value)[0];
//     saveBank.mutate({ bankName: item.label });
//   };

//   return (
//     <ModalWrapper
//       snapPoints={["60%"]}
//       onClose={() => {
//         setShowModal(false);
//       }}
//       shouldScrroll={true}
//       ref={ref as any}
//     >
//       <Box flex={1} paddingVertical="m" paddingHorizontal="m">
//         <Box
//           width={"100%"}
//           flexDirection="row"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <CustomText variant="medium" color="black">
//             Add Bank Account
//           </CustomText>

//           <ButtonWrapper
//             onPress={() => setShowModal(false)}
//             width={80}
//             height={36}
//             borderRadius={30}
//             borderWidth={1}
//             borderColor={theme.colors.borderColor}
//           >
//             <Box flex={1} justifyContent="center" alignItems="center">
//               <CustomText variant="medium" fontSize={16} color="black">
//                 Cancel
//               </CustomText>
//             </Box>
//           </ButtonWrapper>
//         </Box>

//         <Box>
//           <CustomDropDown
//             label="Bank"
//             options={options}
//             placeHolder="Select Bank"
//             value={value.label}
//             onSelected={handleSelect}
//           />
//           <Box height={20} />
//           <CustomInputWithoutForm
//             label="Account Number"
//             value={accountNumber}
//             onChange={(e: any) => setAccountNumber(e)}
//             keyboardType="number-pad"
//           />

//           <Box height={20} />
//           <CustomInputWithoutForm
//             label="Account Name"
//             value={accountName}
//             onChange={(e: any) => setAccountName(e)}
//             keyboardType="number-pad"
//             editable={false}
//             style={{ backgroundColor: theme.colors.secondaryBackgroundColor, color: 'black' }}
//           />
//           {resolveBank.isLoading && (
//             <CustomText
//               variant="body"
//               fontSize={12}
//               marginTop="s"
//               color="primaryColor"
//             >
//               Resolving account details, please wait...
//             </CustomText>
//           )}
//           {!resolveBank.isLoading && resolveBank.isError && (
//             <CustomText
//               variant="body"
//               fontSize={12}
//               marginTop="s"
//               color="error"
//             >
//               Couldn't resolve bank account, please try with other detail
//             </CustomText>
//           )}
//           <Box height={20} />
//           <ButtonWrapper
//             onPress={handleSave}
//             width={"100%"}
//             height={48}
//             borderRadius={30}
//             backgroundColor={theme.colors.primaryColor}
//             disabled={accountName.length === 0}
//             disabledColor={theme.colors.fadedPrimary}
//           >
//             <Box flex={1} justifyContent="center" alignItems="center">
//               {saveBank.isLoading && (
//                 <ActivityIndicator size="small" color={"white"} />
//               )}
//               {!saveBank.isLoading && (
//                 <CustomText variant="medium" fontSize={16} color="white">
//                   Save
//                 </CustomText>
//               )}
//             </Box>
//           </ButtonWrapper>
//         </Box>
//       </Box>
//     </ModalWrapper>
//   );
// }


import React from 'react'
import { Text, View } from 'react-native'

const AddBankModal = () => {
  return (
    <View>
      <Text>AddBankModal</Text>
    </View>
  )
}

export default AddBankModal