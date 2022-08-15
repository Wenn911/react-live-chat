import { useContext } from 'react';
import { authContext, apiContext } from '../contexts/index.js';

export const useAuth = () => useContext(authContext);
export const useApi = () => useContext(apiContext);
