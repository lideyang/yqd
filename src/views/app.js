import Vue from 'vue'
import App from './app.vue'
import store from '@/store/index'
import router from '@/router'
import VTooltip from 'v-tooltip'
import { Notify } from '@components/amaze/components/notify'
import { Modal, ModalBody } from "@components/amaze/components/modal"
import { Button } from "@components/amaze/components/button"
import { Checkbox } from "@components/amaze/components/checkbox"
Vue.component(Button.name, Button);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Modal.name, Modal);
Vue.component(ModalBody.name, ModalBody);
Vue.use(Notify);
Vue.use(VTooltip);
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
