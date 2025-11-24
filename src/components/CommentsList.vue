<template>
  <div class="card">
    <div class="flex justify-content-between align-items-center mb-4">
      <h2>Список комментариев</h2>
      <Button
        icon="pi pi-refresh"
        @click="fetchComments"
        :loading="commentsLoading"
        label="Обновить"
      />
    </div>

    <!-- Таблица комментариев -->
    <DataTable
      :value="comments"
      :loading="commentsLoading"
      class="p-datatable-sm"
      stripedRows
    >
      <Column field="id" header="ID" style="width: 10%">
        <template #body="{ data }">
          <span class="font-bold">{{ data.id }}</span>
        </template>
      </Column>

      <Column field="CommentText" header="Текст комментария" style="width: 50%">
        <template #body="{ data }">
          <div>
            {{ data.CommentText || 'Нет текста' }}
          </div>
        </template>
      </Column>

      <Column field="post_id" header="ID поста" style="width: 20%">
        <template #body="{ data }">
          <Tag :value="data.post_id" severity="info" />
        </template>
      </Column>

      <Column field="author_id" header="ID автора" style="width: 20%">
        <template #body="{ data }">
          <Tag :value="data.author_id" severity="success" />
        </template>
      </Column>
    </DataTable>

    <!-- Пагинация -->
    <div class="flex justify-content-between align-items-center mt-4">
      <span class="text-color-secondary">
        Всего комментариев: {{ commentsPagination.total || comments.length }}
      </span>

      <Paginator
        :rows="commentsPagination.perPage"
        :totalRecords="commentsPagination.total || comments.length"
        :first="(commentsPagination.currentPage - 1) * commentsPagination.perPage"
        @page="onPageChange($event)"
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      />
    </div>

    <!-- Сообщения об ошибках -->
    <Message v-if="commentsError" severity="error" class="mt-3">
      {{ commentsError }}
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
import Tag from 'primevue/tag'

export default {
  name: 'CommentsList',
  components: {
    DataTable,
    Column,
    Paginator,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    Message,
    Tag
  },
  setup() {
    const dataStore = useDataStore()
    return { dataStore }
  },
  computed: {
    comments() {
      return this.dataStore.comments
    },
    commentsLoading() {
      return this.dataStore.commentsLoading
    },
    commentsError() {
      return this.dataStore.commentsError
    },
    commentsPagination() {
      return this.dataStore.commentsPagination
    }
  },
  methods: {
    fetchComments(page = 1) {
      this.dataStore.fetchComments(page)
    },
    onPageChange(event) {
      const page = event.page + 1
      this.fetchComments(page)
    }
  },
  mounted() {
    this.fetchComments()
  }
}
</script>
