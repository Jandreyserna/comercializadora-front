import axiosInstance from '../axiosInstanceService/axiosInstance';



const state = {
    idTypes: []
  };
  
  const getters = {
    idTypes: state => state.idTypes
  };
  
  const actions = {
    async fetchIdTypes({ commit }) {
      const response = await axiosInstance.get('/get-type-identity/identity-type'); 
      const data = await response.data.message.data;
      commit('setIdTypes', data);
    }
  };
  
  const mutations = {
    setIdTypes(state, idTypes) {
      state.idTypes = idTypes;
    }
  };
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  };