import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";

const useGetReservationById = ({
    id,
}: {
    id: number,
}) => {
    return useQuery(
        [`get-reservation-${id}`, id],
        () =>
            httpService.get(`${Urls.reservations}/${id}`),
        {
            refetchOnMount: true,
            enabled: true,
        }
    );
};

export default useGetReservationById;
