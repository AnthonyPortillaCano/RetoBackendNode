import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCharacter, listCharacters } from '../services/characterService';

// Controlador para crear un personaje
export const createCharacterHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = JSON.parse(event.body!); // Obtiene el ID desde el cuerpo de la solicitud
    const character = await createCharacter(id);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Character created', character }),
    };
  } catch (error) {
    console.error('Error creating character:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error creating character' }),
    };
  }
};

// Controlador para listar todos los personajes
export const listCharactersHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const characters = await listCharacters();
    console.log(characters);
    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    console.error('Error listing characters:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error listing characters' }),
    };
  }
};

