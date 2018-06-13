import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';
import { SEARCH_MAX_RESULT_PER_PAGE } from './../../../config';
import AppError from '../../../helpers/appError';
export default {
    async create(ctx) {
        const summaryData = {
            ...pick(ctx.request.body, Summary.createFields),
            userHash: ctx.state.user.hash,
        };
        try {
            const summary = await SummaryService.createSummary(summaryData);
            ctx.status = 201;
            ctx.body = { data: summary };
        } catch (e) {
            throw new AppError({ status: 400, ...e});
        }
    },
    async update(ctx) {
        const {
            request: {
                body,
            },
            state: {
                user: {
                    hash: userHash,
                },
                summary,
            },

        } = ctx;

        try {
            const updateSummary = await SummaryService.updateSummary({ summary, userHash, body });
            ctx.body = {data: updateSummary};
        } catch (e) {
            throw new AppError({ status: 400, ...e});
        }
    },

    async delete(ctx) {
        const {
            state: {
                user: {
                    hash: userHash,
                },
                summary,
            },
        } = ctx;
        try {
            const deleteSummary = await SummaryService.deleteSummary(summary, userHash);
            ctx.body = {data: deleteSummary.hash};
        } catch (e) {
            throw new AppError({ status: 400, ...e});
        }
    },

    async getSummary(ctx) {
        const { state: { summary } } = ctx;

        ctx.body = {data: pick(summary, Summary.createFields) };
    },

    async search(ctx) {
        const PAGE = 1;
        const queryParams = pick(ctx.request.query, ['title', 'tags', 'size', 'page']);
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
            filter.page = PAGE;
        }
        const { summaries, ...rest } = await SummaryService.search(filter);
        ctx.body = {
         data: summaries,
            filter,
            ...rest,
        };
    },
};

