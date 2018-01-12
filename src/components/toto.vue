<template>
  <div class="toto">
    <h1>{{List}}</h1>
    {{List}}
    <input type="text" id="addUser"></input>
    <button type="submit">Envoyer</button>
  </div>
</template>

<script>
export default {
  name: 'toto',
  data () {
    return {
      Names: [
        'Jil',
        'Tom',
        'Alex'
      ],
      List: document.createElement('UL')
    }
  }
}
document.body.appendChild(List)
for (var i = 0; i < Names.length; i++) {
  console.log(i)
  let item = document.createElement('li')
  item.appendChild(document.createTextNode(Names[i]))
  List.appendChild(i)
}

function createItem(name){
  let item = document.createElement('li')
  item.appendChild(document.createTextNode(name))
  return item
}

document.querySelector('#addUser').onclick = function() {
  alert('new added')
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
