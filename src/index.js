const co = require('co');
const dotenv = require('dotenv');

const mongodb = require('./resources/mongodb');
const entities = require('./entities/').default;
const shared = require('./shared');

dotenv.config({ path: `${__dirname}/../.env` });

function* index(event, context, callback) {
    let db;

    try {
        const parameters = shared.getGraphQLParameters(event);

        db = yield mongodb.connect(process.env.MONGODB_CONNECTION_STRING);

        const result = yield entities.query(parameters.query, parameters.variables);

        const response = shared.generateResponse(200, result);

        callback(null, response);
    }
    catch (ex) {
        callback(ex);
    }
    finally {
        if (db !== undefined) {
            db.close();
        }
    }
}

module.exports = {
    'default': co.wrap(index),
};
