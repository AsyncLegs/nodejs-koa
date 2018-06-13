import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import error from './error';
import jwt from './jwt';
import helmet from 'koa-helmet';
import { IS_DEV, IS_PROD } from '../utils/env';

export default (app) => {
    if (IS_DEV) {
        app.use(logger());
    }

    if (IS_PROD) {
        app.use(helmet());
    }
    app.use(error());
    app.use(bodyParser());
    app.use(jwt());
};
