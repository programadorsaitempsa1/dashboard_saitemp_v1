<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <img style="width: 100%;" src="@/assets/logo1.png" alt="">
            </div>
            <div class="col-8">
                <h5>SAGRILAFT</h5>
                <h5>Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos y Financiación del Terrorismo
                    FORMATO ÚNICO DE VINCULACIÓN DE CONTRAPARTES</h5>
            </div>
            <div class="col-2">
                <span>FEGC-01-02</span>
                <span>3-01-2023</span>
                <span>Version 4</span>
            </div>
        </div>

        <form>
            <h6 class="tituloseccion">1.1.1 ?</h6>
            <div id="seccion">
                <div class="row">
                    <!-- <div class="col">
                        <SearchTable nombreCampo="Planilla eventual" @getEmpleados="getEmpleados" eventoCampo="getEmpleados"
                            :nombreItem="camposEmpleado" :endpoint="endpointEmpleados" placeholder="Planilla eventual"
                            :showModal="showModal" :datos="empleados" />
                    </div> -->
                    <div class="col">
                        <SearchList nombreCampo="Operación *" @getTiposIdentificacion="getTiposIdentificacion"
                            eventoCampo="getTiposIdentificacion" nombreItem="des_tip" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Contratacion directa</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="manejo_datos" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Atraccion y seleccion de talento</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="manejo_datos" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de persona *" @getTiposIdentificacion="getTiposIdentificacion"
                            eventoCampo="getTiposIdentificacion" nombreItem="des_tip" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTiposIdentificacion="getTiposIdentificacion"
                            eventoCampo="getTiposIdentificacion" nombreItem="des_tip" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Número de identificación</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <!-- <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Código alterno</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="codigo_alterno" />
                    </div> -->
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Fecha de expedición: *</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">NIT: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Digito de verificación:
                            *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <!-- <label for="" style="text-align: left; margin:20px 0px 0px 0px">Expedición del documento de
                        identidad</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" nombreItem="nom_pai" :registros="paises" ubicacion="pais expedicion"
                            @getDepartamentos="getDepartamentos" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento expedicion" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad expedicion" placeholder="Ciudad" />
                    </div> -->
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Razon social: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Detalle de la Actividad
                            Económica Principal: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Fecha de constitución: *
                        </label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Código CIIU: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Estrato: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Dirección de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de nacimiento</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais nacimiento" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento nacimiento" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Contacto de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Correo electrónico: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Teléfono empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Número celular: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Número de matricula: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento matricula: *" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento nacimiento" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Ciudad de matricula: *" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Actividad Económica: * Sin Animo de lucro" nombreItem="nom_ciu"
                            :registros="municipios" @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento"
                            placeholder="Ciudad" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Actividad Económica: Sociedad Comercial" nombreItem="nom_ciu"
                            :registros="municipios" @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento"
                            placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Otra ¿Cuál?:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">AIU negociado: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Plazo pago (días): *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Vendedor: *" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Observaciones a acuerdos
                            comerciales:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label endpointEmpleadosfor="exampleInputEmail1" class="form-label">Cuantos empleados conforman la
                            empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Jornada Laboral:" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Rotación de personal *" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.1.1 ?</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre del cargo *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_nombre" />
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_nombre" />
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_nombre" />
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_nombre" />
                            <label for="exampleInputEmail1" class="form-label">Segundo nombre</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="segundo_nombre" />
                    </div>
                    <div class="col mb-3">
                         <!-- Select con filtro personalizado -->
                     <div class="row" id="contenedor-select"> 
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Municipio</label>
                            <div class="input-group">
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                            <input type="text" @click="hover2 = !hover2" autocomplete="off" @input="filterResults(municipio,municipios,'municipios')" class="form-control" id="exampleInputEmail2" placeholder="Municipio"
                            aria-describedby="emailHelp" v-model="municipio"/>
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover2 && municipios.length > 0" id="select2" @mouseleave="hover2 = false">
                            <div  id="lista2" v-for="(item, index) in municioiosFilter" :key="index" @click="municipioId(municipio), municipiosSubregion.push(item.nombre), hover2 = !hover2, municipio= '',filterResults('',municipios,'municipios')">
                                {{ item.nombre }}
                            </div>
                        </div>
                    </div>
                     <!-- Fin select con filtro personalizado -->
                    </div>
                    <div class="col mb-3">
                         <!-- Select con filtro personalizado -->
                     <div class="row" id="contenedor-select"> 
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Municipio</label>
                            <div class="input-group">
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-search"></i></span>
                            <input type="text" @click="hover2 = !hover2" autocomplete="off" @input="filterResults(municipio,municipios,'municipios')" class="form-control" id="exampleInputEmail2" placeholder="Municipio"
                            aria-describedby="emailHelp" v-model="municipio"/>
                            <span class="input-group-text" id="basic-addon3"><i class="bi bi-chevron-compact-down"></i></span>
                            </div>
                        </div>
                        <div v-if="hover2 && municipios.length > 0" id="select2" @mouseleave="hover2 = false">
                            <div  id="lista2" v-for="(item, index) in municioiosFilter" :key="index" @click="municipioId(municipio), municipiosSubregion.push(item.nombre), hover2 = !hover2, municipio= '',filterResults('',municipios,'municipios')">
                                {{ item.nombre }}
                            </div>
                        </div>
                    </div>
                     <!-- Fin select con filtro personalizado -->
                    </div>
                    <div class="col mb-3">
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Primer apellido</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="primer_apellido" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Segundo apellido</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="segundo_apellido" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais nacimiento" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento nacimiento" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Género" @getGenero="getGenero" eventoCampo="getGenero" nombreItem="des_gen"
                            :registros="generos" placeholder="Género" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado civil" @getEstadoCivil="getEstadoCivil" eventoCampo="getEstadoCivil"
                            nombreItem="des_est" :registros="estadosCiviles" placeholder="Estado civil" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_nacimiento" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Básicos Del Empleado</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Grupo sanguineo" @getGrupoSanguineo="getGrupoSanguineo"
                            eventoCampo="getGrupoSanguineo" nombreItem="nombre" :registros="gruposSanguineos"
                            placeholder="Grupo sanguineo" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Factor RH" @getFactorRH="getFactorRH" eventoCampo="getFactorRH"
                            :registros="factoresRH" nombreItem="nombre" placeholder="Factor RH" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Clase Libreta Militar" @getClaseLibretaMilitar="getClaseLibretaMilitar"
                            eventoCampo="getClaseLibretaMilitar" :registros="clasesLibretaMilitar" nombreItem="nombre"
                            placeholder="Clase Libreta Militar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Nacionalidad" @getNacionalidad="getNacionalidad"
                            eventoCampo="getNacionalidad" :registros="nacionalidades" nombreItem="nombre"
                            placeholder="Nacionalidad" />
                    </div>
                </div>
                <div class="row" v-if="claseLibretaMilitar != 'No aplica'">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Número de libreta militar</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_libreta_militar" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Distrito libreta militar</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="distrito_libreta_militar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Estatura</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="estatura" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Peso</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="peso" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Residencia</h6>
            <div id="seccion">
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 0px 0px">Ciudad de residencia</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais residencia" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento residencia" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad residencia" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Dirección</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="direccion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Barrio</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="barrio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="telefono" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Celular</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="celular" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo electrónico alternativo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="correo_alternativo" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">En caso de emergencia avisar a:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="avisar_emergencia" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Autoriza el manejo de datos a la
                            compañía?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="manejo_datos" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Salariales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Régimen salarial" @getRegimenSalarial="getRegimenSalarial"
                            eventoCampo="getRegimenSalarial" :registros="regimenesSalariales" nombreItem="nombre"
                            placeholder="Régimen salarial" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Forma de pago" nombreItem="nom_pag" @getFormaPago="getFormaPago"
                            eventoCampo="getFormaPago" :registros="formaspago" placeholder="Forma de pago" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Código del banco" @getBanco="getBanco" eventoCampo="getBanco"
                            nombreItem="nom_ban" :registros="bancos" placeholder="Código del banco" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_cuenta" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pago electrónico:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="pago_electronico" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modalidad Retención" @getModalidadRetencion="getModalidadRetencion"
                            eventoCampo="getModalidadRetencion" :registros="modalidadesRetencion" nombreItem="nombre"
                            placeholder="Modalidad Retención" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje de Retención:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="porcentaje_retencion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor Salud Año Anterior:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="salud_anio_anteior" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Cálculo IMAN" @getCalculoIman="getCalculoIman" eventoCampo="getCalculoIman"
                            :registros="calculosIman" nombreItem="nombre" placeholder="Cálculo IMAN" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Estabilidad Laboral</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="estabilidad_laboral" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Vacaciones" @getVacaciones="getVacaciones" eventoCampo="getVacaciones"
                            :registros="vacaciones" nombreItem="nombre" placeholder="Vacaciones" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Días de vacaciones por año:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="dias_vacaciones" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Sábado es hábil</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="sabado_habil" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pagar día 31</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="pagar_31" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos Del Contrato</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de contrato:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="numero_contrato" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha Celebración:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_celebracion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de contrato" @getTipoContrato="getTipoContrato"
                            eventoCampo="getTipoContrato" nombreItem="nom_con" :registros="tiposcontrato"
                            placeholder="Tipo de contrato" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Estado Laboral del Empleado"
                            @getEstadoLaboralEmpleado="getEstadoLaboralEmpleado" eventoCampo="getEstadoLaboralEmpleado"
                            nombreItem="nom_est" :registros="estadoslaboralesempleados"
                            placeholder="Estado Laboral del Empleado" />
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de contrato</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais contrato" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento contrato" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad contrato" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Notas al contrato:</label>
                        <textarea class="form-control" v-model="nota_contrato" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Estructura De Costos</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchTable nombreCampo="Convenio" @getConvenio="getConvenio" eventoCampo="getConvenio"
                            :datos="convenios" endpoint="centrotrabajo" :nombreItem="camposConvenio"
                            placeholder="Compañía" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal conevnio" :registros="municipios" placeholder="Sucursal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Centro de costos convenio" :registros="municipios"
                            placeholder="Centro de costos" />
                    </div>
                </div>
                <div class="row" v-for="item, index in numeroClasificadorConvenio" :key="index + 'b'">
                    <div class="col">
                        <SearchTable :nombreCampo="'Clasificador ' + (index + 1) + ' del Convenio'"
                            @getConvenio="getConvenio" eventoCampo="getConvenio" :datos="convenios"
                            :endpoint="endpointConvenios" :nombreItem="camposConvenio"
                            placeholder="Clasificador del convenio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span v-if="numeroClasificadorConvenio < 8" id="clasificador"
                            @click="numeroClasificadorConvenio < 8 ? numeroClasificadorConvenio++ : numeroClasificadorConvenio"
                            style="cursor: pointer"><i class="bi bi-plus-circle-fill"></i>
                            Agregar clasificador de convenio
                        </span>
                    </div>
                    <div class="col">
                        <span v-if="numeroClasificadorConvenio > 1" id="clasificador"
                            @click="numeroClasificadorConvenio > 1 ? numeroClasificadorConvenio-- : numeroClasificadorConvenio"
                            style="cursor: pointer"><i class="bi bi-dash-circle-fill"></i>
                            Eliminar clasificador de convenio
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Compañía" @getCompania="getCompania" eventoCampo="getCompania"
                            :registros="companias" nombreItem="nom_cia" placeholder="Compañía" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal" @getSucursales="getSucursales" eventoCampo="getSucursales"
                            :registros="sucursales" nombreItem="nom_suc" placeholder="Sucursal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Centro de costos" @getCentroCosto="getCentroCosto"
                            eventoCampo="getCentroCosto" :registros="centrosCostos" nombreItem="nom_cco"
                            placeholder="Centro de costos" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            Local:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="distribucion_centro_costos" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Distribución por Centro de Costos
                            NIIF:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="distribucion_centro_costos_nif" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row" v-for="item, index in numeroClasificador" :key="index + 'a'">
                    <div class="col">
                        <SearchTable :nombreCampo="'Clasificador ' + (index + 1)" :datos="convenios"
                            @getConvenio="getConvenio" eventoCampo="getConvenio" :endpoint="endpointConvenios"
                            :nombreItem="camposConvenio" placeholder="Clasificador del convenio" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <span v-if="numeroClasificador < 7" id="clasificador"
                            @click="numeroClasificador < 8 ? numeroClasificador++ : numeroClasificador"
                            style="cursor: pointer"><i class="bi bi-plus-circle-fill"></i>
                            Agregar clasificador
                        </span>
                    </div>
                    <div class="col">
                        <span v-if="numeroClasificador > 1" id="clasificador"
                            @click="numeroClasificador > 1 ? numeroClasificador-- : numeroClasificador"
                            style="cursor: pointer"><i class="bi bi-dash-circle-fill"></i>
                            Eliminar clasificador
                        </span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Área" @getArea="getArea" eventoCampo="getArea" :registros="areas"
                            nombreItem="des_area" placeholder="Clasificador del convenio" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal seguridad social" @getSucursalsSS="getSucursalsSS"
                            eventoCampo="getSucursalsSS" :registros="sucursalesss" nombreItem="descripcion"
                            placeholder="Clasificador del convenio" />
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Centro de trabajo" @getCentroTrabajo="getCentroTrabajo"
                            eventoCampo="getCentroTrabajo" :datos="convenios" :nombreItem="camposCentroTrabajo"
                            endpoint="centrotrabajo" placeholder="Centro de trabajo" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Cuenta de gastos local" @getCuentagastosl="getCuentagastosl"
                            eventoCampo="getCuentagastosl" :registros="cuentagastosl" nombreItem="descripcion"
                            placeholder="Cuenta de gastos local" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Cuenta de gastos NIF" @getCuentaNIF="getCuentaNIF"
                            eventoCampo="getCuentaNIF" :registros="cuentasNIF" nombreItem="descripcion"
                            placeholder="Cuenta de gastos NIF" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Observaciones:</label>
                        <textarea class="form-control" v-model="observaciones" aria-label="With textarea"></textarea>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Deducibles</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Vivienda:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="vivienda" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Salud / Medicina Prepagada:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="medicina_prepagada" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Dependiente:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="dependiente" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Datos De Contratación</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Salario Básico:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="salario_basico" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Cargo" @getCargo="getCargo" eventoCampo="getCargo" :datos="cargos"
                            :nombreItem="camposCargos" placeholder="Cargo" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Lider?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="lider" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label for="" style="text-align: left; margin:20px 0px 20px 0px">Ciudad de labor</label>
                    <div class="col">
                        <SearchList nombreCampo="Pais" @getPaises="getPaises" eventoCampo="getPaises" nombreItem="nom_pai"
                            ubicacion="pais labor" :registros="paises" @getDepartamentos="getDepartamentos"
                            placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento labor" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad labor" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha ingreso:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_ingreso" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="fecha_finalizacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">No. días periodo prueba:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="periodo_prueba" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha finalización periodo prueba:</label>
                        <input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="finalizacion_periodo_prueba" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Modo de liquidación" @getModoLiquidacion="getModoLiquidacion"
                            eventoCampo="getModoLiquidacion" nombreItem="des_mod" :registros="modosliquidacion"
                            placeholder="Modo de liquidación" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Horas contratadas al mes:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="horas_contratadas" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Valor hora:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="valor_hora" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Clase de salario" @getClaseSalario="getClaseSalario"
                            eventoCampo="getClaseSalario" :registros="clasesSalario" nombreItem="Descripción"
                            placeholder="Clase de salario" />
                    </div>
                    <div class="col">
                        <SearchTable nombreCampo="Fondo de salud" @getFondoSalud="getFondoSalud" eventoCampo="getFondoSalud"
                            :datos="fondosSalud" :nombreItem="camposFondoSalud" placeholder="Fondo de salud" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Fondo de pensión" @getFondoPension="getFondoPension"
                            eventoCampo="getFondoPension" :registros="fondosPension" nombreItem="nom_fdo"
                            placeholder="Fondo de pensión" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Caja de compensación" @getCajaCompensacion="getCajaCompensacion"
                            eventoCampo="getCajaCompensacion" :registros="cajasCompensacion" nombreItem="nom_fdo"
                            placeholder="Caja de compensación" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Administradora de riesgos laborales" @getRiesgoLaboral="getRiesgoLaboral"
                            eventoCampo="getRiesgoLaboral" :registros="riesgosLaborales" nombreItem="nom_fdo"
                            placeholder="Administradora de riesgos laborales" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje ARL:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="porcentaje_arl" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Fondo de Cesantías" @getFondoCesantias="getFondoCesantias"
                            eventoCampo="getFondoCesantias" :registros="fondosCesantias" nombreItem="nom_fdo"
                            placeholder="Fonde de Cesantías" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo medidas certificadas (DIAN)" @getTipoMedidaDian="getTipoMedidaDian"
                            eventoCampo="getTipoMedidaDian" :registros="tiposMedidaDian" nombreItem="Descripcion"
                            placeholder="Tipo medidas certificadas (DIAN)" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de cotizante" @getTipoCotizante="getTipoCotizante"
                            eventoCampo="getTipoCotizante" :registros="tiposCotizante" nombreItem="des_cot"
                            placeholder="Tipo de cotizante" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Subtipo de cotizante" @getSubTipoCotizante="getSubTipoCotizante"
                            eventoCampo="getSubTipoCotizante" :registros="subTiposCotizante" nombreItem="Des_SubTip"
                            placeholder="Subtipo de cotizante" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Extranjero no pensión?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="extranjero_no_pension" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Reside en el extranjero?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="reside_en_extranjero" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Pago por días</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="pago_por_dias" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Es variable - comisiones?</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="es_variable" type="checkbox" role="switch"
                                id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Plantilla Para Control De Liquidación</h6>
            <div id="seccion">
                <div class="col">
                    <SearchList nombreCampo="Planilla eventual" :registros="municipios" placeholder="Planilla eventual" />
                </div>
            </div>
            <button class="btn btn-success"
                @click="confirmationMessage('Está seguro de guardar la información del formulario?', 'Si', 'Cancelar', 'Información guardada con exito')">Guardar</button>
        </form>
    </div>
