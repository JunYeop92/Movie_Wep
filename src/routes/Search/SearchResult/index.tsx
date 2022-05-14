import { useCallback, useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { useRecoilState } from 'recoil'
import { searchInputAtom, isInitSearchAtom, searchItemsAtom } from 'recoil/search'
import { fetchSearchData } from 'services/search'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import List from 'components/List'

export default function SearchResult() {
  const [isInit, setIsInit] = useRecoilState(isInitSearchAtom)
  const [searchInput, setSearchInput] = useRecoilState(searchInputAtom)
  const [items, setItems] = useRecoilState(searchItemsAtom)
  const [hasNextPage, setHasNextPage] = useState(false)
  const overlapCountRef = useRef(0)

  const fetchCallback = useCallback(
    async (page: number) => {
      if (searchInput === '') return
      const { searchItems, totalResults, overlapCount } = await fetchSearchData(searchInput, page)
      setItems((prev) => [...prev, ...searchItems])
      overlapCountRef.current += overlapCount
      const endPage = Math.ceil(Number(totalResults - overlapCountRef.current) / 10) // 최종 개수 - 중복 개수
      setHasNextPage(page < endPage)
    },
    [searchInput, setItems]
  )

  const { targetRef } = useInfiniteScroll({
    disable: items.length === 0,
    hasNextPage,
    fetchCallback,
  })

  useEffect(() => {
    ;(async () => {
      if (!isInit) return
      setHasNextPage(false)
      setItems([])
      setIsInit(false)
      overlapCountRef.current = 0
      await fetchCallback(1)
    })()
  }, [fetchCallback, isInit, setIsInit, setItems])

  useEffect(() => {
    return () => {
      setItems([])
      setSearchInput('')
    }
  }, [setItems, setSearchInput])

  // useEffect(() => {
  //   fetchCallback(1)
  // }, [fetchCallback])

  return <List items={items} targetRef={targetRef} />
}
