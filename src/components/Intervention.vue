<template>
    <tr id="intervention">
      <td><input data-id='id' type="checkbox"></td>
      <td>{{id}}</td>
      <td contenteditable="true" @input="editInterventionContent(id,$event)">{{firstName}}</td>
      <td contenteditable="true" @input="editInterventionContent(id,$event)">{{lastName}}</td>
      <td contenteditable="true" @input="editInterventionContent(id,$event)">{{mail}}</td>
      <td contenteditable="true" @input="editInterventionContent(id,$event)">{{phone}}</td>
      <td contenteditable="true" @input="editInterventionContent(id,$event)">{{content}}</td>
      <td>
        <div class="btn btn-info">
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
    'content'
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
