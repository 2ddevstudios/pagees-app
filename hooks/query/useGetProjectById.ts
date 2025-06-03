import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetProjectById = ({
  id
}: {
  id: number
}) => {
  

  return useQuery(
    [QUERY_KEYS["get-project-by-id"], id],
    () =>
      httpService.get(`${Urls.projects}/${id}`),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetProjectById;
