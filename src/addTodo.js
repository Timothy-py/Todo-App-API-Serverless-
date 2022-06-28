const {v4} = require('uuid')
const AWS = require('aws-sdk')

const dynamodbClient = new AWS.DynamoDB.DocumentClient();

const addTodo = async (event) => {
    const {todo} = JSON.parse(event.body)
    const createdAt = new Date().toISOString()
    const id = v4()

    console.log("This is the id", id)

    // new todo item
    const newTodo = {
        id,
        todo,
        createdAt,
        completed: false
    }

    await dynamodbClient.put({
        TableName: "TodoTable",
        Item: newTodo
    }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
    handler: addTodo
}