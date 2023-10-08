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
    data: data?.data,
    isLoading,
    mutate
  }
}

export const returnBookAction = async (data, mutate = null) => {
  return await post({
    postendpoint: "/books/return_book",
    postData: data,
    config: {
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    }
  }).then(res => {
    if (mutate) {
      mutate()
    }
    return res
  })
}

export const updateBookStock = async (book_id, bookMutate = null) => {
  await fetcher({ url: '/books/update_book_stock', params: { book_id: book_id } })
    .then(res => {
      alert("Updated Stock Fetched")
      if (bookMutate != undefined) {
        bookMutate()
      }
    })
    .catch(error => {
      alert(error?.response?.data?.message)
    })
}