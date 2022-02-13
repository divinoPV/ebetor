import React from 'react';

import Logo from '../../Atoms/Logo/Logo';
import Navbar from '../../Molecules/Navbar/Navbar';
import Title from '../../Atoms/Title/Title';

const Header = ({ active }) => <header>
  <div>
    <Logo url='/media/favicon_io/favicon.ico' alt='Logo du site Ebetor' />
    <Title text='Ebetor' />
  </div>
  <Navbar active={active} />
</header>;

export default Header;
