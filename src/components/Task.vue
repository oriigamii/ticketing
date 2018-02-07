<template>
    <tr id="task">
      <td><input :data-id='id' type="checkbox"></td>
      <td>{{id}}</td>
      <td contenteditable="true" @input="test(id)">{{firstName}}</td>
      <td contenteditable="true" @input="test(id)">{{lastName}}</td>
      <td contenteditable="true" @input="test(id)">{{mail}}</td>
      <td contenteditable="true" @input="test(id)">{{phone}}</td>
      <td contenteditable="true" @input="test(id)">{{content}}</td>
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
    editContent: function(id){
      
    }
  },
  data () {
    return {

    }
  }
}
</script>
