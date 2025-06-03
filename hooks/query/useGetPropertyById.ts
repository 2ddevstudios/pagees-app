import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetPropertyById = ({
  id,
}: {
  id: number,
}) => {


  return useQuery(
    [QUERY_KEYS["get-property-by-id"](id), id],
    () =>
      httpService.get(`${Urls.getPropertyById(id)}`),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetPropertyById;
