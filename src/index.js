const co = require('co');
const dotenv = require('dotenv');

const mongodb = require('./resources/mongodb');
const entities = require('./entities/').default;
const shared = require('./shared');

dotenv.config({ path: `${__dirname}/../.env` });

function* index(event, context, callback) {
    let db;

    try {
        // HTTP talebinden GraphQL parametrelerini al: query, variables ve operationName
        const parameters = shared.getGraphQLParameters(event);

        // MongoDB bağlantısını gerçekleştir
        db = yield mongodb.connect(process.env.MONGODB_CONNECTION_STRING);

        // GraphQL nesnesi üzerinde gelen sorguyu çalıştır
        const result = yield entities.query(parameters.query, parameters.variables);

        // AWS Lambda'ya uygun bir şekilde HTTP talebine yanıt ver
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
