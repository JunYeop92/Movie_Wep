export interface ISearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
  isFavor: boolean
}

export interface ISearchAPIRes {
  Search: ISearchItem[]
  totalResults: number
  Response: boolean
}

export interface ISearchParams {
  s: string
  page: number
}
