import { Summary } from '../../summaries';
export default {
    async getSummariesByUser(ctx) {
        const {params: {
            userHash,
        } } = ctx;
        const summaries = await Summary.find({userHash});
        if (!summaries) {
            ctx.throw(404, `Summaries for user ${userHash} wasn't found`);
        }
        ctx.body = {count: Object.keys(summaries).length, data: summaries};
    },
};
