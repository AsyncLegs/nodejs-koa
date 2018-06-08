import mongoose from 'mongoose';

mongoose.Promise = Promise;
export default (mongoUri) => {
    if (!mongoUri) {
        throw Error('Mongo DB connection string should be provided');
    }

    return mongoose
        .connect(mongoUri)
        .then((mongoDb) => {
            console.log(`Connection to ${mongoUri} successfully.`);

            return mongoDb;
        })
        .catch((error) => {
            throw error;
        });
};

