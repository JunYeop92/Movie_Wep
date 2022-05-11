import styles from './SearchItem.module.scss'
import { ISearchItem } from 'types/search.d'

interface IProps {
  item: ISearchItem
}

export default function SearchItem({ item }: IProps) {
  return (
    <li className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={item.Poster} alt='movie_poster' />
      </div>
      <ul>
        <li>
          <dt>Title</dt>
          <dd>{item.Title}</dd>
        </li>
        <li>
          <dt>Year</dt>
          <dd>{item.Year}</dd>
        </li>
        <li>
          <dt>Type</dt>
          <dd>{item.Type}</dd>
        </li>
      </ul>
    </li>
  )
}
