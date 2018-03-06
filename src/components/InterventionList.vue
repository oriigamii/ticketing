<template>
    <div id="interventionList">
      <interventionModal
      :showModal='showModal'
      :idInterventionToEdit='idInterventionToEdit'
      :modalType='modalType'
      @closeModal='showModal=false'>
      </interventionModal>
      <div class="interventionHeader">
        <h1 class="viewTitle">{{title}}</h1>
        <div class="btn btn--addintervention btn--default" @click="displayModal('addEdit')">
          <i class="fa fa-plus"></i>
          Ajouter un intervention
        </div>
      </div>
      <div class="interventionListHeader">
        <div class="searchByKeyWord">
          <input @input="searchByKeyWord($event)" type="search" placeholder="Recherche par mot-clé" name="" value="">
        </div>
        <!--
        <div class="searchByKeyWord">
          <input type="search" placeholder="Recherche par mot-clés" v-model="searchByKeyword">
        </div> -->
      </div>
      <table>
        <thead>
          <tr>
            <th class="hideOnMobile">#</th>
            <th @click="sortByColumn($event)" class="columnName" data-column="id" data-type="int">id
              <i  @click="displaySearch($event)"
              v-bind:class="[isSearchIdShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="id"></i>
              <input @input="filterSearch($event.target)" ref="SearchId" type="search" id="id" v-show="isSearchIdShown" class="search">
            </th >
            <th @click="sortByColumn($event)" class="columnName" data-column="firstName" data-type="string">Prénom
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchFirstnameShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="firstname"></i>
              <input @input="filterSearch($event.target)" ref="SearchFirstname" type="search" id="firstName" v-show="isSearchFirstnameShown" class="search">
            </th >
            <th @click="sortByColumn($event)" class="columnName" data-column="lastName" data-type="string">Nom
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchNameShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="name"></i>
              <input @input="filterSearch($event.target)" ref="SearchName" type="search" id="lastName" v-show="isSearchNameShown" class="search">
            </th >
            <th @click="sortByColumn($event)" class="columnName" data-column="mail" data-type="mail">E-mail
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchEmailShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="email"></i>
              <input @input="filterSearch($event.target)" ref="SearchEmail" type="search" id="mail" v-show="isSearchEmailShown" class="search">
            </th>
            <th @click="sortByColumn($event)" class="columnName" data-column="phone" data-type="phone">Phone
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchPhoneShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="phone"></i>
                <input @input="filterSearch($event.target)" ref="SearchPhone" type="search" id="phone" v-show="isSearchPhoneShown" class="search">
            </th >
            <th @click="sortByColumn($event)" class="columnName" data-column="content" data-type="string">Contenu
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchContentShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="content"></i>
              <input @input="filterSearch($event.target)" ref="SearchContent" type="search" id="content" v-show="isSearchContentShown" class="search">
            </th>
            <th @click="sortByColumn($event)" class="columnName" data-column="technicien" data-type="string">Technicien
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchTechnicienShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="content"></i>
              <input @input="filterSearch($event.target)" ref="SearchTechnicien" type="search" id="technicien" v-show="isSearchTechnicienShown" class="search">
            </th>
            <th @click="sortByColumn($event)" class="columnName" data-column="dateTime" data-type="dateTime">Date de publication
              <i @click="displaySearch($event)"
              v-bind:class="[isSearchDateTimeShown ? 'fa-close' : 'fa-search', 'fa']"
              data-searchtype="dateTime"></i>
              <input @input="filterSearch($event.target)" ref="SearchDateTime" type="search" id="dateTime" v-show="isSearchDateTimeShown" class="search">
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
              :technicien='intervention.technicien'
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
            <th>Technicien</th>
            <th>Date de publication</th>
            <th style="min-width:10%;">Actions</th>
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
      for (var col in this.$refs) {
        this.$refs[col].value = '';
        if (col != 'Search'+capitalizedInputName) {
          this["is" + col + "Shown"] = false
        }
      }
      this["isSearch" + capitalizedInputName + "Shown"] = !this["isSearch" + capitalizedInputName + "Shown"]
      if (this["isSearch" + capitalizedInputName + "Shown"] == false) {
        store.commit('INIT_SEARCH_STATE');
      }

    },
    displayModal: function(modalType,idInterventionToEdit){
      this.idInterventionToEdit = idInterventionToEdit
      this.showModal = !this.showModal
      this.modalType = modalType
    },
    sortByColumn: function(e){
      let datatype = e.target.dataset.type
      let columnName = e.target.dataset.column
      this.sortInterventions(columnName)
    },
    ...Vuex.mapActions(['sortInterventions','filterSearch','searchByKeyWord','limitNumberOfInterventions'])
  },
  computed: {
    ...Vuex.mapGetters(['interventionList'])
  },
  watch: {
  }
  ,
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
      isSearchTechnicienShown: false,
      idInterventionToEdit:'',
      searchByKeyword:'',
      sortDirection:'DESC',
      selectedNumberOfIntervention: 10
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
  table{
    min-width: 100%;
  }
  input[type=search]{
    display: block;
    margin: 0 auto;
  }
  .columnName{
    cursor: pointer;
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
  .actions,
  .searchByKeyWord{
    text-align: left;
    display: inline-block;
  }
  .interventionListHeader{
    text-align: center;
  }
  .limitInterventionNb{
    display: inline-block;
    margin-left: 15px;
  }
  .searchByKeyWord input[type=search]{
    height: 35px;
    border-radius: 4px;
    border:1px #BBB solid;
    padding-left: 10px;
  }
  .searchByKeyWord{
    display: inline-block;
    margin-left: 15px;
  }

  @media screen and (max-width: 600px) {
  .hideOnMobile{
    display:none;
  }
  .btn--addintervention{
    margin-left: 0;
  }
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
    margin-bottom: 2.625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0;
    text-align: right;
  }
  table td div{
    display: inline-block;
    width: 80%;
    font-size: 12px;
    vertical-align: top;
  }
  table td .btn{
    display: inline-block;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    font-size: 12px;
    content: attr(data-label);
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    width: 20%;
    text-align: left;
  }
  table td:last-child {
    border-bottom: 0;
  }
  .actions{
    display: none;
  }
  .limitInterventionNb{
    display: block;
    margin: 0 auto;
    margin: 20px 0;
    text-align: center;
  }
  .searchByKeyWord{
    display: block;
    margin: 0 auto;
    margin: 20px 0;
    text-align: center;
  }

}
</style>
