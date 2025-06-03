import { useQuery } from 'react-query'
import { QUERY_KEYS } from './querykeys'
import { useAtomValue } from 'jotai'
import { detailsAtom } from '@/states/dashboardState'
import { isLoggedInAtom } from '@/states/utilsState'
import { IUser } from '@/models/User'
import httpService from '@/utils/httpService'
import Urls from '../urls'

const useGetDetails = () => {
    const details  = useAtomValue(detailsAtom);
    const isLoggedIn = useAtomValue(isLoggedInAtom);

  return useQuery([QUERY_KEYS.getUserDetails], () => httpService.get(Urls.getUser), {
    enabled: isLoggedIn,
  },
);
}

export default useGetDetails