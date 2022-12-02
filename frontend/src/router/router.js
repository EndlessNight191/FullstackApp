import menuPage from "@/pages/menuPage";
import itemPage from "@/pages/itemPage";
import {createWebHistory, createRouter} from "vue-router";

const routes = [
    {
        path: '/',
        component: menuPage
    },
    {
        path: '/item/:id',
        component: itemPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;