import { fetcher } from '@/lib/axios'
import useSWR from 'swr'
export const useBorrows = ({ params }) => {

  const checkParamsAvailability = (queryParam) => {
    return Object.keys(queryParam).some((key) => queryParam[key])
  }

  const { data, isLoading, error, mutate } = useSWR(checkParamsAvailability(params) ? { url: '/books/borrow_list', params: params } : "", fetcher, {
    revalidateOnFocus: false
  })

  return {
    borrowData: data,
    borrowLoading: isLoading,
    borrowError: error,
    borrowMutate: mutate
  }
}