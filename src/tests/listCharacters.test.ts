import { listCharacters } from '../services/characterService';
import { getAllCharacters } from '../repositories/characterRepository';

jest.mock('../repositories/characterRepository'); // Mockear el repositorio

describe('Character Service - listCharacters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of characters', async () => {
    // Simular los datos que devolvería getAllCharacters
    const mockCharacters = [
      {
        nombre: 'Luke Skywalker',
        altura: '172',
        masa: '77',
        color_cabello: 'blond',
        color_piel: 'fair',
        color_ojos: 'blue',
        anio_nacimiento: '19BBY',
        genero: 'male'
      },
      {
        nombre: 'Darth Vader',
        altura: '202',
        masa: '136',
        color_cabello: 'none',
        color_piel: 'white',
        color_ojos: 'yellow',
        anio_nacimiento: '41.9BBY',
        genero: 'male'
      }
    ];

    // Mockear la función getAllCharacters para que devuelva la lista simulada
    (getAllCharacters as jest.Mock).mockResolvedValue(mockCharacters);

    // Llamar a listCharacters y verificar los resultados
    const result = await listCharacters();

    expect(getAllCharacters).toHaveBeenCalled(); // Asegurarse de que getAllCharacters fue llamado
    expect(result).toEqual(mockCharacters); // Verificar que el resultado sea igual a los personajes simulados
  });

  it('should return an empty array if no characters are found', async () => {
    // Simular que no hay personajes
    (getAllCharacters as jest.Mock).mockResolvedValue([]);

    const result = await listCharacters();

    expect(getAllCharacters).toHaveBeenCalled();
    expect(result).toEqual([]); // Verificar que devuelva un arreglo vacío
  });
});