const AWS = require('aws-sdk');

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const deleteTodo = async (event) => {
    try {
        const {id} = event.pathParameters

        await dynamodbClient.delete({
            TableName: 'TodoTable',
            Key: {id}
        }).promise()

        return{
            statusCode: 204
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
    handler: deleteTodo
}