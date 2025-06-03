import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetProperty = ({
  page,
  type,
  searchText
}: {
  page: number,
  type: "LAND" | "BUILDING",
  searchText?: string
}) => {
  const getType = () => {
    switch (type) {
      case "BUILDING": {
        return QUERY_KEYS["get-houses"];
      }
      case "LAND": {
        return QUERY_KEYS["get-lands"];
      }
    }
  };

  return useQuery(
    [getType(), page, type],
    () =>
      httpService.get(`${Urls.getProperty}`, {
        params: {
          category: type,
          page,
          searchText
        },
      }),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetProperty;
