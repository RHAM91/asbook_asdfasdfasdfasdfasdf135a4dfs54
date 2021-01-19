<template>
  <div class="container is-fluid">
      <div class="field">
          <div class="columns is-multiline">
              <div class="column is-12">
                  <h1 class="title is-h1">
                      Reportes
                  </h1>
              </div>
              <div class="column">
                  <label class="label">Mes</label>
                  <div class="control">
                        <div class="select is-small w-100">
                            <select class="w-100" v-model="mes" required>
                                <option value="">Seleccionar</option>
                               <option value="1">Enero</option>
                               <option value="2">Febrero</option>
                               <option value="3">Marzo</option>
                               <option value="4">Abril</option>
                               <option value="5">Mayo</option>
                               <option value="6">Junio</option>
                               <option value="7">Julio</option>
                               <option value="8">Agosto</option>
                               <option value="9">Septiembre</option>
                               <option value="10">Octubre</option>
                               <option value="11">Noviembre</option>
                               <option value="12">Diciembre</option>
                            </select>
                        </div>
                  </div>
              </div>
              <div class="column">
                  <div class="control">
                      <label class="label">Año</label>
                      <input type="number" v-model="year" class="input is-small">
                  </div>
              </div>
              <div class="column">
                  <div class="control">
                      <label class="label">Establecimiento</label>
                      <input type="number" v-model="establecimiento" class="input is-small">
                  </div>
              </div>
              <div class="column">
                  <button class="button is-small is-info is-fullwidth margen_boton" @click="get_compras">Consultar</button>
              </div>
              <div class="column is-12">
                  <div class="bx">
                  <div class="table-container">
                    <table class="table is-hoverable is-striped is-bordered is-fullwidth">
                        <thead>
                            <tr>
                                <th>Compras / Ventas</th>
                                <th>Documento</th>
                                <th>Serie</th>
                                <th>Número de documento</th>
                                <th>Fecha</th>
                                <th>NIT</th>
                                <th>Nombre Cliente/Proveedor</th>
                                <th>Tipo Transacción</th>
                                <th>Tipo Operación</th> 
                                <th>Estado Documento</th>
                                <th>Total Bienes Local</th>
                                <th>Total Bienes Exterior</th>
                                <th>Pequeño Contribuyente Bienes</th>
                                <th>Pequeño Contribuyente Servicios</th>
                                <th>IVA</th>
                                <th>Total valor Documento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in datos" :key="index">
                               <td>{{item.verbo}}</td>
                               <td>{{item.tipoFactura}}</td>
                               <td>{{item.serie}}</td>
                               <td>{{item.Nofi}}</td>
                               <td>{{item.fechaFactura}}</td>
                               <td>{{item.codigoProveedor}}</td>
                               <td>{{item.nombreProveedor}}</td>
                               <td>L</td>
                               <td>{{item.tipoOperacion}}</td>
                               <td>{{item.estado}}</td>
                               <td>{{item.montoBienes}}</td>
                               <td>{{item.montoServicios}}</td>
                               <td>{{item.montoBienesP}}</td>
                               <td>{{item.montoServiciosP}}</td>
                               <td>{{item.iva}}</td>
                               <td>{{item.totalDocumento}}</td>
                           
                            </tr>
                        </tbody>
                    </table>
                  </div>
                  </div>
              </div>
          </div>
      </div>
     
      <div class="botton_excel" @click="generar_excel">
          <div class="bog">
              <img src="../assets/excel.png" style="width: 100%;" title="Exportar a Excel" alt="">
          </div>
      </div>

      <div class="modal_carga" v-if="loading == true">
          <div class="cuadro2">
              <div class="gif">
                  <img :src="img" style="width: 100%;" alt="">
              </div>
              <div class="load-texto">
                  Cargando
              </div>
          </div>
      </div>
      <div class="modal_carga" style="background-color: rgba(255,255,255, 0.7);" v-if="timeout == true">
          <div class="cuadro">
              <div class="gif" style="margin-bottom: 15px;">
                  <img src="../assets/astronaut_sit.png" style="width: 100%;" alt="">
              </div>
              <div class="load-texto">
                  No se pudo establecer conexión con el servidor
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '../config/parametros'
import { dialog, ipcRenderer } from 'electron'
//const fs = require('fs')

