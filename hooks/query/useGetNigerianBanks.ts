import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetNigerianBanks = () => {
  return useQuery(
    [QUERY_KEYS["get-nigerian-banks"]],
    () =>
      httpService.get(`${Urls.bank}/list-nigerian-banks`, {
      }),
  );
};

export default useGetNigerianBanks;
