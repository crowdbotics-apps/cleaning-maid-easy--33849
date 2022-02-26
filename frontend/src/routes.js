
import Login from './Containers/Login'
import Calendar from './Containers/Calendar'
import ForgotPassword from './Containers/ForgotPassword'
import ResetPassword from './Containers/ResetPassword'
import Services from 'Containers/Services'
import Customers from 'Containers/Customers'
import Teams from '../src/Containers/Teams'
import Employees from 'Containers/Employees'
import ScheduleService from '../src/Containers/ScheduleServices'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    layout: '/auth'
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgotPassword,
    layout: '/auth'
  },
  {
    path: '/resetPassword',
    name: 'ResetPassword',
    component: ResetPassword,
    layout: '/auth'
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'nc-icon nc-calendar-60',
    component: Calendar,
    layout: '/admin'
  },
  {
    path: '/services',
    name: 'Services',
    icon: 'nc-icon nc-calendar-60',
    component: Services,
    layout: '/admin'
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: 'nc-icon nc-calendar-60',
    component: Customers,
    layout: '/admin'
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'nc-icon nc-calendar-60',
    component: Teams,
    layout: '/admin'
  },
  {
    path: '/employees',
    name: 'Employees',
    icon: 'nc-icon nc-calendar-60',
    component: Employees,
    layout: '/admin'
  },
  {
    path: '/scheduleService',
    name: 'Schedule Service',
    icon: 'nc-icon nc-calendar-60',
    component: ScheduleService,
    layout: '/admin'
  },
  
]

export default routes