export default {
    name: 'Reporte',
    data(){
        return{

            establecimiento: '',
            datos: [],
            datosExcel: [],
            mes: '',
            year: '',
            loading: false,
            timeout: false,
            img: require(`@/assets/ripple2.gif`), // require(`@/assets/${localStorage.getItem('GIF')}.gif`),
            
        }
    },
    methods:{
        get_compras: async function(){


            if (this.mes == '' || this.year == '' || this.establecimiento == '') {
                alert('Uno o más campos están vacios')
            }else{

                this.loading = true
                
                /* let dat = await axios.get(`http://${IP}:${PUERTO}/api_sat/public/api/compras?m=${this.mes}&a=${this.year}`)
                    let arr = dat.data
                    this.datos = arr */
                

                try {
                    let dat = await axios.get(`http://${IP}:${PUERTO}/api_sat/public/api/compras?m=${this.mes}&a=${this.year}`)
                    let arr = dat.data
                    this.datos = arr

                    if (dat.data == null) {
                        alert('No hay datos....')
                        this.loading = false

                    }else{

                        if (arr.length > 0) {
                            await console.log('carga completa')
                        }else{
                            await console.log('hubo algun problema con la conexion al servidor')
                        }
                    
                        for (let i = 0; i < arr.length; i++) {
                            const e = arr[i];
                            
                            let newForm = {
    
                                Establecimiento: this.establecimiento,
                                Compras_Ventas: e.verbo,
                                Documento: e.tipoFactura,
                                Serie_del_documento: e.serie,
                                Numero_del_documento: e.Nofi,
                                Fecha_del_documento: e.fechaFactura,
                                Nit_cliente_proveedor: e.codigoProveedor,
                                Nombre_cliente_proveedor: e.nombreProveedor,
                                Tipo_de_transaccion: 'L',
                                Tipo_de_operacion: e.tipoOperacion,
                                Estado_del_documento: e.estado,
                                COLUMNA_L: '',
                                COLUMNA_M: '',
                                COLUMNA_N: '',
                                COLUMNA_O: '',
                                Total_valor_Bienes_local: parseFloat(e.montoBienes),
                                Total_valor_Bienes_exterior: 0,
                                Total_valor_Servicios_local: parseFloat(e.montoServicios),
                                Total_valor_Servicios_exterior: '0',
                                COLUMNA_T: '',
                                COLUMNA_U: '',
                                COLUMNA_V: '',
                                COLUMNA_W: '',
                                COLUMNA_X: '',
                                COLUMNA_Y: '',
                                COLUMNA_Z: '',
                                Pequeno_contribuyente_total_Bienes: parseFloat(e.montoBienesP),
                                Pequeno_contribuyente_total_Servicios: parseFloat(e.montoServiciosP),
                                COLUMNA_AC: '',
                                COLUMNA_AD: '',
                                IVA: parseFloat(e.iva),
                                Total_valor_documento: parseFloat(e.totalDocumento),
    
                            }
    
                            this.datosExcel.push(newForm)
                        }
    
                        await this.get_ventas()
    
    
                        if (arr.length > 0) {
                            this.loading = false
                        }else{
                            await console.log('Ha habido un error interno en el servidor')
                        }
                    }

                

                } catch (e) {

                    await console.log(e)
                    this.loading = false
                    this.timeout = true

                }

            }
            
        },
        get_ventas: async function(){
            let dat = await axios.get(`http://${IP}:${PUERTO}/api_sat/public/api/ventas?m=${this.mes}&a=${this.year}`)
            let arrv = dat.data
            
            if (dat.data == null) {
                console.log('NO existen datos')
            }else{

                for (let i = 0; i < arrv.length; i++) {
                    const element = arrv[i];
                    this.datos.push(element)
                }
    
                for (let i = 0; i < arrv.length; i++) {
                    const e = arrv[i];
                    
                    let newForm = {
    
                        Establecimiento: this.establecimiento,
                        Compras_Ventas: e.verbo,
                        Documento: e.tipoFactura,
                        Serie_del_documento: e.serie,
                        Numero_del_documento: e.Nofi,
                        Fecha_del_documento: e.fechaFactura,
                        Nit_cliente_proveedor: e.codigoProveedor,
                        Nombre_cliente_proveedor: e.nombreProveedor,
                        Tipo_de_transaccion: 'L',
                        Tipo_de_operacion: e.tipoOperacion,
                        Estado_del_documento: e.estado,
                        COLUMNA_L: '',
                        COLUMNA_M: '',
                        COLUMNA_N: '',
                        COLUMNA_O: '',
                        Total_valor_Bienes_local: parseFloat(e.montoBienes),
                        Total_valor_Bienes_exterior: 0,
                        Total_valor_Servicios_local: parseFloat(e.montoServicios),
                        COLUMNA_S: '',
                        COLUMNA_T: '',
                        COLUMNA_U: '',
                        COLUMNA_V: '',
                        COLUMNA_W: '',
                        COLUMNA_X: '',
                        COLUMNA_Y: '',
                        COLUMNA_Z: '',
                        COLUMNA_AA: '',
                        COLUMNA_AB: '',
                        COLUMNA_AC: '',
                        COLUMNA_AD: '',
                        IVA: parseFloat(e.iva),
                        Total_valor_documento: parseFloat(e.totalDocumento),
    
                    }
    
                    this.datosExcel.push(newForm)
                }
            }




        },
        generar_excel: function(){


            ipcRenderer.send('excel', this.datosExcel);
            
            this.datos = []
            this.datosExcel = []
            this.year = ''
            this.mes = ''
            this.establecimiento = ''


        }
    }
}
</script>

<style>
    .container{
        margin-top: 20px;
    }

    th{
        text-align: center;
    }

    .table{
        font-size: 13px;
    }

    .bx{
        height: calc(100vh - 210px);
        overflow: auto;
    }

    .botton_excel{

        border-radius: 50%;
        background-color: #f06b42;
        width: 50px;
        height: 50px;
        position: fixed;
        bottom: 15px;
        right: 15px;
        transition: .4s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 300;
    }

    .botton_excel:hover{
        background-color: #ed4f25;
    }
        .bog{
            width: 25px;
            height: 25px;
            line-height: 0;
        }

    .modal_carga{
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255, 0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }
        .cuadro2{
            width: 300px;
            height: 208px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -104px;
            margin-left: -150px;
        }

        .cuadro{
            width: 100%;
            height: 208px;
            position: absolute;
            top: 50%;
            /* left: 50%; */
            margin-top: -104px;
          /*   margin-left: -150px; */
        }
            .gif{
                width: 130px;
                height: 130px; 
                margin: auto;

            }

            .load-texto{
                color: #263641;
                font-size: 35px;
                text-align: center;
            }
</style>