import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/pages/Login'
import Register from '@/components/pages/Register'
import Overview from '@/components/pages/Overview'
import Detail from '@/components/pages/Detail'
import Book from '@/components/pages/Book'
import MyVehicles from '@/components/pages/Myvehicles'
import Bookings from '@/components/pages/Bookings'
import Chargingpoints from '@/components/pages/Chargingpoints'
import Profile from '@/components/pages/Profile'
import Info from '@/components/pages/Info'
import Requests from '@/components/pages/Requests'

import Menu from '@/components/pages/createVehicle/menu'
import Step1 from '@/components/pages/createVehicle/step1'
import Step2 from '@/components/pages/createVehicle/step2'
import Step3 from '@/components/pages/createVehicle/step3'
import Step4 from '@/components/pages/createVehicle/step4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/myvehicles',
      name: 'MyVehicles',
      component: MyVehicles
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
      path: '/chargingpoints',
      name: 'Chargingpoints',
      component: Chargingpoints
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests
    },
    {
      path: '/vehicles/create',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/vehicles/create/step1',
      name: 'Step1',
      component: Step1
    },
    {
      path: '/vehicles/create/step2',
      name: 'Step2',
      component: Step2
    },
    {
      path: '/vehicles/create/step3',
      name: 'Step3',
      component: Step3
    },
    {
      path: '/vehicles/create/step4',
      name: 'Step4',
      component: Step4
    }
  ]
})
