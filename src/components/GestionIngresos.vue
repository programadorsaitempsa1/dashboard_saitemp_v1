<template>
  <div class="container">
    <Loading :loading="loading" />
    <h2>Solicitud de servicio</h2>
    <div
      @click="toggleDiv"
      :class="{
        expandido: divExpandido,
        pestaña: !divExpandido,
        pestaña3: divExpandido,
      }"
      class="pestaña"
      style="overflow-y: auto"
      v-if="seguimiento.length > 0"
    >
      <div v-if="!divExpandido">Seguimiento guardado</div>
      <div v-for="(item, index) in seguimiento" :key="index">
        <div v-if="divExpandido" style="text-align: left">
          {{ item.estado }}
        </div>
        <div v-if="divExpandido" style="text-align: left">
          {{ item.usuario }}
        </div>
        <div v-if="divExpandido" style="text-align: left">
          {{ reformatearFecha(item.created_at) }}
        </div>
        <hr v-if="divExpandido" />
      </div>
    </div>
    <div
      @click="toggleDiv2"
      :class="{
        expandido2: divExpandido2,
        pestaña: !divExpandido2,
        pestaña2: divExpandido2,
      }"
      class="pestaña2"
      style="overflow-y: auto"
      v-if="seguimiento_estados.length > 0"
    >
      <div v-if="!divExpandido2">Seguimiento estados</div>
      <div v-for="(item, index) in seguimiento_estados" :key="index">
        <div v-if="divExpandido2" style="text-align: left">
          {{ item.estado_ingreso_final }}
        </div>
        <div v-if="divExpandido2" style="text-align: left">
          {{ item.responsable_final.replace("null", "") }}
        </div>
        <div v-if="divExpandido2" style="text-align: left; margin: 5px">
          <i style="font-size: 1.5rem" class="bi bi-arrow-up-circle"></i> Fecha:
          {{ reformatearFecha(item.created_at) }}
        </div>
        <div v-if="divExpandido2" style="text-align: left">
          {{ item.estado_ingreso_inicial }}
        </div>
        <div v-if="divExpandido2" style="text-align: left">
          {{ item.responsable_inicial.replace("null", "") }}
        </div>
        <hr v-if="divExpandido2" />
      </div>
    </div>
    <form class="was-validated" @submit.prevent="save()">
      <!-- <h6 class="tituloseccion">Información general</h6> -->
      <div id="seccion">
        <div class="row" v-if="$route.path != '/navbar/gestion-ingresosl'">
          <div class="col-3 mb-3">
            <label
              for="exampleInputEmail1"
              style="float: left"
              class="form-label"
            >
              Búsqueda por documento</label
            >
            <input
              type="text"
              class="form-control form-control-sm"
              autocomplete="off"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              v-model="numero_documento_candidato"
            />
          </div>
          <div class="col-xs-3 col-md-3 mt-3">
            <button
              type="button"
              style="margin-top: 35px"
              @click="buscarDocumentoFormulario()"
              class="btn btn-success btn-sm"
            >
              Buscar
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-3 mb-3">
            <label
              for="exampleInputEmail1"
              style="float: left"
              class="form-label"
            >
              N° servicio</label
            >
            <input
              type="text"
              class="form-control form-control-sm"
              autocomplete="off"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              v-model="n_servicio"
              placeholder="Radicado del servcio"
            />
          </div>
          <div
            class="col-3 mb-3"
            v-if="$route.path == '/navbar/gestion-ingresos'"
          >
            <label
              for="exampleInputEmail1"
              style="float: left"
              class="form-label"
            >
              Replicar formulario</label
            >
            <input
              type="text"
              class="form-control form-control-sm"
              autocomplete="off"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              v-model="replica"
              @input="replica = validarNumero(replica)"
              placeholder="Número de veces a replicar"
              maxlength="2"
            />
          </div>
        </div>
        <div
          class="row"
          v-if="
            $route.params.id != undefined ||
            $route.path == '/navbar/gestion-ingresosl'
          "
        >
          <h6 style="text-align: left">Radicado: {{ radicado }}</h6>
        </div>
        <div class="row">
          <div class="col" v-if="$route.params.id != undefined">
            <label class="form-label">Fecha radicado</label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="fecha_expedicion"
              aria-describedby="emailHelp"
              v-model="fecha_radicado"
              disabled
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Estado: *"
              @getEstadosIngreso="getEstadosIngreso"
              eventoCampo="getEstadosIngreso"
              nombreItem="nombre"
              :consulta="consulta_estado_ingreso"
              :registros="estados_ingreso"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Responsable: "
              @getEncargados="getEncargados"
              eventoCampo="getEncargados"
              nombreItem="nombre"
              :consulta="consulta_responsable_ingreso"
              :registros="lista_encargados"
              placeholder="Seleccione una opción"
              :valida_campo="replica > 1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="Empresa usuaria: *"
              @getEmpresasCliente="getEmpresasCliente"
              eventoCampo="getEmpresasCliente"
              nombreItem="nombre"
              :consulta="consulta_empresa_cliente"
              :registros="empresas_cliente"
              placeholder="Seleccione una opción"
              :disabled="
                bloquea_campos &&
                consulta_empresa_cliente != null &&
                !permisos[25].autorizado
              "
            />
          </div>
          <div class="col">
            <label class="form-label">Dirección de presentación</label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="direccion_empresa"
              aria-describedby="emailHelp"
              v-model="direccion_empresa"
              @input="
                direccion_empresa = formatInputUpperCase($event.target.value)
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Tipo de servicio: *"
              @getTipoServicio="getTipoServicio"
              eventoCampo="getTipoServicio"
              nombreItem="nombre"
              :consulta="consulta_tipo_servicio"
              :registros="tipos_servicio"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
        <div class="row">
          <!-- <div class="col" v-if="tipo_servicio_id == 2">
                      <label class="form-label">Número de contrataciones</label>
                      <input type="text" class="form-control" autocomplete="off" id="fecha_expedicion"
                          aria-describedby="emailHelp" v-model="numero_contrataciones"
                          @input="numero_contrataciones = validarNumero(numero_contrataciones)" />
                      <div class="invalid-feedback">
                          {{ mensaje_error }}
                      </div>
                  </div> -->
          <!-- <div class="col" v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4">
                      <label class="form-label">Número de vacantes</label>
                      <input type="text" class="form-control" autocomplete="off" id="fecha_expedicion"
                          aria-describedby="emailHelp" v-model="numero_vacantes"
                          @input="numero_vacantes = validarNumero(numero_vacantes)" />
                      <div class="invalid-feedback">
                          {{ mensaje_error }}
                      </div>
                  </div> -->
          <div
            class="col mb-3"
            v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4"
          >
            <label class="form-label">Citación entrevista: * </label>
            <input
              type="datetime-local"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="citacion_entrevista"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div
            class="col"
            v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4"
          >
            <SearchList
              nombreCampo="Profesional: *"
              @getUsuarios="getUsuarios"
              eventoCampo="getUsuarios"
              nombreItem="nombre"
              :consulta="consulta_usuario"
              :registros="usuarios"
              placeholder="Seleccione una opción"
            />
          </div>
          <div
            class="col"
            v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4"
          >
            <SearchList
              nombreCampo="Estado vacante: "
              @getVacante="getVacante"
              eventoCampo="getVacante"
              @setVacante="setVacante"
              nombreItem="nombre"
              :consulta="consulta_vacante"
              :registros="afirmacionNegacion_vacante"
              :ordenCampo="1"
              :valida_campo="false"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
        <div class="row">
          <div
            class="col mb-3"
            v-if="tipo_servicio_id == 3 || tipo_servicio_id == 4"
          >
            <label class="form-label">Informe selección: * </label>
            <textarea
              name=""
              id="novedades"
              class="form-control"
              rows="1"
              v-model="informe_seleccion"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="form-label">Fecha de ingreso: </label>
            <input
              @keydown.prevent
              @click="abrirCalendario"
              max="9999-12-31"
              type="date"
              class="form-control"
              autocomplete="off"
              id="fecha_expedicion"
              aria-describedby="emailHelp"
              v-model="fecha_ingreso"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <!-- <div class="col mb-3">
                      <label class="form-label">Cambio fecha:
                      </label>
                      <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                          aria-describedby="emailHelp" v-model="cambio_fecha" disabled />
                      <div class="invalid-feedback">
                          {{ mensaje_error }}
                      </div>
                  </div> -->
          <div class="col">
            <SearchList
              nombreCampo="Tipo de Identificación: *"
              @getTipoIdentificacion="getTipoIdentificacion"
              eventoCampo="getTipoIdentificacion"
              :ordenCampo="1"
              nombreItem="des_tip"
              @setTipoIdentificacion="setTipoIdentificacion"
              :registros="tiposIdentificacion"
              :consulta="consulta_tipo_identificacion"
              placeholder="Seleccione una opción"
              :valida_campo="false"
            />
          </div>
          <div class="col mb-3">
            <label class="form-label">Número de identificación: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="numero_identificacion"
              aria-describedby="emailHelp"
              v-model="numero_identificacion"
              @input="
                (numero_identificacion = validarNumero(numero_identificacion)),
                  (userInput_numero_documento = true)
              "
              @blur="getIdentificacion(numero_identificacion)"
              :disabled="
                bloquea_campos &&
                numero_identificacion != null &&
                !permisos[25].autorizado &&
                !userInput_numero_documento
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Apellidos y nombres: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="nombres"
              @input="
                (nombres = formatInputUpperCase($event.target.value)),
                  (userInput_nombres = true)
              "
              :disabled="
                bloquea_campos &&
                nombres != null &&
                !permisos[25].autorizado &&
                !userInput_nombres
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Número contacto: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="celular_candidato"
              @input="celular_candidato = validarNumero2(celular_candidato)"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Correo candidato: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="correo_candidato"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Cargo: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="cargo"
              @input="cargo = formatInputUpperCase($event.target.value)"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Salario: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="salario"
              @input="salario = validarNumero(salario)"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col">
            <SearchList
              nombreCampo="¿Subsidio de transporte:? "
              @getSubsidio="getSubsidio"
              eventoCampo="getSubsidio"
              @setSubsidio="setSubsidio"
              nombreItem="nombre"
              :consulta="consulta_subsidio"
              :registros="afirmacionNegacion_bonos"
              :ordenCampo="1"
              :valida_campo="false"
              placeholder="Seleccione una opción"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="Departamento de prestación del servicio: *"
              nombreItem="nombre"
              eventoCampo="getDepartamentos"
              :consulta="consulta_departamento"
              :registros="departamentos"
              @getMunicipios="getMunicipios"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Ciudad de prestación del servicio: *"
              nombreItem="nombre"
              :registros="municipios"
              :ordenCampo="1"
              :consulta="consulta_municipio"
              @setMunicipios="setMunicipios"
              eventoCampo="setMunicipios"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col mb-3">
            <label class="form-label">EPS: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="eps"
              @input="eps = formatInputUpperCase($event.target.value)"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <SearchList
              nombreCampo="AFP: *"
              @getAFP="getAFP"
              eventoCampo="getAFP"
              nombreItem="nombre"
              :consulta="consulta_afp"
              :registros="lista_afp"
              :ordenCampo="1"
              :valida_campo="false"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="¿Stradata verificado:? "
              @getAfirmacionNegacion="getAfirmacionNegacion"
              eventoCampo="getAfirmacionNegacion"
              @setAfirmacionNegacion="setAfirmacionNegacion"
              nombreItem="nombre"
              :consulta="consulta_stradata"
              :registros="afirmacionNegacion"
              :ordenCampo="1"
              :valida_campo="false"
              placeholder="Seleccione una opción"
            />
          </div>
          <div class="col mb-3">
            <label class="form-label">Novedades stradata: </label>
            <textarea
              name=""
              id="novedades_stradata"
              class="form-control"
              rows="1"
              v-model="novedades_stradata"
              @input="
                novedades_stradata = formatInputUpperCase($event.target.value)
              "
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <SearchList
              nombreCampo="Departamento ubicación laboratorio médico: *"
              nombreItem="nombre"
              eventoCampo="getDepartamentos"
              :registros="departamentos"
              @getMunicipios="getMunicipios"
              :ordenCampo="2"
              placeholder="Seleccione una opción"
              :consulta="consulta_departamento_laboratorio"
              :valida_campo="false"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Ciudad ubicación laboratorio médico: *"
              nombreItem="nombre"
              :registros="municipios"
              @setMunicipios="setMunicipios"
              eventoCampo="setMunicipios"
              :ordenCampo="2"
              placeholder="Seleccione una opción"
              :consulta="consulta_municipio_laboratorio"
              :valida_campo="false"
            />
          </div>
          <div class="col">
            <SearchList
              nombreCampo="Laboratorio médico: *"
              nombreItem="nombre"
              :registros="laboratorios_medicos"
              @getLaboratorios="getLaboratorios"
              eventoCampo="getLaboratorios"
              placeholder="Seleccione una opción"
              :consulta="consulta_laboratorio"
              :valida_campo="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Otro laboratorio: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="laboratorio"
              @input="laboratorio = formatInputUpperCase($event.target.value)"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Dirección laboratorio: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="direccion_laboratorio"
              @input="
                direccion_laboratorio = formatInputUpperCase(
                  $event.target.value
                )
              "
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Correo laboratorio: </label>
            <textarea
              name=""
              id="examenes"
              class="form-control"
              rows="1"
              v-model="correo_laboratorio"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Exámenes: </label>
            <textarea
              name=""
              id="examenes"
              class="form-control"
              rows="1"
              v-model="examenes"
              @input="examenes = formatInputUpperCase($event.target.value)"
            ></textarea>
          </div>
          <div class="col mb-3">
            <label class="form-label">Fecha examen: </label>
            <input
              max="9999-12-31"
              @keydown.prevent
              @click="abrirCalendario"
              type="date"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="fecha_examen"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Recomendaciones exámenes: </label>
            <textarea
              name=""
              id="recomendaciones_examen"
              class="form-control"
              rows="1"
              v-model="recomendaciones_examen"
              @input="
                recomendaciones_examen = formatInputUpperCase(
                  $event.target.value
                )
              "
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Novedades exámenes médicos: </label>
            <textarea
              name=""
              id="novedades_examenes"
              class="form-control"
              rows="1"
              v-model="novedades_examenes"
              @input="
                novedades_examenes = formatInputUpperCase($event.target.value)
              "
            ></textarea>
          </div>
          <div class="col mb-3">
            <label class="form-label">Observaciones al servicio: </label>
            <textarea
              maxlength="2000"
              name=""
              id="novedades"
              class="form-control"
              rows="1"
              v-model="novedades"
              @input="novedades = formatInputUpperCase($event.target.value)"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label">Correo empresa: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="correo_empresa"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label">Contacto empresa: </label>
            <input
              type="text"
              class="form-control"
              autocomplete="off"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              v-model="contacto_empresa"
            />
            <div class="invalid-feedback">
              {{ mensaje_error }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <SearchList
              nombreCampo="Novedad en servicio: *"
              nombreItem="nombre"
              :registros="observaciones_estado"
              @getObservacionesEstado="getObservacionesEstado"
              eventoCampo="getObservacionesEstado"
              :ordenCampo="2"
              placeholder="Seleccione una opción"
              :consulta="consulta_observacion_estado"
              :valida_campo="false"
              :disabled="bloquea_campos && !permisos[26].autorizado"
            />
          </div>
          <div
            class="col mb-6"
            v-if="consulta_observacion_estado == 'Servicio no conforme'"
          >
            <label class="form-label">Afectaciones al servicio: </label>
            <textarea
              name=""
              id="afectacion_servicio"
              class="form-control"
              rows="1"
              v-model="afectacion_servicio"
              placeholder="Solo para no conformidades"
              @input="
                afectacion_servicio = formatInputUpperCase($event.target.value)
              "
              :disabled="bloquea_campos && !permisos[26].autorizado"
            ></textarea>
          </div>
        </div>
        <div class="row">
          <div
            class="col-6"
            v-if="consulta_observacion_estado == 'Servicio no conforme'"
          >
            <SearchList
              nombreCampo="Corregir por: "
              @getEncargadosCorregir="getEncargadosCorregir"
              eventoCampo="getEncargadosCorregir"
              nombreItem="nombre"
              :consulta="consulta_encargado_corregir"
              :registros="lista_encargados_corregir"
              placeholder="Seleccione una opción"
              :valida_campo="false"
              :disabled="bloquea_campos && !permisos[26].autorizado"
            />
          </div>
          <div
            class="col-6"
            v-if="no_conformidad != null && no_conformidad != ''"
          >
            <label class="form-label">No conformidad hora limite:</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                autocomplete="off"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="no_conformidad"
                :disabled="
                  bloquea_campos &&
                  no_conformidad != null &&
                  no_conformidad != ''
                "
              />
              <button
                v-if="permisos[27].autorizado"
                class="btn btn-success"
                type="button"
                @click="actualizarNc()"
              >
                Limpiar campo
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col" style="margin: 30px" v-if="permisos[23].autorizado">
            <div
              v-if="$route.params.id != undefined"
              class="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-md btn-success dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Enviar
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" @click.prevent="envioCorreo(1)">
                      Enviar solicitud cliente</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click.prevent="envioCorreo(2)">
                      Enviar informe de seleccion</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" @click.prevent="envioCorreo(3)">
                      Enviar citación laboratorio</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col" style="margin: 30px" v-if="permisos[33].autorizado">
            <div v-if="$route.params.id != undefined" class="btn">
              <button
                type="button"
                class="btn btn-md btn-success"
                aria-expanded="false"
                @click.prevent="exportarDocumentos"
              >
                Exportar documentos
              </button>
            </div>
          </div>

          <div class="col" style="margin: 30px" v-if="permisos[23].autorizado">
            <div
              v-if="$route.params.id != undefined"
              class="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-md btn-success dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Descargar
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="descargarInforme(1)"
                      >Descargar orden de servicio</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="descargarInforme(2)"
                      >Descargar informe de seleccion</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="descargarInforme(3)"
                      >Descargar citación laboratorio</a
                    >
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="descargarInforme(4)"
                      >Descargar citación candidato</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col">
            <button
              type="button"
              v-if="$route.params.id != undefined"
              style="background-color: #d4ac0d; color: white"
              @click="agregarPendientes()"
              class="btn m-4"
            >
              Añadir a tareas pendientes
            </button>
          </div>
        </div>
      </div>
      <div class="row" style="text-align: left; clear: both; margin-top: 40px">
        <h5 @click="adjuntos = !adjuntos" style="cursor: pointer">
          Archivos adjuntos <i v-if="adjuntos" class="bi bi-chevron-down"></i
          ><i v-if="!adjuntos" class="bi bi-chevron-compact-up"></i>
        </h5>
      </div>
      <h6 class="tituloseccion" v-if="adjuntos">Carga de archivos</h6>
      <div id="seccion" v-if="adjuntos">
        <div
          class="row upload"
          v-for="(item, index) in fileInputsCount"
          :key="index"
        >
          <div
            class="form-check col-1 m-0"
            v-if="$route.params.id != null && permisos[24].autorizado"
          >
            <input
              class="form-check-input m-0"
              type="checkbox"
              value=""
              @click="
                enviarArchivos(!carga_archivo[index], item.ruta, item.nombre)
              "
              v-model="carga_archivo[index]"
              :disabled="item.ruta == undefined"
              id="flexCheckDefault"
            />
          </div>

          <div
            class="col"
            v-if="
              $route.params.id != null ||
              $route.path == '/navbar/gestion-ingresosl'
            "
          >
            <a
              :href="item.ruta != undefined ? URL_API + item.ruta : null"
              target="_blank"
              rel="noopener noreferrer"
              ><button
                type="button"
                :class="
                  item.ruta != undefined
                    ? 'btn btn-sm ver'
                    : 'btn btn-sm btn-secondary'
                "
              >
                <i class="bi bi-eye"> ver</i>
              </button></a
            >
          </div>
          <div class="col-3">
            <div class="mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="1"
                :disabled="true"
                v-model="item.nombre"
              ></textarea>
            </div>
          </div>
          <div class="col-3">
            <div class="input-group">
              <input
                type="file"
                class="form-control"
                :id="'seleccionArchivos' + index"
                :accept="fileInputsCount[index].tipo_archivo"
                @change="cargarArchivo($event, index)"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                :="item.nombre.includes('*') && item.ruta == undefined"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="deleteFile(index)"
                id="inputGroupFileAddon04"
              >
                Quitar archivo
              </button>
              <div class="invalid-feedback">
                {{ mensaje_error }}
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="mb-3">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                v-model="observacion_archivo[index]"
              ></textarea>
            </div>
          </div>
          <div class="col" v-if="$route.path != '/navbar/gestion-ingresosl'">
            <button
              type="button"
              @click="messageDelete(item)"
              :class="
                item.ruta != undefined
                  ? 'btn btn-sm eliminar'
                  : 'btn btn-sm btn-secondary d-none'
              "
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <button
        v-if="
          permisos[23].autorizado && $route.path != '/navbar/gestion-ingresosl'
        "
        class="btn btn-success m-4"
        :disabled="deshabilitar_boton"
        type="submit"
      >
        Guardar formulario
      </button>
      <div
        class="row"
        v-if="$route.params.id != undefined"
        style="text-align: left; clear: both; margin-bottom: 40px"
      >
        <h5 @click="envio_correo = !envio_correo" style="cursor: pointer">
          Envío correo <i v-if="envio_correo" class="bi bi-chevron-down"></i
          ><i v-if="!envio_correo" class="bi bi-chevron-compact-up"></i>
        </h5>
      </div>
      <SolicitudNovedadesNomina
        v-if="$route.params.id != undefined && envio_correo"
        :menu="menu"
        :reenvio_correo="reenvio_correo"
        :adjuntos_candidato_string="adjuntos_candidato_string"
        @lanzarLoading="lanzarLoading"
      />

      <div
        class="row"
        v-if="gestioningresocorreos.length > 0"
        style="text-align: left; clear: both; margin-bottom: 40px"
      >
        <h5
          @click="historico_correos = !historico_correos"
          style="cursor: pointer"
        >
          Historico correos enviados
          <i v-if="historico_correos" class="bi bi-chevron-down"></i
          ><i v-if="!historico_correos" class="bi bi-chevron-compact-up"></i>
        </h5>
      </div>
      <div id="seccion" v-if="historico_correos">
        <!-- <div class="correos" v-for="item, index in gestioningresocorreos" :key="index"
                  style="margin-bottom: 20px; font-size: 1.05rem">

                  <div class="row m-2">
                      <b style="width: auto;">De: </b> {{ item.remitente }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Para: </b> {{ item.destinatario }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Con copia: </b> {{ item.con_copia == '' ? 'Sin datos' : item.con_copia
                      }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Con copia oculta: </b> {{ item.con_copia_oculta == '' ? 'Sin datos' :
          item.con_copia_oculta }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Asunto: </b> {{ item.asunto }}
                  </div>

                  <div class="row m-2" style="text-align: left; white-space: pre-line;">
                      <b style="width: auto;">Mensaje: </b> {{ item.mensaje.replace(/&amp;nbsp;/g, '\n') }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Adjunto: </b> {{ item.adjunto }}
                  </div>

                  <div class="row m-2">
                      <b style="width: auto;">Fecha envío: </b> {{ reformatearFecha(item.created_at) }}
                  </div>
                  <div class="row m-2">
                      <button class="btn btn-sm btn-success" type="button" style="width: auto;"
                          @click="reenviar(item)">Reenviar</button>
                  </div>
                  <hr>
              </div> -->
        <div class="table-responsive">
          <table
            class="table table-striped table-hover table-bordered align-middle"
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Remitente</th>
                <th scope="col">Destinatario</th>
                <th scope="col">Con copia</th>
                <th scope="col">Con copia oculta</th>
                <th scope="col">Asunto</th>
                <th scope="col">Mensaje</th>
                <th scope="col">Adjuntos</th>
                <th scope="col">Fecha envío</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in gestioningresocorreos" :key="index">
                <th scope="row">{{ index }}</th>
                <td>{{ item.remitente }}</td>
                <td>{{ item.destinatario }}</td>
                <td>{{ item.con_copia }}</td>
                <td>{{ item.con_copia_oculta }}</td>
                <td>{{ item.asunto }}</td>
                <td>{{ item.mensaje }}</td>
                <td>{{ item.adjunto }}</td>
                <td>{{ reformatearFecha(item.created_at) }}</td>
                <td scope="col">
                  <button
                    class="btn btn-success"
                    type="button"
                    @click="reenviar(item)"
                  >
                    Reenviar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { Token } from "../Mixins/Token.js";
import Loading from "./Loading.vue";
import SearchList from "./SearchList.vue";
import SolicitudNovedadesNomina from "./SolicitudNovedadesNomina.vue";
import { Alerts } from "../Mixins/Alerts.js";
import { Scroll } from "../Mixins/Scroll.js";
import { Permisos } from "../Mixins/Permisos.js";

export default {
  components: {
    SearchList,
    Loading,
    SolicitudNovedadesNomina,
  },
  mixins: [Token, Alerts, Scroll, Permisos],
  props: {
    menu: [],
    id_registro: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      URL_API: process.env.VUE_APP_URL_API,
      ingresos_responsables: [],
      consulta_responsable_ingreso: "",
      responsable_ingreso_id: "",
      contratacion_responsables: [],
      consulta_responsable_contratacion: "",
      responsable_contratacion_id: "",
      fecha_ingreso: "",
      numero_identificacion: "",
      nombres: "",
      empresas_cliente: [],
      consulta_empresa_cliente: "",
      empresa_cliente_id: "",
      cargo: "",
      salario: "",
      celular_candidato: "",
      eps: "",
      lista_afp: [],
      consulta_afp: "",
      afp_id: "",
      paises: [],
      consulta_pais: "",
      pais_id: "",
      departamentos: [],
      consulta_departamento: "",
      departamento_id: "",
      municipios: [],
      consulta_municipio: "",
      municipio_id: "",
      fileInputsCount: [],
      fileInputsCountCopia: [],
      observacion_archivo: [],
      novedades: "",
      laboratorio: "",
      fecha_examen: "",
      examenes: "",
      afirmacionNegacion: "",
      mensaje_error: "¡Este campo debe ser diligenciado!",
      deshabilitar_boton: false,
      registroIngreso: [],
      consulta_stradata: "",
      verificado_stradata: "",
      file: [],
      id_cliente: "",
      responsable: "",
      estado: "",
      loading: true,
      fecha_radicado: "",
      tipos_servicio: [],
      consulta_tipo_servicio: "",
      tipo_servicio_id: "",
      numero_contrataciones: "",
      numero_vacantes: "",
      citacion_entrevista: "",
      usuarios: [],
      consulta_usuario: "",
      usuario_id: "",
      informe_seleccion: "",
      // cambio_fecha: '',
      radicado: "",
      estados_ingreso: "",
      estado_ingreso_id: "",
      consulta_estado_ingreso: "",
      lista_encargados: "",
      consulta_encargado: "",
      encargado_id: "",
      correo: "",
      adjuntos: false,
      envio_correo: false,
      historico_correos: false,
      gestioningresocorreos: [],
      menu_id: "",
      novedades_stradata: "",
      correo_candidato: "",
      correo_empresa: "",
      direccion_empresa: "",
      direccion_laboratorio: "",
      recomendaciones_examen: "",
      novedades_examenes: "",
      id_comparar: "",
      descargarpdf: null,
      reenvio_correo: "",
      carga_archivo: [],
      adjuntos_candidato: [],
      adjuntos_candidato_string: "",
      laboratorios_medicos: [],
      consulta_municipio_laboratorio: "",
      municipio_laboratorio_id: "",
      consulta_departamento_laboratorio: "",
      departamento_laboratorio_id: "",
      consulta_laboratorio: "",
      laboratorio_medico_id: "",
      divExpandido: false,
      divExpandido2: false,
      seguimiento: [],
      seguimiento_estados: [],
      consulta_subsidio: "",
      consulta_vacante: "",
      afirmacionNegacion_bonos: "",
      afirmacionNegacion_vacante: "",
      tiposIdentificacion: [],
      consulta_tipo_identificacion: "",
      tipo_identificacion: "",
      idSeleccionado: "",
      consulta_observacion_estado: "",
      observaciones_estado: [],
      afectacion_servicio: "",
      correo_laboratorio: "",
      contacto_empresa: "",
      numero_documento_candidato: "",
      bloquea_campos: false,
      userInput_nombres: false,
      userInput_numero_documento: false,
      consulta_encargado_corregir: "",
      lista_encargados_corregir: "",
      no_conformidad: "",
      variableX: "",
      hora: "",
      replica: "",
      n_servicio: "",
    };
  },
  computed: {},
  watch: {
    $route() {
      this.limpiarFormulario();
      this.getModulo();
    },
    menu() {
      this.getModulo();
    },
    id_registro() {
      this.scrollTop();
      // this.loading = true
      this.getArchivosIngreso();
    },
  },
  mounted() {
    window.addEventListener("keydown", this.combinacionGuardado);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.combinacionGuardado);
  },
  created() {
    this.getArchivosIngreso();
    this.fileInputsCountCopia = [...this.fileInputsCount];
    this.scrollTop();
    this.getModulo();
    this.getDepartamentos(43);
    this.consultahora();
  },
  methods: {
    messageDelete(item) {
      let self = this;
      var title = "Estas seguro de elimiar el resgistro?";
      this.$swal
        .fire({
          title: title,
          text: "Esta operación no se puede revertir!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            self.eliminarDocumento(item);
          }
        });
    },
    eliminarDocumento(item) {
      let self = this;
      let config = this.configHeader();
      axios
        .delete(
          self.URL_API +
            "api/v1/eliminararchivosingreso/" +
            this.$route.params.id +
            "/" +
            item.id,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
        });
    },
    getObservacionesEstado(item = null) {
      if (item != null) {
        this.consulta_observacion_estado = item.nombre;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/observacionestado", config)
        .then(function (result) {
          self.observaciones_estado = result.data;
        });
    },
    descargarInforme(id) {
      this.idSeleccionado = id;
      if (this.$route.params.id !== undefined) {
        const urlDescarga =
          this.URL_API +
          "api/v1/gestioningresospdf/null/" +
          this.$route.params.id +
          "/" +
          this.idSeleccionado;
        window.open(urlDescarga, "_blank");
      }
    },
    getSubsidio() {
      this.afirmacionNegacion_bonos = [
        { id: "1", nombre: "Si" },
        { id: "0", nombre: "No" },
      ];
    },
    setSubsidio(item, campo) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.consulta_subsidio = item.nombre;
            break;
        }
      }
    },
    getVacante() {
      this.afirmacionNegacion_vacante = [
        { id: "1", nombre: "Abierto" },
        { id: "0", nombre: "Cerrado" },
        { id: "2", nombre: "Cancelado" },
      ];
    },
    setVacante(item, campo) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.consulta_vacante = item.nombre;
            break;
        }
      }
    },
    getTipoIdentificacion() {
      if (this.tiposIdentificacion == "") {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/tipodocumentolista", config)
          .then(function (result) {
            self.tiposIdentificacion = result.data;
          });
      }
    },
    setTipoIdentificacion(item = null, campo = null) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.tipo_identificacion = item.cod_tip;
            this.consulta_tipo_identificacion = item.des_tip;
            break;
        }
      }
    },
    lanzarLoading(loading) {
      this.loading = loading;
    },
    toggleDiv() {
      this.divExpandido = !this.divExpandido;
      this.divExpandido2 = false;
    },
    toggleDiv2() {
      this.divExpandido2 = !this.divExpandido2;
      this.divExpandido = false;
    },
    enviarArchivos(booleano, ruta_archivo, nombre) {
      var self = this;
      if (booleano) {
        this.adjuntos_candidato.push({
          nombre_archivo: nombre,
          ruta_archivo: ruta_archivo,
        });
      } else {
        this.adjuntos_candidato.forEach(function (item, index) {
          if (item.nombre_archivo == nombre) {
            self.adjuntos_candidato.splice(index, 1);
          }
        });
      }
      this.adjuntos_candidato_string = JSON.stringify(self.adjuntos_candidato);
    },
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
    reenviar(item) {
      this.envio_correo = true;
      setTimeout(() => {
        this.reenvio_correo = item;
      }, 1000);
    },
    agregarPendientes() {
      var self = this;
      let config = self.configHeader();
      var check = [];
      check.push(this.$route.params.id);
      axios
        .post(
          self.URL_API + "api/v1/formularioingresopendientes",
          check,
          config
        )
        .then(function (result) {
          self.showAlert(result.data.message, result.data.status);
        });
    },
    getModulo() {
      var self = this;
      if (self.$route.path != "/navbar/gestion-ingresosl") {
        var ruta =
          self.$route.path.split("/")[1] + "/" + self.$route.path.split("/")[2];
        this.menu.forEach(function (item) {
          item.opciones.forEach((element) => {
            if (element.url == ruta) {
              self.menu_id = element.id;
              self.historicoCorreos();
            }
          });
        });
      }
    },
    envioCorreo(id) {
      let self = this;
      if (this.valida_envioCorreo()) {
        return;
      }
      this.idSeleccionado = id;
      this.loading = true;
      this.scrollTop();
      let config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/gestioningresospdf/" +
            self.menu_id +
            "/" +
            self.$route.params.id +
            "/" +
            this.idSeleccionado,
          config
        )
        .then(function (result) {
          // self.estados_ingreso = result.data
          self.showAlert(result.data.message, result.data.status);
          self.loading = false;
        });
    },
    getIdentificacion(id_cliente) {
      let self = this;
      if (id_cliente) {
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/consulta_id_trump/" + id_cliente, config)
          .then(function (result) {
            if (result.data.bloqueado == "Si") {
              document.getElementById("numero_identificacion").focus();
              self.numero_identificacion = "";
              self.showAlertmasBoton(result.data.message, result.data.status);
            } else if (result.data.apto == 1) {
              self.showAlertmasBoton(result.data.message, result.data.status);
            } else if (
              result.data.no_apto == 2 &&
              self.$route.params.id == undefined
            ) {
              document.getElementById("numero_identificacion").focus();
              self.numero_identificacion = "";
              self.showAlertmasBoton(result.data.message, result.data.status);
            }
            return;
          });
      }
    },
    valida_envioCorreo() {
      if (this.correo_empresa == null && this.correo_laboratorio == null) {
        this.showAlert(
          "Para enviar el correo debe diligenciar por lo menos el correo de la empresa y guardar el formulario",
          "error"
        );
        return true;
      }
    },
    combinacionGuardado(event) {
      if (this.$route.path != "/navbar/gestion-ingresosl") {
        if (event.ctrlKey && event.key.toLowerCase() === "s") {
          event.preventDefault();
          this.save();
        }
      }
    },
    getEstadosIngreso(item = null) {
      if (item != null) {
        this.consulta_responsable_ingreso = "";
        this.estado_ingreso_id = item.id;
        this.consulta_estado_ingreso = item.nombre;
        this.consulta_encargado = "";
        this.encargado_id = "";
        this.lista_encargados = [];
        this.lista_encargados_corregir = [];
        this.getEncargados(null, item.id);
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/estadosingresos", config)
        .then(function (result) {
          self.estados_ingreso = result.data;
        });
    },
    getEncargadosCorregir(item = null) {
      if (item != null) {
        this.encargado_id = item.id;
        this.consulta_encargado_corregir = item.nombre;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/responsableingresos/" + 12, config)
        .then(function (result) {
          self.lista_encargados_corregir = result.data;
        });
    },
    getEncargados(item = null, id = null) {
      if (item != null) {
        this.encargado_id = item.usuario_id;
        this.consulta_encargado = item.nombre;
        this.consulta_responsable_ingreso = item.nombre;
      }
      if (id != null) {
        let self = this;
        let config = this.configHeader();
        axios
          .get(self.URL_API + "api/v1/responsableingresos/" + id, config)
          .then(function (result) {
            self.lista_encargados = result.data;
          });
      }
    },
    getResponsablesIngresos(item = null) {
      if (item != null) {
        this.consulta_responsable_ingreso = item.nombre;
        this.responsable_ingreso_id = item.id;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/resposablesingresos", config)
        .then(function (result) {
          self.ingresos_responsables = result.data;
        });
    },
    getResponsablesContratacion(item = null) {
      if (item != null) {
        this.consulta_responsable_contratacion = item.nombre;
        this.responsable_contratacion_id = item.id;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/resposablescontratacion", config)
        .then(function (result) {
          self.ingresos_responsables = result.data;
        });
    },
    getEmpresasCliente(item = null) {
      if (item != null) {
        this.consulta_empresa_cliente = item.nombre;
        this.empresa_cliente_id = item.id;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/empresascliente", config)
        .then(function (result) {
          self.empresas_cliente = result.data;
        });
    },
    getAFP(item = null) {
      if (item != null) {
        this.consulta_afp = item.nombre;
        this.afp_id = item.id;
      }
      let self = this;
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/afp", config).then(function (result) {
        self.lista_afp = result.data;
      });
    },
    getArchivosIngreso() {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/archivosingreso", config)
        .then(function (result) {
          if (self.$route.params.id == undefined) {
            self.loading = false;
          }
          self.fileInputsCount = result.data;
          self.id_cliente = self.$route.params.id;
          if (self.id_registro != 0) {
            self.id_cliente = self.id_registro;
          }
          if (self.id_cliente != undefined) {
            self.getRegistroIngreso(self.id_cliente);
          }
        });
    },
    getAfirmacionNegacion() {
      this.afirmacionNegacion = [
        { id: "1", nombre: "Autorizado" },
        { id: "0", nombre: "No autorizado" },
      ];
    },
    setAfirmacionNegacion(item, campo) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.consulta_stradata = item.nombre;
            break;
        }
      }
    },
    getPaises(item = null) {
      if (item != null) {
        this.paises_id = item.id;
        this.consulta_pais = item.nombre;
        if (this.consulta_pais == "No aplica") {
          this.consulta_departamento = "No aplica";
          this.consulta_municipio = "No aplica";
          this.municipio_id = 1;
        }
      }
      let self = this;
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/paises", config).then(function (result) {
        self.paises = result.data;
      });
    },
    getDepartamentos(id) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/departamentos/" + id, config)
        .then(function (result) {
          self.departamentos = result.data;
        });
    },
    getMunicipios(item, ordenCampo, index) {
      let self = this;
      this.setLabelDepartamento(item, ordenCampo, index);
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/municipios/" + item.id, config)
        .then(function (result) {
          self.municipios = result.data;
        });
    },
    setLabelDepartamento(item = null, campo = null) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.consulta_departamento = item.nombre;
            break;
          case 2:
            this.consulta_departamento_laboratorio = item.nombre;
            break;
        }
      }
    },
    setMunicipios(item, campo) {
      if (item != null) {
        switch (campo) {
          case 1:
            this.municipio_id = item.id;
            this.consulta_municipio = item.nombre;
            break;
          case 2:
            this.municipio_laboratorio_id = item.id;
            this.consulta_municipio_laboratorio = item.nombre;
            this.laboratorios_medicos = [];
            break;
        }
      }
    },
    getLaboratorios(item = null) {
      if (item != null) {
        this.consulta_laboratorio = item.nombre;
        this.laboratorio_medico_id = item.id;
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API + "api/v1/laboratorios/" + this.municipio_laboratorio_id,
          config
        )
        .then(function (result) {
          self.laboratorios_medicos = result.data;
        });
    },
    validarNumero(valor) {
      return valor.replace(/\D/g, "");
    },
    validarNumero2(valor) {
      return valor.replace(/[^0-9-\s]/g, "");
    },
    formatInputUpperCase(value) {
      const formattedValue = value.toUpperCase();
      return formattedValue;
    },
    save(ignorarvalidacion = false) {
      let self = this;
      self.loading = true;
      self.scrollTop();
      this.deshabilitar_boton = true;
      setTimeout(() => {
        this.deshabilitar_boton = false;
      }, 3000);
      if (this.validaCampo()) {
        this.loading = false;
        return;
      }
      if (!ignorarvalidacion && this.ValidaHora()) {
        this.loading = false;
        return;
      }
      this.crearRegistroIngreso();

      var url = "";
      if (this.$route.params.id != undefined) {
        url =
          self.URL_API + "api/v1/formularioingreso/" + this.$route.params.id;
      } else {
        url = self.URL_API + "api/v1/formularioingreso";
      }
      let config = this.configHeader();
      axios.post(url, this.registroIngreso, config).then(function (result) {
        if (result.data.message == "ok") {
          self.guardarArchivos(result.data.registro_ingreso_id);
        } else {
          self.showAlert(result.data.message, result.data.status);
          self.loading = false;
        }
      });
      this.variableX = "";
    },
    consultahora() {
      let self = this;
      let config = this.configHeader();
      axios.get(self.URL_API + "api/v1/hora", config).then(function (result) {
        self.hora = result.data;
      });
    },
    ValidaHora() {
      let self = this;
      if (self.hora == 1) {
        if (
          self.estado_ingreso_id == 1 ||
          self.estado_ingreso_id == 33 ||
          self.estado_ingreso_id == 9 ||
          self.estado_ingreso_id == 5
        ) {
          this.confirmationMessage(
            "¿Está seguro de guardar el formulario fuera de la hora limite?, si es asi este registro quedara con una no conformidad",
            "Si",
            "No",
            1
          );
          return true;
        }
      }
    },
    confirmationMessage(title, btnConfirm, btnDenied, validacion) {
      let self = this;
      this.$swal({
        icon: "warning",
        title: title,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: btnConfirm,
        denyButtonText: btnDenied,
      }).then((result) => {
        if (result.isConfirmed) {
          if (validacion == 1) {
            self.variableX = 1;
            const ignorarvalidacion = true;
            self.save(ignorarvalidacion);
          } else {
            const ignorarvalidacion2 = true;
            self.actualizarNc(ignorarvalidacion2);
          }
        } else if (result.isDenied) {
          self.showAlert("Accion cancelada", "info");
        }
      });
    },
    validaBorrarNc() {
      this.confirmationMessage(
        "¿Estas seguro de borrar la no conformidad?",
        "Si",
        "No",
        2
      );
      return true;
    },
    actualizarNc(ignorarvalidacion2 = false) {
      let self = this;
      if (!ignorarvalidacion2 && this.validaBorrarNc()) {
        this.loading = false;
        return;
      }
      let config = this.configHeader();
      axios
        .post(
          self.URL_API + "api/v1/borrar_nc/" + self.$route.params.id,
          config
        )
        .then(function (result) {
          // self.estadoActualizado(currenturl)
          self.showAlert(result.data.message, result.data.status);
        });
      this.no_conformidad = "";
    },

    validaCampo() {
      // if (this.consulta_encargado == '') {
      //     this.showAlert('Debe diligenciar el campo de responsable para guardar el formulario', 'error')
      //     return true
      // }
      if (this.empresa_cliente_id == "") {
        this.showAlert(
          "Debe diligenciar el campo de empresa cliente para guardar el formulario",
          "error"
        );
        return true;
      }
      if (this.tipo_servicio_id == "") {
        this.showAlert(
          "Debe diligenciar el campo tipo de servicio para guardar el formulario",
          "error"
        );
        return true;
      }
      if (this.municipio_id == "") {
        this.showAlert(
          "Debe diligenciar el campo de ciudad para guardar el formulario",
          "error"
        );
        return true;
      }
    },
    abrirCalendario(event) {
      event.target.showPicker(); // Abre el selector de fecha
    },

    crearRegistroIngreso() {
      this.registroIngreso = {
        fecha_ingreo: this.fecha_ingreso,
        numero_identificacion: this.numero_identificacion,
        nombre_completo: this.nombres,
        empresa_cliente_id: this.empresa_cliente_id,
        cargo: this.cargo,
        salario: this.salario,
        municipio_id: this.municipio_id,
        numero_contacto: this.celular_candidato,
        eps: this.eps,
        afp_id: this.afp_id,
        consulta_stradata: this.consulta_stradata,
        novedades: this.novedades,
        laboratorio: this.laboratorio,
        examenes: this.examenes,
        fecha_examen: this.fecha_examen,
        tipo_servicio_id: this.tipo_servicio_id,
        numero_contrataciones: this.numero_contrataciones,
        numero_vacantes: this.numero_vacantes,
        citacion_entrevista: this.citacion_entrevista,
        profesional: this.consulta_usuario,
        informe_seleccion: this.informe_seleccion,
        // cambio_fecha: this.cambio_fecha,
        consulta_encargado: this.consulta_encargado,
        estado_id: this.estado_ingreso_id,
        novedades_stradata: this.novedades_stradata,
        correo_candidato: this.correo_candidato,
        correo_empresa: this.correo_empresa,
        direccion_empresa: this.direccion_empresa,
        direccion_laboratorio: this.direccion_laboratorio,
        recomendaciones_examen: this.recomendaciones_examen,
        novedades_examenes: this.novedades_examenes,
        laboratorio_medico_id: this.laboratorio_medico_id,
        consulta_subsidio: this.consulta_subsidio,
        consulta_vacante: this.consulta_vacante,
        tipo_identificacion: this.tipo_identificacion,
        afectacion_servicio: this.afectacion_servicio,
        consulta_observacion_estado: this.consulta_observacion_estado,
        correo_laboratorio: this.correo_laboratorio,
        contacto_empresa: this.contacto_empresa,
        encargado_id: this.encargado_id,
        consulta_encargado_corregir: this.consulta_encargado_corregir,
        no_conformidad: this.no_conformidad,
        variableX: this.variableX,
        replica: this.replica,
        n_servicio: this.n_servicio,
      };
    },
    cargarArchivo(event, index) {
      const file = event.target.files[0];
      this.file[index] = file;
    },
    deleteFile(index) {
      this.file.splice(index, 1);
      document.getElementById("seleccionArchivos" + index).value = "";
    },
    guardarArchivos(registro_ingreso_id) {
      let self = this;
      let config = this.configHeader();
      const document = new FormData();
      var bandera = 0;
      this.file.forEach(function (item, index) {
        if (item.size > self.limite) {
          self.showAlert(
            "El archivo" +
              item.name +
              "es demasiado pesado, el limite es de 3MB",
            "error"
          );
          bandera++;
        }
        document.append("documento" + index, item);
        if (self.fileInputsCount[index].tipo_documento_id != undefined) {
          document.append(
            "id" + index,
            self.fileInputsCount[index].tipo_documento_id
          );
          document.append(
            "observacion" + index,
            self.observacion_archivo[index]
          );
          document.append("formulario" + index, registro_ingreso_id);
        } else {
          document.append("id" + index, self.fileInputsCount[index].id);
          document.append(
            "observacion" + index,
            self.observacion_archivo[index]
          );
          document.append("formulario" + index, registro_ingreso_id);
        }
      });
      if (bandera <= 0) {
        axios
          .post(self.URL_API + "api/v1/formularioingresodoc", document, config)
          .then(function (result) {
            self.loading = false;
            self.file = [];
            self.showAlert(result.data.message, result.data.status);
            self.limpiarFormulario();
          });
      } else {
        let self = this;
        let config = this.configHeader();
        axios
          .delete(
            self.URL_API + "api/v1/formularioingreso/" + registro_ingreso_id,
            config
          )
          .then(function (result) {
            self.loading = false;
            self.file = [];
            self.showAlert(result.data.message, result.data.status);
          });
      }
    },
    exportarDocumentos() {
      const radicadoId = this.id_cliente;
      const idCliente = this.numero_identificacion;
      let self = this;
      axios({
        url: self.URL_API + `api/v1/descargarZip/${radicadoId}/${idCliente}`,
        method: "GET",
        responseType: "blob", // Esto asegura que se maneje el archivo binario
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `archivos_cliente_${idCliente}.zip`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        })
        .catch((error) => {
          console.error("Error al descargar el archivo ZIP:", error);
        });
    },
    getRegistroIngreso(id_cliente) {
      let self = this;
      let config = this.configHeader();
      axios
        .get(
          self.URL_API + "api/v1/formularioingresobyid/" + id_cliente,
          config
        )
        .then(function (result) {
          self.llenarFormulario(result.data);
          self.scrollAuto();
        });
    },
    getTipoServicio(item = null) {
      if (item != null) {
        this.consulta_tipo_servicio = item.nombre;
        this.tipo_servicio_id = item.id;
        if (item.id == 2) {
          this.numero_vacantes = "";
        } else if (item.id == 3 || item.id == 4) {
          this.numero_contrataciones = "";
          this.citacion_entrevista = "";
          this.consulta_usuario = "";
          this.usuario_id = "";
          this.informe_seleccion = "";
        }
      }
      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/tiposserviofi", config)
        .then(function (result) {
          self.tipos_servicio = result.data;
        });
    },
    getUsuarios(item = null) {
      if (item != null) {
        this.usuario_id = item.id;
        this.consulta_usuario = item.nombre;
      }

      let self = this;
      let config = this.configHeader();
      axios
        .get(self.URL_API + "api/v1/userslist", config)
        .then(function (result) {
          self.usuarios = result.data;
        });
    },
    llenarFormulario(item) {
      var self = this;
      self.bloquea_campos = true;
      this.fecha_ingreso = item.fecha_ingreso;
      this.numero_identificacion = item.numero_identificacion;
      this.nombres = item.nombre_completo;
      this.empresa_cliente_id = item.cliente_id;
      this.consulta_empresa_cliente = item.razon_social;
      this.cargo = item.cargo;
      this.salario = item.salario;
      this.municipio_id = item.municipio_id;
      this.consulta_municipio = item.municipio;
      this.celular_candidato = item.numero_contacto;
      this.eps = item.eps;
      this.afp_id = item.afp_id;
      this.consulta_afp = item.afp;
      this.consulta_stradata = item.estradata;
      this.novedades = item.novedades;
      this.laboratorio = item.laboratorio;
      this.examenes = item.examenes;
      this.fecha_examen = item.fecha_examen;
      this.departamento_id = item.departamento_id;
      this.consulta_departamento = item.departamento;
      this.pais_id = item.pais_id;
      this.consulta_pais = item.pais;
      this.responsable_ingreso_id = item.responsable_id;
      this.responsable = item.responsable_ingreso;
      this.estado = item.estado_ingreso;
      this.fecha_radicado = item.fecha_radicado;
      this.tipo_servicio_id = item.tipo_servicio_id;
      this.consulta_tipo_servicio = item.nombre_servicio;
      this.numero_vacantes = item.numero_vacantes;
      // this.cambio_fecha = item.cambio_fecha
      this.numero_contrataciones = item.numero_contrataciones;
      this.citacion_entrevista = item.citacion_entrevista;
      this.consulta_usuario = item.profesional;
      this.informe_seleccion = item.informe_seleccion;
      this.radicado = item.numero_radicado;
      this.consulta_responsable_ingreso = item.responsable_ingreso;
      this.consulta_estado_ingreso = item.estado_ingreso;
      this.estado_ingreso_id = item.estado_ingreso_id;
      this.novedades_stradata = item.novedad_stradata;
      this.correo_candidato = item.correo_notificacion_usuario;
      this.correo_empresa = item.correo_notificacion_empresa;
      this.direccion_empresa = item.direccion_empresa;
      this.direccion_laboratorio = item.direccion_laboratorio;
      this.recomendaciones_examen = item.recomendaciones_examen;
      this.novedades_examenes = item.novedades_examenes;
      this.consulta_subsidio = item.subsidio_transporte;
      this.consulta_vacante = item.estado_vacante;
      this.consulta_tipo_identificacion = item.tipo_identificacion;
      this.consulta_encargado = item.responsable_ingreso;
      this.tipo_identificacion = item.tipo_identificacion_id;
      this.afectacion_servicio = item.afectacion_servicio;
      this.consulta_observacion_estado = item.observacion_estado;
      this.correo_laboratorio = item.correo_laboratorio;
      this.contacto_empresa = item.contacto_empresa;
      this.encargado_id = item.responsable_id;
      this.consulta_encargado_corregir = item.responsable_corregir;
      this.no_conformidad = item.nc_hora_cierre;
      this.n_servicio = item.n_servicio;

      if (item["laboratorios"][0] != undefined) {
        this.departamento_laboratorio_id =
          item["laboratorios"][0].departamento_id;
        this.consulta_departamento_laboratorio =
          item["laboratorios"][0].departamento;
        this.municipio_laboratorio_id = item["laboratorios"][0].municipio_id;
        this.consulta_municipio_laboratorio = item["laboratorios"][0].municipio;
        this.consulta_laboratorio = item["laboratorios"][0].nombre;
        this.laboratorio_medico_id = item["laboratorios"][0].id;
      } else {
        this.departamento_laboratorio_id = "";
        this.consulta_departamento_laboratorio = "";
        this.municipio_laboratorio_id = "";
        this.consulta_municipio_laboratorio = "";
        this.consulta_laboratorio = "";
        this.laboratorio_medico_id = "";
      }

      this.getEncargados(null, item.estado_ingreso_id);

      this.fileInputsCount.forEach(function (item2, index) {
        item.archivos.forEach(function (item3) {
          if (item2.id == item3.arhivo_id) {
            self.fileInputsCount[index].ruta = item3.ruta;
            self.observacion_archivo[index] = item3.observacion;
          }
        });
      });

      this.seguimiento = item.seguimiento;
      this.seguimiento_estados = item.seguimiento_estados;
      this.loading = false;
    },
    limpiarFormulario() {
      this.bloquea_campos = false;
      this.fecha_ingreso = "";
      this.numero_identificacion = "";
      this.nombres = "";
      this.empresa_cliente_id = "";
      this.consulta_empresa_cliente = "";
      this.cargo = "";
      this.salario = "";
      // this.pais_id = ''
      // this.consulta_pais = ''
      this.departamento_id = "";
      this.consulta_departamento = "";
      this.municipio_id = "";
      this.consulta_municipio = "";
      this.numero_contacto = "";
      this.eps = "";
      this.afp_id = "";
      this.consulta_afp = "";
      this.consulta_stradata = "";
      this.novedades = "";
      this.laboratorio = "";
      this.examenes = "";
      this.fecha_examen = "";
      this.consulta_responsable_ingreso = "";
      this.consulta_estado_ingreso = "";
      this.estado_ingreso_id = "";
      this.novedades_stradata = "";
      this.correo_candidato = "";
      this.correo_empresa = "";
      this.direccion_empresa = "";
      this.direccion_laboratorio = "";
      this.celular_candidato = "";
      this.recomendaciones_examen = "";
      this.novedades_examenes = "";
      this.afectacion_servicio = "";
      this.consulta_observacion_estado = "";
      this.correo_laboratorio = "";
      this.contacto_empresa = "";
      this.consulta_subsidio = "";
      this.consulta_tipo_servicio = "";
      this.tipo_servicio_id = "";
      this.tipo_identificacion = "";
      this.consulta_tipo_identificacion = "";
      this.n_servicio = "";
      this.getArchivosIngreso();
    },
    historicoCorreos() {
      var self = this;
      var config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/consultacorreo/" +
            self.menu_id +
            "/" +
            self.$route.params.id,
          config
        )
        .then(function (result) {
          self.gestioningresocorreos = result.data;
        });
    },
    buscarDocumentoFormulario() {
      var self = this;
      var config = this.configHeader();
      axios
        .get(
          self.URL_API +
            "api/v1/buscardocumentoformularioi/" +
            self.numero_documento_candidato,
          config
        )
        .then(function (result) {
          self.llenarFormulario(result.data);
          const rutaActual = self.$route;
          const nuevosParametros = { ...rutaActual.params, id: result.data.id };
          self.$router.replace({ ...rutaActual, params: nuevosParametros });
        });
    },
  },
};
</script>

