<template>
    <div id="interventionList">
      <interventionModal :showModal='showModal' @closeModal='showModal=false'></interventionModal>
      <a href="#" @click="displayModal()">Test</a>
      <h1 class="viewTitle">{{title}}</h1>
      <div class="btn btn--addintervention btn--default">
        <i class="fa fa-plus"></i>
        Ajouter un intervention
      </div>
      <div class="actions">
        <v-select class="bulk-action" placeholder="Actions de masse" :options="
        [
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
            <th>id
              <i  @click="displaySearch($event)"
              v-bind:class="[isSearchIdShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="id"></i>
              <input type="search" id="id" v-show="isSearchIdShown" class="search">
            </th>
            <th>Prénom
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchFirstnameShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="firstname"></i>
              <input type="search" id="firstname" v-show="isSearchFirstnameShown" class="search">
            </th>
            <th>Nom
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchNameShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="name"></i>
              <input type="search" id="name" v-show="isSearchNameShown" class="search">
            </th>
            <th>E-mail
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchEmailShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="email"></i>
              <input type="search" id="email" v-show="isSearchEmailShown" class="search">
            </th>
            <th>Phone
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchPhoneShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="phone"></i>
              <input type="search" id="phone" v-show="isSearchPhoneShown" class="search">
            </th>
            <th>Contenu
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchContentShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="content"></i>
              <input type="search" id="content" v-show="isSearchContentShown" class="search">
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            <intervention v-for="intervention in interventionList"
              :id='intervention.id'
              :firstName='intervention.firstName'
              :lastName='intervention.lastName'
              :mail='intervention.mail'
              :phone='intervention.phone'
              :content='intervention.content'
            ></intervention>
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
import Vuex from 'vuex'
import store from './InterventionStore.js'
import Intervention from './Intervention.vue'
import InterventionModal from './InterventionModal.vue'


export default {
  name: 'InterventionList',
  components: {Intervention,InterventionModal},
  methods: {
    displaySearch: function(e){
      let inputName = e.target.dataset.searchtype
      let capitalizedInputName = e.target.dataset.searchtype.charAt(0).toUpperCase() + e.target.dataset.searchtype.slice( 1 )
      console.log(capitalizedInputName);
      this["isSearch" + capitalizedInputName + "Shown"] = !this["isSearch" + capitalizedInputName + "Shown"]
    },
    displayModal: function(){
      this.showModal = !this.showModal
    },
  },
  computed: {
      ...Vuex.mapGetters(['interventionList'])
  },
  data () {
    return {
      showModal: false,
      title: 'Liste des interventions',
      isSearchIdShown: false,
      isSearchFirstnameShown: false,
      isSearchNameShown: false,
      isSearchEmailShown: false,
      isSearchPhoneShown: false,
      isSearchContentShown: false,
    }
  }
}
</script>

<style media="screen">
  .addintervention,.viewTitle{
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
  .btn--addintervention{
    margin-left: 10px;
  }
  .btn--validateBulk{
    margin-left: 10px;
  }
  .addintervention:hover{
    opacity: .6;
  }
  .actions{
    text-align: left;
  }
</style>
