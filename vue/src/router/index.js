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
import ProfileEdit from '@/components/pages/ProfileEdit'
import Info from '@/components/pages/Info'
import Requests from '@/components/pages/Requests'
import Contact from '@/components/pages/Contact'

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
      path: '/overview/:place&:startdate&:enddate',
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
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/profile/edit/:id',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests
    },
    {
      path: '/vehicles/edit/:id',
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
    },
    {
      path: '/vehicles/edit/:id/step1',
      name: 'Edit_Step1',
      component: Step1
    },
    {
      path: '/vehicles/edit/:id/step2',
      name: 'Edit_Step2',
      component: Step2
    },
    {
      path: '/vehicles/edit/:id/step3',
      name: 'Edit_Step3',
      component: Step3
    },
    {
      path: '/vehicles/edit/:id/step4',
      name: 'Edit_Step4',
      component: Step4
    }
  ]
})
