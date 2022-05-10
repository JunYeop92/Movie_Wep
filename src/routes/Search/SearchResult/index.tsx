import { useMemo, useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { searchResultSelector } from 'recoil/search'
import { ISearchItem } from 'types/search'
import SearchItem from './SearchItem'
import styles from './SearchResult.module.scss'

export default function SearchResult() {
  const searchLoadable = useRecoilValueLoadable(searchResultSelector)
  const [loading, setLoading] = useState(true)
  const contents = useMemo(
    () => (searchLoadable?.state === 'hasValue' ? (setLoading(false), searchLoadable.contents) : []),
    [searchLoadable]
  )

  return (
    <article className={styles.wrapper}>
      {contents.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ul>
          {contents.map((item: ISearchItem) => (
            <SearchItem key={item.imdbID} item={item} />
          ))}
        </ul>
      )}
    </article>
  )
}
