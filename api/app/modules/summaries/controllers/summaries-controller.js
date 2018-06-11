import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';
import AppError from '../../../helpers/appError';
export default {
    async create(ctx) {
        const summaryData = {
            ...pick(ctx.request.body, Summary.createFields),
            userHash: ctx.user.hash,
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
            user: {
                hash: userHash,
            },
            summary,
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
            user: {
                hash: userHash,
            },
            summary,
        } = ctx;
        try {
            const deleteSummary = await SummaryService.deleteSummary(summary, userHash);
            ctx.body = {data: deleteSummary.hash};
        } catch (e) {
            throw new AppError({ status: 400, ...e});
        }
    },

    async getSummary(ctx) {
        const { summary } = ctx;

        ctx.body = {data: pick(summary, Summary.createFields) };
    },
};

