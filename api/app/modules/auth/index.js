import Router from 'koa-router';
import authController from '././controllers/auth-controller';
import auth from '../../handlers/auth';

const router = new Router({ prefix: '/auth'});

router
    .post('/signup', authController.signUp)
    .post('/signin', authController.signIn)
    .get('/current-user', auth(), authController.currentUser);
export default router.routes();
