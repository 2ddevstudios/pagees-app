import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetInvestmentPlans = ({
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
      httpService.get(`${Urls.investmentPlan}`, {
        params: {
          page,
          limit: 10,
        },
      }),
    {
      refetchOnMount: true,
    }
  );
};

export default useGetInvestmentPlans;
