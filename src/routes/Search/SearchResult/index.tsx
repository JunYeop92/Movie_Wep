import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchInputAtom, isInitSearchAtom, searchItemsAtom } from 'recoil/search'
import { fetchSearchData } from 'services/search'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import List from 'components/List'
import styles from './SearchResult.module.scss'
import { cx } from 'styles'

export default function SearchResult() {
  const [isInit, setIsInit] = useRecoilState(isInitSearchAtom)
  const [searchInput, setSearchInput] = useRecoilState(searchInputAtom)
  const [items, setItems] = useRecoilState(searchItemsAtom)
  const [hasNextPage, setHasNextPage] = useState(false)
  const overlapCountRef = useRef(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    isError: false,
    msg: '',
  })

  const fetchCallback = useCallback(
    async (page: number) => {
      if (searchInput === '') return
      setLoading(true)
      const data = await fetchSearchData(searchInput, page)
      if (!data.response) {
        setLoading(false)
        setError({
          isError: true,
          msg: data.errorMsg as string,
        })
        return
      }

      const { searchItems, totalResults, overlapCount } = data as any
      setItems((prev) => [...prev, ...searchItems])
      overlapCountRef.current += overlapCount
      const endPage = Math.ceil(Number(totalResults - overlapCountRef.current) / 10) // 최종 개수 - 중복 개수
      setHasNextPage(page < endPage)
      setLoading(false)
      setError({
        isError: false,
        msg: '',
      })
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

  if (error.isError) return <div className={cx(styles.exception, styles.error)}>Error : {error.msg}</div>
  if (loading) return <div className={styles.exception}>loading...</div>
  if (searchInput === '') return <div className={styles.exception}>No Results Found</div>
  return <List items={items} targetRef={targetRef} />
}
