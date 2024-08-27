import { createStore } from 'vuex';
import loadTypeId from './registerService/loadRegister';


const store = createStore({
  modules: {
    loadTypeId
  }
});

export default store;