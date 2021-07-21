import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://5d098b52d927.ngrok.io'
});

instance.interceptors.request.use(
    async config => {
        const jsonValue = await AsyncStorage.getItem('@token_Key');
        let obj = JSON.parse(jsonValue);
        if (obj) {
            config.headers.Authorization = `Bearer ${obj}`
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

export default instance
