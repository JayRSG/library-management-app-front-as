
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

const fetcher = async (url) => {
  return axios.get(url).then(res => res.data)
}

const SwrClient = ({ endpoint, middleware, redirectIfAuthenticated, options } = {}) => {
  const router = useRouter()

  const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
  })

  useEffect(() => {
    if (endpoint == '/user' || endpoint == "/admin") {
      if (middleware === 'guest' && redirectIfAuthenticated && data)
        router.push(redirectIfAuthenticated)
      if (middleware === 'auth' && error) {
        console.log(endpoint)
        logout()
      }
    }
  }, [endpoint, middleware, redirectIfAuthenticated])

  const get = (key = null) => {
    if (key) {
      mutate(key)
    }
    else {
      mutate()
    }
  }

  const logout = async () => {
    try {
      return await axios.post('/logout', { logout: true }, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      })
    } catch (error) {
      console.log("error logging out")
      // throw error
    }

    window.location.pathname = '/'
  }

  const post = async ({ postendpoint, postData, options }) => {
    try {
      // Post data to the API
      return await axios.post(postendpoint, postData, { ...options })
    } catch (error) {
      console.error('Error posting data:', error)
      throw error // Rethrow the error
    }
  }

  const put = async ({ putendpoint, updatedData, options }) => {
    try {
      // Update data in the API
      return await axios.put(putendpoint, updatedData, { ...options })
    } catch (error) {
      console.error('Error updating data:', error)
      throw error // Rethrow the error
    }
  }

  const del = async ({ delendpoint, options }) => {
    try {
      // Delete data from the API
      return await axios.delete(delendpoint, { ...options })
    } catch (error) {
      console.error('Error deleting data:', error)
      throw error // Rethrow the error
    }
  }


  return {
    data,
    error,
    isLoading,
    get,
    post,
    put,
    del,
    logout
  }
}

export default SwrClient