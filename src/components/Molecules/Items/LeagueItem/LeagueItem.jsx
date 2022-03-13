import ImageItem from '../../../Atoms/Images/Items/ImageItem';
import styles from './LeagueItem.module.scss';

const LeagueItem = ({ alt, children, className, id, name, src, ...rest }) =>
  <div className={`${styles['LeagueItem']}`}>
    <strong className={`${styles['LeagueItem__title']}`}>{name}</strong>
    <div className={`${styles['LeagueItem__image']}`}>
      <ImageItem alt={alt} className={className} src={src} {...rest} />
    </div>
    {children}
  </div>
;

export default LeagueItem;
