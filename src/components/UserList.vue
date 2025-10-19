<template>
  <div class="user-list">
    <h1>Список пользователей</h1>
    <div class="users">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>Email: {{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      users: [
        { id: 1, name: 'Иван Иванов', email: 'ivan@mail.com' },
        { id: 2, name: 'Петр Петров', email: 'petr@mail.com' },
        { id: 3, name: 'Мария Сидорова', email: 'maria@mail.com' }
      ]
    }
  }
}
</script>
