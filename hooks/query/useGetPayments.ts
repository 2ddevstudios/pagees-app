import { View, Text } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "./querykeys";
import httpService from "@/utils/httpService";
import Urls from "../http/urls";
import { PAYMENT_TYPE } from "@/models/Payment";

const useGetPayments = ({
    id,
    paymentType
}: {
    id: number,
    paymentType?: PAYMENT_TYPE
}) => {
    if (paymentType) {
        return useQuery(
            [`get-payments-${id}`, id, paymentType],
            () =>
                httpService.get(`${Urls.paymment}/${id}`, {
                    params: {
                        paymentType,
                    }
                }),
            {
                refetchOnMount: true,
            }
        );
    }
    return useQuery(
        [`get-payments-${id}`, id],
        () =>
            httpService.get(`${Urls.paymment}/${id}`),
        {
            refetchOnMount: true,
        }
    );
};

export default useGetPayments;
