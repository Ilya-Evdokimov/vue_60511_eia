<template>
  <div id="app">
    <header>
      <nav>
        <div v-if="isAuthenticated && user">
          Welcome, {{ user.name }}
          <button @click="logout">Logout</button>
        </div>

        <div v-else>
          <form @submit.prevent="login">
            <div>
              <label for="email">Email:</label>
              <input v-model="email" type="email" id="email" required />
            </div>
            <div>
              <label for="password">Password:</label>
              <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">Login</button>
            <p v-if="authError" class="error">{{ authError }}</p>
          </form>
        </div>
      </nav>
    </header>

    <main>

      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    },
  },
  methods: {
    logout() {
      this.authStore.logout();
      this.email = '';
      this.password = '';
    },
    async login() {
      await this.authStore.login({
        email: this.email,
        password: this.password
      });

      if (this.isAuthenticated) {
        this.email = '';
        this.password = '';
      }
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.getUser();
    }
  },
};
</script>

<style scoped>
.error {
  color: red;
}

#app {
  font-family: Arial, sans-serif;
}

nav {
  background-color: #f5f5f5;
  padding: 1rem;
  margin-bottom: 2rem;
}

form {
  max-width: 300px;
  margin: 0 auto;
}

div {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
