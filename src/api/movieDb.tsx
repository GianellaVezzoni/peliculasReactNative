import axios from 'axios';

const movieDb = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '0a108e00de6d241ea0e12fc782f37202',
        language: 'es-ES'
    }
});

export default movieDb;