import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from 'react-query'
import { QUERY_KEYS } from './querykeys'
import httpService from '@/utils/httpService'
import Urls from '../http/urls'

const useGetUpdates = ({ type }: { type: 'ESP'|'MAIN_APP'}) => {
  const { data, isLoading, isError } = useQuery([QUERY_KEYS['get-uppdates'](type), type], () => httpService.get(`${Urls.updates(type)}`));

  return {
    data: data?.data,
    isLoading,
    isError,
  }
}

export default useGetUpdates