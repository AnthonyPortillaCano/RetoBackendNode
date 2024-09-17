import axios from 'axios';
import { saveCharacter, getAllCharacters } from '../repositories/characterRepository';
import { StarWarsCharacter } from '../models/StarWarsCharacter';

const SWAPI_URL = 'https://swapi.py4e.com/api/people/';

// Servicio para obtener un personaje desde SWAPI y guardarlo en DynamoDB
export const createCharacter = async (id: string): Promise<StarWarsCharacter> => {
  const { data } = await axios.get(`${SWAPI_URL}${id}/`);
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = data;

  // Traducir los atributos de SWAPI a español
  const translatedCharacter = {
    nombre: name,
    altura: height,
    masa: mass,
    color_cabello: hair_color,
    color_piel: skin_color,
    color_ojos: eye_color,
    anio_nacimiento: birth_year,
    genero: gender,
  };

  // Guardar el personaje traducido en DynamoDB
  return await saveCharacter(translatedCharacter);
};

// Servicio para obtener todos los personajes
export const listCharacters = async (): Promise<StarWarsCharacter[]> => {
  return await getAllCharacters();
};