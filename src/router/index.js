import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPage.vue'
import CommentsList from '../components/CommentsList.vue'
import postCatalog from '../components/postCatalog.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/comments',
    name: 'Comments',
    component: CommentsList
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
