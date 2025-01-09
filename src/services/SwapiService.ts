import axios from 'axios';
import { ApiResponse, HeroInterface  } from '../interfaces/api-response-interface';

const BASE_URL = 'https://swapi.py4e.com/api';


export const getCharacters = async (page: number = 1): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/people/?page=${page}`);
    return response.data; // Devuelve la respuesta completa (con count, next, previous y results)
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error; 
  }
};
export const getCharacterByID = async ( heroeId: number): Promise<HeroInterface> => {
  try {
    const response = await axios.get(`${BASE_URL}/people/${heroeId}`);
    return response.data; // Devuelve la respuesta completa (con count, next, previous y results)
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error; 
  }
};

export const getCharacterImage = async (id: number): Promise<string> => {

   const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  try {
    // Verificar si la imagen existe usando una solicitud HEAD
    const response = await fetch(imageUrl);
    if (response.ok) {
      return imageUrl; // La imagen existe, devolver la URL
    } else {
      throw new Error('Image not found'); // La imagen no existe, lanzar un error
    }
  } catch (error) {
    throw new Error('Failed to fetch image'); // Lanzar un error si hay un problema al cargar la imagen
  }
};