import styles from './List.module.scss'
import { ISearchItem } from 'types/search'
import Item from './Item'

interface IProps {
  items: ISearchItem[]
  targetRef: React.LegacyRef<HTMLLIElement>
}

export default function List({ items, targetRef }: IProps) {
  return (
    <article className={styles.wrapper}>
      {items.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ul>
          {items.map((item: ISearchItem, index) => {
            const key = `searchItem-${index}`
            return <Item key={key} item={item} />
          })}
          <li className={styles.endPoint} ref={targetRef} />
        </ul>
      )}
    </article>
  )
}
