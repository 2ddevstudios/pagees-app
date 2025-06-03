import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";
import { useAtomValue } from "jotai";
import { userDetailsAtom } from "@/states/setupState";

const useGetReservations = ({
    page,
}: {
    page: number,
}) => {
    const details = useAtomValue(userDetailsAtom);
    return useQuery(
        [QUERY_KEYS["get-reservations"], details?.id],
        () =>
            httpService.get(`${Urls.reservations}`, {
                params: {
                    page,
                    limit: 10,
                }
            }),
        {
            refetchOnMount: true,
            enabled: true,
        }
    );
};

export default useGetReservations;
