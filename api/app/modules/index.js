import Router from 'koa-router';
import auth from './auth';
import summary from './summaries';
import users from './users';

const router = new Router({ prefix: '/api/v1' });

router.use(auth);
router.use(summary);
router.use(users);

export default router.routes();
