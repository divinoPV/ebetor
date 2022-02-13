import { Link } from 'react-router-dom';

import links from '../../../utils/pages';
import styles from './Navbar.module.scss';

const Navbar = ({ active }) => <nav>
  {links.map(link => (
    <Link key={link.id}
          className={active === link.name ? styles.active : undefined}
          to={`/${link.name !== links[0].name ? link.name : ''}`}
    >
      {link.name.split('').map((char, key) => key === 0 ? char.toUpperCase() : char.toLowerCase()).join('')}
    </Link>
  ))}
</nav>;

export default Navbar;
