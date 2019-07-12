import mainPage from '@/components/main-page/main-page';
import loginPage from '@/components/login-page/login-page';
import registerPage from '@/components/register-page/register-page';
import profile from '@/components/profile-page/profile-page';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: loginPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      component: registerPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      component: mainPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      component: profile,
      meta: {
        requiresAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && localStorage.getItem('jwtToken') != null) {
    next({
      path: '/',
    });
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwtToken') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    next();
  }
});
export default router;