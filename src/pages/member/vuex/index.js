import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import url from 'js/api.js'
import addressData from 'js/address.json'
Vue.use(Vuex)

let address={
    provinceName(instance){
        let province = addressData.list.findIndex(item=>{
             return item.value===instance.provinceValue
         })
         instance.provinceName=addressData.list[province].label
         instance.cityList=addressData.list[province].children
         return instance
     },
     cityName(instance){
         let index = instance.cityList.findIndex(item=>{
            return item.value === instance.cityValue
         })
         instance.cityName=instance.cityList[index].label
         instance.districtList=instance.cityList[index].children
         return instance
     },
     districtName(instance){
        let index = instance.districtList.findIndex(item=>{
           return item.value=== instance.districtValue
        })
        instance.districtName=instance.districtList[index].label
        return instance
    }
}


const store = new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init(state,lists){
            state.lists = lists
        },
        add(state,instance){
            state.lists.push(instance)
        },
        edit(state,instance){
            let lists=state.lists
            instance = address.provinceName(instance)
            instance = address.cityName(instance)
            instance = address.districtName(instance)
            let index =lists.findIndex(item=>{
                return item.id === instance.id
            })
            state.lists.splice(index,1,instance)
        },

       
     
        remove(state,id){
            let lists=state.lists
            let index =lists.findIndex(item=>{
                return item.id === id
            })
            state.lists.splice(index,1)
        },
        setDefault(state,id){
            let index = state.lists.findIndex(item=>{
                return item.id===id
            })
            state.lists.forEach(item=>{
                item.isDefault=false
            })
            state.lists[index].isDefault= true
        }
    },
    actions:{
        getAddressList(content){
            axios.get(url.addressLists).then(res=>{
                content.commit('init',res.data.lists) 
            })
          },
        addAction(content,instance){
            axios.post(url.addressAdd,instance).then(res=>{
                content.commit('add',instance)
            })
        },
        editAction(content,instance){
            axios.post(url.addressUpdate,instance).then(res=>{
                content.commit('edit',instance)
            })
        },
        removeAction(content,id){
            axios.post(url.addressRemove,{id}).then(res=>{
                content.commit('remove',id)
            })
        },
        setDefaultAction(content,id){
            axios.post(url.addressSetDefault,{id}).then(res=>{
                content.commit('setDefault',id)
            })
        }

    }
})

export default store