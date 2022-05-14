import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchInput, isInitSearch, atomSearchItems } from 'recoil/search'
import { getSearchResApi } from 'services/search'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import List from 'components/List'
import _ from 'lodash'
import { getOverlapCount } from 'utils'

const fetchSearchData = async (s: string, page: number) => {
  const { data } = await getSearchResApi({ s, page })
  const { Search: dataItems, totalResults } = data
  const originItems = dataItems.map((item) => ({ ...item, isFavor: false }))

  const overlapCount = getOverlapCount(originItems, 'imdbID') // 중복 개수
  const searchItems = _.uniqBy(originItems, 'imdbID') // 중복 제거
  return { searchItems, totalResults: Number(totalResults), overlapCount }
}

export default function SearchResult() {
  const [isInit, setIsInit] = useRecoilState(isInitSearch)
  const [searchInputVal, setSearchVal] = useRecoilState(searchInput)
  const [items, setItems] = useRecoilState(atomSearchItems)
  const [hasNextPage, setHasNextPage] = useState(false)
  const overlapCountRef = useRef(0)

  const fetchCallback = useCallback(
    async (page: number) => {
      if (searchInputVal === '') return
      const { searchItems, totalResults, overlapCount } = await fetchSearchData(searchInputVal, page)
      setItems((prev) => [...prev, ...searchItems])
      overlapCountRef.current += overlapCount
      const endPage = Math.ceil(Number(totalResults - overlapCountRef.current) / 10) // 최종 개수 - 중복 개수
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
    ;(async () => {
      if (!isInit) return
      setHasNextPage(false)
      setItems([])
      setIsInit(false)
      overlapCountRef.current = 0
      await fetchCallback(1)
    })()
  }, [fetchCallback, isInit, setIsInit, setItems, setSearchVal])

  useEffect(() => {
    return () => {
      setItems([])
      setSearchVal('')
    }
  }, [setItems, setSearchVal])

  // useEffect(() => {
  //   fetchCallback(1)
  // }, [fetchCallback])

  return <List items={items} targetRef={targetRef} />
}
