import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetPlots = ({
    id,
    enabled
}: {
    id: number,
    enabled: boolean
}) => {
    return useQuery(
        [QUERY_KEYS["get-plots"](id), id],
        () =>
            httpService.get(`${Urls.getProperty}/plots/${id}`),
        {
            refetchOnMount: true,
            enabled
        }
    );
};

export default useGetPlots;
