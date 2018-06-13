import pick from 'lodash/pick';
import {
    connect,
    drop,
    close,
} from '../../../../utils/mongo';

import { SummaryService } from '../../services';

describe('Summary Service', () => {
    beforeAll(async () => {
        await connect();
        await drop();
    });

    afterAll(async () => {
        await drop();
        await close();
    });

    it('Create summary as expected', async () => {
        const summaryData = {
          userHash: 'user-hash',
          title: 'Senior JS Developer',
          description: 'SOme awesome description',
          tags: ['js', 'nodejs'],
        };
        const summaryModel = await SummaryService.createSummary(summaryData);
        const summary = summaryModel.toObject();

        expect(pick(summary, Object.keys(summaryData))).toEqual(summaryData);
        expect(summary).toHaveProperty('hash');
        expect(summary).toHaveProperty('createdAt');
        expect(summary).toHaveProperty('updatedAt');

        await drop();
    });


});
