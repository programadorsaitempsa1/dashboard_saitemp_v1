<!-- <template>
  <div class="container" id="container">
    <h6 class="col-xs-12 col-md-12">
      SISTEMA INTEGRADO DE GESTIÓN PLANIFICACIÓN, EJECUCIÓN, SEGUIMIENTO Y
      CONTROL DE LAS ACTIVIDADES EN RIESGO ELÉCTRICO
    </h6>
    <div class="card col-xs-12 col-md-12">
      <hr>
      <h5>Generalidades</h5>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Contrato</label>
            <input type="text" @blur="validarCamposSeccion1(formulario.contrato, 0)" class="form-control" placeholder=""
              v-model="formulario.contrato" />
            <span class="error">{{ errores1[0] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Zona</label>
            <select class="form-select" @blur="validarCamposSeccion1(formulario.zona, 1)" v-model="formulario.zona"
              aria-label="Default select example">
              <option>Zona Urbana</option>
              <option>Zona Rural</option>
            </select>
            <span class="error">{{ errores1[1] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Fecha de emisión</label>
            <input type="date" class="form-control" placeholder="" disabled v-model="formulario.fecha_emision" />
          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">N° Descargo</label>
            <input type="text" class="form-control" placeholder=""
            @keyup.enter="validarCamposSeccion1(formulario.n_descargo, 2), findForm(formulario.n_descargo)" @blur="validarCamposSeccion1(formulario.n_descargo, 2), findForm(formulario.n_descargo)"
              v-model="formulario.n_descargo" />
            <span class="error">{{ errores1[2] }}</span>
          </div>
        </div>
      </div>
      <hr>
      <h5>Caracteristicas del trabajo</h5>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Fecha de ejecución</label>
            <input type="date" class="form-control" placeholder=""
              @blur="validarCamposSeccion2(formulario.fecha_ejecucion, 0)" v-model="formulario.fecha_ejecucion" />
            <span class="error">{{ errores2[0] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Estado de la orden de trabajo</label>
            <select class="form-select" v-model="formulario.estado" aria-label="Default select example">
              <option>Activa</option>
              <option>Cancelado</option>
            </select>
          </div>
        </div>
        <div v-if="formulario.estado == 'Cancelado'" class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">¿Quién autoriza cancelación?</label>
            <input type="text" class="form-control" placeholder=""
              @blur="validarCamposSeccion2(formulario.autoriza_cancelacion, 1)"
              v-model="formulario.autoriza_cancelacion" />
            <span class="error">{{ errores2[1] }}</span>
          </div>
        </div>
        <div v-if="formulario.estado == 'Cancelado'" class="col-xs-12 col-md-12">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Observaciones de la cancelación</label>
            <input type="text" class="form-control" placeholder=""
              @blur="validarCamposSeccion2(formulario.observacion_cancelacion, 2)"
              v-model="formulario.observacion_cancelacion" />
            <span class="error">{{ errores2[2] }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Prioridad del trabajo</label>
            <select class="form-select" @blur="validarCamposSeccion2(formulario.prioridad, 3)"
              v-model="formulario.prioridad" aria-label="Default select example">
              <option>Normal</option>
              <option>Urgente</option>
            </select>
            <span class="error">{{ errores2[3] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Hora Inicio</label>
            <input type="time" class="form-control" placeholder="" disabled @change="programmedTime"
              @blur="validarCamposSeccion2(formulario.hora_inicio, 4)" v-model="formulario.hora_inicio" />
            <span class="error">{{ errores2[4] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Hora Fin</label>
            <input type="time" class="form-control" placeholder="" @change="programmedTime"
              @blur="validarCamposSeccion2(formulario.hora_fin, 5)" v-model="formulario.hora_fin" />
            <span class="error">{{ errores2[5] }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Tiempo Programado</label>
            <input type="text" class="form-control" disabled placeholder="" v-model="formulario.tiempo_programado" />
          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <div>
            <label for="exampleFormControlInput1" class="form-label">N° de Colaboradores Programados</label>
            <input type="text" class="form-control" disabled placeholder="" v-model="formulario.n_colaboradores" />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Baja Tensión ≤ 25 V ≤ 1 KV
                </label>
                <input type="text" class="form-control" placeholder=""
                  @blur="validarCamposSeccion2(formulario.baja_tension, 6)" v-model="formulario.baja_tension" />
                <span class="error">{{ errores2[6] }}</span>
              </div>
            </div>
            <div class="col-xs-12 col-md-6">
              <div>
                <label for="exampleFormControlInput1" class="form-label">Media Tensión ≥ 1 KV ≤ 57,5 KV
                </label>
                <input type="text" class="form-control" placeholder=""
                  @blur="validarCamposSeccion2(formulario.media_tension, 7)" v-model="formulario.media_tension" />
                <span class="error">{{ errores2[7] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h5>Tarea asignada</h5>
      <hr />
      <div class="row">
        <div class="col" v-for="item in checks" :key="item.nombre">
          <div class="form-check form-check-inline">
            <input class="form-check-input" @change="validaCampoCheck(item), item.checked = !item.checked" v-model="check"
              type="checkbox" :value="item.nombre">
            <label class="form-check-label">{{ item.nombre }}</label>
          </div>
        </div>
      </div>
      <div class="row" v-if="otraTarea">
        <div class="col">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Cuál ?</label>
            <input type="text" class="form-control" placeholder="" v-model="formulario.otra_tarea" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Identifica e interpreta planos/diagramas</label>
            <select class="form-select" @blur="validarCamposSeccion3(formulario.interpreta_planos, 0)"
              v-model="formulario.interpreta_planos" aria-label="Default select example">
              <option>Si</option>
              <option>No</option>
            </select>
            <span class="error">{{ errores3[0] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Planos</label>
            <div class="input-group mb-3">
              <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                v-model="formulario.planos" aria-describedby="basic-addon1">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle" style="cursor:pointer"
                  @click="formulario.planos = ''"></i></span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Trabajos en redes</label>
            <select class="form-select" @blur="validarCamposSeccion3(formulario.trabajo_en_redes, 1)"
              v-model="formulario.trabajo_en_redes" aria-label="Default select example">
              <option>Energizadas</option>
              <option>Desenergizadas</option>
            </select>
            <span class="error">{{ errores3[1] }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Descripción de la Orden de Trabajo</label>
            <textarea type="text" class="form-control" placeholder=""
              @blur="validarCamposSeccion3(formulario.descripcion_ot, 2)" v-model="formulario.descripcion_ot"></textarea>
            <span class="error">{{ errores3[2] }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <label for="exampleFormControlInput1" class="form-label" style="width:100%">Descripción del Procedimiento
              (paso a paso)</label>
            <div class="row" v-for="(item, index) in pasos" :key="item.index">
              <div class="col">
                <input type="text" v-model="pasos_procedimiento[index]" class="form-control" :id="'pasoApaso' + index"
                  :placeholder="(index + 1) + '.'">
              </div>
              <div class="col-1">
                <i v-if="index != 0" @click="deleteStep(index)" style="cursor:pointer; padding:15px"
                  class="bi bi-trash-fill"></i>
              </div>

            </div>
            <span id="añadirPaso" @click="addStep()" style="cursor:pointer"><i class="bi bi-plus-circle-fill"></i>
              Añadir paso </span>
          </div>
        </div>
      </div>
      <hr />
      <h5>Medidas de Seguridad</h5>
      <hr />
      <div class="row">
        <div class="col-xs-12 col-md-2" v-for="(item, index) in items" :key="item.index">
          <div>
            <label for="exampleFormControlInput1" class="form-label">{{ item.nombre }}</label>
            <select class="form-select" @blur="validarCamposSeccion4(items[index].opcion, index, item.nombre)"
              v-model="items[index].opcion" aria-label="Default select example">
              <option>Si</option>
              <option>No</option>
              <option>N/A</option>
            </select>
            <span class="error">{{ errores4[index] }}</span>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Otra, Cuál ?</label>
            <input type="text" class="form-control" placeholder=""
              @blur="validarCamposSeccion4(formulario.otra_tarea2, 12)" v-model="formulario.otra_tarea2" />
            <span class="error">{{ errores4[12] }}</span>
          </div>
        </div>
      </div>
      <hr />
      <h5>Grupo de trabajo</h5>
      <hr />
      <div class="row" v-for="(item, index) in empleados" :key="item.index">
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">N° de Cédula</label>
            <input type="text" v-model="item.cedula" @keyup="validateNumericField(item.cedula, index)"
              class="form-control" placeholder="" />
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div>
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="text" v-model="item.nombre" @keyup="validateTextField(item.nombre, index)" class="form-control"
              placeholder="" />
          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <label for="exampleFormControlInput1" class="form-label">Firma</label>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                @click="signature(index)"></i></span>
            <input type="password" disabled class="form-control" placeholder="" aria-label="firma" v-model="item.firma"
              aria-describedby="basic-addon1">
            <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle" style="cursor:pointer"
                @click="clearSignature(index)"></i></span>
          </div>
        </div>
        <div class="col col-md-1">
          <i v-if="index != 0" @click="empleados.splice(index, 1), firmas.splice(index, 1), formulario.n_colaboradores--"
            id="trash" class="bi bi-trash-fill"></i>
        </div>
        <FirmaDigital style="margin-bottom:30px" v-if="item.tochpad" @firma="firma" :signed="signed" />
      </div>
      <span v-if="empleados.length > 0" id="añadirPaso" @click="addEmployee()" style="cursor: pointer"><i
          class="bi bi-plus-circle-fill"></i>
        Agregar empleado
      </span>
      <div class="row">
        <div class="col-xs-12 col-md-4">
          <hr />
          <span class="row">ENCARGADO DEL TRABAJO</span>
          <hr />
          <div>
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="text" class="form-control" disabled placeholder=""
              @blur="validarCamposSeccion5(formulario.encargado_nombre, 0)" v-model="formulario.encargado_nombre" />
            <span class="error">{{ errores5[0] }}</span>
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Firma</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                  @click="signature('formulario.encargado_firma')"></i></span>
              <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                v-model="formulario.encargado_firma" aria-describedby="basic-addon1">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle" style="cursor:pointer"
                  @click="formulario.encargado_firma = ''"></i></span>
            </div>
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Cargo</label>
            <input type="text" class="form-control" disabled placeholder=""
              @blur="validarCamposSeccion5(formulario.encargado_cargo, 1)" v-model="formulario.encargado_cargo" />
            <span class="error">{{ errores5[1] }}</span>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <hr />
          <span class="row">GESTOR SST</span>
          <hr />
          <div>
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="text" class="form-control" disabled placeholder=""
              @blur="validarCamposSeccion5(formulario.gestor_nombre, 2)" v-model="formulario.gestor_nombre" />
            <span class="error">{{ errores5[2] }}</span>
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Firma</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                  @click="signature('formulario.gestor_firma')"></i></span>
              <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                v-model="formulario.gestor_firma" aria-describedby="basic-addon1">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle" style="cursor:pointer"
                  @click="formulario.gestor_firma = ''"></i></span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <hr />
          <span class="row">APROBADO POR</span>
          <hr />
          <div>
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="text" class="form-control" disabled placeholder=""
              @blur="validarCamposSeccion5(formulario.aprobado_nombre, 3)" v-model="formulario.aprobado_nombre" />
            <span class="error">{{ errores5[3] }}</span>
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Firma</label>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-pen" style="cursor:pointer"
                  @click="signature('formulario.aprobado_firma')"></i></span>
              <input type="password" disabled class="form-control" placeholder="" aria-label="firma"
                v-model="formulario.aprobado_firma" aria-describedby="basic-addon1">
              <span class="input-group-text" id="basic-addon1"><i class="bi bi-x-circle" style="cursor:pointer"
                  @click="formulario.aprobado_firma = ''"></i></span>
            </div>
          </div>
          <div>
            <label for="exampleFormControlInput1" class="form-label">Cargo</label>
            <input type="text" class="form-control" disabled placeholder=""
              @blur="validarCamposSeccion5(formulario.aprobador_cargo, 4)" v-model="formulario.aprobador_cargo" />
            <span class="error">{{ errores5[4] }}</span>
          </div>
        </div>
      </div>
      <FirmaDigital v-if="show_pad" @firma="firma" :signed="signed" />
      <div class="planos">
        <label for="" style="margin-bottom:15px">Insertar planos:</label>
        <div class="input-group mb-3">
          <input @change="cargarPlanos" style="cursor:pointer" accept="image/*" type="file" class="form-control"
            id="seleccionArchivos">
          <label class="input-group-text" style="cursor:pointer" @click="deletePlans()"
            for="inputGroupFile02">Borrar</label>
        </div>
        <h6 v-if="previewImage == ''">No hay imagenes cargadas</h6>
        <div class="col-xs-12 col-md-4 imagen">
          <img :src="previewImage" alt="">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-xs-3 col-md-3 m">
          <button typex="button"
            @click="confirmationMessage('Está seguro de borrar toda la información del formulario?', 'Si', 'Cancelar', 'formulario borrado con exito')"
            class="btn btn-sm btn-warning">Limpiar formulario</button>
        </div>
        <div class="col-xs-3 col-md-3">
          <button v-if="ruta == '/navbar/OrdenTrabajoEmpleados'" type="button" @click="save"
            class="btn btn-sm btn-success">Guardar</button>
        </div>
        <div v-if="ruta == '/navbar/formulariosig'" class="col">
          <GenerarPdf :formulario="formulario" :checks="checks" :items="items" :pasos_procedimiento="pasos_procedimiento"
            :empleados="empleados" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import GenerarPdf from './GenerarPdf.vue' // Para la generación de los pdf se hace uso de la librería pdfmake url:http://pdfmake.org/#/
import FirmaDigital from './FirmaDigital.vue' // Para la generación de la firma digital se hace uso de la librería vue signature pdf url: https://www.npmjs.com/package/vue-signature-pad

export default {
  components: {
    GenerarPdf,
    FirmaDigital
  },
  props: {
    OT: [],
    items_costos: [],
    encargados: String,
    userlogued: {}
  },
  data() {
    return {
      imagen: null,
      firmas: [],
      URL_API: process.env.VUE_APP_URL_API,
      BASE: process.env.VUE_APP_URL_API_BASE,
      pasos_procedimiento: [],
      pasos: 1,
      empleados: [{ cedula: "", nombre: "", firma: "", tochpad: false }],
      check: [],
      otraTarea: false,
      // variable:
      //   "SISTEMA INTEGRADO DE GESTIÓN PLANIFICACIÓN, EJECUCIÓN, SEGUIMIENTO Y CONTROL DE LAS ACTIVIDADES EN RIESGO ELÉCTRICO",
      items: [
        { nombre: "Solicitud de suspensión", opcion: "" },
        { nombre: "Solicitud de consignación", opcion: "" },
        { nombre: "ATS", opcion: "" },
        { nombre: "Uso de EPP y EPCC", opcion: "" },
        { nombre: "Revisión de Estado de Herramienta", opcion: "" },
        { nombre: "Permiso de Trabajo en Alturas", opcion: "" },
        { nombre: "Lista de Chequeo de Postes", opcion: "" },
        { nombre: "Preoperacional de Riesgo Eléctrico", opcion: "" },
        { nombre: "Distancias de seguridad", opcion: "" },
        { nombre: "5 reglas de oro", opcion: "" },
        { nombre: "Permiso de Trabajo - Espacios Confinados", opcion: "" },
        { nombre: "Lista de Verificación y Plan para Izaje", opcion: "" },
      ],
      checks: [
        { nombre: "Instalar", checked: false },
        { nombre: "Reparar", checked: false },
        { nombre: "Replantear", checked: false },
        { nombre: "Supervisar", checked: false },
        { nombre: "Normalizar", checked: false },
        { nombre: "Diagnosticar", checked: false },
        { nombre: "Revisar", checked: false },
        { nombre: "Montaje", checked: false },
        { nombre: "Corte", checked: false },
        { nombre: "Desconexiones", checked: false },
        { nombre: "Conexión", checked: false },
        { nombre: "Suspensión", checked: false },
        { nombre: "Reconexión", checked: false },
        { nombre: "Otra", checked: false },
      ],
      formulario: {
        contrato: '',
        zona: '',
        fecha_emision: '',
        fecha_ejecucion: '',
        estado: 'Activa',
        autoriza_cancelacion: '',
        observacion_cancelacion: '',
        n_descargo: '',
        prioridad: '',
        hora_inicio: '',
        tarea_asignada: '',
        hora_fin: '',
        tiempo_programado: '',
        n_colaboradores: '',
        baja_tension: '',
        media_tension: '',
        otra_tarea: '',
        otra_tarea2: '',
        interpreta_planos: '',
        planos: '',
        trabajo_en_redes: '',
        descripcion_ot: '',
        medidas_seguridad: '',
        pasos_procedimiento: '',
        encargado_nombre: '',
        encargado_firma: '',
        encargado_cargo: '',
        gestor_nombre: '',
        gestor_firma: '',
        aprobado_nombre: '',
        aprobado_firma: '',
        aprobador_cargo: '',
        encargado_trabajo_firma_: {},
        gestor_firma_: {},
        aprobado_firma_: {},
        firmas1: '',
        firmas2: '',
        firmas3: '',

      },
      // firma_base64: '',
      firma_empleado: -1,
      firma_empleado2: '',
      signed: false,
      previewImage: '',
      horas: [],
      minutos: [],
      show_pad: false,
      mensaje_validacion_campo: 'Debe diligenciar este campo',
      errores1: ["", "", ""],
      errores2: ["", "", "", "", "", "", "", ""],
      errores3: ["", "", "", ""],
      errores4: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      errores5: ["", "", "", "", "",],
      actualizar_formulario: false,
      contador: -1,
      orden_trabajo_id_consulta: '',
      ordenes_trabajo: '',
      ruta: this.$route.path,
    };
  },
  created() {
    this.currentDate()

    this.currentTime()
    this.firmasPiePagina()
    this.formulario.contrato = this.userlogued.contrato_numero
    if (this.OT != undefined) {
      this.formulario.n_descargo = this.OT[0].split("-")[0]
    }
    if (this.formulario.n_descargo != '') {
      this.findForm(this.formulario.n_descargo)
    }
  },
  methods: {
    checkForm(orden_trabajo_id) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API + "api/v1/formulario/" + orden_trabajo_id, config)
        .then(function (result) {
          if (result.data != true)
            self.showAlert(result.data.message, result.data.status);

        });
    },
    findForm(ot) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API + "api/v1/formularioordentrabajo/" + ot,
          config
        )
        .then(function (result) {
          if (result.data.length > 0) {
            self.formulario.contrato = result.data[0].contrato;
            self.formulario.zona = result.data[0].zona;
            self.formulario.fecha_emision = result.data[0].fecha_emision;
            self.orden_trabajo_id_consulta = result.data[0].n_orden_trabajo;
            self.formulario.fecha_ejecucion = result.data[0].fecha_ejecucion;
            self.formulario.estado = result.data[0].estado;
            self.formulario.autoriza_cancelacion = result.data[0].autoriza_cancelacion;
            self.formulario.observacion_cancelacion = result.data[0].observacion_cancelacion;
            self.formulario.prioridad = result.data[0].prioridad_trabajo;
            self.formulario.hora_inicio = result.data[0].hora_inicio;
            self.formulario.hora_fin = result.data[0].hora_fin;
            self.formulario.tiempo_programado = result.data[0].tiempo_programado;
            self.formulario.n_colaboradores = result.data[0].n_colaboradores;
            self.formulario.baja_tension = result.data[0].baja_tension;
            self.formulario.media_tension = result.data[0].media_tension;
            self.formulario.tarea_asignada = result.data[0].tarea_asignada;
            self.formulario.interpreta_planos = result.data[0].interpreta_planos;
            self.formulario.trabajo_en_redes = result.data[0].trabajo_en_redes;
            self.formulario.descripcion_ot = result.data[0].descripcion_ot;
            self.formulario.pasos_procedimiento = result.data[0].descripcion_procedimiento;
            self.formulario.otra_tarea = result.data[0].otra_tarea;
            self.formulario.otra_tarea2 = result.data[0].otra_tarea2;
            self.formulario.encargado_nombre = result.data[0].encargado_trabajo_nombre;
            self.formulario.encargado_cargo = result.data[0].encargado_trabajo_cargo;
            self.formulario.encargado_trabajo_firma_ = result.data[0].encargado_trabajo_firma;
            self.formulario.gestor_nombre = result.data[0].gestor_sst_nombre;
            self.formulario.gestor_firma_ = result.data[0].gestor_sst_firma;
            self.formulario.aprobado_nombre = result.data[0].aprobador_nombre;
            self.formulario.aprobador_cargo = result.data[0].aprobador_cargo;
            self.formulario.aprobado_firma_ = result.data[0].aprobador_firma;
            self.formulario.grupo_trabajo = result.data[0].grupo_trabajo;
            self.ordenes_trabajo = result.data[0].ots
            self.recorrerOt()

            if (result.data[0].planos != null) {
              self.previewImage = self.BASE + result.data[0].planos
              self.urltoFile(self.previewImage, 'planos', 'image/png')
                .then(function (file) {
                  self.conertToBase64async(file)
                    .then((result) =>
                      self.formulario.planos = result
                    )
                });
            }
            if (result.data[0].encargado_trabajo_firma != null) {
              self.urltoFile(self.BASE + result.data[0].encargado_trabajo_firma, 'encargado', 'image/png')
                .then(function (file) {
                  self.conertToBase64async(file)
                    .then((result) =>
                      self.formulario.encargado_firma = result
                    )
                });
            }
            if (result.data[0].gestor_sst_firma != null) {
              self.urltoFile(self.BASE + result.data[0].gestor_sst_firma, 'sst', 'image/png')
                .then(function (file) {
                  self.conertToBase64async(file)
                    .then((result) =>
                      self.formulario.gestor_firma = result
                    )
                });
            }
            if (result.data[0].aprobador_firma != null) {
              self.urltoFile(self.BASE + result.data[0].aprobador_firma, 'aprobador', 'image/png')
                .then(function (file) {
                  self.conertToBase64async(file)
                    .then((result) =>
                      self.formulario.aprobado_firma = result
                    )
                });
            }

            if (self.formulario.tarea_asignada != undefined) {
              self.checks.forEach(function (item, index) {
                if (self.formulario.tarea_asignada.includes(item.nombre)) {
                  self.checks[index].checked = true;
                  self.check.push(item.nombre)
                }
              })
            }

            if (self.formulario.tarea_asignada != undefined) {
              let pasos = self.formulario.pasos_procedimiento.split("*")
              self.pasos = pasos.length - 1
              pasos.forEach(function (item) {
                self.pasos_procedimiento.push(item.trim())
              })
            }

            var items = []
            if (result.data[0].medidas_seguridad != undefined) {
              result.data[0].medidas_seguridad.split(",").forEach(function (item, index) {
                if (index % 2 != 0) {
                  items.push(item)
                }
              })
            }
            items.forEach(function (item, index) {
              self.items[index].opcion = item
            })

            if (self.formulario.grupo_trabajo != undefined) {
              let grupo_trabajo = self.formulario.grupo_trabajo.split(',')
              for (var f = 0; f <= (grupo_trabajo.length / 2) - 3; f++) {
                self.empleados.push({ cedula: '', nombre: '', firma: "", tochpad: false })
              }
              let cont = 0
              let cont2 = 0
              for (var i = 0; i <= grupo_trabajo.length - 2; i += 3) {
                let nombre = self.empleados[cont].nombre = grupo_trabajo[i];
                let cedula = self.empleados[cont].cedula = grupo_trabajo[i + 1];
                self.urltoFile(self.BASE + grupo_trabajo[i + 2], grupo_trabajo[i + 2], 'image/png')
                  .then(function (file) {
                    self.firmas.push({ cedula: cedula, nombre: nombre, firma: file })
                    self.conertToBase64async(file)
                      .then((result) =>
                        self.empleados[(cont2= cont2+1)-1].firma = result,
                      )

                  });
                cont++
              }
            }

            self.actualizar_formulario = true
          }
        });
    },

    recorrerOt() {
      let self = this
      if (self.ordenes_trabajo != undefined) {
        if (self.ordenes_trabajo.split("-").length > 2) {
          this.formulario.descripcion_ot = 'En este formulario se deja constancia de la ejecución de las ordenes las ordenes de trabajo número '
          let nueva_cadena = ''
          self.ordenes_trabajo.split("-").forEach(function (item) {
            if (item != '') {
              nueva_cadena += item + ", "
            }

          })
          nueva_cadena = nueva_cadena.substring(0, nueva_cadena.length - 2)
          self.formulario.descripcion_ot += nueva_cadena + '.'
        }
      }
    },
    firmasPiePagina() {
      let self = this
      let config = this.configHeader();
      if (this.encargados != undefined) {
        this.encargados.split(",").forEach(function (item, index) {
          axios
            .get(self.URL_API + "api/v1/sigempleadosbyid/" + item.trim(), config)
            .then(function (result) {
              if (index == 0) {
                self.formulario.encargado_nombre = result.data[0].nombres + ' ' + result.data[0].apellidos;
                self.formulario.encargado_cargo = result.data[0].cargo;

                self.urltoFile(self.BASE + result.data[0].firma, 'encargado', 'image/png')
                  .then(function (file) {
                    self.conertToBase64async(file)
                      .then((result) =>
                        self.formulario.encargado_firma = result
                      )
                    self.formulario.firmas1 = file
                  });

              } else if (index == 1) {
                self.formulario.gestor_nombre = result.data[0].nombres + ' ' + result.data[0].apellidos

                self.urltoFile(self.BASE + result.data[0].firma, 'sst', 'image/png')
                  .then(function (file) {
                    self.conertToBase64async(file)
                      .then((result) =>
                        self.formulario.gestor_firma = result
                      )
                    self.formulario.firmas2 = file
                  });

              } else if (index == 2) {
                self.formulario.aprobado_nombre = result.data[0].nombres + ' ' + result.data[0].apellidos;
                self.formulario.aprobador_cargo = result.data[0].cargo;

                self.urltoFile(self.BASE + result.data[0].firma, 'aprobador', 'image/png')
                  .then(function (file) {
                    self.conertToBase64async(file)
                      .then((result) =>
                        self.formulario.aprobado_firma = result
                      )
                    self.formulario.firmas3 = file
                  });

              }
            });
        })
      }
    },
    showAlert(mensaje, icono) {
      this.$swal({
        position: 'top',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      })
    },
    validarCamposSeccion1(valor, posicion) {
      if (valor.trim() == '') {
        valor = this.mensaje_validacion_campo
        this.errores1.splice(posicion, 1)
        this.errores1.splice(posicion, 0, valor)
      } else {
        this.errores1.splice(posicion, 1)
        this.errores1.splice(posicion, 0, '')
      }
    },
    validarCamposSeccion2(valor, posicion) {
      if (this.formulario.contrato != '') {
        if (valor.trim() == '') {
          valor = this.mensaje_validacion_campo
          this.errores2.splice(posicion, 1)
          this.errores2.splice(posicion, 0, valor)
        } else {
          this.errores2.splice(posicion, 1)
          this.errores2.splice(posicion, 0, '')
        }
      }
    },
    validarCamposSeccion3(valor, posicion) {
      if (valor.trim() == '') {
        valor = this.mensaje_validacion_campo
        this.errores3.splice(posicion, 1)
        this.errores3.splice(posicion, 0, valor)
      } else {
        this.errores3.splice(posicion, 1)
        this.errores3.splice(posicion, 0, '')
      }
    },
    validarCamposSeccion4(valor, posicion, nombre) {
      if (valor.trim() == '') {
        valor = this.mensaje_validacion_campo
        this.errores4.splice(posicion, 1)
        this.errores4.splice(posicion, 0, valor)
      } else {
        this.errores4.splice(posicion, 1)
        this.errores4.splice(posicion, 0, '')
      }
      if (nombre != '' && valor != '') {
        this.formulario.medidas_seguridad += nombre + ',' + valor + ', '
      }
    },
    validarCamposSeccion5(valor, posicion) {
      if (valor.trim() == '') {
        valor = this.mensaje_validacion_campo
        this.errores5.splice(posicion, 1)
        this.errores5.splice(posicion, 0, valor)
      } else {
        this.errores5.splice(posicion, 1)
        this.errores5.splice(posicion, 0, '')
      }
    },
    save() {
      let self = this;
      let config = this.configHeader();
      const form = new FormData();
      let grupo_trabajo = ''
      self.firmas.forEach(function (item, index) {
        form.append('cedula' + index, item.cedula)
        form.append('nombre' + index, item.nombre)
        form.append('firma' + index, item.firma)
        grupo_trabajo += item.nombre + "," + item.cedula + ","
      })

      self.items_costos.forEach(function (item, index) {
        form.append('item' + index, item.item)
        form.append('categoria' + index, item.id_codigo)
        form.append('unidad_medida' + index, item.id_unidad_medida)
        form.append('valor_unitario' + index, item.valor_unitario)
        form.append('descripcion' + index, item.descripcion)
        form.append('cantidad' + index, item.cantidad)
      })

      let ots = ''
      this.OT.forEach(function (item, index) {
        if (item[index + 1] != null || item[index + 1] != '') {
          ots += item.split("-")[1] + "*"
        }
      })

      form.append('contrato', this.formulario.contrato);
      form.append('zona', this.formulario.zona);
      form.append('fecha_emision', this.formulario.fecha_emision);
      if (this.orden_trabajo_id_consulta == '') {
        form.append('n_descargo', this.formulario.n_descargo);
      } else {
        form.append('n_descargo', this.orden_trabajo_id_consulta);
        this.formulario.n_descargo = this.orden_trabajo_id_consulta;
      }
      form.append('fecha_ejecucion', this.formulario.fecha_ejecucion);
      form.append('estado', this.formulario.estado);
      form.append('autoriza_cancelacion', this.formulario.autoriza_cancelacion);
      form.append('observacion_cancelacion', this.formulario.observacion_cancelacion);
      form.append('prioridad_trabajo', this.formulario.prioridad);
      form.append('hora_inicio', this.formulario.hora_inicio);
      form.append('hora_fin', this.formulario.hora_fin);
      form.append('tiempo_programado', this.formulario.tiempo_programado);
      form.append('n_colaboradores', this.formulario.n_colaboradores);
      form.append('baja_tension', this.formulario.baja_tension);
      form.append('media_tension', this.formulario.media_tension);
      form.append('tarea_asignada', this.formulario.tarea_asignada);
      form.append('interpreta_planos', this.formulario.interpreta_planos);
      form.append('planos', this.imagen);
      form.append('trabajo_en_redes', this.formulario.trabajo_en_redes);
      form.append('descripcion_ot', this.formulario.descripcion_ot);
      form.append('descripcion_procedimiento', this.formulario.pasos_procedimiento);
      form.append('medidas_seguridad', this.formulario.medidas_seguridad);
      form.append('otra_tarea', this.formulario.otra_tarea);
      form.append('otra_tarea2', this.formulario.otra_tarea2);
      form.append('encargado_trabajo_nombre', this.formulario.encargado_nombre);
      form.append('encargado_trabajo_cargo', this.formulario.encargado_cargo);
      form.append('encargado_trabajo_firma', this.formulario.encargado_trabajo_firma_ = this.formulario.firmas1);
      form.append('gestor_sst_nombre', this.formulario.gestor_nombre);
      form.append('gestor_sst_firma', this.formulario.gestor_firma_ = this.formulario.firmas2);
      form.append('aprobador_nombre', this.formulario.aprobado_nombre);
      form.append('aprobador_cargo', this.formulario.aprobador_cargo);
      form.append('aprobador_firma', this.formulario.aprobado_firma_ = this.formulario.firmas3);
      form.append('grupo_trabajo', grupo_trabajo);
      form.append('ots', ots);

      if (this.actualizar_formulario) {
        axios
          .post(
            self.URL_API + "api/v1/formulario/" + self.formulario.n_descargo,
            form,
            config
          )
          .then(function (result) {
            self.showAlert(result.data.message, result.data.status);

          });
      } else {
        axios
          .post(self.URL_API + "api/v1/formulario", form, config)
          .then(function (result) {
            self.showAlert(result.data.message, result.data.status);
            self.actualizar_formulario = true
          });
      }
    },

    confirmationMessage(title, btnConfirm, btnDenied, messageConfirm) {
      this.$swal({
        icon: 'warning',
        title: title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: btnConfirm,
        denyButtonText: btnDenied,
      }).then((result) => {
        if (result.isConfirmed) {
          this.showAlert(messageConfirm, 'success')
        } else if (result.isDenied) {
          this.showAlert('Accion cancelada', 'info')
        }
      })
    },
    currentTime() {
      let date = new Date();
      let horas = date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()
      let minutos = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()
      this.formulario.hora_inicio = horas + ':' + minutos;
    },
    currentDate() {
      let now = new Date().toLocaleDateString();
      let fecha = now.split("/")
      let dia = fecha[0].length > 1 ? fecha[0] : '0' + fecha[0]
      let mes = fecha[1].length > 1 ? fecha[1] : '0' + fecha[1]
      this.formulario.fecha_emision = fecha[2] + "-" + mes + "-" + dia;
    },
    cargarPlanos(e) {
      const image = e.target.files[0];
      this.imagen = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        this.formulario.planos = e.target.result;
      };
    },

    conertToBase64async(e) {
      const image = e;
      const reader = new FileReader();
      reader.readAsDataURL(image);
      return new Promise((resolve) => {
        reader.onload = (e) => {
          resolve(e.target.result)
        };
      })

    },
    deletePlans() {
      this.previewImage = ''
      document.getElementById("seleccionArchivos").value = ''
    },
    validateNumericField(numero, index) {
      if (numero != '') {
        if (isNaN(numero)) {
          this.empleados[index].cedula = numero.substr(0, numero.length - 1);
        }
      }
    },
    validateTextField(texto, index) {
      if (texto != '' && index != null) {
        if (!isNaN(texto)) {
          this.empleados[index].nombre = texto.substr(0, texto.length - 1);
        }
      }
    },
    programmedTime() {
      if (this.formulario.hora_inicio != '' && this.formulario.hora_fin != '') {
        let hora_inicio = this.formulario.hora_inicio.split(":")
        let hora_fin = this.formulario.hora_fin.split(":")
        let hora_fin_ = new Date()
        let hora_inicio_ = new Date()

        hora_inicio_.setHours(hora_inicio[0], hora_inicio[1], '00');
        hora_fin_.setHours(hora_fin[0], hora_fin[1], '00');

        hora_fin_.setHours(hora_fin_.getHours() - hora_inicio_.getHours(),
          hora_fin_.getMinutes() - hora_inicio_.getMinutes(),
          hora_fin_.getSeconds() - hora_inicio_.getSeconds()
        );
        this.formulario.tiempo_programado = (hora_fin_.getHours() ? hora_fin_.getHours() + (hora_fin_.getHours() > 1 ? " horas " : " hora ") : "") + (hora_fin_.getMinutes() ? hora_fin_.getMinutes() + " minutos" : "") + (hora_fin_.getSeconds() ? (hora_fin_.getHours() || hora_fin_.getMinutes() ? " y " : "") + hora_fin_.getSeconds() + " segundos" : "")
      }
    },
    deleteStep(index) {
      let ultimo_asterisco = this.formulario.pasos_procedimiento.lastIndexOf('*')
      this.formulario.pasos_procedimiento = this.formulario.pasos_procedimiento.substring(0, ultimo_asterisco)
      this.pasos = this.pasos - 1
      this.pasos_procedimiento.splice(index, 1)
    },
    addStep() {
      if (
        typeof this.pasos_procedimiento[this.pasos_procedimiento.length - 1] !=
        "undefined" &&
        this.pasos_procedimiento[this.pasos_procedimiento.length - 1] != ""
      ) {
        this.pasos = this.pasos + 1;
        this.pasos_procedimiento[this.pasos_procedimiento.length] = "";
        this.formulario.pasos_procedimiento += this.pasos_procedimiento[this.pasos_procedimiento.length - 2] + '* '
      }
    },
    addEmployee() { // Valida el formulario web, si los campos cédula y nombre están diligenciados permite agregar otro grupo de campos para empleado
      if (
        typeof this.empleados[this.empleados.length - 1].cedula !=
        "undefined" &&
        this.empleados[this.empleados.length - 1].cedula != "" &&
        typeof this.empleados[this.empleados.length - 1].nombre !=
        "undefined" &&
        this.empleados[this.empleados.length - 1].nombre != ""
      ) {
        this.empleados.push({ cedula: "", nombre: "", firma: "", tochpad: false });
      }
    },
    validaCampoCheck(item) {
      if (this.check.includes("Otra")) { // Oculta o muestra un campo cuando se marca o desmarca la opcion de checkbox otra tarea asignada
        this.otraTarea = true;
      } else {
        this.otraTarea = false;
      }
      this.formulario.tarea_asignada += item.nombre + ", "
    },
    signature(index) {
      if (!isNaN(index)) { // Valida si el parametro de llegada es un valor numerico o un string para validar el campo donde se va a ingresar la firma
        this.firma_empleado = index
        this.show_pad = false // Muestra el pad de firmas para las firmas de los encargados, por defecto esta oculto: false
      } else {
        this.firma_empleado2 = index
        this.show_pad = true // Muestra el pad de firmas para las firmas de los encargados, por defecto esta oculto: false
      }

      this.empleados.forEach(function (item, index2) { //  muestra el tochpad despues de dar clic en el icono de boligrafo en el campo de firma, si hay otro tochpad abierto lo cierra
        if (index == index2) {
          item.tochpad = true
        } else {
          item.tochpad = false
        }
      })
    },
    firma(firma) {
      let self = this
      if (this.firma_empleado >= 0) { // Valida la posición del campo de firma para ingresar la firma en el campo correspondiente
        this.empleados[this.firma_empleado].firma = firma

        // *********** Generamos un array de objetos con los nombres, números de documento y firmas en formato file para guardar en la bd ***********
        let cedula = self.empleados[self.firma_empleado].cedula
        let nombre = self.empleados[self.firma_empleado].nombre
        this.urltoFile(firma, this.empleados[this.firma_empleado].cedula + '.png', 'image/png')
          .then(function (file) {
            self.firmas.push({ cedula: cedula, nombre: nombre, firma: file })
          });
        //****** fin *******************************

        this.formulario.n_colaboradores++ // Cada que un empleado firma aumenta en 1 el número de empleados en la obra
        this.hideTochPad() // Oculta el tochpad despues de dar clic en el boton firmar
      } else {
        if (isNaN(this.firma_empleado2)) { // Valida el campo de firma a diligenciar en las firmas del pie de página
          switch (this.firma_empleado2) {
            case 'formulario.encargado_firma':
              this.formulario.encargado_firma = firma

              this.urltoFile(firma, 'encargado_trabajo_firma_.png', 'image/png')
                .then(function (file) {
                  self.formulario.encargado_trabajo_firma_ = file
                });

              this.hideTochPad() // Oculta el tochpad despues de dar clic en el boton firmar
              this.show_pad = false
              break;
            case 'formulario.gestor_firma':
              this.formulario.gestor_firma = firma

              this.urltoFile(firma, 'gestor_firma_.png', 'image/png')
                .then(function (file) {
                  self.formulario.gestor_firma_ = file
                });

              this.hideTochPad() // Oculta el tochpad despues de dar clic en el boton firmar
              this.show_pad = false
              break;
            case 'formulario.aprobado_firma':
              this.formulario.aprobado_firma = firma

              this.urltoFile(firma, 'aprobado_firma_.png', 'image/png')
                .then(function (file) {
                  self.formulario.aprobado_firma_ = file
                });

              this.hideTochPad() // Oculta el tochpad despues de dar clic en el boton firmar
              this.show_pad = false
              break;
          }
        }
      }

      // Validar cuando un campo de firma ha sido llenado y limpiar el pad de firmas
      if (this.firma_empleado >= 0 || this.firma_empleado2 != '') {
        this.signed = true
      } else {
        console.log('Debe selecionar el campo donde va colocar su firma')
      }
      // let self = this
      setTimeout(function () {
        self.signed = false
      }, 2000);
      // Fin validar cuando un campo de firma ha sido llenado y limpiar el pad de firmas
      this.firma_empleado = -1
      this.firma_empleado2 = ''
    },

    //return a promise that resolves with a File instance
    urltoFile(url, filename, mimeType) {
      return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
      );
    },


    clearSignature(index) {
      this.firma_empleado = -1
      this.empleados[index].firma = '' // borra la firma de un empleado
      this.formulario.n_colaboradores-- // Cada que un empleado borra su firma disminuye en 1 el número de empleados en la obra
    },
    hideTochPad() { // Oculta el tochpad despues de dar clic en el boton firmar
      this.empleados.forEach(function (item) {
        item.tochpad = false
      })
      this.show_pad = false
    },
    configHeader() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      };
      return config;
    },
  },
};
</script>

<style scoped>
label {
  clear: both;
  float: left;
}

.error .input-group-text {
  margin-bottom: 20px;
}

.error {
  font-size: 0.8rem;
  float: left;
  margin-bottom: 20px;
}

.card {
  padding: 30px;
  margin-bottom: 40px;
}

h6 {
  text-align: center;
  margin: auto;
  padding: 30px;
}

.col {
  margin-bottom: 20px;
}

#pasoApaso {
  margin-bottom: 15px;
}

span {
  margin: auto;
}

#añadirPaso {
  float: left;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
}

#trash {
  cursor: pointer;
  position: relative;
  top: 40px;
}

.imagen {
  margin: auto;
  padding: 30px;
}

.imagen img {
  width: 100%;
}

.planos {
  margin-top: 30px;
  clear: both;
}

.error {
  color: red;
}
</style> -->
