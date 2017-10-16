// const jest = require('jest');

const index = require('./index').default;

test('getFilmSingle GET response test', () => {
    const event = {
        httpMethod: 'GET',
        pathParameters: {
        },
        headers: {
        },
        queryStringParameters: {
            query: 'query getFilmSingle($id: ID) { film(id: $id) { _id, title, year } }',
            variables: JSON.stringify({ id: '59e3fbae7a8bac7df3a463e4' }),
        },
        body: undefined,
    };

    const context = {};

    const handler = index(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);

        expect(body.data.film).toBeDefined();
        expect(body.data.film.length).toEqual(1);
        expect(body.data.film[0]._id).toEqual('59e3fbae7a8bac7df3a463e4');
        expect(body.data.film[0].title).toEqual('Donnie Darko');
        expect(body.data.film[0].year).toEqual(2001);
    });

    return handler;
});

test('getFilmList GET response test', () => {
    const event = {
        httpMethod: 'GET',
        pathParameters: {
        },
        headers: {
        },
        queryStringParameters: {
            query: 'query getFilmList { film { _id, title, year } }',
        },
        body: undefined,
    };

    const context = {};

    const handler = index(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);

        expect(body.data.film).toBeDefined();
        expect(body.data.film.length).toEqual(4);
        expect(body.data.film[3]._id).toEqual('59e3fbba7a8bac7df3a463e6');
        expect(body.data.film[3].title).toEqual('Captain America: The Winter Soldier');
        expect(body.data.film[3].year).toEqual(2014);
    });

    return handler;
});

test('getFilmSingle POST response test', () => {
    const event = {
        httpMethod: 'POST',
        pathParameters: {
        },
        headers: {
        },
        queryStringParameters: {
        },
        body: JSON.stringify({
            query: 'query getFilmSingle($id: ID) { film(id: $id) { _id, title, year } }',
            variables: {
                id: '59e3fbae7a8bac7df3a463e4',
            },
        }),
    };

    const context = {};

    const handler = index(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);

        expect(body.data.film).toBeDefined();
        expect(body.data.film[0]._id).toEqual('59e3fbae7a8bac7df3a463e4');
        expect(body.data.film[0].title).toEqual('Donnie Darko');
        expect(body.data.film[0].year).toEqual(2001);
    });

    return handler;
});

test('getFilmList POST response test', () => {
    const event = {
        httpMethod: 'POST',
        pathParameters: {
        },
        headers: {
        },
        queryStringParameters: {
        },
        body: JSON.stringify({
            query: 'query getFilmList { film { _id, title, year } }',
        }),
    };

    const context = {};

    const handler = index(event, context, (err, response) => {
        expect(err).toBeNull();
        expect(response.statusCode).toEqual(200);

        const body = JSON.parse(response.body);

        expect(body.data.film).toBeDefined();
        expect(body.data.film.length).toEqual(4);
        expect(body.data.film[3]._id).toEqual('59e3fbba7a8bac7df3a463e6');
        expect(body.data.film[3].title).toEqual('Captain America: The Winter Soldier');
        expect(body.data.film[3].year).toEqual(2014);
    });

    return handler;
});
