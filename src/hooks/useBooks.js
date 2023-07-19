import { fetcher } from '@/lib/axios'
import useSWR from 'swr'

export const useBooks = ({ params }) => {
  const { data, isLoading, error, mutate } = useSWR(params?.search_term?.length >= 2 || params?.id ? { url: '/books/show', params: params } : "", fetcher, {
    revalidateOnFocus: false,
  })

  return {
    bookdata: data,
    bookLoading: isLoading,
    bookError: error,
    bookMutate: mutate
  }
}

