import { axios } from 'hooks/worker'
import { ISearchAPIRes, ISearchParams } from 'types/search.d'

const OMD_BASE_URL = 'http://www.omdbapi.com/'

export const getSearchResApi = (params: ISearchParams) =>
  axios.get<ISearchAPIRes>(OMD_BASE_URL, {
    params: {
      apikey: process.env.REACT_APP_OMD_API_KEY,
      ...params,
    },
  })
