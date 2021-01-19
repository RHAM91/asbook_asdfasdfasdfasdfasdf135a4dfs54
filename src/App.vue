<template>
  <div id="app">
    <div class="menu">
        <div class="Titulo">

        </div>
        <div class="boton_menu" @click="seleccionar_modulo('reportes')">
            Reporte
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

export default {
  name: 'app',
  components: {
    Reporte
  },
  data(){
      return{
          modulo: 'reportes'
      }
  },
  methods:{
      seleccionar_modulo: function(mod){
          this.modulo = mod
      }
  }
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
