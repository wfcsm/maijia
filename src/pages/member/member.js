
import Vue from 'vue'
import router from './router/index'
import store from './vuex/index'
import Foot from 'components/Foot'

new Vue({
    el:"#app",
    router,
    store,
    components:{
        Foot
    }
})