import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage'
import GameMain from './components/GameComponents/GameMain'
import Dashboard from './components/Dashboard'
import LoggedOut from './components/LoggedOut'
import RegisterPage from './components/RegisterPage'
import AllUserBoard from './components/AllUserBoard'
import UserBoardUser from './components/UserBoardUser'
import UserBarks from './components/UserBarks'
import ByePage from './components/ByePage'
import NewBark from './components/NewBark'


const routes = [
  { path: '/', component: MainPage, name: MainPage, props:true },
  { path: '/loggedout', component: LoggedOut, name: LoggedOut, props:true },
  { path: '/dashboard', component: Dashboard, name: Dashboard, props:true },
  { path: '/game', component: GameMain, name: GameMain, props:true },
  { path: '/register', component: RegisterPage, name: RegisterPage,props:true },
  { path: '/viewusers', component: AllUserBoard, name: AllUserBoard, props:true },
  { path: '/user_user', component: UserBoardUser, name: UserBoardUser, props:true },
  { path: '/viewbarks', component: UserBarks, name: UserBarks, props:true },
  { path: '/bye', component: ByePage, name: ByePage, props:true },
  { path: '/newbark/:recipientId/:recipientHandle', component: NewBark, name: NewBark, props:true },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router