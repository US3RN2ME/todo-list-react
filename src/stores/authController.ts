import api from './api';

class AuthController {
    get isLoggedIn(): boolean {
        return Boolean(localStorage.getItem('token'));
    }

    logout() {
        localStorage.removeItem('token');
    }

    async login(email: string, password: string) {
        try {
            const response = await api.auth.authControllerLogin({
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
        } catch (ex: any) {
            throw new Error(ex.response.data.message);
        }
    }

    async register(email: string, password: string) {
        try {
            await api.auth.authControllerRegister({
                email,
                password,
            });
        } catch (ex: any) {
            throw new Error(ex.response.data.message);
        }
    }
}

const authController = new AuthController();

export default authController;
