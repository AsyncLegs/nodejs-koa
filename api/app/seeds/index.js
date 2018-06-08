import { MONGO_URI } from '../config';
import mongooseConnector from '../connectors/mongoose-connector';
import userSeeds from '../seeds/users-seed';
import summarySeed from '../seeds/summaries-seed';

initSeeds();

async function initSeeds() {
    const mongoConnection = await mongooseConnector(MONGO_URI);
    await mongoConnection.connection.db.dropDatabase();
    try {
    const users = await userSeeds();
    const summaries = await summarySeed(users);
    console.log(summaries);
    } catch (e) {
        console.error(e);
    } finally {
     await mongoConnection.connection.close();
    }
}

