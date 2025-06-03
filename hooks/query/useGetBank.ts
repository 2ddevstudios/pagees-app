import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetBanks = ({ page }: { page: number }) => {
  return useQuery(
    [QUERY_KEYS["get-banks"]],
    () =>
      httpService.get(`${Urls.bank}`, {
        params: {
            page,
            limit: 10,
        }
      }),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetBanks;
