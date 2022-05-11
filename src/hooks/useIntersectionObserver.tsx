import { useEffect } from 'react'

interface IProps {
  root: any
  target: any
  onIntersect: () => {}
  threshold: number
  rootMargin: string
}

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
}: IProps): void {
  useEffect(() => {
    if (!root || !target) return undefined

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe(target)

    return () => observer.unobserve(target)
  }, [target, root, rootMargin, onIntersect, threshold])
}
