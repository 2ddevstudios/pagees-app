import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetAddressses = ({ page }: { page: number }) => {
  return useQuery(
    [QUERY_KEYS["get-addresses"]],
    () =>
      httpService.get(`${Urls.address}`, {
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

export default useGetAddressses;
