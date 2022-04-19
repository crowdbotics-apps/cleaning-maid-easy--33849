
import Login from './Containers/Login'
import Calendar from './Containers/Calendar'
import ForgotPassword from './Containers/ForgotPassword'
import ResetPassword from './Containers/ResetPassword'
import Services from 'Containers/Services'
import Customers from 'Containers/Customers'
import Teams from '../src/Containers/Teams'
import Employees from 'Containers/Employees'
import ScheduleService from '../src/Containers/ScheduleServices'
import Profile from 'Containers/Profile'
import EditProfile from 'Containers/EditProfile'
import PrivacyPolicy from 'Containers/PrivacyPolicy'
import TermsConditions from 'Containers/TermsConditions'
import Notification from 'Containers/Notifications'
import PendingServices from 'Containers/PendingServices'


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    layout: '/auth',
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: ForgotPassword,
    layout: '/auth',
  },
  {
    path: '/set-new-password',
    name: 'ResetPassword',
    component: ResetPassword,
    layout: '/auth',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'nc-icon nc-calendar-60',
    component: Calendar,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/services',
    name: 'Services',
    icon: 'fa fa-pencil',
    component: Services,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/PendingServices',
    name: 'Pending Services',
    icon: 'fa fa-question-circle',
    component: PendingServices,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/editProfile',
    name: 'Edit Profile',
    component: EditProfile,
    layout: '/admin',
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: 'nc-icon nc-calendar-60',
    component: Customers,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/teams',
    name: 'Teams',
    icon: 'fa fa-users',
    component: Teams,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/employees',
    name: 'Employees',
    icon: 'fa fa-briefcase',
    component: Employees,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/scheduleService',
    name: 'Schedule Service',
    icon: 'nc-icon nc-calendar-60',
    component: ScheduleService,
    layout: '/admin',
    isShow: 1,
  },
  {
    path: '/termsConditions',
    name: 'Terms Conditions',
    component: TermsConditions,
    layout: '/admin',
  },
  {
    path: '/privacyPolicy',
    name: 'Privacy Policy',
    component: PrivacyPolicy,
    layout: '/admin',
  },
  {
    path: '/notification',
    name: 'Notification',
    icon: 'fa fa-bell-o',
    component: Notification,
    layout: '/admin',
    isShow: 1,
  },
  
]

export default routes
