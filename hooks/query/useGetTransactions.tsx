import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";
import { useAtomValue } from "jotai";
import { detailsAtom } from "@/states/dashboardState";

const useGetTransactions = ({
    page
}: {
    page: number,
}) => {
    const details = useAtomValue(detailsAtom);

    return useQuery(
        [QUERY_KEYS["get-all-transactions"], page, details?.id],
        () =>
            httpService.get(`${Urls.transactions}/all/${details?.id}`, {
                params: {
                    page,
                    limit: 10,
                }
            }),
        {
            refetchOnMount: true,
            refetchInterval: 10000,
        }
    );
};

export default useGetTransactions;
