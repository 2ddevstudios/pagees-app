import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";
import { useAtomValue } from "jotai";
import { userDetailsAtom } from "@/states/setupState";
import { detailsAtom } from "@/states/dashboardState";

const useGetInvestments = ({
    page,
}: {
    page: number,
}) => {
    const details = useAtomValue(detailsAtom);
    return useQuery(
        [`get-investments`, page],
        () =>
            httpService.get(`${Urls.investment}/user/${details?.id}`),
        {
            refetchOnMount: true,
        }
    );
};

export default useGetInvestments;
