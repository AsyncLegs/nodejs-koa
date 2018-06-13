import { Summary } from '../models';
import pick from 'lodash/pick';
import AppError from '../../../helpers/appError';

export default {
    async createSummary(data) {
        const { userHash } = data;
        const summaryCountByUserId = await Summary.count({ userHash });

        if (summaryCountByUserId === 3) {
            throw new AppError({ status: 400, message: 'User cannot create more then 3 summaries' });
        }

        return Summary.create(data);
    },

    updateSummary(data) {
        const { summary, userHash, body } = data;

        if (summary.userHash !== userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Summary "${summary.hash}" not owned by user "${userHash}"`});
        }
        const summaryUpdate = pick(body, Summary.createFields);
        summary.set(summaryUpdate);
        try {
            return summary.save();
        } catch (e) {
            throw new AppError( {status: 400, ...e});
        }
    },

    deleteSummary(summary, userHash) {
        if (summary.userHash !== userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Summary "${summary.hash}" not owned by user "${userHash}"` });
        }

        return summary.remove();
    },

    async search({ tags, size, page, title}) {
        const query = {
            title: { $regex: title },
        };

        if (tags.length) {
            query.tags = { $in: tags};
        }
        const count = await Summary
            .count(query)
            .sort({ updatedAt: '-1' });

        const pages = Math.ceil(count / size);

        const summaries = await Summary
            .find(query)
            .sort({ updatedAt: '-1' })
            .limit(size)
            .skip((page - 1) * size);

        return {
            summaries,
            count,
            pages,
            page,
        };
    },
};
