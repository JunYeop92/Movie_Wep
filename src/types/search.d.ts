export interface ISearchItem {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export interface ISearchAPIRes {
  Search: ISearchItem[]
  totalResults: string
  Response: string
}
