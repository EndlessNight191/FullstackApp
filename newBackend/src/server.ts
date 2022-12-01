import App from '@/app';
import IndexRoute from '@routes/index.route';
import ItemsRoute from '@routes/items.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ItemsRoute()]);

app.listen();
