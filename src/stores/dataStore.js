import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDataStore = defineStore('data', {
  state: () => ({
    // Для комментариев
    comments: [],
    commentsLoading: false,
    commentsError: '',
    commentsPagination: {
      currentPage: 1,
      perPage: 10,
      total: 0,
      lastPage: 1
    },

    // Для постов
    posts: [],
    postsLoading: false,
    postsError: '',
    postsPagination: {
      currentPage: 1,
      perPage: 10,
      total: 0,
      lastPage: 1
    }
  }),

  actions: {
    // Методы для пользователей
    async fetchComments(page = 1) {
      this.commentsLoading = true
      this.commentsError = ''

      try {
        console.log('Запрос комментариев:', `comments?page=${page}&per_page=${this.commentsPagination.perPage}`)

        const response = await api.get(`comments?page=${page}&per_page=${this.commentsPagination.perPage}`)
        console.log('Ответ комментариев:', response.data)

        // Обработка различных форматов ответа
        if (response.data && Array.isArray(response.data)) {
          // Если ответ - массив комментариев
          this.comments = response.data
          this.commentsPagination = {
            currentPage: page,
            perPage: this.commentsPagination.perPage,
            total: response.data.length,
            lastPage: 1
          }
          console.log(`Загружено ${this.comments.length} комментариев из Laravel`)
        }
        else if (response.data && response.data.data) {
          // Если ответ с пагинациейы
          this.comments = response.data.data
          this.commentsPagination = {
            currentPage: response.data.current_page || page,
            perPage: response.data.per_page || this.commentsPagination.perPage,
            total: response.data.total || 0,
            lastPage: response.data.last_page || 1
          }
          console.log(`Загружено ${this.comments.length} комментариев (с пагинацией)`)
        }
        else {
          // Данных нет
          console.log('📭 Нет комментариев или неверный формат ответа')
          this.commentsError = 'Нет комментариев или неверный формат ответа'
        }

      } catch (error) {
        console.error('❌ Ошибка загрузки комментариев:', error)
        this.commentsError = 'Ошибка загрузки комментариев: ' + (error.message || 'Unknown error')
      } finally {
        this.commentsLoading = false
      }
    },


    // Методы для постов - ИСПРАВЛЕННАЯ ВЕРСИЯ
    async fetchPosts(page = 1) {
      this.postsLoading = true
      this.postsError = ''

      try {
        console.log('Запрос к:', `posts?page=${page}&per_page=${this.postsPagination.perPage}`)

        const response = await api.get(`posts?page=${page}&per_page=${this.postsPagination.perPage}`)
        console.log('Полный ответ:', response)
        console.log('Данные ответа:', response.data)

        // Ваш Laravel возвращает простой массив, а не объект с data
        if (response.data && Array.isArray(response.data)) {
          // Если ответ - массив постов
          this.posts = response.data
          this.postsPagination = {
            currentPage: page,
            perPage: this.postsPagination.perPage,
            total: response.data.length,
            lastPage: 1
          }
          console.log(`Загружено ${this.posts.length} постов из Laravel`)
        }
        // Если вдруг Laravel вернет данные в формате пагинации
        else if (response.data && response.data.data) {
          this.posts = response.data.data
          this.postsPagination = {
            currentPage: response.data.current_page || page,
            perPage: response.data.per_page || this.postsPagination.perPage,
            total: response.data.total || 0,
            lastPage: response.data.last_page || 1
          }
          console.log(`Загружено ${this.posts.length} постов (с пагинацией)`)
        }
        else {
          // Данных нет
          console.log('База данных пуста или неверный формат')
          this.postsError = 'В базе данных нет постов или неверный формат ответа'
        }

      } catch (error) {
        console.error('Ошибка:', error)
        this.postsError = 'Ошибка загрузки постов: ' + (error.message || 'Unknown error')
      } finally {
        this.postsLoading = false
      }
    },

    // Дополнительные методы для работы с постами
    async createPost(postData) {
      try {
        const response = await api.post('posts', postData)
        return response.data
      } catch (error) {
        console.error('Ошибка создания поста:', error)
        throw error
      }
    },

    async updatePost(id, postData) {
      try {
        const response = await api.put(`posts/${id}`, postData)
        return response.data
      } catch (error) {
        console.error('Ошибка обновления поста:', error)
        throw error
      }
    },

    async deletePost(id) {
      try {
        const response = await api.delete(`posts/${id}`)
        return response.data
      } catch (error) {
        console.error('Ошибка удаления поста:', error)
        throw error
      }
    },

    async createComment(commentData) {
      try {
        const response = await api.post('comments', commentData)
        return response.data
      } catch (error) {
        console.error('Ошибка создания комментария:', error)
        throw error
      }
    },

    async updateComment(id, commentData) {
      try {
        const response = await api.put(`comments/${id}`, commentData)
        return response.data
      } catch (error) {
        console.error('Ошибка обновления комментария:', error)
        throw error
      }
    },

    async deleteComment(id) {
      try {
        const response = await api.delete(`comments/${id}`)
        return response.data
      } catch (error) {
        console.error('Ошибка удаления комментария:', error)
        throw error
      }
    }

  }
})
