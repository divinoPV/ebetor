import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import ('../Pages/Home/Home'));
const Leagues = lazy(() => import ('../Pages/League/Leagues'));
const Matches = lazy(() => import ('../Pages/Match/Matches'));
const Teams = lazy(() => import ('../Pages/Team/Teams'));
const Champions = lazy(() => import ('../Pages/Champion/Champions'));
const Login = lazy(() => import ('../Pages/Authentication/Login/Login'));
const Register = lazy(() => import ('../Pages/Authentication/Register/Register'));
const Logout = lazy(() => import ('../Pages/Authentication/Logout/Logout'));

const Router = () => <Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route index element={<Home />} />
    <Route path="leagues" element={<Leagues />} />
    <Route path="matches" element={<Matches />} />
    <Route path="teams" element={<Teams />} />
    <Route path="champions" element={<Champions />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="logout" element={<Logout />} />
  </Routes>
</Suspense>;

export default Router;
