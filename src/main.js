import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import { IPx, PORT } from './config/parametros'
import axios from 'axios'
import macaddress from 'node-getmac'


import '../src/assets/css/estilos.css'
import '../node_modules/bulma/css/bulma.min.css'



// async function validacion(direccion){

//   let formulario = {
//     mac: macaddress
//   }

//   let dat = await axios.post(`http://${IPx}:${PORT}/api/sistemas/mac/`, formulario)
  
//     let res = dat.data.mensaje
  
//     if (res == true) {

//       new Vue({
//         store,
//         render: h => h(App)
//       }).$mount('#app')
      
//     }else{
//       console.log(':/')
//     }

// }




// validacion(macaddress)




 new Vue({
    store,
    render: h => h(App)
  }).$mount('#app')