</template>
<script>
import SearchList from './SearchList.vue';
import SearchTable from './SearchTable.vue';
export default {

    components: {
        SearchList,
        SearchTable
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            show_table: false,
            datos: [],
            tabla: [],
            endpoint: '',
            URL_API: process.env.VUE_APP_URL_API,
            pais: '',
            paises: [],
            departamento: '',
            departamentos: [],
            ciudad: '',
            municipio: '',
            municipios: [],
            tipoIdentificacion: '',
            tiposIdentificacion: [],
            genero: '',
            generos: [],
            estadoCivil: '',
            estadosCiviles: [],
            sucursalsss: '',
            sucursalesss: [],
            formapago: '',
            formaspago: [],
            banco: '',
            bancos: [],
            tipocontrato: '',
            tiposcontrato: [],
            compania: '',
            companias: [],
            sucursal: '',
            sucursales: [],
            centroCosto: '',
            centrosCostos: [],
            area: '',
            areas: [],
            convenio: '',
            convenios: [],
            camposConvenio: ['cod_conv', 'nom_conv'],
            centroTrabajo: '',
            centrosTrabajo: [],
            camposCentroTrabajo: ['cod_CT', 'descripcion'],
            endpointConvenios: '',
            empleado: '',
            empleados: [],
            camposEmpleado: ['cod_emp', 'nom_emp'],
            endpointEmpleados: 'empleado',
            estadolaboralempleado: '',
            estadoslaboralesempleados: [],
            cuentagastol: '',
            cuentagastosl: [],
            cuentaNIF: '',
            cuentasNIF: [],
            cargo: '',
            cargos: [],
            camposCargos: ['cod_car', 'nom_car'],
            modoliquidacion: '',
            modosliquidacion: [],
            claseSalario: '',
            clasesSalario: [],
            fondoSalud: '',
            fondosSalud: [],
            camposFondoSalud: ['cod_fdo', 'nom_fdo'],
            fondoPension: '',
            fondosPension: [],
            cajaCompensacion: '',
            cajasCompensacion: [],
            riesgoLaboral: '',
            riesgosLaborales: [],
            fondoCesantias: '',
            fondosCesantias: [],
            tipoCotizante: '',
            tiposCotizante: [],
            subTipoCotizante: '',
            subTiposCotizante: [],
            grupoSanguineo: '',
            gruposSanguineos: [],
            factorRH: '',
            factoresRH: [],
            claseLibretaMilitar: '',
            clasesLibretaMilitar: [],
            nacionalidad: '',
            nacionalidades: [],
            regimenSalarial: '',
            regimenesSalariales: [],
            modalidadRetencion: '',
            modalidadesRetencion: [],
            calculoIman: '',
            calculosIman: [],
            vacacion: '',
            vacaciones: [],
            tipoMedidaDian: '',
            tiposMedidaDian: [],
            showModal: true,
            numero_identificacion: '',
            codigo_alterno: '',
            primer_nombre: '',
            segundo_nombre: '',
            primer_apellido: '',
            segundo_apellido: '',
            fecha_nacimiento: '',
            numero_libreta_militar: '',
            distrito_libreta_militar: '',
            estatura: '',
            peso: '',
            direccion: '',
            barrio: '',
            telefono: '',
            celular: '',
            correo: '',
            correo_alternativo: '',
            avisar_emergencia: '',
            manejo_datos: false,
            numero_cuenta: '',
            pago_electronico: '',
            porcentaje_retencion: '',
            salud_anio_anteior: '',
            estabilidad_laboral: false,
            dias_vacaciones: '',
            sabado_habil: false,
            pagar_31: false,
            numero_contrato: '',
            fecha_celebracion: '',
            nota_contrato: '',
            distribucion_centro_costos: false,
            distribucion_centro_costos_nif: false,
            observaciones: '',
            vivienda: '',
            medicina_prepagada: '',
            dependiente: false,
            salario_basico: false,
            lider: false,
            fecha_ingreso: '',
            fecha_finalizacion: '',
            periodo_prueba: '',
            finalizacion_periodo_prueba: '',
            horas_contratadas: '',
            valor_hora: '',
            porcentaje_arl: '',
            extranjero_no_pension: false,
            reside_en_extranjero: false,
            pago_por_dias: false,
            es_variable: false,
            numeroClasificadorConvenio: 1,
            numeroClasificador: 1,
            paisExpedicion: '',
            departamentoExpedicion: '',
            ciudadExpedicion: '',
            paisNacimiento: '',
            departamentoNacimiento: '',
            ciudadNacimiento: '',
            paisResidencia: '',
            departamentoResidencia: '',
            ciudadResidencia: '',
            paisContrato: '',
            departamentoContrato: '',
            ciudadContrato: '',
            paisLabor: '',
            departamentoLabor: '',
            ciudadLabor: '',
            autorizacionModulo: false,
            ruta: ''
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style scoped>
h2 {
    margin: 20px;
}

h6 {
    font-weight: bold
}

#seccion:last-child {
    margin-bottom: 50px;
}

label {
    float: left;
    margin: 20px 0px 5px 0px;
}

/* Select con filtro personalizado */
#contenedor-select {
    position: relative;
}

#select1 {
    z-index: 200;
}

#select2 {
    z-index: 100;
}

#select1,
#select2 {
    padding: 5px;
    border: solid #7c7e7e 0.5px;
    border-radius: 10px;
    text-align: left;
    max-height: 250px;
    width: 97%;
    margin: auto;
    overflow-y: auto;
    position: absolute;
    top: 70px;
    left: 13px;
    background-color: white;
    cursor: pointer;
}

#seccion {
    border: solid #D5DBDB 0.5px;
    padding: 30px;
    border-radius: 10px;
}

.tituloseccion {
    position: relative;
    display: inline-block;
    background-color: white;
    padding: 5px;
    top: 22px;
}

#select1 #lista1,
#select2 #lista2 {
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

#select1 #lista1:hover,
#select2 #lista2:hover {
    background-color: #0d6efd;
    color: white;
}

span {
    height: 38px;
}

/* Fin select con filtro personalizado */

#clasificador {
    width: 100%;
    text-align: left;
    float: left;
}

button {
    margin: 30px;
}
</style>