//src/router/index.js

import Party from '@/views/Party.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Products from '@/views/Products_page.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/party',
    name: 'Party',
    component: Party,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
