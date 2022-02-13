import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Login from '../Pages/Login/Login';

const Home = lazy(() => import ('../Pages/Home/Home'));
const Leagues = lazy(() => import ('../Pages/League/Leagues'));
const Videogames = lazy(() => import ('../Pages/Videogame/Videogames'));
const Lives = lazy(() => import ('../Pages/Live/Lives'));
const Matches = lazy(() => import ('../Pages/Match/Matches'));
const Players = lazy(() => import ('../Pages/Player/Players'));
const Series = lazy(() => import ('../Pages/Serie/Series'));
const Teams = lazy(() => import ('../Pages/Team/Teams'));
const Tournaments = lazy(() => import ('../Pages/Tournament/Tournaments'));

const Router = () => <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route index element={<Home />} />
    <Route path="leagues" element={<Leagues />} />
    <Route path="videogames" element={<Videogames />} />
    <Route path="lives" element={<Lives />} />
    <Route path="matches" element={<Matches />} />
    <Route path="players" element={<Players />} />
    <Route path="series" element={<Series />} />
    <Route path="teams" element={<Teams />} />
    <Route path="tournaments" element={<Tournaments />} />
    <Route path="login" element={<Login />} />
  </Routes>
</Suspense>;

export default Router;
