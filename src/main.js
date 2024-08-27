import { createApp } from 'vue';
import App from './app.vue'
import store from './services/store'
/* import '@fortawesome/fontawesome-free/css/all.css'; */
import router from './routes/router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { BootstrapVueNext } from 'bootstrap-vue-next';


/* import './app.scss' */



const app = createApp(App);

app.use(store);
app.use(router);
app.use(BootstrapVueNext);


app.mount('#app');