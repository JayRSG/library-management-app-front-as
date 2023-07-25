import { fetcher, logout } from '@/lib/axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export const useAllUsers = ({ params } = {}) => {
  const router = useRouter()

  const { data, error, isLoading, mutate } = useSWR(params?.account_type && { url: '/admin/users', params: params }, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 5000
  })

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
