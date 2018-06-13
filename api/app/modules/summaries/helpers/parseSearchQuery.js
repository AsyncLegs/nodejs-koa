import { SEARCH_MAX_RESULT_PER_PAGE, SEARCH_DEFAULT_PAGE } from '../../../config';

export default (queryParams) => {
    const filter = {
        title: queryParams.title ? queryParams.title : '',
        tags: queryParams.tags ? queryParams.tags.split(',') : [],
        size: parseInt(queryParams.size),
        page: parseInt(queryParams.page),
    };

    if (!filter.size || filter.size > SEARCH_MAX_RESULT_PER_PAGE) {
        filter.size = SEARCH_MAX_RESULT_PER_PAGE;
    }
    if (!filter.page) {
        filter.page = SEARCH_DEFAULT_PAGE;
    }

    return filter;
};
