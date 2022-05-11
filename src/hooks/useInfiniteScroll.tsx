import { useEffect, useState } from 'react'

interface IProps {
  rootEle?: HTMLElement | null
  rootMargin?: string
  threshold?: number
  targetEle: HTMLDivElement | null
  hasData: boolean
  endPage: number
}

export default function useInfiniteScroll({
  rootEle = null,
  rootMargin = '0px',
  threshold = 0,
  targetEle,
  hasData,
  endPage,
}: IProps) {
  const [page, setPage] = useState(1)
  const [canIncPage, setCanIncPage] = useState(true)
  console.log('infinite', page)
  useEffect(() => {
    if (!targetEle || !hasData || !canIncPage) return undefined

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        setPage((prev) => prev + 1)
      }
    }

    const option = {
      root: rootEle,
      rootMargin,
      threshold,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(targetEle)

    return () => observer && observer.disconnect()
  }, [canIncPage, hasData, rootEle, rootMargin, targetEle, threshold])

  useEffect(() => {
    if (endPage > 0 && page >= endPage) {
      setCanIncPage(false)
    }
  }, [page, endPage])

  return page
}
