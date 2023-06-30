const AWS = require('aws-sdk');

const getVehicles = async (event) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    const result = await dynamoDB.scan({
      TableName: 'Vehicle',
    }).promise();
  
    const vehicles = result.Items;

    return {
      status: 200,
      body: { vehicles },
    };
  } catch (error) {
    console.log('Error en listado: ', error);
  }

};

module.exports = { getVehicles };
