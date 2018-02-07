<template>
    <div id="taskList">
      <h1>{{title}}</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Contenu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            <task v-for="task in taskList"
              :id='task.id'
              :firstName='task.firstName'
              :lastName='task.lastName'
              :mail='task.mail'
              :phone='task.phone'
              :content='task.content'
            ></task>
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>Contenu</th>
            <th>Actions</th>
          </tr>
        </tfoot>
      </table>
    </div>
</template>

<script>
import Task from './Task.vue'
import json from '../data/fakeData.json'

export default {
  name: 'TaskList',
  components: {Task},
  data () {
    return {
      title: 'Liste des tâches',
      taskList: json
    }
  }
}
</script>
