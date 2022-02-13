import styles from './Logo.module.scss';

const Logo = ({ url, alt }) => <img className={`${styles.test}`} src={url} alt={alt} />;

export default Logo;
