import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContentView from '../views/ContentView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import CreateTopicView from '../views/CreateTopicView.vue'
import MyView from '../views/MyView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about/:message',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
    path: '/content/:contentId',
    name: 'content',
    props: true,
    component: ContentView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/createTopic',
    name: 'createTopic',
    component: CreateTopicView
  },
  {
    path: '/my',
    name: 'my',
    component: MyView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const store = router.app.$options.store
  if (to.name !== 'signup' && to.name !== 'login' && !store.state.isLogin) next({ name: 'login' })
  else next()
})
export default router
