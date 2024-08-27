import axiosInstance from '../axiosInstanceService/axiosInstance';



const state = {
    idTypes: []
  };
  
  const getters = {
    idTypes: state => state.idTypes
  };
  
  const actions = {
    async fetchIdTypes({ commit }) {
      const response = await axiosInstance.get(process.env.VUE_APP_API_BASE_URL.concat('/get-type-identity/identity-type')); 
      const data = await response.data;
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