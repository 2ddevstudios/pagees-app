import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetSchedules = ({
  page
}: {
  page: number,
}) => {
  

  return useQuery(
    [QUERY_KEYS["get-schedules"], page],
    () =>
      httpService.get(`${Urls.schedule}`, {
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

export default useGetSchedules;
