import 'css/common.css'
import './index.css'
import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import Foot from 'components/Foot.vue'
import Swiper from 'components/Swiper.vue'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

new Vue({
  el:'#app',
  data:{
    lists:null,
    pageNum:1,
    pageSize:6,
    loading:false,
    allLoaded:false,
    bannerList:null
  },
  created(){
    this.getLists();
    this.getBanner();
  },
  methods:{
    getLists(){
      if(this.allLoaded){
        return
      }
      this.loading=true
      axios.get(url.hotLists,{
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }).then(res => {
        let curLists = res.data.lists;
        if(curLists.length < this.pageSize){
            this.allLoaded = true
        }
        if(this.lists){
          this.lists = this.lists.concat(curLists);
        }else{
          this.lists=curLists;
        }
        this.pageNum+=1;
        this.loading=false
      })
    },
    getBanner(){
      axios.get(url.banner).then(res=>{
        this.bannerList=res.data.lists;
      })
    }

  },
  components:{
    Foot,
    Swiper
  }
})