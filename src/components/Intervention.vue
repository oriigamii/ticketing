<template>
    <tr id="intervention">
      <td class="hideOnMobile"><input data-id='id' type="checkbox"></td>
      <td data-label="id"><div>{{id}}</div></td>
      <td data-label="Prénom" contenteditable="true" @input="editInterventionContent(id,'firstName',$event)"><div>{{firstName}}</div></td>
      <td data-label="Nom" contenteditable="true" @input="editInterventionContent(id,'lastName',$event)"><div>{{lastName}}</div></td>
      <td data-label="E-mail" contenteditable="true" @input="editInterventionContent(id,'mail',$event)"><div>{{mail}}</div></td>
      <td data-label="Phone" contenteditable="true" @input="editInterventionContent(id,'phone',$event)"><div>{{phone}}</div></td>
      <td data-label="Contenu" contenteditable="true" @input="editInterventionContent(id,'content',$event)"><div>{{content}}</div></td>
      <td data-label="Date de publication" contenteditable="true" @input="editInterventionContent(id,'dateTime',$event)"><div>{{dateTime}}</div></td>
      <td data-label="Actions">
        <div>
          <i class="fa fa-check" @click="$emit('markInterventionAsResolved')"></i>
          <i class="fa fa-eye" @click="$emit('showInterventionDetail')"></i>
          <i class="fa fa-edit" @click="$emit('displayModal',id)"></i>
          <i class="fa fa-close" @click="removeIntervention(id)"></i>
        </div>
      </td>
    </tr>
</template>

<script>
import Vuex from 'vuex'
import store from './InterventionStore.js'
export default {
  name: 'intervention',
  props:[
    'id',
    'firstName',
    'lastName',
    'mail',
    'phone',
    'content',
    'dateTime'
  ],
  methods:{
    editInterventionContent: function(id,key,e){
      this.editInterventionInContent({'id':id,'key':key,'content':e.target.textContent})
    },
    ...Vuex.mapActions(['removeIntervention','editInterventionInContent'])
  },
  data () {
    return {

    }
  }
}
</script>
<style media="screen">
  .fa{
    cursor: pointer;
  }
</style>
