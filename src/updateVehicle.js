const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const updateVehicle = async (event) => {
    try {
        const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const updatedAt = new Date();
    const requestBody = JSON.parse(event.body);
    const {
        capacidadCarga,
        consumibles,
        costo,
        capacidad,
        longitud,
        fabricante,
        nombre,
    } = requestBody;

    await dynamoDB.update({
        TableName: 'Vehicle',
        Key: {
            id
        },
        UpdateExpression: 'set capacidadCarga = :capacidadCarga, consumibles = :consumibles, costo = :costo, capacidad = :capacidad, longitud = :longitud, fabricante = :fabricante, nombre = :nombre, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
            ':capacidadCarga': capacidadCarga,
            ':consumibles': consumibles,
            ':costo': costo,
            ':capacidad': capacidad,
            ':longitud': longitud,
            ':fabricante': fabricante,
            ':nombre': nombre,
            ':updatedAt': updatedAt,
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    return {
        status: 200,
        body: {...requestBody, updatedAt},
    };
    } catch (error) {
        console.log('Error en update: ', error);
    }
};

module.exports = { updateVehicle };