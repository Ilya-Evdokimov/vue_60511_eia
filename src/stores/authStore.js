import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    errorMessage: null
  }),

  actions: {
    async login(credentials) {
      this.errorMessage = null;
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);

        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        this.errorMessage = null;

        localStorage.setItem('token', this.token);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Произошла ошибка при входе';
        }
        console.log(error);
      }
    },

    async getUser() {
      this.errorMessage = "";
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        });
        this.user = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Произошла ошибка при получении данных пользователя';
        }
        console.log(error);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      this.errorMessage = null;
      localStorage.removeItem('token');
    }
  }
});
