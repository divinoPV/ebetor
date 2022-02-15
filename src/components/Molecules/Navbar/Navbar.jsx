import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import pages from '../../../utils/pages';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';
import styles from './Navbar.module.scss';

const Navbar = ({ active }) => {
  const login = 'login';
  const logout = 'logout';

  const [links, setLinks] = useState(pages);

  const { authentication } = useAuthenticationStore();

  let element = value => ({ id: links.slice(-1)[0].id + 1, name: value });

  const statusAuth = (reverse = false) => reverse ? !authentication.logged ? logout : login : authentication.logged ? logout : login;

  const filter = links.filter(e => e.name !== statusAuth(true));

  const addPage = ((!links.find(e => e.name === statusAuth()) && links.push(element(statusAuth()))) && filter) || filter;

  useEffect(() => setLinks(addPage ? addPage : links), [authentication]);

  return <nav>
    {links.map(link => (
      <Link key={link.id}
            className={active === link.name ? styles.active : undefined}
            to={`/${link.name !== links[0].name ? link.name : ''}`}
      >
        {link.name.split('').map((char, key) => key === 0 ? char.toUpperCase() : char.toLowerCase()).join('')}
      </Link>
    ))}
  </nav>;
};

export default Navbar;
