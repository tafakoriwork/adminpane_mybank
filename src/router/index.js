import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'suppliers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Suppliers.vue')
  },
  {
    path: '/wallets',
    name: 'wallets',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wallets.vue')
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import(/* webpackChunkName: "about" */ '../views/Customers.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
