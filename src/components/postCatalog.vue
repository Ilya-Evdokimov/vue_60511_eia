<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center mb-4">
      <h2>Посты</h2>
      <Button
        icon="pi pi-refresh"
        @click="fetchPosts"
        :loading="postsLoading"
        label="Обновить"
      />
    </div>

    <DataTable :value="posts" :loading="postsLoading" class="p-datatable-sm">
      <Column field="id" header="ID" style="width: 10%"></Column>
      <Column field="title" header="Заголовок" style="width: 30%"></Column>
      <Column field="text" header="Содержание" style="width: 40%">
        <template #body="{ data }">
          {{ data.content?.substring(0, 100) }}...
        </template>
      </Column>
      <Column field="author_id" header="Автор" style="width: 20%">
        <template #body="{ data }">
          {{ data.user?.name || 'Неизвестен' }}
        </template>
      </Column>
    </DataTable>

    <div class="flex justify-content-between align-items-center mt-4">
      <span class="text-color-secondary">
        Всего постов: {{ postsPagination.total }}
      </span>

      <Paginator
        :rows="postsPagination.perPage"
        :totalRecords="postsPagination.total"
        :first="(postsPagination.currentPage - 1) * postsPagination.perPage"
        @page="onPageChange($event)"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>

    <Message v-if="postsError" severity="error" class="mt-3">
      {{ postsError }}
    </Message>
  </div>
</template>

<script>
import { useDataStore } from '@/stores/dataStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'
import Message from 'primevue/message'

export default {
  name: 'PostsList',
  components: {
    DataTable,
    Column,
    Paginator,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Message
  },
  setup() {
    const dataStore = useDataStore()
    return { dataStore }
  },
  computed: {
    posts() {
      return this.dataStore.posts
    },
    postsLoading() {
      return this.dataStore.postsLoading
    },
    postsError() {
      return this.dataStore.postsError
    },
    postsPagination() {
      return this.dataStore.postsPagination
    }
  },
  methods: {
    fetchPosts(page = 1) {
      this.dataStore.fetchPosts(page)
    },
    onPageChange(event) {
      const page = event.page + 1
      this.fetchPosts(page)
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>
