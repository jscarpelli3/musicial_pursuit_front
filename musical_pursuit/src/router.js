import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage'
import GameMain from './components/GameMain'
import Dashboard from './components/Dashboard'
import LoggedOut from './components/LoggedOut'
import RegisterPage from './components/RegisterPage'
import UserBoard from './components/UserBoard'


const routes = [
  { path: '/', component: MainPage, name: MainPage },
  { path: '/loggedout', component: LoggedOut, name: LoggedOut },
  { path: '/dashboard', component: Dashboard, name: Dashboard },
  { path: '/game', component: GameMain, name: GameMain },
  { path: '/register', component: RegisterPage, name: RegisterPage },
  { path: '/viewusers', component: UserBoard, name: UserBoard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router