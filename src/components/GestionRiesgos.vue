<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Matriz de riesgos</h2>
    <div
      @click="toggleDiv"
      :class="{ expandido: divExpandido, pestaña: !divExpandido }"
      class="pestaña"
      style="overflow-y: auto"
      v-if="seguimiento_guardado.length > 0"
    >
      <div v-if="!divExpandido">Seguimiento guardado</div>
      <div v-for="(item, index) in seguimiento_guardado" :key="index">
        <div v-if="divExpandido" style="text-align: left">
          {{ item.usuario }}
        </div>
        <div v-if="divExpandido" style="text-align: left">
          {{ reformatearFecha(item.created_at) }}
        </div>
        <hr v-if="divExpandido" />
      </div>
    </div>
    <form class="was-validated" @submit.prevent="save()">
      <div id="seccion">
        <div class="row">
          <div class="col">
            <label class="form-label">Tipo de proceso: *</label>
            <select
              @click="getTiposProceso"
              class="form-select"
              aria-label="Default select example"
              v-model="tipo_proceso"
              required
            >
              <option
                :value="item"
                v-for="(item, index) in tipos_proceso"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Nombre del proceso: *</label>
            <select
              @click="getNombresProceso"
              class="form-select"
              aria-label="Default select example"
              v-model="nombre_proceso"
              required
            >
              <option
                :value="item"
                v-for="(item, index) in nombres_proceso"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Nombre del riesgo: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="nombre_riesgo"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Oportunidad: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="oportunidad"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Causa: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="causa"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Plan de acción: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="plan_accion"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Consecuencia: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="consecuencia"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Efecto: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="efecto"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <!-- <div class="col">
            <label class="form-label">Amenaza: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="amenaza"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Oportunidad: * </label>
            <textarea
              id="novedades"
              class="form-control"
              rows="1"
              v-model="oportunidad2"
              required
            ></textarea>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div> -->
          <div class="row">
            <div class="col">
              <label class="form-label">Amenaza: *</label>
              <select
                @click="getClasificacion"
                class="form-select"
                aria-label="Default select example"
                v-model="amenaza"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in clasificaciones"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Oportunidad: *</label>
              <select
                @click="getClasificacion"
                class="form-select"
                aria-label="Default select example"
                v-model="oportunidad2"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in clasificaciones"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
        </div>
        <ul class="nav nav-tabs mt-3 mb-2" id="tab">
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_amenaza }]"
              :style="{
                backgroundColor: tab_amenaza ? '#339c66' : '',
                color: tab_amenaza ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = true), (tab_oportunidad = false), (indice = 0)
              "
              >Amenaza</a
            >
          </li>
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_oportunidad }]"
              :style="{
                backgroundColor: tab_oportunidad ? '#339c66' : '',
                color: tab_oportunidad ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = false), (tab_oportunidad = true), (indice = 1)
              "
              >Oportunidad</a
            >
          </li>
        </ul>

        <div>
          <div class="row">
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Probabilidad
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <select
                    @click="getNivelProbabilidad"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="probabilidad[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in nivel_probabilidad"
                      :key="index"
                    >
                      {{ item.nivel }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="probabilidad[indice].probabilidad"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Impacto
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <select
                    @click="getNivelImpacto"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="impacto[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in nivel_impacto"
                      :key="index"
                    >
                      {{ item.nivel }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="impacto[indice].impacto"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Total
                </div>
                <div class="col">
                  <label class="form-label">Impacto * probabilidad: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado[indice].total"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="form-label">{{
                indice == 0 ? "Nivel de riesgo: *" : "Nivel de oportunidad: *"
              }}</label>
              <input
                type="text"
                class="form-control"
                id="direccion_empresa"
                :style="`background-color: ${
                  nivel_riesgo_oportunidad[this.indice].background
                }; color: ${nivel_riesgo_oportunidad[this.indice].color}`"
                aria-describedby="emailHelp"
                v-model="nivel_oportunidad_riesgo[indice].nivel"
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Tratamiento: *</label>
              <input
                type="text"
                class="form-control"
                id="direccion_empresa"
                :style="`background-color: ${nivel_riesgo_oportunidad[indice].background}; color: ${nivel_riesgo_oportunidad[indice].color}`"
                aria-describedby="emailHelp"
                v-model="nivel_oportunidad_riesgo[indice].tratamiento"
                disabled
              />
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label class="form-label">Método de identificación: *</label>
              <select
                @click="getMetodosIdentificacion"
                class="form-select"
                aria-label="Default select example"
                v-model="metodo_identificacion[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in metodos_identificacion"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">Factor: *</label>
              <select
                @click="getFactores"
                class="form-select"
                aria-label="Default select example"
                v-model="factor[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in factores"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">Control: * </label>
              <textarea
                id="novedades"
                class="form-control"
                rows="1"
                v-model="control[indice].control"
                required
              ></textarea>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col">
              <label class="form-label">soporte: * </label>
              <textarea
                id="novedades"
                class="form-control"
                rows="1"
                v-model="soporte[indice].soporte"
                required
              ></textarea>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label class="form-label">Seguimiento: * </label>
              <select
                @click="getSeguimientos"
                class="form-select"
                aria-label="Default select example"
                v-model="seguimiento[indice]"
                required
              >
                <option
                  :value="item"
                  v-for="(item, index) in seguimientos"
                  :key="index"
                >
                  {{ item.nombre }}
                </option>
              </select>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
            <div class="col mb-3" v-if="indice == 1">
              <label for="formFile" class="form-label"
                >Adjuntar evidencia</label
              >
              <div class="input-group mb-3">
                <input
                  class="form-control"
                  ref="inputFile"
                  type="file"
                  @change="cargarArchivo($event)"
                  id="formFile"
                  accept=".pdf"
                />
                <span
                  style="cursor: pointer"
                  class="input-group-text"
                  @click="deleteFile(index)"
                  id="basic-addon1"
                  >Quitar archivo</span
                >
                <div class="invalid-feedback">
                  {{ mensaje_error }}
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Documento registrado
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getDocumentosRegistrados"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="documento_registrado[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in documentos_registrados"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="documento_registrado[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Clase de control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getClasesControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="clase_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in clases_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="clase_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Frecuencia del control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getFrecuenciasControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="frecuencia_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in frecuencias_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="frecuencia_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Tipo de control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getTiposControl"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="tipo_control[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in tipos_control"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="tipo_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Existe evidencia
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getEvidencias"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="existe_evidencia[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in existe_evidencias"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="existe_evidencia[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Se ejecutó eficaz
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <select
                    @click="getEjecucionesEficaces"
                    class="form-select"
                    aria-label="Default select example"
                    required
                    v-model="ejecucion_eficas[indice]"
                  >
                    <option
                      :value="item"
                      v-for="(item, index) in ejecuciones_eficaces"
                      :key="index"
                    >
                      {{ item.nombre }}
                    </option>
                  </select>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="ejecucion_eficas[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="row mt-4">
                <div
                  style="
                    background-color: gray;
                    color: white;
                    width: 95%;
                    margin: auto;
                    border-radius: 10px;
                    padding: 5px;
                  "
                >
                  Resultado del control
                </div>
                <div class="col">
                  <label class="form-label">Descripción: *</label>
                  <input
                    type="text"
                    :style="`background-color: ${
                      this.resultado_control[this.indice].background
                    }; color: ${this.resultado_control[this.indice].color}`"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado_control[indice].descripcion"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
                <div class="col">
                  <label class="form-label">Peso: *</label>
                  <input
                    type="text"
                    :style="`background-color: ${
                      this.resultado_control[this.indice].background
                    }; color: ${this.resultado_control[this.indice].color}`"
                    class="form-control"
                    id="direccion_empresa"
                    aria-describedby="emailHelp"
                    v-model="resultado_control[indice].peso"
                    disabled
                  />
                  <div class="invalid-feedback">
                    {{ mensaje_error }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div v-if="ruta_archivo != null" class="evidencia">
                <a
                  :href="URL_API + ruta_archivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><i class="bi bi-file-earmark-richtext"></i>Descargar
                  evidencia</a
                >
              </div>
            </div>
          </div>
        </div>
        <ul class="nav nav-tabs mt-3 mb-2">
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_amenaza }]"
              :style="{
                backgroundColor: tab_amenaza ? '#339c66' : '',
                color: tab_amenaza ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = true),
                  (tab_oportunidad = false),
                  (indice = 0),
                  scrollToDiv()
              "
              >Amenaza</a
            >
          </li>
          <li class="nav-item">
            <a
              :class="['nav-link', { active: tab_oportunidad }]"
              :style="{
                backgroundColor: tab_oportunidad ? '#339c66' : '',
                color: tab_oportunidad ? 'white' : 'black',
              }"
              @click="
                (tab_amenaza = false),
                  (tab_oportunidad = true),
                  (indice = 1),
                  scrollToDiv()
              "
              >Oportunidad</a
            >
          </li>
        </ul>
        <div class="row mb-5">
          <div class="col">
            <label class="form-label">Responsable: *</label>
            <select
              @click="getLideres"
              class="form-select"
              aria-label="Default select example"
              required
              v-model="lider"
            >
              <option
                :value="item"
                v-for="(item, index) in lideres"
                :key="index"
              >
                {{ item.nombre }}
              </option>
            </select>
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <label class="form-label">Última revisión: *</label>
            <input
              type="date"
              @keydown.prevent
              @click="abrirCalendario"
              class="form-control"
              id="direccion_empresa"
              required
              aria-describedby="emailHelp"
              v-model="ultima_revision"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
      </div>
      <!-- :disabled="deshabilitar_boton" -->
      <button
        class="btn btn-success m-4"
        type="submit"
        v-if="
          (permisos[35].autorizado && $route.params.id != undefined) ||
          (permisos[36].autorizado && $route.params.id == undefined)
        "
      >
        Guardar formulario
      </button>
      <button
        v-if="indice == 1"
        class="btn btn-success m-4"
        type="button"
        @click="saveFile()"
      >
        Cargar evidencia
      </button>
    </form>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import Loading from "./Loading.vue";
import { Alerts } from "../Mixins/Alerts.js";
import { Permisos } from "../Mixins/Permisos.js";

export default {
  components: {
    Loading,
  },
  mixins: [Token, Alerts, Permisos],
  props: {
    id_registro: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      mensaje_error: "¡Este campo debe ser diligenciado!",
      tipo_proceso: {},
      nombre_proceso: {},
      causa: "",
      nombre_riesgo: "",
      plan_accion: "",
      oportunidad: "",
      probabilidad: [{}, {}],
      impacto: [{}, {}],
      documento_registrado: [{}, {}],
      clase_control: [{}, {}],
      frecuencia_control: [{}, {}],
      tipo_control: [{}, {}],
      existe_evidencia: [{}, {}],
      ejecucion_eficas: [{}, {}],
      metodo_identificacion: [{}, {}],
      factor: [{}, {}],
      seguimiento: [{}, {}],
      control: [{}, {}],
      soporte: [{}, {}],
      nivel_oportunidad_riesgo: [{}, {}],
      plan_accion: "",
      consecuencia: "",
      efecto: "",
      amenaza: "",
      oportunidad2: "",
      tab_amenaza: true,
      tab_oportunidad: false,
      indice: 0,
      resultado: [{}, {}],
      resultado_control: [{}, {}],
      nivel_probabilidad: [],
      nivel_impacto: [],
      tipos_proceso: [],
      nombres_proceso: [],
      metodos_identificacion: [],
      factores: [],
      seguimientos: [],
      documentos_registrados: [],
      clases_control: [],
      frecuencias_control: [],
      tipos_control: [],
      existe_evidencias: [],
      ejecuciones_eficaces: [],
      niveles_probabilidad: [],
      responsable: "",
      ultima_revision: "",
      color_celda_oportunidades: "",
      nivel_riesgo_oportunidad: [{}, {}],
      matriz_oportunidades: [],
      matriz_amenazas: [],
      controles: [],
      lideres: [],
      lider: {},
      riesgo_id: this.$route.params.id,
      loading: false,
      file: [],
      ruta_archivo: null,
      setColorCelda_resultado: true,
      divExpandido: false,
      seguimiento_guardado: [],
      contador: 0,
      clasificaciones: [],
    };
  },
  computed: {},
  watch: {
    $route() {
      if (this.$route.params.id == undefined) {
        this.LimpiarFormulario();
      }
    },
    documento_registrado() {
      this.getResultadoControl();
    },
    clase_control() {
      this.getResultadoControl();
    },
    frecuencia_control() {
      this.getResultadoControl();
    },
    tipo_control() {
      this.getResultadoControl();
    },
    existe_evidencia() {
      this.getResultadoControl();
    },
    ejecucion_eficas() {
      this.getResultadoControl();
    },
    indice() {
      this.contador = 2;
      this.setIndice();
    },
    impacto() {
      this.setImpactoxProbabilidad();
    },
    probabilidad() {
      this.setImpactoxProbabilidad();
    },
    id_registro() {
      this.reseteaTab();
      this.getApi(this.id_registro);
    },
  },
  mounted() {
    if (this.riesgo_id != undefined) {
      this.reseteaTab();
      this.getApi(this.riesgo_id);
    } else {
      this.reseteaTab();
      this.getMatrizOportunidades();
      this.getMatrizAmenazas();
      this.getControl();
      this.getClasificacion();
      this.setColorCelda_resultado = true;
    }
  },
  methods: {
    reformatearFecha(fechaOriginal) {
      const fechaHora = new Date(fechaOriginal);
      const año = fechaHora.getFullYear();
      const mes = (fechaHora.getMonth() + 1).toString().padStart(2, "0"); // Los meses son indexados desde 0
      const dia = fechaHora.getDate().toString().padStart(2, "0");
      const horas = fechaHora.getHours().toString().padStart(2, "0");
      const minutos = fechaHora.getMinutes().toString().padStart(2, "0");
      const segundos = fechaHora.getSeconds().toString().padStart(2, "0");
      const fechaFormateada = `${dia}/${mes}/${año}  `;
      const horaFormateada = `${horas}:${minutos}:${segundos}`;
      return fechaFormateada + " " + horaFormateada;
    },
    toggleDiv() {
      this.divExpandido = !this.divExpandido;
    },
    reseteaTab() {
      this.tab_amenaza = true;
      this.tab_oportunidad = false;
      this.indice = 0;
    },
    cargarArchivo(event) {
      const file = event.target.files[0];
      this.file[0] = file;
    },
    deleteFile(index) {
      this.file.splice(index, 1);
      document.getElementById("formFile" + index).value = "";
    },
    getApi(id) {
      this.getTiposProceso();
      this.getNombresProceso();
      this.getNivelProbabilidad();
      this.getNivelImpacto();
      this.getMetodosIdentificacion();
      this.getFactores();
      this.getSeguimientos();
      this.getDocumentosRegistrados();
      this.getClasesControl();
      this.getFrecuenciasControl();
      this.getTiposControl();
      this.getEvidencias();
      this.getEjecucionesEficaces();
      this.getLideres();
      this.getClasificacion();
      this.getControl();
      this.getMatrizOportunidades();
      this.getMatrizAmenazas();
      this.getItems(id);
    },
    setIndice() {
      if (this.nivel_riesgo_oportunidad[this.indice].background == undefined) {
        this.nivel_riesgo_oportunidad[this.indice].background = "#e9ecef";
      }
      if (this.resultado_control[this.indice].background == undefined) {
        this.resultado_control[this.indice].background = "#e9ecef";
      }
      this.oportunidadTratamiento(this.resultado[this.indice].total);
      this.setColorResultadoControl(this.resultado_control[this.indice].peso);
    },
    setImpactoxProbabilidad() {
      if (
        this.impacto[this.indice].nivel != undefined &&
        this.probabilidad[this.indice].nivel != undefined
      ) {
        let total = "";
        total =
          parseInt(this.probabilidad[this.indice].nivel) *
          parseInt(this.impacto[this.indice].nivel);
        this.resultado[this.indice].total = total + " %";
        this.oportunidadTratamiento(total);
      }
    },
    getItems(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/matrizriesgobyid/" + id, config)
        .then(function (result) {
          self.llenarFormulario(result.data);
        });
    },
    llenarFormulario(formulario) {
      this.nombre_riesgo = formulario.nombre_riesgo;
      this.oportunidad = formulario.oportunidad;
      this.causa = formulario.causa;
      this.plan_accion = formulario.plan_accion;
      this.consecuencia = formulario.consecuencia;
      this.efecto = formulario.efecto;
      this.ruta_archivo = formulario.evidencia;

      this.amenaza = this.filteredArray(
        this.clasificaciones,
        formulario.amenaza
      );

      this.oportunidad2 = this.filteredArray(
        this.clasificaciones,
        formulario.oportunidad_2
      );

      this.tipo_proceso = this.filteredArray(
        this.tipos_proceso,
        formulario.a_tipo_proceso_id
      );

      this.nombre_proceso = this.filteredArray(
        this.nombres_proceso,
        formulario.a_nombre_proceso_id
      );

      this.probabilidad[0] = this.filteredArray(
        this.nivel_probabilidad,
        formulario.a_probabilidad_id
      );

      this.probabilidad[1] = this.filteredArray(
        this.nivel_probabilidad,
        formulario.o_probabilidad_id
      );

      this.impacto[0] = this.filteredArray(
        this.nivel_impacto,
        formulario.a_impacto_id
      );

      this.impacto[1] = this.filteredArray(
        this.nivel_impacto,
        formulario.o_impacto_id
      );

      this.nivel_oportunidad_riesgo[0].nivel = formulario.a_nivel_riesgo;
      this.nivel_oportunidad_riesgo[0].tratamiento = formulario.a_tratamiento;
      this.nivel_oportunidad_riesgo[1].nivel = formulario.o_nivel_riesgo;
      this.nivel_oportunidad_riesgo[1].tratamiento = formulario.o_tratamiento;

      this.metodo_identificacion[0] = this.filteredArray(
        this.metodos_identificacion,
        formulario.a_metodo_identificacion_id
      );

      this.metodo_identificacion[1] = this.filteredArray(
        this.metodos_identificacion,
        formulario.o_metodo_identificacion_id
      );

      this.factor[0] = this.filteredArray(
        this.factores,
        formulario.a_factor_id
      );

      this.factor[1] = this.filteredArray(
        this.factores,
        formulario.o_factor_id
      );

      this.control[0].control = formulario.a_nombre_control;
      this.control[1].control = formulario.o_nombre_control;
      this.soporte[0].soporte = formulario.a_soporte;
      this.soporte[1].soporte = formulario.o_soporte;
      this.seguimiento[0] = this.filteredArray(
        this.seguimientos,
        formulario.a_seguimiento_id
      );

      this.seguimiento[1] = this.filteredArray(
        this.seguimientos,
        formulario.o_seguimiento_id
      );

      this.documento_registrado[0] = this.filteredArray(
        this.documentos_registrados,
        formulario.a_documento_registrado_id
      );

      this.documento_registrado[1] = this.filteredArray(
        this.documentos_registrados,
        formulario.o_documento_registrado_id
      );

      this.clase_control[0] = this.filteredArray(
        this.clases_control,
        formulario.a_clase_control_id
      );

      this.clase_control[1] = this.filteredArray(
        this.clases_control,
        formulario.o_clase_control_id
      );

      this.frecuencia_control[0] = this.filteredArray(
        this.frecuencias_control,
        formulario.a_frecuencia_control_id
      );

      this.frecuencia_control[1] = this.filteredArray(
        this.frecuencias_control,
        formulario.o_frecuencia_control_id
      );

      this.tipo_control[0] = this.filteredArray(
        this.tipos_control,
        formulario.a_tipo_control_id
      );

      this.tipo_control[1] = this.filteredArray(
        this.tipos_control,
        formulario.a_tipo_control_id
      );

      this.existe_evidencia[0] = this.filteredArray(
        this.existe_evidencias,
        formulario.a_existe_evidencia_id
      );

      this.existe_evidencia[1] = this.filteredArray(
        this.existe_evidencias,
        formulario.o_existe_evidencia_id
      );

      this.ejecucion_eficas[0] = this.filteredArray(
        this.ejecuciones_eficaces,
        formulario.a_ejecucion_eficaz_id
      );

      this.ejecucion_eficas[1] = this.filteredArray(
        this.ejecuciones_eficaces,
        formulario.o_ejecucion_eficaz_id
      );
      this.ejecuciones_eficaces[formulario.o_ejecucion_eficaz_id];

      this.ultima_revision = formulario.ultima_revision;
      this.lider = this.filteredArray(this.lideres, formulario.responsable_id);

      this.resultado[0].total = formulario.a_total;
      this.resultado[1].total = formulario.o_total;

      this.resultado_control[0].descripcion =
        formulario.a_resultado_control_descripcion;
      this.resultado_control[0].peso = formulario.a_resultado_control_peso;
      this.resultado_control[1].descripcion =
        formulario.o_resultado_control_descripcion;
      this.resultado_control[1].peso = formulario.o_resultado_control_peso;

      this.nivel_riesgo_oportunidad[0].background = formulario.a_total_color;
      this.resultado_control[0].background = formulario.a_color_resultado;

      this.nivel_riesgo_oportunidad[1].background = formulario.o_total_color;
      this.resultado_control[1].background = formulario.o_color_resultado;
      this.setColorCelda_resultado = false;
      this.seguimiento_guardado = formulario.seguimiento;
      this.oportunidadTratamiento(formulario.a_total);
      this.setImpactoxProbabilidad();
      this.getResultadoControl();
      this.loading = false;
    },
    filteredArray(array, id) {
      return array.find((objto) => objto.id == id);
    },
    LimpiarFormulario() {
      this.tipo_proceso = {};
      this.nombre_proceso = {};
      this.nombre_riesgo = "";
      this.oportunidad = "";
      this.causa = "";
      this.plan_accion = "";
      this.consecuencia = "";
      this.efecto = "";
      this.amenaza = "";
      this.oportunidad2 = "";
      this.ruta_archivo = null;
      this.probabilidad = [{}, {}];
      this.impacto = [{}, {}];
      this.documento_registrado = [{}, {}];
      this.clase_control = [{}, {}];
      this.frecuencia_control = [{}, {}];
      this.tipo_control = [{}, {}];
      this.existe_evidencia = [{}, {}];
      this.ejecucion_eficas = [{}, {}];
      this.metodo_identificacion = [{}, {}];
      this.factor = [{}, {}];
      this.seguimiento = [{}, {}];
      this.control = [{}, {}];
      this.soporte = [{}, {}];
      this.nivel_oportunidad_riesgo = [{}, {}];
      this.resultado = [{}, {}];
      this.resultado_control = [{}, {}];
      this.ultima_revision = "";
      this.lider = {};
      this.nivel_riesgo_oportunidad[0].background = "#e9ecef";
      this.resultado_control[0].background = "#e9ecef";
      this.nivel_riesgo_oportunidad[1].background = "#e9ecef";
      this.resultado_control[1].background = "#e9ecef";
      this.file = [];
      this.seguimiento_guardado = [];
      this.tab_amenaza = true;
      this.tab_oportunidad = false;
      this.id_registro = 0;
      this.riesgo_id = undefined;
      this.indice = 0;
    },
    getNivelImpacto() {
      if (this.nivel_impacto.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nivelimpacto", config)
          .then(function (result) {
            self.nivel_impacto = result.data;
          });
      }
    },
    getNivelProbabilidad() {
      if (this.nivel_probabilidad.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nivelprobabilidad", config)
          .then(function (result) {
            self.nivel_probabilidad = result.data;
          });
      }
    },
    getTiposProceso() {
      if (this.tipos_proceso.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/tiposproceso", config)
          .then(function (result) {
            self.tipos_proceso = result.data;
          });
      }
    },
    getNombresProceso() {
      if (this.nombres_proceso.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/nombresproceso", config)
          .then(function (result) {
            self.nombres_proceso = result.data;
          });
      }
    },
    getMetodosIdentificacion() {
      if (this.metodos_identificacion.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/metodosidentificacion", config)
          .then(function (result) {
            self.metodos_identificacion = result.data;
          });
      }
    },
    abrirCalendario(event) {
      event.target.showPicker(); // Abre el selector de fecha
    },
    getFactores() {
      if (this.factores.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/factores", config)
          .then(function (result) {
            self.factores = result.data;
          });
      }
    },
    getSeguimientos() {
      if (this.seguimientos.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/seguimientos", config)
          .then(function (result) {
            self.seguimientos = result.data;
          });
      }
    },
    getDocumentosRegistrados() {
      if (this.documentos_registrados.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/documentosregistrados", config)
          .then(function (result) {
            self.documentos_registrados = result.data;
          });
      }
    },
    getClasesControl() {
      if (this.clases_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/clasescontrol", config)
          .then(function (result) {
            self.clases_control = result.data;
          });
      }
    },
    getFrecuenciasControl() {
      if (this.frecuencias_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/frecuenciascontrol", config)
          .then(function (result) {
            self.frecuencias_control = result.data;
          });
      }
    },
    getTiposControl() {
      if (this.tipos_control.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/tiposcontrol", config)
          .then(function (result) {
            self.tipos_control = result.data;
          });
      }
    },
    getEvidencias() {
      if (this.existe_evidencias.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/existeevidencias", config)
          .then(function (result) {
            self.existe_evidencias = result.data;
          });
      }
    },
    getEjecucionesEficaces() {
      if (this.ejecuciones_eficaces.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/ejecucioneseficaces", config)
          .then(function (result) {
            self.ejecuciones_eficaces = result.data;
          });
      }
    },
    getControl() {
      if (this.controles.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/riesgoscontrol", config)
          .then(function (result) {
            self.controles = result.data;
          });
      }
    },
    getMatrizOportunidades() {
      if (this.matriz_oportunidades.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/matrizoportunidades", config)
          .then(function (result) {
            self.matriz_oportunidades = result.data;
          });
      }
    },
    getMatrizAmenazas() {
      if (this.matriz_amenazas.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/matrizamenazas", config)
          .then(function (result) {
            self.matriz_amenazas = result.data;
          });
      }
    },
    scrollToDiv() {
      document.getElementById("tab").scrollIntoView({ behavior: "smooth" });
    },
    getResultadoControl() {
      var self = this;
      // this.setColorCelda_resultado = true
      if (
        this.documento_registrado[this.indice].peso != undefined &&
        this.clase_control[this.indice].peso != undefined &&
        this.frecuencia_control[this.indice].peso != undefined &&
        this.tipo_control[this.indice].peso != undefined &&
        this.existe_evidencia[this.indice].peso != undefined &&
        this.ejecucion_eficas[this.indice].peso != undefined
      ) {
        var peso_total =
          parseInt(this.documento_registrado[this.indice].peso) +
          parseInt(this.clase_control[this.indice].peso) +
          parseInt(this.frecuencia_control[this.indice].peso) +
          parseInt(this.tipo_control[this.indice].peso) +
          parseInt(this.existe_evidencia[this.indice].peso) +
          parseInt(this.ejecucion_eficas[this.indice].peso);

        this.resultado_control[this.indice].peso = peso_total;
        this.setColorResultadoControl(peso_total);
      }
    },
    setColorResultadoControl(peso_total) {
      var self = this;
      this.controles.forEach(function (item) {
        if (item.peso == 0) {
          self.getColorCeldaResultadoControl(item);
        } else {
          var peso = item.peso.split("-");
          if (peso_total >= peso[0] && peso_total <= peso[1]) {
            self.getColorCeldaResultadoControl(item);
          }
        }
      });
    },
    getColorCeldaResultadoControl(item) {
      if (
        (this.id_registro == 0 && this.riesgo_id == undefined) ||
        this.contador >= 4
      ) {
        this.resultado_control[this.indice].descripcion = item.control;
      }
      if (
        this.setColorCelda_resultado ||
        this.contador >= 4 ||
        (!this.setColorCelda_resultado &&
          this.$route.params.id == undefined &&
          this.contador >= 2)
      ) {
        this.resultado_control[this.indice].background = item.color;
        this.resultado_control[this.indice].color =
          item.color === "yellow" ? "black" : "white";
      } else {
        this.resultado_control[this.indice].color =
          this.resultado_control[this.indice].background === "yellow"
            ? "black"
            : "white";
      }
      this.contador++;
    },
    oportunidadTratamiento(total) {
      if (this.indice == 0) {
        this.recorreMatriz(this.matriz_amenazas, total);
      } else {
        this.recorreMatriz(this.matriz_oportunidades, total);
      }
    },
    recorreMatriz(matriz, total) {
      var self = this;
      if (String(total).includes("%")) {
        total = total.replace("%", "");
      }
      matriz.forEach((item) => {
        if (item.peso_celda == String(total).trim()) {
          self.nivel_oportunidad_riesgo[self.indice].nivel = item.atributo_1;
          self.nivel_oportunidad_riesgo[self.indice].tratamiento =
            item.atributo_2;

          self.nivel_riesgo_oportunidad[self.indice].background = item.color;
          self.nivel_riesgo_oportunidad[self.indice].color =
            item.color === "yellow" ? "black" : "white";
        }
      });
    },
    formatInputUpperCase(value) {
      const formattedValue = value.toUpperCase();
      return formattedValue;
    },
    getLideres() {
      if (this.lideres.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/lideres", config)
          .then(function (result) {
            self.lideres = result.data;
          });
      }
    },
    getClasificacion() {
      if (this.clasificaciones.length <= 0) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/clasificacionesriesgos", config)
          .then(function (result) {
            self.clasificaciones = result.data;
          });
      }
    },
    save() {
      let self = this;
      let form = this.crearObjetoRiesgo();
      let config = this.configHeader();
      var url = "";
      if (this.$route.params.id != undefined) {
        var id = this.$route.params.id;
      } else if (this.id_registro != 0) {
        var id = this.id_registro;
      }
      if (id != undefined) {
        url = self.URL_API + "api/v1/matrizriesgo/" + id;
      } else {
        url = self.URL_API + "api/v1/matrizriesgo";
      }
      axios.post(url, form, config).then(function (result) {
        self.showAlert(result.data.message, result.data.status);
      });
    },
    saveFile() {
      var self = this;
      let config = this.configHeader();
      const form = new FormData();
      form.append("evidencia", self.file[0]);
      if (this.$route.params.id != undefined) {
        var id = this.$route.params.id;
      } else if (this.id_registro != 0) {
        var id = this.id_registro;
      }
      if (id != undefined) {
        axios
          .post(self.URL_API + "api/v1/matrizriesgo/doc/" + id, form, config)
          .then(function (result) {
            self.showAlert(result.data.message, result.data.status);
          });
      } else {
        self.showAlert(
          "Diligencie y guarde el archivo para cargar la evidencia.",
          "Error"
        );
      }
    },
    crearObjetoRiesgo() {
      let objeto_riesgo = {
        tipo_proceso: this.tipo_proceso,
        nombre_proceso: this.nombre_proceso,
        nombre_riesgo: this.nombre_riesgo,
        oportunidad: this.oportunidad,
        causa: this.causa,
        plan_accion: this.plan_accion,
        consecuencia: this.consecuencia,
        efecto: this.efecto,
        amenaza: this.amenaza,
        oportunidad2: this.oportunidad2,
        a_probabilidad: this.probabilidad[0],
        a_impacto: this.impacto[0],
        a_total: this.resultado[0].total,
        a_nivel_riesgo: this.nivel_oportunidad_riesgo[0].nivel,
        a_tratamiento: this.nivel_oportunidad_riesgo[0].tratamiento,
        a_metodo_indentificacion: this.metodo_identificacion[0],
        a_factor: this.factor[0],
        a_nombre_control: this.control[0].control,
        a_soporte: this.soporte[0].soporte,
        a_seguimiento: this.seguimiento[0],
        a_documento_registrado: this.documento_registrado[0],
        a_clase_control: this.clase_control[0],
        a_frecuencia_control: this.frecuencia_control[0],
        a_tipo_control: this.tipo_control[0],
        a_existe_evidencia: this.existe_evidencia[0],
        a_ejecucion_eficas: this.ejecucion_eficas[0],
        a_resultado_control: this.resultado_control[0],
        o_probabilidad: this.probabilidad[1],
        o_impacto: this.impacto[1],
        o_total: this.resultado[1].total,
        o_nivel_riesgo: this.nivel_oportunidad_riesgo[1].nivel,
        o_tratamiento: this.nivel_oportunidad_riesgo[1].tratamiento,
        o_metodo_indentificacion: this.metodo_identificacion[1],
        o_factor: this.factor[1],
        o_nombre_control: this.control[1].control,
        o_soporte: this.soporte[1].soporte,
        o_seguimiento: this.seguimiento[1],
        o_documento_registrado: this.documento_registrado[1],
        o_clase_control: this.clase_control[1],
        o_frecuencia_control: this.frecuencia_control[1],
        o_tipo_control: this.tipo_control[1],
        o_existe_evidencia: this.existe_evidencia[1],
        o_ejecucion_eficas: this.ejecucion_eficas[1],
        o_resultado_control: this.resultado_control[1],
        responsable_id: this.lider.id,
        responsable_nombre: this.lider.nombre,
        ultima_revision: this.ultima_revision,
      };

      return objeto_riesgo;
    },
  },
};
</script>
<style scoped>
label {
  float: left;
  margin: 20px 0px 5px 0px;
}

.nav-item {
  cursor: pointer;
}

.nav-link {
  color: black;
}

.evidencia {
  background-color: rgb(143, 138, 138);
  margin-top: 20px;
  height: 85%;
  padding: 10px;
  padding-top: 50px;
  box-sizing: border-box;
  margin-top: 25px;
  border-radius: 10px;
  /* color: white; */
  font-size: 1.4rem;
  cursor: pointer;
  text-align: 0 auto;
  transition-duration: 1.5s;
}

.evidencia i {
  margin-right: 10px;
}

.evidencia a {
  color: white;
  text-decoration: none;
  transition-duration: 1.5s;
}

.evidencia:hover {
  /* color: rgb(12 89 109); */
  background-color: rgb(29, 117, 194);
  transition-duration: 1.5s;
}

.evidencia a:hover {
  /* color: rgb(12 89 109); */
  transition-duration: 1.5s;
}

.pestaña {
  position: fixed;
  top: 30%;
  right: 0;
  background-color: lightblue;
  padding: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  cursor: pointer;
  z-index: 1000;
  background: rgb(0, 107, 63);
  color: white;
  background: linear-gradient(
    95deg,
    rgba(0, 107, 63, 1) 4%,
    rgba(26, 150, 56, 1) 19%,
    rgba(48, 159, 128, 1) 45%,
    rgba(22, 119, 115, 1) 63%,
    rgba(4, 66, 105, 1) 88%
  );
}

/* Animación para expandir */
@keyframes expandir {
  from {
    width: 0;
  }

  to {
    width: 300px;
  }
}

@keyframes contraer {
  from {
    width: 300px;
  }

  to {
    width: 0;
  }
}

/* Estilos cuando el div está expandido */
.expandido {
  animation: expandir 1s ease;
  /* Animación para expandir */
  width: 300px;
  height: 300px;
  /* Anchura del contenido expandido */
}

.pestaña:not(.expandido) {
  animation: contraer 1s ease;
  /* Animación para contraer */
  overflow: hidden;
  /* Ocultar el contenido al contraer */
}
</style>
