const graphql = require('graph.ql');

const filmQuery = require('./queries/film').default;

const schema = require('./schema').default;

const graphRoot = graphql(schema, {
    Query: {
        film: filmQuery,
    },
});

module.exports = {
    'default': graphRoot,
};
