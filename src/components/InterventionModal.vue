<template>
  <div id="modal-internvention" v-show="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-close" @click="$emit('closeModal')">
              <i class="fa fa-close"></i>
            </div>
            <div class="interventionDetails" v-show="modalType=='details'">
              <div class="modal-header">
                <h1>Demande d'intervention n°{{id}}</h1>
              </div>
              <div class="modal-body">
                <div class="">
                  Prénom : {{firstName}}
                </div>
                <div class="">
                  Nom : {{lastName}}
                </div>
                <div class="">
                  E-mail : {{mail}}
                </div>
                <div class="">
                  Téléphone : {{ phone }}
                </div>
                <div class="">
                  Contenu : {{content}}
                </div>
                <div class="">
                  Technicien : {{technicien}}
                </div>
              </div>
              <div class="modal-footer">
                Demande faite le : {{ dateTime }}
              </div>
            </div>
            <form v-show="modalType=='addEdit'" class="" action="" method="">
              <div class="modal-header">
                <h1>Ajouter une intervention</h1>
                <div id="formErrors">
                    <div v-for="error in errors">{{error}}</div>
                </div>
              </div>
              <div class="modal-body">
                <input type="hidden" v-model="id" name="firstName">
                <input type="hidden" v-model="dateTime" name="firstName">
                <div class="formField">
                  <label class="required" for="firstName">Prénom</label>
                  <input type="text" v-model="firstName" name="firstName">
                </div>
                <div class="formField">
                  <label class="required" for="lastName">Nom de famille</label>
                  <input type="text" v-model="lastName" name="lastName">
                </div>
                <div class="formField">
                  <label class="required" for="mail">E-mail</label>
                  <input type="text" name="mail" v-model="mail" >
                </div>
                <div class="formField">
                  <label class="required" for="phone">Téléphone</label>
                  <input type="phone" name="phone" v-model="phone" >
                </div>
                <div class="formField">
                  <label class="required" for="content">Contenu</label>
                  <textarea name="content" v-model="content" id="content"></textarea>
                </div>
                <div class="formField">
                  <label class="required" for="content">Technicien</label>
                  <textarea name="content" v-model="technicien" id="content"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <div class="btn btn--default" @click="validateFormData()">
                  {{messageButton}}
                </div>
              </div>
          </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import moment from 'moment'
export default {
  name: 'interventionModal',
  methods: {
    validateFormData: function () {
      if (this.firstName !== '' &&
       this.lastName !== '' &&
       this.mail !== '' &&
       this.phone !== '' &&
       this.technicien !== '' &&
       this.content !== '') {
        if (this.id !== '') {
          this.editIntervention({
            'id': this.id,
            'firstName': this.firstName,
            'lastName': this.lastName,
            'mail': this.mail,
            'phone': this.phone,
            'content': this.content,
            'technicien': this.technicien,
            'dateTime': this.dateTime
          })
        } else {
          this.addIntervention({
            'firstName': this.firstName,
            'lastName': this.lastName,
            'mail': this.mail,
            'phone': this.phone,
            'content': this.content,
            'technicien': this.technicien,
            'dateTime': moment().format('Y-MM-dd hh:mm:ss')
          })
        }
        this.$emit('closeModal')
      } else {
        this.errors = []
        this.errors.push('Vous devez remplir tous les champs du formulaire')
      }
    },
    getDefaultData: function () {
      Object.assign(this.$data, {
        id: '',
        dateTime: '',
        firstName: '',
        lastName: '',
        mail: '',
        phone: '',
        content: '',
        technicien: '',
        errors: [],
        messageButton: ''
      })
    },
    ...mapActions(['addIntervention', 'editIntervention', 'interventionById'])
  },
  props: [
    'showModal',
    'idInterventionToEdit',
    'modalType'
  ],
  watch: {
    showModal: function () {
      // Cas d'une création
      if (this.idInterventionToEdit === undefined) {
        this.getDefaultData()
        this.messageButton = 'Ajouter une intervention'
      } else {
        // Cas d'une modfication
        this.messageButton = 'Éditer l\'intervention'
      }
    },
    idInterventionToEdit: function () {
      if (this.idInterventionToEdit !== undefined) {
        var that = this
        let interventionData = this.interventionById(this.idInterventionToEdit)
        interventionData.then(function (interventionObj) {
          that.id = interventionObj[0].id
          that.dateTime = interventionObj[0].dateTime
          that.firstName = interventionObj[0].firstName
          that.lastName = interventionObj[0].lastName
          that.mail = interventionObj[0].mail
          that.phone = interventionObj[0].phone
          that.technicien = interventionObj[0].technicien
          that.content = interventionObj[0].content
        })
      }
    }
  },
  data () {
    return {
      id: '',
      dateTime: '',
      firstName: '',
      lastName: '',
      mail: '',
      phone: '',
      content: '',
      technicien: '',
      errors: [],
      messageButton: ''
    }
  }
}
</script>

<style >
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

#formErrors div{
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    padding: 15px;
    padding-right: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
    border-radius: 4px;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-body{
  text-align: left;
}
.formField input{
  min-height:20px;
}
.formField input,
.formField textarea{
  width: 100%;
  outline: none;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
.formField{
  margin:10px;
}
.formField label{
  display: block;
  margin-bottom: 5px;
}
.required::after{
  content:'*';
  color:red;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-container{
  position: relative;
}
.modal-close{
  border-radius: 100%;
  background-color: #2ae6a3;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right:-12px;
  top:-12px;
  cursor: pointer;
}
.modal-close i{
  color:white;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
