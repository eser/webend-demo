const co = require('co');
const mongodb = require('mongodb');

const local = {
    connection: null,
};

function* connect(url) {
    local.connection = yield mongodb.MongoClient.connect(url);

    return local.connection;
}

function getConnection() {
    return local.connection;
}

module.exports = {
    connect: co.wrap(connect),
    getConnection: getConnection,

    ObjectID: mongodb.ObjectID,
};
