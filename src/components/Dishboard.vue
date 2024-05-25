<template>
    <div class="dishboard">
      <h1>{{ msg }}</h1>
      <h2>Dishboard</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dishboard',
    data () {
      return {
        msg: 'This is a dishboard'
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  