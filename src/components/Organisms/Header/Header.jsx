import React from 'react';

import Logo from '../../Atoms/Logo/Logo';
import Navbar from '../../Molecules/Navbar/Navbar';
import Title from '../../Atoms/Title/Title';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';

const Header = ({ active }) => {
  const { authentication } = useAuthenticationStore();

  return <header>
    <div>
      <Logo url="/media/favicon_io/favicon.ico" alt="Logo du site Ebetor" />
      <Title text="Ebetor" />
    </div>
    {authentication.logged && <div>
      <span>{authentication.name} | </span>
      <span>{authentication.coins} coins</span>
    </div>}
    <Navbar active={active} />
  </header>;
};

export default Header;
