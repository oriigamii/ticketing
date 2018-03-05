import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import interventionListData from '../data/fakeData.json'
let store = new Vuex.Store({
  mutations:{
    ADD_INTERVENTION: (state, intervention) => {
      state.interventionList.push(intervention);
    },
    EDIT_INTERVENTION: (state, params) => {
      state.interventionList.filter(el => {
        if (el.id === params.id) {
          for(let paramName in params){
            el[paramName] = params[paramName]
          }
        }
      });
    },
    REMOVE_INTERVENTION: (state, id) => {
      state.interventionList = state.interventionList.filter(el => {return el.id !== id});
    },
    INITIALISE_STORE(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				)
			}else{
          localStorage.setItem('interventionList', JSON.stringify(interventionListData));
          console.log(localStorage.getItem('interventionList'));
          state.interventionList = JSON.parse(localStorage.getItem('interventionList'))
      }
		}
  },
  getters:{
    interventionList: (state) => { return state.interventionList},
  },
  actions:{
    interventionById: (store,id) => {
        return store.state.interventionList.filter( el => {
          if (el.id == id) {
            return el;
          }
        }
      )
    },
    addIntervention: (store,intervention) =>{
      intervention.id = store.state.interventionList.length + 1
      store.commit('ADD_INTERVENTION',intervention);
    },
    removeIntervention: (store,id) =>{
      store.commit('REMOVE_INTERVENTION',id);
    },
    editIntervention: (store, params) =>{
      store.commit('EDIT_INTERVENTION',params);
    }
  },
  state:{
    interventionList:{}
  },
  strict: true
})

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
})

global.store = store;

export default store
