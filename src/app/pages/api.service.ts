import axios from 'axios';
import { setup } from 'axios-cache-interceptor';

setup({
  axios,
  ttl: 1000 * 60 * 5, // Cache responses for 5 minutes
});

export const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});
