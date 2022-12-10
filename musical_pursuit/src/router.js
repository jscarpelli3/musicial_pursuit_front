import { createWebHistory, createRouter } from 'vue-router'
import MainPage from './components/MainPage'
import GameMain from './components/GameMain'
// import LoginPage from './components/LoginPage'
import UserLanding from './components/UserLanding'


const routes = [
  { path: '/', component: MainPage, name: MainPage },
  // { path: '/login', component: LoginPage, name: LoginPage },
  { path: '/dashboard', component: UserLanding, name: UserLanding },
  { path: '/game', component: GameMain, name: GameMain },
  // { path: '/watchlist', component: WatchList, name: Watchlist }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router