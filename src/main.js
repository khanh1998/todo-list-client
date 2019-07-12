import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';

import { 
  faUserSecret, 
  faBars, 
  faClipboardList, 
  faPlus,
  faBackspace,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
library.add(faUserSecret, faBars, faClipboardList, faPlus, faBackspace, faTrash);
 
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app');
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })