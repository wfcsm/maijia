import './cart.css'
import './cart_trade.css'
import './cart_base.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'

new Vue({
    el:'.container',
    data:{
        lists:null,
        // a:1
    },
    created(){
        this.getList();
        // console.log(this.lists)
    },
    mounted(){
        // console.log(this.lists)
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists = res.data.cartList
                // this.a=3
                // this.$nextTick(()=>{
                //     console.log(res.data.cartList)
                //     this.lists =res.data.cartList
                // })
                
                
                // let lists = res.data.cartList
                // console.log(lists)
                lists.forEach(shop=> {
                    shop.checked = true
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                    })
                })
                this.lists = lists;
            })
        },
        selectGood(good){
            console.log(good.checked)
            good.checked = !good.checked
        }
    },
    mixins:[mixin]
})