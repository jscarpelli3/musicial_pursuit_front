import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage'
import GameMain from './components/GameMain'
import Dashboard from './components/Dashboard'
import LoggedOut from './components/LoggedOut'
import RegisterPage from './components/RegisterPage'
import AllUserBoard from './components/AllUserBoard'
import UserBarks from './components/UserBarks'


const routes = [
  { path: '/', component: MainPage, name: MainPage },
  { path: '/loggedout', component: LoggedOut, name: LoggedOut },
  { path: '/dashboard', component: Dashboard, name: Dashboard },
  { path: '/game', component: GameMain, name: GameMain },
  { path: '/register', component: RegisterPage, name: RegisterPage },
  { path: '/viewusers', component: AllUserBoard, name: AllUserBoard },
  { path: '/viewbarks', component: UserBarks, name: UserBarks },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router