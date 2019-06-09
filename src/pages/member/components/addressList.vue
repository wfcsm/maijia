<template>
    <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      
      <a class="block-item js-address-item address-item " 
         :class="{'address-item-default':list.isDefault}"
         @click="toEdit(list)"
         v-for="list of lists" :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link :to="{name:'addressEdit',query:{type:'add'}}" class="btn btn-blue js-no-webview-block js-add-address-btn" >
            新增地址
      </router-link>
    </div>
  </div>
</template>

<script>
import Address from 'js/addressService'
import axios from 'axios'
import url from 'js/api.js'
export default {
  // data(){
  //   return{
  //     lists:null
  //   }
  // },
  computed:{
    lists(){
      return this.$store.state.lists
    }
  },
  created(){
    if(!this.lists){
      this.$store.dispatch('getAddressList')
    }
    
  },
  methods:{
    // getAddressList(){
    //   axios.get(url.addressLists).then(res=>{
    //       this.lists = res.data.lists
    //   })
    // },
    toEdit(list){
      this.$router.push({name:'addressEdit',query:{
        type:'edit',
        instance:list
      }})
    }
  }
}
</script>


