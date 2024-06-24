import { createApp } from 'vue'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import '/public/styles.css'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Divider from 'primevue/divider';
import Dropdown from "primevue/dropdown";


const app = createApp(App)

app.use(router)
app.use(PrimeVue);
app.component('Button', Button)
app.component('InputText', InputText)
app.component('InputNumber', InputNumber)
app.component('Divider', Divider)
app.component('Dropdown',Dropdown)
app.mount('#app')