const co = require('co');

const mongodb = require('../../resources/mongodb');

function* filmQuery(root, args) {
    let filter;

    if (args.id !== undefined) {
        filter = { _id: mongodb.ObjectID(args.id) };
    }
    else {
        filter = {};
    }

    const db = mongodb.getConnection();

    const result = yield db.collection('films')
        .find(filter)
        .toArray();

    return result;
}

module.exports = {
    'default': co.wrap(filmQuery),
};
