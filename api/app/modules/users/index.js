import Router from 'koa-router';
import auth from '../../handlers/auth';
import UsersController from './controllers/users-controller';
import { User } from './models';

const router = new Router({ prefix: '/users' });

router
    .get('/:userHash/summaries', auth(), UsersController.getSummariesByUser);
export {
    User,
};
export default router.routes();
