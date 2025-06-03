import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetScheduleById = ({
  id
}: {
  id: number
}) => {
  

  return useQuery(
    [QUERY_KEYS["get-schedule-by-id"](id.toString()), id],
    () =>
      httpService.get(`${Urls.schedule}/${id}`),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetScheduleById;
