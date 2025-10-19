<template>
  <div class="posts-catalog">
    <h1>Каталог товаров</h1>
    <div class="posts">
      <div v-for="posts in posts" :key="posts.id" class="posts-card">
        <h3>{{ posts.name }}</h3>
        <p>Нравится: {{ posts.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postsCatalog',
  data() {
    return {
      posts: [
        { id: 1, name: 'Собаки', price: 50000 },
        { id: 2, name: 'Кошки', price: 25000 },
        { id: 3, name: 'Мышки', price: 15000 }
      ]
    }
  }
}
</script>
