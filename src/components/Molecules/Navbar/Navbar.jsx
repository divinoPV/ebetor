import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import pages from '../../../utils/pages';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';
import styles from './Navbar.module.scss';

const Navbar = ({ active }) => {
  const login = 'login';
  const register = 'register';
  const logout = 'logout';

  const [links, setLinks] = useState(pages);

  const { authentication } = useAuthenticationStore();

  const addAuthLinks = (() => {
    const newPages = [];
    const statusAuth = authentication.logged ? logout : login;
    const element = value => ({ id: links.slice(-1)[0].id + newPages.length + 1, name: value });

    newPages.push(...links.filter(e => e.name !== !authentication.logged ? logout : login));

    !links.find(e => e.name === statusAuth) && newPages.push(element(statusAuth));

    authentication.logged
      ? links.find(e => e.name === register) && newPages.push(...links.filter(e => e.name === register))
      : !links.find(e => e.name === register) && newPages.push(element(register));

    return newPages;
  })();

  useEffect(() => setLinks(addAuthLinks), [authentication]);

  return <nav>
    {links.map(link => (
      <Link key={link.id}
            className={active === link.name ? styles['active'] : undefined}
            to={`/${link.name !== links[0].name ? link.name : ''}`}
      >
        {link.name.split('').map((char, key) => key === 0 ? char.toUpperCase() : char.toLowerCase()).join('')}
      </Link>
    ))}
  </nav>;
};

export default Navbar;
