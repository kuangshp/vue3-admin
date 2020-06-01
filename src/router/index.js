import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/shared/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { withoutLayout: true },
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
