import Header from '../../Organisms/Header/Header';
import TitlePage from '../../Atoms/Titles/TitlePage/TitlePage';
import Main from '../../Organisms/Main/Main';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';

const Home = () => {
  return <>
    <Header active="home" />
    <Main>
      <TitlePage text="Bienvenue sur Ebetor !" />
    </Main>
  </>;
};

export default Home;
