import _ from 'lodash'
import { axios } from 'hooks/worker'
import { getOverlapCount } from 'utils'
import { ISearchAPIRes, ISearchParams } from 'types/search.d'

const OMD_BASE_URL = 'http://www.omdbapi.com/'

export const getSearchResApi = (params: ISearchParams) =>
  axios.get<ISearchAPIRes>(OMD_BASE_URL, {
    params: {
      apikey: process.env.REACT_APP_OMD_API_KEY,
      ...params,
    },
  })

export const fetchSearchData = async (s: string, page: number) => {
  const { data } = await getSearchResApi({ s, page })
  const { Search: dataItems, totalResults } = data
  const originItems = dataItems.map((item) => ({ ...item, isFavor: false }))

  const overlapCount = getOverlapCount(originItems, 'imdbID') // 중복 개수
  const searchItems = _.uniqBy(originItems, 'imdbID') // 중복 제거
  return { searchItems, totalResults, overlapCount }
}
