<template>
    <div id="interventionList">
      <interventionModal
      :showModal='showModal'
      :idInterventionToEdit='idInterventionToEdit'
      :modalType='modalType'
      @closeModal='showModal=false'>
      </interventionModal>
      <h1 class="viewTitle">{{title}}</h1>
      <div class="btn btn--addintervention btn--default" @click="displayModal('addEdit')">
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
            <th class="hideOnMobile">#</th>
            <th >id
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
            <th>Date de publication
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchDateTimeShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="dateTime"></i>
              <input type="search" id="content" v-show="isSearchDateTimeShown" class="search">
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
              :dateTime='intervention.dateTime'
              @displayModal='displayModal("addEdit",intervention.id)'
              @showInterventionDetail='displayModal("details",intervention.id)'
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
            <th>Date de publication</th>
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
      this["isSearch" + capitalizedInputName + "Shown"] = !this["isSearch" + capitalizedInputName + "Shown"]
    },
    displayModal: function(modalType,idInterventionToEdit){
      this.idInterventionToEdit = idInterventionToEdit
      this.showModal = !this.showModal
      this.modalType = modalType
    },
  },
  computed: {
      ...Vuex.mapGetters(['interventionList'])
  },
  data () {
    return {
      showModal: false,
      modalType: 'addEdit',
      title: 'Liste des interventions',
      isSearchIdShown: false,
      isSearchFirstnameShown: false,
      isSearchNameShown: false,
      isSearchEmailShown: false,
      isSearchPhoneShown: false,
      isSearchDateTimeShown: false,
      isSearchContentShown: false,
      idInterventionToEdit:''
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



  @media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3rem;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 1rem;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
  .actions{
    display: none;
  }
}
</style>
