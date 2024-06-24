import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import UserRegisterComponent from "@/components/accounts/users/register.component.vue";
import UserLoginComponent from "@/components/accounts/users/login.component.vue";
import BusinessRegisterComponent from "@/components/accounts/business/register.component.vue";
import BusinessLoginComponent from "@/components/accounts/business/login.component.vue";
import UserDashboardComponent from "@/components/users/dashboard.component.vue";
import typeSelectorComponent from "@/components/accounts/type.selector.component.vue";
import businessDashboardComponent from "@/components/business/dashboard.component.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/type-selection'
    },
    {
      path: '/type-selection',
      name: "seleccion de tipo",
      component: typeSelectorComponent
    },
    {
      path: '/users/register',
      name: 'user register',
      component: UserRegisterComponent
    },
    {
      path: '/users/login',
      name: 'user login',
      component: UserLoginComponent
    },
    {
      path: '/business/register',
      name: 'business register',
      component: BusinessRegisterComponent
    },
    {
      path: '/business/login',
      name: 'business login',
      component: BusinessLoginComponent
    },
    {
      path: '/users/dashboard',
      name: 'user dashboard',
      component: UserDashboardComponent,
    },
    {
      path: '/business/dashboard',
      name: 'business dashboard',
      component: businessDashboardComponent,
    }
  ]
})

export default router
