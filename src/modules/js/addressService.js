import url from 'js/api.js'
import fetch from './fetch.js'

class Address {
    static add(data){
        return fetch(url.addressAdd,data)
    }

    static remove(id){
        return fetch(url.addressRemove,id)
    }
    
    static update(data){
        return fetch(url.addressUpdate,data)
    }

    static setDefault(id){
        return fetch(url.addressSetDefault,id)
    }

    static list(){
        return fetch(url.addressLists)
    }
}

export default Address