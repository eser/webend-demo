const schema = `
    type Film {
        _id: ID
        title: String
        year: Int
    }

    type Query {
        # Fetch the film by id
        film(id: ID): [Film]
    }
`;

module.exports = {
    'default': schema,
};
