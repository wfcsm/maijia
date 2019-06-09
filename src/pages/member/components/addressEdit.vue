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
            isDefault:this.$route.query.isDefault,
            type:this.$route.query.type,
            instance:this.$route.query.instance,
            addressData:addressData,
            cityList:null,
            districtList:null,
            flag:1,
            cityName:'',
            districtName:'',
            provinceName:''
        }
    },
    computed:{
       lists(){
         return this.$store.state.lists
       }
    },
    mounted(){
      if(this.type==='edit'){
        this.name=this.instance.name
        this.tel=this.instance.tel
        this.provinceValue=parseInt(this.instance.provinceValue)
        this.id = this.instance.id
        this.isDefault=this.instance.isDefault
        this.address = this.instance.address

        this.cityName=this.instance.cityName
        this.districtName=this.instance.districtName
        this.provinceName = this.instance.provinceName
      }
    },
    methods:{
      add(){
        let {name,tel,provinceValue,cityValue,districtValue,address,isDefault,cityName,districtName,provinceName} =this
        let data = {name,tel,provinceValue,cityValue,districtValue,address,isDefault,cityName,districtName,provinceName}
        if(this.type === 'add'){
          this.$store.dispatch('addAction',data)
        }
        if(this.type === 'edit'){
          data.id = this.id
          this.$store.dispatch('editAction',data) 
        }
      },
      remove(){
        let {id}=this
        if(window.confirm("确认删除?")){
            this.$store.dispatch('removeAction',id)
        }
      },
      setDefault(){
        let {id}=this
        this.$store.dispatch('setDefaultAction',id)
      }
    },
    watch:{
      lists:{
        handler(){
          this.$router.push({name:'addressList'});
        },
        deep:true
       
      },
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
          if(this.flag!==3){
            this.cityValue = parseInt(this.instance.cityValue)
            this.flag ++
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
          if(this.flag!==3){
            this.districtValue = parseInt(this.instance.districtValue)
            this.flag ++
          }else{
            this.districtValue = -1
          }
         

        }
        
      }
    }
}
</script>

