

import Vue from 'vue'
import VueRouter from 'vue-router'
import member from './components/member'
import address from './components/address'
import addressList from './components/addressList'
import addressEdit from './components/addressEdit'
Vue.use(VueRouter)

let routes  = [{
    path: '/',
    component:member
},{
    path:'/address',
    component:address,
    children:[{
        path:'',
        redirect:"addressList"
    },{
        path:'addressList',
        name:'addressList',
        component:addressList,
    },{ 
        path:'addressEdit',
        name:'addressEdit',
        component:addressEdit
    }]
}]

let router = new VueRouter({
    routes 
})

new Vue({
    el:"#app",
    router
})