<template>
    <div class="container">
        <div class="row">
            <div class="col-2">
                <img style="width: 80%;" src="@/assets/logo1.png" alt="">
            </div>
            <div class="col-8">
                <h5>SAGRILAFT</h5>
                <h5>Sistema de Autocontrol y Gestión del Riesgo Integral de Lavado de Activos y Financiación del Terrorismo
                    FORMATO ÚNICO DE VINCULACIÓN DE CONTRAPARTES</h5>
            </div>
            <div class="col-2">
                <p>FEGC-01-02</p>
                <p>3-01-2023</p>
                <p>Version 4</p>
            </div>
        </div>

        <form>
            <h6 class="tituloseccion">1.1.1 ?</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Operación: *" @getOperacion="getOperacion" eventoCampo="getOperacion"
                            nombreItem="des_tip" :registros="operaciones" placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Contratacion directa:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="variables[0].contratacion_directa" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Tipo de servicio
                            Atraccion y seleccion de talento:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="variables[0].atraccion_seleccion" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Tipo de persona: *" @getTipoPersona="getTipoPersona"
                            eventoCampo="getTipoPersona" nombreItem="des_tip" :registros="tiposPersona"
                            placeholder="Seleccione una opción" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación: *" @getTipoIdentificacion="getTipoIdentificacion"
                            eventoCampo="getTipoIdentificacion" nombreItem="des_tip" :registros="tiposIdentificacion"
                            placeholder="Tipo de identificación" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de
                            identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Fecha de expedición: *</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].fecha_expedicion" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">NIT: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].nit" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Digito de verificación:
                            *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].digito_verificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Razon social: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].razon_social" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Detalle de la Actividad
                            Económica Principal: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].actividad_principal" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Fecha de constitución: *
                        </label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].fecha_constitucion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Código CIIU: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].codigo_ciiu" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Estrato: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].estrato" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Dirección de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].direccion_empresa" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Pais: *" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais nacimiento" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Pais" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Departamento: *" nombreItem="nom_dep" :registros="departamentos"
                            ubicacion="departamento nacimiento" @getMunicipios="getMunicipios" placeholder="Departamento" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Ciudad: *" nombreItem="nom_ciu" :registros="municipios"
                            @getMunicipios="getMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Contacto de la empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].contacto_empresa" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Correo electrónico: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].correo_electronico" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Teléfono empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono_empresa" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label class="form-label">Número celular: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_celular" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Número de matricula: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_matricula" />
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
                        <label class="form-label">Otra ¿Cuál?:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].otra_cual" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">AIU negociado: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].aiu_negocio" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Plazo pago (días): *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].plazo_pago" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Vendedor: *" nombreItem="nom_ciu" :registros="municipios"
                            @setMunicipios="setMunicipios" ubicacion="ciudad nacimiento" placeholder="Ciudad" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Observaciones a acuerdos
                            comerciales:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].observaciones" />
                    </div>
                    <div class="col mb-3">
                        <label class="form-label">Cuantos empleados conforman la
                            empresa: *
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].empleados_empresa" />
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
                    <div class="row">
                        <div class="col-3">
                            <label for="exampleInputEmail1" class="form-label">Riesgo de la empresa: *:</label>
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="variables[0].riesgo_empresa" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Nombre del cargo: *</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Requisito:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Examen:</label>
                        </div>
                        <div class="col">
                            <label for="exampleInputEmail1" class="form-label">Riesgo del cargo*:</label>
                        </div>
                    </div>
                    <div class="row" id="contenedor-select" style="margin-bottom: 20px;" v-for="item in 4" :key="item">
                        <div class="col-3">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="variables[0].riesgo_empresa" />
                        </div>
                        <ListaMultiple :elementoslist="requisitosList" :elementos="requisitos" :hover="hover"/>
                        <ListaMultiple :elementoslist="examenesList" :elementos="examenes" :hover="hover"/>
                        <div class="col-3">
                            <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                                aria-describedby="emailHelp" v-model="variables[0].riesgo_empresa" />
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Carga de archivos</h6>
            <div id="seccion">
                <div class="row upload">
                    <div class="col">
                        <p>Camara de comercio (Archivo PDF, expedición menor 30 días): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row upload">
                    <div class="col">
                        <p>RUT (Archivo PDF, Actualizado): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row upload">
                    <div class="col">
                        <p>Cedula (Archivo PDF, Actualizado): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row upload">
                    <div class="col">
                        <p>ARL (Archivo PDF, Actualizado): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row upload">
                    <div class="col">
                        <p>Certificado bancario (Archivo PDF, Actualizado): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
                <div class="row upload">
                    <div class="col">
                        <p>Certificado comercial (Archivo PDF, Actualizado): *</p>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04"
                                aria-describedby="inputGroupFileAddon04" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Quitar
                                archivo</button>
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">Información general</h6>
            <div id="seccion">
                <div class="row">
                    <h5>Información Social</h5>
                    <p style="padding: 30px; margin-bottom: 60px;text-align: justify;">Socios o Accionistas
                        Diligencie la información de los accionistas, socios o asociados con una participación igual o
                        superior al 5%. En el evento en que los accionistas, socios o asociados sean personas jurídicas,
                        anexar la composición patrimonial de dichas personas jurídicas. Anexar listado en caso de ser
                        necesario.</p>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación:" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais residencia" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccionar" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Identificación: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].identificacion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Socio/Accionista: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].socio_accionista" />
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Porcentaje Participación (%):</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].porcentaje_participacion" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.3. Representante legal</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Representante(s) Legal(es): *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].representante_legal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais residencia" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Departamento expedición</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].departamento_expedicion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Ciudad de expedicion" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais residencia" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">correo electrónico</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].correro_electrónico" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Representante(s) Legal(es): *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].representante_legal" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais residencia" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Departamento expedición</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].departamento_expedicion" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Ciudad expedición" @getPaises="getPaises" eventoCampo="getPaises"
                            nombreItem="nom_pai" ubicacion="pais residencia" :registros="paises"
                            @getDepartamentos="getDepartamentos" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">correo electrónico</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].correo_electronico" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.4. Miembros Junta Directiva</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">La empresa cuenta con Junta
                            directiva:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="variables[0].estabilidad_laboral" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.5. Calidad tributaria</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Responsable de Impuestos a las Ventas: *" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="¿Es Gran Contribuyente?:" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="¿Es Auto-Retenedor?" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="¿Exento de Impuesto a la Renta?" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo para factura electrónica: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].exento_renta" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Sucursal para facturación: *" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de resolución:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_resolucion1" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de resolución:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_resolucion2" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de resolución:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_resolucion3" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].fecha1" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].fecha2" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Fecha:</label>
                        <input type="date" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].fecha3" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.6. Datos del contador</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre completo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].nombre_completo" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de Identificación" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Identificación:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].identificacion" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.6.1 Datos de tesorería</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre completo:
                        </label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].nombre_completo" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].correo" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.7. Datos Financieros (Ultimo periodo contable)</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Ingreso Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].ingreso_mensual" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Costos y Gastos Mensual: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].costos_gastos" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Activos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].activos" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otros Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].otros_ingresos" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Detalle de otros ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].detalle_otros_ingresos" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Pasivos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].pasivos" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Total Ingresos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].total_ingresos" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Reintegro de costos y gastos: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].reintegro_costos" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Patrimonio: *</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].patrimonio" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.8. Operaciones Internacionales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Realiza operaciones en moneda extranjera: *" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Que operaciones?: *" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">1.9. Referencias Bancarias</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Banco" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_cuenta" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de cuenta" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Sucursal:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].sucursal" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].contacto" />
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col">
                        <SearchList nombreCampo="Banco" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Número de cuenta:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].numero_cuenta" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Tipo de cuenta" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                </div>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Sucursal:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].sucursal" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].contacto" />
                    </div>
                </div>

            </div>
            <h6 class="tituloseccion">1.10. Referencias Comerciales</h6>
            <div id="seccion">
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre o Razón Social:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].nombre" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].contacto" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nombre o Razón Social:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].nombre" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Contacto:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].contacto" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Teléfono:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].telefono" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">2. DECLARACIONES Y AUTORIZACIONES</h6>
            <div id="seccion">
                <div class="row">
                    <p>Cumplo con alguno de los siguientes atributos o tengo un vínculo familiar (cónyuge o
                        compañero
                        permanente, padres, abuelos, hijos, nietos, cuñados, adoptantes o adoptivos) con una persona
                        que:</p>
                    <ul>
                        <li>
                            <p>Este expuesta políticamente según la legislación nacional</p>
                        </li>
                        <li>
                            <p>Tenga la representación legal de un organismo internacional</p>
                        </li>
                        <li>
                            <p>Goce de reconocimiento público generalizado</p>
                        </li>
                        <li>
                            <p>En afirmativo indique que le aplica y diligencie la siguiente información</p>
                        </li>
                    </ul>
                    <div class="col-6">
                        <SearchList nombreCampo="Tipo de cuenta" :registros="municipios" placeholder="Seleccionar" />
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">2.2. Declaración de Origen de Fondos</h6>
            <div id="seccion">
                <div class="row">
                    <p>Quien suscribe la presente solicitud obrando en nombre propio y/o en representación legal de la
                        persona jurídica que represento, de manera voluntaria y dando certeza de que todo lo aquí consignado
                        es cierto, veraz y verificable, realizo la siguiente declaración de fuente de bienes y/o fondos, con
                        el propósito de dar cumplimiento a lo señalado al respecto a las normas legales vigentes y
                        concordantes.</p>
                    <ul>
                        <li>
                            <p>A. Declaro que yo y/o la persona jurídica que represento es beneficiaria efectiva de los
                                recursos y son compatibles con mis actividades y situación patrimonial.</p>
                        </li>
                        <li>
                            <p>B. Que los recursos que se entreguen de mi parte en desarrollo de cualquiera de las
                                relaciones contractuales que tenga con los destinatarios de la presente declaración,
                                provienen de mi patrimonio y/o de la sociedad que represento y no de terceros, y se derivan
                                de las siguientes fuentes: (detalle de la actividad o negocio del que provienen los
                                recursos)</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList nombreCampo="Selecciones una opción" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col mb-3">
                        <label for="exampleInputEmail1" class="form-label">Otra ¿Cuál?:</label>
                        <input type="text" class="form-control" autocomplete="off" id="exampleInputEmail1"
                            aria-describedby="emailHelp" v-model="variables[0].otra_cual" />
                    </div>
                    <ul>
                        <li>
                            <p>C. Declaro que los recursos no provienen de ninguna actividad ilícita de las contempladas en
                                el Código Penal Colombiano o en cualquier norma que lo modifique o adicione.</p>
                        </li>
                        <li>
                            <p>D. No se admitirá que terceros efectúen depósitos a mis cuentas y/o de la Entidad que
                                represento con fondos provenientes de las actividades ilícitas contempladas en el Código
                                penal Colombiano o en cualquier norma que lo modifique, sustituya o adicione, ni se
                                efectuarán transacciones destinadas a tales actividades o a favor de personas relacionadas
                                con las mismas</p>
                        </li>
                        <li>
                            <p>E. Los recursos que recibo de mis contrapartes principalmente los capto por (seleccione
                                máximo 2)</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList nombreCampo="Selecciones una opción" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <div class="col">
                        <SearchList nombreCampo="Selecciones una opción" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <ul>
                        <li>
                            <p>F. Las operaciones que realizo por mi actividad implican un alto manejo de efectivo</p>
                        </li>
                    </ul>
                    <div class="col">
                        <SearchList nombreCampo="Selecciones una opción" :registros="municipios"
                            placeholder="Seleccionar" />
                    </div>
                    <p>En nombre propio y/o de mi representado, declaro que no estoy impedido para realizar cualquier tipo
                        de operación y que conozco y acepto las normas que regulan el comercio colombiano y me obligo a
                        cumplirlas. Conozco y acepto los riesgos que puedan presentarse frente a las instrucciones y órdenes
                        que imparta, derivados de la utilización de los medios y canales de distribución de productos y
                        servicios, tales como Internet, correos electrónicos u otros mecanismos similares, mensajería
                        instantánea, teléfono, fax, medios digitales entre otros.
                        Autorizo a realizar los traslados de recursos y/o valores, previo cumplimiento de los procedimientos
                        establecidos por la entidad; así mismo, autorizo la realización de transferencias bancarias y
                        conozco los riesgos de su utilización.
                        Conozco y acepto las políticas establecidas para todos los productos ofrecidos, incluyendo los
                        servicios de Internet. Bajo la gravedad de juramento manifiesto que todos los datos acá consignados,
                        incluidos los números de identificación tributaria, son ciertos, que la información que adjunto es
                        veraz, fidedigna, completa y verificable y autorizo su verificación ante cualquier persona natural o
                        jurídica, pública o privada, sin limitación alguna, desde ahora y mientras subsista alguna relación
                        comercial y que toda declaración falsa o inexacta podrá ser sancionada, por las autoridades de
                        conformidad con la legislación aplicable.
                        Me comprometo a actualizar la información y documentación de acuerdo con la solicitud que se me
                        haga, a proporcionar toda la información adicional y de apoyo que sea necesaria y requerida, por lo
                        menos cada año y cada vez que se presenten modificaciones respecto de cualquiera de mis datos, esto
                        con el fin de dar cumplimiento a la normatividad vigente para el efecto, y por tanto, autorizo,
                        entre otras, a reportar la información fiscal, a verificar la autenticidad de mis firmas y de mis
                        ordenantes y/o a validar los poderes y facultades de mis representantes. A su vez declaro que
                        asumiré la responsabilidad civil, administrativa y/o penal derivada de cualquier información
                        errónea, falsa o inexacta que llegaré a suministrar o que dejare de suministrar oportunamente.
                        De igual forma, declaro que resarciré a La empresa por cualquier multa, perdida o daño que pudiera
                        llegar a sufrir como consecuencia de la inexactitud o falsedad de dicha información
                        Autorizo a La empresa a suministrar la información contenida ente documento, al igual que sus
                        anexos, a las autoridades administrativas y gubernamentales correspondientes, incluidas las
                        autoridades de mi país de residencia o de nacionalidad, de conformidad con la regulación vigente,
                        entre ellos, los Convenios Internacionales firmados por Colombia.
                        Manifiesto que yo y/o la empresa que represento y sus empleados conocen bien las normas referentes a
                        la prevención del Lavado de Activos y Financiación del Terrorismo, todos aportamos con el fin de no
                        ser cómplices de la violación de las normas de esta ley. Igualmente, que no he pertenecido ni
                        pertenezco a ningún tipo de grupos ilegales al margen de la Ley, no les he auxiliado o colaborado en
                        el desarrollo de sus actividades ilícitas, como tampoco he realizado actividades de lavados de
                        activos en Colombia o fuera de ella y que los bienes que conforman mi patrimonio han sido adquiridos
                        por vías legales en desarrollo de mi profesión o actividad.
                        De la misma manera, declaro que no tengo vínculos de parentesco con personas que estén o hayan
                        estado incluidas en listas públicas como sospechosos de Lavado de Activos/Financiación de terrorismo
                        o las empresas de las cuales sean accionistas, o que desarrollen o hayan desarrollado, apoyado o
                        financiado cualquiera de las actividades descritas en el párrafo precedente.
                        Todos los datos aquí consignados y los documentos anexos a él, son ciertos, la información que
                        adjunto es veraz y verificable, y autorizo su verificación ante cualquier persona natural o
                        jurídica, privada o pública, sin limitación alguna, desde ahora y mientras subsista alguna relación
                        comercial con cualquiera de las entidades que pertenezcan a SAITEMP S.A. o con quien represente sus
                        derechos, y me comprometo a actualizar la información y/o documentación al menos una vez cada 2 años
                        o cada vez que se me indique. Así mismo, autorizo a SAITEMP S.A., o a quien represente sus derechos,
                        en forma permanente e irrevocable, para que con fines estadísticos y de información financiera o
                        comercial, consulte, informe, reporte, procese o divulgue, a las entidades de consulta de bases de
                        datos o Centrales de Información y Riesgo, todo lo referente a mi comportamiento como cliente en
                        general.</p>
                </div>
            </div>
            <h6 class="tituloseccion">2.3. Declaración de transparencia y ética para operaciones internacionales</h6>
            <div id="seccion">
                <div class="row">
                    <p>Quien suscribe la presente solicitud obrando en nombre propio y/o en representación legal de la
                        persona jurídica que represento, de manera voluntaria y dando certeza de que todo lo aquí consignado
                        es cierto, veraz y verificable, realizo la siguiente declaración con el propósito de dar
                        cumplimiento a lo señalado al respecto a las normas legales vigentes y concordantes en cuanto a
                        corrupción, la transparencia, ética y la moralidad pública:</p>
                    <ul>
                        <li>
                            <p>A. Hemos cumplido y cumplimos actualmente con todas las leyes y regulaciones que a nivel
                                nacional, provincial, municipal se han dictado sobre anticorrupción comprometiéndonos a
                                cumplir las mismas y las que se dicten sobre la materia en el futuro.</p>
                        </li>
                        <li>
                            <p>B. Disponemos de sistemas contables u otras herramientas que permiten identificar las
                                erogaciones por conceptos de tal manera que los pagos hechos para regalos, contribuciones a
                                partidos políticos, funcionarios públicos, donaciones a entidades caritativas, gastos de
                                representación y por hospitalidad, pueden ser identificados, dado que están debidamente
                                segregados y sus respaldos documentales están disponibles.</p>
                        </li>
                        <li>
                            <p>C. Cada parte libera a la otra de cualquier obligación al respecto (incluido el pago de
                                cualquier indemnización) en caso de que una de las partes tuviera que rescindir la
                                vinculación comercial que las uniera con motivo de haber, la otra parte, incumplido leyes y
                                regulaciones vigentes y aplicables a las partes en materia de anticorrupción y/o por
                                sospecha fundamentada de haber participado en acciones corruptas.</p>
                        </li>
                    </ul>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Aceptación de la clausula:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="variables[0].estabilidad_laboral" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>
            <h6 class="tituloseccion">2.4. Autorización de Tratamiento de Datos Personales</h6>
            <div id="seccion">
                <div class="row">
                    <p>La Sociedad SAITEMP S.A., en cumplimiento de lo definido por la Ley 1581 de 2012, el decreto
                        reglamentario 1377 de 2013 y nuestra política de protección de datos personales, le informan que los
                        datos personales que usted suministre en cualquiera de nuestros establecimientos en desarrollo de
                        cualquier operación comercial, serán tratados mediante el uso y mantenimiento de medidas de
                        seguridad técnicas, físicas y administrativas a fin de impedir que terceros no autorizados accedan a
                        los mismos, lo anterior de conformidad con lo establecido en la ley.
                        El responsable del tratamiento de sus datos personales es SAITEMP S.A. sociedad legalmente existente
                        de acuerdo con la leyes Colombianas, domiciliado en la ciudad de MEDELLÍN, en la CALLE 51 # 49-11
                        PISO 10, quien recogerá dichos datos a través de sus diferentes canales y serán usados para a)
                        Ofrecer o informarle productos b) Para hacerle llegar información publicitaria sobre promociones c)
                        Atender o formalizar cualquier solicitud relacionada con nuestro objeto social e) Controles
                        estadísticos sobre proveedores, clientes f) Establecer rotación de los empleados.
                        Usted podrá ejercer los derechos que la ley prevé, siguiendo los procedimientos establecidos en
                        nuestras políticas y procedimientos de Protección de datos Personales publicados en la página web de
                        la empresa, http://www.saitempsa.com, o solicitando la información que requiera a través de nuestro
                        correo misdatos@saitempsa.com o llamando al teléfono: (4) 4485744
                        Tenga en cuenta que el ejercicio de sus derechos no es requisito previo ni impide el ejercicio de
                        otros derechos y que cualquier modificación al presente aviso le será avisado a través de nuestra
                        página Web.
                        Leído lo anterior, autorizo de manera previa, explicita e inequívoca a la sociedad SAITEMP S.A.,
                        para el tratamiento de los datos personales suministrados por mi persona para las finalidades aquí
                        establecidas. Declaro que soy el titular de la información reportada en este formato para autorizar
                        el tratamiento de datos personales y que la he suministrado de forma voluntaria y es completa,
                        veraz, exacta y verídica.</p>
                    <div class="col">
                        <label class="form-check-label" for="flexSwitchCheckChecked">Aceptación de la clausula:</label>
                        <div class="col form-check form-switch" style="clear: both;">
                            <input class="form-check-input" v-model="variables[0].acepta_clausula" type="checkbox"
                                role="switch" id="flexSwitchCheckChecked">
                        </div>
                    </div>
                </div>
            </div>

            <button class="btn btn-success"
                @click="confirmationMessage('Está seguro de guardar la información del formulario?', 'Si', 'Cancelar', 'Información guardada con exito')">Guardar</button>
        </form>
    </div>
