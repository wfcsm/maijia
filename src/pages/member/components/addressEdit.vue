<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name " maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="p.value" v-for="(p,index) of addressData.list" :key="index">{{p.label}}</option>
            </select>

            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="c.value" v-for="(c,index) of cityList" :key="index">{{c.label}}</option>
            </select>

            <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="d.value" v-for="(d,index) of districtList" :key="index">{{d.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn" @click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete  block-control-btn" v-show="type==='edit'" @click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default"  v-show="type==='edit'" @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script >
import addressData from 'js/address.json'
import axios from 'axios';
import url from 'js/api.js'
export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue:-1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            type:this.$route.query.type,
            instance:this.$route.query.instance,
            addressData:addressData,
            cityList:null,
            districtList:null,
            flag:true
        }
    },
    mounted(){
      if(this.type==='edit'){
        this.name=this.instance.name
        this.tel=this.instance.tel
        this.provinceValue=parseInt(this.instance.provinceValue)
        this.id = this.instance.id
      
        // // this.cityFirst() 
        // // console.log(this.cityList)
        // this.cityValue=parseInt(this.instance.cityValue)
        // // console.log(this.cityValue)
        // // this.districtFirst()
        // this.districtValue=parseInt(this.instance.districtValue)
        this.address = this.instance.address
      }
    },
    methods:{
      add(){
        let {name,tel,provinceValue,cityValue,districtValue,address} =this
        let data = {name,tel,provinceValue,cityValue,districtValue,address}
        if(this.type === 'add'){
          axios.post(url.addressAdd,data).then(res=>{
              this.$router.push({name:'addressList'})
          })
        }
        if(this.type === 'edit'){
          data.id = this.id
          axios.post(url.addressUpdate,data).then(res=>{
              this.$router.push({name:'addressList'})
          })
        }
      },
      remove(){
        let {id}=this
        if(window.confirm("确认删除?")){
          axios.post(url.addressRemove,{id}).then(res=>{
            this.$router.go(-1)
          })
        }
      },
      setDefault(){
        let {id}=this
        console.log(id);
        axios.post(url.addressSetDefault,{id}).then(res=>{
          this.$router.go(-1)
        })
        
      }
    },
    watch:{
      provinceValue(newValue,oldValue){
        let list = this.addressData.list
        if(newValue===-1){
          return
        }
        let index = list.findIndex(item=>{
          return item.value === newValue
        })
        this.cityList = list[index].children
        this.cityValue=-1
        this.districtValue = -1
        if(this.type === "edit"){
          if(this.flag){
            this.cityValue = parseInt(this.instance.cityValue)
            this.flag = false
          }else{
            this.cityValue=-1
            this.districtValue = -1
          }
          
        }
        
      },
      cityValue(newValue,oldValue){
        let list = this.cityList
        if(newValue===-1){
          return
        }
        let index = list.findIndex(item=>{
          return item.value === newValue
        })
        this.districtList = list[index].children
        this.districtValue = -1
        if(this.type === "edit"){
          if(this.flag){
            this.districtValue = parseInt(this.instance.districtValue)
            this.flag =  false
          }else{
            this.districtValue = -1
          }
         

        }
        
      }
    }
}
</script>

