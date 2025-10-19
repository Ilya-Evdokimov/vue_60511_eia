import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import UserList from '../components/UserList.vue'
import postCatalog from '../components/postCatalog.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/posts',
    name: 'postCatalog',
    component: postCatalog
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
