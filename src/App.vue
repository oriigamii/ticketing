<template>
  <div id="app">
    <flash-message class="myCustomClass"></flash-message>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.hidden{
  display:none;
}
[contenteditable="true"]:active,
[contenteditable="true"]:focus{
border:none;
outline:none;
}

.hideOnMobile{
  display:none;
}

</style>
