import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mdch-backend-contactomdch.5n7tjo.easypanel.host/api',
});

export const registrarCharro = async (datos) => {
  try {
    const response = await api.post('/contactos', datos);
    return response.data;
  } catch (error) {
    throw error;
  }
};