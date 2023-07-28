import { fetcher, logout } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export const useUser = ({ middleware, redirectIfAuthenticated, options } = {}) => {
  const router = useRouter()

  const { data, error, isLoading, mutate } = useSWR({ url: '/user' }, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 5000
  })

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && data)
      router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) {
      logout(mutate)
    }

  }, [middleware, redirectIfAuthenticated, data, error, router, logout, mutate])

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
