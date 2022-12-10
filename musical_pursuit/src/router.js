import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage'
import GameMain from './components/GameMain'
import UserLanding from './components/UserLanding'
import LoggedOut from './components/LoggedOut'
import RegisterPage from './components/RegisterPage'


const routes = [
  { path: '/', component: MainPage, name: MainPage },
  { path: '/loggedout', component: LoggedOut, name: LoggedOut },
  { path: '/dashboard', component: UserLanding, name: UserLanding },
  { path: '/game', component: GameMain, name: GameMain },
  { path: '/register', component: RegisterPage, name: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router