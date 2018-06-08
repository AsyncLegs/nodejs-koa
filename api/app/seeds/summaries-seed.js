import faker from 'faker';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { Summary } from '../modules/summaries/models';

export default(users) => {
    if (!users || !users.length) {
        throw Error('Users are required');
    }
    const promises = [];

    _.times(500, () => {
        const summaryPromise = Summary.create({
            title: faker.lorem.words(2, 5),
            description: faker.lorem.lines(4, 10),
            tags: faker.lorem.words(2, 5).split(' '),
            userId: users[faker.random.number(0, 499)]._id,
            hash: uuid(),
        });

        promises.push(summaryPromise);
    });

    return Promise.all(promises);
};

