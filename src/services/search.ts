import { axios } from 'hooks/worker'
import { ISearchAPIRes } from 'types/search.d'

const OMD_BASE_URL = 'http://www.omdbapi.com/'

interface Params {
  s: string
  page: number
}

export const getSearchResApi = (params: Params) =>
  axios.get<ISearchAPIRes>(OMD_BASE_URL, {
    params: {
      apikey: process.env.REACT_APP_OMD_API_KEY,
      ...params,
    },
  })
