<template>
  <div id="app">
    <header>
      <div class="header__title">Takatoukités <small>- Système de gestion des interventions</small></div>
    </header>
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
html,body{
  width: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.hidden{
  display:none;
}
[contenteditable="true"]:active,
[contenteditable="true"]:focus{
border:none;
outline:none;
}

header{
  width: 100%;
  background-color: #2ae6a3;
  margin-bottom: 20px;
  padding: 5px;
  padding-left: 30px;
  line-height: 50px;
  text-align: left;
  box-sizing: border-box;
}
.header__title{
  color:#FFFFFF;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: bold;
}

@media screen and (max-width:600px) {
	header{
    text-align: center;
    padding-left: 5px;
  }
  .header__title{
    font-size: 3vw;
  }
}
</style>
