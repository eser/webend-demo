function generateResponse(status, message) {
    return {
        statusCode: status,
        body: (message !== undefined) ?
            JSON.stringify(message, null, 4) :
            '',
    };
}

function getGraphQLParameters(event) {
    let query;
    let operationName;
    let variables;

    if (event.httpMethod === 'POST') {
        // if (event.body !== undefined) {
        const body = JSON.parse(event.body);

        query = body.query;
        operationName = body.operationName;
        variables = body.variables;
        // }
    }
    else if (event.httpMethod === 'GET') {
        if (event.queryStringParameters !== undefined) {
            query = event.queryStringParameters.query;
            operationName = event.queryStringParameters.operationName;

            if (event.queryStringParameters.variables !== undefined) {
                variables = JSON.parse(event.queryStringParameters.variables);
            }
        }
    }

    return {
        query,
        operationName,
        variables,
    };
}

module.exports = {
    generateResponse,
    getGraphQLParameters,
};
