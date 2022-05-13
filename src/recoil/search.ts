import { atom } from 'recoil'
import { ISearchItem } from 'types/search'

export const searchInput = atom({
  key: 'searchInput',
  default: '',
})

export const isInitSearch = atom({
  key: 'isInitSearch',
  default: false,
})

export const atomSearchItems = atom<ISearchItem[]>({
  key: 'searchItems',
  default: [],
})

// type SelectorMapper<Type> = {
//   [Property in keyof Type]: Type[Property]
// }

// export const asyncSearchSelector = selectorFamily({
//   key: 'asyncSearchSelector',
//   get: (param: SelectorMapper<ISearchParams>) => async () => {
//     return fetchSearchData(param)
//   },
// })
