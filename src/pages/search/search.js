import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
let {keyword,id}=qs.parse(location.search.substr(1))
new Vue({
  el:".container" ,
  data:{
     searchList:null,
     keyword,
     isShow:false
  },
  created(){
      this.getSearchList();
  },
  methods:{
      getSearchList(){
          axios.get(url.searchList,{keyword,id}).then(res=>{
            this.searchList = res.data.lists
          })
      },
      move(){
        //   console.log(1)
          if(document.documentElement.scrollTop > 100 ){
            this.isShow= true;
          }else{
            this.isShow=false
          }
      },
      toTop(){
        // document.documentElement.scrollTop = 0;
        // console.log(1)
        Velocity(document.documentElement,'scroll',{duration:1000})
      }
  },
  mixins:[mixin]

})