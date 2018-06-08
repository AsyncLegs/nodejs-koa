import Router from 'koa-router';
import auth from './auth';
import summary from './summaries';

const router = new Router({ prefix: '/api/v1' });

router.use(auth);
router.use(summary);

export default router.routes();
