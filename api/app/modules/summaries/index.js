import Router from 'koa-router';
import summariesController from './controllers/summaries-controller';
import auth from '../../handlers/auth';
import checkSummary from './handlers/checkSummary';
import { Summary } from './models';

const router = new Router({ prefix: '/summaries' });

router
    .post('/', auth(), summariesController.create)
    .put('/:hash', auth(), summariesController.update)
    .delete('/:hash', auth(), summariesController.delete)
    .get('/:hash', summariesController.getSummary)
    .param('hash', checkSummary);

    export {
    Summary,
};

export default router.routes();

