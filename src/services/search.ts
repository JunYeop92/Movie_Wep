import _ from 'lodash'
import { axios } from 'hooks/worker'
import { favorStorage, getOverlapCount } from 'utils'
import { ISearchAPIError, ISearchAPIRes, ISearchParams } from 'types/search.d'

const OMD_BASE_URL = 'http://www.omdbapi.com/'

export const getSearchResApi = (params: ISearchParams) =>
  axios.get<ISearchAPIRes | ISearchAPIError>(OMD_BASE_URL, {
    params: {
      apikey: process.env.REACT_APP_OMD_API_KEY,
      ...params,
    },
  })

export const fetchSearchData = async (s: string, page: number) => {
  const { data } = await getSearchResApi({ s, page })

  if (!data.Response) {
    const { Error: errorMsg } = data as ISearchAPIError
    return { response: false, errorMsg }
  }

  const { Search: dataItems, totalResults } = data as ISearchAPIRes
  const favorItems = favorStorage.getItem('favorItems')
  const originItems = dataItems.map((item) => {
    for (const favor of favorItems) {
      if (item.imdbID === favor.imdbID) return { ...item, isFavor: true }
    }

    return { ...item, isFavor: false }
  })
  const overlapCount = getOverlapCount(originItems, 'imdbID') // 중복 개수
  const searchItems = _.uniqBy(originItems, 'imdbID') // 중복 제거
  return { response: true, searchItems, totalResults, overlapCount }
}
