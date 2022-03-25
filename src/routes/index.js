import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

export const routes = [
  {
    path: '/',
    exact: true,
    protected: false,
    title: 'Trang chủ',
    component: Home,
  },
  {
    path: '/login',
    exact: true,
    protected: false,
    title: 'Trang đăng nhập',
    component: Login,
  },
];
