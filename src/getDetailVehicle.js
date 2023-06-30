const AWS = require('aws-sdk');

const getVehicle = async (event) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const result = await dynamoDB.get({
        TableName: 'Vehicle',
        Key: {
            id
        },
    }).promise();
  
    const vehicle = result.Item;

    return {
      status: 200,
      body: vehicle,
    };
  } catch (error) {
    console.log('Error en detalle: ', error);
  }

};

module.exports = { getVehicle };
