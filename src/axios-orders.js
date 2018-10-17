import axios from 'axios';
import * as k from './k'

const instance = axios.create({
    baseURL: k.bUrl 
});

export default instance;