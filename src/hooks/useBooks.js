import { fetcher, post } from '@/lib/axios'
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

export const useBookRFID = ({ params }) => {
  const { data, isLoading, mutate } = useSWR(
    Object.keys(params).length > 0 && {
      postendpoint: '/books/get_book_rfids',
      postData: { ...params },
      config: {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    }, post,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false
    }
  )

  return {
    data,
    isLoading,
    mutate
  }
}