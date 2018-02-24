import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import taskListData from '../data/fakeData.json'
if (localStorage.getItem('taskList') == "null") {
  localStorage.setItem('taskList', JSON.stringify(taskListData));
}

let store = new Vuex.Store({
  mutations:{
    ADD_TASK: (state, task) => {
      state.taskList.push(task);
    },
    EDIT_TASK: (state, params) => {
      state.taskList.filter(el => {
        if (el.id === params.id) {
          el[params.contentType] = params.content
        }
      });

    },
    REMOVE_TASK: (state, id) => {
      state.taskList = state.taskList.filter(el => {return el.id !== id});
    },
    INITIALISE_STORE(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}else{
          Object.assign(state, JSON.parse(localStorage.getItem('taskList')))
      }
		}
  },
  getters:{
    taskList: (state) => state.taskList
  },
  actions:{
    addTask: (store,task) =>{
      store.commit('ADD_TASK',task);
    },
    removeTask: (store,id) =>{
      store.commit('REMOVE_TASK',id);
    },
    editTask: (store, params) =>{
      store.commit('EDIT_TASK',params);
    }
  },
  strict: true
})

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});


global.store = store;

export default store
