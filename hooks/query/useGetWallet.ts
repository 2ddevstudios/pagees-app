import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetWallet = () => {
  return useQuery(
    [QUERY_KEYS["get-wallet-balance"]],
    () =>
      httpService.get(`${Urls.wallet}`),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetWallet;
