import PageInit from '@/views/layouts/layoutHome/PageInit.vue'
/* import NotFound from '@/views/NotFoundPage.vue'; */

const routes = [
  {
    path: '/',
    redirect: 'init',
    component: PageInit,
    children: [
      {
        path: '/init',
        name: 'init',
        component: () => import('../views/pages/home/PageHome.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/home/PageRegister.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/home/PageLogin.vue')
      },
    ],
  },
];

export default routes;