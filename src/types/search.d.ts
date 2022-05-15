export interface ISearchParams {
  s: string
  page: number
}

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

export interface ISearchAPIError {
  Error: string
  Response: boolean
}
