import { Link } from 'react-router-dom';
import ImageItem from '../../../Atoms/Images/Items/ImageItem';
import styles from './LeagueItem.module.scss';

const LeagueItem = ({ alt, children, className, id, name, src, ...rest }) =>
  <Link className={`${styles['LeagueItem']}`} to={`/matches?league=${id}`}>
    <strong className={`${styles['LeagueItem__title']}`}>{name}</strong>
    <div className={`${styles['LeagueItem__image']}`}>
      <ImageItem alt={alt} className={className} src={src} {...rest} />
    </div>
    {children}
  </Link>
;

export default LeagueItem;
