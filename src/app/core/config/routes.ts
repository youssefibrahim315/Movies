import { environment } from 'src/environments/environment';

export const baseURL = environment.apiUrl;

export const rout = {
    movies: {
        login: 'login',
        register: 'register',
        home: 'home',
    },
    Api: {
        auth: {
            signIn: '/api/login',
            signUp: '/api/register',
        },
        movies: {
            List: "/api/movies",
            Show: '/api/movies/',
            Create: '/api/movies',
            Update: '/api/movies/',
            Delete: '/api/movies/',
            ListByCategory: '/api/moviesByCategory/',
            Category: {
                List: "/api/category",
                Create: "/api/category",
                Update: "/api/category/1",
                Delete: "/api/category/1",
                Show: "/api/category/1",
            }
        },
    },
};
