import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from 'js/api.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init(state,lists){
            state.lists = lists
        }
    },
    actions:{
        getAddressList(content){
            axios.get(url.addressLists).then(res=>{
                content.commit('init',res.data.lists) 
            })
          },
    }
})

export default store