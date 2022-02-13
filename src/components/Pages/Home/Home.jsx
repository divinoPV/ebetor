import Header from '../../Organisms/Header/Header';
import TitlePage from '../../Atoms/Title/TitlePage/TitlePage';
import Main from '../../Organisms/Main/Main';
import { useAuthenticationStore } from '../../Trumps/Stores/Authentication/store';

const Home = () => {
  const { authentication } = useAuthenticationStore();

  console.log(authentication);

  return <>
    <Header active="home" />
    <Main>
      <TitlePage text="Bienvenue sur Ebetor !" />
    </Main>
  </>;
};

export default Home;
