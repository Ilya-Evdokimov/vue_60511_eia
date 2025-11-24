<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <span>
          <i class="pi pi-apple" style="font-size: 1.5rem"></i>
        </span>
      </template>

      <template #item="{ item }">
        <a class="flex align-items-center ml-6 p-4">
          <router-link v-if="item.route" :to="item.route" class="flex align-items-center no-underline text-color">
            <i :class="item.icon" class="mr-2"></i>
            <span class="ml-1">{{ item.label }}</span>
          </router-link>
          <a v-else class="flex align-items-center no-underline text-color" @click="item.command && item.command({ originalEvent: $event, item })">
            <i :class="item.icon" class="mr-2"></i>
            <span class="ml-1">{{ item.label }}</span>
          </a>
        </a>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <div v-if="isAuthenticated && user">
            <span class="pi pi-fw pi-user mr-2">{{ user.name }}</span>
            <Button @click="logout" class="ml-2" label="Выйти" />
          </div>
          <div v-else>
            <form @submit.prevent="login" class="flex align-items-center">
              <InputText
                v-model="email"
                type="email"
                id="email"
                required
                placeholder="Email"
                class="mr-2"
                :class="{ 'p-invalid': authError }"
                size="small"
              />
              <InputText
                v-model="password"
                type="password"
                id="password"
                required
                placeholder="Пароль"
                class="mr-2"
                :class="{ 'p-invalid': authError }"
                size="small"
              />
              <Button type="submit" label="Войти" />
              <div class="ml-2">
                <small v-if="authError" class="error">{{ authError }}</small>
              </div>
            </form>
          </div>
        </div>
      </template>
    </Menubar>

    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Button, Menubar, InputText },
  data() {
    return {
      email: '',
      password: '',
      authError: '',
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/'
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-folder',
          route: '/posts'
        },
        {
          label: 'Комментарии',
          icon: 'pi pi-fw pi-box',
          route: '/comments'
        }
      ]
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    },
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    }
  },
  methods: {
    async login() {
      try {
        this.authError = '';
        await this.authStore.login({
          email: this.email,
          password: this.password
        });

        if (this.isAuthenticated) {
          this.email = '';
          this.password = '';
        }
      } catch (error) {
        this.authError = error.message || 'Ошибка авторизации';
      }
    },

    async logout() {
      try {
        await this.authStore.logout();
      } catch (error) {
        console.error('Ошибка выхода:', error);
      }
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.getUser();
    }
  }
};
</script>

<style scoped>
.error {
  color: #e24c4c;
}

.flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.ml-1 { margin-left: 0.25rem; }
.ml-2 { margin-left: 0.5rem; }
.ml-6 { margin-left: 1.5rem; }
.mr-2 { margin-right: 0.5rem; }

.gap-2 {
  gap: 0.5rem;
}

.no-underline {
  text-decoration: none;
}

.text-color {
  color: inherit;
}

:deep(.p-menubar-root-list) {
  margin-left: 1rem;
}

:deep(.p-menuitem-link) {
  padding: 0.75rem 1rem;
}

:deep(.p-inputtext) {
  height: 2rem;
}
</style>
