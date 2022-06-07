import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from '@/components/teams/TeamsList';
import UsersList from '@/components/users/UsersList';
import TeamMembers from '@/components/teams/TeamMembers';
import PageNotFound from '@/components/nav/PageNotFound';
import TeamsFooter from '@/components/teams/TeamsFooter';
import UsersFooter from '@/components/users/UsersFooter';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      path: '/teams',
      meta: { needsAuth: true },
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        { path: ':teamID', name: 'team-members', component: TeamMembers, props: true }
      ]
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      beforeEnter(to, from, next) {
        console.log(to, from);
        next()
      }
    },
    { path: '/:catchAll(.*)', component: PageNotFound }
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from);
    if (savedPosition) { return savedPosition; }
    return { left: 0, top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.needsAuth) {                 // some Auth check
    next()
  } else {
    next()
  }
});

router.afterEach((to, from) => {
  console.log(to, from);
})

export default router