import { createRouter, createWebHistory } from 'vue-router'
import HomeCom from './components/HomeCom.vue'
import LoginCom from './components/LoginCom.vue'
import RegisterCom from './components/RegisterCom.vue'
import store from "./store/index";

const routes = [
        {
            path:'/',
            name:'home',
            component:HomeCom,
            meta:{authRequired:false}
        },
        {
            path:'/login',
            name:'login',
            component:LoginCom,
            meta:{authRequired:false}
        },
        {
            path:'/register',
            name:'register',
            component:RegisterCom,
            meta:{authRequired:false}
        }
    ];

export const routeConfig = createRouter({
    history: createWebHistory(),
    routes: routes
});

routeConfig.beforeEach((to,from, next) => {
 
    const authData = store.getters["auth/getAuthData"];
    console.log("Check token When browser closed "+authData.token)
    if(!authData.token){
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if(access_token){
            const data = {
                access_token:access_token,
                refresh_token:refresh_token
            };
            store.commit('auth/saveTokenData',data);
        }
    }

    const isAuthenticated = store.getters["auth/isTokenActive"];
    console.log("Authenticated "+isAuthenticated)
    if(to.fullPath === '/'){
        return next()
    }
    else if(!isAuthenticated && to.meta.authRequired){
        return next({path:"/login"})
    }
    return next();
    
});