import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { StarWarsCharacter } from '../models/StarWarsCharacter';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient();
const tableName = process.env.DB_TABLE || 'StarWarsTable';

// Guardar un personaje en DynamoDB
export const saveCharacter = async (character: Omit<StarWarsCharacter, 'id'>): Promise<StarWarsCharacter> => {
  const newCharacter: StarWarsCharacter = {
    ...character,
    id: uuidv4(),
  };
  
  const params = {
    TableName: tableName,
    Item: newCharacter,
  };

  await client.send(new PutCommand(params));
  return newCharacter;
};

// Obtener todos los personajes desde DynamoDB
export const getAllCharacters = async (): Promise<StarWarsCharacter[]> => {
  const params = {
    TableName: tableName,
  };

  const result = await client.send(new ScanCommand(params));
  return result.Items as StarWarsCharacter[];
};

