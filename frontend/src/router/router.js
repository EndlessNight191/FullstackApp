import MenuPage from '@/pages/menuPage';
import ItemPage from '@/pages/itemPage';
import {createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        component: MenuPage
    },
    {
        path: '/item/:id',
        component: ItemPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;