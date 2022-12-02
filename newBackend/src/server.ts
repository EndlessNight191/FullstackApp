import App from '@/app';
import IndexRoute from '@routes/index.route';
import ItemsRoute from '@routes/items.route';
import CategoryRouter from '@routes/category.router';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ItemsRoute(), new CategoryRouter()]);

app.listen();
