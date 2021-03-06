import config from 'config';
import dotenv from 'dotenv';
import envs from './constants/envs';
import env, { IS_TEST} from './utils/env';

if (!IS_TEST) {
    dotenv.config();
}

if (!envs[env]) {
    throw Error(`unknown env: ${env}`);
}
const PORT = process.env.PORT || config.get('port');
const MONGO_URI = process.env.MONGO_URI || config.get('mongo.uri');
const JWT_SECRET = process.env.JWT_SECRET || config.get('jwt.secret');

const SEARCH_MAX_RESULT_PER_PAGE = config.get('search.max_results_per_page');
const SEARCH_DEFAULT_PAGE = config.get('search.default_page_number');

if (! JWT_SECRET) {
    throw Error('JWT secret key should be provided!');
}
export {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    SEARCH_MAX_RESULT_PER_PAGE,
    SEARCH_DEFAULT_PAGE,
};
