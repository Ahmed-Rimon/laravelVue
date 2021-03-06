/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import {
    Form,
    HasError,
    AlertError
} from 'vform';


//import Gate.js
import Gate from "./Gate";

Vue.prototype.$gate = new Gate(window.user);



window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
// import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
});

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

window.Toast = Toast;


const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
});

window.swalWithBootstrapButtons = swalWithBootstrapButtons;




// CommonJS
// const Swal = require('sweetalert2');

let routes = [{
        path: '/dashboard',
        component: require('./components/dashboard.vue').default
    },
    {
        path: '/profile',
        component: require('./components/profile.vue').default
    },
    {
        path: '/developer',
        component: require('./components/developer.vue').default
    },
    {
        path: '/category',
        component: require('./components/category.vue').default
    },
    {
        path: '/user',
        component: require('./components/user.vue').default
    },

    {
        path: '*',
        component: require('./components/404Page.vue').default
    }

]

const router = new VueRouter({
    mode: "history",
    routes // short for `routes: routes`

});


//Change the text to upper case and format the date
Vue.filter('AllText', function(text) {
    // return text.toUpperCase();
    return text.toUpperCase()
});
Vue.filter('upText', function(text) {
    // return text.toUpperCase();
    return text.charAt(0).toUpperCase() + text.slice(1)
});
Vue.filter('myDate', function(created) {
    return moment(created).format('MMMM Do YYYY');
});


window.Fire = new Vue();
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

Vue.component(
    'not-found',
    require('./components/404Page.vue').default
);


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

//LAravel vue pagination component
Vue.component('pagination', require('laravel-vue-pagination'));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data: {
        search: ''
    },
    methods: {
        searchit: _.debounce(() => {
            Fire.$emit('searching');
        }, 1000),
        printInvoice() {
            window.print();
        }

    }
});