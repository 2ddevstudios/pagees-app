import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetProjects = ({
  page,
}: {
  page: number;
}) => {
  return useQuery(
    [
      QUERY_KEYS["get-projects"],
      page,
    ],
    () =>
      httpService.get(`${Urls.projects}/by-status`, {
        params: {
          status: 'PENDING'
        },
      }),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetProjects;
