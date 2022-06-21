import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* add icons to the library */
library.add(fas);

import "bootstrap/dist/css/bootstrap.min.css"
import './assets/css/styles.css' 

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(createPinia())
    .mount('#app')
