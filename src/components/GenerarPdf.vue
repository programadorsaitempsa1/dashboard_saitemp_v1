<template>
  <div>
    <button type="button" @click="exportPdfMake" class="btn btn-primary btn-sm"><i class="bi bi-filetype-pdf"></i>
      Descargar pdf</button>
  </div>
</template>
<script>
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  props: {
    formulario: {},
    checks: [],
    pasos_procedimiento: [],
    empleados: [],
    items:[]
  },
  data() {
    return {
      variable:
        "SISTEMA INTEGRADO DE GESTIÓN PLANIFICACIÓN, EJECUCIÓN, SEGUIMIENTO Y CONTROL DE LAS ACTIVIDADES EN RIESGO ELÉCTRICO",
      docDefinition: []
    };
  },



  methods: {
    // agregarTareaAsignada(){
    //   let self = this
    //   let posicion = 8
    //   this.checks.forEach(function(item){
    //     self.docDefinition.content[0].table.body.splice(posicion, 0, [{},{},{},{}])
    //     // self.docDefinition.content[0].table.body.splice(posicion, 0,
    //     //         [
    //     //           {
    //     //             text: "Instalar |X|",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //             background: 'yellow'
    //     //           },
    //     //           {
    //     //             text: "Reparar",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Replantear |X|",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //             // background: 'yellow'
    //     //           },
    //     //           {
    //     //             text: "Supervisar",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //         ],
    //     //         [
    //     //           {
    //     //             text: "Normalizar",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Diagnosticar",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Revisar",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Montaje",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //         ],
    //     //         [
    //     //           {
    //     //             text: "Corte",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Desconexiones",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Conexión",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Suspensión",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //         ],
    //     //         [
    //     //           {
    //     //             text: "Reconexión",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: "Otra",

    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {
    //     //             text: [
    //     //               "Cuál?",
    //     //               {
    //     //                 text: this.formulario.otra_tarea,
    //     //                 bold: false,
    //     //               },
    //     //             ],
    //     //             colSpan: 2,
    //     //             fontSize: 9,
    //     //             bold: true,
    //     //           },
    //     //           {},
    //     //         ],
    //     // )
    //   })
    // },
    agregarGeneralidades() {
      let self = this
      let posicion = 4
      if(this.formulario.estado == 'Cancelado'){
      self.docDefinition.content[0].table.body.splice(posicion, 0,
        [
          {
            text: [
              "Fecha de ejecución: ",
              {
                text: this.formulario.fecha_ejecucion,
                bold: false,
              },
            ],

            fontSize: 9,
            bold: true,
          },
          {
            text: [
              "Estado de la orden de trabajo: ",
              {
                text: this.formulario.estado,
                bold: false,
              },
            ],
            fontSize: 9,
            bold: true,
          },
          {
            text: [
              "¿Quién autoriza cancelación?: ",
              {
                text: this.formulario.autoriza_cancelacion,
                bold: false,
              },
            ],
            fontSize: 9,
            colSpan: 2,
            bold: true,
          },
          {
          },
        ],
        [
          {
            text: [
              "Observaciones de cancelación: ",
              {
                text: this.formulario.observacion_cancelacion,
                bold: false,
              },
            ],
            colSpan: 4,
            fontSize: 9,
            bold: true,
          },
          {},
          {},
          {},
        ],
      )
        }
        else{
          self.docDefinition.content[0].table.body.splice(posicion, 0,
          [
          {
            text: [
              "Fecha de ejecución: ",
              {
                text: this.formulario.fecha_ejecucion,
                bold: false,
              },
            ],

            fontSize: 9,
            colSpan:2,
            bold: true,
          },
          {
          },
          {
            text: [
              "Estado de la orden de trabajo: ",
              {
                text: this.formulario.estado,
                bold: false,
              },
            ],
            fontSize: 9,
            colSpan:2,
            bold: true,
          },
          {
          },
        ],
          )
        }
    },
    agregarPasosProcedimiento() {
      let self = this
      let posicion = 17 // Posición en el arbol de nodos donde se van a ingresar los pasos del procedimiento
      // Validación: si se va a imprimir un campo de pasos de procedimiento vacío es eliminado antes de ser imprimido para que no genere error
      this.pasos = this.pasos_procedimiento
      if (this.pasos[this.pasos.length - 1] == '') {
        this.pasos.splice(this.pasos.length - 1, 1)
      }
      // Fin validación
      this.pasos.forEach(function (element, index) {
        if (element != "") {
          self.docDefinition.content[0].table.body.splice(posicion, 0,
            [
              {
                text: [
                  'Paso ' + (index + 1) + ': ',
                  {
                    text: element,
                    bold: false,
                  },
                ],
                border: [true, false, true, true],
                colSpan: 4,
                fontSize: 9,
                bold: true,
              },
              {},
              {},
              {},
            ],
          )
          posicion++
        }
      });
    },
    agregarEmpleado() {
      let self = this
      let posicion = (25 + this.pasos_procedimiento.length) // posición de se van a ingresar los empleados en el arbol de nodos mas la última posición de los pasos
      this.empleados.forEach(function (element) {
        if (element.cedula != "" && element.nombre != "" && element.firma != "")
          self.docDefinition.content[0].table.body.splice(posicion, 0,
            [
              {
                text: element.cedula,
                alignment: "left",
                fontSize: 10,
                bold: false,
                margin: [0, 5],
              },
              {
                text: element.nombre,
                alignment: "left",
                colSpan: 2,
                fontSize: 10,
                bold: false,
                margin: [0, 5],
              },
              {},
              {
                image:
                  element.firma,
                width: 100,
                alignment: "center",
              },
            ],
          )
        ++posicion
      });
    },
    agregarFirmasEncargados() {

      // Validación: para agregar la última posición de los pasos del procedimiento y la última posicion de los empleados en el arbol de nodos sino se agregaron la posición es cero
      if (this.pasos_procedimiento.length >= 0) {
        var posicion1 = this.pasos_procedimiento.length
      } else {
        posicion1 = 0
      }
      if (this.empleados.length >= 0) {
        var posicion2 = this.empleados.length
        if (this.empleados[this.empleados.length - 1].firma != '') {
          posicion2 += 1
        }
      } else {
        posicion2 = 0
      }
      // Fin validación

      //Se suman las posiciones de pasos del procedimiento y empleados mas la posición donde se van a ingresar las firmas de los encargados
      var posicion = (26 + posicion1 + posicion2)
      let sin_firma = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACWCAYAAACB8w1PAAAAAXNSR0IArs4c6QAACYBJREFUeF7t27FtlVEQhNHdJoiJoARSegJBDVh2T6SUABExTVxLjkx+A3/SeQVcjc5OMPqlt+NHgAABAgQIECBAgMCbF9g3n1BAAgQIECBAgAABAgTGcFcCAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBAw3HWAAAECBAgQIECAQEDAcA8cSUQCBAgQIECAAAEChrsOECBAgAABAgQIEAgIGO6BI4lIgAABAgQIECBAwHDXAQIECBAgQIAAAQIBAcM9cCQRCRAgQIAAAQIECBjuOkCAAAECBAgQIEAgIGC4B44kIgECBAgQIECAAAHDXQcIECBAgAABAgQIBAQM98CRRCRAgAABAgQIECBguOsAAQIECBAgQIAAgYCA4R44kogECBAgQIAAAQIEDHcdIECAAAECBAgQIBAQMNwDRxKRAAECBAgQIECAgOGuAwQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gMBFgXPO5939efFJTxEgQIAAAQIEXgQMd0UgcEngnPN7Zj7MzJ/d/XjpWc8QIECAAAECBAx3HSBwS+Cc821mfrx67/vuPtx63zsECBAgQIAAAV/cdYDABYFzzuPMfHn11NPufr3wtCcIECBAgAABAr646wCBWwLnnHcz82tm3s/M35n5tLv/br3vHQIECBAgQICAL+46QOCigD+nXsT0FAECBAgQIPCfgOGuEAQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBAw3HWAAAECBAgQIECAQEDAcA8cSUQCBAgQIECAAAEChrsOECBAgAABAgQIEAgIGO6BI4lIgAABAgQIECBAwHDXAQIECBAgQIAAAQIBAcM9cCQRCRAgQIAAAQIECBjuOkCAAAECBAgQIEAgIGC4B44kIgECBAgQIECAAAHDXQcIECBAgAABAgQIBAQM98CRRCRAgAABAgQIECBguOsAAQIECBAgQIAAgYCA4R44kogECBAgQIAAAQIEDHcdIECAAAECBAgQIBAQMNwDRxKRAAECBAgQIECAgOGuAwQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBB4Bsp/HZfupH3NAAAAAElFTkSuQmCC"
      let firma1 = this.formulario.encargado_firma == '' ? sin_firma : this.formulario.encargado_firma
      let firma2 = this.formulario.gestor_firma == '' ? sin_firma : this.formulario.gestor_firma
      let firma3 = this.formulario.aprobado_firma == '' ? sin_firma : this.formulario.aprobado_firma
      // NOTA: para previsialisar el pdf los campos de firma no puenden estar vacíos, por esto si no viene firma desde el formulario web se anexa una imagen en blanco para cada firma
      this.docDefinition.content[0].table.body.splice(posicion, 0,
        [
          {
            image: firma1,
            width: 100,
            alignment: "center",
            border: [true, false, true, true],
          },
          {
            image: firma2,
            width: 100,
            alignment: "center",
            border: [true, false, true, true],
            colSpan: 2,
            rowSpan: 2

          },
          {

          },
          {
            image: firma3,
            width: 100,
            alignment: "center",
            border: [true, false, true, true],
          },
        ],)
    },
    exportPdfMake() {
      this.docDefinition = {
        pageMargins: [40, 40, 40, 40],
        footer: function (currentPage, pageCount) {
          return [{ text: 'Página ' + currentPage.toString() + ' de ' + pageCount, alignment: 'center' }];
        },
        content: [
          {
            // margin: [0, 0, 0, 10],

            table: {
              widths: ["25%", "25%", "25%", "25%"],
              heights: [20, 20, 20, 20, 20, 20, 20],
              headerRows: 1,
              body: [
                [
                  {
                    image:
                      "data:image/png;base64,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",
                    width: 50,
                    alignment: "center",
                    margin: [0, 10],
                  },
                  {
                    text: this.variable,
                    alignment: "center",
                    colSpan: 2,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 10],
                  },
                  {},
                  {
                    ul: [
                      { text: 'Código: GPR-FT-06', listType: 'none', fontSize: 8, margin: [0, 3], },
                      { text: 'Versión: Original', listType: 'none', fontSize: 8, margin: [0, 3], },
                      { text: 'Fecha: 25/11/2021', listType: 'none', fontSize: 8, margin: [0, 3], },
                    ],

                  },
                ],
                [
                  {
                    text: "Generalidades",
                    alignment: "center",
                    colSpan: 4,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      "Contrato: ",
                      {
                        text: this.formulario.contrato,
                        bold: false,
                      },
                    ],

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Zona: ",
                      {
                        text: this.formulario.zona,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Fecha de emisión: ",
                      {
                        text: this.formulario.fecha_emision,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "N° de descargo: ",
                      {
                        text: this.formulario.n_descargo,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                // [
                //   {
                //     text: [
                //       "Fecha de ejecución: ",
                //       {
                //         text: this.formulario.fecha_ejecucion,
                //         bold: false,
                //       },
                //     ],

                //     fontSize: 9,
                //     bold: true,
                //   },
                //   {
                //     text: [
                //       "Estado de la orden de trabajo: ",
                //       {
                //         text: this.formulario.estado,
                //         bold: false,
                //       },
                //     ],
                //     fontSize: 9,
                //     bold: true,
                //   },
                //   {
                //     text: [
                //       "¿Quién autoriza cancelación?: ",
                //       {
                //         text: this.formulario.autoriza_cancelacion,
                //         bold: false,
                //       },
                //     ],
                //     fontSize: 9,
                //     colSpan:2,
                //     bold: true,
                //   },
                //   {
                //   },
                // ],
                // [
                //   {
                //     text: [
                //       "Observaciones de cancelación: ",
                //       {
                //         text: this.formulario.observacion_cancelacion,
                //         bold: false,
                //       },
                //     ],
                //     colSpan: 4,
                //     fontSize: 9,
                //     bold: true,
                //   },
                //   {},
                //   {},
                //   {},
                // ],
                [
                  {
                    text: "Caracteristicas del trabajo",
                    alignment: "center",
                    colSpan: 4,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      "Prioridad del trabajo: ",
                      {
                        text: this.formulario.prioridad,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                    colSpan: 2,
                  },
                  {},
                  {
                    text: [
                      "Hora Incio: ",
                      {
                        text: this.formulario.hora_inicio,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Hora Fin: ",
                      {
                        text: this.formulario.hora_fin,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: [
                      "Tiempo Programado: ",
                      {
                        text: this.formulario.tiempo_programado,
                        bold: false,
                      },
                    ],
                    rowSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "N° de Colaboradores Programados: ",
                      {
                        text: this.formulario.n_colaboradores,
                        bold: false,
                      },
                    ],
                    rowSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: "Nivel de Tensión",
                    alignment: "center",
                    colSpan: 2,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {

                  },
                ],
                [
                  {
                  },
                  {
                  },
                  {
                    text: [
                      "Baja Tensión ≥ 25 V ≤ 1 KV: ",
                      {
                        text: this.formulario.baja_tension,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Media Tensión ˃ 1 KV ≤ 11,4 KV: ",
                      {
                        text: this.formulario.alta_tension,
                        bold: false,
                      },
                    ],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: "Tarea asignada",
                    alignment: "center",
                    colSpan: 4,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: this.checks[0].checked ? 'Instalar  |X|' : 'Instalar',

                    fontSize: 9,
                    bold: true,
                    // background: 'yellow'
                  },
                  {
                    text: this.checks[1].checked ? 'Reparar  |X|' : 'Reparar',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[2].checked  ? 'Replantear  |X|' : 'Replantear',

                    fontSize: 9,
                    bold: true,
                    // background: 'yellow'
                  },
                  {
                    text: this.checks[3].checked ? 'Supervisar  |X|' : 'Supervisar',

                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: this.checks[4].checked ? 'Normalizar  |X|' : 'Normalizar',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[5].checked ? 'Diagnosticar  |X|' : 'Diagnosticar',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[6].checked ? 'Revisar  |X|' : 'Revisar',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[7].checked ? 'Montaje  |X|' : 'Montaje',

                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: this.checks[8].checked ? 'Corte  |X|' : 'Corte',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[9].checked ? 'Desconexiones  |X|' : 'Desconexiones',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[10].checked ? 'Conexión  |X|' : 'Conexión',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[11].checked ? 'Suspensión  |X|' : 'Suspensión',

                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: this.checks[12].checked ? 'Reconexión  |X|' : 'Reconexión',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: this.checks[13].checked ? 'Otra  |X|' : 'Otra',

                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Cuál?",
                      {
                        text: this.formulario.otra_tarea,
                        bold: false,
                      },
                    ],
                    colSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                ],
                [
                  {
                    text: [
                      "Identifica e interpreta planos/diagramas:",
                      {
                        text: this.formulario.interpreta_planos,
                        bold: false,
                      },
                    ],
                    colSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {
                    text: [
                      "Trabajos en redes:",
                      {
                        text: this.formulario.trabajo_en_redes,
                        bold: false,
                      },
                    ],
                    colSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                ],
                [
                  {
                    text: [
                      "Descripción de la Orden de Trabajo: ",
                      {
                        text: this.formulario.descripcion_ot,
                        bold: false,
                      },
                    ],
                    colSpan: 4,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      "Planos: ",
                    ],
                    colSpan: 4,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    image: this.formulario.planos != '' ? this.formulario.planos : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAACWCAYAAACB8w1PAAAAAXNSR0IArs4c6QAACYBJREFUeF7t27FtlVEQhNHdJoiJoARSegJBDVh2T6SUABExTVxLjkx+A3/SeQVcjc5OMPqlt+NHgAABAgQIECBAgMCbF9g3n1BAAgQIECBAgAABAgTGcFcCAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBAw3HWAAAECBAgQIECAQEDAcA8cSUQCBAgQIECAAAEChrsOECBAgAABAgQIEAgIGO6BI4lIgAABAgQIECBAwHDXAQIECBAgQIAAAQIBAcM9cCQRCRAgQIAAAQIECBjuOkCAAAECBAgQIEAgIGC4B44kIgECBAgQIECAAAHDXQcIECBAgAABAgQIBAQM98CRRCRAgAABAgQIECBguOsAAQIECBAgQIAAgYCA4R44kogECBAgQIAAAQIEDHcdIECAAAECBAgQIBAQMNwDRxKRAAECBAgQIECAgOGuAwQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gMBFgXPO5939efFJTxEgQIAAAQIEXgQMd0UgcEngnPN7Zj7MzJ/d/XjpWc8QIECAAAECBAx3HSBwS+Cc821mfrx67/vuPtx63zsECBAgQIAAAV/cdYDABYFzzuPMfHn11NPufr3wtCcIECBAgAABAr646wCBWwLnnHcz82tm3s/M35n5tLv/br3vHQIECBAgQICAL+46QOCigD+nXsT0FAECBAgQIPCfgOGuEAQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBAw3HWAAAECBAgQIECAQEDAcA8cSUQCBAgQIECAAAEChrsOECBAgAABAgQIEAgIGO6BI4lIgAABAgQIECBAwHDXAQIECBAgQIAAAQIBAcM9cCQRCRAgQIAAAQIECBjuOkCAAAECBAgQIEAgIGC4B44kIgECBAgQIECAAAHDXQcIECBAgAABAgQIBAQM98CRRCRAgAABAgQIECBguOsAAQIECBAgQIAAgYCA4R44kogECBAgQIAAAQIEDHcdIECAAAECBAgQIBAQMNwDRxKRAAECBAgQIECAgOGuAwQIECBAgAABAgQCAoZ74EgiEiBAgAABAgQIEDDcdYAAAQIECBAgQIBAQMBwDxxJRAIECBAgQIAAAQKGuw4QIECAAAECBAgQCAgY7oEjiUiAAAECBAgQIEDAcNcBAgQIECBAgAABAgEBwz1wJBEJECBAgAABAgQIGO46QIAAAQIECBAgQCAgYLgHjiQiAQIECBAgQIAAAcNdBwgQIECAAAECBAgEBAz3wJFEJECAAAECBAgQIGC46wABAgQIECBAgACBgIDhHjiSiAQIECBAgAABAgQMdx0gQIAAAQIECBAgEBAw3ANHEpEAAQIECBAgQICA4a4DBAgQIECAAAECBAIChnvgSCISIECAAAECBAgQMNx1gAABAgQIECBAgEBAwHAPHElEAgQIECBAgAABAoa7DhAgQIAAAQIECBAICBjugSOJSIAAAQIECBAgQMBw1wECBAgQIECAAAECAQHDPXAkEQkQIECAAAECBAgY7jpAgAABAgQIECBAICBguAeOJCIBAgQIECBAgAABw10HCBAgQIAAAQIECAQEDPfAkUQkQIAAAQIECBAgYLjrAAECBAgQIECAAIGAgOEeOJKIBAgQIECAAAECBAx3HSBAgAABAgQIECAQEDDcA0cSkQABAgQIECBAgIDhrgMECBAgQIAAAQIEAgKGe+BIIhIgQIAAAQIECBB4Bsp/HZfupH3NAAAAAElFTkSuQmCC",
                    width: 300,
                    alignment: "center",
                    colSpan: 4
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      "Descripción del Procedimiento (paso a paso): ",

                    ],
                    border: [true, true, true, false],
                    colSpan: 4,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Medidas de seguridad",
                    alignment: "center",
                    colSpan: 4,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: [
                      "Solicitud de suspensión:\n",
                      {
                        text: this.items[0].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Solicitud de consignación:\n",
                      {
                        text: this.items[1].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "ATS:\n",
                      {
                        text: this.items[2].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Uso de EPP y EPCC:\n",
                      {
                        text: this.items[3].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: [
                      "Revisión de Estado de Herramienta:\n",
                      {
                        text: this.items[4].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Permiso de Trabajo en Alturas:\n",
                      {
                        text: this.items[5].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Lista de Chequeo de Postes:\n",
                      {
                        text: this.items[6].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Preoperacional de Riesgo Eléctrico:\n",
                      {
                        text: this.items[7].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: [
                      "Distancias de seguridad:\n",
                      {
                        text: this.items[8].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "5 reglas de oro:\n",
                      {
                        text: this.items[9].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Permiso de Trabajo - Espacios Confinados:\n",
                      {
                        text: this.items[10].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Lista de Verificación y Plan para Izaje:\n",
                      {
                        text: this.items[11].opcion,
                        bold: true,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                ],
                [
                  {
                    text: [
                      "Otra, cuál?: ",
                      {
                        text: this.formulario.otra_tarea2,
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    colSpan: 4,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "Grupo de trabajo",
                    alignment: "center",
                    colSpan: 4,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {},
                  {},
                ],
                [
                  {
                    text: "N° de Cédula",
                    alignment: "center",

                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {
                    text: "Nombre",
                    alignment: "center",
                    colSpan: 2,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {
                    text: "Firma",
                    alignment: "center",
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                ],
                [
                  {
                    text: "ENCARGADO DEL TRABAJO",
                    alignment: "center",
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {
                    text: "GESTOR SST",
                    alignment: "center",
                    colSpan: 2,
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                  {},
                  {
                    text: "APROBADO POR",
                    alignment: "center",
                    fontSize: 10,
                    bold: true,
                    style: "header",
                    margin: [0, 5],
                    heights: [5],
                  },
                ],
                [
                  {
                    text: [
                      "Nombre: ",
                      {
                        text: this.formulario.encargado_nombre,
                        bold: false,
                      },

                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Nombre: ",
                      {
                        text: this.formulario.gestor_nombre,
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    colSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {
                    text: [
                      "Nombre: ",
                      {
                        text: this.formulario.aprobado_nombre,
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  }
                ],
                [
                  {
                    text: [
                      "Firma: ",
                    ],
                    border: [true, true, true, false],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "Firma: ",
                    ],
                    border: [true, true, true, false],
                    colSpan: 2,
                    fontSize: 9,
                    bold: true,
                  },
                  {},
                  {
                    text: [
                      "Firma: ",
                    ],
                    border: [true, true, true, false],
                    fontSize: 9,
                    bold: true,
                  }
                ],
                [
                  {
                    text: [
                      "Cargo: ",
                      {
                        text: this.formulario.encargado_cargo,
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  },
                  {
                    text: [
                      "",
                      {
                        text: "",
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    colSpan: 2,
                    bold: false,
                  },
                  {},
                  {
                    text: [
                      "Cargo: ",
                      {
                        text: this.formulario.aprobador_cargo,
                        bold: false,
                      },
                    ],
                    border: [true, true, true, true],
                    fontSize: 9,
                    bold: true,
                  }
                ],
              ],
            },
          },
        ],

      };
      // this.agregarTareaAsignada()
      this.agregarGeneralidades()
      this.agregarPasosProcedimiento() // agrega pasos de procedimiento de manera dinámica al pdf
      this.agregarEmpleado() // agrega empleados de manera dinámica al pdf
      this.agregarFirmasEncargados() // agrega las firmas al pie del documento de forma dinámica para validar si vienen vacías
      // console.log(this.docDefinition.content[0].table.body) //descomentar para ver el array completo del pdf con sus respectivas posiciones
      pdfMake.createPdf(this.docDefinition).open();
    },
  },
};
</script>
<style scoped>

</style>