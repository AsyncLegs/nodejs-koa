import pick from 'lodash/pick';
import { Summary } from '../models';
import { SummaryService } from '../services';
export default {
    async create(ctx) {
        const summaryData = {
            ...pick(ctx.request.body, Summary.createFields),
            userId: ctx.user._id,
        };
        const { _id } = await SummaryService.createSummary(summaryData);
        const summary = await Summary.findById(_id);
        ctx.status = 201;
        ctx.body = { data: summary };
    },
    async update(ctx) {
        const {
            request: {
                body,
            },
            user: {
                _id: userId,
            },
            summary,
        } = ctx;

        const updateSummary = await SummaryService.updateSummary({ summary, userId, body });
        if (updateSummary.error && updateSummary.error.length) {
            ctx.throw(updateSummary.error.code, updateSummary.error.message);
        }

        ctx.body = {data: updateSummary};
    },

    async delete(ctx) {
        const {
            user: {
                _id: userId,
            },
            summary,
        } = ctx;
        const deleteSummary = await SummaryService.deleteSummary(summary, userId);

        if (deleteSummary.error) {
            ctx.throw(deleteSummary.error.code, deleteSummary.error.message);
        }

        ctx.body = {data: deleteSummary};
    },
    async getSummary(ctx) {
        console.log(1);
        console.log(summary);

        const { summary } = ctx;

        ctx.body = {data: pick(summary, Summary.createFields) };
    },
};