</template>
<script>
import SearchList from './SearchList.vue';
import ListaMultiple from './ListaMultiple.vue';
export default {

    components: {
        SearchList,
        ListaMultiple,
    },
    mixins: [],
    props: {

    },
    data() {
        return {
            variables: [{}],
            hover1: false,
            hover2: false,
            hover3: false,
            hover4: false,
            hover5: false,
            hover6: false,
            requisitos: [],
            tiposPersona: [],
            tiposIdentificacion: [],
            // paises: [],
            // departamentos: [],
            municipios: [],
            requisitosList: [{ id: 1, nombre: "Manipulacion de alimentos", descripcion: "null" },
            { id: 2, nombre: "Curso de alturas", descripcion: "null" },
            { id: 2, nombre: "Licencias de conducción", descripcion: "null" },
            { id: 2, nombre: "Cursos confinados", descripcion: "null" },
            { id: 2, nombre: "No aplica", descripcion: "null" },
            ],
            examenFilter: [],
            // operaciones: [],

            // ****************
            cargos: [{}],
            operaciones: [],
            operacion: '',
            contratacion_directa: false,
            atraccion_seleccion: false,
            tipos_persona: [],
            tipo_persona: '',
            tipos_identificacion: [],
            tipo_identificacion: '',
            numero_identificacion: '',
            fecha_expedicion: '',
            nit: '',
            digito_verificacion: '',
            razon_social: '',
            actividad_economica_personal: '',
            fecha_constitucion: '',
            codigo_ciiu: '',
            estrato: '',
            direccion_empresa: '',
            paises: [],
            pais: '',
            departamentos: [],
            departamento: '',
            ciudades: [],
            ciudad: '',
            contacto_empresa: '',
            correo_electronico_empresa: '',
            telefono_empresa: '',
            numero_celular: '',
            numero_matricula: '',
            departamento_matricula: '',
            ciudad_matricula: '',
            sin_animo_lucro: '',
            sociedad_comercial: '',
            otra: '',
            aiu_negociado: '',
            plazo_pago: '',
            vendedor: '',
            observaciones_acuerdos_comerciales: '',
            empleados_forman_empresa: '',
            jornada_laboral: '',
            rotacion_personal: '',
            hover:false,
            examenesList:[
            { id: 1, nombre: "Exmamen médico ocupacional con énfasis en osteomuscular y clasificación", descripcion: "null" },
            { id: 2, nombre: "Exmamen médico ocupacional con énfasis en osteomuscular, enfermedades de la piel", descripcion: "null" },
            { id: 2, nombre: "Visiometría", descripcion: "null" },
            { id: 2, nombre: "Optometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            { id: 2, nombre: "Espirometría", descripcion: "null" },
            ],
            examenes:[]


        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        swict() {
            setTimeout(() => {
                this.hover2 = false
            }, "0,1");
        },
        // algo() {
        //     console.log('esto es una prueba')
        // },
        getOperacion() {

        },
        getTipoPersona() {

        },
        getTipoIdentificacion() {

        },
        getPaises() {

        },
        getDepartamentos() {

        },
        setMunicipios() {

        },
        getMunicipios() {

        },
        filterResults(value, array, nombrearray) {
            const search = array.filter(item => item.nombre.toLowerCase().match(value.toLowerCase()));
            if (nombrearray == 'departamentos') {
                this.requisitosFilter = search
            } else {
                this.examenFilter = search
            }
        },
    }
};
</script>
<style scoped>
.row:first-child {
    margin-top: 30px;
}

.row .col h5 {
    margin-top: 30px;
}

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

span {
    height: 38px;
}

/* Fin select con filtro personalizado */

#clasificador {
    width: 100%;
    text-align: left;
    float: left;
}

.upload {
    margin-bottom: 20px;
}

p {
    text-align: justify;
}

#contenedor-select .col{
    padding: 10px;
    margin: 10px;
}

</style>