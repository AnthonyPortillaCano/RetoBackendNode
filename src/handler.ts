import { createCharacterHandler, listCharactersHandler } from './controllers/characterController';
import { APIGatewayProxyHandler } from 'aws-lambda';
import * as swagger from './swagger/swagger.json';
export const createCharacter = createCharacterHandler;
export const listCharacters = listCharactersHandler;
export const serveSwagger: APIGatewayProxyHandler = async (event) => {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(swagger),
    };
  };