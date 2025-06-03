import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";
import { useAtomValue } from "jotai";
import { detailsAtom } from "@/states/dashboardState";
import { IUser } from "@/models/User";

const useGetNextOfKin = ({ page }: { page: number }) => {
    const { id } = useAtomValue(detailsAtom) as IUser;
  return useQuery(
    [QUERY_KEYS["get-next-of-kin"]],
    () =>
      httpService.get(`${Urls.profile}/next-of-kin/${id}`, {
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

export default useGetNextOfKin
