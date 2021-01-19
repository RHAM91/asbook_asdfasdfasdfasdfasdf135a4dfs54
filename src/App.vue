<template>
  <div id="app">
    <div class="menu">
        <div class="Titulo">

        </div>
        <div class="boton_menu" @click="seleccionar_modulo('reportes')">
            Reporte
        </div>
        <div v-if="update == false" class="version" id="version" @click="show = !show">
            hola mundo
        </div>
        <div v-else class="btn_update" @click="pushversion">
            push meee
        </div>
    </div>
    <div class="contenedor">
        <div class="toppanel">

        </div>
        <div class="render_div" v-if="modulo == 'reportes'">
            <Reporte />
        </div>
    </div>
  </div>
</template>
<script>

import Reporte from '@/components/Reporte.vue'
import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer

export default {
  name: 'app',
  components: {
    Reporte
  },
  data(){
      return{
          modulo: 'reportes',
          update: false, // debe estar en false
          version: ''
      }
  },
  methods:{
      seleccionar_modulo: function(mod){
          this.modulo = mod
      },
      getversion(){
            ipcRenderer.send('app_version');

            ipcRenderer.on('app_version', (event, arg) => {
                ipcRenderer.removeAllListeners('app_version');
                this.version = arg.version
            });

            // Evento para mostrar el boton de actualizacion en el sistema

            ipcRenderer.on('actualizacion', (event, message)=>{
                this.update = message
            })
        },
  },
    mounted() {
        this.getversion()
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  display: flex;
}

.menu{
  width: 150px;
  height: 100%;
  background-color: #2d3e4b;
}
    .Titulo{
        width: 100%;
        height: 40px;
        margin-bottom: 40px;
    }

    .boton_menu{
        width: 100%;
        height: 40px;
        transition: .2s ease;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .boton_menu:hover{
        background-color: #5b9ac3;
    }

.contenedor{
  width: calc(100% - 150px);
  /* width: 100%; */
  height: 100%;
}
    .toppanel{
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #dbdbdb;
    }

    .render_div{
        width: 100%;
        height: calc(100% - 40px);
    }
</style>
