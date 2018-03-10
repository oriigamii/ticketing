import Vue from 'vue'
import Vuex from 'vuex'
import interventionListData from '../data/fakeData.json'
Vue.use(Vuex)

let store = new Vuex.Store({
  mutations: {
    SEARCH_INTERVENTION_BY_KEYWORD: (state, input) => {
      store.state.searchInterventionList = []
      let alreadyFound = false
      if (input.target.value !== '' && typeof input.target.value !== undefined) {
        for (var i = 0; i < store.state.interventionList.length; i++) {
          for (var intervention in store.state.interventionList[i]) {
            if (store.state.interventionList[i][intervention].toString().indexOf(input.target.value) !== -1 && alreadyFound === false) {
              alreadyFound = true
              store.state.searchInterventionList.push(store.state.interventionList[i])
            }
          }
          alreadyFound = false
        }
      }
    },
    INIT_SEARCH_STATE: (state) => {
      store.state.searchInterventionList = store.state.interventionList
    },
    FILTER_INTERVENTION: (state, input) => {
      let filteredSearch = store.state.interventionList.filter(function (el) {
        if (el[input.id].toString().indexOf(input.value) !== -1) {
          return el
        }
      })
      store.state.searchInterventionList = filteredSearch.length === 0 ? true : filteredSearch
    },
    SORT_INTERVENTION: (state, columnName) => {
      if (columnName === store.state.currentSortedColumn) {
        store.state.sortDirection = !store.state.sortDirection
      } else {
        store.state.currentSortedColumn = columnName
        store.state.sortDirection = 1
      }
      var sortBy = function (property, order) {
        return function (a, b) {
          if (a[property] === parseInt(a[property], 10) && b[property] === parseInt(b[property], 10)) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
          } else {
            result = (a[property].toLowerCase() < b[property].toLowerCase()) ? -1 : (a[property].toLowerCase() > b[property].toLowerCase()) ? 1 : 0
          }
          return result * (store.state.sortDirection ? 1 : -1)
        }
      }
      store.state.searchInterventionList.sort(sortBy(columnName))
    },
    ADD_INTERVENTION: (state, intervention) => {
      state.interventionList.push(intervention)
      state.searchInterventionList = state.interventionList
    },
    EDIT_INTERVENTION: (state, params) => {
      state.interventionList.filter(el => {
        if (el.id === params.id) {
          for (let paramName in params) {
            el[paramName] = params[paramName]
          }
        }
      })
      state.searchInterventionList = state.interventionList
    },
    EDIT_INTERVENTION_IN_CONTENT: (state, params) => {
      state.interventionList.filter(el => {
        if (el.id === params.id) {
          el[params.key] = params.content
        }
      })
    },
    REMOVE_INTERVENTION: (state, id) => {
      state.interventionList = state.interventionList.filter(el => { return el.id !== id })
      state.searchInterventionList = state.interventionList
    },
    INITIALISE_STORE (state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
      // Replace the state object with the stored item
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      } else {
        localStorage.setItem('interventionList', JSON.stringify(interventionListData))
        state.interventionList = JSON.parse(localStorage.getItem('interventionList'))
      }
    }
  },
  getters: {
    interventionList: (state) => {
      if (state.searchInterventionList === '') {
        store.commit('INIT_SEARCH_STATE')
      }
      return state.searchInterventionList
    }
  },
  actions: {
    limitNumberOfInterventions: (store, numberOfInterventions) => {
      console.log(numberOfInterventions)
    },
    searchByKeyWord: (store, input) => {
      store.commit('SEARCH_INTERVENTION_BY_KEYWORD', input)
    },
    filterSearch: (store, input) => {
      store.commit('FILTER_INTERVENTION', input)
    },
    interventionById: (store, id) => {
      return store.state.interventionList.filter(el => {
        if (el.id === id) {
          return el
        }
      })
    },
    sortInterventions: (store, columnName) => {
      store.commit('SORT_INTERVENTION', columnName)
    },
    addIntervention: (store, intervention) => {
      intervention.id = store.state.interventionList.length + 2
      store.commit('ADD_INTERVENTION', intervention)
    },
    removeIntervention: (store, id) => {
      store.commit('REMOVE_INTERVENTION', id)
    },
    editIntervention: (store, params) => {
      store.commit('EDIT_INTERVENTION', params)
    },
    editInterventionInContent: (store, params) => {
      store.commit('EDIT_INTERVENTION_IN_CONTENT', params)
    }
  },
  state: {
    interventionList: {},
    searchInterventionList: '',
    currentSortedColumn: '',
    sortDirection: 1
  },
  strict: true
})
store.subscribe((mutation, state) => {
  if (mutation.type === 'ADD_INTERVENTION' ||
    mutation.type === 'REMOVE_INTERVENTION' ||
    mutation.type === 'EDIT_INTERVENTION' ||
    mutation.type === 'EDIT_INTERVENTION_IN_CONTENT'
    ) {
    localStorage.setItem('store', JSON.stringify(state))
    store.commit('INIT_SEARCH_STATE')
  }
})
global.store = store
export default store
