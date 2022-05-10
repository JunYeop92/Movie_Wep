import { atom, selector } from 'recoil'
import { getSearchResApi } from 'services/search'
import { ISearchItem } from 'types/search'

export const searchState = atom<string>({
  key: 'searchState',
  default: '',
})

export const searchResultSelector = selector<ISearchItem[]>({
  key: 'searchResultSelector',
  get: async ({ get }) => {
    const searchVal = get(searchState)
    if (searchVal === '') return []

    const res = await getSearchResApi({
      s: searchVal,
      page: 1,
    })
    console.log(res.data.totalResults)
    return res.data.Search
  },
})
