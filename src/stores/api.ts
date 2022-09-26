import { ListsApi, TodosApi, AuthApi, Configuration } from '../generated-api';
import globalAxios, { AxiosError } from 'axios';
import authController from './authController';

class Api {
    readonly lists: ListsApi;
    readonly todos: TodosApi;
    readonly auth: AuthApi;

    constructor() {
        const config = new Configuration({
            accessToken: () => localStorage.getItem('token') || '',
            basePath: 'http://localhost:8080',
        });
        globalAxios.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                if (error.response && error.response.status == 401)
                    authController.logout();
                return error;
            }
        );
        this.lists = new ListsApi(config);
        this.todos = new TodosApi(config);
        this.auth = new AuthApi(config);
    }
}

const api = new Api();

export default api;
