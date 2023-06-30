const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const createVehicle = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date();
    const updatedAt = new Date();
    const id = v4();
    const requestBody = JSON.parse(event.body);
    const newVehicle = {
        id,
        createdAt,
        updatedAt,
        ...requestBody,
    };
    await dynamoDB.put({
        TableName: 'Vehicle',
        Item: newVehicle,
    }).promise();

    return {
        status: 200,
        body: newVehicle,
    };
};

module.exports = { createVehicle };