const {v4} = require('uuid')
const AWS = require('aws-sdk')

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
    const {completed} = JSON.parse(event.body)
    const {id} = event.pathParameters
    

    await dynamodbClient.update({
        TableName: "TodoTable",
        Key: {id},
        UpdateExpression: 'set completed = :completed',
        ExpressionAttributeValues: {':completed': completed},
        ReturnValues: 'ALL_NEW'
    }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'Todo updated successfully'
    }),
  };
};

module.exports = {
    handler: updateTodo
}