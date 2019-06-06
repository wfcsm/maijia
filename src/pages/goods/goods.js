import './goods_base.css'
import './goods_common.css'
import './goods_custom.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_theme.css'
import './goods.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from  'js/api.js'
import qs from 'qs'
import Swiper from 'components/Swiper.vue'
import mixin from 'js/mixin.js'

let {id} = qs.parse(location.search.substring(1))
let detailsTab = ['商品详情','本店成交']
new Vue({
    el:"#app",
    data:{
        id,
        details:null,
        detailsTab,
        tabIndex:0,
        dealLists:null,
        bannerList:[],
        skuType:1,
        showSku:false,
        skuNum:1,
        isAddCart:false,
        showAddMessage:false
    },
    created(){
        this.getDetails();
    },
    methods:{
        getDetails(){
            axios.get(url.details,{id}).then(res=>{
                this.details = res.data.data
                this.details.imgs.forEach(item => {
                    this.bannerList.push({
                        clickUrl:'',
                        img:item
                    })
                });

            })
        },
        changeTab(index){
            this.tabIndex = index
            if(index===1){
                this.getDeal()
            }
        },
        getDeal(){
            axios.get(url.deal,{id}).then(res=>{
                this.dealLists = res.data.data.lists
            })
        },
        chooseSku(type){
            this.skuType=type
            this.showSku = true
        },
        changSkuNum(num){
            if(num<0 && this.skuNum === 1){
                return
            }
            this.skuNum+=num
        },
        addCart(){
            console.log(location.search.substring(1))
            axios.post(url.addCart,{
                id,
                number:this.skuNum
            }).then(res=>{
                if(res.data.status ===200){
                    this.showSku = false
                    this.isAddCart = true
                    this.showAddMessage = true
                    setTimeout(()=>{
                        this.showAddMessage= false
                    },1000)
                }
            })
        }
    },
    components:{
        Swiper
    },
    watch:{
        showSku(val,oldVal){
            document.body.style.overflow = val ? 'hidden' :  'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ?  '100%' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    mixins:[mixin]
})