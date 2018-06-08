import Router from 'koa-router';
import authController from '././controllers/auth-controller';
import auth from '../../handlers/auth';

const router = new Router({ prefix: '/auth'});

router
    .post('/signup', authController.signUp)
    .post('/signin', authController.signIn)
    .post('/private', auth(), (ctx) => {
        ctx.body = ctx.user;
    });
export default router.routes();
