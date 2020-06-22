import Login from '../components/Login';
import Game from '../components/Home.vue';
import More from '../components/More.vue';
import Register from '../components/Register';

export default [
    {
        path: '/game',
        component: Game
    },
    {
        path: '/',
        component: Login
    },
    {
        path: '/more',
        component: More
    },
    {
        path: '/register',
        component: Register
    },
];
