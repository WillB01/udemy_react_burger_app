import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-54a57.firebaseio.com/' 
});

export default instance;