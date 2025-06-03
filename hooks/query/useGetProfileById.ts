import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetProfileById = ({
  id,
  disabled = false
}: {
  id: number,
  disabled?: boolean
}) => {
  

  return useQuery(
    [QUERY_KEYS["get-single-profile"], id],
    () =>
      httpService.get(`${Urls.profile}/${id}`),
    {
      enabled: disabled,
      refetchOnMount: true,
    }
  );
};

export default useGetProfileById;
