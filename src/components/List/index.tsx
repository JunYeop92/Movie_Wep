import styles from './List.module.scss'
import { ISearchItem } from 'types/search'
import Item from './Item'

interface IProps {
  items: ISearchItem[]
  targetRef?: React.LegacyRef<HTMLLIElement>
  isFavorType?: boolean
}

export default function List({ items, targetRef, isFavorType = false }: IProps) {
  return (
    <article className={styles.wrapper}>
      {items.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ul>
          {items.map((item: ISearchItem) => {
            return <Item key={item.imdbID} item={item} isFavorType={isFavorType} />
          })}
          {targetRef && <li className={styles.endPoint} ref={targetRef} />}
        </ul>
      )}
    </article>
  )
}
