import axios from 'axios';
import * as k from './apiKeys'

const instance = axios.create({
    baseURL: k.bUrl 
});

export default instance;