<template>
    <iframe width="100%" height="300px" ref="reportViewer" :src="reportUrl"></iframe>
  </template>
  
  <script>
  export default {
    props: ['reportPath', 'reportServerUrl'],
  
    computed: {
      reportUrl() {
        return `${this.reportServerUrl}?%2f${this.reportPath}&rs:Embed=true`;
      }
    }
  }
  </script>
  