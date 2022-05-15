import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchInputAtom, isInitSearchAtom, searchItemsAtom } from 'recoil/search'
import { fetchSearchData } from 'services/search'
import { cx } from 'styles'
import styles from './SearchResult.module.scss'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import List from 'components/List'
import Modal from 'components/Modal'

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
      setLoading(false)

      if (!data.response) {
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
  if (searchInput === '') return <div className={styles.exception}>No Results Found</div>
  return (
    <>
      <List items={items} targetRef={targetRef} />
      {loading && (
        <Modal>
          <div className={styles.exception}>loading...</div>
        </Modal>
      )}
    </>
  )
}
