<template>
    <tr id="task">
      <td><input :data-id='id' type="checkbox"></td>
      <td>{{id}}</td>
      <td>{{firstName}}</td>
      <td>{{lastName}}</td>
      <td>{{mail}}</td>
      <td>{{phone}}</td>
      <td>{{content}}</td>
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
  data () {
    return {

    }
  }
}
</script>

<style media="screen">

  .btn{
    border-radius: 2px;
    padding: 4px;
    display: inline-block;
    transition: .4s opacity;
  }

  .btn:hover{
    opacity: .6;
    cursor: pointer;
  }

</style>
