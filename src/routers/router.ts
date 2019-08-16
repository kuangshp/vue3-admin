import login from './shared/login';
import home from './shared/home';
import demo2 from './demo2';
import demo1 from './demo1';

const router = [
  ...login,
  {
    path: '/',
    name: '',
    meta: { title: 'Home' },
    component: () => import('@/components/framement/'),
    redirect: '/home',
    children: [...home, ...demo1, ...demo2],
  },
];

export default router;
