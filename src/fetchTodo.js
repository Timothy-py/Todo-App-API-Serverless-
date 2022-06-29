const AWS = require('aws-sdk');

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const fetchTodo = async (event) => {
    let todo;
    const {id} = event.pathParameters

    try {
        const result = await dynamodbClient.get({
            TableName: 'TodoTable',
            Key: {id}
        }).promise()

        todo = result.Item

        return {
            statusCode: 200,
            body: JSON.stringify(todo)
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
    handler: fetchTodo
}