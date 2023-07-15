import { fetcher, logout } from '@/lib/axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

export const useUser = ({ middleware, redirectIfAuthenticated, options } = {}) => {
  const router = useRouter()

  const { data, error, isLoading, mutate } = useSWR({ url: '/user' }, fetcher, {
    revalidateOnFocus: false
  })

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && data)
      router.push(redirectIfAuthenticated)
    if (middleware === 'auth' && error) {
      logout()
    }

  }, [middleware, redirectIfAuthenticated, data])

  return {
    data,
    error,
    isLoading,
    mutate
  }
}
