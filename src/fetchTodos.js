const AWS = require('aws-sdk');

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const fetchTodos = async (event) => {

    let todos;

    try {
        const results = await dynamodbClient.scan({
            TableName: 'TodoTable'
        }).promise()

        todos = results.Items

        return {
            statusCode: 200,
            body: JSON.stringify(todos)
        }
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: error
        }
    }
}

module.exports = {
    handler: fetchTodos
}