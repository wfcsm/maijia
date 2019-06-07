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
        total:0,
        editingShop:null,
        editingShopIndex:-1,
        // removePopup : false 
    },
    computed:{
        allSelected:{
            set(value){
                this.lists.forEach(shop=>{
                    shop.checked=value
                    shop.goodsList.forEach(good=>{
                        good.checked=value
                    })
                })
            },
            get(){
                if(this.lists && this.lists.length){
                  return  this.lists.every((shop)=>{
                        return shop.checked
                    })
                }
                return true
            }
        },
        allRemnoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }else{
                    return false
                }

            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked=newVal
                    })
                }
            }
        },
        selectLists(){
            let arr=[]
            let total=0
            if(this.lists && this.lists.length){
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total+=good.number*good.price
                        }
                    })
                    this.total=total
                })
            }
            return arr
        },
        removeLists(){
            let arr=[]
            if(this.editingShop){
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
            }
            return arr
        }
        
    },
    created(){
        this.getList();
    },
    mounted(){
    },
    methods:{
        getList(){
            axios.get(url.cartLists).then(res=>{
                let lists = res.data.cartList
                lists.forEach(shop=> {
                    shop.checked = true
                    shop.editing = false
                    shop.removeChecked = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.lists = lists;
            })
        },
        selectGood(shop , good){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every((good)=>{
                return good[attr]
            })
        },
        selectShop(shop){
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach((good)=>{
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop ? 'allRemnoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item,index)=>{
                if(shopIndex !==index){
                    item.editing =false
                    item.editingMsg = shop.editing ? '':'编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good){
            if(good.numer ===1) return
            axios.post(url.cartReduce,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number--
            })
        },
        add(good){
            axios.post(url.addCart,{
                id:good.id,
                number:1
            }).then(res=>{
                good.number++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            // console.log(1)
            // this.removePopup = true
            axios.post(url.cartRemove,{
                id:good.id
            }).then(res=>{
                shop.goodsList.splice(goodIndex,1)
                if(shop.goodsList.length===0){
                    this.lists.splice(shopIndex,1)
                    this.removeShop()
                }
            })
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop =>{
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },
        removeAll(editingShop){
            let ids = []
            console.log(this.editingShopIndex)
            this.removeLists.forEach(good=>{
                ids.push(good.id)
            })
            axios.post(url.cartMreove,{ids}).then(res=>{
                let arr=[] 
                this.editingShop.goodsList.forEach(good=>{
                   let index = this.removeLists.findIndex(item=>{
                        return item.id ===good.id
                    })
                    if(index === -1){
                        arr.push(good)
                    }
                })
                if(arr.length){
                    this.editingShop.goodsList = arr
                }else{
                    // 删店铺
                    this.lists.splice(this.editingShopIndex,1)
                    this.removeShop()
                }

            })
        }
    },
    mixins:[mixin]
})