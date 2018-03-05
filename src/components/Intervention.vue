<template>
    <tr id="intervention">
      <td class="hideOnMobile"><input data-id='id' type="checkbox"></td>
      <td data-label="id">{{id}}</td>
      <td data-label="Prénom" contenteditable="true" @input="editInterventionContent(id,$event)">{{firstName}}</td>
      <td data-label="Nom" contenteditable="true" @input="editInterventionContent(id,$event)">{{lastName}}</td>
      <td data-label="E-mail" contenteditable="true" @input="editInterventionContent(id,$event)">{{mail}}</td>
      <td data-label="Phone" contenteditable="true" @input="editInterventionContent(id,$event)">{{phone}}</td>
      <td data-label="Contenu" contenteditable="true" @input="editInterventionContent(id,$event)">{{content}}</td>
      <td data-label="Date de publication" contenteditable="true" @input="editInterventionContent(id,$event)">{{dateTime}}</td>
      <td data-label="Actions">
        <div class="btn btn-info" @click="$emit('markInterventionAsResolved')">
          <i class="fa fa-check"></i>
        </div>
        <div class="btn btn-info" @click="$emit('showInterventionDetail')">
          <i class="fa fa-eye"></i>
        </div>
        <div class="btn btn-info" @click="$emit('displayModal',id)">
          <i class="fa fa-edit"></i>
        </div>
        <div class="btn btn-danger">
          <i class="fa fa-close" @click="removeIntervention(id)"></i>
        </div>
      </td>
    </tr>
</template>

<script>
import Vuex from 'vuex'
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
    editInterventionContent: function(id,e){
      console.log(e.target.textContent);
    },
    ...Vuex.mapActions(['removeIntervention'])
  },
  data () {
    return {

    }
  }
}
</script>
