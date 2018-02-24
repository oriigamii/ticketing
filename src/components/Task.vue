<template>
    <tr id="task">
      <td><input data-id='id' type="checkbox"></td>
      <td>{{id}}</td>
      <td contenteditable="true" @input="editTaskContent(id,$event)">{{firstName}}</td>
      <td contenteditable="true" @input="editTaskContent(id,$event)">{{lastName}}</td>
      <td contenteditable="true" @input="editTaskContent(id,$event)">{{mail}}</td>
      <td contenteditable="true" @input="editTaskContent(id,$event)">{{phone}}</td>
      <td contenteditable="true" @input="editTaskContent(id,$event)">{{content}}</td>
      <td>
        <div class="btn btn-info">
          <i class="fa fa-edit"></i>
        </div>
        <div class="btn btn-danger">
          <i class="fa fa-times"></i>
        </div>
      </td>
    </tr>
</template>

<script>
export default {
  name: 'Task',
  props:[
    'id',
    'firstName',
    'lastName',
    'mail',
    'phone',
    'content'
  ],
  methods:{
    editTaskContent: function(id,e){
      console.log(e.target.textContent);
    }
  },
  data () {
    return {

    }
  }
}
</script>
