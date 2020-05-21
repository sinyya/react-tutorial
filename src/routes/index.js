/**
 * 라우터
 *
 */
import Home from '../components/templates/home/Home';
import About from '../components/templates/about/About';
import Page404 from "../components/templates/page404/Page404";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '*',
        component: Page404
    }
];

export default routes;