import { useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { asyncSearchSelector } from 'recoil/search'

interface IProps {
  children: React.ReactNode
  searchInput: string
  page: number
}

export default function InfinteScroll({ children, searchInput, page }: IProps) {
  const items = useRecoilValue(asyncSearchSelector({ s: searchInput, page }))

  // const fetchCallback = useCallback(
  //   async (page: number) => {
  //     if (searchInputVal === '') return
  //     const { searchItems, totalResults, overlapCount } = await fetchSearchData(searchInputVal, page)
  //     setItems((prev) => [...prev, ...searchItems])
  //     overlapCountRef.current += overlapCount
  //     const endPage = Math.ceil(Number(totalResults - overlapCountRef.current) / 10) // 최종 개수 - 중복 개수
  //     setHasNextPage(page < endPage)
  //   },
  //   [searchInputVal, setItems]
  // )

  // const [isInit, setIsInit] = useRecoilState(isInitSearch)
  // const [hasNextPage, setHasNextPage] = useState(false)
  // const overlapCountRef = useRef(0)

  // const page = useRef(1)
  // const rootRef = useRef<HTMLDivElement>(null)
  // const targetRef = useRef<HTMLLIElement>(null)
  // const [hasNextPage, setHasNextPage] = useState(false)
  // const [disable, setDisable] = useState(false)

  // useEffect(() => {
  //   if (!targetRef.current || disable || !hasNextPage) return undefined

  //   const handleObserver = (entries: IntersectionObserverEntry[]) => {
  //     const target = entries[0]
  //     if (target.isIntersecting) {
  //       page.current += 1
  //       fetchCallback(page.current)
  //     }
  //   }

  //   const option = {
  //     root: rootRef.current,
  //     rootMargin,
  //     threshold,
  //   }
  //   const observer = new IntersectionObserver(handleObserver, option)
  //   observer.observe(targetRef.current)

  //   return () => {
  //     observer && observer.disconnect()
  //     page.current = 1
  //   }
  // }, [disable, fetchCallback, hasNextPage, rootMargin, threshold])

  // useEffect(() => {
  //   fetchCallback(1)
  // }, [fetchCallback])

  return { children }
}
