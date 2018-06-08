import { Summary } from '../models';
import pick from 'lodash/pick';

export default {
    async createSummary(data) {
        const { userId } = data;
        const summaryCountByUserId = await Summary.count({ userId });

        if (summaryCountByUserId === 3) {
            throw new AppError({ status: 400, message: 'User cannot create more then 3 summaries' });
        }
        console.log(data);
        return Summary.create(data);
    },

    async updateSummary(data) {
        const { summary, userId, body } = data;
        let error = null;

        if (summary.userId !== userId.toHexString()) {
            error = { code: 403, message: `Forbidden. Summary "${summary._id}" not owned by user "${userId}"`};
        }
        if (!error) {
            const summaryUpdate = pick(body, Summary.createFields);
            summary.set(summaryUpdate);
            await summary.save();
        }
        const summarySerialize = () => {
            return error === null ? summary: {};
        };

        return {
            summary: summarySerialize(error, summary),
            error: error,
        };
    },

    async deleteSummary(summary, userId) {
        let error = null;
        if (summary.userId !== userId.toHexString()) {
            error = { code: 403, message: `Forbidden. Summary "${summary._id}" not owned by user "${userId}"`};
        }

        if (!error) {
            await summary.remove();
        }

        return {
            result: error ? 'Error' : { id: summary._id },
            error,
        };
    },
};
