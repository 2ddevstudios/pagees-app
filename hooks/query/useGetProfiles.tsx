import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetProfiles = ({
  page,
  type,
}: {
  page: number;
  type: "company" | "personal";
}) => {
  return useQuery(
    [
      type === "company"
        ? QUERY_KEYS["get-company-profile"]
        : QUERY_KEYS["get-personal-profile"],
      page,
      type,
    ],
    () =>
      httpService.get(`${Urls.profile}`, {
        params: {
          page,
          limit: 10,
          type: type === "company" ? "CORPORATE" : "PERSONAL",
        },
      }),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetProfiles;
