import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchInput, isInitSearch, atomSearchItems } from 'recoil/search'
import { ISearchItem } from 'types/search'
import { getSearchResApi } from 'services/search'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

import SearchItem from './SearchItem'
import styles from './SearchResult.module.scss'

const fetchSearchData = async (s: string, page: number) => {
  const { data } = await getSearchResApi({ s, page })
  const { Search: dataItems, totalResults } = data
  const endPage = Math.ceil(Number(totalResults) / 10)
  const searchItems = dataItems.map((item) => ({ ...item, isFavor: false }))

  return { searchItems, endPage }
}

export default function SearchResult() {
  const [isInit, setIsInit] = useRecoilState(isInitSearch)
  const searchInputVal = useRecoilValue(searchInput)
  const [items, setItems] = useRecoilState(atomSearchItems)
  const [hasNextPage, setHasNextPage] = useState(false)

  const fetchCallback = useCallback(
    async (page: number) => {
      if (searchInputVal === '') return

      const { searchItems, endPage } = await fetchSearchData(searchInputVal, page)
      setItems((prev) => [...prev, ...searchItems])
      setHasNextPage(page < endPage)
    },
    [searchInputVal, setItems]
  )

  const { targetRef } = useInfiniteScroll({
    disable: items.length === 0,
    hasNextPage,
    fetchCallback,
  })

  useEffect(() => {
    if (!isInit) return
    setHasNextPage(false)
    setItems([])
    setIsInit(false)
  }, [isInit, setIsInit, setItems])

  return (
    <article className={styles.wrapper}>
      {items.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ul>
          {items.map((item: ISearchItem, index) => {
            const key = `searchItem-${index}`
            return <SearchItem key={key} item={item} />
          })}
          <li className={styles.endPoint} ref={targetRef} />
        </ul>
      )}
    </article>
  )
}
