import faker from 'faker';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { UserService} from '../modules/users/services';

export default() => {
    const promises = [];
    _.times(500, () => {
        const userPromise = UserService.createUser({
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: faker.lorem.word(),
            hash: uuid(),
        });
        promises.push(userPromise);
    });

    return Promise.all(promises);
};

