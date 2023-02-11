import { createWebHistory, createRouter } from "vue-router";
import AirlinesList from "@/components/AirlinesList.vue";
import LoginPage from "@/components/LoginPage.vue";
import EditAirline from "@/components/EditAirline.vue";
import AddAirline from "@/components/AddAirline.vue";
import EditFlight from "@/components/EditFlight.vue";
import AddFlight from "@/components/AddFlight.vue"
import PilotsList from "@/components/PilotsList.vue";
import EditPilot from "@/components/EditPilot.vue";
import AddPilot from "@/components/AddPilot.vue";


const routes = [
    {
        path: "/",
        name: "login",
        component: LoginPage,
    },

    {
        path: "/view",
        name: "view",
        component: AirlinesList,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                window.confirm("Login credentials are invalid! Please try again.")
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/add",
        name: "add",
        component: AddAirline,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/edit/:id",
        name: "edit",
        component: EditAirline,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/airlines/:id/flights/:flightNo",
        name: "flight",
        component: EditFlight,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/airlines/:id/flights",
        name: "addFlight",
        component: AddFlight,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/pilots",
        name: "pilots",
        component: PilotsList,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/pilot/edit/:id",
        name: "pilot/edit",
        component: EditPilot,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

    {
        path: "/addPilot",
        name: "/addPilot",
        component: AddPilot,
        beforeEnter(to, from, next) {
            if (localStorage.getItem('isAuthenticated') === 'true' && localStorage.getItem('jwt') !== 'undefined') {
                next();
            } else {
                next({ name: 'login' });
            }
        },
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
