import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url, {
  headers: {
    'x-rapidapi-key': '222395b228msh55005afa0fee028p152c94jsnb21e4d1dba16',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com',
  }
}).then(res => res.data)

export const useJobs = (searchTerm: string) => {
  const { data, error } = useSWR(
    searchTerm ? `https://jsearch.p.rapidapi.com/search?query=${searchTerm}` : null,
    fetcher
  )

  return {
    jobs: data?.data,
    isLoading: !error && !data,
    isError: error
  }
}

export const useRecommendedJobs = () => {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}')
    const { desiredJobTitle } = profile
    const { data, error } = useSWR(
      desiredJobTitle ? `https://jsearch.p.rapidapi.com/search?query=${desiredJobTitle}` : null,
      fetcher
    )
  
    return {
      jobs: data?.data,
      isLoading: !error && !data,
      isError: error
    }
  }

export const getJobDetails = async (id: string) => {
  const { data } = await fetcher(`https://jsearch.p.rapidapi.com/job-details?job_id=${id}`)
  return data
}
