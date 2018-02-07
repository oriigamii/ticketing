<template>
    <div id="taskList">
      <h1 class="viewTitle">{{title}}</h1>
      <div class="btn btn--addTask btn--default">
        <i class="fa fa-plus"></i>
        Ajouter un tâche
      </div>
      <div class="actions">
        <v-select class="bulk-action" :options="
        [
          {label: 'Selectionnez une action à effetcuer', value: ''},
          {label: 'Supprimer', value: 'delete'}
        ]
        "></v-select>
        <div class="btn btn--validateBulk btn--default">
          Valider
        </div>
      </div>
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

<style media="screen">
  .addTask,.viewTitle{
    display: inline-block;
    vertical-align: middle;
    height:100%;
  }
  .btn{
    border-radius: 5px;
    display: inline-block;
    font-weight: bolder;
    cursor: pointer;
    -webkit-transition: .4s opacity;
    -o-transition: .4s opacity;
    transition: .4s opacity;
  }
  .btn:hover{
    opacity: .7;
  }
  .btn--default{
    padding: 8px 10px;
    background-color: #2ae6a3;
    color:#ffffff;
  }

  .bulk-action{
    display: inline-block;
    max-width: 250px;
  }
  .btn--addTask{
    margin-left: 10px;
  }
  .btn--validateBulk{
    margin-left: 10px;
  }
  .addTask:hover{
    opacity: .6;
  }
  .actions{
    text-align: left;
  }
</style>