<style scoped>
/* .seccion {
  width: 100%;
  margin: 40px 0px 40px 0px;
  padding: 30px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
} */

#seccion,
.orientacion {
  border: solid #d5dbdb 0.5px;
  padding: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.tituloseccion {
  position: relative;
  display: inline-block;
  background-color: white;
  padding: 5px;
  top: 22px;
}

span {
  height: 38px;
}

label {
  float: left;
  margin: 20px 0px 5px 0px;
}

.ver {
  background-color: #006b3f;
  color: white;
}

.eliminar {
  background-color: #dc3545;
  color: white;
}

h2 {
  font-family: "Montserrat", sans-serif;
  margin: 20px 0px 20px 0px;
}

.correos {
  padding: 10px;
  border-radius: 5px;
}

.correos:nth-child(odd) {
  background-color: #f2f2f2;
}

.correos:hover {
  background-color: #e8e7e7;
}

.lineTime {
  padding: 10px;
  color: white;
  background-attachment: fixed;
  background-color: blueviolet;
  position: absolute;
  right: -9%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  text-align: left;
  font-size: 0.9rem;
}

/* Estilos para la pestaña */
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

.pestaña2 {
  position: fixed;
  top: 37%;
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

.pestaña3 {
  position: fixed;
  top: 45%;
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

/* Animación para expandir */
@keyframes expandir2 {
  from {
    width: 0;
  }

  to {
    width: 300px;
  }
}

@keyframes contraer2 {
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

/* Estilos cuando el div está expandido */
.expandido2 {
  animation: expandir2 1s ease;
  /* Animación para expandir */
  width: 300px;
  height: 300px;
  /* Anchura del contenido expandido */
}

.pestaña2:not(.expandido2) {
  animation: contraer2 1s ease;
  /* Animación para contraer */
  overflow: hidden;
  /* Ocultar el contenido al contraer */
}
</style>
