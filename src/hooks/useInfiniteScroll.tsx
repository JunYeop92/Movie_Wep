import { useEffect, useRef } from 'react'

interface IProps {
  rootMargin?: string
  threshold?: number
  disable: boolean
  hasNextPage: boolean
  fetchCallback: (page: number) => Promise<void>
}

export default function useInfiniteScroll({
  rootMargin = '0px',
  threshold = 0,
  disable,
  hasNextPage,
  fetchCallback,
}: IProps) {
  const page = useRef(1)
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (!targetRef.current || disable || !hasNextPage) return undefined

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting) {
        page.current += 1
        fetchCallback(page.current)
      }
    }

    const option = {
      root: rootRef.current,
      rootMargin,
      threshold,
    }
    const observer = new IntersectionObserver(handleObserver, option)
    observer.observe(targetRef.current)

    return () => {
      observer && observer.disconnect()
      page.current = 1
    }
  }, [disable, fetchCallback, hasNextPage, rootMargin, threshold])

  useEffect(() => {
    fetchCallback(1)
  }, [fetchCallback])

  return { targetRef, rootRef }
}
