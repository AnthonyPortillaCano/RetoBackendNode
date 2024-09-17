import { createCharacter } from '../services/characterService';
import axios from 'axios';
import { saveCharacter } from '../repositories/characterRepository';

jest.mock('axios');
jest.mock('../repositories/characterRepository');

describe('Character Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch a character from SWAPI, translate its properties, and save it', async () => {
    // Simular la respuesta de axios con jest.fn()
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male'
      }
    });

    // Simular la respuesta de saveCharacter con jest.fn()
    (saveCharacter as jest.Mock).mockResolvedValue({
      nombre: 'Luke Skywalker',
      altura: '172',
      masa: '77',
      color_cabello: 'blond',
      color_piel: 'fair',
      color_ojos: 'blue',
      anio_nacimiento: '19BBY',
      genero: 'male'
    });

    const result = await createCharacter('1');

    expect(axios.get).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/1/');
    expect(saveCharacter).toHaveBeenCalledWith({
      nombre: 'Luke Skywalker',
      altura: '172',
      masa: '77',
      color_cabello: 'blond',
      color_piel: 'fair',
      color_ojos: 'blue',
      anio_nacimiento: '19BBY',
      genero: 'male'
    });
    expect(result).toEqual({
      nombre: 'Luke Skywalker',
      altura: '172',
      masa: '77',
      color_cabello: 'blond',
      color_piel: 'fair',
      color_ojos: 'blue',
      anio_nacimiento: '19BBY',
      genero: 'male'
    });
  });
});